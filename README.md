# SFAKTOR GAMES Website

Bu site GitHub Pages için hazırlanmış basit bir statik sitedir.

## Siteyi bilgisayarında açmak
1. Klasörü aç.
2. `index.html` dosyasına çift tıkla.
3. Site tarayıcıda açılır.

## Oyun ismi / açıklaması değiştirmek
`assets/js/games.js` dosyasını Not Defteri veya VS Code ile aç.

Örnek:

```js
{
  title: "Foodie Match: Travel",
  description: "Oyun açıklaması",
  status: "Published",
  platforms: ["Google Play", "App Store"],
  page: "games/foodie-match-travel.html"
}
```

Buradaki yazıları değiştirmen yeterli.

## Google Play veya App Store linki değiştirmek
Örneğin:
`games/foodie-match-travel.html`

dosyasını aç.

Şunu bul:

```html
href="https://play.google.com/"
```

ve kendi Google Play linkini yapıştır.

App Store için de aynı şekilde.

## Yeni oyun eklemek
1. `games` klasöründeki mevcut HTML dosyalarından birini kopyala.
2. Adını örneğin `yeni-oyun.html` yap.
3. İçindeki oyun adı, açıklama ve linkleri değiştir.
4. `assets/js/games.js` dosyasına yeni oyun kartını ekle.

## Renk değiştirmek
`assets/css/style.css` dosyasının üst kısmında:

```css
--accent: #ff4d00;
```

Bu turuncu vurgu rengidir.

Örneğin kırmızı:
`#ff2b2b`

Mavi:
`#4b6bff`

## GitHub Pages'e yükleme
1. GitHub'da yeni repository oluştur.
2. Bu klasördeki bütün dosyaları repository'ye yükle.
3. GitHub: Settings > Pages.
4. Branch olarak `main`, klasör olarak `/root` seç.
5. Save.
6. Birkaç dakika sonra GitHub site adresini verir.

## Domain bağlama
GitHub Pages ayarındaki "Custom domain" alanına:
`sfaktorgames.com`

yazılır.

Domain sağlayıcındaki DNS ayarları daha sonra GitHub'ın istediği kayıtlarla eşleştirilir.


## Dil ekleme / çeviri
Site artık Türkçe, İngilizce ve Almanca örnek dilleriyle gelir.

Çeviriler:
`assets/js/i18n.js`

dosyasındadır.

Yeni dil eklemek için `translations` içine örneğin `fr: { ... }` bölümü eklenir ve
`index.html` içindeki dil menüsüne:

```html
<button data-lang="fr">Français</button>
```

eklenir.

## Mavi marka rengi
Ana vurgu rengi:
`assets/css/style.css`

içindeki:

```css
--accent: #0b72d9;
--accent-2: #1194f6;
--accent-dark: #08479f;
```

değerleridir.
