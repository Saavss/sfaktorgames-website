/* Accessible social links; populated from local published settings. */
(function(){
 const valid=u=>{try{const v=new URL(u);return ['https:','http:'].includes(v.protocol)?v.href:null}catch{return null}};
 const labels={tr:'Gizlilik Politikası',en:'Privacy Policy',de:'Datenschutzerklärung',ko:'개인정보 처리방침',pt:'Política de Privacidade','zh-CN':'隐私政策','zh-TW':'隱私權政策'};
 function language(){return new URLSearchParams(location.search).get('lang')||localStorage.getItem('sfaktor_lang')||'tr'}
 async function init(){const footer=document.querySelector('footer');if(!footer)return;
  let settings;try{const r=await db.from('site_settings').select('*').eq('id',1).maybeSingle();settings=r.data||{}}catch{settings={}}
  // Inline SVG icons work offline and in exported GitHub Pages ZIP files.
  // No external icon font, CSS library or third-party image request is needed.
  const icons={
   x:'<path d="M18.9 2H22l-6.78 7.75L23.2 22h-6.25l-4.9-7.43L5.55 22H2.4l7.25-8.28L1.8 2h6.4l4.44 6.8L18.9 2Zm-1.1 18h1.72L7.25 3.9H5.4L17.8 20Z"/>',
   facebook:'<path d="M22 12a10 10 0 1 0-11.56 9.88v-6.99H7.9V12h2.54V9.8c0-2.5 1.49-3.89 3.77-3.89 1.09 0 2.23.2 2.23.2v2.46h-1.26c-1.24 0-1.62.77-1.62 1.56V12h2.77l-.45 2.89h-2.32v6.99A10 10 0 0 0 22 12Z"/>',
   youtube:'<path d="M21.58 6.19a2.73 2.73 0 0 0-1.92-1.93C17.97 3.8 12 3.8 12 3.8s-5.97 0-7.66.46a2.73 2.73 0 0 0-1.92 1.93C1.97 7.88 1.97 12 1.97 12s0 4.12.45 5.81a2.73 2.73 0 0 0 1.92 1.93c1.69.46 7.66.46 7.66.46s5.97 0 7.66-.46a2.73 2.73 0 0 0 1.92-1.93c.45-1.69.45-5.81.45-5.81s0-4.12-.45-5.81ZM10 15.5v-7l6 3.5-6 3.5Z"/>',
   instagram:'<rect x="2.5" y="2.5" width="19" height="19" rx="5" fill="none" stroke="currentColor" stroke-width="2"/><circle cx="12" cy="12" r="4.25" fill="none" stroke="currentColor" stroke-width="2"/><circle cx="17.65" cy="6.35" r="1.2"/>',
   tiktok:'<path d="M16.7 2c.22 2.2 1.48 3.68 3.55 3.83v3.54a8.18 8.18 0 0 1-4.3-1.27v6.83c0 4.25-3.22 7.07-7.1 7.07-3.48 0-6.1-2.55-6.1-5.95 0-3.56 2.84-6.18 6.33-6.18.37 0 .7.03 1.05.1v3.62a3.23 3.23 0 0 0-1.05-.17c-1.51 0-2.64 1.1-2.64 2.63 0 1.47 1.06 2.42 2.41 2.42 1.56 0 2.5-1.09 2.5-2.69V2h4.35Z"/>'
  };
  const routes=[['x_url','X','x'],['facebook_url','Facebook','facebook'],['youtube_url','YouTube','youtube'],['instagram_url','Instagram','instagram'],['tiktok_url','TikTok','tiktok']];
  const existing=footer.querySelector('.sf-social');if(existing)existing.remove();
  const social=document.createElement('nav');social.className='sf-social';social.setAttribute('aria-label','Social media');
  for(const [key,label,icon] of routes){
   const href=valid(settings[key]);if(!href)continue;
   const a=document.createElement('a');a.href=href;a.target='_blank';a.rel='noopener noreferrer';a.className='sf-social-icon sf-social-'+icon;
   a.setAttribute('aria-label',label);a.title=label;
   a.innerHTML='<svg viewBox="0 0 24 24" aria-hidden="true" focusable="false" fill="currentColor">'+icons[icon]+'</svg>';
   social.appendChild(a);
  }
  if(social.children.length){
   const privacyContainer=footer.querySelector('a[data-privacy-label],a[href^="privacy.html"],a[href^="ONIZLEME-GIZLILIK.html"]')?.parentElement;
   if(privacyContainer&&privacyContainer!==footer)footer.insertBefore(social,privacyContainer);else footer.appendChild(social);
  }
  let p=footer.querySelector('a[href^="privacy.html"],a[href^="ONIZLEME-GIZLILIK.html"],a[data-privacy-label]');if(!p){p=document.createElement('a');footer.appendChild(p)}
  p.setAttribute('data-privacy-label','');if(!p.id)p.href=window.SFAKTOR_PREVIEW?'ONIZLEME-GIZLILIK.html':'privacy.html';
  const refresh=()=>{const lang=language();p.textContent=labels[lang]||labels.en;if(!p.id){const pathname=window.SFAKTOR_PREVIEW?'ONIZLEME-GIZLILIK.html':'privacy.html';p.href=pathname+'?lang='+encodeURIComponent(lang)}};refresh();document.addEventListener('sfaktorLanguageChanged',refresh);
 }
 document.readyState==='loading'?document.addEventListener('DOMContentLoaded',init):init();
})();
