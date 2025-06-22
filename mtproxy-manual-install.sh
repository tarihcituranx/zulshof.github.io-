#!/bin/bash

# Manuel MTProxy Kurulumu - İran için Optimize
echo "MTProxy manuel kurulum başlatılıyor..."

# Dizin oluştur
cd /opt/mtproxy

# Git ile indirmeyi deneyin (verbose mode)
echo "MTProxy repository indiriliyor..."
git clone --progress https://github.com/TelegramMessenger/MTProxy.git

if [ $? -ne 0 ]; then
    echo "Git clone başarısız! Alternatif yöntem deneniyor..."
    
    # Alternatif: wget ile tar dosyası indirin
    wget -c https://github.com/TelegramMessenger/MTProxy/archive/master.tar.gz
    tar -xzf master.tar.gz
    mv MTProxy-master MTProxy
fi

cd MTProxy

# Derleme öncesi gereksinimler
echo "Derleme gereksinimleri kontrol ediliyor..."
apt update
apt install -y build-essential libssl-dev zlib1g-dev

# Derleme işlemi (verbose)
echo "MTProxy derleniyor... (Bu işlem 2-5 dakika sürebilir)"
make -j$(nproc) || {
    echo "Derleme başarısız! Tek çekirdek ile deneniyor..."
    make clean
    make
}

if [ -f "mtproto-proxy" ]; then
    echo "✓ MTProxy başarıyla derlendi!"
else
    echo "✗ Derleme başarısız!"
    exit 1
fi

# Proxy dosyalarını indir
echo "Proxy yapılandırma dosyaları indiriliyor..."
curl -4 -s --connect-timeout 10 https://core.telegram.org/getProxySecret -o proxy-secret || {
    echo "proxy-secret indirilemedi! Alternatif yöntem..."
    wget -4 -T 10 https://core.telegram.org/getProxySecret -O proxy-secret
}

curl -4 -s --connect-timeout 10 https://core.telegram.org/getProxyConfig -o proxy-multi.conf || {
    echo "proxy-multi.conf indirilemedi! Alternatif yöntem..."
    wget -4 -T 10 https://core.telegram.org/getProxyConfig -O proxy-multi.conf
}

# Secret key'ler oluştur
echo "Secret key'ler oluşturuluyor..."
SECRET1=$(head -c 16 /dev/urandom | xxd -ps)
SECRET2=$(head -c 16 /dev/urandom | xxd -ps)
SECRET3=$(head -c 16 /dev/urandom | xxd -ps)

echo "Secret 1: $SECRET1"
echo "Secret 2: $SECRET2"
echo "Secret 3: $SECRET3"

# Test çalışması
echo "MTProxy test ediliyor..."
timeout 5s ./mtproto-proxy -u nobody -p 8888 -H 8443 -S $SECRET1 --aes-pwd proxy-secret proxy-multi.conf &
sleep 3

if pgrep -f mtproto-proxy > /dev/null; then
    echo "✓ MTProxy test başarılı!"
    pkill -f mtproto-proxy
else
    echo "✗ MTProxy test başarısız!"
fi

echo "Manuel kurulum tamamlandı!"