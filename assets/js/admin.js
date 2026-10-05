
const $ = (id) => document.getElementById(id);

async function checkSession(){
  const { data } = await db.auth.getSession();
  if(data.session) showDashboard();
  else showLogin();
}

function showLogin(){
  $("loginView").classList.remove("hidden");
  $("dashboardView").classList.add("hidden");
}
function showDashboard(){
  $("loginView").classList.add("hidden");
  $("dashboardView").classList.remove("hidden");
  loadAll();
}

$("loginBtn").addEventListener("click", async ()=>{
  $("loginMessage").textContent = "Giriş yapılıyor...";
  const { error } = await db.auth.signInWithPassword({
    email: $("email").value.trim(),
    password: $("password").value
  });
  if(error){ $("loginMessage").textContent = error.message; return; }
  $("loginMessage").textContent = "";
  showDashboard();
});

$("logoutBtn").addEventListener("click", async ()=>{
  await db.auth.signOut();
  showLogin();
});

document.querySelectorAll(".nav-item").forEach(btn=>{
  btn.addEventListener("click", ()=>{
    document.querySelectorAll(".nav-item").forEach(x=>x.classList.remove("active"));
    document.querySelectorAll(".tab").forEach(x=>x.classList.remove("active"));
    btn.classList.add("active");
    $("tab-"+btn.dataset.tab).classList.add("active");
    $("pageTitle").textContent = btn.textContent;
  });
});
document.querySelectorAll("[data-close]").forEach(btn=>{
  btn.addEventListener("click", ()=>$(btn.dataset.close).classList.add("hidden"));
});

async function loadAll(){
  await Promise.all([loadGames(), loadNews(), loadPages(), loadSettings()]);
}

async function loadGames(){
  const { data, error } = await db.from("games").select("*").order("sort_order", {ascending:true});
  if(error){ console.error(error); return; }
  $("gameCount").textContent = data.length;
  $("gamesList").innerHTML = data.map(g=>`
    <div class="item">
      <div><strong>${esc(g.title)}</strong><p>${esc(g.status || "")} • ${esc((g.platforms||[]).join(", "))}</p></div>
      <button onclick='editGame(${JSON.stringify(g).replace(/'/g,"&#39;")})'>Düzenle</button>
    </div>`).join("");
}

window.editGame = (g)=>{
  $("gameEditor").classList.remove("hidden");
  $("gameId").value=g.id||"";
  $("gameTitle").value=g.title||"";
  $("gameSlug").value=g.slug||"";
  $("gameDescription").value=g.description||"";
  $("gameStatus").value=g.status||"Published";
  $("gamePlatforms").value=(g.platforms||[]).join(", ");
  $("gameFeatured").value=String(g.featured ?? true);
  $("gameSortOrder").value=g.sort_order ?? 0;
  $("gameGooglePlay").value=g.google_play_url||"";
  $("gameAppStore").value=g.app_store_url||"";
  $("gameSteam").value=g.steam_url||"";
  $("gameTrailer").value=g.trailer_url||"";
  $("gameBanner").value=g.banner_url||"";
  $("gameCover").value=g.cover_url||"";
  $("gameLogo").value=g.logo_url||"";
  $("gameScreenshots").value=(g.screenshots||[]).join(", ");
  $("gameLongDescription").value=g.long_description||"";
};
$("newGameBtn").addEventListener("click",()=>editGame({platforms:[]}));

$("saveGameBtn").addEventListener("click", async ()=>{
  const id=$("gameId").value;
  const payload={
    title:$("gameTitle").value.trim(),
    slug:$("gameSlug").value.trim(),
    description:$("gameDescription").value.trim(),
    status:$("gameStatus").value,
    platforms:$("gamePlatforms").value.split(",").map(x=>x.trim()).filter(Boolean),
    featured:$("gameFeatured").value==="true",
    sort_order:Number($("gameSortOrder").value)||0,
    google_play_url:$("gameGooglePlay").value.trim()||null,
    app_store_url:$("gameAppStore").value.trim()||null,
    steam_url:$("gameSteam").value.trim()||null,
    trailer_url:$("gameTrailer").value.trim()||null,
    banner_url:$("gameBanner").value.trim()||null,
    cover_url:$("gameCover").value.trim()||null,
    logo_url:$("gameLogo").value.trim()||null,
    screenshots:$("gameScreenshots").value.split(",").map(x=>x.trim()).filter(Boolean),
    long_description:$("gameLongDescription").value.trim()
  };
  const q = id ? db.from("games").update(payload).eq("id",id) : db.from("games").insert(payload);
  const {error}=await q;
  if(error){alert(error.message);return;}
  $("gameEditor").classList.add("hidden");
  loadGames();
});
$("deleteGameBtn").addEventListener("click", async ()=>{
  const id=$("gameId").value;
  if(!id || !confirm("Bu oyunu silmek istediğine emin misin?")) return;
  const {error}=await db.from("games").delete().eq("id",id);
  if(error){alert(error.message);return;}
  $("gameEditor").classList.add("hidden"); loadGames();
});


async function uploadAsset(file, folder="general"){
  if(!file){ alert("Önce bir dosya seç."); return null; }
  const ext=(file.name.split(".").pop()||"bin").toLowerCase();
  const safeName=(file.name.replace(/[^a-zA-Z0-9._-]/g,"-")).toLowerCase();
  const path=`${folder}/${Date.now()}-${safeName}`;
  const {error}=await db.storage.from("site-assets").upload(path,file,{upsert:false,contentType:file.type||undefined});
  if(error){alert(error.message);return null;}
  const {data}=db.storage.from("site-assets").getPublicUrl(path);
  return data.publicUrl;
}

$("uploadGameBannerBtn").addEventListener("click",async()=>{
  const url=await uploadAsset($("gameBannerFile").files[0],"games/banners");
  if(url)$("gameBanner").value=url;
});
$("uploadGameCoverBtn").addEventListener("click",async()=>{
  const url=await uploadAsset($("gameCoverFile").files[0],"games/covers");
  if(url)$("gameCover").value=url;
});
$("uploadGameLogoBtn").addEventListener("click",async()=>{
  const url=await uploadAsset($("gameLogoFile").files[0],"games/logos");
  if(url)$("gameLogo").value=url;
});
$("uploadGameScreenshotsBtn").addEventListener("click",async()=>{
  const files=[...$("gameScreenshotsFile").files];
  if(!files.length){alert("Önce ekran görüntülerini seç.");return;}
  const urls=[];
  for(const file of files){
    const url=await uploadAsset(file,"games/screenshots");
    if(url)urls.push(url);
  }
  const old=$("gameScreenshots").value.split(",").map(x=>x.trim()).filter(Boolean);
  $("gameScreenshots").value=[...old,...urls].join(", ");
});


async function loadNews(){
  const {data,error}=await db.from("news").select("*").order("created_at",{ascending:false});
  if(error){console.error(error);return;}
  $("newsCount").textContent=data.length;
  $("newsList").innerHTML=data.map(n=>`
  <div class="item"><div><strong>${esc(n.title)}</strong><p>${esc(n.excerpt||"")}</p></div>
  <button onclick='editNews(${JSON.stringify(n).replace(/'/g,"&#39;")})'>Düzenle</button></div>`).join("");
}
window.editNews=(n)=>{
  $("newsEditor").classList.remove("hidden");
  $("newsId").value=n.id||"";
  $("newsTitle").value=n.title||"";
  $("newsExcerpt").value=n.excerpt||"";
  $("newsContent").value=n.content||"";
  $("newsCover").value=n.cover_url||"";
};
$("newNewsBtn").addEventListener("click",()=>editNews({}));
$("saveNewsBtn").addEventListener("click",async()=>{
  const id=$("newsId").value;
  const payload={title:$("newsTitle").value.trim(),excerpt:$("newsExcerpt").value.trim(),content:$("newsContent").value.trim(),cover_url:$("newsCover").value.trim()||null};
  const q=id?db.from("news").update(payload).eq("id",id):db.from("news").insert(payload);
  const {error}=await q;if(error){alert(error.message);return;}
  $("newsEditor").classList.add("hidden");loadNews();
});
$("deleteNewsBtn").addEventListener("click",async()=>{
  const id=$("newsId").value;if(!id||!confirm("Haberi silmek istediğine emin misin?"))return;
  const {error}=await db.from("news").delete().eq("id",id);if(error){alert(error.message);return;}
  $("newsEditor").classList.add("hidden");loadNews();
});


async function loadPages(){
  const {data,error}=await db.from("pages").select("*").order("created_at",{ascending:false});
  if(error){console.error(error);return;}
  $("pagesList").innerHTML=(data||[]).map(p=>`
    <div class="item">
      <div>
        <strong>${esc(p.title)}</strong>
        <p>${esc(p.language||"tr")} • ${p.published?"Yayında":"Taslak"} • page.html?slug=${esc(p.slug)}</p>
      </div>
      <button onclick='editContentPage(${JSON.stringify(p).replace(/'/g,"&#39;")})'>Düzenle</button>
    </div>`).join("");
}

window.editContentPage=(p)=>{
  $("pageEditor").classList.remove("hidden");
  $("contentPageId").value=p.id||"";
  $("contentPageTitle").value=p.title||"";
  $("contentPageSlug").value=p.slug||"";
  $("contentPageDescription").value=p.description||"";
  $("contentPageBody").value=p.body||"";
  $("contentPageLanguage").value=p.language||"tr";
  $("contentPagePublished").value=String(p.published ?? true);
};

$("newPageBtn").addEventListener("click",()=>editContentPage({language:"tr",published:true}));

$("savePageBtn").addEventListener("click",async()=>{
  const id=$("contentPageId").value;
  const slug=$("contentPageSlug").value.trim().toLowerCase()
    .replace(/ğ/g,"g").replace(/ü/g,"u").replace(/ş/g,"s").replace(/ı/g,"i").replace(/ö/g,"o").replace(/ç/g,"c")
    .replace(/[^a-z0-9]+/g,"-").replace(/^-+|-+$/g,"");
  $("contentPageSlug").value=slug;
  const payload={
    title:$("contentPageTitle").value.trim(),
    slug,
    description:$("contentPageDescription").value.trim(),
    body:$("contentPageBody").value,
    language:$("contentPageLanguage").value,
    published:$("contentPagePublished").value==="true",
    updated_at:new Date().toISOString()
  };
  if(!payload.title||!payload.slug){alert("Başlık ve URL alanı zorunlu.");return;}
  const q=id?db.from("pages").update(payload).eq("id",id):db.from("pages").insert(payload);
  const {error}=await q;
  if(error){alert(error.message);return;}
  $("pageEditor").classList.add("hidden");
  loadPages();
});

$("deletePageBtn").addEventListener("click",async()=>{
  const id=$("contentPageId").value;
  if(!id||!confirm("Bu sayfayı silmek istediğine emin misin?"))return;
  const {error}=await db.from("pages").delete().eq("id",id);
  if(error){alert(error.message);return;}
  $("pageEditor").classList.add("hidden");
  loadPages();
});


async function loadSettings(){
  const {data,error}=await db.from("site_settings").select("*").eq("id",1).maybeSingle();
  if(error){console.error(error);return;}
  const s=data||{};
  $("settingStudioName").value=s.studio_name||"SFAKTOR GAMES";
  $("settingEmail").value=s.contact_email||"contact@sfaktorgames.com";
  $("settingHeroTitle").value=s.hero_title||"WE CREATE WORLDS.";
  $("settingHeroText").value=s.hero_text||"";
  $("settingAbout").value=s.about_text||"";
  $("settingLogo").value=s.logo_url||"";
  $("settingFavicon").value=s.favicon_url||"";
  $("settingYoutube").value=s.youtube_url||"";
  $("settingInstagram").value=s.instagram_url||"";
  $("settingDiscord").value=s.discord_url||"";
}
$("uploadLogoBtn").addEventListener("click",async()=>{
  const url=await uploadAsset($("settingLogoFile").files[0],"brand");
  if(url)$("settingLogo").value=url;
});
$("uploadFaviconBtn").addEventListener("click",async()=>{
  const url=await uploadAsset($("settingFaviconFile").files[0],"brand");
  if(url)$("settingFavicon").value=url;
});

$("saveSettingsBtn").addEventListener("click",async()=>{
  const payload={
    id:1,
    studio_name:$("settingStudioName").value.trim(),
    contact_email:$("settingEmail").value.trim(),
    hero_title:$("settingHeroTitle").value.trim(),
    hero_text:$("settingHeroText").value.trim(),
    about_text:$("settingAbout").value.trim(),
    logo_url:$("settingLogo").value.trim()||null,
    favicon_url:$("settingFavicon").value.trim()||null,
    youtube_url:$("settingYoutube").value.trim()||null,
    instagram_url:$("settingInstagram").value.trim()||null,
    discord_url:$("settingDiscord").value.trim()||null
  };
  const {error}=await db.from("site_settings").upsert(payload);
  if(error){alert(error.message);return;} alert("Kaydedildi.");
});

function esc(v=""){return String(v).replace(/[&<>"']/g,m=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#039;"}[m]));}
checkSession();
