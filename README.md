# Zulshof & Tarihcituranx https://gnctrhc.com.tr/

Bu proje, **zulshof** ve **tarihcituranx** tarafından ortaklaşa geliştirilen, modern ve interaktif bir kişisel portfolyo web sitesidir. İki geliştiricinin çalışmalarını ve yeteneklerini sergilemek amacıyla tasarlanmıştır. Kullanıcı dostu bir arayüzle birlikte çeşitli kişiselleştirme seçenekleri sunar.

![Zulshof Portfolyo Banner](https://gnctrhc.com.tr/assets/images/about-banner.png)

## ⚠️ Önemli Not

Bu kişisel bir portfolyo sitesidir ve **zulshof** ile **tarihcituranx**'ın ortak çalışmasını temsil eder. Kod tabanının doğrudan kopyalanması veya klonlanması, kişisel ve özgün bir çalışma olması nedeniyle **amaçlanmamıştır ve tavsiye edilmez**. Projenin amacı, geliştiricilerin yeteneklerini sergilemek ve ilham vermektir. Lütfen bu emeğe saygı gösterin.

## ✨ Öne Çıkan Özellikler

*   **Dinamik Tema Yönetimi:**
    *   Kullanıcı tercihine göre **Aydınlık** ve **Karanlık** tema arasında geçiş yapabilme.
    *   Tema tercihleri kullanıcının tarayıcısında (`localStorage`) saklanır.
    *   CSS değişkenleri (`var(--bg-primary)`, `var(--color-secondary)` vb.) ile kolay tema yönetimi.
*   **Çoklu Dil Desteği:**
    *   İçerik **İngilizce (EN)**, **Türkçe (TR)** ve **Endonezce (ID)** dillerinde görüntülenebilir.
    *   Dil tercihleri kullanıcının tarayıcısında (`localStorage`) saklanır.
    *   Dil metinleri HTML `data-lang-*` atribütleri ve JavaScript ile yönetilir.
*   **Çerez (Cookie) Onay Banner'ı:**
    *   Kullanıcılara çerez kullanımı hakkında bilgi veren ve onaylarını alan bir banner.
    *   Çerez tercihleri (`localStorage` veya çerez ile) saklanır.
*   **Özelleştirilmiş Fare İmleci:**
    *   Site genelinde veya belirli alanlarda **boya fırçası** şeklinde özel bir fare imleci kullanılır.
    *   CSS `cursor: url('path/to/paintbrush.cur'), auto;` ile uygulanmıştır.
*   **Duyarlı (Responsive) Footer Tasarımı:**
    *   Hem aydınlık hem de karanlık temada okunabilir ve estetik footer.
    *   Logo ("zulshof**illustrator**") ve link renkleri temaya göre dinamik olarak değişir.
    *   CSS değişkenleri (`--raw-seinna`, `--footer-actual-link-color`) ile renk yönetimi.
*   **Modern ve Temiz Arayüz:** HTML5, CSS3 ve JavaScript ile oluşturulmuş, kullanıcı deneyimine odaklanan tasarım.
*   **İletişim ve Sosyal Medya Bağlantıları:** Footer bölümünde Instagram gibi sosyal medya profillerine linkler.

## 🛠️ Kullanılan Teknolojiler

*   **Frontend:**
    *   HTML5
    *   CSS3 (Flexbox, Grid, CSS Değişkenleri)
    *   JavaScript (DOM Manipulation, `localStorage` API)
*   **İkonlar:** [Kullandıysanız, örn: Ionicons, FontAwesome]
*   **Tasarım İlhamı:** [codewithsadee](https://github.com/codewithsadee) (Belirli bölümler veya genel yaklaşım için)
*   **Geliştirme Araçları:**
    *   Git & GitHub (Versiyon kontrolü ve hosting)
    *   [Kullandığınız diğer araçlar, örn: VS Code]

## 📂 Proje Yapısı (Önerilen)

```
zulshof.github.io-/  (veya proje klasör adınız)
├── assets/
│   ├── css/
│   │   ├── style.css         # Ana stil dosyası (genel düzen, bileşenler)
│   │   ├── theme.css         # Tema renk değişkenleri (body.dark_theme, body.light_theme)
│   │   └── footer.css        # Footer'a özel stiller (eğer ayrı bir dosyadaysa)
│   ├── js/
│   │   ├── script.js         # Ana JavaScript (tema, dil, cookie banner, imleç vb.)
│   │   └── lang.js           # (Eğer dil metinleri ayrı bir JS dosyasındaysa)
│   ├── images/
│   │   ├── paintbrush.cur    # Özel fare imleci (veya .png)
│   │   └── ...               # Diğer logolar, profil resmi vb.
│   └── fonts/                # (Kullandığınız özel fontlar varsa)
├── index.html                # Ana sayfa
└── README.md                 # Bu dosya
```

## 🏁 Başlarken

Bu bölüm, projenin nasıl görüntülenebileceğine dair bilgi içerir. **Lütfen yukarıdaki "Önemli Not" bölümünü dikkate alınız.**

### Gereksinimler

*   Güncel bir web tarayıcısı (Chrome, Firefox, Edge, Safari vb.)

### Görüntüleme

Proje canlı olarak [[https://tarihcituranx.github.io/zulshof.github.io-/](https://gnctrhc.com.tr/)](https://tarihcituranx.github.io/zulshof.github.io-/) adresinde (veya sitenizin canlı olduğu asıl adres) görüntülenebilir.
Eğer kaynak kodlarını incelemek isterseniz, `index.html` dosyasını doğrudan bir web tarayıcısında açarak yerel bir kopya üzerinde çalışabilirsiniz. Ancak, bu kişisel bir portfolyo sitesi olduğu için kodların yeniden dağıtılması veya kopyalanması amaçlanmamıştır.

## 🚀 Kullanım Kılavuzu

*   **Tema Değiştirme:** Sayfanın [Tema değiştirici butonunun konumu, örn: sağ üst köşesindeki] 🌞 (Aydınlık) / 🌜 (Karanlık) ikonuna tıklayarak temalar arasında geçiş yapın. Seçiminiz tarayıcınızda saklanacaktır.
*   **Dil Değiştirme:** Sayfanın [Dil seçici menüsünün konumu, örn: navigasyon barındaki] 🌐 ikonuna tıklayarak mevcut diller (İngilizce, Türkçe, Endonezce) arasından seçim yapın. Seçiminiz tarayıcınızda saklanacaktır.
*   **Çerez Onayı:** Site ilk açıldığında ekranın altında bir çerez onay banner'ı göreceksiniz. "Kabul Et" veya "Reddet" seçeneklerinden birini kullanarak tercihinizi belirtin.
*   **Özel İmleç:** Site içinde gezinirken fare imlecinizin boya fırçası şeklinde olduğunu fark edeceksiniz.

## 🤝 Katkıda Bulunma

Bu proje kişisel bir portfolyo sitesi olduğu için dışarıdan doğrudan kod katkısı kabul edilmemektedir. Ancak, herhangi bir hata fark ederseniz veya bir öneriniz varsa, lütfen bir "Issue" açarak **tarihcituranx** veya **zulshof** ile iletişime geçin. Geri bildirimleriniz değerlidir.

## 📄 Lisans

Bu projenin içeriği ve kodları **zulshof** ve **tarihcituranx**'a aittir. Tüm hakları saklıdır. Kodların izinsiz kopyalanması, çoğaltılması veya dağıtılması yasaktır.
<!-- Eğer bir lisans belirtmek isterseniz (örn: CC BY-NC-ND 4.0 gibi daha kısıtlayıcı bir lisans):
Bu proje [Lisans Adı ve Linki] altında lisanslanmıştır.
-->

## 🙏 Teşekkürler

*   Bu projenin geliştirilmesi sürecindeki ortak çalışma için **zulshof** ve **tarihcituranx**.
*   Tasarım ilhamı ve bazı yapısal fikirler için **codewithsadee**.

## irtibat

**Geliştiriciler:**

*   **tarihcituranx**
    *   GitHub: [@tarihcituranx](https://github.com/tarihcituranx)
    *   Instagram: [@tarihcituranx](https://www.instagram.com/tarihcituranx)
*   **zulshof**
    *   Instagram: [@zulshof](https://www.instagram.com/zulshof)
   

Proje Linki (GitHub Pages): `https://tarihcituranx.github.io/zulshof.github.io-/`
GitHub Reposu: `https://github.com/tarihcituranx/zulshof.github.io-`
