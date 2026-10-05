# SFAKTOR GAMES CMS v2 — Kurulum ve Kullanım

Bu sürümde artık admin panelinden:

- oyun ekleme / silme / düzenleme
- Google Play, App Store, Steam ve trailer linkleri
- oyun kapak görselini bilgisayardan yükleme
- oyun logosunu bilgisayardan yükleme
- birden fazla ekran görüntüsü yükleme
- site logosunu yükleme
- favicon yükleme
- YouTube / Instagram / Discord linkleri
- haber yönetimi
- yeni sayfa oluşturma
- gizlilik politikası / kullanım koşulları / destek vb. sayfalar
- sayfayı taslak veya yayında tutma

işlemleri yapılabilir.

## İlk kurulum

### 1. Supabase projesi oluştur
Supabase hesabında yeni proje oluştur.

### 2. SQL'i çalıştır
Supabase > SQL Editor > New query

`supabase-schema.sql`

dosyasının tamamını yapıştır ve Run de.

Bu işlem:
- veritabanı tablolarını
- güvenlik kurallarını
- görsel yükleme alanını (Storage bucket)

oluşturur.

### 3. Admin hesabı
Supabase > Authentication > Users > Add User

Kendi admin e-postanı ve güçlü bir şifreyi oluştur.

### 4. Siteyi Supabase'e bağla
Supabase > Project Settings > API

Project URL ve anon/public key değerlerini:

`assets/js/supabase-config.js`

dosyasına yaz.

Service Role Key kullanma.

## Logo yükleme

Admin paneli:
Site Ayarları > Site Logosu > Dosya Seç > Yükle > Ayarları Kaydet

Logo Supabase Storage'a yüklenir ve site otomatik kullanır.

## Yeni sayfa oluşturma

Admin > Sayfalar > Yeni Sayfa

Örnek:

Başlık:
`Gizlilik Politikası`

Slug:
`privacy-policy`

Dil:
`Türkçe`

Durum:
`Yayında`

Sayfa URL'si:

`https://sfaktorgames.com/page.html?slug=privacy-policy`

Not: GitHub Pages statik hosting olduğu için bu sürümde dinamik sayfalar `page.html?slug=...` biçiminde çalışır.
İleride istersek Cloudflare Pages / Netlify / Vercel'e geçip URL'leri:

`sfaktorgames.com/privacy-policy`

şeklinde de temizleyebiliriz.

## Görseller
Admin panelindeki Yükle butonları görselleri `site-assets` isimli Supabase Storage alanına koyar.

Artık GitHub klasörüne elle logo veya oyun kapağı atman gerekmez.


# V3 — Hareketli Ana Sayfa

Bu sürümde ana sayfa artık oyun stüdyosu vitrini gibi çalışır.

## Ana sayfa banner / slider

Admin > Oyunlar > Oyunu Düzenle

Yeni alanlar:

- `Ana Sayfa Banner Görseli`: yatay büyük görsel. Önerilen 1920×900 veya benzer geniş oran.
- `Ana Sayfa Bannerında Göster`: Evet/Hayır.
- `Sıralama`: 0, 1, 2... Küçük sayı önce görünür.
- `Oyun Logosu`: slider'da oyun adı yerine logo gösterilebilir.
- Google Play / App Store / Steam linkleri slider üzerinde otomatik buton olur.

Bir banner görseline veya `Oyunu İncele` butonuna tıklandığında:

`game.html?slug=oyun-slug`

adresindeki otomatik oyun detay sayfasına gidilir.

## Slider özellikleri

- Otomatik geçiş
- Sağ / sol ok
- Mobilde parmakla kaydırma
- İlerleme çubuğu
- Fade + zoom geçişi
- Oyun başlığı animasyonu
- Store butonları
- Oyuna özel detay sayfası

## Site efektleri

- Scroll ile bölümlerin yumuşak belirmesi
- Oyun kartlarında hover animasyonu
- Hareketli oyun isimleri şeridi
- Header'ın scroll ile koyulaşması
- Hafif cursor glow
- Hareket hassasiyeti olan kullanıcılar için reduced-motion desteği
