import{g as M,d as F,e as H}from"./index.js";const X="_swiperContainer_5trx4_3",Y="_mySwiper_5trx4_13",D="_dark_5trx4_25",N="_swiperSlide_5trx4_33",R="_lightbox_5trx4_187",U="_lightboxImg_5trx4_213",W={swiperContainer:X,mySwiper:Y,dark:D,swiperSlide:N,lightbox:R,lightboxImg:U};function V(c){const{effect:t,swiper:e,on:a,setTranslate:d,setTransition:n,overwriteParams:f,perspective:w,recreateShadows:o,getEffectParams:h}=c;a("beforeInit",()=>{if(e.params.effect!==t)return;e.classNames.push(`${e.params.containerModifierClass}${t}`),w&&w()&&e.classNames.push(`${e.params.containerModifierClass}3d`);const s=f?f():{};Object.assign(e.params,s),Object.assign(e.originalParams,s)}),a("setTranslate",()=>{e.params.effect===t&&d()}),a("setTransition",(s,p)=>{e.params.effect===t&&n(p)}),a("transitionEnd",()=>{if(e.params.effect===t&&o){if(!h||!h().slideShadows)return;e.slides.forEach(s=>{s.querySelectorAll(".swiper-slide-shadow-top, .swiper-slide-shadow-right, .swiper-slide-shadow-bottom, .swiper-slide-shadow-left").forEach(p=>p.remove())}),o()}});let r;a("virtualUpdate",()=>{e.params.effect===t&&(e.slides.length||(r=!0),requestAnimationFrame(()=>{r&&e.slides&&e.slides.length&&(d(),r=!1)}))})}function B(c,t){const e=M(t);return e!==t&&(e.style.backfaceVisibility="hidden",e.style["-webkit-backface-visibility"]="hidden"),e}function P(c,t,e){const a=`swiper-slide-shadow${e?`-${e}`:""}${` swiper-slide-shadow-${c}`}`,d=M(t);let n=d.querySelector(`.${a.split(" ").join(".")}`);return n||(n=F("div",a.split(" ")),d.append(n)),n}function Z(c){let{swiper:t,extendParams:e,on:a}=c;e({coverflowEffect:{rotate:50,stretch:0,depth:100,scale:1,modifier:1,slideShadows:!0}}),V({effect:"coverflow",swiper:t,on:a,setTranslate:()=>{const{width:f,height:w,slides:o,slidesSizesGrid:h}=t,r=t.params.coverflowEffect,s=t.isHorizontal(),p=t.translate,O=s?-p+f/2:-p+w/2,T=s?r.rotate:-r.rotate,k=r.depth,q=H(t);for(let u=0,I=o.length;u<I;u+=1){const l=o[u],y=h[u],z=l.swiperSlideOffset,C=(O-z-y/2)/y,i=typeof r.modifier=="function"?r.modifier(C):C*r.modifier;let S=s?T*i:0,x=s?0:T*i,E=-k*Math.abs(i),m=r.stretch;typeof m=="string"&&m.indexOf("%")!==-1&&(m=parseFloat(r.stretch)/100*y);let _=s?0:m*i,$=s?m*i:0,v=1-(1-r.scale)*Math.abs(i);Math.abs($)<.001&&($=0),Math.abs(_)<.001&&(_=0),Math.abs(E)<.001&&(E=0),Math.abs(S)<.001&&(S=0),Math.abs(x)<.001&&(x=0),Math.abs(v)<.001&&(v=0);const A=`translate3d(${$}px,${_}px,${E}px)  rotateX(${q(x)}deg) rotateY(${q(S)}deg) scale(${v})`,j=B(r,l);if(j.style.transform=A,l.style.zIndex=-Math.abs(Math.round(i))+1,r.slideShadows){let g=s?l.querySelector(".swiper-slide-shadow-left"):l.querySelector(".swiper-slide-shadow-top"),b=s?l.querySelector(".swiper-slide-shadow-right"):l.querySelector(".swiper-slide-shadow-bottom");g||(g=P("coverflow",l,s?"left":"top")),b||(b=P("coverflow",l,s?"right":"bottom")),g&&(g.style.opacity=i>0?i:0),b&&(b.style.opacity=-i>0?-i:0)}}},setTransition:f=>{t.slides.map(o=>M(o)).forEach(o=>{o.style.transitionDuration=`${f}ms`,o.querySelectorAll(".swiper-slide-shadow-top, .swiper-slide-shadow-right, .swiper-slide-shadow-bottom, .swiper-slide-shadow-left").forEach(h=>{h.style.transitionDuration=`${f}ms`})})},perspective:()=>!0,overwriteParams:()=>({watchSlidesProgress:!0})})}export{Z as E,W as s};
