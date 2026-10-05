
async function loadCmsContent(){
  try{
    const [{data:games},{data:settings},{data:news}] = await Promise.all([
      db.from("games").select("*").order("sort_order",{ascending:true}),
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

    if(games && games.length){
      renderHeroSlider(games.filter(g=>g.featured !== false));
      renderGameGrid(games);
      renderMarquee(games);
    }
  }catch(e){
    console.warn("CMS yüklenemedi:",e);
  }
}

function gamePageUrl(game){
  return `game.html?slug=${encodeURIComponent(game.slug)}`;
}

function storeLinks(game, cls="hero-store-btn"){
  let out="";
  if(game.google_play_url) out+=`<a class="${cls}" href="${safeUrl(game.google_play_url)}" target="_blank" rel="noopener" onclick="event.stopPropagation()">Google Play</a>`;
  if(game.app_store_url) out+=`<a class="${cls}" href="${safeUrl(game.app_store_url)}" target="_blank" rel="noopener" onclick="event.stopPropagation()">App Store</a>`;
  if(game.steam_url) out+=`<a class="${cls}" href="${safeUrl(game.steam_url)}" target="_blank" rel="noopener" onclick="event.stopPropagation()">Steam</a>`;
  return out;
}

function renderHeroSlider(games){
  const host=document.getElementById("heroSlides");
  if(!host || !games.length)return;

  host.innerHTML=games.map((g,i)=>{
    const bg=g.banner_url||g.cover_url||"";
    const bgStyle=bg?`style="background-image:url('${safeUrl(bg)}')"`:"";
    const platforms=(g.platforms||[]).map(p=>`<span class="hero-badge">${safe(p)}</span>`).join("");
    const title=g.logo_url
      ? `<img class="hero-game-logo" src="${safeUrl(g.logo_url)}" alt="${safe(localizedGame(g,"title"))}">`
      : `<h1>${safe(localizedGame(g,"title"))}</h1>`;
    return `
      <article class="hero-slide ${i===0?"active":""}" data-index="${i}">
        <a href="${gamePageUrl(g)}" class="hero-slide-bg ${bg?"":"hero-no-image"}" ${bgStyle} aria-label="${safe(localizedGame(g,"title"))}"></a>
        <div class="hero-slide-inner">
          <div class="hero-slide-copy">
            <p class="eyebrow">${safe(g.status||"SFAKTOR GAMES")}</p>
            ${title}
            <div class="hero-badges">${platforms}</div>
            <p class="hero-description">${safe(localizedGame(g,"description"))}</p>
            <div class="hero-store-row">
              <a class="hero-detail-btn" href="${gamePageUrl(g)}">Oyunu İncele →</a>
              ${storeLinks(g)}
            </div>
          </div>
        </div>
      </article>`;
  }).join("");

  const dots=document.getElementById("sliderDots");
  if(dots)dots.innerHTML=games.map((_,i)=>`<button class="slider-dot ${i===0?"active":""}" data-slide="${i}" aria-label="${i+1}. oyun"></button>`).join("");

  window.SFAKTOR_SLIDER_COUNT=games.length;
  document.dispatchEvent(new CustomEvent("sfaktorSliderReady"));
}

function renderGameGrid(games){
  const grid=document.getElementById("gamesGrid");
  if(!grid)return;
  grid.innerHTML=games.map((g,i)=>`
    <article class="game-card reveal ${i%2?"reveal-delay-1":""}">
      <a href="${gamePageUrl(g)}" class="game-art"
        ${g.cover_url?`style="background-image:linear-gradient(to top,rgba(0,0,0,.94),rgba(0,0,0,.08)),url('${safeUrl(g.cover_url)}')"`:""}></a>
      <div class="game-content">
        <p class="eyebrow">${safe(g.status||"")}</p>
        <h3><a href="${gamePageUrl(g)}">${safe(localizedGame(g,"title"))}</a></h3>
        <p>${safe(localizedGame(g,"description"))}</p>
        <div class="platforms">${(g.platforms||[]).map(p=>`<span class="platform">${safe(p)}</span>`).join("")}</div>
        <div class="card-store-links">
          <a href="${gamePageUrl(g)}">Oyunu İncele →</a>
          ${storeLinks(g,"card-store-link")}
        </div>
      </div>
    </article>`).join("");
  document.dispatchEvent(new CustomEvent("sfaktorContentReady"));
}

function renderMarquee(games){
  const track=document.getElementById("gameMarquee");
  if(!track)return;
  const names=[...games.map(g=>localizedGame(g,"title")),...games.map(g=>localizedGame(g,"title"))];
  track.innerHTML=names.map(name=>`<div class="game-marquee-item">${safe(name)}</div>`).join("");
}

function safe(v=""){return String(v).replace(/[&<>"']/g,m=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#039;"}[m]));}
function safeUrl(v=""){try{const u=new URL(v);return ["http:","https:"].includes(u.protocol)?u.href:"#"}catch{return "#"}}


function currentSiteLang(){
  return localStorage.getItem("sfaktor_lang") || document.documentElement.lang || "tr";
}
function localizedGame(g, field){
  const lang=currentSiteLang();
  return g[`${field}_${lang}`] || g[field] || "";
}

document.addEventListener("DOMContentLoaded",loadCmsContent);
