(()=>{var s=Object.create;var e=Object.defineProperty;var c=Object.getOwnPropertyDescriptor;var v=Object.getOwnPropertyNames;var P=Object.getPrototypeOf,l=Object.prototype.hasOwnProperty;var f=(o=>typeof require<"u"?require:typeof Proxy<"u"?new Proxy(o,{get:(r,i)=>(typeof require<"u"?require:r)[i]}):o)(function(o){if(typeof require<"u")return require.apply(this,arguments);throw new Error('Dynamic require of "'+o+'" is not supported')});var a=(o,r,i,p)=>{if(r&&typeof r=="object"||typeof r=="function")for(let t of v(r))!l.call(o,t)&&t!==i&&e(o,t,{get:()=>r[t],enumerable:!(p=c(r,t))||p.enumerable});return o};var n=(o,r,i)=>(i=o!=null?s(P(o)):{},a(r||!o||!o.__esModule?e(i,"default",{value:o,enumerable:!0}):i,o));var m=n(f("react"));var d=n(f("react")),g=({id:o,name:r,desc:i,price:p})=>d.default.createElement("div",{id:o},d.default.createElement("h1",null,"Product ",r),d.default.createElement("p",null,"Price $",p),d.default.createElement("p",null,"Description: ",i)),u=g;var x=({result:o})=>(console.log(o),o.loading?m.default.createElement("div",null,"loading..."):m.default.createElement("div",null,o.products.map((r,i)=>m.default.createElement(u,{key:i,...r})))),h=x;})();
//# sourceMappingURL=bundle.js.map
