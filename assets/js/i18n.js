const translations = {
  tr: {
    nav_games: "Oyunlar",
    nav_about: "Hakkımızda",
    nav_news: "Haberler",
    nav_contact: "İletişim",
    hero_eyebrow: "BAĞIMSIZ OYUN STÜDYOSU",
    hero_title_1: "DÜNYALAR",
    hero_title_2: "YARATIYORUZ.",
    hero_copy: "SFAKTOR GAMES, mobil ve PC için akılda kalan oyunlar geliştirir.",
    hero_explore: "Oyunları Keşfet",
    hero_about: "Stüdyo Hakkında",
    featured: "ÖNE ÇIKAN",
    view_game: "Oyunu Gör",
    our_titles: "OYUNLARIMIZ",
    games_title: "Oyunlar",
    games_desc: "SFAKTOR GAMES tarafından yayınlanan ve geliştirilmekte olan oyunlar.",
    about_eyebrow: "HAKKIMIZDA",
    about_title: "Küçük ekip.\nBüyük dünyalar.",
    about_p1: "SFAKTOR GAMES; erişilebilir, akılda kalıcı ve görsel kimliği güçlü oyunlar geliştiren bağımsız bir oyun stüdyosudur.",
    about_p2: "Mobil oyunlardan atmosferik PC projelerine kadar her oyunumuzu net bir fikir ve güçlü bir kimlik etrafında tasarlıyoruz.",
    latest: "SON GELİŞMELER",
    news_title: "Haberler",
    news_badge1: "Stüdyo Güncellemesi",
    news_h1: "SFAKTOR GAMES web sitesi yayında.",
    news_p1: "Yeni oyunlarımızı, güncellemeleri ve duyuruları buradan takip edebilirsiniz.",
    news_badge2: "Yakında",
    news_h2: "Yeni duyurular yolda.",
    news_p2: "Yeni projeler duyuruldukça siteye eklenecek.",
    contact_eyebrow: "İLETİŞİM",
    contact_title: "Akılda kalan işler üretelim.",
    footer_rights: "Tüm hakları saklıdır.",
    privacy: "Gizlilik",
    terms: "Koşullar"
  },
  en: {
    nav_games: "Games",
    nav_about: "About",
    nav_news: "News",
    nav_contact: "Contact",
    hero_eyebrow: "INDEPENDENT GAME STUDIO",
    hero_title_1: "WE CREATE",
    hero_title_2: "WORLDS.",
    hero_copy: "SFAKTOR GAMES develops memorable games for mobile and PC.",
    hero_explore: "Explore Games",
    hero_about: "About Studio",
    featured: "FEATURED",
    view_game: "View Game",
    our_titles: "OUR TITLES",
    games_title: "Games",
    games_desc: "Published and upcoming titles from SFAKTOR GAMES.",
    about_eyebrow: "ABOUT US",
    about_title: "Small team.\nBig worlds.",
    about_p1: "SFAKTOR GAMES is an independent game studio focused on creating accessible, memorable and visually distinctive experiences.",
    about_p2: "From casual mobile games to atmospheric PC projects, every title is built around a clear idea and a strong identity.",
    latest: "LATEST",
    news_title: "News",
    news_badge1: "Studio Update",
    news_h1: "SFAKTOR GAMES website is live.",
    news_p1: "Follow our upcoming releases, updates and announcements here.",
    news_badge2: "Coming Soon",
    news_h2: "More announcements are on the way.",
    news_p2: "New projects will be added to the site as they are revealed.",
    contact_eyebrow: "CONTACT",
    contact_title: "Let’s build something memorable.",
    footer_rights: "All rights reserved.",
    privacy: "Privacy",
    terms: "Terms"
  },
  de: {
    nav_games: "Spiele",
    nav_about: "Über uns",
    nav_news: "News",
    nav_contact: "Kontakt",
    hero_eyebrow: "UNABHÄNGIGES GAME-STUDIO",
    hero_title_1: "WIR ERSCHAFFEN",
    hero_title_2: "WELTEN.",
    hero_copy: "SFAKTOR GAMES entwickelt unvergessliche Spiele für Mobile und PC.",
    hero_explore: "Spiele entdecken",
    hero_about: "Über das Studio",
    featured: "HIGHLIGHT",
    view_game: "Spiel ansehen",
    our_titles: "UNSERE TITEL",
    games_title: "Spiele",
    games_desc: "Veröffentlichte und kommende Titel von SFAKTOR GAMES.",
    about_eyebrow: "ÜBER UNS",
    about_title: "Kleines Team.\nGroße Welten.",
    about_p1: "SFAKTOR GAMES ist ein unabhängiges Studio für zugängliche, einprägsame und visuell starke Spielerlebnisse.",
    about_p2: "Von Mobile Games bis zu atmosphärischen PC-Projekten entsteht jeder Titel aus einer klaren Idee und starken Identität.",
    latest: "NEUIGKEITEN",
    news_title: "News",
    news_badge1: "Studio-Update",
    news_h1: "Die SFAKTOR GAMES Website ist online.",
    news_p1: "Hier finden Sie unsere kommenden Releases, Updates und Ankündigungen.",
    news_badge2: "Demnächst",
    news_h2: "Weitere Ankündigungen folgen.",
    news_p2: "Neue Projekte werden nach ihrer Ankündigung hinzugefügt.",
    contact_eyebrow: "KONTAKT",
    contact_title: "Lasst uns etwas Unvergessliches schaffen.",
    footer_rights: "Alle Rechte vorbehalten.",
    privacy: "Datenschutz",
    terms: "Bedingungen"
  }
};

function setLanguage(lang) {
  if (!translations[lang]) lang = "tr";
  localStorage.setItem("sfaktor_lang", lang);
  document.documentElement.lang = lang;
  document.querySelectorAll("[data-i18n]").forEach(el => {
    const key = el.dataset.i18n;
    const value = translations[lang][key];
    if (value !== undefined) el.innerHTML = value.replace(/\n/g, "<br>");
  });
  const current = document.getElementById("currentLang");
  if (current) current.textContent = lang.toUpperCase();
  document.querySelector(".lang-menu")?.classList.remove("open");
}

document.addEventListener("DOMContentLoaded", () => {
  const saved = localStorage.getItem("sfaktor_lang") || "tr";
  setLanguage(saved);

  const btn = document.querySelector(".lang-btn");
  const menu = document.querySelector(".lang-menu");
  if (btn && menu) btn.addEventListener("click", () => menu.classList.toggle("open"));
  document.querySelectorAll("[data-lang]").forEach(btn => {
    btn.addEventListener("click", () => setLanguage(btn.dataset.lang));
  });
});
