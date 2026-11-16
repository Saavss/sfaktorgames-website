document.getElementById("year").textContent = new Date().getFullYear();

const menuBtn = document.querySelector(".menu-btn");
const nav = document.querySelector(".site-header nav");
if (menuBtn && nav) {
  menuBtn.addEventListener("click", () => nav.classList.toggle("open"));
}



/* Same-page navigation: scroll under fixed glass header, close mobile menu. */
(function(){
  const header=document.querySelector('.site-header');
  const links=[...document.querySelectorAll('.site-header nav a[href^="#"]')];
  if(!header || !links.length)return;
  const prefersReduced=window.matchMedia('(prefers-reduced-motion: reduce)');
  const getTarget=(anchor)=>{
    const id=decodeURIComponent(anchor.hash.slice(1));
    return id ? document.getElementById(id) : null;
  };
  function activate(id){
    links.forEach(link=>{
      const current=link.hash==='#'+id;
      link.classList.toggle('is-current',current);
      if(current)link.setAttribute('aria-current','location');
      else link.removeAttribute('aria-current');
    });
  }
  links.forEach(link=>link.addEventListener('click',e=>{
    const target=getTarget(link);
    if(!target)return;
    e.preventDefault();
    const y=Math.max(0,window.scrollY+target.getBoundingClientRect().top-header.getBoundingClientRect().height-18);
    window.scrollTo({top:y,behavior:prefersReduced.matches?'instant':'smooth'});
    document.querySelector('.site-header nav')?.classList.remove('open');
    activate(target.id);
    // Keep the destination URL shareable without triggering a second jump.
    if(history.replaceState) history.replaceState(null,'',link.hash);
  }));
  const sections=links.map(link=>getTarget(link)).filter(Boolean);
  let rafPending=false;
  function updateActive(){
    rafPending=false;
    const probe=header.getBoundingClientRect().height+Math.min(120,window.innerHeight*.16);
    let active='';
    for(const section of sections){if(section.getBoundingClientRect().top<=probe)active=section.id;}
    activate(active);
  }
  window.addEventListener('scroll',()=>{
    if(!rafPending){rafPending=true;requestAnimationFrame(updateActive);}
  },{passive:true});
  window.addEventListener('resize',updateActive,{passive:true});
  updateActive();
})();
