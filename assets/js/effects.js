
let sliderIndex=0;
let sliderTimer=null;
const sliderDelay=6500;

function initSlider(){
  const slides=[...document.querySelectorAll(".hero-slide")];
  const dots=[...document.querySelectorAll(".slider-dot")];
  if(!slides.length)return;

  const progress=document.getElementById("sliderProgress");

  function restartProgress(){
    if(!progress)return;
    progress.classList.remove("run");
    void progress.offsetWidth;
    progress.classList.add("run");
  }

  function showSlide(index){
    sliderIndex=(index+slides.length)%slides.length;
    slides.forEach((s,i)=>s.classList.toggle("active",i===sliderIndex));
    dots.forEach((d,i)=>d.classList.toggle("active",i===sliderIndex));
    restartProgress();
    clearInterval(sliderTimer);
    if(slides.length>1)sliderTimer=setInterval(()=>showSlide(sliderIndex+1),sliderDelay);
  }

  dots.forEach((d,i)=>d.addEventListener("click",()=>showSlide(i)));
  document.getElementById("sliderPrev")?.addEventListener("click",()=>showSlide(sliderIndex-1));
  document.getElementById("sliderNext")?.addEventListener("click",()=>showSlide(sliderIndex+1));

  let startX=null;
  const slider=document.getElementById("homeSlider");
  slider?.addEventListener("touchstart",e=>startX=e.touches[0].clientX,{passive:true});
  slider?.addEventListener("touchend",e=>{
    if(startX===null)return;
    const delta=e.changedTouches[0].clientX-startX;
    if(Math.abs(delta)>55)showSlide(sliderIndex+(delta<0?1:-1));
    startX=null;
  },{passive:true});

  showSlide(0);
}

function initReveal(){
  const observer=new IntersectionObserver(entries=>{
    entries.forEach(entry=>{
      if(entry.isIntersecting){
        entry.target.classList.add("revealed");
        observer.unobserve(entry.target);
      }
    });
  },{threshold:.12,rootMargin:"0px 0px -45px"});
  document.querySelectorAll(".reveal:not(.revealed)").forEach(el=>observer.observe(el));
}

function initHeader(){
  const header=document.querySelector(".site-header");
  const set=()=>header?.classList.toggle("scrolled",window.scrollY>30);
  set();window.addEventListener("scroll",set,{passive:true});
}

function initCursorGlow(){
  const glow=document.getElementById("cursorGlow");
  if(!glow)return;
  window.addEventListener("pointermove",e=>{
    glow.style.left=e.clientX+"px";
    glow.style.top=e.clientY+"px";
  },{passive:true});
}

document.addEventListener("DOMContentLoaded",()=>{
  initHeader();
  initCursorGlow();
  initReveal();
});
document.addEventListener("sfaktorSliderReady",initSlider);
document.addEventListener("sfaktorContentReady",initReveal);
