#!/bin/bash

# Hiddify + MTProxy Otomatik Kurulum Scripti
# İran için optimize edilmiş, port çakışması önleyici
# Tarih: 2025-06-22
# Kullanıcı: tarihcituranx

set -e

# Renkli çıktı için
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Logo ve başlık
echo -e "${BLUE}"
echo "=================================================="
echo "  Hiddify + MTProxy Otomatik Kurulum Scripti"
echo "  İran İçin Optimize Edilmiş Versiyon"
echo "  Tarih: $(date)"
echo "=================================================="
echo -e "${NC}"

# Root kontrolü
if [[ $EUID -ne 0 ]]; then
   echo -e "${RED}Bu script root olarak çalıştırılmalıdır!${NC}"
   echo "Kullanım: sudo bash $0"
   exit 1
fi

# Sistem bilgilerini al
echo -e "${YELLOW}Sistem bilgileri kontrol ediliyor...${NC}"
OS=$(lsb_release -si 2>/dev/null || echo "Unknown")
VERSION=$(lsb_release -sr 2>/dev/null || echo "Unknown")
ARCH=$(uname -m)
IP=$(curl -s ipv4.icanhazip.com || curl -s ifconfig.me)

echo "İşletim Sistemi: $OS $VERSION"
echo "Mimari: $ARCH"
echo "Sunucu IP: $IP"

# Port çakışması kontrolü
echo -e "${YELLOW}Port çakışması kontrol ediliyor...${NC}"
USED_PORTS=$(netstat -tulpn 2>/dev/null | grep LISTEN | awk '{print $4}' | cut -d: -f2 | sort -n | uniq)

# Hiddify portlarını tespit et
HIDDIFY_PORTS=""
if systemctl is-active --quiet hiddify-manager 2>/dev/null; then
    echo -e "${GREEN}Hiddify Manager tespit edildi!${NC}"
    HIDDIFY_PORTS=$(echo "$USED_PORTS" | grep -E "(80|443|8080|2053|2083|2087|2096|1080|1194)" || true)
    echo "Hiddify tarafından kullanılan portlar: $HIDDIFY_PORTS"
fi

# MTProxy için uygun port seç
MTPROXY_PORT=""
CANDIDATE_PORTS="8443 9443 3128 8888 9999 7777 5555 6666"

for port in $CANDIDATE_PORTS; do
    if ! echo "$USED_PORTS" | grep -q "^$port$"; then
        MTPROXY_PORT=$port
        echo -e "${GREEN}MTProxy için seçilen port: $MTPROXY_PORT${NC}"
        break
    fi
done

if [[ -z "$MTPROXY_PORT" ]]; then
    echo -e "${RED}Uygun port bulunamadı! Manuel port girişi gerekiyor.${NC}"
    read -p "MTProxy için port girin (örn: 8443): " MTPROXY_PORT
fi

# Gerekli paketleri yükle
echo -e "${YELLOW}Gerekli paketler yükleniyor...${NC}"
apt update >/dev/null 2>&1
apt install -y git curl build-essential libssl-dev zlib1g-dev wget xxd >/dev/null 2>&1

# MTProxy dizini oluştur
MTPROXY_DIR="/opt/mtproxy"
echo -e "${YELLOW}MTProxy dizini oluşturuluyor: $MTPROXY_DIR${NC}"
mkdir -p "$MTPROXY_DIR"
cd "$MTPROXY_DIR"

# MTProxy'yi indir ve derle
if [[ ! -d "MTProxy" ]]; then
    echo -e "${YELLOW}MTProxy indiriliyor ve derleniyor...${NC}"
    git clone https://github.com/TelegramMessenger/MTProxy.git >/dev/null 2>&1
    cd MTProxy
    make >/dev/null 2>&1
    echo -e "${GREEN}MTProxy başarıyla derlendi!${NC}"
else
    echo -e "${GREEN}MTProxy zaten mevcut!${NC}"
    cd MTProxy
fi

# Proxy dosyalarını indir
echo -e "${YELLOW}Proxy yapılandırma dosyaları indiriliyor...${NC}"
curl -s https://core.telegram.org/getProxySecret -o proxy-secret
curl -s https://core.telegram.org/getProxyConfig -o proxy-multi.conf

# Secret key'ler oluştur
echo -e "${YELLOW}Secret key'ler oluşturuluyor...${NC}"
SECRET1=$(head -c 16 /dev/urandom | xxd -ps)
SECRET2=$(head -c 16 /dev/urandom | xxd -ps)
SECRET3=$(head -c 16 /dev/urandom | xxd -ps)

# Systemd service dosyası oluştur
echo -e "${YELLOW}MTProxy servisi oluşturuluyor...${NC}"
cat > /etc/systemd/system/mtproxy.service << EOF
[Unit]
Description=MTProxy Telegram Proxy
After=network.target
Wants=network.target

[Service]
Type=simple
User=nobody
Group=nogroup
WorkingDirectory=$MTPROXY_DIR/MTProxy
ExecStart=$MTPROXY_DIR/MTProxy/mtproto-proxy -u nobody -p 8888 -H $MTPROXY_PORT -S $SECRET1 -S $SECRET2 -S $SECRET3 --aes-pwd proxy-secret proxy-multi.conf
Restart=on-failure
RestartSec=5
StandardOutput=journal
StandardError=journal
SyslogIdentifier=mtproxy

[Install]
WantedBy=multi-user.target
EOF

# Servisi başlat
echo -e "${YELLOW}MTProxy servisi başlatılıyor...${NC}"
systemctl daemon-reload
systemctl enable mtproxy >/dev/null 2>&1
systemctl start mtproxy

# Firewall ayarları
echo -e "${YELLOW}Firewall ayarları yapılandırılıyor...${NC}"
if command -v ufw >/dev/null 2>&1; then
    ufw allow $MTPROXY_PORT/tcp >/dev/null 2>&1
    echo -e "${GREEN}UFW'de port $MTPROXY_PORT açıldı${NC}"
fi

# İran için özel optimizasyonlar
echo -e "${YELLOW}İran için özel optimizasyonlar uygulanıyor...${NC}"

# DNS ayarları
cat > /etc/systemd/resolved.conf.d/dns.conf << EOF
[Resolve]
DNS=1.1.1.1 8.8.8.8 1.0.0.1
Fallback=208.67.222.222 208.67.220.220
EOF

systemctl restart systemd-resolved >/dev/null 2>&1

# MTProxy durumunu kontrol et
sleep 3
if systemctl is-active --quiet mtproxy; then
    echo -e "${GREEN}✓ MTProxy başarıyla çalışıyor!${NC}"
else
    echo -e "${RED}✗ MTProxy başlatılamadı!${NC}"
    echo "Hata detayları için: journalctl -u mtproxy -n 20"
fi

# Kullanıcı bilgileri oluştur
echo -e "${BLUE}"
echo "=================================================="
echo "           KURULUM TAMAMLANDI!"
echo "=================================================="
echo -e "${NC}"

echo -e "${GREEN}MTProxy Bilgileri:${NC}"
echo "Sunucu IP: $IP"
echo "Port: $MTPROXY_PORT"
echo ""
echo -e "${YELLOW}Secret Key'ler (3 farklı kullanıcı için):${NC}"
echo "1. Secret Key: $SECRET1"
echo "2. Secret Key: $SECRET2"
echo "3. Secret Key: $SECRET3"
echo ""

echo -e "${BLUE}Telegram Bağlantı Linkleri:${NC}"
echo "Kullanıcı 1: https://t.me/proxy?server=$IP&port=$MTPROXY_PORT&secret=$SECRET1"
echo "Kullanıcı 2: https://t.me/proxy?server=$IP&port=$MTPROXY_PORT&secret=$SECRET2"
echo "Kullanıcı 3: https://t.me/proxy?server=$IP&port=$MTPROXY_PORT&secret=$SECRET3"
echo ""

# QR kod oluştur (isteğe bağlı)
if command -v qrencode >/dev/null 2>&1; then
    echo -e "${YELLOW}QR kod oluşturuluyor...${NC}"
    qrencode -t ansiutf8 "https://t.me/proxy?server=$IP&port=$MTPROXY_PORT&secret=$SECRET1"
fi

echo -e "${GREEN}Yararlı Komutlar:${NC}"
echo "• MTProxy durumu: systemctl status mtproxy"
echo "• MTProxy logları: journalctl -u mtproxy -f"
echo "• MTProxy'yi durdur: systemctl stop mtproxy"
echo "• MTProxy'yi başlat: systemctl start mtproxy"
echo "• Port kontrolü: netstat -tulpn | grep $MTPROXY_PORT"
echo ""

# Hiddify entegrasyonu bilgisi
if systemctl is-active --quiet hiddify-manager 2>/dev/null; then
    echo -e "${BLUE}Hiddify Manager Entegrasyonu:${NC}"
    echo "• MTProxy, Hiddify Manager ile çakışmayacak şekilde yapılandırıldı"
    echo "• Her iki servis de bağımsız olarak çalışacak"
    echo "• Hiddify panel: https://$IP:8080"
fi

# Güvenlik önerileri
echo -e "${YELLOW}Güvenlik Önerileri (İran için):${NC}"
echo "• Secret key'leri sadece güvendiğiniz kişilerle paylaşın"
echo "• Telegram üzerinden şifrelenmiş mesajla gönderin"
echo "• Düzenli olarak secret key'leri değiştirin"
echo "• Sunucu loglarını takip edin"
echo "• VPS sağlayıcınızın Iran politikalarını kontrol edin"
echo ""

# Yedekleme bilgileri dosyaya kaydet
cat > "$MTPROXY_DIR/backup-info.txt" << EOF
MTProxy Kurulum Bilgileri
Tarih: $(date)
Kullanıcı: tarihcituranx
Sunucu IP: $IP
Port: $MTPROXY_PORT
Secret Key 1: $SECRET1
Secret Key 2: $SECRET2
Secret Key 3: $SECRET3

Telegram Linkleri:
https://t.me/proxy?server=$IP&port=$MTPROXY_PORT&secret=$SECRET1
https://t.me/proxy?server=$IP&port=$MTPROXY_PORT&secret=$SECRET2
https://t.me/proxy?server=$IP&port=$MTPROXY_PORT&secret=$SECRET3
EOF

echo -e "${GREEN}✓ Kurulum bilgileri $MTPROXY_DIR/backup-info.txt dosyasına kaydedildi${NC}"
echo -e "${BLUE}İyi kullanımlar! 🚀${NC}"