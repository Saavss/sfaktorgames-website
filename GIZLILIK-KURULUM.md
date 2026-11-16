# SFAKTOR GAMES — Gizlilik sayfaları

- `privacy.html`: yalnızca web sitesi içindir, 7 dil destekler. Oyunların veri işleme politikalarını içermez.
- `game-privacy.html?game=foodie-match-travel`: o oyun için **İngilizce** gizlilik sayfası. Her oyun kendi slug değeriyle ayrı sayfa açar.
- `ADMIN-BASLAT.html`: `Oyunlar > Oyunu Düzenle > Game Privacy Policy (EN)` alanına doğrulanmış metni girebilirsin. Alan boşsa eksik bilgi uyarısı görünür.
- `Siteyi Gör`: her iki gizlilik sayfasının önizlemesini oluşturur.
- `Siteyi ZIP Olarak Dışa Aktar`: sayfaları GitHub'a gönderilecek pakete ekler.

Google Play'e `https://<alan-adin>/game-privacy.html?game=<oyun-slug>` şeklindeki **yayındaki** bağlantıyı kullan. Linkin HTTPS ile herkes tarafından açılabilir olması gerekir. Metni yayınlamadan önce oyunun gerçek SDK ve veri uygulamalarına göre doldur. Sadece sayfa oluşturulması Google Play uyumluluğu garantilemez.
