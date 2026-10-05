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


# V4 — Çok Dilli Oyun İçerikleri

Admin > Oyunlar > Oyunu Düzenle bölümünde artık her oyun için ayrı TR / EN / DE alanları bulunur.

- Ana oyun adı / fallback
- Türkçe oyun adı, kısa açıklama, uzun açıklama
- English title, short description, long description
- Deutscher Titel, Kurzbeschreibung, lange Beschreibung

Site dili TR ise Türkçe, EN ise İngilizce, DE ise Almanca alanlar otomatik gösterilir.

Bir dil boş bırakılırsa sistem ana `title`, `description` veya `long_description` alanını fallback olarak kullanır.

## Mevcut Supabase projesi

Güncellenmiş `supabase-schema.sql` dosyasını SQL Editor'da tekrar çalıştır.

Komutlarda `add column if not exists` kullanıldığı için mevcut kayıtlar silinmez.


# V5 FINAL — Mevcut Çalışan Sistemin Üzerine Güncelleme

Bu paket mevcut çalışan SFAKTOR GAMES sisteminin devamıdır.

Korunanlar:
- Supabase projesi ve bağlantısı
- admin@sfaktorgames.com hesabı
- Admin paneli
- mevcut admin şifresi (şifre Supabase Authentication'da kalır; bu dosyalarda tutulmaz)
- hareketli ana sayfa slider/banner
- Google Play / App Store / Steam bağlantıları
- oyun detay sayfaları
- ekran görüntüsü galerileri
- logo ve favicon yükleme
- haber yönetimi
- yeni sayfa oluşturma
- Supabase Storage görsel yükleme
- site efektleri ve animasyonlar
- TR / EN / DE genel site dil sistemi

Eklenen / güncellenen:
- oyunlarda ayrı TR / EN / DE başlık, kısa açıklama ve uzun açıklama
- mevcut Supabase URL + publishable key paket içinde hazır
- yazma/yükleme yetkisi sadece admin@sfaktorgames.com hesabına sınırlandı

## ÖNEMLİ
Bu güncelleme admin kullanıcını veya şifreni değiştirmez.
Admin şifresi Supabase Authentication > Users tarafında kalır.

## Güncelleme Sırası
1. GitHub'daki site dosyalarını bu paketteki dosyalarla güncelle.
2. Supabase > SQL Editor'da bu paketteki `supabase-schema.sql` dosyasını çalıştır.
3. SQL mevcut kayıtları silmez; yeni dil kolonlarını ekler ve güvenlik policy'lerini günceller.
4. Siteyi ve admin panelini Ctrl+F5 ile yenile.
