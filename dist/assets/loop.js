import{e as D,r as y,j as l,S as H,N as z,P as U,b as G,d as K}from"./index.js";function Y(g){let{swiper:e,extendParams:T,on:u,emit:r,params:p}=g;e.autoplay={running:!1,paused:!1,timeLeft:0},T({autoplay:{enabled:!1,delay:3e3,waitForTransition:!0,disableOnInteraction:!1,stopOnLastSlide:!1,reverseDirection:!1,pauseOnMouseEnter:!1}});let a,n,s=p&&p.autoplay?p.autoplay.delay:3e3,c=p&&p.autoplay?p.autoplay.delay:3e3,i,v=new Date().getTime(),I,L,h,j,x,f,P;function M(t){!e||e.destroyed||!e.wrapperEl||t.target===e.wrapperEl&&(e.wrapperEl.removeEventListener("transitionend",M),!(P||t.detail&&t.detail.bySwiperTouchMove)&&m())}const O=()=>{if(e.destroyed||!e.autoplay.running)return;e.autoplay.paused?I=!0:I&&(c=i,I=!1);const t=e.autoplay.paused?i:v+c-new Date().getTime();e.autoplay.timeLeft=t,r("autoplayTimeLeft",t,t/s),n=requestAnimationFrame(()=>{O()})},V=()=>{let t;return e.virtual&&e.params.virtual.enabled?t=e.slides.filter(o=>o.classList.contains("swiper-slide-active"))[0]:t=e.slides[e.activeIndex],t?parseInt(t.getAttribute("data-swiper-autoplay"),10):void 0},b=t=>{if(e.destroyed||!e.autoplay.running)return;cancelAnimationFrame(n),O();let d=typeof t>"u"?e.params.autoplay.delay:t;s=e.params.autoplay.delay,c=e.params.autoplay.delay;const o=V();!Number.isNaN(o)&&o>0&&typeof t>"u"&&(d=o,s=o,c=o),i=d;const S=e.params.speed,R=()=>{!e||e.destroyed||(e.params.autoplay.reverseDirection?!e.isBeginning||e.params.loop||e.params.rewind?(e.slidePrev(S,!0,!0),r("autoplay")):e.params.autoplay.stopOnLastSlide||(e.slideTo(e.slides.length-1,S,!0,!0),r("autoplay")):!e.isEnd||e.params.loop||e.params.rewind?(e.slideNext(S,!0,!0),r("autoplay")):e.params.autoplay.stopOnLastSlide||(e.slideTo(0,S,!0,!0),r("autoplay")),e.params.cssMode&&(v=new Date().getTime(),requestAnimationFrame(()=>{b()})))};return d>0?(clearTimeout(a),a=setTimeout(()=>{R()},d)):requestAnimationFrame(()=>{R()}),d},_=()=>{v=new Date().getTime(),e.autoplay.running=!0,b(),r("autoplayStart")},E=()=>{e.autoplay.running=!1,clearTimeout(a),cancelAnimationFrame(n),r("autoplayStop")},w=(t,d)=>{if(e.destroyed||!e.autoplay.running)return;clearTimeout(a),t||(f=!0);const o=()=>{r("autoplayPause"),e.params.autoplay.waitForTransition?e.wrapperEl.addEventListener("transitionend",M):m()};if(e.autoplay.paused=!0,d){x&&(i=e.params.autoplay.delay),x=!1,o();return}i=(i||e.params.autoplay.delay)-(new Date().getTime()-v),!(e.isEnd&&i<0&&!e.params.loop)&&(i<0&&(i=0),o())},m=()=>{e.isEnd&&i<0&&!e.params.loop||e.destroyed||!e.autoplay.running||(v=new Date().getTime(),f?(f=!1,b(i)):b(),e.autoplay.paused=!1,r("autoplayResume"))},N=()=>{if(e.destroyed||!e.autoplay.running)return;const t=D();t.visibilityState==="hidden"&&(f=!0,w(!0)),t.visibilityState==="visible"&&m()},A=t=>{t.pointerType==="mouse"&&(f=!0,P=!0,!(e.animating||e.autoplay.paused)&&w(!0))},F=t=>{t.pointerType==="mouse"&&(P=!1,e.autoplay.paused&&m())},k=()=>{e.params.autoplay.pauseOnMouseEnter&&(e.el.addEventListener("pointerenter",A),e.el.addEventListener("pointerleave",F))},B=()=>{e.el&&typeof e.el!="string"&&(e.el.removeEventListener("pointerenter",A),e.el.removeEventListener("pointerleave",F))},$=()=>{D().addEventListener("visibilitychange",N)},q=()=>{D().removeEventListener("visibilitychange",N)};u("init",()=>{e.params.autoplay.enabled&&(k(),$(),_())}),u("destroy",()=>{B(),q(),e.autoplay.running&&E()}),u("_freeModeStaticRelease",()=>{(h||f)&&m()}),u("_freeModeNoMomentumRelease",()=>{e.params.autoplay.disableOnInteraction?E():w(!0,!0)}),u("beforeTransitionStart",(t,d,o)=>{e.destroyed||!e.autoplay.running||(o||!e.params.autoplay.disableOnInteraction?w(!0,!0):E())}),u("sliderFirstMove",()=>{if(!(e.destroyed||!e.autoplay.running)){if(e.params.autoplay.disableOnInteraction){E();return}L=!0,h=!1,f=!1,j=setTimeout(()=>{f=!0,h=!0,w(!0)},200)}}),u("touchEnd",()=>{if(!(e.destroyed||!e.autoplay.running||!L)){if(clearTimeout(j),clearTimeout(a),e.params.autoplay.disableOnInteraction){h=!1,L=!1;return}h&&e.params.cssMode&&m(),h=!1,L=!1}}),u("slideChange",()=>{e.destroyed||!e.autoplay.running||(x=!0)}),Object.assign(e.autoplay,{start:_,stop:E,pause:w,resume:m})}const J="_swiperLoop_1np2i_5",Q="_swiperSlide_1np2i_21",C={swiperLoop:J,swiperSlide:Q};function W(){const[g,e]=y.useState([]),[T,u]=y.useState(1),r=y.useRef(null);y.useEffect(()=>{(()=>{const s=new URLSearchParams(window.location.hash.substring(1)),c=s.get("feed"),i=parseInt(s.get("scene"),10);console.log(`Initial hash params - feed: ${c}, scene: ${i}`),window.history.replaceState(null,null,"#feed=nasa&scene=1")})(),(async()=>{try{const s=await fetch("https://api.nasa.gov/planetary/apod?api_key=DEMO_KEY&hd=True&count=11");if(!s.ok)throw new Error(`HTTP error! status: ${s.status}`);const c=await s.json();e(c)}catch(s){console.error("Failed to fetch images: "+s)}})()},[]),y.useEffect(()=>{const a=()=>{const n=new URLSearchParams(window.location.hash.substring(1)),s=parseInt(n.get("scene"),10);!isNaN(s)&&s>0&&s<12&&r.current?r.current.swiper.slideToLoop(s-1):r.current.swiper.slideToLoop(0)};return window.addEventListener("hashchange",a),()=>{window.removeEventListener("hashchange",a)}},[]);const p=a=>{const n=a.realIndex+1;u(n),window.history.replaceState(null,null,`#feed=nasa&scene=${n}`),window.parent.postMessage({activeIndex:n,source:"swiper"},"*")};return y.useEffect(()=>{console.log(`activeIndex updated: ${T}`)},[T]),y.useEffect(()=>{(()=>{document.querySelectorAll(".swiper-slide iframe").forEach(n=>{n.addEventListener("mouseenter",()=>{n.style.pointerEvents="auto"}),n.addEventListener("mouseleave",()=>{n.style.pointerEvents="none"})})})()},[g]),l.jsx("div",{children:l.jsx(H,{grabCursor:!0,loop:g.length>3,initialSlide:0,centeredSlides:!0,slidesPerView:6,slidesPerGroup:1,autoplay:{delay:1e4,disableOnInteraction:!1},breakpoints:{1024:{slidesPerView:6},600:{slidesPerView:4},480:{slidesPerView:3},320:{slidesPerView:2}},modules:[Y,z,U],navigation:!0,pagination:{clickable:!0},onSlideChange:p,className:C.swiperLoop,ref:r,children:g.map((a,n)=>l.jsx(G,{className:C.swiperSlide,children:l.jsxs("a",{href:a.url,target:"_blank",rel:"noopener noreferrer",children:[a.media_type==="video"?l.jsx("iframe",{src:a.url,title:a.title,allowFullScreen:!0}):l.jsx("img",{src:a.url,alt:a.title||"Slide Image"}),l.jsx("p",{children:a.title})]})},n))})})}function X(){return l.jsx(l.Fragment,{children:l.jsx(W,{})})}K(document.getElementById("root")).render(l.jsx(y.StrictMode,{children:l.jsx(X,{})}));
