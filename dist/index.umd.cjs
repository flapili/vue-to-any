(function(t,e){typeof exports=="object"&&typeof module<"u"?e(exports,require("vue"),require("defu"),require("html2canvas"),require("uuid")):typeof define=="function"&&define.amd?define(["exports","vue","defu","html2canvas","uuid"],e):(t=typeof globalThis<"u"?globalThis:t||self,e(t["Vue-to-any"]={},t.Vue,t.defu,t.html2canvas,t.uuid))})(this,function(t,e,l,y,h){"use strict";const k=e.defineComponent({inheritAttrs:!1,__name:"Renderer",setup(T,{expose:w}){const i=e.reactive({});async function x({component:d,props:f,returnType:n,renderOptions:s,html2canvasOptions:_}){var m;const o=l(s,{nextTicks:1,style:{}});if(o.nextTicks<1)throw new Error("nextTicks must be greater than 0");if(n===void 0&&(n="B64Image"),!["B64Image","canvas"].includes(n))throw new Error("returnType must be either B64Image or canvas");o.style.display===void 0&&(o.style.display="none"),o.style=l(o.style,{position:"fixed"});const r=h.v4(),g={component:e.markRaw(d),props:f,id:r,instance:null,renderOptions:o,finalStyle:o.style};i[r]=g;for(let a=0;a<o.nextTicks;a++)await e.nextTick();if(i[r].instance===null)throw delete i[r],new Error(`Component not rendered after ${o.nextTicks} ticks`);const c=(m=i[r].instance.vnode)==null?void 0:m.el;if(!c)throw delete i[r],new Error("Unable to get html from component");if(n==="html")return c.outerHTML;const u=await y(c,{..._,onclone(a,B){var p;B.style.display=((p=s==null?void 0:s.style)==null?void 0:p.display)??"block"}});return delete i[r],n==="canvas"?u:u.toDataURL("image/png")}return w({render:x}),(d,f)=>(e.openBlock(!0),e.createElementBlock(e.Fragment,null,e.renderList(i,n=>(e.openBlock(),e.createBlock(e.resolveDynamicComponent(n.component),e.mergeProps({key:n.id,ref_for:!0},n.props,{style:n.finalStyle,onVnodeMounted:s=>n.instance=s.component}),null,16,["style","onVnodeMounted"]))),128))}});t.Renderer=k,Object.defineProperty(t,Symbol.toStringTag,{value:"Module"})});
