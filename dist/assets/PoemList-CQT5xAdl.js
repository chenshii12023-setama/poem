import{s as h}from"./poem-service-BuzQRXcw.js";import{_ as m,c,o as l,a as s,w as u,v as p,F as g,r as f,t as n}from"./index-DViaX2Tl.js";async function y(){const{data:a,error:e}=await h.from("poems").select(`
      id,
      title,
      content,
      dynasty,
      genre,
      theme,
      authors(name)
    `).order("id",{ascending:!0});if(e)throw e;return a}async function P(a){const{data:e,error:o}=await h.from("poems").select(`
      id,
      title,
      content,
      dynasty,
      genre,
      theme,
      authors(name)
    `).or(`title.ilike.%${a}%,content.ilike.%${a}%`).order("id",{ascending:!0});if(o)throw o;return e}const _={data(){return{poems:[],page:1,limit:10,searchQuery:""}},async created(){await this.fetchPoems()},methods:{async fetchPoems(){this.poems=await y(this.page,this.limit)},async searchPoems(){this.searchQuery.trim()?this.poems=await P(this.searchQuery):await this.fetchPoems()},viewPoemDetail(a){this.$router.push(`/poem/${a}`)},async nextPage(){this.page++,await this.fetchPoems()},async prevPage(){this.page>1&&(this.page--,await this.fetchPoems())}}},v={class:"poem-list"},w={class:"search-box"},k={class:"poem-grid"},b=["onClick"],x={class:"author"},Q={class:"content"},C={class:"meta"},D={class:"pagination"},B=["disabled"];function F(a,e,o,I,r,i){return l(),c("div",v,[e[4]||(e[4]=s("h1",null,"诗词赏析",-1)),s("div",w,[u(s("input",{"onUpdate:modelValue":e[0]||(e[0]=t=>r.searchQuery=t),placeholder:"搜索诗词或作者...",onInput:e[1]||(e[1]=(...t)=>i.searchPoems&&i.searchPoems(...t))},null,544),[[p,r.searchQuery]])]),s("div",k,[(l(!0),c(g,null,f(r.poems,t=>{var d;return l(),c("div",{key:t.id,class:"poem-card",onClick:L=>i.viewPoemDetail(t.id)},[s("h3",null,n(t.title),1),s("p",x,n((d=t.authors)==null?void 0:d.name),1),s("p",Q,n(t.content.substring(0,20))+"...",1),s("div",C,[s("span",null,n(t.dynasty)+"·"+n(t.genre),1)])],8,b)}),128))]),s("div",D,[s("button",{onClick:e[2]||(e[2]=(...t)=>i.prevPage&&i.prevPage(...t)),disabled:r.page===1},"上一页",8,B),s("span",null,"第 "+n(r.page)+" 页",1),s("button",{onClick:e[3]||(e[3]=(...t)=>i.nextPage&&i.nextPage(...t))},"下一页")])])}const M=m(_,[["render",F],["__scopeId","data-v-4b4d6c4e"]]);export{M as default};
