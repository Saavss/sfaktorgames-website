const ABOUT_FALLBACKS = {
  "tr": {
    "heading": "Bağımsız oyun geliştirme, kişisel bir vizyon.",
    "body": "SFAKTOR GAMES, tek bir geliştirici tarafından yürütülen bağımsız bir oyun geliştirme girişimidir.\n\nOyunların fikir aşamasından tasarımına, yazılımından yayın sürecine kadar tüm çalışmalar tek bir yaratıcı yaklaşım etrafında şekillenir. Amaç; farklı türlerde, özenle hazırlanmış ve oyunculara keyifli deneyimler sunan dijital oyunlar geliştirmektir.\n\nSFAKTOR GAMES, her projede öğrenmeye, teknik gelişime ve sürdürülebilir üretime önem verir. Yeni oyunlar, güncellemeler ve duyurular bu web sitesinde paylaşılır.",
    "caption": "Bir fikirle başlar. Oyunla hayat bulur.",
    "tag1": "Bağımsız geliştirici",
    "tag2": "Tek kişilik üretim",
    "tag3": "Oyun odaklı yaklaşım",
    "games": "Oyunları Keşfet"
  },
  "en": {
    "heading": "Independent game development. A personal vision.",
    "body": "SFAKTOR GAMES is an independent game development initiative run by a single developer.\n\nFrom early concepts and design to programming and publishing, each project is shaped by one cohesive creative approach. The goal is to create thoughtfully crafted digital games across different genres that offer enjoyable experiences to players.\n\nEvery project is an opportunity to learn, improve technical skills, and build sustainably. New games, updates, and announcements are shared on this website.",
    "caption": "It starts with an idea. It comes alive as a game.",
    "tag1": "Independent developer",
    "tag2": "Solo development",
    "tag3": "Game-first thinking",
    "games": "Explore Games"
  },
  "de": {
    "heading": "Unabhängige Spieleentwicklung. Eine persönliche Vision.",
    "body": "SFAKTOR GAMES ist ein unabhängiges Spieleentwicklungsprojekt, das von einer einzelnen Person betrieben wird.\n\nVon der ersten Idee über Design und Programmierung bis zur Veröffentlichung werden alle Projekte nach einem einheitlichen kreativen Ansatz gestaltet. Ziel ist es, sorgfältig entwickelte digitale Spiele verschiedener Genres zu schaffen, die Spielerinnen und Spielern Freude bereiten.\n\nJedes Projekt bietet die Möglichkeit, Neues zu lernen, technische Fähigkeiten zu verbessern und nachhaltig zu entwickeln. Neue Spiele, Updates und Ankündigungen werden auf dieser Website veröffentlicht.",
    "caption": "Am Anfang steht eine Idee. Daraus wird ein Spiel.",
    "tag1": "Unabhängige Entwicklung",
    "tag2": "Einzelentwicklung",
    "tag3": "Spiele im Mittelpunkt",
    "games": "Spiele entdecken"
  },
  "ko": {
    "heading": "독립 게임 개발, 하나의 비전.",
    "body": "SFAKTOR GAMES는 개발자 한 명이 운영하는 독립 게임 개발 프로젝트입니다.\n\n초기 아이디어와 디자인부터 프로그래밍, 출시까지 모든 과정은 일관된 창작 방향을 바탕으로 진행됩니다. 다양한 장르에서 완성도 높고 즐거운 경험을 제공하는 디지털 게임을 만드는 것이 목표입니다.\n\n각 프로젝트는 새로운 것을 배우고 기술 역량을 키우며 꾸준히 발전하는 기회입니다. 새로운 게임과 업데이트, 공지사항은 이 웹사이트에서 확인할 수 있습니다.",
    "caption": "하나의 아이디어가 게임이 됩니다.",
    "tag1": "인디 개발자",
    "tag2": "1인 개발",
    "tag3": "게임 중심의 제작",
    "games": "게임 둘러보기"
  },
  "pt": {
    "heading": "Desenvolvimento independente. Uma visão pessoal.",
    "body": "SFAKTOR GAMES é um projeto independente de desenvolvimento de jogos conduzido por uma única pessoa.\n\nDesde as primeiras ideias e o design até à programação e publicação, cada projeto segue uma abordagem criativa coerente. O objetivo é desenvolver jogos digitais de diferentes géneros, cuidadosamente elaborados e capazes de proporcionar experiências agradáveis aos jogadores.\n\nCada projeto é uma oportunidade para aprender, desenvolver competências técnicas e criar de forma sustentável. Novos jogos, atualizações e anúncios são partilhados neste site.",
    "caption": "Tudo começa com uma ideia. E ganha vida num jogo.",
    "tag1": "Desenvolvedor independente",
    "tag2": "Desenvolvimento a solo",
    "tag3": "Jogos em primeiro lugar",
    "games": "Explorar jogos"
  },
  "zh-CN": {
    "heading": "独立游戏开发，一份个人愿景。",
    "body": "SFAKTOR GAMES 是由一位开发者独立运营的游戏开发项目。\n\n从最初的创意、设计到程序开发和发布，每个项目都遵循统一的创作理念。我们的目标是精心打造不同类型的数字游戏，为玩家带来愉快的体验。\n\n每个项目都是学习、提升技术能力和持续成长的机会。新游戏、更新内容及相关公告将在本网站发布。",
    "caption": "始于创意，成于游戏。",
    "tag1": "独立开发者",
    "tag2": "个人开发",
    "tag3": "专注游戏体验",
    "games": "探索游戏"
  },
  "zh-TW": {
    "heading": "獨立遊戲開發，一份個人願景。",
    "body": "SFAKTOR GAMES 是由一位開發者獨立經營的遊戲開發計畫。\n\n從最初的構想、設計到程式開發與發行，每個專案都遵循一致的創作理念。目標是用心製作不同類型的數位遊戲，為玩家帶來愉快的體驗。\n\n每個專案都是學習、提升技術能力與持續成長的機會。新遊戲、更新內容及相關公告都會在本網站分享。",
    "caption": "始於創意，成為遊戲。",
    "tag1": "獨立開發者",
    "tag2": "一人開發",
    "tag3": "專注遊戲體驗",
    "games": "探索遊戲"
  }
};
let aboutSettings = null;
function safeAboutAsset(v){if(typeof v==='string' && /^assets\/uploads\/[a-zA-Z0-9_./-]+$/.test(v) && !v.includes('..')) return v;return null;}
function renderAbout(lang){
 const langData=ABOUT_FALLBACKS[lang]||ABOUT_FALLBACKS.en;
 const heading=aboutSettings?.['about_heading_'+lang] || langData.heading;
 const body=aboutSettings?.['about_text_'+lang] || langData.body;
 document.getElementById('aboutHeading').textContent=heading;
 const target=document.getElementById('aboutBody');target.replaceChildren();
 for(const part of String(body).split(/\n\s*\n/).filter(Boolean)){
   const p=document.createElement('p');p.textContent=part.trim();target.appendChild(p);
 }
 for(const [id,key] of [['aboutArtCaption','caption'],['aboutTagOne','tag1'],['aboutTagTwo','tag2'],['aboutTagThree','tag3'],['aboutGamesLink','games']]){
   const el=document.getElementById(id);
   if(id==='aboutGamesLink'){el.replaceChildren(document.createTextNode(langData.games+' '));const arrow=document.createElement('span');arrow.textContent='↗';arrow.setAttribute('aria-hidden','true');el.appendChild(arrow)}
   else el.textContent=langData[key];
 }
 document.title=(lang==='tr'?'Hakkımızda':lang==='en'?'About':lang==='de'?'Über uns':lang==='ko'?'소개':lang==='pt'?'Sobre':lang==='zh-CN'?'关于我们':'關於我們')+' | SFAKTOR GAMES';
 const meta=document.querySelector('meta[name="description"]');meta.setAttribute('content',String(body).slice(0,155).replace(/\s+/g,' '));
}
async function loadAbout(){
 document.getElementById('year').textContent=new Date().getFullYear();
 try{const {data}=await db.from('site_settings').select('*').eq('id',1).maybeSingle();aboutSettings=data||null;
  if(data){const logo=safeAboutAsset(data.logo_url);if(logo)document.querySelectorAll('.brand').forEach(el=>{const img=document.createElement('img');img.src=logo;img.alt='SFAKTOR GAMES';el.replaceChildren(img)});
    const fav=safeAboutAsset(data.favicon_url);if(fav){const link=document.createElement('link');link.rel='icon';link.href=fav;document.head.appendChild(link)}
  }
 }catch(e){console.warn('About page data not loaded',e)}
 renderAbout(localStorage.getItem('sfaktor_lang')||'tr');
}
document.addEventListener('DOMContentLoaded',()=>{loadAbout();const btn=document.querySelector('.menu-btn');btn?.addEventListener('click',()=>document.querySelector('.site-header nav')?.classList.toggle('open'))});
document.addEventListener('sfaktorLanguageChanged',e=>renderAbout(e.detail.lang));
