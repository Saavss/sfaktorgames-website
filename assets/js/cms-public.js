
async function loadCmsContent(){
  try{
    const [{data:games},{data:banners},{data:settings},{data:news}] = await Promise.all([
      db.from("games").select("*").order("sort_order",{ascending:true}),
      db.from("banners").select("*").order("sort_order",{ascending:true}),
      db.from("site_settings").select("*").eq("id",1).maybeSingle(),
      db.from("news").select("*").order("created_at",{ascending:false}).limit(6)
    ]);

    if(settings){
      const about=document.querySelector("[data-cms='about_text']");
      const mail=document.querySelector("[data-cms='contact_email']");
      if(about && settings.about_text) about.textContent=settings.about_text;
      if(mail && settings.contact_email){mail.textContent=settings.contact_email;mail.href="mailto:"+settings.contact_email;}

      document.querySelectorAll(".brand").forEach(brand=>{
        if(settings.logo_url){
          brand.innerHTML=`<img src="${safeUrl(settings.logo_url)}" alt="${safe(settings.studio_name||"SFAKTOR GAMES")}">`;
        }
      });
      if(settings.favicon_url){
        let icon=document.querySelector("link[rel='icon']");
        if(!icon){icon=document.createElement("link");icon.rel="icon";document.head.appendChild(icon);}
        icon.href=safeUrl(settings.favicon_url);
      }
    }

    if(banners && banners.length){sfaktorPublicBanners=banners;renderHeroSlider(banners.filter(b=>b.active!==false));}
    if(games && games.length){
      sfaktorPublicGames=games;

      renderGameGrid(games);
    }
  }catch(e){
    console.warn("CMS yüklenemedi:",e);
  }
}

function gamePageUrl(game){
  return `${window.SFAKTOR_PREVIEW?"ONIZLEME-OYUN.html":"game.html"}?slug=${encodeURIComponent(game.slug)}&lang=${encodeURIComponent(currentSiteLang())}`;
}

function storeLinks(game, cls="hero-store-btn"){
  let out="";
  if(game.google_play_url) out+=`<a class="${cls}" href="${safeUrl(game.google_play_url)}" target="_blank" rel="noopener" onclick="event.stopPropagation()">Google Play</a>`;
  if(game.app_store_url) out+=`<a class="${cls}" href="${safeUrl(game.app_store_url)}" target="_blank" rel="noopener" onclick="event.stopPropagation()">App Store</a>`;
  if(game.steam_url) out+=`<a class="${cls}" href="${safeUrl(game.steam_url)}" target="_blank" rel="noopener" onclick="event.stopPropagation()">Steam</a>`;
  return out;
}

let sfaktorPublicGames=[];
let sfaktorPublicBanners=[];
function bannerLink(url){
 if(!url)return '';
 if(/^https?:\/\//i.test(url)){try{const u=new URL(url);return u.href}catch{return ''}}
 if(/^(game\.html\?slug=[a-z0-9_-]+|page\.html\?slug=[a-z0-9_-]+|#[a-z0-9_-]+)$/i.test(url))return url;
 return '';
}
function renderHeroSlider(banners){
 const host=document.getElementById('heroSlides');if(!host)return;
 if(!banners.length){
   host.innerHTML='<article class="hero-slide active"><div class="hero-slide-bg hero-no-image"></div><div class="hero-slide-inner"><div class="hero-slide-copy"><h1 class="hero-banner-slogan">SFAKTOR GAMES</h1></div></div></article>';
   const dots=document.getElementById('sliderDots');if(dots)dots.innerHTML='';
   document.dispatchEvent(new CustomEvent('sfaktorSliderReady'));return;
 }
 host.innerHTML=banners.map((b,i)=>{
  const title=safe(localizedGame(b,'title')||b.name||'SFAKTOR GAMES');
  const desc=safe(localizedGame(b,'description'));
  const logo=b.logo_url?safeUrl(b.logo_url):'';
  const bg=b.image_url?safeUrl(b.image_url):'';
  const link=bannerLink(b.link_url);
  const target=link&&/^https?:\/\//i.test(link)?' target="_blank" rel="noopener noreferrer"':'';
  const linkedLogo=logo?`<img class="hero-game-logo" src="${logo}" alt="" loading="${i===0?'eager':'lazy'}">`:'';
  const background=`<div class="hero-slide-bg ${bg?'':'hero-no-image'}"${bg?` style="background-image:url(&quot;${safe(bg)}&quot;)"`:''}></div>`;
  return `<article class="hero-slide ${i===0?'active':''}" data-index="${i}" aria-hidden="${i!==0}">
    ${background}
    <div class="hero-slide-inner"><div class="hero-slide-copy">
    ${linkedLogo}
    <h2 class="hero-banner-slogan">${title}</h2>
    ${desc?`<p class="hero-banner-desc">${desc}</p>`:''}
    ${link?`<a class="banner-cta" href="${safe(link)}"${target}>${safe(currentSiteLang()==='tr'?'Detayları Gör':currentSiteLang()==='de'?'Mehr erfahren':'Learn more')} →</a>`:''}
    </div></div></article>`;
 }).join('');
 const dots=document.getElementById('sliderDots');
 if(dots)dots.innerHTML=banners.map((_,i)=>`<button class="slider-dot ${i===0?'active':''}" data-slide="${i}" aria-label="Banner ${i+1}" aria-current="${i===0?'true':'false'}"></button>`).join('');
 document.dispatchEvent(new CustomEvent('sfaktorSliderReady'));
}

function renderGameGrid(games){
  const grid=document.getElementById("gamesGrid");
  if(!grid)return;
  grid.innerHTML=games.map((g,i)=>{
    const title=safe(localizedGame(g,"title"));
    const artwork=g.cover_url||g.banner_url||"";
    const background=artwork?`style="background-image:url('${safeUrl(artwork)}')"`:"";
    const links=storeLinks(g,"card-store-link");
    return `<article class="game-card reveal ${i%2?"reveal-delay-1":""}">
      <a href="${gamePageUrl(g)}" class="game-art" ${background} aria-label="${title}"><span class="game-art-shine"></span></a>
      <div class="game-content"><h3><a href="${gamePageUrl(g)}">${title}</a></h3>
      ${links?`<div class="card-store-links">${links}</div>`:""}</div>
    </article>`;
  }).join("");
  document.dispatchEvent(new CustomEvent("sfaktorContentReady"));
}

function renderMarquee(games){
  const track=document.getElementById("gameMarquee");
  if(!track)return;
  const names=[...games.map(g=>localizedGame(g,"title")),...games.map(g=>localizedGame(g,"title"))];
  track.innerHTML=names.map(name=>`<div class="game-marquee-item">${safe(name)}</div>`).join("");
}

function safe(v=""){return String(v).replace(/[&<>"']/g,m=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#039;"}[m]));}
function safeUrl(v=""){if(/^assets\/uploads\/[a-zA-Z0-9_./-]+$/.test(v)&&!v.includes(".."))return v;try{const u=new URL(v);return ["http:","https:"].includes(u.protocol)?u.href:"#"}catch{return "#"}}


function currentSiteLang(){
  return localStorage.getItem("sfaktor_lang") || document.documentElement.lang || "tr";
}
function localizedGame(g, field){
  const lang=currentSiteLang();
  return g[`${field}_${lang}`] || g[`${field}_en`] || g[`${field}_tr`] || g[field] || "";
}

document.addEventListener("DOMContentLoaded",loadCmsContent);

// Refresh banner and game card translations without refreshing the page.
document.addEventListener("sfaktorLanguageChanged",()=>{
  renderHeroSlider(sfaktorPublicBanners.filter(b=>b.active!==false));
  if(sfaktorPublicGames.length)renderGameGrid(sfaktorPublicGames);
});
