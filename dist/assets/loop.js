import{r,h as f,j as s,S as h,N as x,P as S,a as k,b as j,c as m}from"./index.js";const g="_swiperLoop_wa9wx_5",L="_dark_wa9wx_21",P="_swiperSlide_wa9wx_29",p={swiperLoop:g,dark:L,swiperSlide:P};function v({images:i}){const o=r.useRef(null),[u,n]=r.useState(!1);r.useEffect(()=>{const e=()=>n(window.parent.document.body.classList.contains("dark"));e();const t=new MutationObserver(e);return t.observe(window.parent.document.body,{attributes:!0,attributeFilter:["class"]}),()=>t.disconnect()},[]),r.useEffect(()=>{const e=t=>{if(j.includes(t.origin)){const{action:l,scene:a}=t.data;if(l==="changeSlide"&&!isNaN(a)){const c=o.current.swiper,d=i[a-1];d&&window.parent.postMessage({url:d.url,title:d.title,explanation:d.explanation,source:"loop"},"*"),a>0&&a<=18&&o.current?c.slideToLoop(a-1):c.slideToLoop(0)}}};return window.addEventListener("message",e),()=>window.removeEventListener("message",e)},[i]);const w=(e,t,l,a)=>{const c=e+1;console.log("Slide clicked, real index:",c),o.current.swiper&&o.current.swiper.slideToLoop(e),window.parent.postMessage({index:c,url:t,title:l,explanation:a,source:"loop"},"*")};return r.useEffect(()=>{f()},[i]),s.jsx("div",{className:`${p.swiperLoopContainer} ${u?p.dark:""}`,children:s.jsx(h,{grabCursor:!0,loop:i.length>7,initialSlide:0,centeredSlides:!0,slidesPerView:8,slidesPerGroup:1,spaceBetween:10,breakpoints:{1200:{slidesPerView:8},1024:{slidesPerView:7},800:{slidesPerView:6},650:{slidesPerView:5},550:{slidesPerView:4},425:{slidesPerView:3},320:{slidesPerView:2}},modules:[x,S],navigation:!0,pagination:{clickable:!0},className:p.swiperLoop,ref:o,children:i.map((e,t)=>s.jsx(k,{className:p.swiperSlide,onClick:()=>w(t,e.url,e.title,e.explanation),children:s.jsxs("a",{href:"#",onClick:l=>l.preventDefault(),children:[e.media_type==="video"?s.jsx("iframe",{src:e.url,title:e.title,allowFullScreen:!0}):s.jsx("img",{src:e.url,alt:e.title||"Slide Image"}),s.jsx("p",{children:e.title})]})},t))})})}function E(){const[i,o]=r.useState([]);return r.useEffect(()=>{(async()=>{try{const n=await fetch("https://api.nasa.gov/planetary/apod?api_key=DEMO_KEY&hd=True&count=18");if(!n.ok)throw new Error(`HTTP error! status: ${n.status}`);const w=await n.json();o(w)}catch(n){console.error("Failed to fetch images: "+n)}})()},[]),s.jsx("div",{children:s.jsx(v,{images:i})})}m(document.getElementById("root")).render(s.jsx(r.StrictMode,{children:s.jsx(E,{})}));
