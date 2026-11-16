let sliderIndex=0;
let sliderTimer=null;
let sliderCleanup=null;
const sliderDelay=6500;

function initSlider(){
  if(sliderCleanup)sliderCleanup();
  const slides=[...document.querySelectorAll(".hero-slide")];
  const dots=[...document.querySelectorAll(".slider-dot")];
  const slider=document.getElementById("homeSlider");
  if(!slides.length||!slider)return;
  const slideHost=document.getElementById("heroSlides");
  let startX=null;
  let currentIndex=0;
  function showSlide(index){
    currentIndex=(index+slides.length)%slides.length;
    sliderIndex=currentIndex;
    // The entire horizontal track moves from right to left for the next slide.
    slideHost.style.transform=`translate3d(-${currentIndex*100}%,0,0)`;
    slides.forEach((s,i)=>{
      const active=i===currentIndex;
      s.classList.toggle("active",active);
      s.setAttribute("aria-hidden",String(!active));
      s.querySelectorAll("a").forEach(a=>a.tabIndex=active?0:-1);
    });
    dots.forEach((d,i)=>{d.classList.toggle("active",i===currentIndex);d.setAttribute("aria-current",String(i===currentIndex))});
    clearInterval(sliderTimer);
    if(slides.length>1)sliderTimer=setInterval(()=>showSlide(currentIndex+1),sliderDelay);
  }
  const handlers=[];
  function attach(element,event,fn,opts){element?.addEventListener(event,fn,opts);if(element)handlers.push(()=>element.removeEventListener(event,fn,opts))}
  dots.forEach((d,i)=>attach(d,"click",()=>showSlide(i)));
  attach(document.getElementById("sliderPrev"),"click",()=>showSlide(currentIndex-1));
  attach(document.getElementById("sliderNext"),"click",()=>showSlide(currentIndex+1));
  attach(slider,"touchstart",e=>{startX=e.touches[0].clientX},{passive:true});
  attach(slider,"touchend",e=>{if(startX===null)return;const d=e.changedTouches[0].clientX-startX;if(Math.abs(d)>55)showSlide(currentIndex+(d<0?1:-1));startX=null},{passive:true});
  attach(slider,"mouseenter",()=>clearInterval(sliderTimer));
  attach(slider,"mouseleave",()=>showSlide(currentIndex));
  sliderCleanup=()=>{clearInterval(sliderTimer);handlers.forEach(fn=>fn());};
  if(slides.length<2){document.querySelector(".slider-ui")?.classList.add("single-slide")}else{document.querySelector(".slider-ui")?.classList.remove("single-slide")}
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
