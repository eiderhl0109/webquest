(function(){const a=document.createElement("link").relList;if(a&&a.supports&&a.supports("modulepreload"))return;for(const o of document.querySelectorAll('link[rel="modulepreload"]'))t(o);new MutationObserver(o=>{for(const l of o)if(l.type==="childList")for(const s of l.addedNodes)s.tagName==="LINK"&&s.rel==="modulepreload"&&t(s)}).observe(document,{childList:!0,subtree:!0});function n(o){const l={};return o.integrity&&(l.integrity=o.integrity),o.referrerPolicy&&(l.referrerPolicy=o.referrerPolicy),o.crossOrigin==="use-credentials"?l.credentials="include":o.crossOrigin==="anonymous"?l.credentials="omit":l.credentials="same-origin",l}function t(o){if(o.ep)return;o.ep=!0;const l=n(o);fetch(o.href,l)}})();const Na=new Set(["area","base","br","col","embed","hr","img","input","link","meta","source","track","wbr"]),Za=new Set([...Na,..."a abbr address article aside audio b blockquote body button canvas caption cite code colgroup data datalist dd del details dfn dialog div dl dt em fieldset figcaption figure footer form h1 h2 h3 h4 h5 h6 head header hgroup html i iframe ins kbd label legend li main map mark menu meter nav noscript object ol optgroup option output p picture pre progress q s samp script search section select small span strong style sub summary sup svg table tbody td template textarea tfoot th thead time title tr u ul var video".split(" ")]),uo={li:["ul","ol","menu"],tr:["table","thead","tbody","tfoot"],td:["tr"],th:["tr"],thead:["table"],tbody:["table"],tfoot:["table"],caption:["table"],option:["select","optgroup","datalist"],figcaption:["figure"]},Sa={ul:["li"],ol:["li"],tr:["td","th"],table:["tr","caption","colgroup","thead","tbody","tfoot"],thead:["tr"],tbody:["tr"],tfoot:["tr"],select:["option","optgroup"]},On=new Set(`align-content align-items align-self animation aspect-ratio background background-attachment background-color background-image background-position background-repeat background-size
  border border-bottom border-collapse border-color border-left border-radius border-right border-spacing border-style border-top border-width bottom box-shadow box-sizing caption-side clear color column-gap columns content cursor
  display flex flex-basis flex-direction flex-flow flex-grow flex-shrink flex-wrap float font font-family font-size font-style font-variant font-weight gap grid grid-area grid-auto-flow grid-auto-rows grid-column grid-row grid-template grid-template-areas grid-template-columns grid-template-rows
  height justify-content justify-items justify-self left letter-spacing line-height list-style list-style-image list-style-position list-style-type margin margin-bottom margin-left margin-right margin-top max-height max-width min-height min-width
  object-fit opacity order outline overflow overflow-x overflow-y padding padding-bottom padding-left padding-right padding-top place-content place-items position right row-gap table-layout text-align text-decoration text-indent text-shadow text-transform top transform transition
  vertical-align visibility white-space width word-spacing z-index`.split(/\s+/)),po=/^(width|height|(min|max)-(width|height)|margin(-\w+)?|padding(-\w+)?|top|right|bottom|left|gap|row-gap|column-gap|font-size|border-radius|border(-\w+)?-width|letter-spacing|word-spacing|text-indent|flex-basis)$/;function kt(e,a){const n=Array.from({length:a.length+1},(t,o)=>o);for(let t=1;t<=e.length;t++){let o=n[0];n[0]=t;for(let l=1;l<=a.length;l++){const s=n[l];n[l]=Math.min(n[l]+1,n[l-1]+1,o+(e[t-1]===a[l-1]?0:1)),o=s}}return n[a.length]}function $t(e,a){let n,t=Math.max(2,Math.floor(e.length/3))+1;for(const o of a){const l=kt(e,o);l<t&&([n,t]=[o,l])}return n}const Ce=(e,a)=>e.slice(0,a).split(`
`).length;function Lt(e,a,n,t,o){let l="",s=0;for(;;){const r=e.indexOf(a,s);if(r<0)return l+e.slice(s);const c=e.indexOf(n,r+a.length);if(c<0)return t.push({line:Ce(e,r),level:"error",msg:`El comentario que empieza aquí no se cierra: falta ${o}.`}),l+e.slice(s,r);l+=e.slice(s,r)+e.slice(r,c+n.length).replace(/[^\n]/g," "),s=c+n.length}}function _n(e){const a=[],n=Lt(e,"<!--","-->",a,"-->"),t=[],o=new Map,l=[],s=(i,d)=>a.push({line:i,level:"error",msg:d}),r=(i,d)=>a.push({line:i,level:"aviso",msg:d});/<html[\s>]/i.test(n)&&!/<!doctype\s+html\s*>/i.test(n)&&r(1,"Falta <!DOCTYPE html> en la primera línea.");let c=0;for(;(c=n.indexOf("<",c))>=0;){const i=Ce(n,c),d=n[c+1]??"";if(d==="!"){c=n.indexOf(">",c)<0?n.length:n.indexOf(">",c)+1;continue}if(!/[a-zA-Z/]/.test(d)){c++;continue}let m=c+1,y="";for(;m<n.length;){const q=n[m];if(y)q===y&&(y="");else if(q==='"'||q==="'")y=q;else if(q===">"||q==="<")break;m++}const g=n.slice(c,m),v=d==="/",k=(/^<\/?\s*([a-zA-Z][a-zA-Z0-9-]*)/.exec(g)?.[1]??"").toLowerCase();if(n[m]!==">"){if(y?s(i,`En <${k}> falta cerrar unas comillas ${y}.`):s(i,`A la etiqueta <${v?"/":""}${k}> le falta el > del final.`),c=m,y)break;continue}if(c=m+1,!k)continue;if(!Za.has(k)){const q=$t(k,Za);r(i,`<${v?"/":""}${k}> no es una etiqueta de HTML${q?`: ¿querías decir <${v?"/":""}${q}>?`:"."}`)}if(v){if(Na.has(k)){s(i,`</${k}> sobra: <${k}> es una etiqueta vacía y no se cierra.`);continue}const q=t.map(E=>E.name).lastIndexOf(k);if(q<0){const E=l.indexOf(k);E>=0?l.splice(E,1):s(i,`</${k}> cierra un <${k}> que no está abierto.`);continue}for(const E of t.splice(q+1).reverse())s(E.line,`<${E.name}> (línea ${E.line}) no se ha cerrado: falta </${E.name}> antes de </${k}> (línea ${i}). Se cierran en orden inverso al que se abren.`),l.push(E.name);t.pop();continue}const _=/\sid\s*=\s*["']?([^"'\s>]+)/i.exec(g)?.[1];_&&(o.has(_)?r(i,`El id «${_}» ya se usa en la línea ${o.get(_)}: cada id solo puede estar una vez (para repetir, usa class).`):o.set(_,i)),/\sclass\s*=\s*["'][^"']*\.[\w-]/i.test(g)&&r(i,'En class="…" los nombres van sin punto: el punto solo se pone en el CSS.'),k==="img"&&!/\salt\s*=/i.test(g)&&r(i,"<img> sin alt: describe la imagen para quien no la ve (y lo suelen pedir).");const M=t[t.length-1]?.name,T=uo[k];if(T&&Za.has(k)&&!T.includes(M??""))s(i,`<${k}> tiene que ir dentro de ${T.map(q=>`<${q}>`).join(" o ")}${M?`, no dentro de <${M}>`:""}.`);else if(M&&Sa[M]&&!Sa[M].includes(k)){const E=["table","thead","tbody","tfoot"].includes(M)?`mete <${k}> en una celda <td> de una fila <tr>${M==="table"?" (si es el título de la tabla, usa <caption>)":""}`:`mete <${k}> en un <${M==="tr"?"td":Sa[M][0]}>`;s(i,`Dentro de <${M}> solo puede ir ${Sa[M].map(A=>`<${A}>`).join(", ")}: ${E}.`)}if(!(Na.has(k)||g.endsWith("/"))){if(k==="style"||k==="script"){const q=n.toLowerCase().indexOf(`</${k}`,c);q<0&&s(i,`<${k}> no se cierra.`);const E=q<0?-1:n.indexOf(">",q);c=E<0?n.length:E+1;continue}t.push({name:k,line:i})}}for(const i of t)s(i.line,`<${i.name}> no se cierra: falta </${i.name}>.`);return a.sort((i,d)=>i.line-d.line)}function va(e){const a=[],n=Lt(e,"/*","*/",a,"*/"),t=[],o=(i,d)=>a.push({line:i,level:"error",msg:d}),l=(i,d)=>a.push({line:i,level:"aviso",msg:d}),s=[];let r=0;for(let i=0;i<n.length;i++){const d=n[i];if(d==="{"){const m=n.slice(r,i),y=Ce(n,r+m.length-m.trimStart().length),g=m.trim().replace(/\s+/g," "),v=n.indexOf("}",i),k=n.indexOf("{",i+1);if(g.startsWith("@")){mo(g,y,o),s.push(i),r=i+1;continue}if(g||o(Ce(n,i),"Hay unas llaves { } sin selector delante: ¿a qué se aplica?"),v<0||k>=0&&k<v){o(Ce(n,i),`Falta cerrar con } la regla «${g||"{"}».`),r=i+1;continue}g&&t.push({selector:g,line:y,decls:ho(n,i+1,v,a)}),i=v,r=v+1}else d==="}"&&(s.length?s.pop():o(Ce(n,i),"Esta } sobra: no cierra ninguna llave."),r=i+1)}for(const i of s)o(Ce(n,i),"Falta cerrar con } el bloque @media.");const c=n.slice(r).trim();c&&o(Ce(n,n.length-n.slice(r).trimStart().length),`«${c.slice(0,30)}» está fuera de cualquier regla: falta el { o sobra.`);for(const i of t)for(const d of i.decls){if(!d.prop.startsWith("--")&&!On.has(d.prop)){const m=$t(d.prop,On);l(d.line,`«${d.prop}» no es una propiedad de CSS${m?`: ¿querías decir ${m}?`:"."}`)}po.test(d.prop)&&d.value.split(/\s+/).some(m=>/^-?(\d+\.?\d*|\.\d+)$/.test(m)&&Number(m)!==0)&&o(d.line,`En «${d.prop}: ${d.value}» falta la unidad (px, %, em, rem…). Solo el 0 va sin unidad.`)}return{rules:t,issues:a.sort((i,d)=>i.line-d.line)}}function mo(e,a,n){const t=/^@([\w-]*)/.exec(e)?.[1].toLowerCase()??"";if(t!=="media"){kt(t,"media")<=2&&n(a,`«@${t}» no existe: se escribe @media.`);return}const o=e.slice(6).trim();if(!o.includes("(")){n(a,"La condición de @media va entre paréntesis: @media (max-width: 600px) { … }.");return}for(const l of o.matchAll(/\(([^)]*)\)?/g)){const s=l[1].trim();l[0].endsWith(")")?/^(min|max)-(width|height)\s+[\d.]/.test(s)?n(a,`En «(${s})» faltan los dos puntos: (${s.replace(/\s+/,": ")}).`):/^(min|max)-(width|height)\s*:\s*[\d.]+\s*$/.test(s)&&!/:\s*0\s*$/.test(s)&&n(a,`En «(${s})» falta la unidad: (${s}px).`):n(a,`Falta cerrar el paréntesis en «@media ${o}».`)}}function ho(e,a,n,t){const o=[],l=[];let s=a;for(const r of e.slice(a,n).split(";")){const c=Ce(e,s+r.length-r.trimStart().length);s+=r.length+1;const i=r.trim().split(`
`);let d=[],m=c;i.forEach((y,g)=>{g>0&&/^\s*[a-z-]+\s*:/.test(y)&&d.join("").includes(":")&&(t.push({line:c+g-1,level:"error",msg:"Falta el ; al final de esta línea."}),l.push({body:d.join(`
`).trim(),line:m}),d=[],m=c+g),d.push(y)}),l.push({body:d.join(`
`).trim(),line:m})}for(const{body:r,line:c}of l){if(!r)continue;const i=r.indexOf(":");if(i<0){t.push({line:c,level:"error",msg:`En «${r}» faltan los dos puntos: se escribe propiedad: valor;`});continue}const d=r.slice(0,i).trim().toLowerCase(),m=r.slice(i+1).trim();m?/\s/.test(d)&&t.push({line:c,level:"error",msg:`«${d}» no puede llevar espacios: ¿falta un ; antes?`}):t.push({line:c,level:"error",msg:`«${d}» no tiene valor.`}),o.push({prop:d,value:m,line:c})}return o}const ga="index.html",J="estilos.css",bo=/<link\b[^>]*>/gi;function Ia(e,a){const n=new RegExp(`\\s${a}\\s*=\\s*(?:"([^"]*)"|'([^']*)'|([^\\s>]+))`,"i").exec(e);return n?n[1]??n[2]??n[3]:void 0}function _t(e){const a=Ia(e,"rel")?.trim().toLowerCase(),n=Ia(e,"href")?.trim().replace(/^\.\//,"");return a==="stylesheet"&&n===J}const go=e=>!/<(html|head|body)[\s>]/i.test(e);function qa({html:e,css:a}){let n=!1;const t=`<style data-file="${J}">
${a.replace(/<\/style/gi,"<\\/style")}
</style>`,o=e.replace(bo,s=>_t(s)?(n=!0,t):s),l=go(e);return{doc:l&&!n?`${t}
${o}`:o,linked:n,fragment:l}}const Bn=e=>(e??"").replace(/\s+/g," ").trim();let na;function Fn(e){return na??=document.createElement("canvas").getContext("2d"),na?(na.fillStyle="#010203",na.fillStyle=e.trim(),String(na.fillStyle)):e.trim().toLowerCase()}class Mn{constructor(a,n,t){this.doc=a,this.files=n,this.linked=t}doc;files;linked;views=new Map;frames=[];at(a){let n=this.views.get(a);return n||(n=new Promise(t=>{const o=document.createElement("iframe");o.setAttribute("sandbox","allow-same-origin"),o.setAttribute("aria-hidden","true"),o.tabIndex=-1,o.style.cssText=`position:fixed;top:0;left:${-a-100}px;width:${a}px;height:800px;border:0;visibility:hidden;pointer-events:none`,o.onload=()=>t(new Mn(o.contentDocument,this.files,this.linked)),o.srcdoc=qa(this.files).doc,document.body.append(o),this.frames.push(o)}),this.views.set(a,n)),n}release(){for(const a of this.frames)a.remove();this.frames=[],this.views.clear()}q(a){return this.doc.querySelector(a)}all(a){return[...this.doc.querySelectorAll(a)]}has(a){return!!this.q(a)}count(a){return this.all(a).length}text(a){const n=typeof a=="string"?this.q(a):a;return Bn(n?.textContent)}loose(a){return I(this.text(a))}attr(a,n){return Bn(this.q(a)?.getAttribute(n))}style(a,n){const t=typeof a=="string"?this.q(a):a;return t?this.doc.defaultView?.getComputedStyle(t).getPropertyValue(n).trim()??"":""}color(a,n,t){const o=this.style(a,n);return!!o&&Fn(o)===Fn(t)}px(a,n){return parseFloat(this.style(a,n))||0}kids(a){return[...this.q(a)?.children??[]].map(n=>n.tagName.toLowerCase())}htmlErrors(){return _n(this.files.html).filter(a=>a.level==="error").length}cssErrors(){return va(this.files.css).issues.filter(a=>a.level==="error").length}source(){return this.files.html.replace(/<!--[\s\S]*?-->/g,"")}}const I=e=>e.toLowerCase().normalize("NFD").replace(/[̀-ͯ]/g,"").replace(/\s+/g," ").trim(),p=(...e)=>e.join(`
`);function ge(e,...a){const n=/<head[\s>]([\s\S]*?)<\/head>/i.exec(e.source())?.[1]?.toLowerCase()??"";return a.every(t=>n.includes(t))}const K=(e,a)=>e.all("section").find(n=>I(n.querySelector("h2")?.textContent??"")===I(a))??null,Yn=(e,a)=>!!e&&!!a&&!!(e.compareDocumentPosition(a)&Node.DOCUMENT_POSITION_FOLLOWING),H=(e,a)=>`<!DOCTYPE html>
<html lang="es">
  <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${e}</title>
    <link rel="stylesheet" href="estilos.css">
  </head>
  <body>
${a}
  </body>
</html>
`,je=e=>/^\s*<!doctype html\s*>/i.test(e.source())&&e.attr("html","lang").toLowerCase().startsWith("es")&&ge(e,"charset","viewport"),fo=["logo.svg","tarta.svg","galletas.svg","cruasan.svg","bici.svg"],we=e=>e?.tagName==="IMG"&&e.complete&&e.naturalWidth>0;function qe(e,a){const n=e.all(a).map(t=>Math.round(t.getBoundingClientRect().top));return n.length>1&&n.every(t=>Math.abs(t-n[0])<4)}const Mt=(e,a)=>e==="grid"?{rojo:"roja",amarillo:"amarilla",verde:"verde",azul:"azul"}[a]:a,zt=e=>e==="flex"?"#muelle":"#patio",Gn=(e,a)=>`.${e==="flex"?"barco":"caja"}.${Mt(e,a)}`,he=["justify-content","flex-start · flex-end · center · space-between · space-around · space-evenly"],ta=["align-items","flex-start · flex-end · center · stretch"],Ne=["flex-direction","row · row-reverse · column · column-reverse"],Ke=[{id:"f1",part:"flex",title:"Al otro lado",text:p("El muelle es una caja con `display: flex`: sus hijos (los barcos) se ponen **en fila**, de izquierda a derecha.","","Para moverlos a lo largo de esa fila se usa `justify-content`. Lleva el barco rojo a su amarre, al final de la fila."),items:["rojo"],base:"display: flex;",target:"box",answer:"justify-content: flex-end;",props:[he]},{id:"f2",part:"flex",title:"En el centro",text:"Con el mismo `justify-content` también se centra la fila entera. Lleva los dos barcos al centro del muelle.",items:["rojo","amarillo"],base:"display: flex;",target:"box",answer:"justify-content: center;",props:[he]},{id:"f3",part:"flex",title:"Repartir el sitio",text:p("Hay valores que reparten el espacio que sobra:","- `space-between`: el primero pegado al principio, el último al final y el resto, repartido entre medias.","- `space-around`: cada barco con el mismo hueco a cada lado (en los bordes queda la mitad).","- `space-evenly`: todos los huecos iguales, también los de los bordes.","","Fíjate en los bordes de los amarres para saber cuál es."),items:["rojo","amarillo","verde"],base:"display: flex;",target:"box",answer:"justify-content: space-between;",props:[he]},{id:"f4",part:"flex",title:"Huecos a los lados",text:"Ahora los barcos no tocan los bordes, y los huecos de los extremos son la **mitad** que los de en medio.",items:["rojo","amarillo","verde"],base:"display: flex;",target:"box",answer:"justify-content: space-around;",props:[he]},{id:"f5",part:"flex",title:"Todos los huecos iguales",text:"Cuatro barcos y cinco huecos iguales: los de los bordes miden lo mismo que los de en medio.",items:["rojo","amarillo","verde","azul"],base:"display: flex;",target:"box",answer:"justify-content: space-evenly;",props:[he]},{id:"f6",part:"flex",title:"Hacia abajo",text:p("La fila tiene dos direcciones: a lo largo (izquierda y derecha, con `justify-content`) y de través (arriba y abajo, con `align-items`).","","Baja los barcos al fondo del muelle."),items:["rojo","amarillo","verde"],base:"display: flex;",target:"box",answer:"align-items: flex-end;",props:[ta]},{id:"f7",part:"flex",title:"Centrado del todo",text:p("Centrar una cosa en medio de una caja, en horizontal y en vertical, es lo que más se pide. Hacen falta las dos propiedades a la vez.","","Escribe cada declaración en su línea, con su `;` al final."),items:["rojo"],base:"display: flex;",target:"box",answer:`justify-content: center;
align-items: center;`,props:[he,ta]},{id:"f8",part:"flex",title:"Las dos a la vez",text:"Junta lo que ya sabes: reparte los barcos con huecos a los lados y bájalos al fondo.",items:["rojo","amarillo","verde"],base:"display: flex;",target:"box",answer:`justify-content: space-around;
align-items: flex-end;`,props:[he,ta]},{id:"f9",part:"flex",title:"Al revés",text:p("`flex-direction` cambia la dirección de la fila. Con `row-reverse` los barcos van de **derecha a izquierda**: el primero del HTML se queda a la derecha.","","Mira el orden de los colores en los amarres."),items:["rojo","amarillo","verde"],base:"display: flex;",target:"box",answer:"flex-direction: row-reverse;",props:[Ne]},{id:"f10",part:"flex",title:"En columna",text:"Con `flex-direction: column` los hijos se ponen **uno debajo de otro**. Es lo que se usa para que un menú pase a vertical en el móvil.",items:["rojo","amarillo","verde"],base:"display: flex;",target:"box",answer:"flex-direction: column;",props:[Ne]},{id:"f11",part:"flex",title:"El final está al otro lado",text:p("Cuidado: con `row-reverse` la fila empieza a la derecha, así que `flex-end` es **la izquierda**.","","Pon la fila al revés y llévala a la izquierda."),items:["rojo","amarillo","verde"],base:"display: flex;",target:"box",answer:`flex-direction: row-reverse;
justify-content: flex-end;`,props:[Ne,he]},{id:"f12",part:"flex",title:"Los ejes giran",text:p("En columna los ejes se cambian: `justify-content` mueve **arriba y abajo** y `align-items`, **izquierda y derecha**.","","Pon los barcos en columna, abajo del todo y en el centro."),items:["rojo","amarillo","verde"],base:"display: flex;",target:"box",answer:`flex-direction: column;
justify-content: flex-end;
align-items: center;`,props:[Ne,he,ta]},{id:"f13",part:"flex",title:"Uno se va al final",text:p("Ahora no escribes en el muelle, sino en **un barco**. `order` cambia el sitio de un hijo sin tocar el HTML: todos tienen `order: 0` y los de número más alto van detrás.","","Manda el barco amarillo al final de la fila."),items:["amarillo","rojo","verde","azul"],base:`display: flex;
justify-content: center;`,target:"amarillo",answer:"order: 1;",props:[["order","0 (el de siempre) · 1, 2… (detrás) · -1 (delante)"]]},{id:"f14",part:"flex",title:"Uno por su cuenta",text:"`align-self` es el `align-items` de un solo hijo: mueve solo ese barco de arriba abajo. Baja el verde al fondo y deja los demás arriba.",items:["rojo","verde","amarillo"],base:`display: flex;
justify-content: space-evenly;
align-items: flex-start;`,target:"verde",answer:"align-self: flex-end;",props:[["align-self","flex-start · flex-end · center · stretch"]]},{id:"f15",part:"flex",title:"Que bajen de fila",text:p("Si no caben en una fila, flexbox los aprieta o se salen de la caja. Con `flex-wrap: wrap` los que no caben **bajan a la fila siguiente**, como las tarjetas de una web.","","Cada barco ocupa aquí casi un tercio del muelle."),items:["rojo","amarillo","verde","azul","rojo","amarillo","verde"],base:"display: flex;",allItems:"width: 30%;",target:"box",answer:"flex-wrap: wrap;",props:[["flex-wrap","nowrap (no bajan) · wrap (bajan a otra fila)"]]},{id:"f16",part:"flex",title:"Huecos fijos",text:p("`gap` deja el mismo hueco entre cada dos hijos (no en los bordes). Es más cómodo que poner márgenes.","","Centra los barcos y deja **40px** entre ellos."),items:["rojo","amarillo","verde","azul"],base:`display: flex;
align-items: center;`,target:"box",answer:`justify-content: center;
gap: 40px;`,props:[he,["gap","10px · 20px · 40px… (el hueco entre hijos)"]]},{id:"f17",part:"flex",title:"Columnas que se llenan",text:p("Con columnas también se puede bajar de fila: cuando la columna se llena, sigue en otra a la derecha.","","`flex-flow` junta `flex-direction` y `flex-wrap` en una sola línea: `flex-flow: column wrap`."),items:["rojo","amarillo","verde","azul","rojo","amarillo","verde","azul","rojo"],base:"display: flex;",target:"box",answer:"flex-flow: column wrap;",props:[["flex-flow","(dirección) (wrap): row wrap · column wrap…"],Ne]},{id:"f18",part:"flex",title:"El último amarre",text:"El último del muelle: todo lo que has usado a la vez. Fíjate en el orden de los colores y en dónde queda la columna.",items:["rojo","amarillo","verde"],base:"display: flex;",target:"box",answer:`flex-direction: column-reverse;
justify-content: center;
align-items: flex-end;`,props:[Ne,he,ta]},{id:"g1",part:"grid",title:"Columnas iguales",text:p("El patio es una caja con `display: grid`: una **rejilla**. Sin más, cada caja va en su fila, una debajo de otra.","","`grid-template-columns` dice cuántas columnas hay y cuánto mide cada una. `1fr` es «una parte» del sitio libre: `1fr 1fr 1fr` son tres columnas iguales."),items:["rojo","amarillo","verde","azul","rojo","amarillo"],base:"display: grid;",target:"box",answer:"grid-template-columns: 1fr 1fr 1fr;",props:[["grid-template-columns","1fr 1fr 1fr · repeat(3, 1fr) · 200px 1fr · 2fr 1fr"]]},{id:"g2",part:"grid",title:"Sin repetirse",text:"Para no escribir `1fr` muchas veces está `repeat(veces, medida)`. Haz cuatro columnas iguales.",items:["rojo","amarillo","verde","azul","rojo","amarillo","verde","azul"],base:"display: grid;",target:"box",answer:"grid-template-columns: repeat(4, 1fr);",props:[["grid-template-columns","1fr 1fr 1fr · repeat(3, 1fr) · 200px 1fr · 2fr 1fr"]]},{id:"g3",part:"grid",title:"Una más ancha",text:"Las `fr` son partes: `2fr 1fr` da a la primera columna el doble que a la segunda (dos tercios y un tercio). Así se hace un contenido con su barra al lado.",items:["rojo","amarillo","verde","azul"],base:"display: grid;",target:"box",answer:"grid-template-columns: 2fr 1fr;",props:[["grid-template-columns","1fr 1fr · 2fr 1fr · 1fr 3fr · 200px 1fr"]]},{id:"g4",part:"grid",title:"Una fija y otra que se estira",text:p("Se pueden mezclar medidas: una columna de **150px** que no cambia y otra con `1fr` que se queda con todo lo demás.","","Es la forma típica de un menú lateral fijo y el contenido al lado."),items:["rojo","amarillo","verde","azul"],base:"display: grid;",target:"box",answer:"grid-template-columns: 150px 1fr;",props:[["grid-template-columns","150px 1fr · 1fr 150px · 2fr 1fr"]]},{id:"g5",part:"grid",title:"Pasillos",text:"Igual que en flexbox, `gap` deja un hueco entre filas y columnas (no en los bordes). Deja pasillos de **20px**.",items:["rojo","amarillo","verde","azul","rojo","amarillo"],base:`display: grid;
grid-template-columns: repeat(3, 1fr);`,target:"box",answer:"gap: 20px;",props:[["gap","10px · 20px · 20px 40px (filas y columnas)"]]},{id:"g6",part:"grid",title:"Una caja que ocupa dos",text:p("Ahora escribes en **una caja**. `grid-column: span 2` hace que ocupe dos columnas seguidas; las demás se colocan detrás.","","Es lo que se usa para una tarjeta destacada más ancha."),items:["rojo","amarillo","verde","azul","amarillo"],base:`display: grid;
grid-template-columns: repeat(3, 1fr);
gap: 10px;`,target:"rojo",answer:"grid-column: span 2;",props:[["grid-column","span 2 · span 3 · 1 / 3 · 1 / -1"]]},{id:"g7",part:"grid",title:"De lado a lado",text:p("Las columnas tienen **líneas** numeradas: antes de la primera está la línea 1, y la del final es la 4 (con tres columnas) o `-1`, que siempre es la última.","","`grid-column: 1 / -1` va de la primera línea a la última: la caja ocupa toda la fila, como una cabecera o un pie."),items:["amarillo","verde","rojo","azul"],base:`display: grid;
grid-template-columns: repeat(3, 1fr);
gap: 10px;`,target:"rojo",answer:"grid-column: 1 / -1;",props:[["grid-column","span 2 · 1 / 3 · 2 / 4 · 1 / -1"]]},{id:"g8",part:"grid",title:"Más alta",text:"Lo mismo hacia abajo: `grid-row: span 2` hace la caja dos filas de alta.",items:["azul","rojo","amarillo","verde","rojo"],base:`display: grid;
grid-template-columns: repeat(3, 1fr);
gap: 10px;`,target:"azul",answer:"grid-row: span 2;",props:[["grid-row","span 2 · 1 / 3 · 2"]]},{id:"g9",part:"grid",title:"En su casilla",text:p("Con un número se elige la casilla exacta: `grid-column: 3` es la tercera columna y `grid-row: 2`, la segunda fila.","","Coloca la caja roja en la tercera columna de la segunda fila."),items:["rojo","amarillo","verde","azul"],base:`display: grid;
grid-template-columns: repeat(3, 1fr);
grid-template-rows: 1fr 1fr;
gap: 10px;`,target:"rojo",answer:`grid-column: 3;
grid-row: 2;`,props:[["grid-column","1 · 2 · 3 (la columna)"],["grid-row","1 · 2 (la fila)"]]},{id:"g10",part:"grid",title:"El plano de la web",text:p("Cada caja tiene ya su nombre de zona con `grid-area` (mira lo que pone dentro). Con `grid-template-areas` **dibujas el plano**: una cadena entre comillas por fila y, en cada una, el nombre de la zona que va en cada columna.","","Si un nombre se repite seguido, esa zona ocupa esas columnas. Haz: la cabecera arriba de lado a lado, el menú y el contenido en medio y el pie abajo de lado a lado."),items:["rojo","amarillo","verde","azul"],base:`display: grid;
grid-template-columns: 1fr 3fr;
gap: 10px;`,itemBase:{0:"grid-area: cabecera;",1:"grid-area: menu;",2:"grid-area: contenido;",3:"grid-area: pie;"},target:"box",answer:`grid-template-areas:
  "cabecera cabecera"
  "menu contenido"
  "pie pie";`,props:[["grid-template-areas",'"a a" "b c" (una cadena por fila)']]},{id:"g11",part:"grid",title:"Filas a medida",text:p("`grid-template-rows` hace con las filas lo que `grid-template-columns` con las columnas.","","Deja la cabecera de **60px**, el pie de **40px** y el medio con todo lo demás (`1fr`)."),items:["rojo","amarillo","verde","azul"],base:`display: grid;
grid-template-columns: 1fr 3fr;
grid-template-areas:
  "cabecera cabecera"
  "menu contenido"
  "pie pie";
gap: 10px;`,itemBase:{0:"grid-area: cabecera;",1:"grid-area: menu;",2:"grid-area: contenido;",3:"grid-area: pie;"},target:"box",answer:"grid-template-rows: 60px 1fr 40px;",props:[["grid-template-rows","60px 1fr 40px · auto 1fr auto"]]},{id:"g12",part:"grid",title:"En medio de cada casilla",text:p("Si las cajas son más pequeñas que su casilla, se quedan arriba a la izquierda. `justify-items` las mueve a lo ancho y `align-items`, a lo alto (`place-items` hace las dos cosas).","","Pon cada caja en el centro de su casilla."),items:["rojo","amarillo","verde","azul","rojo","amarillo"],base:`display: grid;
grid-template-columns: repeat(3, 1fr);`,allItems:`width: 60px;
height: 60px;`,target:"box",answer:`justify-items: center;
align-items: center;`,props:[["justify-items","start · end · center · stretch"],["align-items","start · end · center · stretch"],["place-items","center (las dos a la vez)"]]}],R=e=>e.replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;");function W(e){return e.split(/(`[^`]+`)/).map(a=>a.startsWith("`")&&a.endsWith("`")&&a.length>1?`<code>${R(a.slice(1,-1))}</code>`:R(a).replace(/\*\*(.+?)\*\*/g,"<strong>$1</strong>")).join("")}function ke(e){return e.trim().split(/\n\s*\n/).map(a=>{const n=[];for(const t of a.split(`
`).map(o=>o.trim())){const o=t.startsWith("- "),l=n[n.length-1];l&&l.list===o?l.lines.push(o?t.slice(2):t):n.push({list:o,lines:[o?t.slice(2):t]})}return n.map(t=>t.list?`<ul>${t.lines.map(o=>`<li>${W(o)}</li>`).join("")}</ul>`:`<p>${t.lines.map(W).join(" ")}</p>`).join("")}).join("")}const fe=(e,a)=>a?`<span class="hl-${e}">${R(a)}</span>`:"";function zn(e){let a="",n=0;for(;n<e.length;){if(e.startsWith("<!--",n)){const l=e.indexOf("-->",n),s=l<0?e.length:l+3;a+=fe("comment",e.slice(n,s)),n=s;continue}if(e[n]==="<"&&/[a-zA-Z/!]/.test(e[n+1]??"")){let l=n+1,s="";for(;l<e.length&&(s||e[l]!==">"&&e[l]!=="<");)s&&e[l]===s?s="":!s&&(e[l]==='"'||e[l]==="'")&&(s=e[l]),l++;const r=e[l]===">"?l+1:l,c=e.slice(n,r);if(a+=yo(c),n=r,/^<style\b/i.test(c)){const i=e.toLowerCase().indexOf("</style",n),d=i<0?e.length:i;a+=$e(e.slice(n,d)),n=d}continue}const t=e.indexOf("<",n+1),o=t<0?e.length:t;a+=R(e.slice(n,o)),n=o}return a}function yo(e){if(e.startsWith("<!"))return fe("doctype",e);const a=/^(<\/?)([a-zA-Z][\w-]*)?([\s\S]*?)(\/?>)?$/.exec(e);if(!a)return R(e);const[,n,t="",o,l=""]=a,r=o.replace(/([^\s=]+)(\s*=\s*)?("[^"]*"?|'[^']*'?|[^\s"']+)?/g,(c,i,d,m)=>i?`\0${fe("attr",i)}${d?R(d):""}${m?fe("value",m):""}`:c).split(/(\u0000[\s\S]*?\u0001)/).map(c=>c.startsWith("\0")?c.slice(1,-1):R(c)).join("");return`${fe("tag",n+t)}${r}${fe("tag",l)}`}function $e(e){let a="",n=0,t=!1;const o=/(\/\*[\s\S]*?(?:\*\/|$))|("[^"]*"?|'[^']*'?)|([{}:;])|([^{}:;"'/]+|\/)/g;let l;for(;l=o.exec(e);){const[s,r,c,i,d]=l;r?a+=fe("comment",r):c?a+=fe(n>0&&t?"value":"selector",c):i?(i==="{"&&n++,i==="}"&&(n=Math.max(0,n-1)),i===":"&&n>0&&Qn(e,l.index)&&(t=!0),(i===";"||i==="{"||i==="}")&&(t=!1),a+=fe("punct",i)):d?n===0||!Qn(e,l.index)?a+=fe(d.trimStart().startsWith("@")?"at":"selector",d):a+=fe(t?"value":"prop",d):a+=R(s)}return a}function Qn(e,a){const n=e.slice(a),t=n.search(/[{]/),o=n.search(/[;}]/);return t<0||o>=0&&o<t}const Tt="webquest.progress.v1",Tn="webquest.drafts.v1",At="webquest.exams.v1";function wa(e,a){try{const n=localStorage.getItem(e);return n?JSON.parse(n):a}catch{return a}}function aa(e,a){try{localStorage.setItem(e,JSON.stringify(a))}catch{}}let ca=new Set(wa(Tt,[]));const ze=e=>ca.has(e);function An(e){ca.has(e)||(ca=new Set(ca).add(e),aa(Tt,[...ca]))}const Pn=(e,a)=>`w${e}/lesson/${a}`,Hn=(e,a)=>`w${e}/challenge/${a}`,Ja="taller";let _e=wa(Tn,{});const Qa=e=>_e[e];function Je(e,a){_e={..._e,[e]:a},aa(Tn,_e)}function xo(e){if(!(e in _e))return;const a={..._e};delete a[e],_e=a,aa(Tn,_e)}let Pa=wa(At,{});const Wa=e=>Pa[e];function Ze(e,a){const n={...Pa};a?n[e]=a:delete n[e],Pa=n,aa(At,Pa)}const Pt="webquest.training.v1";let Ha=wa(Pt,{});const Te=e=>Ha[e];function Me(e,a){Ha={...Ha,[e]:a},aa(Pt,Ha)}const Ht="webquest.memory.v1",Wn=[0,1,3,7,14],Dt=()=>Math.floor((Date.now()-new Date().getTimezoneOffset()*6e4)/864e5);let da=wa(Ht,{});const We=e=>da[e];function Vn(e,a){const n=a?Math.min(Wn.length-1,(da[e]?.box??0)+1):0;da={...da,[e]:{box:n,due:Dt()+Wn[n]}},aa(Ht,da)}const vo={flex:"Flexbox: el muelle",grid:"Grid: el patio"},ma=e=>`puerto/${e}`;function Kn(e){const a=Ke.filter(n=>n.part===e);return a.find(n=>!ze(ma(n.id)))??a[0]}const qo=()=>({done:Ke.filter(e=>ze(ma(e.id))).length,total:Ke.length}),wo='<svg viewBox="0 0 64 64" aria-hidden="true"><path class="boat__sail" d="M33 8 L33 40 L52 40 Z"/><path class="boat__mast" d="M31 6 h3 v36 h-3 z"/><path class="boat__hull" d="M6 42 H58 L50 56 H14 Z"/></svg>';function jo(e){const a=[],n=e.split(";");return n.forEach((t,o)=>{const l=t.trim();if(!l)return;const s=l.indexOf(":");if(s<0){a.push(`«${l}»: falta «:» entre la propiedad y su valor.`);return}const r=l.slice(0,s).trim().toLowerCase(),c=l.slice(s+1).trim(),i=/\n\s*([a-z-]+)\s*:/.exec(c);if(i){a.push(`Falta el «;» al final de «${r}: ${c.slice(0,i.index).trim()}».`);return}o===n.length-1&&a.push(`Falta el «;» al final de «${r}: ${c}».`),!/^-?[a-z][a-z-]*$/.test(r)||!CSS.supports(r,"initial")?a.push(`«${r}» no es una propiedad de CSS: revisa cómo se escribe.`):c?CSS.supports(r,c)||a.push(`«${c}» no es un valor que entienda «${r}».`):a.push(`A «${r}» le falta el valor.`)}),a}function So(e){const a=zt(e.part),n=l=>l.split(`
`).map(s=>`  ${s}`).join(`
`),t=[],o=e.part==="flex"?".barco":".caja";e.allItems&&t.push(`${o} {
${n(e.allItems)}
}`);for(const[l,s]of Object.entries(e.itemBase??{}))t.push(`${Gn(e.part,e.items[Number(l)])} {
${n(s)}
}`);return e.target==="box"?{before:[...t,`${a} {
${n(e.base)}`].join(`
`),selector:""}:{before:[`${a} {
${n(e.base)}
}`,...t].join(`
`),selector:`${Gn(e.part,e.target)} {`}}function Eo(e,a,n=!0){const t=Ke.find(L=>L.id===a);if(!t)return location.hash=`#/puerto/${Kn("flex").id}`,()=>{};const o=Ke.filter(L=>L.part===t.part),l=o.indexOf(t),s=o[l+1]??Ke.find(L=>L.part!==t.part&&t.part==="flex"),r=ma(t.id),c=So(t),i=Math.max(t.answer.split(`
`).length,1),d=t.part==="flex"?"barco":"caja",m=L=>/grid-area:\s*([\w-]+)/.exec(t.itemBase?.[L]??"")?.[1]??"",y=(L,D,$)=>`<div class="${d} ${Mt(t.part,L)}${$?" is-ghost":""}" data-k="${D}">${t.part==="flex"&&!$?wo:`<span>${m(D)}</span>`}</div>`,g=L=>`<div class="harbor__layer${L?" harbor__layer--ghost":""}" ${L?'aria-hidden="true"':""}>${t.items.map((D,$)=>y(D,$,L)).join("")}</div>`;e.innerHTML=`
    <div class="sheet harbor harbor--${t.part}">
      <header class="topbar">
        <a class="btn btn--small" href="#/mapa">Mapa</a>
        <h1 class="topbar__title">El puerto</h1>
      </header>
      <nav class="harbor__parts" aria-label="Partes del juego">
        ${["flex","grid"].map(L=>`<a class="btn btn--small" href="#/puerto/${Kn(L).id}" ${L===t.part?'aria-current="page"':""}>${vo[L]}</a>`).join("")}
      </nav>
      <ol class="harbor__dots" aria-label="Niveles">
        ${o.map((L,D)=>`<li><a href="#/puerto/${L.id}" class="${ze(ma(L.id))?"is-done":""}" ${L===t?'aria-current="step"':""} aria-label="Nivel ${D+1}${ze(ma(L.id))?", hecho":""}">${D+1}</a></li>`).join("")}
      </ol>
      <div class="harbor__grid">
        <div class="harbor__side">
          <p class="harbor__count">Nivel ${l+1} de ${o.length}</p>
          <h2 class="harbor__title">${R(t.title)}</h2>
          <div class="harbor__text">${ke(t.text)}</div>
          <table class="harbor__props">
            <tbody>${t.props.map(([L,D])=>`<tr><th scope="row"><code>${R(L)}</code></th><td>${R(D)}</td></tr>`).join("")}</tbody>
          </table>
          <div class="harbor__code">
            <pre><code>${$e(c.before)}${c.selector?`
${$e(c.selector)}`:""}</code></pre>
            <textarea class="harbor__input" rows="${i}" spellcheck="false" autocapitalize="off" autocomplete="off" aria-label="El CSS que falta en ${R(c.selector.replace(" {","")||zt(t.part))}"></textarea>
            <pre><code>${$e("}")}</code></pre>
          </div>
          <ul class="harbor__problems" aria-live="polite"></ul>
          <p class="harbor__win" aria-live="polite"></p>
          <div class="actions">
            ${l>0?`<a class="btn" href="#/puerto/${o[l-1].id}">Anterior</a>`:""}
            ${s?`<a class="btn btn--main" href="#/puerto/${s.id}" data-next>${s.part===t.part?"Siguiente nivel":"Pasar al grid"}</a>`:'<a class="btn btn--main" href="#/mapa" data-next>Volver al mapa</a>'}
          </div>
          <details class="harbor__answer">
            <summary>No me sale: ver una respuesta</summary>
            <pre><code>${$e(t.answer)}</code></pre>
          </details>
        </div>
        <div class="harbor__water" role="img" aria-label="${t.part==="flex"?"El muelle con los barcos y sus amarres":"El patio con las cajas y sus sitios"}">
          ${g(!0)}
          ${g(!1)}
        </div>
      </div>
    </div>`;const v=e.querySelector(".harbor__input"),k=e.querySelector(".harbor__problems"),_=e.querySelector(".harbor__win"),M=e.querySelector(".harbor__water"),[T,q]=[...e.querySelectorAll(".harbor__layer")];function E(L,D){L.style.cssText=t.base+(t.target==="box"?`;${D}`:""),L.querySelectorAll(`.${d}`).forEach($=>{const j=Number($.dataset.k);$.style.cssText=`${t.allItems??""};${t.itemBase?.[j]??""};${t.target===t.items[j]?D:""}`})}function A(){const L=[...T.children].map($=>$.getBoundingClientRect()),D=[...q.children].map($=>$.getBoundingClientRect());return L.every(($,j)=>Math.abs($.left-D[j].left)<2&&Math.abs($.top-D[j].top)<2&&Math.abs($.width-D[j].width)<2&&Math.abs($.height-D[j].height)<2)}function C(){const L=v.value;n&&Me(r,L),v.rows=Math.max(i,L.split(`
`).length),E(q,L);const D=L.trim()?jo(L):[];k.innerHTML=D.map(j=>`<li>${W(j)}</li>`).join("");const $=A();M.classList.toggle("is-won",$),_.textContent=$?t.part==="flex"?"¡Todos los barcos en su amarre!":"¡Todas las cajas en su sitio!":"",$&&n&&(An(r),e.querySelector(".harbor__dots [aria-current]")?.classList.add("is-done"))}E(T,t.answer),v.value=n&&Te(r)||"",v.addEventListener("input",C);const S=new ResizeObserver(()=>C());return S.observe(M),C(),n&&v.focus({preventScroll:!0}),()=>S.disconnect()}function Ve(e){return[...e.querySelectorAll("input, select, textarea")].filter(a=>!["submit","button","reset","hidden","image"].includes((a.getAttribute("type")??"").toLowerCase()))}function Xe(e,a){const n=a.closest("label");if(n)return n;const t=a.getAttribute("id");return t?[...e.querySelectorAll("label")].find(o=>o.getAttribute("for")===t)??null:null}const Xa=(e,a)=>{const n=e.indexOf(a);return n<0?1:e.slice(0,n).split(`
`).length};function Co(e,a){const n=[];for(const t of e.querySelectorAll("label[for]")){const o=t.getAttribute("for");e.getElementById(o)||n.push({line:Xa(a,`for="${o}"`),level:"aviso",msg:`<label for="${o}"> no encuentra ningún campo con id="${o}": el for y el id tienen que ser iguales.`})}for(const t of Ve(e)){const o=t.tagName.toLowerCase(),l=t.getAttribute("id"),s=t.getAttribute("name"),r=l?`id="${l}"`:s?`name="${s}"`:`<${o}`,c=`<${o}${l?` id="${l}"`:s?` name="${s}"`:""}>`;Xe(e,t)||n.push({line:Xa(a,r),level:"aviso",msg:`${c} no tiene <label>: ponle una con for="${l??"su-id"}"${l?"":" y dale ese id"}.`}),s||n.push({line:Xa(a,r),level:"aviso",msg:`${c} no tiene name: sin él, ese dato no se envía.`})}return n}const Q=1024,ko=800,ae=375,V=(e,a)=>["flex","inline-flex"].includes(e.style(a,"display")),yn=(e,a)=>["grid","inline-grid"].includes(e.style(a,"display"));function Rt(e,a){const n=e.style(a,"grid-template-columns");return n&&n!=="none"?n.split(/\s+/).map(parseFloat):[]}const oa=(e,a,n)=>{const t=Rt(e,a);return t.length===n&&Math.max(...t)-Math.min(...t)<1},Z=(e,a)=>new Set((typeof a=="string"?e.all(a):a).map(n=>Math.round(n.getBoundingClientRect().left))).size,N=(e,a)=>(typeof a=="string"?e.q(a):a)?.getBoundingClientRect()??new DOMRect,ha=e=>e.doc.documentElement.scrollWidth<=e.doc.documentElement.clientWidth;function Zn(e,a){const n=e.all(a).map(t=>t.getBoundingClientRect().top);return n.length>1&&n.every((t,o)=>!o||t>n[o-1]+4)}function O(e,a,n=e.doc){const t=I(a);return Ve(e.doc).filter(o=>n.contains(o)).find(o=>I(Xe(e.doc,o)?.textContent??"").includes(t))??null}const G=e=>e?.tagName==="INPUT"?(e.getAttribute("type")??"text").toLowerCase():e?.tagName.toLowerCase()??"",ne=e=>!!e?.getAttribute("name")?.trim(),me=e=>!!e?.hasAttribute("required");function De(e,a,n=e.doc){const t=I(a);return[...(n.tagName==="FORM"?n:e.q("form"))?.querySelectorAll('button, input[type="submit"]')??[]].some(l=>{const s=(l.getAttribute("type")??(l.tagName==="BUTTON"?"submit":"")).toLowerCase(),r=l.tagName==="INPUT"?l.getAttribute("value")??"":l.textContent??"";return s==="submit"&&I(r)===t})}function Da(e,a){const n=e.all('input[type="radio"]'),t=[...new Set(n.map(o=>o.getAttribute("name")??""))];return{all:n,names:t,labels:n.filter(o=>!0).map(o=>I(Xe(e.doc,o)?.textContent??""))}}const Oa=e=>[...e?.querySelectorAll("option")??[]].map(a=>I(a.textContent??"")),$o=`body {
  margin: 0;
  font-family: Arial, sans-serif;
  background-color: #fdf2f6;
  color: #333333;
}

header {
  text-align: center;
  padding: 24px;
  background-color: white;
  border-bottom: 4px solid #b8336a;
}

header h1 {
  margin: 8px 0 4px;
  color: #b8336a;
  font-size: 40px;
}

header p {
  margin: 0;
  color: #777777;
}

main {
  max-width: 900px;
  margin: 0 auto;
  padding: 20px;
}

main h2 {
  text-align: center;
  font-size: 28px;
}

.tarjetas {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 20px;
}

.tarjeta {
  background-color: white;
  border-radius: 12px;
  padding: 16px;
  text-align: center;
}

.tarjeta img {
  width: 100%;
  border-radius: 8px;
}

.tarjeta h3 {
  margin: 12px 0 8px;
}

.precio {
  font-size: 22px;
  font-weight: bold;
  color: #b8336a;
}

.tarjeta a {
  display: block;
  padding: 10px;
  background-color: #b8336a;
  color: white;
  text-decoration: none;
  border-radius: 6px;
}

footer {
  text-align: center;
  padding: 16px;
  margin-top: 20px;
  background-color: #b8336a;
  color: white;
}

footer p {
  margin: 0;
}

@media (max-width: 600px) {
  .tarjetas {
    grid-template-columns: 1fr;
  }
}
`,Lo=`<!DOCTYPE html>
<html lang="es">
  <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Pastelería Dulce Abril</title>
    <link rel="stylesheet" href="estilos.css">
  </head>
  <body>
    <header>
      <img src="img/logo.svg" alt="Logo de Dulce Abril" width="80">
      <h1>Dulce Abril</h1>
      <p>Pastelería artesana en Zaragoza</p>
    </header>
    <main>
      <h2>Nuestros dulces</h2>
      <div class="tarjetas">
        <article class="tarjeta">
          <img src="img/tarta.svg" alt="Tarta de fresa">
          <h3>Tarta de fresa</h3>
          <p>Bizcocho, nata y fresas del día.</p>
          <p class="precio">18 €</p>
          <a href="#">Encargar</a>
        </article>
        <article class="tarjeta">
          <img src="img/galletas.svg" alt="Caja de galletas">
          <h3>Galletas de mantequilla</h3>
          <p>Caja de doce, recién horneadas.</p>
          <p class="precio">6 €</p>
          <a href="#">Encargar</a>
        </article>
        <article class="tarjeta">
          <img src="img/cruasan.svg" alt="Cruasán">
          <h3>Cruasán</h3>
          <p>Hojaldre con mantequilla francesa.</p>
          <p class="precio">1,50 €</p>
          <a href="#">Encargar</a>
        </article>
      </div>
    </main>
    <footer>
      <p>Encargos por teléfono: 976 000 000</p>
    </footer>
  </body>
</html>
`,_o=`body {
  margin: 0;
  font-family: Arial, sans-serif;
  background-color: #fffaf0;
  color: #3b2a1a;
}

header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 40px;
  background-color: #8b5a2b;
}

header h1 {
  color: white;
  font-size: 28px;
}

nav ul {
  display: flex;
  gap: 24px;
  list-style: none;
  margin: 0;
  padding: 0;
}

nav a {
  color: white;
  text-decoration: none;
  font-weight: bold;
}

.portada {
  text-align: center;
  padding: 80px 20px;
}

.portada h2 {
  font-size: 36px;
  margin: 0 0 16px;
}

.portada p {
  font-size: 18px;
  margin: 0 0 32px;
}

.boton {
  background-color: #d4a017;
  color: #3b2a1a;
  padding: 14px 28px;
  border-radius: 30px;
  text-decoration: none;
  font-weight: bold;
}

footer {
  background-color: #3b2a1a;
  color: white;
  text-align: center;
  padding: 10px;
}
`,Mo=`<!DOCTYPE html>
<html lang="es">
  <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Panadería La Espiga</title>
    <link rel="stylesheet" href="estilos.css">
  </head>
  <body>
    <header>
      <h1>La Espiga</h1>
      <nav>
        <ul>
          <li><a href="#">Inicio</a></li>
          <li><a href="#">Pan</a></li>
          <li><a href="#">Bollería</a></li>
          <li><a href="#">Contacto</a></li>
        </ul>
      </nav>
    </header>
    <main>
      <section class="portada">
        <h2>Pan recién hecho cada mañana</h2>
        <p>Masa madre, harina de la zona y horno de leña desde 1985.</p>
        <a class="boton" href="#">Ver el pan del día</a>
      </section>
    </main>
    <footer>
      <p>Calle Mayor 12, Burgos · Abierto de 7:00 a 14:00</p>
    </footer>
  </body>
</html>
`,zo=`body {
  margin: 0;
  font-family: Georgia, serif;
  background-color: #f5f1e8;
  color: #2f2f2f;
}

header {
  text-align: center;
  padding: 30px 20px 0;
  background-color: #2e4a3f;
  color: #f5f1e8;
}

header h1 {
  margin: 0 0 20px;
  font-size: 44px;
}

nav {
  display: flex;
  justify-content: center;
  background-color: #23392f;
}

nav a {
  color: #f5f1e8;
  text-decoration: none;
  padding: 14px 24px;
}

.contenedor {
  display: grid;
  grid-template-columns: 2fr 1fr;
  gap: 30px;
  max-width: 1000px;
  margin: 30px auto;
  padding: 0 20px;
  box-sizing: border-box;
}

article {
  background-color: white;
  padding: 20px 24px;
  margin-bottom: 20px;
  border-left: 6px solid #c97b3c;
}

article h2 {
  margin: 0;
  font-size: 24px;
  color: #2e4a3f;
}

.fecha {
  font-style: italic;
  color: #888888;
  font-size: 14px;
}

aside {
  background-color: #e3dccb;
  padding: 20px;
  border-radius: 10px;
  text-align: center;
}

aside h3 {
  color: #c97b3c;
}

aside ol {
  text-align: left;
}

footer {
  background-color: #2e4a3f;
  color: #f5f1e8;
  text-align: center;
  padding: 16px;
}

footer p {
  margin: 0;
}
`,To=`<!DOCTYPE html>
<html lang="es">
  <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Club de lectura Entre Páginas</title>
    <link rel="stylesheet" href="estilos.css">
  </head>
  <body>
    <header>
      <h1>Entre Páginas</h1>
      <nav>
        <a href="#">Inicio</a>
        <a href="#">Libros</a>
        <a href="#">Reuniones</a>
        <a href="#">Hazte socio</a>
      </nav>
    </header>
    <div class="contenedor">
      <main>
        <article>
          <h2>Este mes leemos «La sombra del viento»</h2>
          <p class="fecha">Publicado el 3 de noviembre</p>
          <p>Nos vemos el jueves 20 a las 19:00 en la biblioteca municipal. Trae tus notas y tus preguntas.</p>
        </article>
        <article>
          <h2>Nuevo grupo de los sábados</h2>
          <p class="fecha">Publicado el 28 de octubre</p>
          <p>Abrimos un segundo grupo por la mañana para quien no puede venir entre semana.</p>
        </article>
      </main>
      <aside>
        <img src="img/persona.svg" alt="Foto de la coordinadora" width="80">
        <h3>Coordina: Marta Gil</h3>
        <p>Bibliotecaria y lectora de todo un poco.</p>
        <h3>Próximas lecturas</h3>
        <ol>
          <li>Nada</li>
          <li>Los santos inocentes</li>
          <li>Rayuela</li>
        </ol>
      </aside>
    </div>
    <footer>
      <p>Entre Páginas · club@entrepaginas.es</p>
    </footer>
  </body>
</html>
`,Ao=`body {
  margin: 0;
  font-family: Arial, sans-serif;
  color: #1d3557;
}

header {
  background-color: #1d3557;
  color: white;
  padding: 20px 40px;
}

header h1 {
  margin: 0;
  font-size: 32px;
}

header p {
  margin: 4px 0 0;
  color: #a8dadc;
}

main {
  max-width: 900px;
  margin: 0 auto;
  padding: 0 20px;
}

.nosotros {
  display: flex;
  align-items: center;
  gap: 40px;
  margin: 40px 0;
}

.nosotros img {
  width: 400px;
  border-radius: 16px;
}

.nosotros h2 {
  font-size: 30px;
  color: #e63946;
}

.precios h2 {
  text-align: center;
}

table {
  width: 100%;
  border-collapse: collapse;
  margin-bottom: 40px;
}

th {
  background-color: #e63946;
  color: white;
  text-align: left;
}

th,
td {
  padding: 12px;
  border: 1px solid #a8dadc;
}

footer {
  background-color: #a8dadc;
  text-align: center;
  padding: 10px;
}

footer p {
  margin: 0;
}
`,Po=`<!DOCTYPE html>
<html lang="es">
  <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Bicis Radio</title>
    <link rel="stylesheet" href="estilos.css">
  </head>
  <body>
    <header>
      <h1>Bicis Radio</h1>
      <p>Taller y alquiler de bicicletas</p>
    </header>
    <main>
      <section class="nosotros">
        <img src="img/bici.svg" alt="Bicicleta de carretera">
        <div>
          <h2>Tu bici, a punto</h2>
          <p>Arreglamos todo tipo de bicicletas en el día. Si no tienes, te dejamos una.</p>
          <ul>
            <li>Cambio de cámaras y cubiertas</li>
            <li>Ajuste de frenos y cambios</li>
            <li>Alquiler por horas o por días</li>
          </ul>
        </div>
      </section>
      <section class="precios">
        <h2>Precios</h2>
        <table>
          <thead>
            <tr>
              <th>Servicio</th>
              <th>Precio</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Puesta a punto</td>
              <td>25 €</td>
            </tr>
            <tr>
              <td>Cambio de cámara</td>
              <td>8 €</td>
            </tr>
            <tr>
              <td>Alquiler (un día)</td>
              <td>15 €</td>
            </tr>
          </tbody>
        </table>
      </section>
    </main>
    <footer>
      <p>Avenida del Río 3, Logroño</p>
    </footer>
  </body>
</html>
`,Ho=`body {
  margin: 0;
  font-family: Verdana, sans-serif;
  background-color: #eef2e6;
  color: #263220;
}

.pagina {
  display: grid;
  grid-template-columns: 3fr 2fr;
  grid-template-areas:
    "cabecera cabecera"
    "galeria galeria"
    "info reserva"
    "pie pie";
  gap: 20px;
  max-width: 1000px;
  margin: 0 auto;
}

header {
  grid-area: cabecera;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 20px;
  background-color: #4d6b3c;
  color: white;
}

nav a {
  color: white;
  margin-left: 20px;
}

.galeria {
  grid-area: galeria;
  display: flex;
  gap: 20px;
  padding: 0 20px;
}

figure {
  margin: 0;
  flex: 1;
}

figure img {
  width: 100%;
  border-radius: 10px;
}

figcaption {
  text-align: center;
  font-size: 14px;
}

.info {
  grid-area: info;
  padding: 0 0 0 20px;
}

.info h2 {
  color: #4d6b3c;
}

table {
  border-collapse: collapse;
  width: 100%;
}

th,
td {
  border-bottom: 1px solid #b7c4a8;
  padding: 10px;
  text-align: left;
}

.reserva {
  grid-area: reserva;
  background-color: white;
  padding: 0 20px 20px;
  margin-right: 20px;
  border-radius: 10px;
}

form {
  display: flex;
  flex-direction: column;
  gap: 6px;
}

input,
select {
  padding: 8px;
  border: 1px solid #b7c4a8;
  border-radius: 6px;
}

button {
  margin-top: 10px;
  padding: 12px;
  background-color: #c0632f;
  color: white;
  border: none;
  border-radius: 6px;
  font-size: 16px;
}

footer {
  grid-area: pie;
  background-color: #263220;
  color: white;
  text-align: center;
}

@media (max-width: 600px) {
  .pagina {
    grid-template-columns: 1fr;
    grid-template-areas:
      "cabecera"
      "galeria"
      "info"
      "reserva"
      "pie";
  }

  header {
    flex-direction: column;
  }

  .galeria {
    flex-direction: column;
  }

  .info {
    padding: 0 20px;
  }

  .reserva {
    margin: 0 20px;
  }
}
`,Do=`<!DOCTYPE html>
<html lang="es">
  <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Casa rural El Roble</title>
    <link rel="stylesheet" href="estilos.css">
  </head>
  <body>
    <div class="pagina">
      <header>
        <h1>El Roble</h1>
        <nav>
          <a href="#">La casa</a>
          <a href="#">Habitaciones</a>
          <a href="#">Reservas</a>
        </nav>
      </header>
      <section class="galeria">
        <figure>
          <img src="img/paisaje.svg" alt="Vista del valle">
          <figcaption>El valle</figcaption>
        </figure>
        <figure>
          <img src="img/paisaje.svg" alt="El jardín de la casa">
          <figcaption>El jardín</figcaption>
        </figure>
        <figure>
          <img src="img/paisaje.svg" alt="Ruta por el monte">
          <figcaption>Las rutas</figcaption>
        </figure>
      </section>
      <section class="info">
        <h2>Una casa en mitad del monte</h2>
        <p>Cinco habitaciones, chimenea y desayuno con productos del pueblo. A diez minutos a pie del río.</p>
        <table>
          <tr>
            <th>Temporada baja</th>
            <td>60 € la noche</td>
          </tr>
          <tr>
            <th>Temporada alta</th>
            <td>85 € la noche</td>
          </tr>
        </table>
      </section>
      <section class="reserva">
        <h2>Reserva</h2>
        <form action="#">
          <label for="nombre">Nombre</label>
          <input type="text" id="nombre" name="nombre" required>
          <label for="correo">Correo</label>
          <input type="email" id="correo" name="correo" required>
          <label for="llegada">Llegada</label>
          <input type="date" id="llegada" name="llegada">
          <label for="personas">Personas</label>
          <select id="personas" name="personas">
            <option>1</option>
            <option>2</option>
            <option>3</option>
            <option>4</option>
          </select>
          <button type="submit">Reservar</button>
        </form>
      </section>
      <footer>
        <p>Casa rural El Roble · Valle de Ansó, Huesca</p>
      </footer>
    </div>
  </body>
</html>
`,Ro=`body {
  margin: 0;
  font-family: Arial, sans-serif;
  background-color: #0f172a;
  color: white;
}

header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 16px 40px;
  background-color: #0f172a;
}

.logo {
  margin: 0;
  font-size: 26px;
  font-weight: bold;
  color: #f97316;
}

nav ul {
  display: flex;
  gap: 30px;
  list-style: none;
  margin: 0;
  padding: 0;
}

nav a {
  color: white;
  text-decoration: none;
}

.portada {
  text-align: center;
  padding: 100px 20px;
  background-image: url("img/portada.svg");
  background-size: cover;
  background-position: center;
}

.portada h1 {
  margin: 0 0 12px;
  font-size: 48px;
  color: #0f172a;
}

.portada p {
  margin: 0 0 30px;
  font-size: 20px;
  color: #0f172a;
  font-weight: bold;
}

.boton {
  background-color: #f97316;
  color: white;
  padding: 16px 32px;
  border-radius: 8px;
  text-decoration: none;
  font-weight: bold;
}

main {
  max-width: 1000px;
  margin: 0 auto;
  padding: 20px;
}

main h2 {
  font-size: 32px;
  border-bottom: 3px solid #f97316;
  padding-bottom: 8px;
}

.grupos {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 16px;
}

.grupo {
  background-color: #1e293b;
  border-radius: 12px;
  padding: 24px;
  text-align: center;
}

.grupo h3 {
  margin: 0 0 8px;
  color: #f97316;
}

.grupo p {
  margin: 0;
}

footer {
  display: flex;
  justify-content: space-around;
  margin-top: 40px;
  padding: 20px;
  background-color: #1e293b;
  text-align: center;
}

footer h3 {
  color: #f97316;
}

@media (max-width: 600px) {
  header {
    flex-direction: column;
    gap: 12px;
  }

  .portada h1 {
    font-size: 32px;
  }

  .grupos {
    grid-template-columns: 1fr 1fr;
  }

  footer {
    flex-direction: column;
  }
}
`,Uo=`<!DOCTYPE html>
<html lang="es">
  <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Festival Sonora</title>
    <link rel="stylesheet" href="estilos.css">
  </head>
  <body>
    <header>
      <p class="logo">SONORA</p>
      <nav>
        <ul>
          <li><a href="#">Cartel</a></li>
          <li><a href="#">Horarios</a></li>
          <li><a href="#">Entradas</a></li>
        </ul>
      </nav>
    </header>
    <section class="portada">
      <h1>Festival Sonora 2027</h1>
      <p>12, 13 y 14 de julio · Playa de Sopelana</p>
      <a class="boton" href="#">Comprar entradas</a>
    </section>
    <main>
      <h2>Cartel</h2>
      <div class="grupos">
        <article class="grupo">
          <h3>Las Olas</h3>
          <p>Viernes · 22:00</p>
        </article>
        <article class="grupo">
          <h3>Niebla</h3>
          <p>Viernes · 23:30</p>
        </article>
        <article class="grupo">
          <h3>Marea Alta</h3>
          <p>Sábado · 22:00</p>
        </article>
        <article class="grupo">
          <h3>Faro Sur</h3>
          <p>Domingo · 21:00</p>
        </article>
      </div>
    </main>
    <footer>
      <div>
        <h3>Contacto</h3>
        <p>hola@sonora.es</p>
      </div>
      <div>
        <h3>Dónde</h3>
        <p>Playa de Sopelana, Bizkaia</p>
      </div>
      <div>
        <h3>Síguenos</h3>
        <p>@festivalsonora</p>
      </div>
    </footer>
  </body>
</html>
`,Ea={none:"Uno debajo de otro (nada)",row:"En fila (flex)",grid:"En columnas (grid)",column:"En columna (flex column)"},No=["header","nav","main","section","article","aside","footer","figure","form","table","div"],te=1e3,Io=e=>({html:H(e.title,""),css:""}),Va=(e,a)=>`./maquetas/${e}-${a}.png`,Oo=[[/^background/,"fondo"],[/^border/,"borde"],[/^color$/,"letra"]];function Bo(e){const a=new Map;for(const[,n,t]of e.solution.css.matchAll(/([^{}]+)\{([^{}]*)\}/g))for(const[,o,l]of t.matchAll(/([a-z-]+)\s*:\s*([^;]+)/g)){const s=Oo.find(([r])=>r.test(o))?.[1];if(s)for(const[r]of l.matchAll(/#[0-9a-f]{3,6}\b/gi)){const c=a.get(r.toLowerCase())??[],i=`${s} de ${n.trim().replace(/\s+/g," ")}`;c.includes(i)||c.push(i),a.set(r.toLowerCase(),c)}}return[...a].map(([n,t])=>[t.join(", "),n])}const Jn=(e,a,n)=>e.all(a).filter(t=>I(t.textContent??"").includes(I(n))),Ie={label:'El documento completo: DOCTYPE, `lang="es"`, `charset` y `viewport`',test:je},en=(e,a)=>e.style("body","font-family").toLowerCase().includes(a),fa=[{id:"espiga",title:"Panadería La Espiga",level:1,minutes:30,widths:[te],brief:p("Hola, soy Rosa, de la panadería La Espiga. Quiero una web sencilla como la de la imagen:","- Arriba, una cabecera con el nombre (en un `h1`) y el menú a la derecha, en un `nav` con una lista.","- En medio, la portada: título, una frase y un botón que lleve al pan del día.","- Abajo, el pie con la dirección y el horario.","- Letra Arial y los colores de la imagen."),solution:{html:Mo,css:_o},checks:[Ie,{label:"El nombre en un `h1` dentro de `header`",test:e=>e.loose("header h1")==="la espiga"},{label:"El menú: `nav` con una lista de 4 enlaces",test:e=>e.count("nav ul li a")===4},{label:"El nombre y el menú en fila (flexbox en la cabecera)",test:e=>V(e,"header")},{label:"La portada dentro de `main`, con un `h2`",test:e=>e.has("main h2")},{label:"El botón es un enlace con las esquinas redondeadas",test:e=>Jn(e,"main a","pan del dia").some(a=>e.px(a,"border-top-left-radius")>0)},{label:"El pie en un `footer`",test:e=>e.has("footer")},{label:"La letra es Arial",test:e=>en(e,"arial")}],zones:[{sel:"header",tags:["header"],layouts:["row"]},{sel:"nav",tags:["nav"],layouts:["row"]},{sel:"main",tags:["main"]},{sel:".portada",tags:["section","div"]},{sel:"footer",tags:["footer"]}]},{id:"dulce",title:"Pastelería Dulce Abril",level:2,minutes:40,widths:[te,ae],brief:p("Somos la pastelería Dulce Abril. Queremos enseñar nuestros tres dulces más pedidos:","- Cabecera centrada con el logo (`img/logo.svg`, de 80px de ancho), el nombre y una frase.","- Tres tarjetas (`article`) en tres columnas iguales, cada una con su foto, nombre, descripción, precio y un botón «Encargar» de lado a lado.","- El contenido, como mucho de 900px de ancho y centrado.","- En el móvil, las tarjetas una debajo de otra (mira la segunda imagen).","- Fotos en `img/`: `tarta.svg`, `galletas.svg` y `cruasan.svg`. Todas las imágenes con su `alt`."),solution:{html:Lo,css:$o},checks:[Ie,{label:"El logo carga y tiene `alt`",test:e=>e.all("img").some(a=>(a.getAttribute("src")??"").includes("logo")&&we(a)&&!!a.getAttribute("alt")?.trim())},{label:"Tres tarjetas `article`",test:e=>e.count("article")===3},{label:"Cada tarjeta con su foto (con `alt`) y su `h3`",test:e=>e.all("article").every(a=>!!a.querySelector("img[alt]")&&!!a.querySelector("h3"))},{label:"En el ordenador, las tres en fila",test:async e=>Z(await e.at(te),"article")===3},{label:"En el móvil, una debajo de otra",test:async e=>Z(await e.at(ae),"article")===1,hint:"Una media query `@media (max-width: 600px)` que deje una sola columna."},{label:"El pie en un `footer`",test:e=>e.has("footer")}],zones:[{sel:"header",tags:["header"]},{sel:"main",tags:["main"]},{sel:".tarjetas",tags:["div","section"],layouts:["grid","row"]},{sel:"article",tags:["article"]},{sel:"footer",tags:["footer"]}]},{id:"radio",title:"Bicis Radio",level:2,minutes:40,widths:[te],brief:p("Tenemos un taller de bicis y queremos una web con lo que hacemos y los precios:","- Cabecera con el nombre y debajo, en otro color, «Taller y alquiler de bicicletas».","- La foto (`img/bici.svg`, de 400px y con las esquinas redondeadas) a la izquierda y el texto a la derecha, con la lista de servicios.","- La tabla de precios con su fila de cabecera (`thead`) y los bordes juntos (sin doble raya).","- Pie con la dirección."),solution:{html:Po,css:Ao},checks:[Ie,{label:"La foto carga y tiene `alt`",test:e=>e.all("img").some(a=>(a.getAttribute("src")??"").includes("bici")&&we(a)&&!!a.getAttribute("alt")?.trim())},{label:"La foto y el texto lado a lado (flexbox en su caja)",test:e=>!!e.q("img")&&V(e,e.q("img").parentElement)},{label:"Una lista con los 3 servicios",test:e=>e.count("ul li")===3},{label:"La tabla con `thead` (2 `th`) y `tbody` (3 filas)",test:e=>e.count("thead th")===2&&e.count("tbody tr")===3},{label:"Bordes de la tabla juntos (`border-collapse`)",test:e=>e.style("table","border-collapse")==="collapse"},{label:"El pie en un `footer`",test:e=>e.has("footer")}],zones:[{sel:"header",tags:["header"]},{sel:"main",tags:["main"]},{sel:".nosotros",tags:["section","div"],layouts:["row","grid"]},{sel:".precios",tags:["section","div"]},{sel:"table",tags:["table"]},{sel:"footer",tags:["footer"]}]},{id:"lectura",title:"Club de lectura Entre Páginas",level:3,minutes:50,widths:[te],brief:p("Llevo un club de lectura y quiero una web para las noticias del club:","- Cabecera con el nombre centrado y, debajo, una franja más oscura con el menú centrado.","- Las noticias (`article`) a la izquierda, ocupando el doble que la columna de la derecha (`aside`), que lleva mi foto (`img/persona.svg`), quién soy y las próximas lecturas en una lista numerada.","- Cada noticia con su título, la fecha en cursiva y gris, y una raya de color a la izquierda.","- Letra Georgia."),solution:{html:To,css:zo},checks:[Ie,{label:"El menú: `nav` con 4 enlaces centrados",test:e=>e.count("nav a")===4&&(V(e,"nav")||e.style("nav","text-align")==="center")},{label:"Dos noticias `article`, cada una con su `h2`",test:e=>e.count("article")===2&&e.all("article").every(a=>!!a.querySelector("h2"))},{label:"La fecha en cursiva",test:e=>Jn(e,"p, time, span","publicado").some(a=>e.style(a,"font-style")==="italic")},{label:"Las noticias y el `aside` lado a lado (aside a la derecha)",test:async e=>{const a=await e.at(te);return!!a.q("aside")&&!!a.q("article")&&N(a,"aside").left>N(a,"article").right-1}},{label:"El `aside` con la foto y una lista numerada (`ol`) de 3",test:e=>!!e.q("aside img[alt]")&&e.count("aside ol li")===3},{label:"La letra es Georgia",test:e=>en(e,"georgia")}],zones:[{sel:"header",tags:["header"]},{sel:"nav",tags:["nav"],layouts:["row"]},{sel:".contenedor",tags:["div","section"],layouts:["grid","row"]},{sel:"main",tags:["main"]},{sel:"article",tags:["article"]},{sel:"aside",tags:["aside"]},{sel:"footer",tags:["footer"]}]},{id:"sonora",title:"Festival Sonora",level:3,minutes:60,widths:[te,ae],brief:p("Organizamos el festival Sonora y necesitamos la web del cartel:","- Cabecera con el logo en texto naranja a la izquierda y el menú a la derecha.","- Una portada con la imagen de fondo `img/portada.svg` que cubra toda la franja, el título, las fechas y un botón naranja.","- El cartel: cuatro grupos (`article`) en cuatro columnas iguales.","- Pie en tres columnas: contacto, dónde y redes.","- En el móvil (segunda imagen): la cabecera en columna, los grupos de dos en dos y el pie en columna."),solution:{html:Uo,css:Ro},checks:[Ie,{label:"El menú: `nav` con una lista de 3 enlaces",test:e=>e.count("nav ul li a")===3},{label:"La portada con `portada.svg` de fondo",test:e=>e.all("body *").some(a=>e.style(a,"background-image").includes("portada.svg"))},{label:"El título del festival en un `h1`",test:e=>e.loose("h1").includes("sonora")},{label:"Cuatro grupos `article` en fila en el ordenador",test:async e=>e.count("article")===4&&Z(await e.at(te),"article")===4},{label:"Pie con tres columnas en el ordenador",test:async e=>{const a=await e.at(te);return!!a.q("footer")&&Z(a,[...a.q("footer").children])===3}},{label:"En el móvil, los grupos de dos en dos",test:async e=>Z(await e.at(ae),"article")===2},{label:"En el móvil, el pie en columna",test:async e=>{const a=await e.at(ae);return!!a.q("footer")&&Z(a,[...a.q("footer").children])===1}}],zones:[{sel:"header",tags:["header"],layouts:["row"]},{sel:"nav",tags:["nav"],layouts:["row"]},{sel:".portada",tags:["section","div"]},{sel:"main",tags:["main"]},{sel:".grupos",tags:["div","section"],layouts:["grid","row"]},{sel:"article",tags:["article"]},{sel:"footer",tags:["footer"],layouts:["row","grid"]}]},{id:"roble",title:"Casa rural El Roble",level:4,minutes:75,widths:[te,ae],brief:p("Tenemos una casa rural y queremos que la gente pueda pedir reserva desde la web:","- Cabecera con el nombre y el menú a la derecha.","- Tres fotos (`img/paisaje.svg`) en fila, cada una con su pie de foto (`figure` y `figcaption`).","- Debajo, a la izquierda, la casa con su tabla de precios y, a la derecha, el formulario de reserva en una caja blanca.","- Formulario: nombre y correo (obligatorios), fecha de llegada, número de personas (de 1 a 4, en un desplegable) y botón «Reservar». Cada campo con su `label`.","- Hazlo con `grid-template-areas`. En el móvil, todo en una columna (segunda imagen).","- Letra Verdana."),solution:{html:Do,css:Ho},checks:[Ie,{label:"Tres `figure` con su `figcaption`",test:e=>e.count("figure")===3&&e.all("figure").every(a=>!!a.querySelector("img[alt]")&&!!a.querySelector("figcaption"))},{label:"Las tres fotos en fila",test:async e=>Z(await e.at(te),"figure")===3},{label:"Nombre: texto y obligatorio",test:e=>G(O(e,"nombre"))==="text"&&me(O(e,"nombre"))},{label:'Correo: `type="email"` y obligatorio',test:e=>G(O(e,"correo"))==="email"&&me(O(e,"correo"))},{label:'Llegada: `type="date"`',test:e=>G(O(e,"llegada"))==="date"},{label:"Personas: desplegable con 1, 2, 3 y 4",test:e=>G(O(e,"personas"))==="select"&&Oa(O(e,"personas")).join()==="1,2,3,4"},{label:"Botón «Reservar» que envía",test:e=>De(e,"Reservar")},{label:"Con `grid-template-areas`",test:e=>e.all("body, body *").some(a=>yn(e,a)&&e.style(a,"grid-template-areas")!=="none")},{label:"En el ordenador, el formulario a la derecha de la tabla",test:async e=>{const a=await e.at(te);return!!a.q("form")&&!!a.q("table")&&N(a,"form").left>N(a,"table").right-1}},{label:"En el móvil, el formulario debajo de la tabla",test:async e=>{const a=await e.at(ae);return!!a.q("form")&&!!a.q("table")&&N(a,"form").top>N(a,"table").bottom-1}},{label:"La letra es Verdana",test:e=>en(e,"verdana")}],zones:[{sel:".pagina",tags:["div","main"],layouts:["grid"]},{sel:"header",tags:["header"],layouts:["row"]},{sel:".galeria",tags:["section","div"],layouts:["row","grid"]},{sel:"figure",tags:["figure"]},{sel:".info",tags:["section","div"]},{sel:"table",tags:["table"]},{sel:".reserva",tags:["section","div","aside"]},{sel:"form",tags:["form"],layouts:["column","none","grid"]},{sel:"footer",tags:["footer"]}]}],He=e=>Math.max(0,e.w)*Math.max(0,e.h);function Fo(e,a){const n=Math.max(0,Math.min(e.x+e.w,a.x+a.w)-Math.max(e.x,a.x)),t=Math.max(0,Math.min(e.y+e.h,a.y+a.h)-Math.max(e.y,a.y)),o=n*t;return o/(He(e)+He(a)-o||1)}const Yo=.5;function Go(e,a){const n=[];e.forEach((r,c)=>a.forEach((i,d)=>{const m=Fo(r,i);m>=Yo&&n.push({z:c,b:d,o:m+(r.tags.includes(i.tag)?1:0)})})),n.sort((r,c)=>c.o-r.o);const t=new Map,o=new Set;for(const r of n)t.has(r.z)||o.has(r.b)||(t.set(r.z,r.b),o.add(r.b));let l=0;const s=e.map((r,c)=>{const i=t.get(c)??null,d=i===null?null:a[i],m=!!d&&r.tags.includes(d.tag),y=!!d&&r.layouts.includes(d.layout);return l+=d?.5+(m?.3:0)+(y?.2:0):0,{zone:r,box:i,tagOk:m,layoutOk:y}});return{score:e.length?Math.round(l/e.length*100):0,zones:s,extra:a.map((r,c)=>c).filter(r=>!o.has(r))}}const Qo=(e,a)=>{const n=Math.max(0,Math.min(e.x+e.w,a.x+a.w)-Math.max(e.x,a.x)),t=Math.max(0,Math.min(e.y+e.h,a.y+a.h)-Math.max(e.y,a.y));return n*t/(He(e)||1)>=.85};function Wo(e){const a=e.map((l,s)=>({box:l,k:s,kids:[]})).sort((l,s)=>He(s.box)-He(l.box)),n=[],t=[];for(const l of a){const s=t.filter(r=>Qo(l.box,r.box)).sort((r,c)=>He(r.box)-He(c.box))[0];(s?s.kids:n).push(l),t.push(l)}const o=l=>{l.sort((s,r)=>Math.abs(s.box.y-r.box.y)>10?s.box.y-r.box.y:s.box.x-r.box.x),l.forEach(s=>o(s.kids))};return o(n),n}function Vo(e){const a=e.filter(o=>Math.abs(o.box.y-e[0].box.y)<=10);if(a.length<2)return"repeat(2, 1fr)";const n=Math.min(...a.map(o=>o.box.w)),t=a.map(o=>Math.max(1,Math.round(o.box.w/n)));return t.every(o=>o===1)?`repeat(${a.length}, 1fr)`:t.map(o=>`${o}fr`).join(" ")}function Ko(e){const a=Wo(e),n=new Map;for(const i of e)n.set(i.tag,(n.get(i.tag)??0)+1);const t=new Map,o=new Map,l=i=>{if(i.box.tag!=="div"&&n.get(i.box.tag)===1)return i.box.tag;const d=i.box.tag==="div"?"caja":i.box.tag,m=(o.get(d)??0)+1;o.set(d,m);const y=`${d}-${m}`;return t.set(i.k,y),`.${y}`},s=[],r=i=>{const d=i.box.layout;if(d!=="none"){const m=l(i),y=d==="row"?`  display: flex;
  /* en fila: falta justify-content, align-items o gap (míralos en la imagen) */`:d==="column"?`  display: flex;
  flex-direction: column;`:`  display: grid;
  grid-template-columns: ${Vo(i.kids)};
  gap: 20px;`;s.push(`${m} {
${y}
}`)}i.kids.forEach(r)};a.forEach(r);const c=(i,d)=>{const m=t.has(i.k)?` class="${t.get(i.k)}"`:"";return i.kids.length?`${d}<${i.box.tag}${m}>
${i.kids.map(y=>c(y,`${d}  `)).join(`
`)}
${d}</${i.box.tag}>`:`${d}<${i.box.tag}${m}></${i.box.tag}>`};return{body:a.map(i=>c(i,"    ")).join(`
`),css:s.join(`

`)}}function ya(e,a,n){return new Promise(t=>{const o=document.createElement("iframe");o.setAttribute("sandbox","allow-same-origin"),o.setAttribute("aria-hidden","true"),o.tabIndex=-1,o.style.cssText=`position:fixed;top:0;left:${-a-100}px;width:${a}px;height:${n}px;border:0;visibility:hidden;pointer-events:none`,o.onload=async()=>{const l=o.contentDocument;await Zo(l),t({doc:l,remove:()=>o.remove()})},o.srcdoc=qa(e).doc,document.body.append(o)})}async function Zo(e){const a=[...e.images].filter(n=>!n.complete).map(n=>new Promise(t=>{n.addEventListener("load",t,{once:!0}),n.addEventListener("error",t,{once:!0})}));await Promise.race([Promise.all([...a,e.fonts?.ready]),new Promise(n=>setTimeout(n,1500))])}const Jo={html:ga,css:J},Xo={html:zn,css:$e},el=[[0,"Ajustada"],[375,"Móvil"],[1024,"Ordenador"]];function ja(e,a){let n={...a.files};const t=a.tabs??["html","css"];let o,l=Promise.resolve(),s=!1,r=!1,c=!0,i=!!a.quiet;const d=b=>b==="html"?a.htmlName??ga:Jo[b];e.innerHTML=`
    <div class="ide${a.compact?" ide--compact":""}" data-tab="${t[0]}">
      <div class="ide__tabs" role="tablist" aria-label="Archivos">
        ${t.map((b,u)=>`<button class="ide__tab ide__tab--${b}" type="button" role="tab" data-tab="${b}" aria-selected="${u===0}">${d(b)}</button>`).join("")}
        <button class="ide__tab ide__tab--view" type="button" role="tab" data-tab="view" aria-selected="false">Vista</button>
      </div>
      <div class="ide__panes">
        <div class="ide__code">
          ${t.map((b,u)=>`
            <div class="code code--${b}" data-file="${b}" ${u?"hidden":""}>
              <div class="code__gutter" aria-hidden="true"><div></div></div>
              <div class="code__area">
                <pre class="code__hl" aria-hidden="true"></pre>
                <textarea class="code__input" wrap="off" spellcheck="false" autocapitalize="off" autocomplete="off" autocorrect="off" aria-label="Código de ${d(b)}"></textarea>
              </div>
            </div>`).join("")}
        </div>
        <div class="ide__view">
          <div class="browser">
            <div class="browser__bar">
              <span class="browser__dots" aria-hidden="true"><i></i><i></i><i></i></span>
              <span class="browser__url">${d("html")}</span>
              <span class="browser__width" title="Ancho de la ventana"></span>
              <span class="browser__sizes" role="group" aria-label="Anchura de la ventana">
                ${el.map(([b,u],x)=>`<button type="button" data-size="${b}" aria-pressed="${x===0}">${u}</button>`).join("")}
              </span>
            </div>
            <div class="browser__stage"><iframe class="browser__frame" title="Vista previa de la página" sandbox="allow-same-origin allow-forms"></iframe></div>
            <p class="browser__note" aria-live="polite" hidden></p>
          </div>
        </div>
      </div>
      <div class="ide__issues"${i?" hidden":""}></div>
    </div>`;const m=e.querySelector(".ide"),y=e.querySelector(".browser__frame"),g=e.querySelector(".browser__note"),v=e.querySelector(".browser__stage"),k=e.querySelector(".browser__width");let _=0;const M=e.querySelector(".ide__issues"),T=b=>e.querySelector(`.code[data-file="${b}"]`),q=b=>T(b)?.querySelector("textarea");let E=[];function A(b){if(m.dataset.tab=b,e.querySelectorAll(".ide__tab").forEach(u=>u.setAttribute("aria-selected",String(u.dataset.tab===b))),b!=="view")for(const u of t)T(u).hidden=u!==b}function C(b){const u=T(b);if(!u)return;const x=n[b];u.querySelector("pre").innerHTML=`${Xo[b](x)}
 `;const z=i?[]:E,F=new Set(z.filter(le=>le.file===b&&le.level==="error").map(le=>le.line)),X=new Set(z.filter(le=>le.file===b&&le.level==="aviso").map(le=>le.line)),re=x.split(`
`).length;u.querySelector(".code__gutter div").innerHTML=Array.from({length:re},(le,Ue)=>`<span${F.has(Ue+1)?' class="is-bad"':X.has(Ue+1)?' class="is-warn"':""}>${Ue+1}</span>`).join(""),S(b)}function S(b){const u=T(b),x=u.querySelector("textarea"),z=u.querySelector("pre");z.scrollTop=x.scrollTop,z.scrollLeft=x.scrollLeft,u.querySelector(".code__gutter div").style.transform=`translateY(${-x.scrollTop}px)`}function L(){clearTimeout(o),o=setTimeout(D,350)}function D(){clearTimeout(o),o=void 0;const b=qa(n);s=b.linked,r=b.fragment,l=new Promise(u=>{y.onload=()=>{c&&$(),u()}}),g.hidden=!0,y.srcdoc=b.doc}function $(){const b=y.contentDocument;b&&(b.addEventListener("click",u=>{const x=u.target.closest?.("a[href]");if(!x)return;u.preventDefault();const z=x.getAttribute("href")??"";if(z.startsWith("#")&&z.length>1){b.getElementById(decodeURIComponent(z.slice(1)))?.scrollIntoView();return}a.onLink?.(z)||j(`Este enlace lleva a «${z}». En la vista previa no se abre.`)}),b.addEventListener("submit",u=>{u.preventDefault();const x=u.target;let z="";try{z=[...new FormData(x)].map(([F,X])=>`${F}=${typeof X=="string"?X:X.name}`).join(", ")}catch{}j(`El formulario se enviaría${x.getAttribute("action")?` a «${x.getAttribute("action")}»`:""} con: ${z||"(nada: ningún campo tiene name)"}. En la vista previa no se envía.`)}),h(b))}function j(b){g.textContent=b,g.hidden=!1}function h(b){const u=[];if(t.includes("html")){u.push(...[..._n(n.html),...Co(b,n.html)].map(x=>({...x,file:"html"})));for(const x of b.images){const z=x.getAttribute("src");if(!z||!x.complete||x.naturalWidth>0)continue;const F=n.html.indexOf(z);u.push({file:"html",line:F<0?1:n.html.slice(0,F).split(`
`).length,level:"aviso",msg:`No se encuentra la imagen «${z}»: revisa la carpeta y el nombre letra a letra, con su extensión (.jpg, .png, .svg…).`})}}if(t.includes("css")){const{rules:x,issues:z}=va(n.css);if(u.push(...z.map(F=>({...F,file:"css"}))),n.css.trim()&&!s&&!r)u.push({file:"html",line:f(),level:"error",msg:`${d("html")} no enlaza ${J}, así que el CSS no se aplica. En el <head> pon <link rel="stylesheet" href="${J}">.`});else for(const F of x)for(const X of F.selector.split(",").map(re=>re.trim())){const re=X.replace(/::?[a-z-]+(\([^)]*\))?/gi,"").trim();if(re)try{b.querySelector(re)||u.push({file:"css",line:F.line,level:"aviso",msg:`«${X}» no se aplica a nada de la página: revisa que se llame igual en el HTML.`})}catch{u.push({file:"css",line:F.line,level:"error",msg:`El selector «${X}» está mal escrito.`})}}}E=u;for(const x of t)C(x);M.innerHTML=u.length?`<ul class="issues">${u.map((x,z)=>`<li class="issue issue--${x.level}">
              <button class="issue__where" type="button" data-k="${z}">${x.level==="error"?"Error":"Aviso"} · ${d(x.file)}:${x.line}</button>
              <span>${R(x.msg)}</span>
            </li>`).join("")}</ul>`:'<p class="issues__ok">Sin fallos a la vista en el código.</p>'}const f=()=>{const b=n.html.search(/<\/head>/i);return b<0?1:n.html.slice(0,b).split(`
`).length};function w(b,u){A(b);const x=q(b),z=n[b].split(`
`),F=z.slice(0,u-1).reduce((re,le)=>re+le.length+1,0);x.focus(),x.setSelectionRange(F,F+(z[u-1]?.length??0));const X=parseFloat(getComputedStyle(x).lineHeight)||20;x.scrollTop=Math.max(0,(u-3)*X),S(b)}M.addEventListener("click",b=>{const u=b.target.closest(".issue__where");if(!u)return;const x=E[Number(u.dataset.k)];x&&w(x.file,x.line)});function P(){const b=v.clientWidth;if(!b)return;const u=_||b,x=Math.min(1,b/u);y.style.width=`${u}px`,y.style.height=`${v.clientHeight/x}px`,y.style.left=`${Math.max(0,(b-u)/2)}px`,y.style.transform=x<1?`scale(${x})`:"",k.textContent=`${Math.round(u)} px${x<1?` · ${Math.round(x*100)} %`:""}`}const U=new ResizeObserver(P);U.observe(v),P(),e.querySelector(".browser__sizes").addEventListener("click",b=>{const u=b.target.closest("[data-size]");u&&(_=Number(u.dataset.size),e.querySelectorAll(".browser__sizes button").forEach(x=>x.setAttribute("aria-pressed",String(x===u))),P())}),e.querySelector(".ide__tabs").addEventListener("click",b=>{const u=b.target.closest("[data-tab]")?.dataset.tab;u&&A(u)});for(const b of t){const u=q(b);u.value=n[b];let x=!1;u.addEventListener("input",()=>{n={...n,[b]:u.value},C(b),L(),a.onChange?.(n)}),u.addEventListener("scroll",()=>S(b)),u.addEventListener("keydown",z=>{if(z.key==="Escape"){x=!0;return}const F=!z.ctrlKey&&!z.altKey&&!z.metaKey;z.key==="Tab"&&F&&!x?(z.preventDefault(),al(u,z.shiftKey)):z.key==="Enter"&&F&&!z.shiftKey&&!z.isComposing&&(z.preventDefault(),nl(u,b)),x=!1}),C(b)}return D(),{files:()=>n,set(b){n={...b};for(const u of t)q(u).value=n[u],C(u);D()},open(b,u){a.htmlName=u;const x=e.querySelector(".ide__tab--html");x&&(x.textContent=u),q("html")?.setAttribute("aria-label",`Código de ${u}`),e.querySelector(".browser__url").textContent=u,this.set(b),t.includes("html")&&A("html")},setQuiet(b){i=b,M.hidden=b;for(const u of t)C(u)},async page(){return o!==void 0&&D(),await l,new Mn(y.contentDocument,n,s)},destroy(){c=!1,clearTimeout(o),U.disconnect()}}}function Ba(e,a){document.execCommand("insertText",!1,a)||(e.setRangeText(a,e.selectionStart,e.selectionEnd,"end"),e.dispatchEvent(new Event("input")))}function al(e,a){const{value:n,selectionStart:t,selectionEnd:o}=e;if(!a&&!n.slice(t,o).includes(`
`)){Ba(e,"  ");return}const l=n.lastIndexOf(`
`,t-1)+1,s=n.indexOf(`
`,o===t?o:o-1),r=s<0?n.length:s,i=n.slice(l,r).split(`
`).map(d=>a?d.replace(/^ {1,2}/,""):`  ${d}`).join(`
`);e.setSelectionRange(l,r),Ba(e,i),e.setSelectionRange(l,l+i.length)}function nl(e,a){const{value:n,selectionStart:t}=e,o=n.lastIndexOf(`
`,t-1)+1,l=n.slice(o,t),s=/^\s*/.exec(l)[0],r=n.slice(e.selectionEnd);let c=!1;if(a==="css")c=l.trimEnd().endsWith("{");else{const d=/<([a-zA-Z][\w-]*)\b[^<>]*>\s*$/.exec(l);c=!!d&&!Na.has(d[1].toLowerCase())&&!d[0].includes("/>")}const i=a==="css"?/^\s*}/.test(r):/^\s*<\//.test(r);if(c&&i){Ba(e,`
${s}  
${s}`);const d=t+1+s.length+2;e.setSelectionRange(d,d);return}Ba(e,`
${s}${c?"  ":""}`)}const tl={quiz:"Test",match:"Unir",code:"Escribe el código"},Ut=e=>e.kind==="code"&&e.exam?`Simulacro · ${e.exam.minutes} min`:tl[e.kind];function ea(e){const a=(n,t,o)=>`<figure class="snippet snippet--${t}"><figcaption>${n}</figcaption><pre><code>${o}</code></pre></figure>`;return`${e.html!==void 0?a(ga,"html",zn(e.html.trim())):""}${e.css!==void 0?a(J,"css",$e(e.css.trim())):""}`}function Re(e){const a=[...e];for(let n=a.length-1;n>0;n--){const t=Math.floor(Math.random()*(n+1));[a[n],a[t]]=[a[t],a[n]]}return a}function ol(e){let a=Re(e);for(let n=0;n<20&&e.length>1&&a.some((t,o)=>t===e[o]);n++)a=Re(e);return a}function Dn(e,a,n){let t=!1,o=()=>{};function l(m){n.onAnswer?.(m,!t),t=!0}const s=()=>n.next.href?`<a class="btn btn--main" href="${n.next.href}">${R(n.next.label)}</a>`:`<button class="btn btn--main" type="button" data-next>${R(n.next.label)}</button>`;function r(m,y){return queueMicrotask(()=>{e.querySelector("[data-retry]")?.addEventListener("click",()=>y?.()),e.querySelector("[data-next]")?.addEventListener("click",()=>n.next.onClick?.())}),`<div class="actions">
      ${m||!y?"":'<button class="btn" type="button" data-retry>Intentar otra vez</button>'}
      ${s()}
    </div>`}function c(m){const y=Re(m.options);e.innerHTML=`
      ${m.code?ea(m.code):""}
      <p class="challenge__ask">${W(m.question)}</p>
      <div class="choices">
        ${y.map((g,v)=>`<button class="choice" type="button" data-k="${v}">${W(g)}</button>`).join("")}
      </div>
      <div class="feedback" aria-live="polite"></div>`,e.querySelector(".choices").addEventListener("click",g=>{const v=g.target.closest(".choice");if(!v||v.disabled)return;const k=y[Number(v.dataset.k)]===m.options[0];e.querySelectorAll(".choice").forEach(_=>{_.disabled=!0,y[Number(_.dataset.k)]===m.options[0]&&_.classList.add("is-right")}),k||v.classList.add("is-wrong"),l(k),e.querySelector(".feedback").innerHTML=`
        <p class="feedback__title feedback__title--${k?"ok":"bad"}">${k?"¡Bien!":`No. Es: ${W(m.options[0])}`}</p>
        ${ke(m.why)}
        ${r(k,()=>c(m))}`})}function i(m){const y=ol(m.pairs.map(q=>q[1])),g=m.pairs.map(()=>{});let v=0;e.innerHTML=`
      <p class="challenge__ask">${W(m.task)}</p>
      <p class="hint">Pulsa uno de la izquierda y luego el suyo de la derecha. Para soltar una unión, pulsa otra vez el de la derecha.</p>
      <div class="match">
        <p class="match__now" aria-live="polite"></p>
        <ol class="match__terms" aria-label="Conceptos"></ol>
        <ol class="match__defs" aria-label="Lo que les corresponde"></ol>
      </div>
      <div class="actions" data-check-row><button class="btn btn--main" type="button" data-check disabled>Comprobar</button></div>
      <div class="feedback" aria-live="polite"></div>`;const k=e.querySelector(".match__terms"),_=e.querySelector(".match__defs"),M=e.querySelector("[data-check]");function T(q){k.innerHTML=m.pairs.map((E,A)=>`<li><button class="match__item${q?q[A]?" is-ok":" is-bad":A===v?" is-active":g[A]!==void 0?" is-linked":""}" type="button" data-term="${A}" ${q?"disabled":""} aria-pressed="${A===v&&!q}"><span class="match__n">${A+1}</span><span>${W(E[0])}</span></button></li>`).join(""),_.innerHTML=y.map((E,A)=>{const C=g.indexOf(A);return`<li><button class="match__item${C>=0?q?q[C]?" is-ok":" is-bad":" is-linked":""}" type="button" data-def="${A}" ${q?"disabled":""}><span class="match__n">${C>=0?C+1:"·"}</span><span>${W(E)}</span></button></li>`}).join(""),M.disabled=g.some(E=>E===void 0),e.querySelector(".match__now").innerHTML=q?"":`Uniendo <span class="match__n">${v+1}</span> ${W(m.pairs[v][0])}`}e.querySelector(".match").addEventListener("click",q=>{const E=q.target.closest(".match__item");if(!(!E||E.disabled)){if(E.dataset.term!==void 0)v=Number(E.dataset.term);else{const A=Number(E.dataset.def),C=g.indexOf(A);if(C>=0)g[C]=void 0,v=C;else{g[v]=A;const S=g.findIndex((L,D)=>L===void 0&&D!==v);S>=0&&(v=S)}}T()}}),M.addEventListener("click",()=>{const q=m.pairs.map((C,S)=>y[g[S]]===C[1]),E=q.filter(Boolean).length,A=E===q.length;T(q),e.querySelector("[data-check-row]")?.remove(),l(A),e.querySelector(".feedback").innerHTML=`
        <p class="feedback__title feedback__title--${A?"ok":"bad"}">${A?"¡Todas bien unidas!":`${E} de ${q.length} bien. Así van:`}</p>
        ${A?"":`<ul class="match__answer">${m.pairs.map(C=>`<li>${W(C[0])}: ${W(C[1])}</li>`).join("")}</ul>`}
        ${ke(m.why)}
        ${r(A,()=>i(m))}`}),T()}function d(m){const y=n.draftKey,g=m.exam&&y?m.exam:void 0;let v=g?Wa(y):void 0;const k=y?Qa(y):void 0;e.innerHTML=`
      <section class="panel brief" aria-labelledby="brief-t">
        <h2 class="panel__title" id="brief-t">${g?"El enunciado":"El encargo"}</h2>
        ${ke(m.brief)}
      </section>
      ${g?`<section class="panel exam-start" aria-labelledby="exam-t" hidden>
        <h2 class="panel__title" id="exam-t">Simulacro de ${g.minutes} minutos</h2>
        <p>Como en el examen: ${m.tabs?.length===1&&m.tabs[0]==="css"?"el HTML ya está hecho y empiezas con el CSS vacío":"empiezas con los archivos vacíos"}, sin avisos de fallos y sin ver lo que se va a corregir hasta que entregas. Al entregar sale tu nota sobre 10.</p>
        <p>El reloj sigue aunque salgas de la página. Si se acaba el tiempo, se entrega solo.</p>
        <div class="actions"><button class="btn btn--main" type="button" data-start>Empezar el simulacro</button></div>
      </section>
      <p class="timer" role="timer" hidden></p>
      <p class="sr-only" aria-live="polite" data-timer-say></p>`:""}
      <div data-exam-body>
        <section class="checklist" aria-labelledby="checks-t">
          <h2 class="section-title" id="checks-t">${g?"Lo que se ha corregido":"Lo que se va a comprobar"}</h2>
          <ol class="checks">${m.checks.map((w,P)=>`<li class="check" data-k="${P}"><span class="check__mark" aria-hidden="true">○</span><span class="check__label">${W(w.label)}</span></li>`).join("")}</ol>
        </section>
        <div data-editor></div>
        <div class="actions">
          <button class="btn btn--main" type="button" data-run>Comprobar</button>
          <button class="btn" type="button" data-reset>Empezar de nuevo</button>
          <button class="btn" type="button" data-solution>Ver una solución</button>
        </div>
        <div class="feedback" aria-live="polite"></div>
        <div data-solution-box></div>
      </div>`;const _=ja(e.querySelector("[data-editor]"),{files:k??m.start,tabs:m.tabs,quiet:!!g&&!v?.mark,onChange:w=>y&&Je(y,w)});let M;o=()=>{clearInterval(M),_.destroy()};const T=e.querySelector(".feedback"),q=e.querySelector("[data-run]"),E=e.querySelector("[data-solution]"),A=e.querySelector(".checklist");async function C(){const w=await Nt(await _.page(),m.checks);e.querySelectorAll(".check").forEach(U=>{const b=Number(U.dataset.k),u=w[b];U.classList.toggle("is-ok",u),U.classList.toggle("is-bad",!u),U.querySelector(".check__mark").textContent=u?"✓":"✗",U.querySelector(".check__hint")?.remove(),!u&&m.checks[b].hint&&U.insertAdjacentHTML("beforeend",`<span class="check__hint">${W(m.checks[b].hint)}</span>`)});const P=w.filter(Boolean).length;return l(P===w.length),{hits:P,total:w.length}}const S=e.querySelector(".timer"),L=e.querySelector("[data-timer-say]"),D=w=>{const P=Math.max(0,Math.ceil(w/1e3));return`${Math.floor(P/60)}:${String(P%60).padStart(2,"0")}`},$=w=>(Math.round(w.hits/w.total*100)/10).toLocaleString("es-ES");function j(){if(!g)return;const w=!!v,P=!!v?.mark;if(e.querySelector(".exam-start").hidden=w,e.querySelector("[data-exam-body]").hidden=!w,A.hidden=!P,E.hidden=!P,q.textContent=P?"Comprobar otra vez":"Entregar",_.setQuiet(w&&!P),clearInterval(M),S.hidden=!w,P)S.classList.remove("is-low"),S.textContent=`Entregado en ${v.mark.minutes} min · Nota: ${$(v.mark)}`;else if(w){const U=v.start+g.minutes*6e4,b=new Set,u=()=>{const x=U-Date.now();if(x<=0){h(!0);return}S.textContent=`Quedan ${D(x)}`,S.classList.toggle("is-low",x<=5*6e4);for(const z of[10,5,1])x<=z*6e4&&x>(z-1)*6e4&&!b.has(z)&&g.minutes>z&&(b.add(z),L.textContent=`Queda${z>1?"n":""} ${z} minuto${z>1?"s":""}.`)};u(),M=setInterval(u,1e3)}}async function h(w){clearInterval(M);const{hits:P,total:U}=await C(),b=Math.min(g.minutes,Math.max(1,Math.round((Date.now()-v.start)/6e4)));v={...v,mark:{hits:P,total:U,minutes:b}},Ze(y,v),j(),T.innerHTML=`
        <p class="feedback__title feedback__title--${P===U?"ok":"bad"}">${w?"Se acabó el tiempo. ":""}Tu nota: ${$(v.mark)} sobre 10 (${P} de ${U} peticiones).</p>
        ${P===U?ke(m.why):"<p>Arriba tienes lo que se ha corregido: lo marcado con ✗ es lo que te ha faltado. Puedes seguir arreglándolo y comprobar otra vez, o ver una solución.</p>"}
        ${P===U?r(!0):""}`,A.scrollIntoView({block:"start",behavior:"smooth"})}e.querySelector("[data-start]")?.addEventListener("click",()=>{v={start:Date.now()},Ze(y,v),j(),e.querySelector(".code__input")?.focus()}),q.addEventListener("click",async()=>{if(g&&!v?.mark){await h(!1);return}const{hits:w,total:P}=await C(),U=w===P;T.innerHTML=U?`<p class="feedback__title feedback__title--ok">¡Encargo cumplido! ${w} de ${w}.</p>${ke(m.why)}${r(!0)}`:`<p class="feedback__title feedback__title--bad">Llevas ${w} de ${P}. Mira las marcadas con ✗ y los fallos debajo del editor.</p>`,(U?T:A).scrollIntoView({block:"nearest",behavior:"smooth"})});const f=e.querySelector("[data-reset]");f.addEventListener("click",()=>{if(!f.dataset.sure){f.dataset.sure="1",f.textContent="Pulsa otra vez para borrarlo",setTimeout(()=>{delete f.dataset.sure,f.textContent="Empezar de nuevo"},3e3);return}delete f.dataset.sure,f.textContent="Empezar de nuevo",y&&xo(y),_.set(m.start),g&&(v=void 0,Ze(y),T.innerHTML="",e.querySelector("[data-solution-box]").innerHTML="",e.querySelectorAll(".check").forEach(w=>{w.classList.remove("is-ok","is-bad"),w.querySelector(".check__mark").textContent="○",w.querySelector(".check__hint")?.remove()}),j())}),E.addEventListener("click",()=>{const w=e.querySelector("[data-solution-box]"),P=Object.fromEntries(["html","css"].filter(U=>m.solution[U]!==m.start[U]&&(!m.tabs||m.tabs.includes(U))).map(U=>[U,m.solution[U]]));w.innerHTML=`
        <section class="panel solution" aria-labelledby="sol-t">
          <h2 class="panel__title" id="sol-t">Una solución</h2>
          <p class="hint">Hay más formas de hacerlo bien: vale cualquiera que cumpla la lista. Intenta entender cada línea antes de copiarla.</p>
          ${ea(P)}
          <div class="actions"><button class="btn" type="button" data-copy>Ponerla en el editor</button></div>
        </section>`,w.querySelector("[data-copy]").addEventListener("click",()=>{_.set(m.solution),y&&Je(y,m.solution)}),w.scrollIntoView({block:"nearest",behavior:"smooth"})}),g&&v?.mark&&(T.innerHTML=`<p class="feedback__title">Tu nota de la entrega: ${$(v.mark)} sobre 10. Pulsa «Comprobar otra vez» para ver la lista con lo que llevas ahora.</p>`),j()}return a.kind==="quiz"?c(a):a.kind==="match"?i(a):d(a),()=>o()}async function Nt(e,a){const n=await Promise.all(a.map(t=>Promise.resolve().then(()=>t.test(e)).then(Boolean,()=>!1)));return e.release(),n}const xn=e=>(e??"").replace(/\s+/g," ").trim(),ll=e=>xn(e).toLowerCase().normalize("NFD").replace(/[̀-ͯ]/g,"");function It(e){const a=(e.match(/[\d.]+/g)??[]).map(Number);return[a[0]??0,a[1]??0,a[2]??0,a.length>3?a[3]:1]}const ua=e=>`#${e.map(a=>Math.round(a).toString(16).padStart(2,"0")).join("")}`;function sl(e,a,n){return n?Math.abs(n.w-a.w)>4||Math.abs(n.h-a.h)>4?`La caja de color de detrás de ${e} mide ${ba(n)} y en la imagen ${ba(a)}.`:`La caja de color de detrás de ${e} está ${vn(n.x-a.x,n.y-a.y)} que en la imagen.`:`Detrás de ${e} falta una caja de color de ${ba(a)}.`}const Xn=(e,a)=>`shift:${Math.round(e/3)},${Math.round(a/3)}`,et=(e,a)=>Math.hypot(e[0]-a[0],e[1]-a[1],e[2]-a[2]),Oe=(e,a,n)=>e<=a?1:e>=n?0:1-(e-a)/(n-a),rl="svg, script, style, select, textarea, noscript";function at(e,a){for(let n=e;n;n=n.parentElement){const t=a.getComputedStyle(n),o=n.tagName==="BODY"||n.tagName==="HTML",l=n.getBoundingClientRect(),s=o?void 0:{x:l.left,y:l.top,w:l.width,h:l.height};if(t.backgroundImage&&t.backgroundImage!=="none")return{bg:null,box:s};const[r,c,i,d]=It(t.backgroundColor);if(d>.5)return{bg:[r,c,i],box:s}}return{bg:[255,255,255]}}function nt(e){const a=e.defaultView;a.scrollTo(0,0);const n=[];for(const t of e.body?.querySelectorAll("*")??[]){if(t.closest(rl))continue;const o=a.getComputedStyle(t);if(o.display==="none"||o.visibility==="hidden")continue;const l=at(t.parentElement??t,a);if(t.tagName==="IMG"){const y=t.getBoundingClientRect(),g=t.getAttribute("src")??"";if(!y.width||!g)continue;const v=g.split("/").pop().toLowerCase();n.push({kind:"img",key:`img:${v}`,label:v,x:y.left,y:y.top,w:y.width,h:y.height,color:[0,0,0],size:0,bold:!1,...l});continue}if(![...t.childNodes].some(y=>y.nodeType===3&&xn(y.textContent)))continue;const s=e.createRange();s.selectNodeContents(t);const r=s.getBoundingClientRect();if(!r.width||!r.height)continue;const c=xn(t.textContent),[i,d,m]=It(o.color);n.push({kind:"text",key:ll(c),label:c.length>40?`${c.slice(0,38)}…`:c,x:r.left,y:r.top,w:r.width,h:r.height,color:[i,d,m],size:parseFloat(o.fontSize)||16,bold:(parseInt(o.fontWeight,10)||400)>=600,...at(t,a)})}return n}const il=(e,a)=>{const n=Math.max(0,Math.min(e.x+e.w,a.x+a.w)-Math.max(e.x,a.x)),t=Math.max(0,Math.min(e.y+e.h,a.y+a.h)-Math.max(e.y,a.y)),o=n*t;return o/(e.w*e.h+a.w*a.h-o||1)},Fa=e=>`${Math.round(e)}px`,ba=e=>`${Math.round(e.w)}×${Math.round(e.h)} px`;function vn(e,a){const n=[];return Math.abs(a)>6&&n.push(`${Fa(Math.abs(a))} más ${a>0?"abajo":"arriba"}`),Math.abs(e)>6&&n.push(`${Fa(Math.abs(e))} más a la ${e>0?"derecha":"izquierda"}`),n.join(" y ")}function cl(e,a){const n=new Map;for(const s of a)n.set(s.key,[...n.get(s.key)??[],s]);const t=[];let o=0,l=0;for(const s of e){const r=n.get(s.key)?.shift(),c=s.kind==="img"?`La imagen ${s.label}`:`«${s.label}»`,i=(q,E,A=`same:${E.replace(c,"")}`)=>q>.001&&t.push({loss:q,y:s.y,msg:E,group:A,name:c});if(!r){i(1,s.kind==="img"?`Falta la imagen ${s.label}.`:`No encuentro el texto «${s.label}»: escríbelo igual que en la imagen.`);continue}l++;const d=r.x-s.x,m=r.y-s.y,y=Oe(Math.hypot(d,m),6,80);if(s.kind==="img"){const q=Oe(Math.max(Math.abs(r.w-s.w),Math.abs(r.h-s.h)),4,80);i(.5*(1-y),`${c} está ${vn(d,m)} que en la imagen.`,Xn(d,m)),i(.5*(1-q),`${c} mide ${ba(r)} y en la imagen ${ba(s)}.`),o+=.5*y+.5*q;continue}const g=Oe(Math.abs(r.size-s.size),1,10),v=r.bold===s.bold?1:0,k=Oe(et(r.color,s.color),12,120),_=s.bg&&r.bg?Oe(et(r.bg,s.bg),12,120):s.bg===r.bg?1:.3,M=s.box?r.box?Oe(1-il(r.box,s.box),.1,.7):0:1;i(.4*(1-y),`${c} está ${vn(d,m)} que en la imagen.`,Xn(d,m)),i(.15*(1-g),`${c}: la letra mide ${Fa(r.size)} y en la imagen ${Fa(s.size)}.`),i(.05*(1-v),`${c} ${s.bold?"va en negrita":"no va en negrita"} en la imagen.`),i(.15*(1-k),`${c}: el texto es de color ${ua(r.color)} y en la imagen ${ua(s.color)}.`),s.bg?i(.15*(1-_),`Detrás de ${c} el fondo es ${r.bg?ua(r.bg):"una imagen"} y en la imagen ${ua(s.bg)}.`):i(.15*(1-_),`Detrás de ${c} hay una imagen de fondo en la imagen.`);const T=!!s.box&&!!r.box&&Math.abs(r.box.w-s.box.w)<=4&&Math.abs(r.box.h-s.box.h)<=4&&Math.abs(r.box.x-s.box.x-d)<=3&&Math.abs(r.box.y-s.box.y-m)<=3;s.box&&!T&&i(.1*(1-M),sl(c,s.box,r.box),`box:${Math.round(s.box.x)},${Math.round(s.box.y)}`),o+=.4*y+.15*g+.05*v+.15*k+.15*_+.1*M}return{score:e.length?Math.round(o/e.length*100):0,found:l,total:e.length,differences:dl(t).sort((s,r)=>r.loss-s.loss)}}function dl(e){const a=new Map,n=[];for(const t of e)a.set(t.group,[...a.get(t.group)??[],t]);for(const[t,o]of a){const l=o.reduce((r,c)=>c.y<r.y?c:r),s=o.reduce((r,c)=>r+c.loss,0);if(t.startsWith("shift:")&&o.length>=3){const r=/^(.*?) está (.*) que en la imagen\.$/.exec(l.msg);n.push({...l,loss:s,msg:`Desde ${r?.[1]??"ahí"} hacia abajo, ${o.length} cosas están ${r?.[2]??"movidas"} que en la imagen: lo de encima no mide lo mismo (revisa padding, margin, height o font-size).`})}else t.startsWith("shift:")?n.push(...o):t.startsWith("same:")&&o.length>1?n.push({...l,loss:s,msg:l.msg.replace(l.name,`${l.name} (y ${o.length-1} más)`)}):n.push({...l,loss:s})}return n}const ul=[["image","Imagen"],["page","Tu página"],["overlay","Superponer"],["curtain","Cortina"],["diff","Diferencias"]],pl={image:"Toca la imagen con el cuentagotas para saber su color, o arrastra con la regla para medir.",page:"Tu página al mismo ancho que la imagen.",overlay:"Tu página encima de la imagen: mueve la barra para verla más o menos.",curtain:"A la izquierda de la raya, la imagen; a la derecha, tu página. Mueve la barra.",diff:"Lo que coincide se ve negro; lo que no, de colores. Cuanto más negro, mejor."};function Ot(e,a){const n=ul.filter(([b])=>!a.modes||a.modes.includes(b));let t=n[0][0],o="picker",l=1,s=!1,r=0,c=0;e.innerHTML=`
    <div class="viewer">
      <div class="viewer__bar">
        ${n.length>1?`<span class="viewer__modes" role="group" aria-label="Cómo verlo">${n.map(([b,u],x)=>`<button type="button" data-mode="${b}" aria-pressed="${x===0}">${u}</button>`).join("")}</span>`:""}
        <label class="viewer__range" hidden><span class="sr-only">Cuánto se ve tu página</span><input type="range" min="0" max="100" value="50"></label>
        <label class="viewer__real"><input type="checkbox"> Tamaño real</label>
        ${a.noTools?"":'<span class="viewer__tools" role="group" aria-label="Herramientas"><button type="button" data-tool="picker" aria-pressed="true">Cuentagotas</button><button type="button" data-tool="ruler" aria-pressed="false">Regla</button></span>'}
      </div>
      <p class="viewer__help hint"></p>
      <div class="viewer__read"><div class="viewer__out" aria-live="polite"></div><div class="viewer__hover hint" aria-hidden="true"></div></div>
      <div class="viewer__stage">
        <div class="viewer__canvas" style="width:${a.width}px">
          <img class="viewer__img" src="${a.image}" alt="La web que hay que conseguir" width="${a.width}" draggable="false">
          <iframe class="viewer__frame" title="Tu página" sandbox="allow-same-origin" tabindex="-1" style="width:${a.width}px"></iframe>
          <canvas class="viewer__marks" aria-hidden="true"></canvas>
          <div class="viewer__layer"></div>
        </div>
      </div>
    </div>`;const i=e.querySelector(".viewer"),d=e.querySelector(".viewer__stage"),m=e.querySelector(".viewer__canvas"),y=e.querySelector(".viewer__img"),g=e.querySelector(".viewer__frame"),v=e.querySelector(".viewer__marks"),k=e.querySelector(".viewer__layer"),_=e.querySelector(".viewer__range input"),M=e.querySelector(".viewer__out"),T=e.querySelector(".viewer__hover"),q=e.querySelector(".viewer__help");let E=null;const A=new Promise(b=>{const u=()=>{r=y.naturalHeight;const x=document.createElement("canvas");x.width=y.naturalWidth,x.height=y.naturalHeight;const z=x.getContext("2d",{willReadFrequently:!0});z&&(z.drawImage(y,0,0),E=z.getImageData(0,0,x.width,x.height)),v.width=y.naturalWidth,v.height=y.naturalHeight,C(),b({width:y.naturalWidth,height:y.naturalHeight})};y.complete&&y.naturalWidth?u():y.addEventListener("load",u,{once:!0})});function C(){const b=d.clientWidth;if(!b)return;l=s?1:Math.min(1,b/a.width),d.classList.toggle("is-real",s);const u=Math.max(r,t==="image"?0:c);m.style.height=`${u}px`,m.style.transform=l<1?`scale(${l})`:"",d.style.height=`${u*l+(s&&b<a.width?18:0)}px`}function S(){i.dataset.mode=t,e.querySelectorAll("[data-mode]").forEach(z=>z.setAttribute("aria-pressed",String(z.dataset.mode===t))),e.querySelectorAll("[data-tool]").forEach(z=>z.setAttribute("aria-pressed",String(z.dataset.tool===o)));const b=t==="overlay"||t==="curtain";_.parentElement.hidden=!b;const u=e.querySelector(".viewer__tools");u&&(u.hidden=t!=="image"),q.textContent=a.noTools?"":pl[t];const x=Number(_.value);g.style.opacity=t==="overlay"?String(x/100):"",g.style.clipPath=t==="curtain"?`inset(0 0 0 ${x}%)`:"",m.style.setProperty("--curtain",`${x}%`),t!=="image"&&(M.textContent=T.textContent=""),C()}e.querySelector(".viewer__bar").addEventListener("click",b=>{const u=b.target.closest("[data-mode], [data-tool]");u&&(u.dataset.mode&&(t=u.dataset.mode),u.dataset.tool&&(o=u.dataset.tool),$(),S())}),_.addEventListener("input",S),e.querySelector(".viewer__real input").addEventListener("change",b=>{s=b.target.checked,C()});const L=(b,u)=>{const x=m.getBoundingClientRect();return{x:Math.round((b-x.left)/l),y:Math.round((u-x.top)/l)}},D=(b,u)=>{if(!E||b<0||u<0||b>=E.width||u>=E.height)return null;const x=(u*E.width+b)*4;return[E.data[x],E.data[x+1],E.data[x+2]]};function $(){v.getContext("2d")?.clearRect(0,0,v.width,v.height)}function j(b,u,x,z){const F=ua(b),X=`<span class="swatch" style="background:${F}"></span>`;if(!z){T.innerHTML=`${X} ${F} · x ${u}, y ${x}`;return}M.innerHTML=`${X} <code>${F}</code> <code>rgb(${b.join(", ")})</code> <span class="hint">en x ${u}, y ${x}</span> <button class="btn btn--small" type="button" data-copy="${F}">Copiar ${F}</button>`}M.addEventListener("click",b=>{const u=b.target.closest("[data-copy]");u&&navigator.clipboard?.writeText(u.dataset.copy).then(()=>u.textContent="Copiado",()=>u.textContent="No se ha podido copiar")});let h=null;function f(b,u){const x=v.getContext("2d");if(!x)return;$();const z=Math.min(b.x,u.x),F=Math.min(b.y,u.y),X=Math.abs(u.x-b.x),re=Math.abs(u.y-b.y);x.strokeStyle=getComputedStyle(i).getPropertyValue("--mark").trim()||"#e11d48",x.lineWidth=2,x.setLineDash([6,4]),x.strokeRect(z+.5,F+.5,X,re),M.innerHTML=`<strong>${X} × ${re} px</strong> <span class="hint">desde x ${z}, y ${F}</span>`}const w=()=>t==="image"&&!a.noTools;m.addEventListener("pointerdown",b=>{if(!w())return;const u=L(b.clientX,b.clientY);if(o==="picker"){const x=D(u.x,u.y);x&&j(x,u.x,u.y,!0);return}h=u,m.setPointerCapture(b.pointerId),b.preventDefault()}),m.addEventListener("pointermove",b=>{if(!w())return;const u=L(b.clientX,b.clientY);if(o==="ruler"&&h)f(h,u);else if(o==="picker"&&b.pointerType==="mouse"){const x=D(u.x,u.y);x&&j(x,u.x,u.y,!1)}}),m.addEventListener("pointerup",()=>h=null),m.addEventListener("pointerleave",()=>T.textContent="");function P(b){g.onload=()=>{const u=g.contentDocument;u&&(g.style.height=`${r||600}px`,c=u.documentElement.scrollHeight,g.style.height=`${Math.max(c,r)}px`,C())},g.style.height=`${r||600}px`,g.srcdoc=qa(b).doc}const U=new ResizeObserver(C);return U.observe(d),S(),{setFiles:P,layer:k,toImage:L,ready:A,destroy:()=>U.disconnect()}}const qn=e=>`maqueta/${e}`,Bt=e=>`maqueta/${e}/nota`,ml=e=>`maqueta/${e}/cajas`,tt="maqueta/papel",Rn=e=>Number(Te(Bt(e))??"")||0,hl=()=>({done:fa.filter(e=>Rn(e.id)>=90).length,total:fa.length}),wn=e=>e===te?`Ordenador (${e} px)`:`Móvil (${e} px)`,Ft=e=>`<span class="dots" aria-label="Dificultad ${e} de 4">${[1,2,3,4].map(a=>`<i class="${a<=e?"is-on":""}"></i>`).join("")}</span>`;function bl(e){return e.innerHTML=`
    <div class="sheet">
      <header class="topbar">
        <a class="btn btn--small" href="#/mapa">Mapa</a>
        <h1 class="topbar__title">Maquetas: de la imagen a la web</h1>
      </header>
      <p class="lead">Como en el examen: te dan la imagen de la web terminada y lo que pide el cliente. Primero dibuja sus cajas (qué etiqueta es cada zona y si va con flex o con grid) y después cálcala: escribe la web y compárala con la imagen hasta que se parezcan.</p>
      <ol class="mockups">
        ${fa.map(a=>{const n=Rn(a.id),t=Te(ml(a.id)+"/nota");return`
          <li class="mockup">
            <img class="mockup__thumb" src="${Va(a.id,te)}" alt="" loading="lazy">
            <div class="mockup__body">
              <p class="mockup__meta">${Ft(a.level)} ${a.minutes} min${a.widths.length>1?" · con móvil":""}</p>
              <h2 class="mockup__title">${R(a.title)}</h2>
              <p class="mockup__score">${t?`Cajas: ${t} %`:"Cajas: sin hacer"} · ${n?`Parecido: ${n} %`:"Sin calcar"}</p>
              <div class="actions">
                <a class="btn btn--small" href="#/maqueta/${a.id}/cajas">1. Dibuja las cajas</a>
                <a class="btn btn--small btn--main" href="#/maqueta/${a.id}">2. Cálcala</a>
              </div>
            </div>
          </li>`}).join("")}
      </ol>
    </div>`,()=>{}}async function gl(e,a,n){const t=[];for(const o of e.widths){const l=n[o]||800,[s,r]=await Promise.all([ya(e.solution,o,l),ya(a,o,l)]);t.push({width:o,...cl(nt(s.doc),nt(r.doc))}),s.remove(),r.remove()}return t}function fl(e){return Promise.all(e.widths.map(a=>new Promise(n=>{const t=new Image;t.onload=()=>n([a,t.naturalHeight]),t.onerror=()=>n([a,800]),t.src=Va(e.id,a)}))).then(a=>Object.fromEntries(a))}function yl(e,a){const n=fa.find(C=>C.id===a);if(!n)return location.hash="#/maquetas",()=>{};const t=qn(n.id);let o=n.widths[0],l=null,s;const r=fl(n);e.innerHTML=`
    <div class="sheet sheet--wide trace">
      <header class="topbar">
        <a class="btn btn--small" href="#/maquetas">Maquetas</a>
        <h1 class="topbar__title">${R(n.title)}</h1>
      </header>
      <p class="challenge__meta">${Ft(n.level)} Tiempo propuesto: ${n.minutes} min · <a href="#/maqueta/${n.id}/cajas">Dibujar sus cajas</a></p>
      <section class="panel brief" aria-labelledby="t-brief">
        <h2 class="panel__title" id="t-brief">Lo que pide el cliente</h2>
        ${ke(n.brief)}
        <div class="trace__colors" hidden>
          <h3 class="trace__sub">Los colores que te dan</h3>
          <ul class="model__colors">${Bo(n).map(([C,S])=>`<li><span class="model__swatch" style="background:${S}"></span><code>${S}</code> <span class="hint">${R(C)}</span></li>`).join("")}</ul>
        </div>
      </section>
      <label class="trace__paper"><input type="checkbox" data-paper> Modo papel, como el examen: la imagen sola, sin cuentagotas, regla ni superponer hasta que compares, y con los colores dados</label>
      <div class="actions">
        <button class="btn" type="button" data-clock>Empezar el reloj (${n.minutes} min)</button>
        <span class="timer" hidden></span>
      </div>
      ${n.widths.length>1?`<div class="trace__widths" role="group" aria-label="Qué imagen ver">${n.widths.map((C,S)=>`<button class="btn btn--small" type="button" data-width="${C}" aria-pressed="${S===0}">${wn(C)}</button>`).join("")}</div>`:""}
      <div data-viewer></div>
      <h2 class="section-title">Tu web</h2>
      <div data-editor></div>
      <div class="actions">
        <button class="btn btn--main" type="button" data-compare>Comparar con la imagen</button>
      </div>
      <div class="trace__result" aria-live="polite"></div>
    </div>`;const c=ja(e.querySelector("[data-editor]"),{files:Qa(t)??Io(n),onChange:C=>{Je(t,C),d(C)}});let i;const d=C=>{clearTimeout(i),i=setTimeout(()=>l?.setFiles(C),500)};let m=Te(tt)==="1",y=!1;const g=e.querySelector("[data-paper]");g.checked=m;function v(){l?.destroy();const C=m&&!y;l=Ot(e.querySelector("[data-viewer]"),{image:Va(n.id,o),width:o,...C?{modes:["image","page"],noTools:!0}:{}}),l.ready.then(()=>l?.setFiles(c.files())),e.querySelector(".trace__colors").hidden=!m}v(),g.addEventListener("change",()=>{m=g.checked,Me(tt,m?"1":""),v()}),e.querySelector(".trace__widths")?.addEventListener("click",C=>{const S=C.target.closest("[data-width]");S&&(o=Number(S.dataset.width),e.querySelectorAll("[data-width]").forEach(L=>L.setAttribute("aria-pressed",String(L===S))),v())});const k=e.querySelector("[data-clock]"),_=e.querySelector(".timer");function M(C){const S=n.minutes*60-Math.floor((Date.now()-C)/1e3),L=Math.abs(S);_.textContent=`${S<0?"−":""}${Math.floor(L/60)}:${String(L%60).padStart(2,"0")}`,_.classList.toggle("is-low",S<300)}function T(C){_.hidden=!1,k.textContent="Parar el reloj",M(C),s=setInterval(()=>M(C),1e3)}const q=Number(Te(`${t}/reloj`)??"");q&&T(q),k.addEventListener("click",()=>{if(s){clearInterval(s),s=void 0,_.hidden=!0,k.textContent=`Empezar el reloj (${n.minutes} min)`,Me(`${t}/reloj`,"");return}const C=Date.now();Me(`${t}/reloj`,String(C)),T(C)});const E=e.querySelector(".trace__result"),A=e.querySelector("[data-compare]");return A.addEventListener("click",async()=>{A.disabled=!0,A.textContent="Comparando…";try{const C=c.files(),[S,L]=await Promise.all([r.then(j=>gl(n,C,j)),c.page().then(j=>Nt(j,n.checks))]),D=Math.round(S.reduce((j,h)=>j+h.score,0)/S.length);D>Rn(n.id)&&Me(Bt(n.id),String(D));const $=L.filter(Boolean).length;E.innerHTML=`
        <section class="panel" aria-labelledby="t-res">
          <h2 class="panel__title" id="t-res">Cómo se parece</h2>
          <div class="scores">
            ${S.map(j=>`<p class="score"><span class="score__n">${j.score} %</span><span class="score__label">${wn(j.width)} · ${j.found} de ${j.total} textos e imágenes encontrados</span></p>`).join("")}
            <p class="score"><span class="score__n">${$}/${L.length}</span><span class="score__label">Peticiones del cliente</span></p>
          </div>
          ${S.map(j=>xl(j,S.length>1)).join("")}
          <h3 class="trace__sub">Peticiones</h3>
          <ul class="checks">${n.checks.map((j,h)=>`<li class="check ${L[h]?"is-ok":"is-bad"}"><span class="check__mark" aria-hidden="true">${L[h]?"✓":"✗"}</span><span>${W(j.label)}${!L[h]&&j.hint?`<span class="check__hint">${W(j.hint)}</span>`:""}</span></li>`).join("")}</ul>
          <details class="solution">
            <summary>Ver una solución</summary>
            <p class="hint">Es una forma de hacerla; vale cualquier otra que se vea igual y cumpla las peticiones.</p>
            ${ea(n.solution)}
          </details>
        </section>`,m&&!y&&(y=!0,v(),E.querySelector(".scores").insertAdjacentHTML("afterend",'<p class="hint">Ya has comparado: arriba tienes otra vez el cuentagotas, la regla y superponer para afinar.</p>')),E.scrollIntoView({behavior:"smooth",block:"start"})}finally{A.disabled=!1,A.textContent="Comparar con la imagen"}}),()=>{clearTimeout(i),clearInterval(s),l?.destroy(),c.destroy()}}function xl(e,a){const n=e.differences.slice(0,10).sort((o,l)=>o.y-l.y),t=a?`<h3 class="trace__sub">${wn(e.width)}</h3>`:"";return n.length?`${t}
    <p class="hint">Lo que más se nota, de arriba abajo. Arregla primero lo de arriba: si algo mide distinto, todo lo de debajo se mueve.</p>
    <ol class="diffs">${n.map(o=>`<li>${R(o.msg)}</li>`).join("")}</ol>
    ${e.differences.length>n.length?`<p class="hint">Y ${e.differences.length-n.length} diferencias más pequeñas.</p>`:""}`:`${t}<p class="feedback__title feedback__title--ok">¡No se nota ninguna diferencia!</p>`}const Ra=e=>`maqueta/${e}/cajas`;async function vl(e,a){const n=await ya(e.solution,te,a),t=e.zones.flatMap(o=>[...n.doc.querySelectorAll(o.sel)].map(l=>{const s=l.getBoundingClientRect();return{x:s.left,y:s.top,w:s.width,h:s.height,tags:o.tags,layouts:o.layouts??["none","column"]}}));return n.remove(),t}function ql(e,a){return e.y<20&&e.h<a*.25?"header":e.y+e.h>a-20&&e.h<a*.25?"footer":"section"}function wl(e){try{const a=JSON.parse(Te(Ra(e))??"[]");return Array.isArray(a)?a:[]}catch{return[]}}function jl(e,a){const n=fa.find($=>$.id===a);if(!n)return location.hash="#/maquetas",()=>{};let t=wl(n.id),o=t.length-1,l=null,s=!1,r=[],c=0;e.innerHTML=`
    <div class="sheet sheet--wide">
      <header class="topbar">
        <a class="btn btn--small" href="#/maquetas">Maquetas</a>
        <h1 class="topbar__title">Las cajas de ${R(n.title)}</h1>
      </header>
      <div class="boxes">
        <div class="boxes__image" data-viewer></div>
        <div class="boxes__side">
          <section class="panel" aria-labelledby="b-how">
            <h2 class="panel__title" id="b-how">Cómo se hace</h2>
            <ol class="boxes__how">
              <li>Arrastra sobre la imagen para marcar cada zona: la cabecera, el menú, el contenido, cada tarjeta, el pie… También las que van dentro de otras.</li>
              <li>Ponle a cada una su etiqueta y cómo van sus hijos: uno debajo de otro, en fila (flex) o en columnas (grid).</li>
              <li>Corrige y, cuando esté bien, llévate el esqueleto al editor.</li>
            </ol>
          </section>
          <h2 class="section-title">Tus cajas</h2>
          <ol class="boxes__list"></ol>
          <div class="actions">
            <button class="btn btn--main" type="button" data-grade>Corregir</button>
            <button class="btn" type="button" data-target aria-pressed="false">Ver el plano bueno</button>
            <button class="btn" type="button" data-clear>Borrarlas todas</button>
          </div>
          <div class="boxes__result" aria-live="polite"></div>
          <div class="boxes__code"></div>
        </div>
      </div>
    </div>`;const i=Ot(e.querySelector("[data-viewer]"),{image:Va(n.id,te),width:te,modes:["image"],noTools:!0}),d=i.layer,m=e.querySelector(".boxes__list"),y=e.querySelector(".boxes__result"),g=e.querySelector(".boxes__code"),v=i.ready.then(async({height:$})=>{c=$,r=await vl(n,$)});function k(){Me(Ra(n.id),JSON.stringify(t))}const _=$=>No.map(j=>`<option ${j===$?"selected":""}>${j}</option>`).join(""),M=$=>Object.keys(Ea).map(j=>`<option value="${j}" ${j===$?"selected":""}>${Ea[j]}</option>`).join(""),T={none:"",row:" · fila",grid:" · grid",column:" · columna"};function q(){const $=l,j=h=>{if(!$)return"";const f=$.zones.find(w=>w.box===h);return f?f.tagOk&&f.layoutOk?" is-ok":" is-half":" is-extra"};d.innerHTML=t.map((h,f)=>`<div class="zbox${f===o?" is-selected":""}${j(f)}" style="left:${h.x}px;top:${h.y}px;width:${h.w}px;height:${h.h}px"><span>${f+1}. ${h.tag}${T[h.layout]}</span></div>`).join("")+(s?r.map((h,f)=>{const w=$?.zones[f];return`<div class="zbox zbox--target${w?w.box===null?" is-missing":w.tagOk&&w.layoutOk?" is-ok":" is-half":""}" style="left:${h.x}px;top:${h.y}px;width:${h.w}px;height:${h.h}px"><span>${h.tags[0]}${T[h.layouts[0]]}</span></div>`}).join(""):""),m.innerHTML=t.length?t.map((h,f)=>`
        <li class="boxes__item${f===o?" is-selected":""}" data-k="${f}">
          <button class="boxes__n" type="button" data-pick="${f}" aria-label="Elegir la caja ${f+1}">${f+1}</button>
          <label><span class="sr-only">Etiqueta de la caja ${f+1}</span><select data-tag="${f}">${_(h.tag)}</select></label>
          <label><span class="sr-only">Cómo van sus hijos</span><select data-layout="${f}">${M(h.layout)}</select></label>
          <button class="btn btn--small" type="button" data-del="${f}" aria-label="Borrar la caja ${f+1}">Borrar</button>
        </li>`).join(""):'<li class="hint">Aún no hay cajas: arrastra sobre la imagen.</li>'}function E(){l=null,y.innerHTML="",g.innerHTML="",k(),q()}let A=null,C=null;const S=($,j)=>({x:Math.min($.x,j.x),y:Math.min($.y,j.y),w:Math.abs(j.x-$.x),h:Math.abs(j.y-$.y)});d.addEventListener("pointerdown",$=>{A=i.toImage($.clientX,$.clientY),d.setPointerCapture($.pointerId),C=document.createElement("div"),C.className="zbox is-drawing",d.append(C),$.preventDefault()}),d.addEventListener("pointermove",$=>{if(!A||!C)return;const j=S(A,i.toImage($.clientX,$.clientY));Object.assign(C.style,{left:`${j.x}px`,top:`${j.y}px`,width:`${j.w}px`,height:`${j.h}px`})}),d.addEventListener("pointerup",$=>{if(!A)return;const j=i.toImage($.clientX,$.clientY),h=S(A,j);if(A=null,C?.remove(),C=null,h.w>=12&&h.h>=12){t=[...t,{...h,tag:ql(h,c),layout:"none"}],o=t.length-1,E(),m.querySelector(`[data-tag="${o}"]`)?.focus({preventScroll:!0});return}const f=t.map((w,P)=>({b:w,k:P})).filter(({b:w})=>j.x>=w.x&&j.x<=w.x+w.w&&j.y>=w.y&&j.y<=w.y+w.h);f.sort((w,P)=>w.b.w*w.b.h-P.b.w*P.b.h),f.length&&(o=f[0].k,q())}),m.addEventListener("change",$=>{const j=$.target,h=Number(j.dataset.tag??j.dataset.layout);Number.isNaN(h)||!t[h]||(t=t.map((f,w)=>w!==h?f:j.dataset.tag!==void 0?{...f,tag:j.value}:{...f,layout:j.value}),o=h,E())}),m.addEventListener("click",$=>{const j=$.target.closest("[data-del], [data-pick]");j&&(j.dataset.del!==void 0?(t=t.filter((h,f)=>f!==Number(j.dataset.del)),o=Math.min(o,t.length-1),E()):(o=Number(j.dataset.pick),q()))});const L=e.querySelector("[data-clear]");L.addEventListener("click",()=>{if(!L.dataset.sure){L.dataset.sure="1",L.textContent="Pulsa otra vez para borrarlas";return}delete L.dataset.sure,L.textContent="Borrarlas todas",t=[],o=-1,E()});const D=e.querySelector("[data-target]");return D.addEventListener("click",async()=>{await v,s=!s,D.setAttribute("aria-pressed",String(s)),D.textContent=s?"Ocultar el plano bueno":"Ver el plano bueno",q()}),e.querySelector("[data-grade]").addEventListener("click",async()=>{await v,l=Go(r,t),Me(`${Ra(n.id)}/nota`,String(Math.max(l.score,Number(Te(`${Ra(n.id)}/nota`)??"")||0)));const $=l.zones.map(h=>({r:h,y:h.zone.y})).sort((h,f)=>h.y-f.y).map(({r:h})=>{const f=`<code>${h.zone.tags[0]}</code>, ${R(Ea[h.zone.layouts[0]].toLowerCase())}`;if(h.box===null)return`<li class="check is-bad"><span class="check__mark">✗</span><span>Falta una caja: <code>${h.zone.tags[0]}</code>, de ${Math.round(h.zone.w)}×${Math.round(h.zone.h)} px. Pulsa «Ver el plano bueno» para ver dónde.</span></li>`;const w=t[h.box],P=[];return h.tagOk||P.push(`la etiqueta es <code>${h.zone.tags.join("</code> o <code>")}</code>, no <code>${w.tag}</code>`),h.layoutOk||P.push(`lo de dentro va ${h.zone.layouts.map(U=>Ea[U].toLowerCase()).join(" o ")}`),`<li class="check ${P.length?"is-bad":"is-ok"}"><span class="check__mark">${P.length?"✗":"✓"}</span><span>Caja ${h.box+1}: ${P.length?P.join("; "):f}</span></li>`}).join("");y.innerHTML=`
      <p class="score"><span class="score__n">${l.score} %</span><span class="score__label">${l.zones.filter(h=>h.box!==null).length} de ${l.zones.length} zonas encontradas</span></p>
      <ul class="checks">${$}</ul>
      ${l.extra.length?`<p class="hint">Las cajas ${l.extra.map(h=>h+1).join(", ")} no coinciden con ninguna zona: revisa que lleguen justo a los bordes de su zona (o sobran).</p>`:""}`;const j=Ko(t);g.innerHTML=`
      <h2 class="section-title">El esqueleto de tu plano</h2>
      ${ea({html:j.body.replace(/^ {4}/gm,""),css:j.css||"/* Ninguna caja va en fila ni en columnas */"})}
      <div class="actions"><button class="btn btn--main" type="button" data-take>Llevarlo al editor y calcarla</button></div>`,g.querySelector("[data-take]").addEventListener("click",h=>{const f=h.currentTarget;if(Qa(qn(n.id))&&!f.dataset.sure){f.dataset.sure="1",f.textContent="Ya tenías código: pulsa otra vez para cambiarlo por este";return}Je(qn(n.id),{html:H(n.title,j.body),css:j.css?`${j.css}
`:""}),location.hash=`#/maqueta/${n.id}`}),q()}),q(),()=>i.destroy()}const ee=e=>e[Math.floor(Math.random()*e.length)];function an(e,a,n){const t=e.filter(o=>o!==n).sort(()=>Math.random()-.5);return[n,...t.slice(0,a-1)].sort(()=>Math.random()-.5)}const Se=["#2563eb","#db2777","#059669","#d97706","#7c3aed"],Sl=["#dbeafe","#fce7f3","#d1fae5","#fef3c7","#ede9fe"],nn=(e,a="")=>Array.from({length:e},(n,t)=>`<div class="i"${a}>${t+1}</div>`).join(""),Yt={padding(){const e=ee([5,10,20,40]),a=Math.floor(Math.random()*Se.length);return{type:"padding",question:"¿Cuánto relleno (`padding`) tiene la caja de color, por los cuatro lados?",html:'<div class="caja"><span>Texto</span></div>',css:`.caja { display: inline-block; padding: ${e}px; background: ${Sl[a]}; border: 2px solid ${Se[a]}; } .caja span { background: #fff; outline: 1px dashed #999; }`,options:["5px","10px","20px","40px"],answer:`${e}px`,code:`padding: ${e}px;`,tip:"El relleno es el hueco entre el borde y el contenido (la parte blanca). Compáralo con la regla: la regla mide 50px."}},gap(){const e=ee([0,10,20,40]);return{type:"gap",question:"¿Cuánto hueco (`gap`) hay entre las cajas?",html:`<div class="fila">${nn(3)}</div>`,css:`.fila { display: flex; gap: ${e}px; } .i { width: 60px; height: 60px; background: ${ee(Se)}; color: #fff; display: grid; place-items: center; font: 600 18px sans-serif; }`,options:["0","10px","20px","40px"],answer:e?`${e}px`:"0",code:`gap: ${e?`${e}px`:0};`,tip:"Cada caja mide 60px de ancho. La regla mide 50px: 10px es una quinta parte de la regla."}},font(){const e=an([12,16,24,32,48],4,ee([12,16,24,32,48])),a=ee(e);return{type:"font",question:"¿De qué tamaño es la letra del título?",html:'<p class="t">Hola</p><p class="ref">Este texto es de 16px</p>',css:`.t { margin: 0 0 6px; font: 600 ${a}px Arial, sans-serif; } .ref { margin: 0; font: 16px Arial, sans-serif; color: #777; }`,options:e.map(n=>`${n}px`),answer:`${a}px`,code:`font-size: ${a}px;`,tip:"Compáralo con el texto gris, que es de 16px (lo normal de un párrafo). Un h1 suele ir de 32px."}},radius(){const e=["0","8px","20px","50%"],a=ee(e);return{type:"radius",question:"¿Qué `border-radius` tiene?",html:'<div class="b"></div>',css:`.b { width: 100px; height: 100px; background: ${ee(Se)}; border-radius: ${a}; }`,options:e,answer:a,code:`border-radius: ${a};`,tip:"0: esquinas en punta. 8px: un poco redondeadas. 20px: muy redondeadas. 50%: un círculo (si es cuadrada)."}},border(){const e=ee([1,3,6,10]);return{type:"border",question:"¿Qué grosor tiene el borde?",html:'<div class="b">Caja</div>',css:`.b { display: inline-block; padding: 16px 24px; border: ${e}px solid ${ee(Se)}; font: 16px Arial, sans-serif; }`,options:["1px","3px","6px","10px"],answer:`${e}px`,code:`border: ${e}px solid;`,tip:"1px es una raya finita; 10px es una quinta parte de la regla."}},width(){const e=ee(["25%","50%","75%","100%"]);return{type:"width",question:"La caja de color está dentro de la caja con raya. ¿Qué ancho (`width`) tiene?",html:'<div class="p"><div class="h">Caja</div></div>',css:`.p { border: 2px dashed #999; padding: 0; } .h { width: ${e}; background: ${ee(Se)}; color: #fff; padding: 10px 0; text-align: center; font: 600 15px sans-serif; }`,options:["25%","50%","75%","100%"],answer:e,code:`width: ${e};`,tip:"El porcentaje es de la caja de fuera: la mitad es 50%; una cuarta parte, 25%."}},justify(){const e=["flex-start","flex-end","center","space-between","space-around","space-evenly"],a=ee(e);return{type:"justify",question:"¿Qué `justify-content` tiene la fila?",html:`<div class="fila">${nn(3)}</div>`,css:`.fila { display: flex; justify-content: ${a}; border: 2px dashed #999; } .i { width: 50px; height: 50px; background: ${ee(Se)}; color: #fff; display: grid; place-items: center; font: 600 16px sans-serif; }`,options:an(e,4,a),answer:a,code:`justify-content: ${a};`,tip:"Mira los huecos de los bordes: nada (space-between), la mitad que entre medias (space-around) o lo mismo (space-evenly)."}},align(){const e=["flex-start","center","flex-end","stretch"],a=ee(e);return{type:"align",question:"¿Qué `align-items` tiene la fila? (las cajas no tienen alto puesto)",html:'<div class="fila"><div class="i">1</div><div class="i">2<br>2</div><div class="i">3</div></div>',css:`.fila { display: flex; gap: 10px; height: 140px; align-items: ${a}; border: 2px dashed #999; } .i { width: 50px; background: ${ee(Se)}; color: #fff; text-align: center; padding: 6px 0; font: 600 16px sans-serif; }`,options:e,answer:a,code:`align-items: ${a};`,tip:"stretch (lo que hay si no se pone nada) estira las cajas de arriba abajo."}},columns(){const e=["1fr 1fr 1fr","2fr 1fr","1fr 2fr","150px 1fr","repeat(4, 1fr)","1fr 1fr"],a=ee(e);return{type:"columns",question:"¿Qué `grid-template-columns` tiene la rejilla?",html:`<div class="g">${nn(4)}</div>`,css:`.g { display: grid; grid-template-columns: ${a}; gap: 8px; } .i { height: 44px; background: ${ee(Se)}; color: #fff; display: grid; place-items: center; font: 600 16px sans-serif; }`,options:an(e,4,a),answer:a,code:`grid-template-columns: ${a};`,tip:"Cuenta cuántas cajas caben en la primera fila y compara sus anchos: si una es el doble que otra, 2fr y 1fr."}}},El=Object.keys(Yt);function Cl(e=10){const a=[];for(;a.length<e;){const n=ee(El.filter(t=>t!==a[a.length-1]?.type));a.push(Yt[n]())}return a}const Gt="ojo/mejor",jn=()=>Number(Te(Gt)??"")||0,kl='<div class="regla" aria-hidden="true"><span></span>50px</div>',$l=":host { display: block; } .escena { padding: 16px; background: #fff; color: #222; } .regla { display: flex; align-items: center; gap: 6px; margin-top: 16px; font: 12px sans-serif; color: #b91c1c; } .regla span { width: 50px; height: 8px; border: 2px solid #b91c1c; border-top: 0; }";function Ll(e){let a=[],n=0,t=0;e.innerHTML=`
    <div class="sheet eye">
      <header class="topbar">
        <a class="btn btn--small" href="#/mapa">Mapa</a>
        <h1 class="topbar__title">Retos de ojo</h1>
      </header>
      <p class="lead">Mira y di qué CSS lo hace, como cuando lees la imagen del examen. Usa la regla roja de 50px para comparar tamaños.</p>
      <p class="eye__count" aria-live="polite"></p>
      <div class="eye__body"></div>
    </div>`;const o=e.querySelector(".eye__body"),l=e.querySelector(".eye__count");function s(){a=Cl(),n=0,t=0,r()}function r(){const i=a[n];l.textContent=`Pregunta ${n+1} de ${a.length} · ${t} bien`;const d=Re(i.options);o.innerHTML=`
      <p class="challenge__ask">${W(i.question)}</p>
      <div class="eye__scene"></div>
      <div class="choices">${d.map((y,g)=>`<button class="choice" type="button" data-k="${g}"><code>${y}</code></button>`).join("")}</div>
      <div class="feedback" aria-live="polite"></div>`;const m=o.querySelector(".eye__scene").attachShadow({mode:"open"});m.innerHTML=`<style>${$l} ${i.css}</style><div class="escena">${i.html}${kl}</div>`,o.querySelector(".choices").addEventListener("click",y=>{const g=y.target.closest(".choice");if(!g||g.disabled)return;const v=d[Number(g.dataset.k)]===i.answer;v&&t++,o.querySelectorAll(".choice").forEach(M=>{M.disabled=!0,d[Number(M.dataset.k)]===i.answer&&M.classList.add("is-right")}),v||g.classList.add("is-wrong");const k=n===a.length-1;o.querySelector(".feedback").innerHTML=`
        <p class="feedback__title feedback__title--${v?"ok":"bad"}">${v?"¡Bien visto!":`No: es ${i.answer}`}</p>
        <pre class="eye__code"><code>${$e(i.code)}</code></pre>
        <p>${W(i.tip)}</p>
        <div class="actions"><button class="btn btn--main" type="button" data-next>${k?"Ver cómo ha ido":"Siguiente"}</button></div>`,l.textContent=`Pregunta ${n+1} de ${a.length} · ${t} bien`;const _=o.querySelector("[data-next]");_.focus({preventScroll:!0}),_.addEventListener("click",()=>{k?c():(n++,r())})})}function c(){const i=jn();t>i&&Me(Gt,String(t)),l.textContent="",o.innerHTML=`
      <section class="panel">
        <p class="score"><span class="score__n">${t}/${a.length}</span><span class="score__label">${t>i?"¡Tu mejor ronda!":`Tu mejor ronda: ${i}/${a.length}`}</span></p>
        <p>${t>=8?"Tienes buen ojo: en el examen, con el papel delante, compara cada medida con la letra normal de 16px.":"Repite unas rondas: el ojo se entrena. En el examen la web viene en papel: mira la lección «Colores dados y medidas a ojo» del mundo 10."}</p>
        <div class="actions"><button class="btn btn--main" type="button" data-again>Otra ronda</button><a class="btn" href="#/mapa">Volver al mapa</a></div>
      </section>`,o.querySelector("[data-again]").addEventListener("click",s)}return s(),()=>{}}const _l=e=>[...new Set(e.solution.pages.flatMap(a=>[...a.html.matchAll(/src="(img\/[^"]+)"/g)].map(n=>n[1])))],ot={pages:[{name:"index.html",html:""}],css:""};function Un(e,a,n,t,o){const l=n.map(([s,r])=>`        <li><a href="${s}">${r}</a></li>`).join(`
`);return H(e,`    <header>
${a}
    </header>
    <nav>
      <ul>
${l}
      </ul>
    </nav>
    <main>
${t}
    </main>
    <footer>
${o}
    </footer>`)}const Nn='      <p>Licencia <a href="https://creativecommons.org/licenses/by-sa/4.0/deed.es">Creative Commons BY-SA 4.0</a></p>',Ml=[["index.html","Inicio"],["productos.html","Productos"],["contacto.html","Contacto"]],zl=`      <img src="img/logo.svg" alt="Logo de La Espiga" class="logo">
      <h1>Panadería La Espiga</h1>`,Tl=`      <p>© 2026 Panadería La Espiga</p>
${Nn}`,tn=(e,a)=>Un(e,zl,Ml,a,Tl),Al={id:"panaderia",title:"La panadería (3 páginas)",minutes:90,brief:p("**Panadería La Espiga** quiere una web de tres páginas como la del modelo: `index.html` (Inicio), `productos.html` (Productos) y `contacto.html` (Contacto), con `estilos.css` y las imágenes en la carpeta `img/`.","","En el móvil, el menú y las tarjetas de productos van uno debajo de otro."),colors:[["Cabecera (letras blancas)","#8b4513"],["Fondo de la página","#fff8ee"],["Menú","#f4e1c1"],["Pie (letras blancas)","#3e2723"]],content:`TODAS LAS PÁGINAS
Panadería La Espiga
Menú: Inicio · Productos · Contacto
Pie: © 2026 Panadería La Espiga
Licencia Creative Commons BY-SA 4.0

INICIO
Bienvenidos
Hacemos pan cada mañana desde 1985.

PRODUCTOS
Productos
Tarta de queso - 18 €
Galletas de mantequilla - 6 €
Cruasanes - 1,20 €

CONTACTO
Contacto
Calle Mayor 5, Bilbao
Teléfono: 944 123 456
`,solution:{pages:[{name:"index.html",html:tn("Inicio · La Espiga",`      <section class="bienvenida">
        <h2>Bienvenidos</h2>
        <p>Hacemos pan cada mañana desde 1985.</p>
      </section>`)},{name:"productos.html",html:tn("Productos · La Espiga",`      <h2>Productos</h2>
      <div class="tarjetas">
        <article class="tarjeta">
          <img src="img/tarta.svg" alt="Tarta de queso">
          <h3>Tarta de queso</h3>
          <p class="precio">18 €</p>
        </article>
        <article class="tarjeta">
          <img src="img/galletas.svg" alt="Galletas de mantequilla">
          <h3>Galletas de mantequilla</h3>
          <p class="precio">6 €</p>
        </article>
        <article class="tarjeta">
          <img src="img/cruasan.svg" alt="Cruasanes">
          <h3>Cruasanes</h3>
          <p class="precio">1,20 €</p>
        </article>
      </div>`)},{name:"contacto.html",html:tn("Contacto · La Espiga",`      <h2>Contacto</h2>
      <p>Calle Mayor 5, Bilbao</p>
      <p>Teléfono: <a href="tel:944123456">944 123 456</a></p>`)}],css:`body {
  margin: 0;
  font-family: sans-serif;
  background-color: #fff8ee;
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}

header {
  display: flex;
  align-items: center;
  gap: 16px;
  padding: 16px;
  background-color: #8b4513;
  color: white;
}

.logo {
  width: 60px;
}

nav {
  background-color: #f4e1c1;
}

nav ul {
  display: flex;
  justify-content: center;
  gap: 24px;
  margin: 0;
  padding: 12px;
  list-style: none;
}

main {
  flex: 1;
  padding: 16px;
}

.tarjetas {
  display: flex;
  gap: 16px;
}

.tarjeta {
  flex: 1;
  padding: 16px;
  background-color: white;
  text-align: center;
}

.tarjeta img {
  max-width: 100%;
}

footer {
  padding: 16px;
  background-color: #3e2723;
  color: white;
  text-align: center;
}

footer a {
  color: white;
}

@media (max-width: 600px) {
  nav ul {
    flex-direction: column;
    align-items: center;
    gap: 8px;
  }

  .tarjetas {
    flex-direction: column;
  }
}
`}},Pl=[["index.html","El club"],["salidas.html","Salidas"],["socios.html","Hazte socio"]],Hl=`      <h1>Club ciclista Pedalea</h1>
      <p class="lema">Rodamos juntos desde 2001</p>`,Dl=`      <p>Club ciclista Pedalea · Durango</p>
${Nn}`,on=(e,a)=>Un(e,Hl,Pl,a,Dl),Rl={id:"club",title:"El club ciclista (3 páginas)",minutes:120,brief:p("El **Club ciclista Pedalea** quiere una web de tres páginas como la del modelo: `index.html` (El club), `salidas.html` (Salidas) y `socios.html` (Hazte socio), con `estilos.css` y la foto en `img/`.","","En el móvil, el menú va uno debajo de otro y en la portada la foto va encima del texto."),colors:[["Cabecera y pie (letras blancas)","#1b5e20"],["Menú","#a5d6a7"],["Enlaces del menú y bordes de la tabla","#1b5e20"]],content:`TODAS LAS PÁGINAS
Club ciclista Pedalea
Rodamos juntos desde 2001
Menú: El club · Salidas · Hazte socio
Pie: Club ciclista Pedalea · Durango
Licencia Creative Commons BY-SA 4.0

EL CLUB
El club
Somos un club de Durango que sale en bici cada domingo. Hay rutas para todos los niveles.

SALIDAS
Salidas de abril
Fecha | Ruta | Km
5 de abril | Vuelta al pantano | 45
12 de abril | Puerto de la Sierra | 80
19 de abril | Ruta de los molinos | 60

HAZTE SOCIO
Hazte socio
Nombre
Correo
Botón: Enviar
`,solution:{pages:[{name:"index.html",html:on("El club · Pedalea",`      <section class="presentacion">
        <img src="img/bici.svg" alt="Bicicleta de carretera">
        <div class="texto">
          <h2>El club</h2>
          <p>Somos un club de Durango que sale en bici cada domingo. Hay rutas para todos los niveles.</p>
        </div>
      </section>`)},{name:"salidas.html",html:on("Salidas · Pedalea",`      <h2>Salidas de abril</h2>
      <table>
        <tr>
          <th>Fecha</th>
          <th>Ruta</th>
          <th>Km</th>
        </tr>
        <tr>
          <td>5 de abril</td>
          <td>Vuelta al pantano</td>
          <td>45</td>
        </tr>
        <tr>
          <td>12 de abril</td>
          <td>Puerto de la Sierra</td>
          <td>80</td>
        </tr>
        <tr>
          <td>19 de abril</td>
          <td>Ruta de los molinos</td>
          <td>60</td>
        </tr>
      </table>`)},{name:"socios.html",html:on("Hazte socio · Pedalea",`      <h2>Hazte socio</h2>
      <form class="formulario">
        <label for="nombre">Nombre</label>
        <input type="text" id="nombre" name="nombre">
        <label for="correo">Correo</label>
        <input type="email" id="correo" name="correo">
        <button type="submit">Enviar</button>
      </form>`)}],css:`body {
  margin: 0;
  font-family: sans-serif;
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}

header,
footer {
  padding: 16px;
  background-color: #1b5e20;
  color: white;
  text-align: center;
}

footer a {
  color: white;
}

nav {
  background-color: #a5d6a7;
}

nav ul {
  display: flex;
  justify-content: space-around;
  margin: 0;
  padding: 12px;
  list-style: none;
}

nav a {
  color: #1b5e20;
  font-weight: bold;
}

main {
  flex: 1;
  padding: 16px;
}

.presentacion {
  display: flex;
  align-items: center;
  gap: 24px;
}

.presentacion img {
  width: 40%;
}

table {
  border-collapse: collapse;
}

th,
td {
  padding: 8px;
  border: 1px solid #1b5e20;
}

.formulario {
  display: flex;
  flex-direction: column;
  gap: 8px;
  max-width: 320px;
}

@media (max-width: 600px) {
  nav ul {
    flex-direction: column;
    align-items: center;
  }

  .presentacion {
    flex-direction: column;
  }

  .presentacion img {
    width: 100%;
  }
}
`}},Ul=[["index.html","Inicio"],["horario.html","Horario"],["tarifas.html","Tarifas"]],Nl="      <h1>Polideportivo Ibaialde</h1>",Il=`      <p>Polideportivo Ibaialde · Paseo del Río 3, Basauri</p>
${Nn}`,ln=(e,a)=>Un(e,Nl,Ul,a,Il),Sn=["Lunes","Martes","Miércoles","Jueves","Viernes","Sábado"],Qt=[["09:00",["Aquagym","Pilates","Aquagym","Pilates","Aquagym","Natación libre"]],["10:00",["Yoga","Natación","Yoga","Natación","Yoga","Pádel"]],["11:00",["Gimnasia +65","Spinning","Gimnasia +65","Spinning","Gimnasia +65","Pádel"]],["14:00 a 16:00",["Piscina libre"]],["17:00",["Natación infantil","Judo","Natación infantil","Judo","Natación infantil","Baloncesto"]],["18:00",["Baloncesto","Natación infantil","Baloncesto","Natación infantil","Patinaje","Fútbol sala"]],["19:00",["Spinning","Zumba","Spinning","Zumba","Body pump","Cerrado"]],["20:00",["Zumba","Body pump","Zumba","Body pump","Cerrado","Cerrado"]]],Wt=[["Piscina","15 €","25 €"],["Gimnasio","20 €","32 €"],["Actividades dirigidas","18 €","28 €"],["Todo incluido","35 €","55 €"]],Ol=()=>["      <h2>Horario</h2>",'      <div class="tabla">',"        <table>","          <caption>Actividades de septiembre a junio</caption>","          <thead>","            <tr>","              <th>Hora</th>",...Sn.map(e=>`              <th>${e}</th>`),"            </tr>","          </thead>","          <tbody>",...Qt.flatMap(([e,a])=>["            <tr>",`              <td class="hora">${e}</td>`,...a.length===1?[`              <td colspan="${Sn.length}">${a[0]}</td>`]:a.map(n=>`              <td>${n}</td>`),"            </tr>"]),"          </tbody>","        </table>","      </div>"].join(`
`),Bl=()=>["      <h2>Tarifas</h2>","      <table>","        <thead>","          <tr>",'            <th rowspan="2">Actividad</th>','            <th colspan="2">Precio al mes</th>',"          </tr>","          <tr>","            <th>Socios</th>","            <th>No socios</th>","          </tr>","        </thead>","        <tbody>",...Wt.flatMap(e=>["          <tr>",...e.map(a=>`            <td>${a}</td>`),"          </tr>"]),"        </tbody>","      </table>","      <p>La matrícula es gratis para los menores de 16 años.</p>"].join(`
`),Fl={id:"polideportivo",title:"El polideportivo (la tabla grande)",minutes:120,brief:p("El **Polideportivo Ibaialde** quiere una web de tres páginas como la del modelo: `index.html` (Inicio), `horario.html` (Horario) y `tarifas.html` (Tarifas), con `estilos.css` y la foto en `img/`.","","El horario es una tabla grande: la franja de 14:00 a 16:00 ocupa toda la semana en una sola celda. En las tarifas, «Precio al mes» abarca las dos columnas de precios y «Actividad» ocupa las dos filas de la cabecera.","","En el móvil, el menú va uno debajo de otro y el horario, que no cabe, se desliza de lado dentro de su caja sin mover la página."),colors:[["Cabecera y cabecera de las tablas (letras blancas)","#2a9d8f"],["Menú y filas pares de las tablas","#e9f5f3"],["Rayas de las tablas","#9fd3cb"],["Pie (letras blancas)","#264653"]],content:`TODAS LAS PÁGINAS
Polideportivo Ibaialde
Menú: Inicio · Horario · Tarifas
Pie: Polideportivo Ibaialde · Paseo del Río 3, Basauri
Licencia Creative Commons BY-SA 4.0

INICIO
Bienvenidos
Piscina, gimnasio y pistas junto al río, abiertos todo el año.
Abrimos de lunes a sábado, de 9:00 a 21:00.

HORARIO
Horario
Actividades de septiembre a junio
Hora | ${Sn.join(" | ")}
${Qt.map(([e,a])=>`${e} | ${a.length===1?`${a[0]} (toda la semana)`:a.join(" | ")}`).join(`
`)}

TARIFAS
Tarifas
Actividad | Precio al mes: Socios | No socios
${Wt.map(e=>e.join(" | ")).join(`
`)}
La matrícula es gratis para los menores de 16 años.
`,solution:{pages:[{name:"index.html",html:ln("Inicio · Ibaialde",`      <section class="bienvenida">
        <img src="img/portada.svg" alt="El río y los montes junto al polideportivo">
        <h2>Bienvenidos</h2>
        <p>Piscina, gimnasio y pistas junto al río, abiertos todo el año.</p>
        <p>Abrimos de lunes a sábado, de 9:00 a 21:00.</p>
      </section>`)},{name:"horario.html",html:ln("Horario · Ibaialde",Ol())},{name:"tarifas.html",html:ln("Tarifas · Ibaialde",Bl())}],css:`* {
  box-sizing: border-box;
}

body {
  margin: 0;
  font-family: sans-serif;
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}

header {
  padding: 16px;
  background-color: #2a9d8f;
  color: white;
}

nav {
  background-color: #e9f5f3;
}

nav ul {
  display: flex;
  gap: 24px;
  margin: 0;
  padding: 12px 16px;
  list-style: none;
}

main {
  flex: 1;
  padding: 16px;
}

.bienvenida img {
  width: 100%;
}

.tabla {
  overflow-x: auto;
}

table {
  border-collapse: collapse;
  width: 100%;
}

caption {
  padding: 8px;
  font-weight: bold;
}

th,
td {
  padding: 8px;
  border: 1px solid #9fd3cb;
  text-align: center;
}

th {
  background-color: #2a9d8f;
  color: white;
}

tbody tr:nth-child(even) {
  background-color: #e9f5f3;
}

.hora {
  font-weight: bold;
}

footer {
  padding: 16px;
  background-color: #264653;
  color: white;
  text-align: center;
}

footer a {
  color: white;
}

@media (max-width: 600px) {
  nav ul {
    flex-direction: column;
    align-items: center;
    gap: 8px;
  }

  .tabla table {
    min-width: 640px;
  }
}
`}},Vt=[Al,Rl,Fl],Yl=e=>Vt.find(a=>a.id===e),En=3,lt=1024,st=375,Ya=[{id:"paginas",label:`La página inicial se llama index.html y hay al menos ${En} páginas`,how:"Crea index.html y las demás páginas con nombres en minúscula y sin espacios ni tildes (productos.html, contacto.html)."},{id:"valida",label:"Todas las páginas son válidas (pasarían el validador del W3C)",how:'<!DOCTYPE html>, <html lang="es">, <meta charset="UTF-8">, <title>, cada etiqueta bien cerrada y en su sitio, alt en cada <img> y cada id una sola vez.'},{id:"bloques",label:"Cada página tiene al menos 4 bloques: cabecera, menú, contenido y pie",how:"<header>, <nav>, <main> (o <section>/<article>) y <footer> en cada página."},{id:"comunes",label:"La cabecera, el menú y el pie son comunes: iguales en todas las páginas",how:"Escribe el header, el nav y el footer en index.html y cópialos tal cual en las demás páginas."},{id:"enlaces",label:"El menú enlaza todas las páginas y cada enlace lleva a una que existe",how:'En el nav, un <a href="pagina.html"> por cada página, con el nombre del archivo letra a letra.'},{id:"licencia",label:"La licencia Creative Commons aparece en todas las páginas",how:"En el pie: «Licencia Creative Commons BY-SA 4.0» (o la que pidan), mejor como enlace a creativecommons.org."},{id:"carpetas",label:"Las imágenes están en una carpeta y sus nombres no dan problemas",how:'src="img/foto.jpg": dentro de una carpeta, en minúscula, sin espacios ni tildes ni ñ, con su extensión.'},{id:"flex",label:"Flexbox organiza el contenido de cada página",how:"display: flex en el body o en el contenedor de la página (o en el main, para poner sus bloques en fila)."},{id:"menu",label:"El menú se coloca con flexbox",how:"nav ul { display: flex; } (o nav { display: flex; }), con list-style: none y gap."},{id:"media",label:"El menú se adapta al tamaño de la pantalla con @media",how:"@media (max-width: 600px) { nav ul { flex-direction: column; } } al final del CSS."},{id:"externa",label:`Todos los estilos van en una hoja externa (${J}), sin <style> ni style=""`,how:`Cada página con <link rel="stylesheet" href="${J}"> en el <head>, y nada de estilos dentro del HTML.`},{id:"ordenado",label:"El código está bien tabulado y los id y clases tienen nombres que se entienden",how:"Lo que va dentro, dos espacios más a la derecha; cada cierre a la altura de su apertura; nombres como .tarjeta o #contacto, no .div1 o .a."},{id:"ortografia",label:"Los textos están bien escritos, sin faltas de ortografía",how:"Léelos despacio antes de entregar: tildes, mayúsculas al empezar y ¿? ¡! de apertura.",manual:!0}],Cn=e=>e.replace(/<!--[\s\S]*?-->/g,a=>a.replace(/[^\n]/g," ")),Ca=(e,a)=>e.slice(0,a).split(`
`).length,rt=/^[a-z0-9_-]+\.[a-z0-9]+$/;function it(e){const a=e.trim();if(!(!a||a.startsWith("#")||/^[a-z]+:/i.test(a)||a.startsWith("//")))return a.replace(/^\.\//,"").split("#")[0].split("?")[0]}function Gl(e){const a=e.querySelector("nav");return a?[...a.querySelectorAll("a")].map(n=>`${I(n.textContent??"")}→${(n.getAttribute("href")??"").trim()}`).join("|"):""}const sn=e=>I(e?.textContent??"");function Ql(e){const a=Cn(e).split(`
`),n=[],t=[],o=l=>/^[ \t]*/.exec(l)[0].replace(/\t/g,"  ").length;return a.forEach((l,s)=>{const r=l.trimEnd();if(!r.trim())return;const c=o(r),i=r.trim(),d=t[t.length-1];if(i.startsWith("</")){const v=/^<\/\s*([\w-]+)/.exec(i)?.[1]?.toLowerCase(),k=t.map(_=>_.name).lastIndexOf(v??"");if(k>=0){const _=t[k];_.line!==s&&c!==_.indent&&_.name!=="html"&&n.push(s+1),t.length=k}}else d&&d.line!==s&&d.name!=="html"&&c<=d.indent&&n.push(s+1);const m=/<(\/?)([a-zA-Z][\w-]*)\b[^>]*?(\/?)>/g;let y,g=!0;for(;y=m.exec(i);){const[,v,k,_]=y,M=k.toLowerCase();if(v){if(g&&y.index===0){g=!1;continue}const T=t.map(q=>q.name).lastIndexOf(M);T>=0&&(t.length=T)}else!_&&!Wl.has(M)&&M!=="style"&&M!=="script"&&t.push({name:M,indent:c,line:s});g=!1}}),n}const Wl=new Set(["area","base","br","col","embed","hr","img","input","link","meta","source","track","wbr","!doctype"]),Vl=e=>e.length<3||/^(div|caja|clase|class|bloque|cosa|elemento|id|seccion|section|parte|texto)?[-_]?\d+$/i.test(e)||/^[a-z]\d*$/i.test(e);function Kl(e){const a=e.trim().toLowerCase().normalize("NFD").replace(/[̀-ͯ]/g,"").replace(/\.html?$/,"").replace(/[^a-z0-9_-]+/g,"-").replace(/^-+|-+$/g,"");return a?`${a}.html`:""}async function Zl(e){const a=new Set(e.pages.map(c=>c.name)),n=new Map(Ya.map(c=>[c.id,[]])),t=(c,i)=>n.get(c).push(i);a.has("index.html")||t("paginas","No hay ninguna página que se llame index.html: es la que abre el navegador al entrar."),e.pages.length<En&&t("paginas",`Hay ${e.pages.length} página${e.pages.length===1?"":"s"}: piden al menos ${En}.`);for(const c of e.pages)(!rt.test(c.name)||!c.name.endsWith(".html"))&&t("paginas",`«${c.name}»: el nombre tiene que acabar en .html y no llevar mayúsculas, espacios ni tildes.`);const o=[];for(const c of e.pages){const i=Cn(c.html),d=S=>`${c.name}: ${S}`,m=_n(c.html).filter(S=>S.level==="error"||/sin alt|id «|no es una etiqueta/.test(S.msg));for(const S of m.slice(0,4))t("valida",d(`línea ${S.line}, ${S.msg}`));m.length>4&&t("valida",d(`y ${m.length-4} fallo${m.length-4===1?"":"s"} más.`)),/^\s*<!doctype\s+html\s*>/i.test(i)||t("valida",d("falta <!DOCTYPE html> en la primera línea."));const y=/<html\b[^>]*>/i.exec(i)?.[0];(!y||!Ia(y,"lang"))&&t("valida",d('falta el idioma: <html lang="es">.')),/<meta\b[^>]*charset/i.test(i)||t("valida",d('falta <meta charset="UTF-8"> en el <head>.')),/<title>\s*\S[\s\S]*?<\/title>/i.test(i)||t("valida",d("falta el <title> con el nombre de la página.")),(i.match(/<link\b[^>]*>/gi)??[]).filter(_t).length||t("externa",d(`no enlaza ${J}: falta <link rel="stylesheet" href="${J}"> en el <head>.`));const v=/<style[\s>]/i.exec(i);v&&t("externa",d(`línea ${Ca(i,v.index)}, hay una etiqueta <style>: esos estilos van en ${J}.`));const k=/<[a-z][^>]*\sstyle\s*=/gi;let _;for(;_=k.exec(i);)t("externa",d(`línea ${Ca(i,_.index)}, hay un atributo style="": ponle una clase y lleva el estilo a ${J}.`));const M=/<(img|source|video|audio)\b[^>]*>/gi;for(;_=M.exec(i);){const S=Ia(_[0],"src");if(!S||/^[a-z]+:/i.test(S))continue;const L=S.replace(/^\.\//,"").split("/");L.length<2?t("carpetas",d(`línea ${Ca(i,_.index)}, «${S}» no está en una carpeta: ponla en una, por ejemplo img/.`)):L.every((D,$)=>$===L.length-1?rt.test(D):/^[a-z0-9_-]+$/.test(D))||t("carpetas",d(`línea ${Ca(i,_.index)}, «${S}» lleva mayúsculas, espacios, tildes o le falta la extensión.`))}const T=Ql(c.html);T.length>1&&t("ordenado",d(`tabulación descolocada en las líneas ${T.slice(0,6).join(", ")}${T.length>6?"…":""}.`));const q=[...i.matchAll(/\s(id|class)\s*=\s*["']([^"']*)["']/gi)].flatMap(S=>S[2].split(/\s+/).filter(Boolean)),E=[...new Set(q.filter(Vl))];E.length&&t("ordenado",d(`nombres que no dicen qué es: ${E.map(S=>`«${S}»`).join(", ")}.`));const A=await ya({html:c.html,css:e.css},lt,800),C=await ya({html:c.html,css:e.css},st,800);try{const S=A.doc,L=S.defaultView,D=u=>L.getComputedStyle(u).display,$=[["header","cabecera (<header>)"],["nav","menú (<nav>)"],["main, section, article","contenido (<main>)"],["footer","pie (<footer>)"]].filter(([u])=>!S.querySelector(u));$.length&&t("bloques",d(`falta ${$.map(u=>u[1]).join(", ")}.`)),o.push({page:c.name,sig:Gl(S),header:sn(S.querySelector("header")),footer:sn(S.querySelector("footer"))});const j=[...S.querySelectorAll("nav a[href]")].map(u=>it(u.getAttribute("href")??"")).filter(u=>!!u),h=e.pages.filter(u=>!j.includes(u.name)).map(u=>u.name);S.querySelector("nav")&&h.length&&t("enlaces",d(`el menú no enlaza ${h.join(", ")}.`));for(const u of S.querySelectorAll("a[href]")){const x=it(u.getAttribute("href")??"");x&&x.endsWith(".html")&&!a.has(x)&&t("enlaces",d(`el enlace «${u.textContent?.trim()}» lleva a «${x}», que no existe.`))}const f=sn(S.querySelector("footer"));/creative ?commons|\bcc[ -]by\b|\bcc0\b/.test(f)||t("licencia",d("el pie no dice la licencia Creative Commons."));const w=S.querySelector("main")??S.querySelector("section, article");[S.body,...S.body.querySelectorAll("*")].filter(u=>/flex/.test(D(u))&&!u.closest("nav")).some(u=>!w||u.contains(w)||w.contains(u))||t("flex",d("ningún bloque del contenido usa display: flex (el menú no cuenta: es otro punto)."));const U=S.querySelector("nav");U&&![U,...U.querySelectorAll("*")].some(u=>/flex/.test(D(u)))&&t("menu",d("el menú no usa display: flex (ni el nav ni su lista)."));const b=C.doc.querySelector("nav");if(U&&b){const u=["display","flex-direction","flex-wrap","justify-content","align-items","gap","font-size","padding-top","padding-left","text-align"],x=[U,...U.querySelectorAll("*")],z=[b,...b.querySelectorAll("*")],F=C.doc.defaultView;x.some((re,le)=>z[le]&&u.some(Ue=>L.getComputedStyle(re).getPropertyValue(Ue)!==F.getComputedStyle(z[le]).getPropertyValue(Ue)))||t("media",d(`el menú se ve igual a ${st} px que a ${lt} px: falta un @media que lo cambie.`))}}finally{A.remove(),C.remove()}}const l=o[0];for(const c of o.slice(1)){const i=[c.sig!==l.sig&&"el menú",c.header!==l.header&&"la cabecera",c.footer!==l.footer&&"el pie"].filter(Boolean);i.length&&t("comunes",`${c.page}: ${i.join(", ")} no ${i.length>1?"son iguales":"es igual"} que en ${l.page}.`)}e.pages.some(c=>/<img\b/i.test(Cn(c.html)))||t("carpetas","No hay ninguna imagen en la web.");for(const c of e.pages)c.html.trim()||t("ordenado",`${c.name} está vacía.`);e.css.trim()||t("ordenado",`${J} está vacío.`),!/@media\b/i.test(e.css)&&!n.get("media").length&&t("media",`${J} no tiene ninguna @media.`);let s=0,r=0;for(const c of e.css.replace(/\/\*[\s\S]*?\*\//g,"").split(`
`))s>0&&/^[a-z-]+\s*:/i.test(c)&&r++,s+=(c.match(/{/g)??[]).length-(c.match(/}/g)??[]).length;return r>1&&t("ordenado",`${J}: hay ${r} propiedades sin sangría; dentro de { } van dos espacios a la derecha.`),Ya.map(c=>({...c,ok:c.manual?null:!n.get(c.id).length,fails:n.get(c.id)}))}function Jl(e){const a=e.filter(n=>n.ok!==null);return{hits:a.filter(n=>n.ok).length,total:a.length}}const Kt="webquest.sites.v1",ct=1024,Xl=375,Zt=e=>`examen/${e}`;function Jt(){try{return JSON.parse(localStorage.getItem(Kt)??"{}")}catch{return{}}}function la(e,a){const n=Jt();a?n[e]=a:delete n[e];try{localStorage.setItem(Kt,JSON.stringify(n))}catch{}}const rn=e=>({css:e.css,pages:e.pages.map(a=>({...a}))}),pa=e=>(Math.round(e.hits/e.total*100)/10).toLocaleString("es-ES");function es(e){return e.innerHTML=`
    <div class="sheet">
      <header class="topbar">
        <a class="btn btn--small" href="#/mapa">Mapa</a>
        <h1 class="topbar__title">Modo examen</h1>
      </header>
      <p class="lead">Como el examen de verdad: sin chuleta y sin avisos de fallos mientras escribes. Haces una web de varias páginas siguiendo el enunciado y la lista de instrucciones del reto, y al entregar se corrige punto por punto.</p>
      <section class="panel">
        <h2 class="panel__title">Las instrucciones que te darán</h2>
        <ol class="rubric-list">${Ya.map(a=>`<li><strong>${R(a.label)}.</strong> <span class="hint">${R(a.how)}</span></li>`).join("")}</ol>
      </section>
      <ol class="cards">
        ${Vt.map(a=>{const n=Wa(Zt(a.id)),t=n?.mark?`Nota ${pa(n.mark)}`:n?"Empezado":`${a.minutes} min`;return`<li><a class="card card--link card--train" href="#/examen/${a.id}">
            <span class="card__n" aria-hidden="true">✎</span>
            <span class="card__body"><span class="card__title">${R(a.title)}</span><span class="card__topic">${a.minutes} minutos · se corrige con la lista</span></span>
            <span class="card__state${n?.mark?" card__state--done":""}">${t}</span>
          </a></li>`}).join("")}
      </ol>
    </div>`,()=>{}}function as(e,a){const n=Yl(a);return n?ns(e,n):(location.hash="#/examen",()=>{})}function ns(e,a){const n=Zt(a.id);let t=Wa(n),o=rn(Jt()[a.id]??ot),l=0,s;e.innerHTML=`
    <div class="sheet challenge--code exam">
      <header class="topbar">
        <a class="btn btn--small" href="#/examen">Modo examen</a>
        <h1 class="topbar__title">${R(a.title)}</h1>
      </header>
      <section class="panel brief">
        <h2 class="panel__title">El enunciado</h2>
        ${ke(a.brief)}
        <details class="exam__given" open>
          <summary>El modelo (en el examen, en papel)</summary>
          <p class="hint">Las medidas, a ojo: aquí no hay regla ni cuentagotas.</p>
          <div class="model__bar">
            <div class="model__pages" role="group" aria-label="Página del modelo">
              ${a.solution.pages.map((h,f)=>`<button class="chip" type="button" aria-pressed="${f===0}" data-model-page="${f}">${R(h.name)}</button>`).join("")}
            </div>
            <div class="model__pages" role="group" aria-label="Ancho del modelo">
              <button class="chip" type="button" aria-pressed="true" data-model-width="${ct}">Ordenador</button>
              <button class="chip" type="button" aria-pressed="false" data-model-width="${Xl}">Móvil</button>
            </div>
          </div>
          <div class="model__paper"><iframe class="model__frame" title="Modelo de la web" sandbox="allow-same-origin" tabindex="-1"></iframe></div>
        </details>
        <details class="exam__given">
          <summary>Los colores</summary>
          <ul class="model__colors">${a.colors.map(([h,f])=>`<li><span class="model__swatch" style="background:${f}"></span><code>${f}</code> ${R(h)}</li>`).join("")}</ul>
        </details>
        <details class="exam__given">
          <summary>Las imágenes (carpeta <code>img/</code>)</summary>
          <ul class="model__images">${_l(a).map(h=>`<li><img src="${h}" alt=""><code>${R(h)}</code></li>`).join("")}</ul>
        </details>
        <details class="exam__given">
          <summary>contenido.txt</summary>
          <pre class="model__txt" data-txt>${R(a.content)}</pre>
          <button class="btn btn--small" type="button" data-copy-txt>Copiar el texto</button>
        </details>
        <details class="exam__rubric">
          <summary>Las instrucciones (como en el reto)</summary>
          <ol>${Ya.map(h=>`<li>${R(h.label)}.</li>`).join("")}</ol>
        </details>
      </section>
      <section class="panel exam-start" hidden>
        <h2 class="panel__title">Examen de ${a.minutes} minutos</h2>
        <p>Empiezas con <code>index.html</code> y <code>${J}</code> vacíos. Las páginas que faltan las creas tú con «Nueva página». No hay chuleta ni avisos de fallos: como en clase el día del examen.</p>
        <p>El reloj sigue aunque salgas. Si se acaba el tiempo, se entrega solo.</p>
        <div class="actions"><button class="btn btn--main" type="button" data-start>Empezar el examen</button></div>
      </section>
      <p class="timer" role="timer" hidden></p>
      <p class="sr-only" aria-live="polite" data-say></p>
      <div data-body>
        <div class="site-pages" role="group" aria-label="Páginas de la web">
          <div class="site-pages__list" data-pages></div>
          <form class="site-pages__new" data-new>
            <label class="sr-only" for="new-page">Nombre de la página nueva</label>
            <input class="field field--small" id="new-page" placeholder="productos.html" autocomplete="off" spellcheck="false">
            <button class="btn btn--small" type="submit">Nueva página</button>
          </form>
        </div>
        <p class="hint site-pages__msg" data-pages-msg hidden></p>
        <div data-editor></div>
        <div class="actions">
          <button class="btn btn--main" type="button" data-run>Entregar</button>
          <button class="btn" type="button" data-remove>Quitar esta página</button>
          <button class="btn" type="button" data-reset>Empezar de nuevo</button>
          <button class="btn" type="button" data-solution hidden>Ver una solución</button>
        </div>
        <div class="feedback" aria-live="polite"></div>
        <section class="checklist" data-results hidden>
          <h2 class="section-title">Lo que se ha corregido</h2>
          <ol class="checks" data-checks></ol>
        </section>
        <div data-solution-box></div>
      </div>
    </div>`;const r=h=>e.querySelector(h),c=r("[data-pages-msg]"),i=r(".model__paper"),d=r(".model__frame");let m=0,y=ct;const g=()=>{const h=d.contentDocument;if(!h?.documentElement||!i.clientWidth)return;const f=Math.min(1,i.clientWidth/y);d.style.width=`${y}px`,d.style.height="0";const w=h.documentElement.scrollHeight;d.style.height=`${w}px`,d.style.transform=`scale(${f})`,i.style.maxWidth=`${y}px`,i.style.height=`${Math.ceil(w*f)}px`},v=()=>{d.style.width=`${y}px`,d.srcdoc=qa({html:a.solution.pages[m].html,css:a.solution.css}).doc};d.addEventListener("load",()=>{g(),d.contentDocument?.querySelectorAll("img").forEach(h=>h.addEventListener("load",g,{once:!0}))});const k=(h,f)=>{e.querySelectorAll(`[${h}]`).forEach(w=>w.setAttribute("aria-pressed",String(w===f)))};e.querySelectorAll("[data-model-page]").forEach(h=>h.addEventListener("click",()=>{m=Number(h.dataset.modelPage),k("data-model-page",h),v()})),e.querySelectorAll("[data-model-width]").forEach(h=>h.addEventListener("click",()=>{y=Number(h.dataset.modelWidth),k("data-model-width",h),v()})),i.closest("details").addEventListener("toggle",g),addEventListener("resize",g),v(),r("[data-copy-txt]").addEventListener("click",async h=>{const f=h.currentTarget;try{await navigator.clipboard.writeText(a.content),f.textContent="Copiado"}catch{getSelection()?.selectAllChildren(r("[data-txt]")),f.textContent="Seleccionado: cópialo con Ctrl+C"}});const _=()=>({html:o.pages[l].html,css:o.css}),M=ja(r("[data-editor]"),{files:_(),htmlName:o.pages[l].name,quiet:!t?.mark,onChange:h=>{o.pages[l].html=h.html,o.css=h.css,la(a.id,o)},onLink:h=>{const f=h.replace(/^\.\//,"").split("#")[0],w=o.pages.findIndex(P=>P.name===f);return w<0?(T(`El enlace lleva a «${f}», pero esa página no existe: créala o revisa el nombre.`),!0):(E(w),!0)}});function T(h){c.textContent=h,c.hidden=!h}function q(){r("[data-pages]").innerHTML=o.pages.map((h,f)=>`<button class="chip" type="button" data-page="${f}" aria-pressed="${f===l}">${R(h.name)}</button>`).join(""),r("[data-remove]").disabled=o.pages.length<2}function E(h){l=h,M.open(_(),o.pages[h].name),q()}r("[data-pages]").addEventListener("click",h=>{const f=h.target.closest("[data-page]");f&&(T(""),E(Number(f.dataset.page)))}),r("[data-new]").addEventListener("submit",h=>{h.preventDefault();const f=r("#new-page"),w=f.value.trim(),P=Kl(w);if(!P)return T("Escribe el nombre de la página, por ejemplo productos.html.");if(o.pages.some(U=>U.name===P))return T(`Ya hay una página «${P}».`);o.pages.push({name:P,html:""}),la(a.id,o),f.value="",T(P!==w?`Creada «${P}» (en minúscula, sin espacios ni tildes).`:""),E(o.pages.length-1)});const A=r("[data-remove]");A.addEventListener("click",()=>{if(!(o.pages.length<2)){if(!A.dataset.sure){A.dataset.sure="1",A.textContent=`Pulsa otra vez para quitar ${o.pages[l].name}`,setTimeout(()=>{delete A.dataset.sure,A.textContent="Quitar esta página"},3e3);return}delete A.dataset.sure,A.textContent="Quitar esta página",o.pages.splice(l,1),la(a.id,o),E(Math.max(0,l-1))}});function C(h){r("[data-checks]").innerHTML=h.map(f=>`<li class="check ${f.ok===null?"is-manual":f.ok?"is-ok":"is-bad"}">
          <span class="check__mark" aria-hidden="true">${f.ok===null?"👁":f.ok?"✓":"✗"}</span>
          <span class="check__label">${R(f.label)}${f.ok===null?" <em>(repásalo tú: no cuenta en la nota)</em>":""}</span>
          ${f.ok===!1?`<span class="check__hint">${W(f.how)}<ul>${f.fails.map(w=>`<li>${R(w)}</li>`).join("")}</ul></span>`:f.ok===null?`<span class="check__hint">${R(f.how)}</span>`:""}
        </li>`).join(""),r("[data-results]").hidden=!1}async function S(){const h=r("[data-run]");h.disabled=!0;const f=h.textContent;h.textContent="Corrigiendo…";try{const w=await Zl(o);return C(w),Jl(w)}finally{h.disabled=!1,h.textContent=f}}async function L(h){clearInterval(s);const{hits:f,total:w}=await S(),P=Math.min(a.minutes,Math.max(1,Math.round((Date.now()-t.start)/6e4)));t={...t,mark:{hits:f,total:w,minutes:P}},Ze(n,t),$(),r(".feedback").innerHTML=`<p class="feedback__title feedback__title--${f===w?"ok":"bad"}">${h?"Se acabó el tiempo. ":""}Tu nota: ${pa(t.mark)} sobre 10 (${f} de ${w} instrucciones).</p>
      <p>${f===w?"¡Todas cumplidas! Repasa tú la ortografía, que no se corrige sola.":"Lo marcado con ✗ es lo que falta, con dónde está el fallo. Ahora ya ves los avisos del revisor debajo del editor: arréglalo y comprueba otra vez."}</p>`,r("[data-results]").scrollIntoView({block:"start",behavior:"smooth"})}r("[data-run]").addEventListener("click",async()=>{if(!t?.mark)return void L(!1);const{hits:h,total:f}=await S();r(".feedback").innerHTML=`<p class="feedback__title feedback__title--${h===f?"ok":"bad"}">Ahora: ${h} de ${f}. (La nota de la entrega se queda en ${pa(t.mark)}.)</p>`});const D=h=>{const f=Math.max(0,Math.ceil(h/1e3));return`${Math.floor(f/60)}:${String(f%60).padStart(2,"0")}`};function $(){const h=!!t,f=!!t?.mark;r(".exam-start").hidden=h,r("[data-body]").hidden=!h,r("[data-solution]").hidden=!f,r("[data-run]").textContent=f?"Comprobar otra vez":"Entregar",M.setQuiet(!f),q(),clearInterval(s);const w=r(".timer");if(w.hidden=!h,f)w.classList.remove("is-low"),w.textContent=`Entregado en ${t.mark.minutes} min · Nota: ${pa(t.mark)}`;else if(h){const P=t.start+a.minutes*6e4,U=new Set,b=()=>{const u=P-Date.now();if(u<=0)return void L(!0);w.textContent=`Quedan ${D(u)}`,w.classList.toggle("is-low",u<=10*6e4);for(const x of[30,10,5,1])u<=x*6e4&&u>(x-1)*6e4&&!U.has(x)&&a.minutes>x&&(U.add(x),r("[data-say]").textContent=`Queda${x>1?"n":""} ${x} minuto${x>1?"s":""}.`)};b(),s=setInterval(b,1e3)}}r("[data-start]").addEventListener("click",()=>{t={start:Date.now()},Ze(n,t),$(),e.querySelector(".code__input")?.focus()});const j=r("[data-reset]");return j.addEventListener("click",()=>{if(!j.dataset.sure){j.dataset.sure="1",j.textContent="Pulsa otra vez para borrarlo todo",setTimeout(()=>{delete j.dataset.sure,j.textContent="Empezar de nuevo"},3e3);return}delete j.dataset.sure,j.textContent="Empezar de nuevo",o=rn(ot),la(a.id,void 0),t=void 0,Ze(n),r(".feedback").innerHTML="",r("[data-solution-box]").innerHTML="",r("[data-results]").hidden=!0,E(0),$()}),r("[data-solution]").addEventListener("click",()=>{const h=r("[data-solution-box]");h.innerHTML=`
      <section class="panel solution">
        <h2 class="panel__title">Una solución</h2>
        <p class="hint">Hay más formas de hacerlo bien. Fíjate en lo que se repite en todas las páginas (cabecera, menú y pie) y en dónde van los display: flex y la @media.</p>
        ${[...a.solution.pages.map(f=>[f.name,"html",zn(f.html.trim())]),[J,"css",$e(a.solution.css.trim())]].map(([f,w,P])=>`<figure class="snippet snippet--${w}"><figcaption>${R(f)}</figcaption><pre><code>${P}</code></pre></figure>`).join("")}
        <div class="actions"><button class="btn" type="button" data-copy>Ponerla en el editor</button></div>
      </section>`,h.querySelector("[data-copy]").addEventListener("click",()=>{o=rn(a.solution),la(a.id,o),E(0)}),h.scrollIntoView({block:"nearest",behavior:"smooth"})}),t?.mark&&(r(".feedback").innerHTML=`<p class="feedback__title">Tu nota de la entrega: ${pa(t.mark)} sobre 10. Pulsa «Comprobar otra vez» para ver la lista con lo que llevas ahora.</p>`),$(),()=>{clearInterval(s),removeEventListener("resize",g),M.destroy()}}const cn=`body {
  font-family: sans-serif;
}

header, nav, main, section, article, aside, footer {
  border: 2px dashed #c2410c;
  padding: 8px;
  margin: 6px 0;
}
`,dt=`body {
  margin: 0;
  font-family: Georgia, serif;
  background: #fff7f9;
  color: #3b2a30;
}

header {
  background: #b8336a;
  color: white;
  padding: 16px;
}

header h1 {
  margin: 0;
}

main {
  padding: 0 16px;
}

h2 {
  color: #b8336a;
}

footer {
  background: #3b2a30;
  color: white;
  padding: 12px 16px;
}
`,ts={n:1,intro:"Todo lo que se ve en una web está escrito con etiquetas. Aquí aprendes a escribirlas sin fallos, el esqueleto que lleva siempre index.html y cómo repartir la página en zonas, que es lo primero que te pedirá cualquier enunciado.",lessons:[{id:"etiquetas",title:"Etiquetas, elementos y atributos",summary:"Cómo se escribe cualquier cosa en HTML",steps:[{text:p("Una página web son dos archivos de texto que lee el navegador:","- `index.html` dice **qué hay** en la página y qué es cada cosa: un título, un párrafo, un menú…","- `estilos.css` dice **cómo se ve**: colores, tamaños, posiciones.","","Primero se hace el HTML (el contenido, ordenado) y después el CSS (el aspecto). En el examen te pedirán los dos."),code:{html:`<h1>Panadería La Espiga</h1>
<p>Pan del día desde 1985.</p>`,css:`h1 {
  color: brown;
}`}},{text:p("En HTML todo se marca con **etiquetas**. Casi todas van por parejas: una de apertura, `<p>`, y otra de cierre, que es igual pero con una barra: `</p>`.","","La apertura, el contenido y el cierre forman un **elemento**. Aquí, un elemento párrafo:"),code:{html:"<p>Hoy hay pan de centeno.</p>"},try:{task:"Cambia el texto del párrafo y añade otro debajo con `<p>…</p>`. La página de la derecha (o la pestaña «Vista» en el móvil) cambia mientras escribes.",html:`<p>Hoy hay pan de centeno.</p>
`,css:"",tabs:["html"]}},{text:p('Algunas etiquetas necesitan más datos. Se ponen en la apertura como **atributos**, con la forma `nombre="valor"`: el valor siempre entre comillas, y si hay varios, separados por espacios.',"","Dos atributos valen para cualquier etiqueta y los usarás mucho con el CSS:","- `class`: un nombre para darle estilo. Varios elementos pueden tener la misma clase.","- `id`: un nombre único. Solo un elemento de la página puede tenerlo."),code:{html:`<a href="contacto.html">Contacto</a>
<img src="logo.png" alt="Logo de la panadería">
<p class="aviso">Cerrado por vacaciones</p>`}},{check:{question:'En `<a href="menu.html">Menú</a>`, ¿qué es `href`?',options:["Un atributo","Una etiqueta","El contenido","Un elemento entero"],why:'`href` va dentro de la etiqueta de apertura con la forma nombre="valor": es un atributo. La etiqueta es `a`, el contenido es «Menú» y todo junto es el elemento.'}},{text:p("Los elementos van unos dentro de otros. La regla de oro: **se cierran en orden inverso al que se abren**, como cajas: la última que abres es la primera que cierras.","","La **sangría** (los espacios al principio de la línea) no cambia la página, pero deja ver qué va dentro de qué."),code:{html:`<!-- Bien: strong se abre y se cierra dentro de p -->
<p>Pan <strong>recién hecho</strong></p>

<!-- Mal: strong se cierra después que p -->
<p>Pan <strong>recién hecho</p></strong>`},exam:"Sangra siempre el código: dentro de cada etiqueta, dos espacios más. El profesor lo mira y a ti te ahorra fallos de cierre."},{text:"Este código tiene el error de antes. El navegador no avisa: lo arregla a su manera y a veces sale raro. Este editor sí te avisa debajo, con la línea.",try:{task:"Lee el aviso de debajo del editor (puedes pulsarlo para ir a la línea) y arregla el cierre hasta que diga «Sin fallos a la vista».",html:`<p>Pan <strong>recién hecho</p></strong>
`,css:"",tabs:["html"]}},{text:p("Unas pocas etiquetas no tienen contenido y por eso **no se cierran**. Se llaman etiquetas vacías:","- `<br>`: salto de línea.","- `<img>`: imagen.","- `<hr>`: una raya de separación.","- `<meta>` y `<link>`: datos de la cabecera.","- `<input>`: un campo de formulario.","","Escribir `</br>` o `</img>` es un error.")},{check:{question:"¿Cuál de estas etiquetas **no** se cierra?",options:["`<img>`","`<p>`","`<strong>`","`<a>`"],why:"`<img>` es una etiqueta vacía: todo lo que necesita va en sus atributos (`src`, `alt`). Las otras envuelven un contenido y se cierran."}}],recap:["`index.html` dice qué hay; `estilos.css`, cómo se ve.","Un elemento es apertura + contenido + cierre: `<p>Hola</p>`.",'Los atributos van en la apertura: `nombre="valor"`. `class` se repite; `id` es único.',"Se cierra en orden inverso al que se abre. Sangra el código.","Las vacías no se cierran: `<br>`, `<img>`, `<hr>`, `<meta>`, `<link>`, `<input>`."]},{id:"documento",title:"El esqueleto del documento",summary:"Lo que lleva siempre index.html, de memoria",steps:[{text:"Todo `index.html` empieza igual. Apréndetelo de memoria: es lo primero que escribes en el examen.",code:{html:H("Panadería La Espiga","    <h1>Panadería La Espiga</h1>")},exam:"Escríbelo nada más empezar y repasa que estén `lang`, `charset`, `viewport`, `title` y el `link` al CSS. Son puntos fáciles."},{text:p("Línea a línea:","- `<!DOCTYPE html>`: avisa de que es HTML moderno (HTML5). No es una etiqueta y no se cierra.",'- `<html lang="es">`: lo envuelve todo. `lang` dice el idioma.',"- `<head>`: la **cabecera**, información para el navegador. No se ve en la página.",'- `<meta charset="UTF-8">`: para que salgan bien las tildes y la ñ.','- `<meta name="viewport" …>`: para que en el móvil se vea a su tamaño.',"- `<title>`: el texto de la pestaña del navegador.",'- `<link rel="stylesheet" href="estilos.css">`: enlaza el CSS.',"- `<body>`: el **cuerpo**, todo lo que se ve.","","Para no liarte: **head es lo que necesita saber el navegador; body es lo que ve la persona.**")},{check:{question:"¿Dónde va un párrafo que tiene que verse en la página?",options:["Dentro de `<body>`","Dentro de `<head>`","Dentro de `<title>`","Después de `</html>`"],why:"Todo lo que se ve va en `<body>`. En `<head>` solo van datos para el navegador: el título de la pestaña, la codificación, el enlace al CSS…"}},{text:p("El CSS va en otro archivo y el HTML lo tiene que enlazar con `<link>` dentro de `<head>`:",'- `rel="stylesheet"` dice que es una hoja de estilos;',"- `href` es el nombre del archivo.","","Si el nombre no coincide letra por letra (`estilo.css`, `Estilos.css`, `css/estilos.css` cuando no hay carpeta…), el CSS **no se aplica** y la página sale sin estilos."),exam:"Si tu CSS «no hace nada», mira primero el `<link>`: que el nombre del archivo sea exacto y que esté en el `<head>`."},{text:"Aquí el CSS pone un fondo crema y el título marrón, pero no sale.",try:{task:"Busca el fallo del `<link>` (el aviso de debajo te da una pista) y arréglalo. Cuando esté bien, la página sale con el fondo crema.",html:H("Panadería La Espiga",`    <h1>Panadería La Espiga</h1>
    <p>Pan del día desde 1985.</p>`).replace('href="estilos.css"','href="estilo.css"'),css:`body {
  background: #fdf3d8;
  font-family: sans-serif;
}

h1 {
  color: #8a4b0f;
}
`}},{check:{task:"Une cada parte del esqueleto con lo que hace.",pairs:[["`<title>`","El texto de la pestaña"],['`<meta charset="UTF-8">`',"Que se vean bien las tildes y la ñ"],["`<link>`","Enlazar el archivo CSS"],["`<head>`","Información para el navegador, que no se ve"],["`<body>`","Todo lo que se ve en la página"]],why:"Lo de `<head>` (title, meta, link) es para el navegador; lo de `<body>`, para la persona que mira la página."}}],recap:['Orden: `<!DOCTYPE html>`, `<html lang="es">`, `<head>` y `<body>`.','En `<head>`: `meta charset="UTF-8"`, `meta name="viewport"`, `title` y `link` al CSS.',"En `<body>`: todo lo que se ve.","El `href` del `link` tiene que ser el nombre exacto del archivo CSS."]},{id:"textos",title:"Títulos, párrafos y énfasis",summary:"h1 a h6, p, br, strong, em y comentarios",steps:[{text:p("Los títulos van de `<h1>` (el más importante) a `<h6>`. Funcionan como el índice de un libro:","- `<h1>`: el título de la página. Normalmente **solo uno**.","- `<h2>`: cada apartado grande.","- `<h3>`: los subapartados de un h2.","","No te saltes niveles (de h1 a h3) y no elijas el título por su tamaño: el tamaño se cambia luego con CSS."),code:{html:`<h1>Academia Ritmo</h1>

<h2>Nuestras clases</h2>
<p>Salsa, bachata y hip hop.</p>

<h3>Horario infantil</h3>
<p>De lunes a jueves, por la tarde.</p>

<h2>Dónde estamos</h2>
<p>Avenida del Puerto, 12.</p>`}},{text:p("Cada párrafo va en su `<p>`. Y ojo: el navegador **junta los espacios y los saltos de línea** en uno solo. Da igual cuántos pongas en el código.","","`<br>` hace un salto de línea dentro del mismo texto, como en una dirección. No lo uses para separar párrafos: para eso, otro `<p>`."),try:{task:"Pon varios espacios e Intro en mitad del primer párrafo: en la página no cambia nada. Después parte la dirección en tres líneas con `<br>` al final de la calle y de la ciudad.",html:`<p>Somos una academia de baile.</p>
<p>Avenida del Puerto, 12 Bilbao Tel. 944 000 000</p>
`,css:"",tabs:["html"]}},{text:p("Dentro de un texto:","- `<strong>` marca algo **importante** (sale en negrita).","- `<em>` marca un **énfasis**, algo que se diría con otro tono (sale en cursiva).","","Y `<!-- así -->` se escribe un **comentario**: no sale en la página y sirve para explicar el código."),code:{html:`<!-- Apartado de ofertas -->
<p>La <strong>primera clase es gratis</strong>.</p>
<p>Ven con ropa <em>cómoda</em>.</p>`},exam:"Poner un comentario al principio de cada zona (`<!-- Cabecera -->`, `<!-- Pie -->`) deja claro tu orden y a veces lo valoran."},{check:{question:"El cliente quiere que «Abierto los domingos» se vea destacado porque es importante. ¿Qué usas?",options:["`<strong>`","`<h1>`","`<br>`","`<title>`"],why:"`<strong>` es para lo importante dentro de un texto. Un `<h1>` es el título de la página, no un texto destacado."}},{check:{question:"Escribes `<p>Hola          mundo</p>` con muchos espacios en medio. ¿Qué sale en la página?",options:["«Hola mundo», con un solo espacio","«Hola» y los mismos espacios hasta «mundo»","«Hola» en una línea y «mundo» en otra","Un error"],why:"El navegador junta todos los espacios y saltos de línea seguidos en un solo espacio. Para bajar de línea se usa `<br>` y para otro párrafo, otro `<p>`."}}],recap:["`<h1>` una vez; `<h2>` para apartados; `<h3>` para subapartados. Sin saltar niveles.","Cada párrafo en su `<p>`. Los espacios seguidos se juntan en uno.","`<br>` salta de línea dentro de un texto (direcciones, horarios).","`<strong>` = importante; `<em>` = énfasis; `<!-- … -->` = comentario."]},{id:"zonas",title:"Las zonas de la página",summary:"header, nav, main, section, article, aside, footer y div",steps:[{text:p("Casi todas las webs tienen las mismas zonas, y HTML tiene una etiqueta para cada una. Se llaman **semánticas** porque dicen qué es cada parte:","- `<header>`: la cabecera (logo, nombre y a menudo el menú).","- `<nav>`: el menú de navegación, con los enlaces.","- `<main>`: el contenido principal. **Solo uno** por página.","- `<footer>`: el pie (contacto, copyright, redes)."),code:{html:`<body>
  <header>
    <h1>Taller Ruedas</h1>
    <nav>Inicio · Servicios · Contacto</nav>
  </header>

  <main>
    …
  </main>

  <footer>
    <p>&copy; 2026 Taller Ruedas</p>
  </footer>
</body>`}},{text:p("Dentro de `<main>` se organiza el contenido:","- `<section>`: un apartado con su propio título (normalmente un `<h2>`).","- `<article>`: algo que se entiende solo: una noticia, una receta, un producto.","- `<aside>`: información aparte, al lado: un anuncio, enlaces relacionados.","- `<div>`: una caja **sin significado**, solo para agrupar cosas y darles estilo. Úsala cuando ninguna de las otras encaje.","","Los símbolos especiales se escriben con un código: `&copy;` es ©, `&lt;` es < y `&gt;` es >.")},{text:"Aquí el CSS dibuja un borde punteado alrededor de cada zona, para que veas las cajas.",try:{task:"Añade dentro de `<main>` una segunda `<section>` con el `<h2>` «Precios» y un párrafo. Fíjate en cómo aparece su caja.",html:H("Taller Ruedas",`    <header>
      <h1>Taller Ruedas</h1>
      <nav>Inicio · Servicios · Contacto</nav>
    </header>

    <main>
      <section>
        <h2>Servicios</h2>
        <p>Arreglamos todo tipo de bicis.</p>
      </section>
    </main>

    <footer>
      <p>&copy; 2026 Taller Ruedas</p>
    </footer>`),css:cn,tabs:["html"]},exam:"El enunciado lo dirá con palabras del cliente: «arriba, el nombre y el menú» es `<header>` con `<h1>` y `<nav>`; «un apartado de…» es una `<section>` con su `<h2>`; «abajo, el contacto» es `<footer>`."},{check:{task:"Une cada etiqueta con la zona que es.",pairs:[["`<header>`","La cabecera con el logo y el nombre"],["`<nav>`","El menú con los enlaces"],["`<main>`","El contenido principal (solo uno)"],["`<section>`","Un apartado con su título"],["`<footer>`","El pie con el contacto y el copyright"],["`<div>`","Una caja sin significado, para agrupar"]],why:"Las semánticas dicen qué es cada zona. `<div>` no dice nada: se usa solo para agrupar y dar estilo."}}],recap:["`<header>` arriba, `<main>` en medio (uno solo), `<footer>` abajo.","`<nav>` envuelve el menú; suele ir dentro del `<header>`.","`<section>` es un apartado con su `<h2>`; `<article>`, algo que se entiende solo; `<aside>`, información aparte.","`<div>` agrupa sin significado.","`&copy;` escribe ©."]},{id:"enunciado",title:"Del enunciado al HTML",summary:"El método para el examen: leer, listar, dibujar y escribir",steps:[{text:p("En el examen te darán lo que pide un cliente. El fallo típico es ponerse a escribir sin plan y olvidar cosas. Sigue siempre estos pasos:","- **1. Lee y subraya** cada cosa que pide. Cada una suele ser un punto de la nota.","- **2. Haz una lista** con esas peticiones, para tacharlas al final.","- **3. Dibuja las cajas** en un papel: qué zona va arriba, cuál debajo…","- **4. Escribe el esqueleto** y las zonas vacías: `header`, `nav`, `main`, `footer`.","- **5. Rellena** el contenido de cada zona.","- **6. El CSS**, al final y zona a zona.","- **7. Repasa la lista** y tacha lo hecho.")},{text:p("Un ejemplo. El cliente escribe: «La Panadería La Espiga quiere una web con su nombre arriba y un menú con Inicio, Productos y Contacto. Debajo, un apartado de productos y otro con el horario. Abajo del todo, la dirección y el teléfono».","","Cada trozo, a su etiqueta:","- «su nombre arriba» → `<header>` con un `<h1>`","- «un menú con…» → `<nav>` (los enlaces, en el mundo 2)","- «un apartado de productos» → `<section>` con `<h2>Productos</h2>`","- «otro con el horario» → otra `<section>`","- «abajo del todo, la dirección…» → `<footer>`"),code:{html:`<header>
  <h1>Panadería La Espiga</h1>
  <nav>Inicio · Productos · Contacto</nav>
</header>

<main>
  <section>
    <h2>Productos</h2>
    <p>Pan de pueblo, de centeno y de espelta.</p>
  </section>
  <section>
    <h2>Horario</h2>
    <p>De lunes a sábado, de 7:00 a 14:00.</p>
  </section>
</main>

<footer>
  <p>Calle Mayor, 4 · 944 000 000</p>
</footer>`},exam:"Usa los textos exactos que da el enunciado (nombres, títulos, datos). Y si algo no te sale del todo, deja al menos la estructura: puntúa más que dejarlo en blanco."},{check:{question:"El cliente pide: «abajo del todo, el copyright y un enlace a Instagram». ¿Dónde va?",options:["En el `<footer>`","En el `<header>`","En un `<aside>`","En el `<nav>`"],why:"«Abajo del todo» es el pie de la página: `<footer>`. El copyright y las redes sociales casi siempre van ahí."}}],recap:["Subraya cada petición del enunciado y haz una lista para tacharla.","Dibuja las cajas antes de escribir.","Esqueleto y zonas vacías primero; contenido después; CSS al final.","Usa los textos exactos del enunciado."]}],challenges:[{kind:"quiz",id:"se-ve",title:"¿Qué se ve?",question:"¿Qué parte del documento es la que se ve en la página?",options:["`<body>`","`<head>`","`<title>`","`<meta>`"],why:"Lo que se ve va en `<body>`. `<head>` y lo que lleva dentro (`<title>`, `<meta>`, `<link>`) son datos para el navegador."},{kind:"match",id:"piezas-esqueleto",title:"Las piezas del esqueleto",task:"Une cada línea del esqueleto con lo que hace.",pairs:[["`<!DOCTYPE html>`","Dice que es HTML moderno (HTML5)"],['`lang="es"`',"El idioma de la página"],['`charset="UTF-8"`',"Tildes y ñ bien escritas"],['`name="viewport"`',"Que en el móvil se vea a su tamaño"],["`<title>`","El texto de la pestaña"]],why:"Estas cinco cosas van en todas las páginas. Si las escribes de memoria al empezar el examen, ya tienes puntos."},{kind:"code",id:"esqueleto",title:"El esqueleto de memoria",tabs:["html"],brief:p("Escribe desde cero el esqueleto de `index.html`:","- en español, con la codificación UTF-8 y la línea del viewport para el móvil;","- con el título «Mi primera web» en la pestaña;","- enlazando `estilos.css` (ya está escrito: pone el fondo crema);","- y en la página, un título principal que diga «Hola».","","Intenta hacerlo sin mirar: es lo primero que escribirás en el examen."),start:{html:"",css:`body {
  background: #fdf3d8;
  font-family: sans-serif;
}

h1 {
  color: #8a4b0f;
}
`},solution:{html:H("Mi primera web","    <h1>Hola</h1>"),css:`body {
  background: #fdf3d8;
  font-family: sans-serif;
}

h1 {
  color: #8a4b0f;
}
`},checks:[{label:"Empieza con `<!DOCTYPE html>`",test:e=>/^\s*<!doctype html\s*>/i.test(e.source())},{label:'`<html lang="es">`',test:e=>e.attr("html","lang").toLowerCase().startsWith("es")},{label:'En el `<head>`: `<meta charset="UTF-8">`',test:e=>ge(e,"charset")&&e.attr("meta[charset]","charset").toLowerCase()==="utf-8"},{label:"En el `<head>`: el viewport",test:e=>ge(e,"viewport")&&e.attr('meta[name="viewport"]',"content").includes("width=device-width"),hint:'`<meta name="viewport" content="width=device-width, initial-scale=1.0">`'},{label:"En el `<head>`: el título «Mi primera web»",test:e=>ge(e,"<title")&&I(e.doc.title)==="mi primera web"},{label:"El CSS está enlazado (sale el fondo crema)",test:e=>e.linked&&ge(e,"stylesheet"),hint:'`<link rel="stylesheet" href="estilos.css">` dentro de `<head>`.'},{label:"En el `<body>`: un `<h1>` que dice «Hola»",test:e=>e.loose("body h1")==="hola"},{label:"Sin errores en el código",test:e=>e.htmlErrors()===0,hint:"Mira los avisos de debajo del editor."}],why:"Este esqueleto es igual en todas las webs. Repítelo hasta que te salga solo: en el examen te dará tiempo para lo difícil."},{kind:"code",id:"arregla",title:"La web que no sale",tabs:["html"],brief:p("A un compañero no le sale la página de la frutería: el CSS no se aplica y hay cosas raras. Tiene **cuatro fallos**. Encuéntralos y arréglalos.","","Pista: los avisos de debajo del editor señalan tres; el cuarto es algo que está fuera de su sitio."),start:{html:`<!DOCTYPE html>
<html lang="es">
  <head>
    <meta charset="UTF-8">
    <link rel="stylesheet" href="estilo.css">
  </head>
  <body>
    <title>Frutería Paqui</title>
    <h1>Frutería Paqui</h1>
    <p>Fruta de temporada <strong>todos los días</p></strong>
    <p>Calle Mayor, 4
  </body>
</html>
`,css:`body {
  background: #eef7e8;
  font-family: sans-serif;
}

h1 {
  color: #2f6b1f;
}
`},solution:{html:`<!DOCTYPE html>
<html lang="es">
  <head>
    <meta charset="UTF-8">
    <title>Frutería Paqui</title>
    <link rel="stylesheet" href="estilos.css">
  </head>
  <body>
    <h1>Frutería Paqui</h1>
    <p>Fruta de temporada <strong>todos los días</strong></p>
    <p>Calle Mayor, 4</p>
  </body>
</html>
`,css:`body {
  background: #eef7e8;
  font-family: sans-serif;
}

h1 {
  color: #2f6b1f;
}
`},checks:[{label:"El CSS se aplica (fondo verde claro)",test:e=>e.linked,hint:"Mira el nombre del archivo en el `href`."},{label:"`<title>` está en el `<head>`",test:e=>ge(e,"<title")&&I(e.doc.title)==="fruteria paqui",hint:"El título de la pestaña es información para el navegador."},{label:"«todos los días» va en `<strong>` dentro del primer párrafo",test:e=>e.loose("p strong")==="todos los dias"},{label:"Todas las etiquetas bien cerradas",test:e=>e.htmlErrors()===0,hint:"Se cierra en orden inverso al que se abre, y cada `<p>` con su `</p>`."}],why:"Son los cuatro fallos que más se repiten: el nombre del CSS, lo de la cabecera puesto en el cuerpo, cerrar en mal orden y dejar algo sin cerrar. El navegador no avisa de ninguno: repásalos tú siempre al final."},{kind:"code",id:"titulos",title:"Los textos de la academia",tabs:["html"],brief:p("La academia de baile «Ritmo» te pasa sus textos. Ponlos en el `<body>` con los títulos y párrafos que tocan:","- Título de la página: **Academia Ritmo**.","- Apartado **Nuestras clases**, con el párrafo: «Salsa, bachata y hip hop para todas las edades. La primera clase es gratis.» Y «La primera clase es gratis» tiene que salir como algo importante.","- Dentro de las clases, un subapartado **Horario infantil**, con el párrafo: «De lunes a jueves, de 17:00 a 18:00.»","- Apartado **Dónde estamos**, con el párrafo: «Avenida del Puerto, 12.»"),start:{html:H("Academia Ritmo","    <!-- Escribe aquí el contenido -->"),css:""},solution:{html:H("Academia Ritmo",`    <h1>Academia Ritmo</h1>

    <h2>Nuestras clases</h2>
    <p>Salsa, bachata y hip hop para todas las edades. <strong>La primera clase es gratis.</strong></p>

    <h3>Horario infantil</h3>
    <p>De lunes a jueves, de 17:00 a 18:00.</p>

    <h2>Dónde estamos</h2>
    <p>Avenida del Puerto, 12.</p>`),css:""},checks:[{label:"Un solo `<h1>`: «Academia Ritmo»",test:e=>e.count("h1")===1&&e.loose("h1")==="academia ritmo"},{label:"Dos `<h2>`: «Nuestras clases» y «Dónde estamos»",test:e=>e.all("h2").map(a=>e.loose(a)).join("|")==="nuestras clases|donde estamos"},{label:"«Horario infantil» es un `<h3>` entre los dos apartados",test:e=>e.loose("h3")==="horario infantil"&&Yn(e.all("h2")[0],e.q("h3"))&&Yn(e.q("h3"),e.all("h2")[1]),hint:"Es un subapartado de las clases: va después de su `<h2>`."},{label:"Cada título tiene su párrafo justo debajo",test:e=>e.all("h2, h3").every(a=>a.nextElementSibling?.tagName==="P")},{label:"«La primera clase es gratis» va en `<strong>`",test:e=>e.loose("p strong").includes("primera clase es gratis")},{label:"Sin errores en el código",test:e=>e.htmlErrors()===0}],why:"Los títulos forman el índice de la página: un h1, un h2 por apartado y un h3 para lo que va dentro de un apartado. Es lo primero que se mira en una corrección."},{kind:"quiz",id:"barra-enlaces",title:"La barra de enlaces",question:"El cliente quiere «una barra con enlaces a Inicio, Carta y Reservas». ¿Qué etiqueta la envuelve?",options:["`<nav>`","`<footer>`","`<section>`","`<title>`"],why:"Un grupo de enlaces para moverse por la web es la navegación: `<nav>`. Suele ir dentro del `<header>`."},{kind:"code",id:"zonas",title:"Las zonas del taller",tabs:["html"],brief:p("Monta la estructura de la web del taller de bicis **Taller Ruedas** (el CSS dibuja un borde alrededor de cada zona para que las veas):","- Arriba, una cabecera con el nombre del taller como título principal y un menú. Por ahora, el menú es un `<nav>` con el texto «Inicio · Servicios · Precios».","- El contenido principal, con dos apartados: **Servicios** y **Precios**, cada uno con su título y un párrafo (inventa el texto).","- Abajo, un pie con «© 2026 Taller Ruedas»."),start:{html:H("Taller Ruedas","    <!-- Escribe aquí las zonas -->"),css:cn},solution:{html:H("Taller Ruedas",`    <header>
      <h1>Taller Ruedas</h1>
      <nav>Inicio · Servicios · Precios</nav>
    </header>

    <main>
      <section>
        <h2>Servicios</h2>
        <p>Reparamos y ponemos a punto todo tipo de bicis.</p>
      </section>
      <section>
        <h2>Precios</h2>
        <p>Puesta a punto completa: 30 euros.</p>
      </section>
    </main>

    <footer>
      <p>&copy; 2026 Taller Ruedas</p>
    </footer>`),css:cn},checks:[{label:"`<header>`, `<main>` y `<footer>`, en ese orden, dentro de `<body>`",test:e=>e.kids("body").filter(a=>["header","main","footer"].includes(a)).join()==="header,main,footer"},{label:"En la cabecera, un `<h1>` con «Taller Ruedas»",test:e=>e.loose("header h1")==="taller ruedas"},{label:"En la cabecera, el `<nav>`",test:e=>e.has("header nav")},{label:"En `<main>`, dos `<section>`",test:e=>e.count("main > section")===2},{label:"Los apartados se titulan con `<h2>`: «Servicios» y «Precios»",test:e=>!!K(e,"Servicios")&&!!K(e,"Precios")},{label:"Cada apartado tiene un párrafo",test:e=>e.all("main section").length>0&&e.all("main section").every(a=>!!a.querySelector("p")?.textContent?.trim())},{label:"El pie dice «© 2026 Taller Ruedas»",test:e=>e.loose("footer").includes("© 2026 taller ruedas"),hint:"© se escribe `&copy;`."},{label:"Sin errores en el código",test:e=>e.htmlErrors()===0}],why:"Así empiezan todas las webs del examen: cabecera con el nombre y el menú, el contenido en apartados con su h2 y el pie. Con esta estructura, el CSS de después es mucho más fácil."},{kind:"quiz",id:"bien-escrita",title:"¿Cuál está bien?",question:"¿Cuál de estas líneas está bien escrita?",options:['`<img src="pan.jpg" alt="Pan de pueblo">`','`<img src="pan.jpg" alt="Pan de pueblo"></img>`',"`<br></br>`",'`<p class=".oferta">Oferta</p>`'],why:"`<img>` y `<br>` son vacías: no se cierran. Y en `class` el nombre va sin punto: el punto solo se pone en el CSS (`.oferta`)."},{kind:"quiz",id:"tres-lineas",title:"La dirección en tres líneas",question:"El cliente quiere la dirección en tres líneas (calle, ciudad y teléfono) dentro del mismo párrafo. ¿Cómo lo haces?",options:["Con `<br>` al final de la calle y de la ciudad","Pulsando Intro entre cada dato en el código","Con un `<h3>` para cada dato","Poniendo muchos espacios entre los datos"],why:"Los saltos de línea del código no salen en la página (se juntan en un espacio). `<br>` es el salto de línea dentro de un mismo texto."},{kind:"code",id:"floristeria",title:"Encargo: la floristería",tabs:["html"],brief:p("**Floristería Margarita** te escribe:","","«Queremos una página sencilla. En la pestaña del navegador tiene que salir “Floristería Margarita”. Arriba, el nombre de la tienda bien grande y un menú (de momento, un `<nav>` con el texto “Inicio | Ramos | Contacto”). Luego, un apartado “Nuestros ramos” que explique que hacemos ramos por encargo en el día, y que destaque que **el envío es gratis** en la ciudad. Otro apartado, “Horario”, con dos líneas en el mismo párrafo: “Lunes a viernes: 9:00 a 20:00” y “Sábados: 10:00 a 14:00”. Abajo del todo, “Calle de las Flores, 3 · 944 000 000”.»","","Empiezas con `index.html` vacío. El CSS ya está hecho en `estilos.css`: si lo enlazas bien y usas las zonas, la página sale con su aspecto."),start:{html:"",css:dt},solution:{html:`<!DOCTYPE html>
<html lang="es">
  <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Floristería Margarita</title>
    <link rel="stylesheet" href="estilos.css">
  </head>
  <body>
    <!-- Cabecera -->
    <header>
      <h1>Floristería Margarita</h1>
      <nav>Inicio | Ramos | Contacto</nav>
    </header>

    <main>
      <section>
        <h2>Nuestros ramos</h2>
        <p>Hacemos ramos por encargo en el día, y <strong>el envío es gratis</strong> en la ciudad.</p>
      </section>

      <section>
        <h2>Horario</h2>
        <p>Lunes a viernes: 9:00 a 20:00<br>Sábados: 10:00 a 14:00</p>
      </section>
    </main>

    <!-- Pie -->
    <footer>
      <p>Calle de las Flores, 3 · 944 000 000</p>
    </footer>
  </body>
</html>
`,css:dt},checks:[{label:'Esqueleto completo: `DOCTYPE`, `lang="es"`, `charset` y viewport',test:e=>/^\s*<!doctype html\s*>/i.test(e.source())&&e.attr("html","lang").startsWith("es")&&ge(e,"charset","viewport")},{label:"La pestaña dice «Floristería Margarita»",test:e=>I(e.doc.title)==="floristeria margarita"},{label:"El CSS está enlazado",test:e=>e.linked},{label:"Cabecera con el `<h1>` «Floristería Margarita» y el `<nav>`",test:e=>e.loose("header h1")==="floristeria margarita"&&e.has("header nav")},{label:"En `<main>`, los apartados «Nuestros ramos» y «Horario» con su `<h2>`",test:e=>!!K(e,"Nuestros ramos")?.closest("main")&&!!K(e,"Horario")?.closest("main")},{label:"«el envío es gratis» va en `<strong>`",test:e=>e.all("strong").some(a=>e.loose(a).includes("envio es gratis"))},{label:"El horario va en un solo párrafo partido con `<br>`",test:e=>!!K(e,"Horario")?.querySelector("p br")&&I(K(e,"Horario")?.querySelector("p")?.textContent??"").includes("sabados")},{label:"El pie tiene la dirección y el teléfono",test:e=>e.loose("footer").includes("flores, 3")&&e.loose("footer").includes("944 000 000")},{label:"Sin errores en el código",test:e=>e.htmlErrors()===0}],why:"Esto ya es un ejercicio de examen en pequeño: leer el encargo, sacar las zonas, escribir el esqueleto de memoria y poner cada texto en su etiqueta. Con el CSS hecho por otro, se nota lo que vale una buena estructura."}]};function sa(e,a="nav a"){return e.all(a).map(n=>{const t=n.getAttribute("href")??"";return{a:n,href:t,ok:t.startsWith("#")&&t.length>1&&!!e.doc.getElementById(decodeURIComponent(t.slice(1)))}})}const dn=(e,a)=>e.count("nav > ul")===1&&e.count("nav > ul > li")===a&&e.all("nav > ul > li").every(n=>n.children.length===1&&n.children[0].tagName==="A")&&e.all("nav > ul").every(n=>[...n.children].every(t=>t.tagName==="LI")),ka=fo.map(e=>`\`img/${e}\``).join(", "),ra=`body {
  margin: 0;
  font-family: sans-serif;
}

header {
  background: #1d3557;
  color: white;
  padding: 12px 16px;
}

nav ul {
  list-style: none;
  padding: 0;
  display: flex;
  gap: 16px;
}

nav a {
  color: white;
}

section {
  padding: 8px 16px;
}
`,ut=`body {
  margin: 0;
  font-family: Georgia, serif;
  background: #fff7f9;
  color: #3b2a30;
}

header {
  background: #b8336a;
  color: white;
  padding: 12px 16px;
}

header img {
  vertical-align: middle;
}

header h1 {
  display: inline;
  margin-left: 12px;
}

nav ul {
  list-style: none;
  padding: 0;
  display: flex;
  flex-wrap: wrap;
  gap: 16px;
}

nav a {
  color: white;
}

main {
  padding: 0 16px;
}

h2 {
  color: #b8336a;
}

figure {
  display: inline-block;
  margin: 0 12px 12px 0;
}

figure img {
  width: 200px;
  height: auto;
}

footer {
  background: #3b2a30;
  color: white;
  padding: 12px 16px;
}
`,os={n:2,intro:"Ya sabes montar las zonas. Ahora las llenas: listas, enlaces, imágenes y, sobre todo, el menú de navegación, que lo piden en casi todos los enunciados y siempre se escribe igual.",lessons:[{id:"listas",title:"Listas",summary:"ul, ol y li, y listas dentro de listas",steps:[{text:p("Hay dos listas, y las dos llevan cada elemento en un `<li>` (de *list item*):","- `<ul>`: lista **sin orden**, con puntos. Para cosas donde el orden da igual: productos, servicios, ingredientes.","- `<ol>`: lista **ordenada**, con números. Para pasos que van en orden: una receta, cómo hacer un pedido, un ranking.","","Dentro de `<ul>` y `<ol>` solo puede haber `<li>`. El texto suelto va dentro de un `<li>`."),code:{html:`<h2>Ingredientes</h2>
<ul>
  <li>Harina</li>
  <li>Huevos</li>
  <li>Azúcar</li>
</ul>

<h2>Preparación</h2>
<ol>
  <li>Bate los huevos con el azúcar.</li>
  <li>Añade la harina poco a poco.</li>
  <li>Hornea 30 minutos.</li>
</ol>`}},{text:"Una lista puede ir **dentro de un `<li>`** de otra, para hacer sublistas. La sublista va dentro del `<li>`, antes de su `</li>`, no suelta entre dos `<li>`.",code:{html:`<ul>
  <li>Tartas
    <ul>
      <li>De queso</li>
      <li>De chocolate</li>
    </ul>
  </li>
  <li>Galletas</li>
</ul>`},try:{task:"Cambia el `<ul>` de fuera por `<ol>` y mira cómo cambian los puntos por números. Después añade una tercera tarta a la sublista.",html:`<ul>
  <li>Tartas
    <ul>
      <li>De queso</li>
      <li>De chocolate</li>
    </ul>
  </li>
  <li>Galletas</li>
</ul>
`,css:"",tabs:["html"]}},{check:{question:"El cliente quiere explicar «cómo hacer un pedido en tres pasos». ¿Qué lista usas?",options:["`<ol>`, porque los pasos van en orden","`<ul>`, porque son varias cosas","Tres `<p>` con un número delante","Tres `<h3>`"],why:"Si el orden importa, `<ol>`: el navegador numera solo y, si añades un paso en medio, se renumera."}}],recap:["`<ul>`: sin orden (puntos). `<ol>`: en orden (números).","Cada elemento en su `<li>`; dentro de `<ul>`/`<ol>` solo hay `<li>`.","Una sublista va dentro de un `<li>`, antes de su `</li>`."]},{id:"enlaces",title:"Enlaces",summary:"a href: otra página, otra web, un apartado, el correo y el teléfono",steps:[{text:p('Un enlace es `<a href="adónde">texto que se pulsa</a>`. Lo importante es el `href`:',"- `contacto.html`: otra página **de tu web** (ruta relativa: el archivo está en la misma carpeta).","- `https://www.instagram.com`: **otra web**. Siempre con `https://` delante; sin él, el navegador lo busca en tu carpeta.",'- `#horario`: un **apartado de la misma página**, el que tenga `id="horario"`.',"- `mailto:hola@dulce.es`: abre el **correo** para escribir a esa dirección.","- `tel:+34944000000`: **llama** a ese teléfono (en el móvil)."),code:{html:`<a href="contacto.html">Contacto</a>
<a href="https://www.instagram.com" target="_blank">Instagram</a>
<a href="#horario">Ver el horario</a>
<a href="mailto:hola@dulce.es">hola@dulce.es</a>
<a href="tel:+34944000000">944 000 000</a>`}},{text:p('`target="_blank"` abre el enlace en **otra pestaña**. Se usa para las webs de fuera (redes sociales, mapas) para que la tuya siga abierta.',"","Para enlazar a un apartado, ponle un `id` a su etiqueta y en el enlace escribe ese mismo nombre con `#` delante. El `id` va sin `#`; el `href`, con `#`."),code:{html:`<a href="#horario">Horario</a>

<!-- … más abajo … -->

<section id="horario">
  <h2>Horario</h2>
</section>`},try:{task:'Pulsa el enlace en la página: baja al horario. Ahora cambia `id="horario"` por `id="horarios"` y vuelve a pulsar: ya no funciona. Debajo del editor no sale ningún aviso, así que tienes que fijarte tú.',html:`<p><a href="#horario">Ir al horario</a></p>
<p style="height: 600px">(Mucho texto…)</p>
<section id="horario">
  <h2>Horario</h2>
  <p>De 9:00 a 14:00.</p>
</section>
`,css:"",tabs:["html"]},exam:'Las webs de una sola página con un menú que baja a cada apartado (`#productos`, `#contacto`…) caen mucho. Revisa que cada `href="#algo"` tenga su `id="algo"` escrito igual.'},{check:{task:"Une cada `href` con adónde lleva.",pairs:[['`href="carta.html"`',"Otra página de tu web"],['`href="https://maps.google.com"`',"Otra web"],['`href="#contacto"`',"Un apartado de la misma página"],['`href="mailto:info@bar.es"`',"Escribir un correo"],['`href="tel:+34600000000"`',"Llamar por teléfono"]],why:"Lo que hay delante decide: nada (archivo de tu carpeta), `https://` (otra web), `#` (un id de la página), `mailto:` (correo) y `tel:` (teléfono)."}}],recap:['`<a href="…">texto</a>`: el texto es lo que se pulsa.',"Relativo (`contacto.html`) para tu web; `https://…` para otras webs.","`#id` lleva al apartado con ese `id` (el id sin `#`).","`mailto:` abre el correo; `tel:` llama.",'`target="_blank"` abre en otra pestaña.']},{id:"imagenes",title:"Imágenes y rutas",summary:"img con src y alt, carpetas, figure y figcaption",steps:[{text:p('Una imagen es `<img src="…" alt="…">`. Es una etiqueta vacía: no se cierra.',"- `src`: dónde está el archivo de la imagen.","- `alt`: qué se ve en ella, en palabras. Lo lee quien no ve la imagen (personas ciegas, buscadores, o si la imagen no carga). **Ponlo siempre**: casi todos los enunciados lo piden.","","`width` y `height` dan el tamaño en píxeles (sin escribir `px`), aunque lo normal es darlo con CSS."),code:{html:'<img src="img/tarta.svg" alt="Tarta de chocolate con fresas" width="200">'}},{text:p("La **ruta** del `src` se cuenta desde la carpeta donde está `index.html`:","- `foto.jpg`: en la misma carpeta.","- `img/foto.jpg`: dentro de la carpeta `img`.","- `../foto.jpg`: en la carpeta de arriba.","","Tiene que coincidir **letra a letra**: `Foto.JPG` no es `foto.jpg` en un servidor, y `.jpg` no es `.png`. Si falla, sale el icono de imagen rota y el texto del `alt`."),try:{task:`En la carpeta \`img/\` tienes: ${ka}. La galleta no sale: arregla su ruta mirando el aviso de debajo. Después añade la imagen del cruasán con su \`alt\`.`,html:`<img src="img/tarta.svg" alt="Tarta de chocolate" width="160">
<img src="imagenes/galletas.png" alt="Galletas con pepitas" width="160">
`,css:"",tabs:["html"]}},{text:p("Si la imagen lleva un pie de foto, se envuelve en `<figure>` con un `<figcaption>`.","","Y una imagen puede ser un enlace: se mete el `<img>` dentro del `<a>`. Es lo típico con el logo, que lleva a la página de inicio."),code:{html:`<figure>
  <img src="img/galletas.svg" alt="Galletas con pepitas de chocolate">
  <figcaption>Galletas recién horneadas</figcaption>
</figure>

<a href="index.html">
  <img src="img/logo.svg" alt="Logo de Dulce, ir al inicio">
</a>`},exam:"Si en el examen te dan las imágenes en una carpeta, copia el nombre exacto del archivo (con su extensión) y no te olvides del `alt`."},{check:{question:"`index.html` está en la carpeta `web` y la foto en `web/img/local.jpg`. ¿Qué pones en `src`?",options:["`img/local.jpg`","`web/img/local.jpg`","`/local.jpg`","`local.jpg`"],why:"La ruta se cuenta desde donde está `index.html` (la carpeta `web`), así que basta con entrar en `img`."}}],recap:['`<img src="ruta" alt="descripción">`, sin cierre.',"El `alt` siempre: describe la imagen.","La ruta se cuenta desde `index.html`: `img/foto.jpg`, `../foto.jpg`.","Nombre y extensión exactos.","Con pie de foto: `<figure>` + `<figcaption>`. Imagen que es enlace: `<a><img></a>`."]},{id:"menu",title:"El menú de navegación",summary:"nav > ul > li > a, siempre igual",steps:[{text:p("Un menú es una **lista de enlaces**, y se escribe siempre igual:","- `<nav>` lo envuelve todo (dice «esto es la navegación»);","- dentro, un `<ul>`;","- cada opción en su `<li>`;","- y dentro de cada `<li>`, el enlace `<a>`.","","Por defecto sale como una lista hacia abajo con puntos. Ponerlo en horizontal es cosa del CSS (lo verás en el mundo 7)."),code:{html:`<header>
  <h1>Pastelería Dulce</h1>
  <nav>
    <ul>
      <li><a href="#productos">Productos</a></li>
      <li><a href="#encargos">Encargos</a></li>
      <li><a href="#contacto">Contacto</a></li>
    </ul>
  </nav>
</header>`},exam:"Si el enunciado dice «menú», escribe esta estructura aunque no lo pida tal cual. Un menú hecho con `<p>` o con enlaces sueltos suele restar."},{text:"Aquí el CSS ya pone el menú en horizontal, para que lo veas como en una web de verdad.",try:{task:'Añade una cuarta opción «Opiniones» que lleve a `#opiniones`, y crea debajo su `<section id="opiniones">` con un `<h2>`. Pulsa el enlace para probarlo.',html:H("Pastelería Dulce",`    <header>
      <h1>Pastelería Dulce</h1>
      <nav>
        <ul>
          <li><a href="#productos">Productos</a></li>
          <li><a href="#contacto">Contacto</a></li>
        </ul>
      </nav>
    </header>

    <section id="productos">
      <h2>Productos</h2>
      <p>Tartas, galletas y cruasanes.</p>
    </section>

    <section id="contacto">
      <h2>Contacto</h2>
      <p>Calle Mayor, 8.</p>
    </section>`),css:ra,tabs:["html"]}},{check:{question:"¿Cuál es la estructura correcta de un menú?",options:['`<nav><ul><li><a href="#">Inicio</a></li></ul></nav>`','`<nav><li><a href="#">Inicio</a></li></nav>`','`<ul><nav><a href="#">Inicio</a></nav></ul>`','`<nav><ul><a href="#"><li>Inicio</li></a></ul></nav>`'],why:"nav > ul > li > a. Un `<li>` siempre va dentro de un `<ul>` u `<ol>`, y dentro de una lista solo hay `<li>`."}}],recap:["Menú = `<nav>` > `<ul>` > `<li>` > `<a>`.","Suele ir dentro del `<header>`.",'Cada `href="#algo"` necesita su `id="algo"`.',"En horizontal, con CSS (mundo 7)."]}],challenges:[{kind:"quiz",id:"que-lista",title:"¿Qué lista?",question:"Una heladería quiere enseñar sus sabores: vainilla, fresa, limón y chocolate. ¿Qué usas?",options:["`<ul>` con un `<li>` por sabor","`<ol>` con un `<li>` por sabor","Un `<p>` con los sabores separados por comas","Un `<nav>` con los sabores"],why:"Los sabores no tienen orden: lista sin orden, `<ul>`. `<ol>` es para pasos o rankings y `<nav>` solo para menús de enlaces."},{kind:"code",id:"listas-receta",title:"La receta",tabs:["html"],brief:p("Un blog de cocina quiere su receta de bizcocho. Dentro del `<body>`:","- un `<h1>` «Bizcocho de yogur»;","- un `<h2>` «Ingredientes» y debajo una lista **sin orden** con: 1 yogur, 3 huevos, 200 g de harina;","- un `<h2>` «Pasos» y debajo una lista **ordenada** con: Batir los huevos, Añadir el yogur y la harina, Hornear 35 minutos."),start:{html:H("Bizcocho de yogur","    <!-- Escribe aquí la receta -->"),css:""},solution:{html:H("Bizcocho de yogur",`    <h1>Bizcocho de yogur</h1>

    <h2>Ingredientes</h2>
    <ul>
      <li>1 yogur</li>
      <li>3 huevos</li>
      <li>200 g de harina</li>
    </ul>

    <h2>Pasos</h2>
    <ol>
      <li>Batir los huevos</li>
      <li>Añadir el yogur y la harina</li>
      <li>Hornear 35 minutos</li>
    </ol>`),css:""},checks:[{label:"Un `<h1>` «Bizcocho de yogur»",test:e=>e.loose("h1")==="bizcocho de yogur"},{label:"Los ingredientes en un `<ul>` con 3 `<li>`",test:e=>e.count("ul")===1&&e.count("ul > li")===3&&e.loose("ul").includes("harina")},{label:"Los pasos en un `<ol>` con 3 `<li>`",test:e=>e.count("ol")===1&&e.count("ol > li")===3&&e.loose("ol").includes("hornear")},{label:"Cada lista va después de su `<h2>`",test:e=>e.q("ul")?.previousElementSibling?.tagName==="H2"&&e.q("ol")?.previousElementSibling?.tagName==="H2"},{label:"Sin errores en el código",test:e=>e.htmlErrors()===0}],why:"Ingredientes sin orden (`<ul>`) y pasos en orden (`<ol>`): es la diferencia que suelen preguntar. Y cada elemento, en su `<li>`."},{kind:"match",id:"adonde-lleva",title:"¿Adónde lleva?",task:"Une cada enlace con lo que pasa al pulsarlo.",pairs:[['`<a href="menu.html">`',"Abre otra página de la misma web"],['`<a href="#reservas">`','Baja al apartado con id="reservas"'],['`<a href="https://www.tripadvisor.es" target="_blank">`',"Abre otra web en una pestaña nueva"],['`<a href="mailto:reservas@bar.es">`',"Abre el correo para escribir"],['`<a href="tel:+34944000000">`',"Llama por teléfono"]],why:"Fíjate en lo que va delante del `href`: es lo que decide adónde lleva el enlace."},{kind:"code",id:"contacto",title:"Los datos de contacto",tabs:["html"],brief:p("El taller de bicis quiere que en el pie se pueda contactar con un toque. Dentro del `<footer>` que ya está hecho:","- un enlace que abra el correo a `info@ruedas.es` (que se lea la dirección);","- un enlace que llame al `+34944000000` (que se lea «944 000 000»);","- un enlace a `https://www.instagram.com/tallerruedas` que diga «Instagram» y se abra en otra pestaña."),start:{html:H("Taller Ruedas",`    <h1>Taller Ruedas</h1>

    <footer>
      <!-- Los enlaces de contacto -->
    </footer>`),css:""},solution:{html:H("Taller Ruedas",`    <h1>Taller Ruedas</h1>

    <footer>
      <p><a href="mailto:info@ruedas.es">info@ruedas.es</a></p>
      <p><a href="tel:+34944000000">944 000 000</a></p>
      <p><a href="https://www.instagram.com/tallerruedas" target="_blank">Instagram</a></p>
    </footer>`),css:""},checks:[{label:"Enlace de correo a info@ruedas.es, en el pie",test:e=>e.all("footer a").some(a=>a.getAttribute("href")?.trim().toLowerCase()==="mailto:info@ruedas.es"&&I(a.textContent??"").includes("info@ruedas.es"))},{label:"Enlace de teléfono al +34944000000 que se lee «944 000 000»",test:e=>e.all("footer a").some(a=>a.getAttribute("href")?.replace(/\s/g,"")==="tel:+34944000000"&&I(a.textContent??"").includes("944 000 000"))},{label:"Enlace «Instagram» a la dirección completa, con https://",test:e=>e.all("footer a").some(a=>a.getAttribute("href")?.trim()==="https://www.instagram.com/tallerruedas"&&I(a.textContent??"")==="instagram")},{label:"Instagram se abre en otra pestaña",test:e=>e.all('footer a[href*="instagram"]').some(a=>a.getAttribute("target")==="_blank"),hint:'`target="_blank"`'},{label:"Sin errores en el código",test:e=>e.htmlErrors()===0}],why:'`mailto:` y `tel:` delante de la dirección y del número, `https://` delante de otra web y `target="_blank"` para no sacar a la persona de tu página.'},{kind:"code",id:"galeria",title:"La galería",tabs:["html"],brief:p(`La pastelería quiere una galería con dos productos. En la carpeta \`img/\` tienes: ${ka}.`,"","En el apartado «Galería», pon la **tarta** y las **galletas**, cada una con:","- una descripción en el `alt`;","- un pie de foto: «Tarta de chocolate» y «Galletas caseras»."),start:{html:H("Pastelería Dulce",`    <section>
      <h2>Galería</h2>
      <!-- Las dos fotos con su pie -->
    </section>`),css:`figure img {
  width: 200px;
}
`},solution:{html:H("Pastelería Dulce",`    <section>
      <h2>Galería</h2>
      <figure>
        <img src="img/tarta.svg" alt="Tarta de chocolate con fresas">
        <figcaption>Tarta de chocolate</figcaption>
      </figure>
      <figure>
        <img src="img/galletas.svg" alt="Galletas con pepitas de chocolate">
        <figcaption>Galletas caseras</figcaption>
      </figure>
    </section>`),css:`figure img {
  width: 200px;
}
`},checks:[{label:"Dos `<figure>`, cada una con su `<img>` y su `<figcaption>`",test:e=>e.count("figure")===2&&e.all("figure").every(a=>!!a.querySelector("img")&&!!a.querySelector("figcaption"))},{label:"La tarta y las galletas se ven (rutas bien escritas)",test:e=>e.all("figure img").filter(we).map(a=>a.getAttribute("src").replace(/^\.\//,"")).sort().join()==="img/galletas.svg,img/tarta.svg",hint:"Carpeta `img/`, nombre exacto y extensión `.svg`."},{label:"Las dos imágenes tienen un `alt` que las describe",test:e=>e.all("figure img").length===2&&e.all("figure img").every(a=>(a.getAttribute("alt")??"").trim().length>=4)},{label:"Los pies dicen «Tarta de chocolate» y «Galletas caseras»",test:e=>e.all("figcaption").map(a=>e.loose(a)).sort().join("|")==="galletas caseras|tarta de chocolate"},{label:"Sin errores en el código",test:e=>e.htmlErrors()===0}],why:"Tres cosas que se corrigen siempre en una imagen: que la ruta funcione, que tenga `alt` y, si hay pie de foto, que vaya en `<figure>` con `<figcaption>`."},{kind:"quiz",id:"alt",title:"El alt",question:"¿Para qué sirve el atributo `alt` de una imagen?",options:["Describe la imagen para quien no la puede ver o si no carga","Es el título que sale encima de la imagen","Dice la carpeta donde está la imagen","Cambia el tamaño de la imagen"],why:"El `alt` es el texto alternativo: lo leen los lectores de pantalla y los buscadores, y sale si la imagen no carga. La ruta va en `src` y el tamaño en `width`/`height` o en el CSS."},{kind:"code",id:"menu",title:"El menú de la academia",tabs:["html"],brief:p("La academia Ritmo quiere una web de una sola página con un menú que baje a cada apartado. Ya están los apartados, pero les faltan sus `id`. En la cabecera, debajo del `<h1>`:","- un menú con tres opciones: **Clases**, **Horario** y **Contacto**;","- cada una baja a su apartado (pon los `id` que necesites a los `<section>`).","","Pruébalo pulsando los enlaces en la página."),start:{html:H("Academia Ritmo",`    <header>
      <h1>Academia Ritmo</h1>
      <!-- El menú -->
    </header>

    <section>
      <h2>Clases</h2>
      <p>Salsa, bachata y hip hop.</p>
    </section>

    <section>
      <h2>Horario</h2>
      <p>De lunes a jueves, de 17:00 a 21:00.</p>
    </section>

    <section>
      <h2>Contacto</h2>
      <p>Avenida del Puerto, 12.</p>
    </section>`),css:ra},solution:{html:H("Academia Ritmo",`    <header>
      <h1>Academia Ritmo</h1>
      <nav>
        <ul>
          <li><a href="#clases">Clases</a></li>
          <li><a href="#horario">Horario</a></li>
          <li><a href="#contacto">Contacto</a></li>
        </ul>
      </nav>
    </header>

    <section id="clases">
      <h2>Clases</h2>
      <p>Salsa, bachata y hip hop.</p>
    </section>

    <section id="horario">
      <h2>Horario</h2>
      <p>De lunes a jueves, de 17:00 a 21:00.</p>
    </section>

    <section id="contacto">
      <h2>Contacto</h2>
      <p>Avenida del Puerto, 12.</p>
    </section>`),css:ra},checks:[{label:"Un `<nav>` dentro del `<header>`",test:e=>e.count("nav")===1&&e.has("header nav")},{label:"Estructura nav > ul > li > a con 3 opciones",test:e=>dn(e,3),hint:"Dentro del `<ul>` solo `<li>`, y en cada `<li>` un `<a>`."},{label:"Las opciones dicen Clases, Horario y Contacto, en ese orden",test:e=>e.all("nav a").map(a=>e.loose(a)).join("|")==="clases|horario|contacto"},{label:'Cada enlace baja a su apartado (href="#…" con su id)',test:e=>{const a=sa(e);return a.length===3&&a.every(n=>n.ok&&I(e.doc.getElementById(n.href.slice(1))?.querySelector("h2")?.textContent??"")===e.loose(n.a))},hint:"El `id` va en el `<section>`, sin `#`; el `href`, con `#`. Escritos igual."},{label:"Sin errores en el código",test:e=>e.htmlErrors()===0}],why:'Este menú lo vas a escribir en el examen casi seguro: `nav > ul > li > a`, con cada `href="#id"` emparejado con el `id` de su apartado.'},{kind:"code",id:"arregla-menu",title:"El menú roto",tabs:["html"],brief:p("Este menú de la pastelería tiene **cuatro fallos**: el logo no sale, uno de los enlaces no baja a su apartado, otro no lleva a ningún sitio y la lista tiene algo que no es un `<li>`. Arréglalos.","",`En la carpeta \`img/\` tienes: ${ka}.`),start:{html:H("Pastelería Dulce",`    <header>
      <img src="img/Logo.png" alt="Logo de la Pastelería Dulce" width="60">
      <nav>
        <ul>
          <li><a href="#productos">Productos</a></li>
          <a href="#encargos">Encargos</a>
          <li><a>Contacto</a></li>
        </ul>
      </nav>
    </header>

    <section id="producto">
      <h2>Productos</h2>
    </section>

    <section id="encargos">
      <h2>Encargos</h2>
    </section>

    <section id="contacto">
      <h2>Contacto</h2>
    </section>`),css:ra},solution:{html:H("Pastelería Dulce",`    <header>
      <img src="img/logo.svg" alt="Logo de la Pastelería Dulce" width="60">
      <nav>
        <ul>
          <li><a href="#productos">Productos</a></li>
          <li><a href="#encargos">Encargos</a></li>
          <li><a href="#contacto">Contacto</a></li>
        </ul>
      </nav>
    </header>

    <section id="productos">
      <h2>Productos</h2>
    </section>

    <section id="encargos">
      <h2>Encargos</h2>
    </section>

    <section id="contacto">
      <h2>Contacto</h2>
    </section>`),css:ra},checks:[{label:"El logo se ve",test:e=>we(e.q("header img")),hint:"Mira el aviso de debajo del editor: el nombre y la extensión tienen que ser exactos."},{label:"Dentro del `<ul>` solo hay `<li>`",test:e=>dn(e,3)},{label:"Los tres enlaces bajan a su apartado",test:e=>sa(e).length===3&&sa(e).every(a=>a.ok),hint:"Compara cada `href` con el `id` de su `<section>`, letra a letra."},{label:"Sin errores en el código",test:e=>e.htmlErrors()===0}],why:"Una imagen con el nombre mal, un `href` que no coincide con su `id`, un enlace sin `href` y algo suelto en la lista: ninguno da error en el navegador, por eso hay que repasarlos a mano."},{kind:"code",id:"pasteleria",title:"Encargo: la pastelería",brief:p("**Pastelería Dulce** te escribe:","","«Queremos una web de una sola página. Arriba, nuestro logo (si se pulsa, vuelve al inicio, `index.html`), el nombre “Pastelería Dulce” y un menú con Productos, Encargos y Contacto que baje a cada apartado. En Productos, una lista con Tartas, Galletas y Cruasanes, y debajo las fotos de la tarta y del cruasán con su pie. En Encargos, los pasos para encargar, en orden: Elige tu tarta, Llámanos o escríbenos y Recógela en la tienda. En Contacto, nuestro correo hola@dulce.es y el teléfono 944 000 000, que se puedan pulsar, y un enlace a nuestro Instagram (https://www.instagram.com/pasteleriadulce) que se abra aparte. Abajo, “© 2026 Pastelería Dulce”.»","",`Las imágenes están en \`img/\`: ${ka}. El CSS ya está hecho; tú escribes \`index.html\` entero.`),start:{html:"",css:ut},solution:{html:H("Pastelería Dulce",`    <header>
      <a href="index.html"><img src="img/logo.svg" alt="Logo de Pastelería Dulce" width="60"></a>
      <h1>Pastelería Dulce</h1>
      <nav>
        <ul>
          <li><a href="#productos">Productos</a></li>
          <li><a href="#encargos">Encargos</a></li>
          <li><a href="#contacto">Contacto</a></li>
        </ul>
      </nav>
    </header>

    <main>
      <section id="productos">
        <h2>Productos</h2>
        <ul>
          <li>Tartas</li>
          <li>Galletas</li>
          <li>Cruasanes</li>
        </ul>
        <figure>
          <img src="img/tarta.svg" alt="Tarta de chocolate con fresas">
          <figcaption>Nuestra tarta de chocolate</figcaption>
        </figure>
        <figure>
          <img src="img/cruasan.svg" alt="Cruasán de mantequilla">
          <figcaption>Cruasán de mantequilla</figcaption>
        </figure>
      </section>

      <section id="encargos">
        <h2>Encargos</h2>
        <ol>
          <li>Elige tu tarta</li>
          <li>Llámanos o escríbenos</li>
          <li>Recógela en la tienda</li>
        </ol>
      </section>

      <section id="contacto">
        <h2>Contacto</h2>
        <p><a href="mailto:hola@dulce.es">hola@dulce.es</a></p>
        <p><a href="tel:+34944000000">944 000 000</a></p>
        <p><a href="https://www.instagram.com/pasteleriadulce" target="_blank">Instagram</a></p>
      </section>
    </main>

    <footer>
      <p>&copy; 2026 Pastelería Dulce</p>
    </footer>`),css:ut},checks:[{label:"Esqueleto completo, título en la pestaña y CSS enlazado",test:e=>je(e)&&I(e.doc.title).includes("pasteleria dulce")&&e.linked&&ge(e,"stylesheet")},{label:"Cabecera: el logo se ve, tiene `alt` y es un enlace a index.html",test:e=>we(e.q("header img"))&&!!e.attr("header img","alt")&&e.q("header img")?.closest("a")?.getAttribute("href")==="index.html"},{label:"Cabecera: `<h1>` «Pastelería Dulce»",test:e=>e.loose("header h1")==="pasteleria dulce"},{label:"Menú nav > ul > li > a con Productos, Encargos y Contacto",test:e=>e.has("header nav")&&dn(e,3)&&e.all("nav a").map(a=>e.loose(a)).join("|")==="productos|encargos|contacto"},{label:"Cada opción del menú baja a su apartado",test:e=>sa(e).length===3&&sa(e).every(a=>a.ok)},{label:"Productos: lista sin orden con los 3 productos",test:e=>(K(e,"Productos")?.querySelectorAll("ul > li").length??0)===3},{label:"Productos: tarta y cruasán con `alt` y pie de foto",test:e=>{const a=[...K(e,"Productos")?.querySelectorAll("figure")??[]];return a.length===2&&a.every(n=>we(n.querySelector("img"))&&(n.querySelector("img")?.getAttribute("alt")??"").trim().length>=4&&!!n.querySelector("figcaption")?.textContent?.trim())&&a.map(n=>n.querySelector("img").getAttribute("src")).sort().join()==="img/cruasan.svg,img/tarta.svg"}},{label:"Encargos: los 3 pasos en una lista ordenada",test:e=>(K(e,"Encargos")?.querySelectorAll("ol > li").length??0)===3&&I(K(e,"Encargos")?.querySelector("ol")?.textContent??"").includes("recogela")},{label:"Contacto: correo y teléfono que se pueden pulsar",test:e=>{const a=K(e,"Contacto");return!!a?.querySelector('a[href="mailto:hola@dulce.es"]')&&[...a?.querySelectorAll('a[href^="tel:"]')??[]].some(n=>n.getAttribute("href").replace(/\s/g,"").endsWith("944000000"))}},{label:"Contacto: Instagram en otra pestaña",test:e=>!!K(e,"Contacto")?.querySelector('a[href="https://www.instagram.com/pasteleriadulce"][target="_blank"]')},{label:"Pie con «© 2026 Pastelería Dulce»",test:e=>e.loose("footer").includes("© 2026 pasteleria dulce")},{label:"Sin errores en el código",test:e=>e.htmlErrors()===0}],why:"Ya es un examen de verdad en pequeño: esqueleto, cabecera con logo y menú, apartados con sus `id`, listas, imágenes con `alt`, enlaces de contacto y pie. Si te ha salido, repítelo otro día sin mirar."}]};function ls(e){if(!e)return[];const a=[...e.querySelectorAll("tr")].filter(t=>t.closest("table")===e),n=a.map(()=>[]);return a.map((t,o)=>{let l=0;for(const s of[...t.children].filter(r=>r.tagName==="TD"||r.tagName==="TH")){for(;n[o][l];)l++;const r=Math.max(1,Number(s.getAttribute("colspan"))||1),c=Math.max(1,Number(s.getAttribute("rowspan"))||1);for(let i=0;i<c&&o+i<a.length;i++)for(let d=0;d<r;d++)n[o+i][l+d]=!0;l+=r}return n[o].length})}const Be=(e,a)=>{const n=ls(e);return n.length>0&&n.every(t=>t===a)},ie=e=>[...e?.children??[]].map(a=>I(a.textContent??"")),pt=(e,a)=>e.all("td, th").find(n=>e.loose(n)===I(a))??null,ye=`body {
  font-family: sans-serif;
}

table {
  border-collapse: collapse;
}

th, td {
  border: 1px solid #8a8270;
  padding: 6px 10px;
}

th {
  background: #f3ede1;
}

caption {
  font-weight: bold;
  padding: 6px;
}
`,mt=`body {
  margin: 0;
  font-family: sans-serif;
  color: #1d1b16;
}

header {
  background: #14532d;
  color: white;
  padding: 12px 16px;
}

header h1 {
  margin: 0;
}

main {
  padding: 0 16px 16px;
}

table {
  border-collapse: collapse;
  width: 100%;
  max-width: 640px;
}

caption {
  font-weight: bold;
  padding: 8px;
}

th, td {
  border: 1px solid #a3b8a8;
  padding: 6px 8px;
  text-align: center;
}

thead th {
  background: #14532d;
  color: white;
}

tfoot td {
  background: #e7f2ea;
  font-style: italic;
}

footer {
  padding: 12px 16px;
  background: #e7f2ea;
}
`,ss={n:3,intro:"Las tablas son para datos en filas y columnas: precios, horarios, notas. Se escriben fila a fila, y lo que más cae en los exámenes son las celdas que se juntan. Con el truco de contar columnas no se te escapará ninguna.",lessons:[{id:"filas",title:"Filas y celdas",summary:"table, tr, td, th y caption",steps:[{text:p("Una tabla se escribe **fila a fila**, de arriba abajo, y cada fila celda a celda, de izquierda a derecha:","- `<table>`: la tabla entera.","- `<tr>`: una fila (*table row*).","- `<td>`: una celda de datos (*table data*).","- `<th>`: una celda de **cabecera** (sale en negrita y centrada). Para los títulos de las columnas o de las filas.","- `<caption>`: el título de la tabla. Va justo después de `<table>`.","","No hay etiqueta de columna: las columnas salen solas de poner el mismo número de celdas en cada fila."),code:{html:`<table>
  <caption>Precios</caption>
  <tr>
    <th>Producto</th>
    <th>Precio</th>
  </tr>
  <tr>
    <td>Tarta</td>
    <td>18 €</td>
  </tr>
  <tr>
    <td>Galletas</td>
    <td>4 €</td>
  </tr>
</table>`}},{text:"Sin CSS, una tabla no tiene rayas. Aquí el CSS les pone borde para que veas las celdas.",try:{task:"Añade una fila con «Cruasán» y «1,50 €». Después añade una tercera columna «Sin gluten»: una celda `<th>` más en la primera fila y una `<td>` más en cada una de las otras.",html:`<table>
  <caption>Precios</caption>
  <tr>
    <th>Producto</th>
    <th>Precio</th>
  </tr>
  <tr>
    <td>Tarta</td>
    <td>18 €</td>
  </tr>
  <tr>
    <td>Galletas</td>
    <td>4 €</td>
  </tr>
</table>
`,css:ye,tabs:["html"]},exam:"Cuenta las celdas de cada fila: todas tienen que sumar lo mismo. Si a una le falta o le sobra una, la tabla sale descolocada."},{check:{task:"Une cada etiqueta con lo que es.",pairs:[["`<tr>`","Una fila"],["`<td>`","Una celda de datos"],["`<th>`","Una celda de cabecera"],["`<caption>`","El título de la tabla"]],why:"Fila (`tr`), celdas dentro de la fila (`td` para datos y `th` para cabeceras) y `caption` como título. Las columnas no tienen etiqueta."}},{text:p("Las tablas son para **datos en filas y columnas**: precios, horarios, notas, comparativas.","","No se usan para colocar la página (poner el menú a un lado y el texto al otro): eso se hace con CSS (flexbox y grid, mundos 7 y 8).")}],recap:["`<table>` > `<tr>` (fila) > `<td>` o `<th>` (celda).","`<th>` para cabeceras; `<td>` para datos.","`<caption>` justo después de `<table>`.","Todas las filas con el mismo número de celdas.","Tablas solo para datos, no para colocar la página."]},{id:"partes",title:"Cabecera, cuerpo y pie de la tabla",summary:"thead, tbody y tfoot",steps:[{text:p("Las filas se pueden agrupar en tres partes. No cambian cómo se ve (salvo con CSS), pero dejan clara la estructura y algunos enunciados las piden:","- `<thead>`: la fila (o filas) de títulos.","- `<tbody>`: las filas de datos.","- `<tfoot>`: el pie: totales, notas.","","Dentro de cada una van `<tr>`, como siempre."),code:{html:`<table>
  <caption>Notas de la evaluación</caption>
  <thead>
    <tr>
      <th>Alumno</th>
      <th>Nota</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>Ane</td>
      <td>8</td>
    </tr>
    <tr>
      <td>Iker</td>
      <td>6</td>
    </tr>
  </tbody>
  <tfoot>
    <tr>
      <td>Media</td>
      <td>7</td>
    </tr>
  </tfoot>
</table>`}},{text:"`<th>` también vale como cabecera de una **fila**, en la primera celda. Así, en un horario, los días van arriba y las horas a la izquierda, todos con `<th>`.",code:{html:`<tr>
  <th>9:00</th>
  <td>Yoga</td>
  <td>Pilates</td>
</tr>`}},{check:{question:"¿Dónde va la fila del «Total» al final de una tabla de precios?",options:["En `<tfoot>`","En `<thead>`","En `<caption>`","Fuera de la tabla, en un `<p>`"],why:"`<tfoot>` es el pie de la tabla: totales, medias, notas. `<thead>` es para los títulos de las columnas."}}],recap:["`<thead>`: títulos. `<tbody>`: datos. `<tfoot>`: totales.","Dentro de cada parte, `<tr>`.","`<th>` vale para cabeceras de columna y de fila."]},{id:"juntar",title:"Juntar celdas",summary:"colspan y rowspan, con el truco de contar",steps:[{text:p("Una celda puede ocupar el sitio de varias:",'- `colspan="2"`: ocupa **dos columnas** (se estira a lo ancho).','- `rowspan="2"`: ocupa **dos filas** (se estira hacia abajo).',"",'El truco: la celda estirada **sustituye** a las que tapa. Si una fila tiene 3 columnas y una celda lleva `colspan="2"`, en esa fila solo escribes 2 celdas: la de colspan cuenta por 2.'),code:{html:`<tr>
  <th>Lunes</th>
  <th>Martes</th>
  <th>Miércoles</th>
</tr>
<tr>
  <td colspan="2">Cerrado</td>
  <td>Abierto</td>
</tr>`}},{text:p("Con `rowspan` pasa lo mismo, pero hacia abajo: la celda ocupa su sitio en las filas de debajo, así que **en esas filas escribes una celda menos**.","","Aquí «Yoga» ocupa el lunes de las 9:00 y de las 10:00, así que la fila de las 10:00 solo lleva la hora y el martes."),code:{html:`<tr>
  <th>Hora</th>
  <th>Lunes</th>
  <th>Martes</th>
</tr>
<tr>
  <th>9:00</th>
  <td rowspan="2">Yoga</td>
  <td>Pilates</td>
</tr>
<tr>
  <th>10:00</th>
  <td>Zumba</td>
</tr>`},try:{task:'Haz que «Pilates» ocupe también las 10:00 (`rowspan="2"`) y quita la celda que sobra en la fila de las 10:00. Si te sale una columna de más, es que no la has quitado.',html:`<table>
  <tr>
    <th>Hora</th>
    <th>Lunes</th>
    <th>Martes</th>
  </tr>
  <tr>
    <th>9:00</th>
    <td rowspan="2">Yoga</td>
    <td>Pilates</td>
  </tr>
  <tr>
    <th>10:00</th>
    <td>Zumba</td>
  </tr>
</table>
`,css:ye,tabs:["html"]},exam:"Dibuja la tabla en un papel con su cuadrícula, marca las celdas grandes y cuenta: en cada fila, las celdas que escribes + las que ya ocupan las de arriba con rowspan + lo que suman los colspan = el número de columnas."},{check:{question:'Una tabla tiene 4 columnas. En una fila pones `<td colspan="3">Cerrado</td>`. ¿Cuántas celdas `<td>` más escribes en esa fila?',options:["1","3","0","4"],why:'La celda con colspan="3" cuenta por 3 columnas: 4 - 3 = 1 celda más.'}},{check:{question:'En la fila 1, la primera celda lleva `rowspan="3"`. La tabla tiene 3 columnas. ¿Cuántas celdas escribes en la fila 2?',options:["2","3","1","0"],why:"La celda de la fila 1 baja hasta la fila 3 y ocupa la primera columna también en la fila 2. Quedan 2 columnas libres: 2 celdas."}}],recap:['`colspan="n"`: ocupa n columnas. `rowspan="n"`: ocupa n filas.',"La celda estirada sustituye a las que tapa: escribe menos celdas.","Con rowspan, quitas la celda en las filas de debajo.","Dibuja la cuadrícula y cuenta columnas en cada fila."]}],challenges:[{kind:"quiz",id:"fila",title:"¿Qué es una fila?",question:"¿Con qué etiqueta empieza cada fila de una tabla?",options:["`<tr>`","`<td>`","`<th>`","`<row>`"],why:"`<tr>` es *table row*, la fila. Dentro van las celdas: `<td>` y `<th>`. `<row>` no existe en HTML."},{kind:"code",id:"precios",title:"La tabla de precios",tabs:["html"],brief:p("La cafetería quiere su lista de precios en una tabla:","- título de la tabla: «Nuestros cafés»;","- una fila de cabecera con «Café» y «Precio»;","- y tres filas: Solo 1,20 €; Cortado 1,40 €; Con leche 1,60 €."),start:{html:H("Cafetería","    <!-- La tabla -->"),css:ye},solution:{html:H("Cafetería",`    <table>
      <caption>Nuestros cafés</caption>
      <tr>
        <th>Café</th>
        <th>Precio</th>
      </tr>
      <tr>
        <td>Solo</td>
        <td>1,20 €</td>
      </tr>
      <tr>
        <td>Cortado</td>
        <td>1,40 €</td>
      </tr>
      <tr>
        <td>Con leche</td>
        <td>1,60 €</td>
      </tr>
    </table>`),css:ye},checks:[{label:"Una tabla con el título «Nuestros cafés» en `<caption>`",test:e=>e.count("table")===1&&e.loose("table > caption")==="nuestros cafes"},{label:"La primera fila son dos `<th>`: Café y Precio",test:e=>{const a=e.q("table tr");return[...a?.children??[]].every(n=>n.tagName==="TH")&&ie(a).join("|")==="cafe|precio"}},{label:"Cuatro filas en total, todas de 2 columnas",test:e=>e.count("table tr")===4&&Be(e.q("table"),2)},{label:"Los datos con `<td>`: Solo 1,20 €; Cortado 1,40 €; Con leche 1,60 €",test:e=>e.all("table tr").slice(1).map(a=>ie(a).join(" ")).join("|")==="solo 1,20 €|cortado 1,40 €|con leche 1,60 €"&&e.count("td")===6},{label:"Sin errores en el código",test:e=>e.htmlErrors()===0}],why:"Fila a fila y celda a celda: `<th>` para los títulos de las columnas y `<td>` para los datos. El título de la tabla, en `<caption>`."},{kind:"match",id:"partes",title:"Las partes de la tabla",task:"Une cada parte con lo que lleva.",pairs:[["`<thead>`","La fila con los títulos de las columnas"],["`<tbody>`","Las filas de datos"],["`<tfoot>`","La fila del total"],["`<caption>`","El título de toda la tabla"]],why:"`thead`, `tbody` y `tfoot` agrupan filas; `caption` es el título y va justo después de `<table>`."},{kind:"quiz",id:"colspan",title:"Una celda ancha",question:"Una tabla tiene 3 columnas y quieres que en la última fila «Total: 25 €» ocupe todo el ancho. ¿Qué escribes en esa fila?",options:['`<tr><td colspan="3">Total: 25 €</td></tr>`','`<tr><td rowspan="3">Total: 25 €</td></tr>`',"`<tr><td>Total: 25 €</td><td></td><td></td></tr>`",'`<tr colspan="3"><td>Total: 25 €</td></tr>`'],why:"A lo ancho es `colspan`, y va en la celda (`td`), no en la fila. Con tres celdas, una con el texto y dos vacías, se verían tres cajas."},{kind:"code",id:"horario",title:"El horario de la biblioteca",tabs:["html"],brief:p("La biblioteca quiere su horario en una tabla con `<thead>` y `<tbody>`:","- cabecera: Día, Mañana, Tarde;","- Lunes: 9:00-14:00 y 16:00-20:00;","- Martes: 9:00-14:00 y 16:00-20:00;","- Sábado: «Cerrado», en **una sola celda que ocupe la mañana y la tarde**."),start:{html:H("Biblioteca",`    <table>
      <caption>Horario</caption>
      <!-- Escribe aquí thead y tbody -->
    </table>`),css:ye},solution:{html:H("Biblioteca",`    <table>
      <caption>Horario</caption>
      <thead>
        <tr>
          <th>Día</th>
          <th>Mañana</th>
          <th>Tarde</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <th>Lunes</th>
          <td>9:00-14:00</td>
          <td>16:00-20:00</td>
        </tr>
        <tr>
          <th>Martes</th>
          <td>9:00-14:00</td>
          <td>16:00-20:00</td>
        </tr>
        <tr>
          <th>Sábado</th>
          <td colspan="2">Cerrado</td>
        </tr>
      </tbody>
    </table>`),css:ye},checks:[{label:"Un `<thead>` con la fila Día, Mañana, Tarde",test:e=>e.count("thead tr")===1&&ie(e.q("thead tr")).join("|")==="dia|manana|tarde"},{label:"Un `<tbody>` con tres filas: Lunes, Martes y Sábado",test:e=>e.all("tbody tr").map(a=>ie(a)[0]).join("|")==="lunes|martes|sabado"},{label:"«Cerrado» ocupa dos columnas",test:e=>pt(e,"Cerrado")?.getAttribute("colspan")==="2"},{label:"Todas las filas ocupan 3 columnas",test:e=>Be(e.q("table"),3),hint:'En la fila del sábado, la celda con colspan="2" ya cuenta por dos.'},{label:"Los horarios del lunes y del martes en sus celdas",test:e=>e.count("tbody tr")>=2&&e.all("tbody tr").slice(0,2).every(a=>ie(a).slice(1).join("|")==="9:00-14:00|16:00-20:00")},{label:"Sin errores en el código",test:e=>e.htmlErrors()===0}],why:'Con `colspan="2"`, «Cerrado» sustituye a las dos celdas de mañana y tarde. Si además escribes otra celda, sale una cuarta columna.'},{kind:"code",id:"rowspan",title:"Las clases del gimnasio",tabs:["html"],brief:p("Completa el horario del gimnasio. La tabla tiene tres columnas (Hora, Lunes y Martes) y ya está la primera fila. Faltan:","- 18:00: el lunes **Spinning, que dura dos horas** (ocupa las 18:00 y las 19:00), y el martes Yoga;","- 19:00: el martes Pilates.","","Las horas van con `<th>` y las clases con `<td>`."),start:{html:H("Gimnasio",`    <table>
      <tr>
        <th>Hora</th>
        <th>Lunes</th>
        <th>Martes</th>
      </tr>
      <!-- Las filas de las 18:00 y las 19:00 -->
    </table>`),css:ye},solution:{html:H("Gimnasio",`    <table>
      <tr>
        <th>Hora</th>
        <th>Lunes</th>
        <th>Martes</th>
      </tr>
      <tr>
        <th>18:00</th>
        <td rowspan="2">Spinning</td>
        <td>Yoga</td>
      </tr>
      <tr>
        <th>19:00</th>
        <td>Pilates</td>
      </tr>
    </table>`),css:ye},checks:[{label:"Tres filas: la de títulos, la de las 18:00 y la de las 19:00",test:e=>e.all("tr").map(a=>ie(a)[0]).join("|")==="hora|18:00|19:00"},{label:"Las horas en `<th>`",test:e=>e.count("tr")===3&&e.all("tr").slice(1).every(a=>a.children[0]?.tagName==="TH")},{label:"«Spinning» ocupa dos filas",test:e=>pt(e,"Spinning")?.getAttribute("rowspan")==="2"},{label:"Yoga el martes a las 18:00 y Pilates el martes a las 19:00",test:e=>{const a=e.all("tr");return ie(a[1]).join("|")==="18:00|spinning|yoga"&&ie(a[2]).join("|")==="19:00|pilates"},hint:"En la fila de las 19:00, el lunes ya lo ocupa Spinning: solo escribes la hora y Pilates."},{label:"Todas las filas ocupan 3 columnas",test:e=>e.count("tr")===3&&Be(e.q("table"),3)},{label:"Sin errores en el código",test:e=>e.htmlErrors()===0}],why:"Con `rowspan`, la celda baja y ocupa su sitio en la fila de debajo: por eso a las 19:00 solo escribes dos celdas aunque la tabla tenga tres columnas."},{kind:"code",id:"arregla-tabla",title:"La tabla descolocada",tabs:["html"],brief:p("A esta tabla de notas le pasan cosas raras: sale una columna de más y una celda flota fuera de su sitio. Tiene **tres fallos**:","- una celda escrita fuera de su fila;","- una fila con una celda de más (la nota media ya ocupa dos columnas);","- el título de la tabla va como párrafo, en vez de con su etiqueta."),start:{html:H("Notas",`    <table>
      <p>Notas de 1.º DAM</p>
      <tr>
        <th>Alumno</th>
        <th>Marcas</th>
        <th>Programación</th>
      </tr>
      <tr>
        <td>Ane</td>
        <td>8</td>
        <td>9</td>
      </tr>
      <tr>
        <td>Iker</td>
        <td>6</td>
      </tr>
      <td>7</td>
      <tr>
        <td>Media</td>
        <td colspan="2">7,5</td>
        <td></td>
      </tr>
    </table>`),css:ye},solution:{html:H("Notas",`    <table>
      <caption>Notas de 1.º DAM</caption>
      <tr>
        <th>Alumno</th>
        <th>Marcas</th>
        <th>Programación</th>
      </tr>
      <tr>
        <td>Ane</td>
        <td>8</td>
        <td>9</td>
      </tr>
      <tr>
        <td>Iker</td>
        <td>6</td>
        <td>7</td>
      </tr>
      <tr>
        <td>Media</td>
        <td colspan="2">7,5</td>
      </tr>
    </table>`),css:ye},checks:[{label:"El título va en `<caption>`",test:e=>e.loose("caption")==="notas de 1.º dam"&&!e.has("table p")},{label:"Iker tiene sus dos notas en su fila: 6 y 7",test:e=>e.all("tr").some(a=>ie(a).join("|")==="iker|6|7")},{label:"Todas las filas ocupan 3 columnas",test:e=>Be(e.q("table"),3)},{label:"Sin errores en el código",test:e=>e.htmlErrors()===0}],why:"El navegador no avisa: saca la celda suelta como puede y estira la tabla. Por eso hay que contar las columnas de cada fila a mano, sumando los colspan."},{kind:"code",id:"encargo-gimnasio",title:"Encargo: el gimnasio",brief:p("**Gimnasio Fuerza** te escribe:","","«Queremos una página con nuestro horario. Arriba, el nombre del gimnasio y un menú con Horario y Tarifas que baje a cada apartado. En “Horario”, una tabla titulada “Clases de la semana” con las columnas Hora, Lunes, Miércoles y Viernes. A las 9:00: Yoga, Pilates y Yoga. A las 18:00: Spinning el lunes y el miércoles (una sola celda para los dos días) y Zumba el viernes. Al final de la tabla, una fila de pie que ocupe todo el ancho con “Clases de 1 hora”. En “Tarifas”, una tabla con Plan y Precio: Mensual 35 € y Anual 350 €. Abajo, “Calle del Deporte, 1”.»","","El CSS ya está hecho. Usa `<thead>`, `<tbody>` y `<tfoot>` en la tabla del horario."),start:{html:"",css:mt},solution:{html:H("Gimnasio Fuerza",`    <header>
      <h1>Gimnasio Fuerza</h1>
      <nav>
        <ul>
          <li><a href="#horario">Horario</a></li>
          <li><a href="#tarifas">Tarifas</a></li>
        </ul>
      </nav>
    </header>

    <main>
      <section id="horario">
        <h2>Horario</h2>
        <table>
          <caption>Clases de la semana</caption>
          <thead>
            <tr>
              <th>Hora</th>
              <th>Lunes</th>
              <th>Miércoles</th>
              <th>Viernes</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <th>9:00</th>
              <td>Yoga</td>
              <td>Pilates</td>
              <td>Yoga</td>
            </tr>
            <tr>
              <th>18:00</th>
              <td colspan="2">Spinning</td>
              <td>Zumba</td>
            </tr>
          </tbody>
          <tfoot>
            <tr>
              <td colspan="4">Clases de 1 hora</td>
            </tr>
          </tfoot>
        </table>
      </section>

      <section id="tarifas">
        <h2>Tarifas</h2>
        <table>
          <tr>
            <th>Plan</th>
            <th>Precio</th>
          </tr>
          <tr>
            <td>Mensual</td>
            <td>35 €</td>
          </tr>
          <tr>
            <td>Anual</td>
            <td>350 €</td>
          </tr>
        </table>
      </section>
    </main>

    <footer>
      <p>Calle del Deporte, 1</p>
    </footer>`),css:mt},checks:[{label:"Esqueleto completo y CSS enlazado",test:e=>je(e)&&e.linked},{label:"Cabecera con `<h1>` «Gimnasio Fuerza» y menú nav > ul > li > a",test:e=>e.loose("header h1")==="gimnasio fuerza"&&e.count("header nav > ul > li > a")===2},{label:"El menú baja a Horario y Tarifas",test:e=>e.all("nav a").every(a=>{const n=a.getAttribute("href")?.slice(1)??"";return a.getAttribute("href")?.startsWith("#")&&I(e.doc.getElementById(n)?.querySelector("h2")?.textContent??"")===e.loose(a)})&&e.count("nav a")===2},{label:"Horario: tabla con `<caption>` «Clases de la semana»",test:e=>I(K(e,"Horario")?.querySelector("table > caption")?.textContent??"")==="clases de la semana"},{label:"Horario: `<thead>` con Hora, Lunes, Miércoles y Viernes",test:e=>ie(K(e,"Horario")?.querySelector("thead tr")).join("|")==="hora|lunes|miercoles|viernes"},{label:"Horario: las 9:00 con Yoga, Pilates y Yoga",test:e=>[...K(e,"Horario")?.querySelectorAll("tbody tr")??[]].some(a=>ie(a).join("|")==="9:00|yoga|pilates|yoga")},{label:"Horario: a las 18:00, Spinning en una celda de dos columnas y Zumba",test:e=>[...K(e,"Horario")?.querySelectorAll("tbody tr")??[]].some(a=>ie(a).join("|")==="18:00|spinning|zumba"&&a.children[1]?.getAttribute("colspan")==="2")},{label:"Horario: `<tfoot>` con «Clases de 1 hora» a todo lo ancho",test:e=>{const a=K(e,"Horario")?.querySelector("tfoot td");return I(a?.textContent??"")==="clases de 1 hora"&&a?.getAttribute("colspan")==="4"}},{label:"Horario: todas las filas ocupan 4 columnas",test:e=>Be(K(e,"Horario")?.querySelector("table")??null,4)},{label:"Tarifas: tabla Plan/Precio con Mensual 35 € y Anual 350 €",test:e=>{const a=K(e,"Tarifas")?.querySelector("table");return Be(a??null,2)&&[...a?.querySelectorAll("tr")??[]].map(n=>ie(n).join(" ")).join("|")==="plan precio|mensual 35 €|anual 350 €"}},{label:"Pie con «Calle del Deporte, 1»",test:e=>e.loose("footer").includes("calle del deporte, 1")},{label:"Sin errores en el código",test:e=>e.htmlErrors()===0}],why:"Has juntado lo de los tres mundos: esqueleto, cabecera con menú a los apartados y dos tablas, una con sus partes y celdas juntadas. Contar columnas fila a fila es lo que evita los fallos."}]},Ee=`body {
  font-family: sans-serif;
}

label {
  display: block;
  margin-top: 10px;
}

input[type="radio"] + label, input[type="checkbox"] + label {
  display: inline;
}

input, select, textarea {
  font: inherit;
  padding: 4px;
}

button {
  margin-top: 12px;
  padding: 6px 14px;
}
`,ht=`body {
  margin: 0;
  font-family: sans-serif;
  color: #1d1b16;
}

header {
  background: #1d4ed8;
  color: white;
  padding: 12px 16px;
}

header h1 {
  margin: 0;
}

main {
  padding: 0 16px 16px;
}

fieldset {
  border: 1px solid #93a8e8;
  border-radius: 8px;
  margin: 12px 0;
}

legend {
  font-weight: bold;
  color: #1d4ed8;
}

label {
  display: block;
  margin-top: 8px;
}

input[type="radio"] + label, input[type="checkbox"] + label {
  display: inline;
  margin-right: 12px;
}

input[type="radio"], input[type="checkbox"] {
  margin-right: 6px;
}

button {
  background: #1d4ed8;
  color: white;
  border: 0;
  padding: 8px 18px;
  border-radius: 6px;
}

footer {
  padding: 12px 16px;
  background: #e1e9fd;
}
`,rs={n:4,intro:"Contacto, reservas, inscripciones: casi todas las webs piden datos. Aquí aprendes a escribir un formulario que se entiende y que envía lo que tiene que enviar. Lo más importante es unir cada campo con su texto, y en la vista previa puedes rellenarlo y pulsar el botón.",lessons:[{id:"campos",title:"El formulario y sus campos",summary:"form, label con for e id, input con name y el botón",steps:[{text:p("Un formulario va dentro de `<form>`. Sus dos atributos dicen qué pasa al enviarlo:","- `action`: adónde se mandan los datos (una página o un programa del servidor);","- `method`: cómo. `get` los pone en la dirección (para buscar) y `post` los manda aparte (para datos personales).","","Dentro van los campos y un botón para enviar."),code:{html:`<form action="enviar.php" method="post">
  <label for="nombre">Nombre</label>
  <input type="text" id="nombre" name="nombre">

  <button type="submit">Enviar</button>
</form>`}},{text:p("Cada campo lleva tres cosas, y cada una tiene su papel:","- `<label>`: el texto que se ve («Nombre»). Su `for` dice a qué campo pertenece.","- `id` en el campo: tiene que ser **igual** que el `for` de su label. Así, al pulsar el texto se activa el campo, y quien usa un lector de pantalla sabe qué escribir.","- `name`: el nombre con el que viaja el dato. **Sin `name`, ese dato no se envía.**","",'Lo normal es poner el mismo nombre en los tres: `for="email"`, `id="email"` y `name="email"`.'),try:{task:"Rellena el formulario y pulsa «Enviar»: debajo de la página verás lo que se mandaría. Quita el `name` del email y vuelve a enviar: ese dato ya no sale. Pulsa también el texto «Email»: el cursor salta a su campo gracias al `for`.",html:`<form action="enviar.php" method="post">
  <label for="nombre">Nombre</label>
  <input type="text" id="nombre" name="nombre">

  <label for="email">Email</label>
  <input type="email" id="email" name="email">

  <button type="submit">Enviar</button>
</form>
`,css:Ee,tabs:["html"]},exam:"Repasa campo a campo: label con `for`, campo con el mismo `id` y con `name`. Es lo que más se mira en un formulario."},{text:p('Para enviar se usa `<button type="submit">Enviar</button>` (o `<input type="submit" value="Enviar">`).',"",'`<button type="reset">Borrar</button>` vacía el formulario.')},{check:{question:'Tienes `<label for="tel">Teléfono</label>`. ¿Qué tiene que llevar su campo?',options:['`id="tel"`','`name="Teléfono"`','`for="tel"`','`label="tel"`'],why:"El `for` de la label apunta al `id` del campo: tienen que ser iguales. El `name` es aparte: el nombre con el que viaja el dato."}}],recap:['Todo dentro de `<form action="…" method="post">`.',"Label con `for` = campo con el mismo `id`.","Cada campo con `name`, o no se envía.",'Botón: `<button type="submit">`.']},{id:"tipos",title:"Tipos de campo",summary:"text, email, password, number, date, tel… y required",steps:[{text:p("El `type` del `<input>` cambia el campo y lo que comprueba el navegador:","- `text`: texto corto (nombre, ciudad).","- `email`: comprueba que haya una @.","- `password`: oculta lo que se escribe.","- `number`: solo números; con `min` y `max` pones límites.","- `date`: abre un calendario.","- `tel`: teléfono (en el móvil saca el teclado de números).","",'Para textos largos (un mensaje, un comentario) no se usa input: se usa `<textarea>`, que **sí se cierra**: `<textarea id="msg" name="msg" rows="4"></textarea>`.'),code:{html:`<label for="email">Email</label>
<input type="email" id="email" name="email" required>

<label for="personas">Personas</label>
<input type="number" id="personas" name="personas" min="1" max="10">

<label for="msg">Mensaje</label>
<textarea id="msg" name="msg" rows="4"></textarea>`}},{text:p("Atributos útiles en cualquier campo:","- `required`: obligatorio. Si está vacío, el navegador no deja enviar.",'- `placeholder="Ej.: Ana"`: un texto de ejemplo dentro del campo, en gris. No sustituye a la label.','- `value="…"`: un valor ya escrito.'),try:{task:'Pulsa «Enviar» con todo vacío: el navegador avisa del campo obligatorio. Escribe un email sin @ y prueba otra vez. Después pon `min="1"` y `max="10"` al número y prueba con 20.',html:`<form action="reserva.php" method="post">
  <label for="email">Email</label>
  <input type="email" id="email" name="email" placeholder="tu@correo.es" required>

  <label for="personas">Personas</label>
  <input type="number" id="personas" name="personas">

  <button type="submit">Enviar</button>
</form>
`,css:Ee,tabs:["html"]}},{check:{task:"Une cada dato con el campo que le va.",pairs:[["Correo electrónico",'`<input type="email">`'],["Fecha de la reserva",'`<input type="date">`'],["Contraseña",'`<input type="password">`'],["Número de personas",'`<input type="number">`'],["Un comentario largo","`<textarea></textarea>`"]],why:"El tipo ayuda a quien rellena (calendario, teclado de números) y hace que el navegador compruebe el dato antes de enviar."}}],recap:["`type`: text, email, password, number, date, tel.","`number` con `min` y `max`.","Textos largos en `<textarea></textarea>` (se cierra).","`required` = obligatorio; `placeholder` = ejemplo en gris."]},{id:"opciones",title:"Opciones para elegir",summary:"radio, checkbox, select y fieldset",steps:[{text:p("- **radio**: se elige **una** de varias. Todos los del grupo llevan el **mismo `name`**; si no, se pueden marcar todos. Cada uno con su `value` (lo que se envía) y su label.","- **checkbox**: casillas que se marcan **o no**, cada una por su cuenta («Acepto las condiciones», «Quiero el boletín»)."),code:{html:`<p>Zona</p>
<input type="radio" id="terraza" name="zona" value="terraza">
<label for="terraza">Terraza</label>
<input type="radio" id="interior" name="zona" value="interior">
<label for="interior">Interior</label>

<input type="checkbox" id="acepto" name="acepto" required>
<label for="acepto">Acepto la política de privacidad</label>`},exam:"Si en un grupo de radio se pueden marcar varios, es que les has puesto `name` distintos."},{text:p("**select**: una lista desplegable. Cada opción es un `<option>` con su `value`. Va bien cuando hay muchas opciones.","","**fieldset** agrupa campos que van juntos y **legend** es el título del grupo. Los enunciados los piden para separar «Datos personales» de «Tu pedido», por ejemplo."),code:{html:`<fieldset>
  <legend>Tu reserva</legend>
  <label for="turno">Turno</label>
  <select id="turno" name="turno">
    <option value="comida">Comida</option>
    <option value="cena">Cena</option>
  </select>
</fieldset>`},try:{task:"En este formulario se pueden marcar los dos radios a la vez. Arréglalo dándoles el mismo `name`. Después añade al select una opción «Desayuno».",html:`<form>
  <fieldset>
    <legend>Tu reserva</legend>
    <p>Zona</p>
    <input type="radio" id="terraza" name="terraza" value="terraza">
    <label for="terraza">Terraza</label>
    <input type="radio" id="interior" name="interior" value="interior">
    <label for="interior">Interior</label>

    <label for="turno">Turno</label>
    <select id="turno" name="turno">
      <option value="comida">Comida</option>
      <option value="cena">Cena</option>
    </select>
  </fieldset>
  <button type="submit">Reservar</button>
</form>
`,css:Ee,tabs:["html"]}},{check:{question:"Tres radios «Pequeña», «Mediana» y «Grande» dejan marcar varios a la vez. ¿Qué les pasa?",options:["Tienen `name` distintos","Les falta `required`","Tienen `id` iguales","Deberían ser `checkbox`"],why:"Los radios con el mismo `name` forman un grupo, y en un grupo solo se marca uno. Los `id` tienen que ser distintos (cada uno el de su label)."}}],recap:["radio: uno de varios, todos con el mismo `name` y su `value`.","checkbox: sí o no, cada uno por su cuenta.",'`<select>` con `<option value="…">`.',"`<fieldset>` agrupa; `<legend>` es su título."]}],challenges:[{kind:"quiz",id:"sin-name",title:"El dato que no llega",question:'Un campo tiene `id="ciudad"` y su label, pero no tiene `name`. ¿Qué pasa al enviar?',options:["Ese dato no se envía","Se envía con el nombre «ciudad»","El formulario no deja enviar","Se envía con el texto de la label"],why:"Solo viajan los campos con `name`: es el nombre del dato. El `id` sirve para unir la label, no para enviar."},{kind:"code",id:"contacto",title:"El formulario de contacto",tabs:["html"],brief:p("Haz el formulario de contacto de la academia. Se envía a `contacto.php` por `post` y tiene:","- **Nombre**: texto, obligatorio;","- **Email**: de tipo email, obligatorio;","- **Mensaje**: un texto largo;","- un botón **Enviar**.","","Cada campo con su `label` (con `for`), su `id` y su `name`. Pruébalo pulsando «Enviar»."),start:{html:H("Contacto",`    <h1>Contacto</h1>
    <!-- El formulario -->`),css:Ee},solution:{html:H("Contacto",`    <h1>Contacto</h1>
    <form action="contacto.php" method="post">
      <label for="nombre">Nombre</label>
      <input type="text" id="nombre" name="nombre" required>

      <label for="email">Email</label>
      <input type="email" id="email" name="email" required>

      <label for="mensaje">Mensaje</label>
      <textarea id="mensaje" name="mensaje" rows="4"></textarea>

      <button type="submit">Enviar</button>
    </form>`),css:Ee},checks:[{label:'`<form>` con `action="contacto.php"` y `method="post"`',test:e=>e.attr("form","action")==="contacto.php"&&e.attr("form","method").toLowerCase()==="post"},{label:"«Nombre»: campo de texto con su label, name y obligatorio",test:e=>{const a=O(e,"Nombre");return G(a)==="text"&&ne(a)&&me(a)},hint:"La label con `for` igual al `id` del campo."},{label:"«Email»: tipo email, con su label, name y obligatorio",test:e=>{const a=O(e,"Email");return G(a)==="email"&&ne(a)&&me(a)}},{label:"«Mensaje»: un `<textarea>` con su label y name",test:e=>{const a=O(e,"Mensaje");return G(a)==="textarea"&&ne(a)}},{label:"Un botón que envía y dice «Enviar»",test:e=>De(e,"Enviar")},{label:"Sin errores en el código",test:e=>e.htmlErrors()===0}],why:"Label con `for` = campo con `id`, y cada campo con su `name`: esa es la base de todos los formularios. El tipo `email` y `required` hacen que el navegador compruebe solo."},{kind:"match",id:"atributos",title:"Los atributos del formulario",task:"Une cada atributo con lo que hace.",pairs:[["`action`","Adónde se mandan los datos"],['`method="post"`',"Manda los datos aparte, no en la dirección"],["`name`","El nombre con el que viaja el dato"],["`for`","Une la label con el id de su campo"],["`required`","No deja enviar si está vacío"],["`placeholder`","Un ejemplo en gris dentro del campo"]],why:"`action` y `method` van en `<form>`; `name`, `required` y `placeholder` en el campo; `for` en la label."},{kind:"quiz",id:"muchas-opciones",title:"Elegir la provincia",question:"Hay que elegir una provincia entre 50. ¿Qué campo va mejor?",options:["Un `<select>` con un `<option>` por provincia","50 checkbox","50 radio con `name` distintos","Un `<textarea>`"],why:"Con muchas opciones y una sola respuesta, la lista desplegable ocupa poco. Los radio valen para pocas opciones (y con el mismo `name`)."},{kind:"code",id:"reserva",title:"La reserva del restaurante",tabs:["html"],brief:p('El restaurante quiere un formulario de reservas (`action="reserva.php"`, `method="post"`) con:',"- **Fecha**: de tipo fecha, obligatoria;","- **Personas**: un número entre 1 y 10;","- **Turno**: lista desplegable con Comida y Cena;","- **Zona**: dos opciones de las que solo se puede elegir una: Terraza e Interior;","- una casilla **Acepto la política de privacidad**, obligatoria;","- un botón **Reservar**."),start:{html:H("Reservas",`    <h1>Reserva tu mesa</h1>
    <!-- El formulario -->`),css:Ee},solution:{html:H("Reservas",`    <h1>Reserva tu mesa</h1>
    <form action="reserva.php" method="post">
      <label for="fecha">Fecha</label>
      <input type="date" id="fecha" name="fecha" required>

      <label for="personas">Personas</label>
      <input type="number" id="personas" name="personas" min="1" max="10">

      <label for="turno">Turno</label>
      <select id="turno" name="turno">
        <option value="comida">Comida</option>
        <option value="cena">Cena</option>
      </select>

      <p>Zona</p>
      <input type="radio" id="terraza" name="zona" value="terraza">
      <label for="terraza">Terraza</label>
      <input type="radio" id="interior" name="zona" value="interior">
      <label for="interior">Interior</label>

      <p>
        <input type="checkbox" id="privacidad" name="privacidad" required>
        <label for="privacidad">Acepto la política de privacidad</label>
      </p>

      <button type="submit">Reservar</button>
    </form>`),css:Ee},checks:[{label:"`<form>` a reserva.php por post",test:e=>e.attr("form","action")==="reserva.php"&&e.attr("form","method").toLowerCase()==="post"},{label:"«Fecha»: tipo date, obligatoria, con label y name",test:e=>{const a=O(e,"Fecha");return G(a)==="date"&&me(a)&&ne(a)}},{label:"«Personas»: number de 1 a 10, con label y name",test:e=>{const a=O(e,"Personas");return G(a)==="number"&&a?.getAttribute("min")==="1"&&a?.getAttribute("max")==="10"&&ne(a)}},{label:"«Turno»: un select con Comida y Cena",test:e=>{const a=O(e,"Turno");return G(a)==="select"&&ne(a)&&Oa(a).join("|")==="comida|cena"}},{label:"«Zona»: dos radio (Terraza, Interior) con el mismo name",test:e=>{const a=Da(e);return a.all.length===2&&a.names.length===1&&!!a.names[0]&&a.labels.sort().join("|")==="interior|terraza"&&a.all.every(n=>!!n.getAttribute("value"))},hint:"Mismo `name` para los dos, `id` distintos y un `value` en cada uno."},{label:"Casilla obligatoria «Acepto la política de privacidad»",test:e=>{const a=O(e,"Acepto la politica de privacidad");return G(a)==="checkbox"&&me(a)&&ne(a)}},{label:"Botón que envía: «Reservar»",test:e=>De(e,"Reservar")},{label:"Sin errores en el código",test:e=>e.htmlErrors()===0}],why:"Cada dato con su tipo: fecha con calendario, número con límites, desplegable para el turno, radio con el mismo `name` para elegir uno y checkbox obligatorio para aceptar."},{kind:"code",id:"arregla-form",title:"El formulario que falla",tabs:["html"],brief:p("Este formulario de suscripción tiene **cuatro fallos**:","- al pulsar «Email» el cursor no va a su campo;","- el email no se comprueba (deja escribir cualquier cosa);","- se pueden marcar las dos frecuencias a la vez;","- el nombre no se envía (prueba a enviar y mira lo que sale debajo de la página)."),start:{html:H("Boletín",`    <form action="alta.php" method="post">
      <label for="nombre">Nombre</label>
      <input type="text" id="nombre">

      <label for="correo">Email</label>
      <input type="text" id="email" name="email">

      <p>Frecuencia</p>
      <input type="radio" id="semanal" name="semanal" value="semanal">
      <label for="semanal">Semanal</label>
      <input type="radio" id="mensual" name="mensual" value="mensual">
      <label for="mensual">Mensual</label>

      <button type="submit">Suscribirme</button>
    </form>`),css:Ee},solution:{html:H("Boletín",`    <form action="alta.php" method="post">
      <label for="nombre">Nombre</label>
      <input type="text" id="nombre" name="nombre">

      <label for="email">Email</label>
      <input type="email" id="email" name="email">

      <p>Frecuencia</p>
      <input type="radio" id="semanal" name="frecuencia" value="semanal">
      <label for="semanal">Semanal</label>
      <input type="radio" id="mensual" name="frecuencia" value="mensual">
      <label for="mensual">Mensual</label>

      <button type="submit">Suscribirme</button>
    </form>`),css:Ee},checks:[{label:"La label «Email» está unida a su campo",test:e=>!!O(e,"Email"),hint:"El `for` de la label y el `id` del campo, iguales."},{label:"El email es de tipo email",test:e=>G(O(e,"Email")??e.q('input[name="email"]'))==="email"},{label:"Las frecuencias son un solo grupo",test:e=>{const a=Da(e);return a.all.length===2&&a.names.length===1&&!!a.names[0]}},{label:"El nombre se envía",test:e=>ne(O(e,"Nombre"))},{label:"Sin errores en el código",test:e=>e.htmlErrors()===0}],why:"Ninguno de estos fallos lo marca el navegador como error: la página se ve bien, pero el formulario no funciona como debe. Repasa siempre `for`/`id`, `name`, el `type` y los grupos de radio."},{kind:"quiz",id:"textarea",title:"El campo del mensaje",question:"¿Cuál de estos está bien escrito?",options:['`<textarea id="msg" name="msg"></textarea>`','`<textarea id="msg" name="msg">`','`<input type="textarea" id="msg" name="msg">`','`<textarea id="msg" name="msg"/>`'],why:"`<textarea>` no es un input ni una etiqueta vacía: se abre y se cierra (lo de en medio es el texto que trae escrito)."},{kind:"code",id:"inscripcion",title:"Encargo: el club de montaña",brief:p("**Club de Montaña Gorbea** te escribe:","","«Queremos una página para apuntarse a nuestras salidas. Arriba, el nombre del club. Debajo, un apartado “Inscripción” con un formulario que se envíe a inscripcion.php por post, dividido en dos grupos con su título. En “Tus datos”: nombre (obligatorio), email (obligatorio) y teléfono. En “La salida”: la ruta, a elegir en una lista entre Gorbea, Anboto y Urkiola; el nivel, eligiendo uno entre Fácil, Medio y Difícil; si quieres alquilar material (una casilla), y un comentario largo. Al final, un botón “Apuntarme”. Abajo del todo, nuestro correo info@gorbea.eus, que se pueda pulsar.»","","El CSS ya está hecho."),start:{html:"",css:ht},solution:{html:H("Club de Montaña Gorbea",`    <header>
      <h1>Club de Montaña Gorbea</h1>
    </header>

    <main>
      <section>
        <h2>Inscripción</h2>
        <form action="inscripcion.php" method="post">
          <fieldset>
            <legend>Tus datos</legend>
            <label for="nombre">Nombre</label>
            <input type="text" id="nombre" name="nombre" required>
            <label for="email">Email</label>
            <input type="email" id="email" name="email" required>
            <label for="telefono">Teléfono</label>
            <input type="tel" id="telefono" name="telefono">
          </fieldset>

          <fieldset>
            <legend>La salida</legend>
            <label for="ruta">Ruta</label>
            <select id="ruta" name="ruta">
              <option value="gorbea">Gorbea</option>
              <option value="anboto">Anboto</option>
              <option value="urkiola">Urkiola</option>
            </select>

            <p>Nivel</p>
            <input type="radio" id="facil" name="nivel" value="facil">
            <label for="facil">Fácil</label>
            <input type="radio" id="medio" name="nivel" value="medio">
            <label for="medio">Medio</label>
            <input type="radio" id="dificil" name="nivel" value="dificil">
            <label for="dificil">Difícil</label>

            <p>
              <input type="checkbox" id="material" name="material">
              <label for="material">Quiero alquilar material</label>
            </p>

            <label for="comentario">Comentario</label>
            <textarea id="comentario" name="comentario" rows="4"></textarea>
          </fieldset>

          <button type="submit">Apuntarme</button>
        </form>
      </section>
    </main>

    <footer>
      <p><a href="mailto:info@gorbea.eus">info@gorbea.eus</a></p>
    </footer>`),css:ht},checks:[{label:"Esqueleto completo y CSS enlazado",test:e=>je(e)&&e.linked},{label:"Cabecera con el `<h1>` «Club de Montaña Gorbea»",test:e=>e.loose("header h1")==="club de montana gorbea"},{label:"Apartado «Inscripción» con un formulario a inscripcion.php por post",test:e=>{const a=K(e,"Inscripción")?.querySelector("form");return a?.getAttribute("action")==="inscripcion.php"&&a.getAttribute("method")?.toLowerCase()==="post"}},{label:"Dos `<fieldset>` con su `<legend>`: «Tus datos» y «La salida»",test:e=>e.all("fieldset").map(a=>I(a.querySelector("legend")?.textContent??"")).join("|")==="tus datos|la salida"},{label:"Tus datos: nombre y email obligatorios (email de tipo email) y teléfono de tipo tel",test:e=>{const a=e.all("fieldset")[0];if(!a)return!1;const n=O(e,"Nombre",a),t=O(e,"Email",a),o=O(e,"Telefono",a);return G(n)==="text"&&me(n)&&G(t)==="email"&&me(t)&&G(o)==="tel"&&[n,t,o].every(ne)}},{label:"La salida: «Ruta» en un select con Gorbea, Anboto y Urkiola",test:e=>{const a=O(e,"Ruta",e.all("fieldset")[1]??e.doc);return G(a)==="select"&&ne(a)&&Oa(a).join("|")==="gorbea|anboto|urkiola"}},{label:"La salida: nivel con tres radio del mismo grupo (Fácil, Medio, Difícil)",test:e=>{const a=Da(e);return a.all.length===3&&a.names.length===1&&!!a.names[0]&&a.labels.join("|")==="facil|medio|dificil"}},{label:"La salida: una casilla para alquilar material",test:e=>{const a=e.all('input[type="checkbox"]');return a.length===1&&ne(a[0])&&I(Xe(e.doc,a[0])?.textContent??"").includes("material")}},{label:"La salida: un comentario en `<textarea>` con su label",test:e=>{const a=O(e,"Comentario");return G(a)==="textarea"&&ne(a)}},{label:"Botón que envía: «Apuntarme»",test:e=>De(e,"Apuntarme")},{label:"Pie con el correo que se puede pulsar",test:e=>!!e.q('footer a[href="mailto:info@gorbea.eus"]')},{label:"Sin errores en el código",test:e=>e.htmlErrors()===0}],why:"Un formulario de examen completo: grupos con `fieldset` y `legend`, cada campo con su tipo, label unida y `name`, los radio en un solo grupo y el botón que envía."}]},is=(e,a,n)=>va(e.files.css).rules.some(t=>a(t.selector)&&t.decls.some(o=>o.prop===n)),$a=(e,a,n,t)=>e.all(a).length>0&&e.all(a).every(o=>e.color(o,n,t)),ia=(e,a)=>Number(e.style(a,"font-weight"))>=600,La=H("Taller Ruedas",`    <header>
      <h1>Taller Ruedas</h1>
      <nav>
        <ul>
          <li><a href="#servicios">Servicios</a></li>
          <li><a href="#precios">Precios</a></li>
        </ul>
      </nav>
    </header>

    <main>
      <section id="servicios">
        <h2>Servicios</h2>
        <p>Reparamos y ponemos a punto todo tipo de bicis.</p>
      </section>

      <section id="precios">
        <h2>Precios</h2>
        <p>Puesta a punto: 30 euros.</p>
        <p>Cambio de cubierta: 15 euros.</p>
      </section>
    </main>

    <footer>
      <p>&copy; 2026 Taller Ruedas</p>
    </footer>`),Fe=H("Frutería Paqui",`    <header>
      <h1>Frutería Paqui</h1>
      <nav>
        <ul>
          <li><a href="#fruta">Fruta</a></li>
          <li><a href="#verdura">Verdura</a></li>
          <li><a href="#contacto">Contacto</a></li>
        </ul>
      </nav>
    </header>

    <main>
      <section id="fruta">
        <h2>Fruta</h2>
        <ul>
          <li>Manzanas <span class="precio">2 €/kg</span></li>
          <li>Naranjas <span class="precio">1,50 €/kg</span></li>
        </ul>
      </section>

      <section id="verdura">
        <h2>Verdura</h2>
        <ul>
          <li>Tomates <span class="precio">2,50 €/kg</span></li>
          <li>Lechugas <span class="precio">1 €/unidad</span></li>
        </ul>
        <p class="aviso">Todo de temporada y de la zona.</p>
      </section>

      <section id="contacto">
        <h2>Contacto</h2>
        <p>Calle Mayor, 4</p>
      </section>
    </main>

    <footer>
      <p>&copy; 2026 Frutería Paqui</p>
    </footer>`),cs={n:5,intro:"Empieza el CSS: el aspecto. Aquí aprendes a escribir reglas sin fallos, a elegir a qué elementos se aplican (los selectores), los colores y el texto, y por qué a veces una regla «no hace caso». Ahora la pestaña importante es estilos.css.",lessons:[{id:"reglas",title:"Cómo se escribe una regla",summary:"selector { propiedad: valor; }",steps:[{text:p("El CSS es una lista de **reglas**. Cada regla dice a qué elementos se aplica y qué les cambia:","- el **selector**: a quién (`h1`);","- entre llaves `{ }`, las **declaraciones**: `propiedad: valor;`.","","Dos puntos entre la propiedad y el valor, y **punto y coma al final de cada una**. Olvidar un `;` estropea esa línea y la siguiente."),code:{css:`h1 {
  color: darkgreen;
  font-size: 32px;
}`}},{text:p('El CSS va en `estilos.css`, enlazado desde el `<head>` con `<link rel="stylesheet" href="estilos.css">` (lo viste en el mundo 1).',"",'Hay otras dos formas, que en el examen no suelen querer: dentro del HTML en una etiqueta `<style>`, o en el propio elemento con `style="color: red"`. Con el archivo aparte, todo el aspecto está en un sitio.',"","Los comentarios en CSS se escriben `/* así */`."),try:{task:"Cambia el color del `h1` a `crimson` y añade una regla para `p` con `color: gray;`. Después quita un `;` y mira el aviso.",html:`<h1>Taller Ruedas</h1>
<p>Reparamos bicis.</p>
`,css:`/* Títulos */
h1 {
  color: darkgreen;
  font-size: 32px;
}
`,tabs:["css","html"]}},{check:{question:"En `p { color: navy; }`, ¿qué es `color`?",options:["La propiedad","El selector","El valor","La regla"],why:"`p` es el selector, `color` la propiedad, `navy` el valor, y todo junto, con sus llaves, la regla."}}],recap:["`selector { propiedad: valor; }`.","Dos puntos en medio y `;` al final de cada declaración.","El CSS en `estilos.css`, enlazado con `<link>`.","Comentarios: `/* … */`."]},{id:"selectores",title:"Los selectores",summary:"etiqueta, .clase, #id, descendiente, grupo y :hover",steps:[{text:p("Los selectores que vas a usar casi siempre:","- `p`: **todas** las etiquetas `<p>`.",'- `.oferta`: los elementos con `class="oferta"`. Con **punto** en el CSS y sin punto en el HTML.','- `#portada`: el elemento con `id="portada"`. Con **almohadilla**. Solo hay uno.',"- `nav a`: los `<a>` que están **dentro** de un `<nav>` (con un espacio en medio).","- `h1, h2`: a los dos a la vez (con **coma**), para no repetir la regla."),code:{css:`p {
  color: #333;
}

.oferta {
  color: red;
}

#portada {
  background-color: lightyellow;
}

nav a {
  color: white;
}

h1, h2 {
  color: darkgreen;
}`,html:`<section id="portada">
  <p>Pan de pueblo</p>
  <p class="oferta">Hoy, 2x1</p>
</section>`},exam:'Para dar el mismo estilo a varias cosas, usa una clase: el `id` es para una sola. Y un elemento puede tener varias clases separadas por espacio: `class="producto oferta"`.'},{text:p("Las **pseudoclases** van pegadas con dos puntos y eligen un estado:","- `a:hover`: cuando el ratón pasa por encima. Lo piden mucho en los menús.","- `li:first-child`: el primer `<li>` de su lista."),try:{task:"Pasa el ratón por los enlaces del menú. Después añade la clase `oferta` al segundo párrafo (en index.html) para que salga en rojo, y crea la regla `.precio` para que salga en negrita (`font-weight: bold;`).",html:`<nav>
  <a href="#">Inicio</a>
  <a href="#">Carta</a>
</nav>
<p>Menú del día <span class="precio">12 €</span></p>
<p>Postre gratis los martes</p>
`,css:`nav a {
  color: darkblue;
}

nav a:hover {
  color: orange;
}

.oferta {
  color: red;
}
`}},{check:{task:"Une cada selector con lo que elige.",pairs:[["`p`","Todos los párrafos"],["`.destacado`",'Los elementos con class="destacado"'],["`#contacto`",'El elemento con id="contacto"'],["`footer p`","Los párrafos que están dentro del pie"],["`h2, h3`","Los h2 y los h3 a la vez"],["`a:hover`","Los enlaces cuando el ratón pasa por encima"]],why:"Punto para clase, almohadilla para id, espacio para «dentro de», coma para «y también» y dos puntos para un estado."}}],recap:["`etiqueta`, `.clase`, `#id`.","Espacio = dentro de (`nav a`). Coma = a la vez (`h1, h2`).","`:hover` = con el ratón encima.","En el HTML, `class` sin punto e `id` sin almohadilla."]},{id:"colores",title:"Colores y fondos",summary:"color, background-color y cómo se escribe un color",steps:[{text:p("Dos propiedades para el color:","- `color`: el color del **texto**.","- `background-color`: el color del **fondo** (o `background`, más corta).","","Un color se puede escribir de varias formas, y todas valen:","- por su nombre en inglés: `red`, `white`, `navy`, `crimson`…","- en hexadecimal: `#ff0000` (rojo, verde y azul, de `00` a `ff`). `#fff` es la forma corta de `#ffffff`.","- con `rgb(255, 0, 0)`, o `rgba(0, 0, 0, 0.5)` con transparencia."),code:{css:`body {
  background-color: #fdf3d8;
  color: #333333;
}

header {
  background: rgb(47, 107, 31);
  color: white;
}`},exam:"Si el enunciado da los colores corporativos en hexadecimal (`#2f6b1f`), cópialos tal cual, con la `#`."},{text:'También se puede poner una imagen de fondo: `background-image: url("img/fondo.jpg");`. La ruta se cuenta desde el archivo CSS.',try:{task:"Pon la cabecera con fondo `#1d3557` y texto blanco, y el fondo de la página en `#f1faee`. Prueba también algún color por su nombre.",html:`<header>
  <h1>Taller Ruedas</h1>
</header>
<p>Reparamos todo tipo de bicis.</p>
`,css:`body {
  font-family: sans-serif;
}

header {
  padding: 10px;
}
`,tabs:["css","html"]}},{check:{question:"Quieres el texto de los párrafos en gris oscuro. ¿Qué escribes?",options:["`p { color: #444; }`","`p { background-color: #444; }`","`p { text-color: #444; }`","`p { color: 444; }`"],why:"El color del texto es `color` (no existe `text-color`) y el hexadecimal lleva `#`. `background-color` pintaría el fondo."}}],recap:["`color`: texto. `background-color` (o `background`): fondo.","Colores: nombre, `#hex` o `rgb()`.",'Imagen de fondo: `background-image: url("…");`.']},{id:"texto",title:"El texto",summary:"fuente, tamaño, grosor, alineación y decoración",steps:[{text:p("Las propiedades de texto más pedidas:",'- `font-family: Georgia, serif;`: la fuente. Se ponen varias por si falta la primera, y la última es genérica (`serif`, `sans-serif` o `monospace`). Si el nombre tiene espacios, entre comillas: `"Times New Roman"`.',"- `font-size: 18px;`: el tamaño. `px` son píxeles; `rem` es relativo al tamaño normal (`1.5rem` es una vez y media); `em`, al del padre.","- `font-weight: bold;`: negrita (o un número: `400` normal, `700` negrita).","- `font-style: italic;`: cursiva."),code:{css:`body {
  font-family: Arial, Helvetica, sans-serif;
  font-size: 16px;
}

h1 {
  font-family: Georgia, serif;
  font-size: 2rem;
}`}},{text:p("Y para colocar y adornar el texto:","- `text-align: center;`: alinear (`left`, `right`, `center`, `justify`).","- `text-decoration: none;`: quita el subrayado de los enlaces (o `underline` para ponerlo).","- `text-transform: uppercase;`: todo en mayúsculas.","- `line-height: 1.5;`: el espacio entre líneas (sin unidad: 1,5 veces la letra).","- `letter-spacing: 2px;`: el espacio entre letras."),try:{task:"Centra el pie, quita el subrayado de los enlaces del menú y ponlos en mayúsculas. Haz los párrafos más fáciles de leer con `line-height: 1.6;`.",html:`<nav>
  <a href="#">Inicio</a>
  <a href="#">Servicios</a>
</nav>
<p>Reparamos y ponemos a punto todo tipo de bicis: de paseo, de montaña y eléctricas. Pide cita y te la dejamos lista en el día.</p>
<footer>&copy; 2026 Taller Ruedas</footer>
`,css:`body {
  font-family: Arial, sans-serif;
}

nav a {
  color: darkblue;
}
`,tabs:["css","html"]}},{check:{question:"¿Cómo quitas el subrayado de los enlaces del menú?",options:["`nav a { text-decoration: none; }`","`nav a { underline: none; }`","`nav a { font-style: none; }`","`nav { text-decoration: a; }`"],why:"El subrayado es una decoración del texto: `text-decoration: none;` aplicado a los `<a>` del menú (`nav a`)."}}],recap:["`font-family` con varias y una genérica al final.","`font-size` en `px` o `rem`. `font-weight: bold`. `font-style: italic`.","`text-align`, `text-decoration: none`, `text-transform: uppercase`.","`line-height` sin unidad."]},{id:"cascada",title:"La cascada: quién gana",summary:"herencia, especificidad y orden",steps:[{text:p("**Herencia**: algunas propiedades pasan de padres a hijos. Si pones `color` o `font-family` en `body`, lo heredan todos los textos de la página. Por eso la fuente y el color general se ponen en `body`.","","Otras no se heredan: un `background` o un `border` en `body` no se copian a cada párrafo."),code:{css:`/* Todo el texto de la página en Arial y gris oscuro */
body {
  font-family: Arial, sans-serif;
  color: #333;
}`}},{text:p("Cuando dos reglas dicen cosas distintas al mismo elemento, gana:","- la más **específica**: un `#id` gana a una `.clase`, y una `.clase` gana a una `etiqueta`;","- si son igual de específicas, la que está **más abajo** en el archivo.","","Así, `.oferta { color: red; }` gana a `p { color: black; }` esté donde esté."),code:{css:`p {
  color: black;
}

/* Gana a la de arriba: una clase es más específica que una etiqueta */
.oferta {
  color: red;
}`},try:{task:'El párrafo tiene `class="oferta"` e `id="hoy"`. ¿De qué color sale? Borra la regla `#hoy` y mira qué gana entonces. Después cambia el orden de las reglas `p`: verás que no cambia nada, porque la clase gana igual.',html:`<p class="oferta" id="hoy">Postre gratis</p>
`,css:`p {
  color: black;
}

#hoy {
  color: green;
}

.oferta {
  color: red;
}
`,tabs:["css","html"]},exam:"Si una regla «no hace caso», mira por este orden: ¿está bien enlazado el CSS?, ¿el selector coincide con el HTML (el aviso de debajo te lo dice)?, ¿falta un `;`?, ¿hay otra regla más específica?"},{check:{question:'Tienes `#titulo { color: blue; }`, `.grande { color: green; }` y `h1 { color: red; }`. El elemento es `<h1 id="titulo" class="grande">`. ¿De qué color sale?',options:["Azul","Verde","Rojo","Del que esté más abajo en el CSS"],why:"El id es lo más específico y gana a la clase y a la etiqueta, estén en el orden que estén."}}],recap:["`color` y `font-family` se heredan: ponlos en `body`.","Gana lo más específico: `#id` > `.clase` > `etiqueta`.","A igualdad, gana la regla de más abajo."]}],challenges:[{kind:"quiz",id:"partes",title:"Las partes de una regla",question:"¿Cuál de estas reglas está bien escrita?",options:["`h2 { color: navy; font-size: 24px; }`","`h2 ( color: navy; font-size: 24px; )`","`h2 { color = navy; font-size = 24px; }`","`h2 { color: navy font-size: 24px }`"],why:"Llaves, dos puntos entre propiedad y valor, y punto y coma después de cada declaración. Sin el `;`, la segunda se mezcla con la primera."},{kind:"code",id:"colores",title:"Los colores del taller",tabs:["css","html"],brief:p("El HTML del taller ya está hecho. En `estilos.css`, aplica los colores que pide el cliente:","- fondo de toda la página: `#f1faee`;","- la cabecera, con fondo `#1d3557` y texto blanco;","- los títulos de los apartados (`h2`), en `#e63946`;","- el pie, con fondo `#a8dadc`."),start:{html:La,css:`/* Los colores del taller */
`},solution:{html:La,css:`body {
  background-color: #f1faee;
}

header {
  background-color: #1d3557;
  color: white;
}

h2 {
  color: #e63946;
}

footer {
  background-color: #a8dadc;
}
`},checks:[{label:"Fondo de la página `#f1faee`",test:e=>e.color("body","background-color","#f1faee")},{label:"Cabecera con fondo `#1d3557`",test:e=>e.color("header","background-color","#1d3557")},{label:"El texto de la cabecera, blanco (también el `h1`)",test:e=>e.color("header h1","color","#ffffff")},{label:"Los `h2` en `#e63946`",test:e=>$a(e,"h2","color","#e63946")},{label:"El pie con fondo `#a8dadc`",test:e=>e.color("footer","background-color","#a8dadc")},{label:"Sin errores en el CSS",test:e=>e.cssErrors()===0}],why:"`background-color` para el fondo y `color` para el texto. El blanco de la cabecera lo hereda el `h1` que va dentro, así que basta con ponerlo en `header`."},{kind:"match",id:"que-elige",title:"¿A quién se aplica?",task:"Une cada selector con lo que elige en esta página de frutería.",pairs:[["`li`","Todas las frutas y verduras de las listas (y las opciones del menú)"],["`.precio`",'Cada precio (los span con class="precio")'],["`#contacto`","Solo el apartado de contacto"],["`nav a`","Los enlaces del menú"],["`h1, h2`","El título de la página y los de los apartados"]],why:"Etiqueta, clase, id, descendiente y grupo: con estos cinco haces casi todo el CSS de un examen."},{kind:"code",id:"clases",title:"Precios y avisos de la frutería",tabs:["css","html"],brief:p('En la frutería, los precios ya llevan `class="precio"` y hay un párrafo con `class="aviso"`. En `estilos.css`:',"- todos los precios en negrita y de color `#c0392b`;","- el aviso en cursiva y con fondo `#fff3cd`;",'- y el apartado de contacto (tiene `id="contacto"`) con fondo `#e8f5e9`.',"","Usa un selector de clase, otro de clase y otro de id."),start:{html:Fe,css:`body {
  font-family: Arial, sans-serif;
}
`},solution:{html:Fe,css:`body {
  font-family: Arial, sans-serif;
}

.precio {
  font-weight: bold;
  color: #c0392b;
}

.aviso {
  font-style: italic;
  background-color: #fff3cd;
}

#contacto {
  background-color: #e8f5e9;
}
`},checks:[{label:"Los cuatro precios en negrita",test:e=>e.count(".precio")===4&&e.all(".precio").every(a=>ia(e,a))},{label:"Los cuatro precios en `#c0392b`",test:e=>$a(e,".precio","color","#c0392b")},{label:"El aviso en cursiva y con fondo `#fff3cd`",test:e=>e.style(".aviso","font-style")==="italic"&&e.color(".aviso","background-color","#fff3cd")},{label:"El apartado de contacto con fondo `#e8f5e9`",test:e=>e.color("#contacto","background-color","#e8f5e9")},{label:"Lo demás no ha cambiado: los nombres de las frutas siguen sin negrita",test:e=>!ia(e,"main li")},{label:"Sin errores en el CSS",test:e=>e.cssErrors()===0}],why:"Con `.precio` cambias todos los precios a la vez, estén donde estén; con `#contacto`, solo ese apartado. Por eso se repiten clases y no ids."},{kind:"quiz",id:"gana",title:"¿Quién gana?",question:'Tienes `p { color: black; }` y, **más arriba** en el archivo, `.nota { color: gray; }`. ¿De qué color sale `<p class="nota">`?',code:{css:`.nota {
  color: gray;
}

p {
  color: black;
}`},options:["Gris, porque la clase es más específica","Negro, porque está más abajo","Negro, porque `p` es la etiqueta","Sale un error"],why:"El orden solo decide entre reglas igual de específicas. Una clase es más específica que una etiqueta, así que gana aunque esté antes."},{kind:"code",id:"tipografia",title:"La letra del taller",tabs:["css","html"],brief:p("Ahora la tipografía del taller. En `estilos.css`:","- toda la página en `Verdana, sans-serif` y los párrafos con `line-height: 1.5`;","- el título principal a 36px y centrado;","- los enlaces del menú **sin subrayado**, en mayúsculas;","- y cuando pase el ratón por encima de un enlace del menú, que cambie de color (el que quieras)."),start:{html:La,css:`header {
  background-color: #1d3557;
  color: white;
}

nav a {
  color: white;
}
`},solution:{html:La,css:`body {
  font-family: Verdana, sans-serif;
}

p {
  line-height: 1.5;
}

header {
  background-color: #1d3557;
  color: white;
}

h1 {
  font-size: 36px;
  text-align: center;
}

nav a {
  color: white;
  text-decoration: none;
  text-transform: uppercase;
}

nav a:hover {
  color: #ffd166;
}
`},checks:[{label:"Toda la página en Verdana (también los párrafos y el pie)",test:e=>["body","p","footer p","nav a"].every(a=>e.style(a,"font-family").toLowerCase().startsWith("verdana"))},{label:"Los párrafos con `line-height: 1.5`",test:e=>e.all("main p").every(a=>Math.abs(e.px(a,"line-height")/e.px(a,"font-size")-1.5)<.05)},{label:"El `h1` a 36px y centrado",test:e=>e.px("h1","font-size")===36&&e.style("h1","text-align")==="center"},{label:"Los enlaces del menú sin subrayado",test:e=>e.all("nav a").every(a=>e.style(a,"text-decoration-line")==="none")},{label:"Los enlaces del menú en mayúsculas",test:e=>e.all("nav a").every(a=>e.style(a,"text-transform")==="uppercase")},{label:"Una regla `:hover` para los enlaces del menú que cambia el color",test:e=>is(e,a=>/\ba:hover\b/.test(a),"color")},{label:"Sin errores en el CSS",test:e=>e.cssErrors()===0}],why:"La fuente en `body` la heredan todos. Lo del menú va en `nav a` para no tocar otros enlaces, y el `:hover` se escribe aparte: `nav a:hover`."},{kind:"code",id:"arregla-css",title:"El CSS que no hace caso",tabs:["css","html"],brief:p("Este CSS de la frutería tiene **cuatro fallos**, y por eso medio CSS no se aplica. Mira los avisos de debajo del editor: te dicen la línea. Tiene que quedar:","- la cabecera con fondo `#2f6b1f` y texto blanco;","- los precios en negrita;","- los títulos `h2` a 22px;","- el aviso con fondo `#fff3cd`."),start:{html:Fe,css:`header {
  backgroud-color: #2f6b1f;
  color: white;
}

.Precio {
  font-weight: bold;
}

h2 {
  font-size: 22
}

.aviso {
  color: #555
  background-color: #fff3cd;
}
`},solution:{html:Fe,css:`header {
  background-color: #2f6b1f;
  color: white;
}

.precio {
  font-weight: bold;
}

h2 {
  font-size: 22px;
}

.aviso {
  color: #555;
  background-color: #fff3cd;
}
`},checks:[{label:"La cabecera con fondo `#2f6b1f`",test:e=>e.color("header","background-color","#2f6b1f"),hint:"Mira cómo está escrita la propiedad."},{label:"Los precios en negrita",test:e=>e.all(".precio").every(a=>ia(e,a)),hint:"En el HTML la clase es `precio`, en minúsculas."},{label:"Los `h2` a 22px",test:e=>e.all("h2").every(a=>e.px(a,"font-size")===22)},{label:"El aviso con fondo `#fff3cd`",test:e=>e.color(".aviso","background-color","#fff3cd")},{label:"Sin errores en el CSS",test:e=>e.cssErrors()===0}],why:"Una letra de menos en la propiedad, una clase con mayúscula, un número sin unidad y un `;` olvidado: el navegador ignora en silencio lo que no entiende. Por eso se revisa con calma o con un revisor como este."},{kind:"quiz",id:"herencia",title:"Lo que se hereda",question:"Pones `body { color: #333; font-family: Arial; }`. ¿Qué pasa con los párrafos de dentro de `<main>`?",options:["Salen en Arial y #333, porque lo heredan","No cambian: habría que ponerlo en `p`","Solo cambia la fuente","Solo cambia el color"],why:"`color` y `font-family` se heredan: los hijos de `body` (y los hijos de sus hijos) los reciben. Por eso el estilo general del texto va en `body`."},{kind:"code",id:"encargo-fruteria",title:"Encargo: el estilo de la frutería",tabs:["css","html"],brief:p("**Frutería Paqui** ya tiene su HTML y te pide el estilo:","","«Nuestros colores son el verde `#2f6b1f` y el crema `#fdf3d8`. Queremos la página con fondo crema y la letra en `Georgia, serif`, de color `#333333`. La cabecera, verde con las letras blancas, y el nombre de la tienda centrado. El menú, en blanco, sin subrayar y en negrita; al pasar el ratón, en amarillo `#ffd166`. Los títulos de cada apartado, en verde. Los precios, en rojo `#c0392b` y en negrita. El aviso de temporada, en cursiva. Y el pie, centrado, con letra de 14px.»"),start:{html:Fe,css:""},solution:{html:Fe,css:`/* Colores: verde #2f6b1f y crema #fdf3d8 */
body {
  background-color: #fdf3d8;
  font-family: Georgia, serif;
  color: #333333;
}

header {
  background-color: #2f6b1f;
  color: white;
}

h1 {
  text-align: center;
}

nav a {
  color: white;
  text-decoration: none;
  font-weight: bold;
}

nav a:hover {
  color: #ffd166;
}

h2 {
  color: #2f6b1f;
}

.precio {
  color: #c0392b;
  font-weight: bold;
}

.aviso {
  font-style: italic;
}

footer {
  text-align: center;
  font-size: 14px;
}
`},checks:[{label:"Fondo crema, Georgia y texto `#333333` en toda la página",test:e=>e.color("body","background-color","#fdf3d8")&&e.style("main p","font-family").toLowerCase().startsWith("georgia")&&e.color("main p","color","#333333")},{label:"Cabecera verde con el texto blanco",test:e=>e.color("header","background-color","#2f6b1f")&&e.color("header h1","color","#ffffff")},{label:"El nombre de la tienda centrado",test:e=>e.style("h1","text-align")==="center"},{label:"Menú en blanco, sin subrayar y en negrita",test:e=>e.all("nav a").every(a=>e.color(a,"color","#ffffff")&&e.style(a,"text-decoration-line")==="none"&&ia(e,a))},{label:"Menú en `#ffd166` al pasar el ratón",test:e=>va(e.files.css).rules.some(a=>/\ba:hover\b/.test(a.selector)&&a.decls.some(n=>n.prop==="color"&&n.value.toLowerCase()==="#ffd166"))},{label:"Los `h2` en verde",test:e=>$a(e,"h2","color","#2f6b1f")},{label:"Los precios en `#c0392b` y en negrita",test:e=>$a(e,".precio","color","#c0392b")&&e.all(".precio").every(a=>ia(e,a))},{label:"El aviso en cursiva",test:e=>e.style(".aviso","font-style")==="italic"},{label:"El pie centrado y a 14px",test:e=>e.style("footer p","text-align")==="center"&&e.px("footer p","font-size")===14},{label:"Sin errores en el CSS",test:e=>e.cssErrors()===0}],why:"Así es la parte de CSS de un examen: cada frase del cliente es una regla. Lo general en `body` (se hereda), cada zona con su selector y los detalles con clases. Un comentario con los colores al principio ayuda a no equivocarse al copiarlos."}]},kn=(e,a,n)=>["top","right","bottom","left"].map(t=>e.px(a,n==="border"?`border-${t}-width`:`${n}-${t}`)),se=(e,a,n,t)=>kn(e,a,n).every(o=>o===t);function Ua(e,a,n){let t="";for(const o of va(e.files.css).rules)if(o.selector.split(",").some(l=>a(l.trim())))for(const l of o.decls)l.prop===n&&(t=l.value.toLowerCase());return t}const bt=(e,a)=>{const n=Ua(e,s=>s===a,"margin").split(/\s+/),t=(n.length===2||n.length===3)&&n[1]==="auto",o=n.length===4&&n[1]==="auto"&&n[3]==="auto",l=Ua(e,s=>s===a,"margin-left")==="auto"&&Ua(e,s=>s===a,"margin-right")==="auto";return t||o||l},Xt=(e,a)=>Math.abs(e-a)<.75,_a=(e,a,n,t,o)=>["top","right","bottom","left"].every(l=>Xt(e.px(a,`border-${l}-width`),n)&&e.style(a,`border-${l}-style`)===t&&e.color(a,`border-${l}-color`,o)),xe=H("Academia Ritmo",`    <header>
      <h1>Academia Ritmo</h1>
      <nav>
        <ul>
          <li><a href="#clases">Clases</a></li>
          <li><a href="#contacto">Contacto</a></li>
        </ul>
      </nav>
    </header>

    <main>
      <section id="clases">
        <h2>Clases</h2>
        <article class="tarjeta">
          <h3>Salsa</h3>
          <p>Lunes y miércoles, 19:00.</p>
        </article>
        <article class="tarjeta">
          <h3>Bachata</h3>
          <p>Martes y jueves, 20:00.</p>
        </article>
        <article class="tarjeta">
          <h3>Hip hop</h3>
          <p>Viernes, 18:00.</p>
        </article>
      </section>

      <section id="contacto">
        <h2>Contacto</h2>
        <p>Avenida del Puerto, 12.</p>
      </section>
    </main>

    <footer>
      <p>&copy; 2026 Academia Ritmo</p>
    </footer>`),ve=`body {
  font-family: Arial, sans-serif;
  color: #333;
}

header {
  background-color: #6d28d9;
  color: white;
}

nav a {
  color: white;
}
`,ds=[["Salsa","Lunes","19:00","Sala 1"],["Bachata","Martes","20:00","Sala 2"],["Salsa","Miércoles","19:00","Sala 1"],["Bachata","Jueves","20:00","Sala 2"],["Hip hop","Viernes","18:00","Sala 1"]],$n=e=>["<table>","  <caption>Clases de la semana</caption>","  <thead>","    <tr>","      <th>Clase</th>","      <th>Día</th>","      <th>Hora</th>","      <th>Sala</th>","    </tr>","  </thead>","  <tbody>",...ds.flatMap(a=>["    <tr>",...a.map(n=>`      <td>${n}</td>`),"    </tr>"]),"  </tbody>","</table>"].map(a=>e+a).join(`
`),Ye=H("Horario · Academia Ritmo",`    <header>
      <h1>Academia Ritmo</h1>
    </header>

    <main>
      <h2>Horario</h2>
${$n("      ")}
    </main>`),Pe=`body {
  font-family: Arial, sans-serif;
  color: #333;
}

header {
  background-color: #6d28d9;
  color: white;
  padding: 12px;
}
`,Ae=e=>e.all("th, td"),gt=H("Semana · Academia Ritmo",`    <header>
      <h1>Academia Ritmo</h1>
    </header>

    <main>
      <h2>La semana</h2>
      <div class="tabla">
        <table>
          <tr>
            <th>Hora</th>
            <th>Lunes</th>
            <th>Martes</th>
            <th>Miércoles</th>
            <th>Jueves</th>
            <th>Viernes</th>
          </tr>
          <tr>
            <td>18:00</td>
            <td>Infantil</td>
            <td>Infantil</td>
            <td>Infantil</td>
            <td>Infantil</td>
            <td>Hip hop</td>
          </tr>
          <tr>
            <td>19:00</td>
            <td>Salsa</td>
            <td>Zumba</td>
            <td>Salsa</td>
            <td>Zumba</td>
            <td>Libre</td>
          </tr>
          <tr>
            <td>20:00</td>
            <td>Tango</td>
            <td>Bachata</td>
            <td>Tango</td>
            <td>Bachata</td>
            <td>Libre</td>
          </tr>
        </table>
      </div>
    </main>`),ft=`${Pe}
table {
  border-collapse: collapse;
  min-width: 600px;
}

th,
td {
  border: 1px solid #6d28d9;
  padding: 8px;
}
`,us={n:6,intro:"Para el navegador, cada elemento es una caja. Si entiendes cómo se mide una caja (el relleno, el borde y el margen) y cómo se colocan unas junto a otras, dejarás de pelearte con los espacios. Es la base de todo lo que viene después.",lessons:[{id:"caja",title:"El modelo de caja",summary:"contenido, padding, border y margin",steps:[{text:p("Cada elemento es una caja con cuatro capas, de dentro a fuera:","- **contenido**: el texto o la imagen;","- `padding` (**relleno**): el espacio entre el contenido y el borde. Se pinta con el fondo de la caja;","- `border` (**borde**): la raya de alrededor;","- `margin` (**margen**): el espacio de fuera, que separa la caja de las demás. Es transparente.","","Truco para no confundirlos: el **padding es el acolchado de dentro**; el **margin, la distancia con los vecinos**."),code:{css:`.tarjeta {
  padding: 16px;              /* dentro */
  border: 2px solid #6d28d9;  /* la raya */
  margin: 20px;               /* fuera */
  background-color: #f3e8ff;  /* llega hasta el borde */
}`}},{text:"Cambia los números y mira qué espacio crece: el de dentro del borde (padding) o el de fuera (margin).",try:{task:"Pon `padding: 40px;` y fíjate en que el fondo lila crece. Luego pon `margin: 40px;` y verás que la caja se separa de las otras, pero el fondo no crece.",html:`<div class="tarjeta">Salsa</div>
<div class="tarjeta">Bachata</div>
`,css:`body {
  font-family: sans-serif;
}

.tarjeta {
  padding: 16px;
  border: 2px solid #6d28d9;
  margin: 20px;
  background-color: #f3e8ff;
}
`,tabs:["css","html"]}},{check:{question:"Quieres que el texto de un botón no quede pegado a su borde. ¿Qué aumentas?",options:["El `padding`","El `margin`","El `border`","El `font-size`"],why:"El espacio entre el contenido y el borde es el relleno, `padding`. El `margin` separaría el botón de lo que tiene alrededor."}}],recap:["De dentro a fuera: contenido, `padding`, `border`, `margin`.","`padding` = dentro (se pinta con el fondo).","`margin` = fuera, separa de los vecinos (transparente)."]},{id:"atajos",title:"Los atajos: lados y bordes",summary:"margin y padding con 1, 2 o 4 valores, border y border-radius",steps:[{text:p("`margin` y `padding` aceptan de 1 a 4 valores:","- `padding: 10px;`: los cuatro lados iguales.","- `padding: 10px 20px;`: arriba y abajo 10, izquierda y derecha 20.","- `padding: 5px 10px 15px 20px;`: arriba, derecha, abajo, izquierda (como las **agujas del reloj** empezando a las 12).","","Y se puede dar un lado suelto: `margin-top`, `padding-left`, `margin-bottom`…"),code:{css:`nav a {
  padding: 8px 16px;  /* 8 arriba y abajo, 16 a los lados */
}

h2 {
  margin-top: 0;
}`}},{text:p("`border` junta tres cosas en este orden: **grosor, estilo y color**. Sin el estilo (`solid`, `dashed`, `dotted`) no se ve.","- `border: 1px solid #ccc;`: los cuatro lados.","- `border-bottom: 3px solid red;`: solo abajo (un subrayado grueso).","- `border-radius: 8px;`: esquinas redondeadas. Con `50%` en una caja cuadrada sale un círculo.","","`box-shadow: 0 2px 6px rgba(0, 0, 0, 0.2);` añade una sombra (desplazamiento horizontal, vertical, difuminado y color)."),try:{task:"Cambia el borde a `dashed`, quita el estilo y verás que desaparece. Prueba `border-radius: 16px;` y añade una sombra.",html:`<div class="tarjeta">Hip hop · viernes 18:00</div>
`,css:`.tarjeta {
  font-family: sans-serif;
  padding: 16px;
  border: 2px solid #6d28d9;
  border-radius: 8px;
}
`,tabs:["css","html"]}},{check:{question:"¿Qué hace `margin: 0 20px;`?",options:["0 arriba y abajo, 20px a izquierda y derecha","0 a la izquierda y 20px a la derecha","0 arriba y 20px en los otros tres lados","20px en todos los lados"],why:"Con dos valores, el primero es arriba y abajo y el segundo, los lados. Con cuatro, va como las agujas del reloj: arriba, derecha, abajo, izquierda."}}],recap:["1 valor: los 4 lados. 2 valores: arriba-abajo y lados. 4 valores: arriba, derecha, abajo, izquierda.","`border: grosor estilo color;`, el estilo es obligatorio.","`border-radius` redondea; `box-shadow` da sombra."]},{id:"medidas",title:"Medidas y centrar",summary:"width, max-width, box-sizing y margin: 0 auto",steps:[{text:p("`width` y `height` dan el ancho y el alto del **contenido**. En px o en `%` (del padre).","","Ojo: por defecto, el padding y el borde **se suman** a ese ancho. Una caja con `width: 200px`, `padding: 20px` y `border: 5px` mide 200 + 20 + 20 + 5 + 5 = **250px**.","","Para que el `width` sea el ancho total (lo más cómodo), se pone al principio del CSS:"),code:{css:`* {
  box-sizing: border-box;
}`},exam:"Pon `* { box-sizing: border-box; }` al principio de tu CSS. Así, lo que escribes en `width` es lo que mide la caja."},{text:p("Para **centrar una caja** (por ejemplo, el contenido de la página), dale un ancho y márgenes automáticos a los lados:","","`max-width` es mejor que `width`: en una pantalla grande mide como mucho eso, y en un móvil se estrecha sola.","","Además, el `body` trae un margen de 8px que deja una franja blanca alrededor: se quita con `margin: 0`."),code:{css:`body {
  margin: 0;
}

main {
  max-width: 800px;
  margin: 0 auto;  /* 0 arriba y abajo, auto a los lados = centrado */
}`}},{text:"`text-align: center` centra el **texto** de dentro de una caja; `margin: 0 auto` centra **la caja**. No son lo mismo.",try:{task:"La caja ya está centrada. Quita `margin: 0 auto;` y verás que se va a la izquierda. Luego pon `text-align: center;` para centrar también el texto.",html:`<main>
  <h1>Academia Ritmo</h1>
  <p>Clases de baile para todas las edades.</p>
</main>
`,css:`body {
  margin: 0;
  font-family: sans-serif;
  background-color: #eee;
}

main {
  max-width: 260px;
  margin: 0 auto;
  padding: 16px;
  background-color: white;
}
`,tabs:["css","html"]}},{check:{question:"Sin `box-sizing: border-box`, una caja tiene `width: 300px`, `padding: 10px` y `border: 2px solid`. ¿Cuánto mide de ancho?",options:["324px","300px","312px","320px"],why:"300 de contenido + 10 + 10 de padding + 2 + 2 de borde = 324px. Con `box-sizing: border-box` mediría 300."}}],recap:["`* { box-sizing: border-box; }` al principio.","`max-width` + `margin: 0 auto` centra una caja.","`body { margin: 0; }` quita la franja blanca.","`text-align: center` centra el texto, no la caja."]},{id:"display",title:"Bloque y en línea",summary:"display: block, inline, inline-block y none",steps:[{text:p("Hay dos tipos de cajas:","- **de bloque** (`block`): ocupan todo el ancho y empiezan en una línea nueva. Por ejemplo `div`, `p`, `h1`, `section`, `ul`, `li`.","- **en línea** (`inline`): van una detrás de otra dentro del texto y ocupan solo lo que su contenido. Por ejemplo `a`, `span`, `strong`, `img`. **No hacen caso a `width`, `height` ni al margen de arriba y abajo.**","","Con `display` se cambia: `display: inline-block` se queda en la línea pero acepta medidas y márgenes, y `display: none` la oculta del todo."),code:{css:`nav li {
  display: inline-block;  /* las opciones del menú, una al lado de otra */
}

nav a {
  display: block;         /* para que el padding haga más grande la zona que se pulsa */
  padding: 8px 12px;
}`}},{text:"Un menú en horizontal con lo que ya sabes (en el mundo 7 lo harás aún más fácil con flexbox):",try:{task:"Quita `list-style: none;` y mira qué aparece. Después cambia `inline-block` por `block` en `nav li`: el menú se pone en vertical otra vez.",html:`<nav>
  <ul>
    <li><a href="#">Inicio</a></li>
    <li><a href="#">Clases</a></li>
    <li><a href="#">Contacto</a></li>
  </ul>
</nav>
`,css:`nav {
  background-color: #6d28d9;
  font-family: sans-serif;
}

nav ul {
  list-style: none;
  margin: 0;
  padding: 0;
}

nav li {
  display: inline-block;
}

nav a {
  display: block;
  padding: 10px 14px;
  color: white;
  text-decoration: none;
}
`,tabs:["css","html"]},exam:"Para quitar los puntos de una lista: `list-style: none;`. Y el `ul` trae padding a la izquierda: `padding: 0;` para quitarlo."},{check:{task:"Une cada valor de `display` con lo que hace.",pairs:[["`block`","Ocupa todo el ancho y empieza en línea nueva"],["`inline`","Va dentro del texto y no acepta width ni height"],["`inline-block`","Va en la línea pero acepta medidas y márgenes"],["`none`","No se muestra"]],why:"Por eso `width` no funciona en un `<a>` (es inline) hasta que le pones `display: block` o `inline-block`."}}],recap:["Bloque: todo el ancho, línea nueva (`div`, `p`, `li`…).","En línea: dentro del texto, sin width/height (`a`, `span`…).","`inline-block`: en línea pero con medidas. `none`: oculto.","Listas sin puntos: `list-style: none; padding: 0;`."]},{id:"tablas",title:"Tablas con estilo",summary:"bordes de celda, border-collapse, relleno, cabecera de color, filas a rayas y la tabla en el móvil",steps:[{text:p("Una tabla sin CSS no tiene rayas y las celdas van pegadas. Se arregla con las cajas que ya conoces, puestas en su sitio:","- el **borde va en cada celda** (`th, td`), no solo en `table`: si se lo pones solo a `table`, sale un marco por fuera y nada por dentro;","- `border-collapse: collapse` en `table` junta los bordes de las celdas vecinas en **una sola raya** (sin él salen rayas dobles con un hueco entre ellas);","- el `padding` de las celdas separa el texto de las rayas;","- la fila de cabecera se pinta en `th`, con fondo y letra de color."),code:{css:`table {
  border-collapse: collapse;  /* una sola raya entre celdas */
  width: 100%;                /* todo el ancho de su caja */
}

th,
td {
  border: 1px solid #6d28d9;  /* la raya de cada celda */
  padding: 8px;               /* el texto no toca las rayas */
  text-align: left;
}

th {
  background-color: #6d28d9;
  color: white;
}`},exam:"Si en el modelo la tabla tiene rayas, casi seguro son estas tres reglas: `border-collapse: collapse` en `table`, y `border` y `padding` en `th, td`."},{text:"Toca el CSS de la tabla y mira qué cambia.",try:{task:"Quita `border-collapse: collapse;` y verás las rayas dobles. Vuélvelo a poner y cambia el `padding` a 16px. Después borra la regla de `th, td` y deja el borde solo en `table`: sale un marco por fuera y nada dentro.",html:$n(""),css:`body {
  font-family: sans-serif;
}

table {
  border-collapse: collapse;
  width: 100%;
  border: 1px solid #6d28d9;
}

th,
td {
  border: 1px solid #6d28d9;
  padding: 8px;
  text-align: left;
}

th {
  background-color: #6d28d9;
  color: white;
}
`,tabs:["css","html"]}},{text:p("**Filas a rayas** (una sí y otra no, para leer mejor): se elige cada fila par del cuerpo con `:nth-child(even)` («hijo número par»). Con `odd` serían las impares.","","El título de la tabla (`<caption>`) también se puede pintar: `caption { font-weight: bold; padding: 8px; }`."),code:{css:`tbody tr:nth-child(even) {
  background-color: #f3e8ff;  /* la 2.ª, la 4.ª, la 6.ª… */
}

caption {
  font-weight: bold;
  padding: 8px;
}`},try:{task:"Cambia `even` por `odd` y mira qué filas se pintan. Prueba también `td:first-child { font-weight: bold; }`: la primera celda de cada fila, en negrita.",html:$n(""),css:`body {
  font-family: sans-serif;
}

table {
  border-collapse: collapse;
  width: 100%;
}

th,
td {
  border: 1px solid #6d28d9;
  padding: 8px;
}

tbody tr:nth-child(even) {
  background-color: #f3e8ff;
}
`,tabs:["css","html"]}},{text:p("**La tabla en el móvil.** Una tabla con muchas columnas no cabe en 375px y empuja toda la página hacia un lado. La solución: meterla en una caja que se desliza de lado, sin que se mueva lo demás.","","Y si en el modelo las celdas tienen el texto centrado, `text-align: center` en `th, td`."),code:{html:`<div class="tabla">
  <table>
    …
  </table>
</div>`,css:`.tabla {
  overflow-x: auto;  /* si no cabe, se desliza dentro de su caja */
}`},exam:"Mira el modelo a ancho de móvil: si la tabla es grande, envuélvela en un `<div>` con `overflow-x: auto`. Si no, la página entera se mueve de lado."},{check:{question:"Pones `border: 1px solid black;` en `table` y solo sale un marco alrededor, sin rayas entre las celdas. ¿Qué falta?",options:["El borde en `th, td`","`border-collapse: collapse` en `table`","`padding` en las celdas","`width: 100%` en `table`"],why:"El borde de `table` es solo el de fuera. Las rayas de dentro son los bordes de cada celda: `th, td { border: … }`. Después, `border-collapse` hace que no salgan dobles."}}],recap:["`table { border-collapse: collapse; }`: una sola raya.","`th, td { border: 1px solid …; padding: 8px; }`: las rayas y el aire de cada celda.","`th { background-color: …; color: …; }`: la cabecera de color.","`tbody tr:nth-child(even)`: filas a rayas (`odd`, las impares).","Tabla ancha en el móvil: dentro de un `<div>` con `overflow-x: auto`."]}],challenges:[{kind:"quiz",id:"orden",title:"De dentro a fuera",question:"¿Cuál es el orden de las capas de una caja, de dentro a fuera?",options:["contenido, padding, border, margin","contenido, margin, border, padding","margin, border, padding, contenido","contenido, border, padding, margin"],why:"El relleno (padding) toca el contenido, luego viene el borde y, por fuera de todo, el margen."},{kind:"code",id:"tarjetas",title:"Las tarjetas de las clases",tabs:["css","html"],brief:p('Las clases de la academia van en `<article class="tarjeta">`. Dales forma de tarjeta en `estilos.css`:',"- relleno de 16px por todos los lados;","- borde de 2px, continuo, de color `#6d28d9`;","- esquinas redondeadas de 8px;","- fondo blanco;","- y 20px de separación por debajo de cada tarjeta."),start:{html:xe,css:`${ve}
body {
  background-color: #f3e8ff;
}
`},solution:{html:xe,css:`${ve}
body {
  background-color: #f3e8ff;
}

.tarjeta {
  padding: 16px;
  border: 2px solid #6d28d9;
  border-radius: 8px;
  background-color: white;
  margin-bottom: 20px;
}
`},checks:[{label:"Relleno de 16px en los cuatro lados",test:e=>e.count(".tarjeta")===3&&e.all(".tarjeta").every(a=>se(e,a,"padding",16))},{label:"Borde de 2px, `solid`, `#6d28d9`",test:e=>e.all(".tarjeta").every(a=>_a(e,a,2,"solid","#6d28d9"))},{label:"Esquinas de 8px",test:e=>e.all(".tarjeta").every(a=>e.px(a,"border-top-left-radius")===8&&e.px(a,"border-bottom-right-radius")===8)},{label:"Fondo blanco",test:e=>e.all(".tarjeta").every(a=>e.color(a,"background-color","#ffffff"))},{label:"20px de margen por debajo",test:e=>e.all(".tarjeta").every(a=>e.px(a,"margin-bottom")===20)},{label:"Sin errores en el CSS",test:e=>e.cssErrors()===0}],why:"Una tarjeta es siempre lo mismo: relleno para que el texto respire, borde (o sombra), esquinas y un margen para separarla de la siguiente."},{kind:"quiz",id:"ancho-total",title:"El ancho de verdad",question:"Con `* { box-sizing: border-box; }`, una caja tiene `width: 300px`, `padding: 20px` y `border: 5px solid`. ¿Cuánto mide de ancho?",options:["300px","350px","340px","310px"],why:"Con `border-box`, el `width` ya incluye el relleno y el borde: la caja mide 300px y el contenido se queda en 300 - 40 - 10 = 250px."},{kind:"code",id:"centrar",title:"La página centrada",tabs:["css","html"],brief:p("Prepara la academia para pantallas grandes:","- que ninguna caja sume el padding ni el borde a su ancho (`box-sizing`, para todos los elementos);","- que la página no tenga la franja blanca de alrededor;","- que el `<main>` mida como mucho 800px y esté **centrado**, con 16px de relleno.","","En la vista previa no se nota que está centrado porque es estrecha: se comprueba en lo que escribes."),start:{html:xe,css:ve},solution:{html:xe,css:`* {
  box-sizing: border-box;
}

${ve.replace(`body {
`,`body {
  margin: 0;
`)}
main {
  max-width: 800px;
  margin: 0 auto;
  padding: 16px;
}
`},checks:[{label:"Todos los elementos con `box-sizing: border-box`",test:e=>["main","header","p","nav a"].every(a=>e.style(a,"box-sizing")==="border-box")&&Ua(e,a=>a==="*","box-sizing")==="border-box"},{label:"El `body` sin margen",test:e=>se(e,"body","margin",0)},{label:"`<main>` con `max-width: 800px`",test:e=>e.style("main","max-width")==="800px"},{label:"`<main>` centrado con margin auto a los lados",test:e=>bt(e,"main"),hint:"`margin: 0 auto;`"},{label:"`<main>` con 16px de relleno",test:e=>se(e,"main","padding",16)},{label:"Sin errores en el CSS",test:e=>e.cssErrors()===0}],why:"Estas tres reglas (`box-sizing`, `body { margin: 0 }` y el contenedor centrado con `max-width` y `margin: 0 auto`) están al principio de casi todas las webs."},{kind:"match",id:"atajos",title:"Lee el atajo",task:"Une cada declaración con lo que hace.",pairs:[["`padding: 10px;`","10px de relleno en los cuatro lados"],["`padding: 10px 30px;`","10px arriba y abajo, 30px a los lados"],["`margin: 0 auto;`","Centra la caja (si tiene ancho)"],["`margin-bottom: 20px;`","Separa 20px de lo que hay debajo"],["`border: 1px dashed gray;`","Borde gris discontinuo de 1px"],["`border-radius: 50%;`","Un círculo, si la caja es cuadrada"]],why:"Con dos valores: arriba-abajo y lados. `auto` a los lados reparte el espacio que sobra y centra. En `border`: grosor, estilo y color."},{kind:"code",id:"menu",title:"El menú en fila",tabs:["css","html"],brief:p("Pon el menú de la academia en horizontal, sin flexbox:","- la lista del menú sin puntos, sin margen y sin relleno;","- cada opción (`li`) en la misma línea, pero que acepte medidas (`inline-block`);","- cada enlace como bloque, con 10px de relleno arriba y abajo y 14px a los lados, y sin subrayado."),start:{html:xe,css:ve},solution:{html:xe,css:`${ve}
nav ul {
  list-style: none;
  margin: 0;
  padding: 0;
}

nav li {
  display: inline-block;
}

nav a {
  display: block;
  padding: 10px 14px;
  text-decoration: none;
}
`},checks:[{label:"La lista del menú sin puntos",test:e=>e.style("nav ul","list-style-type")==="none"||e.all("nav li").every(a=>e.style(a,"list-style-type")==="none")},{label:"La lista sin margen ni relleno",test:e=>se(e,"nav ul","margin",0)&&se(e,"nav ul","padding",0)},{label:"Cada `li` con `display: inline-block`",test:e=>e.all("nav li").every(a=>e.style(a,"display")==="inline-block")},{label:"Los enlaces como bloque, con relleno de 10px y 14px",test:e=>e.all("nav a").every(a=>e.style(a,"display")==="block"&&kn(e,a,"padding").join()==="10,14,10,14")},{label:"Los enlaces sin subrayado",test:e=>e.all("nav a").every(a=>e.style(a,"text-decoration-line")==="none")},{label:"Sin errores en el CSS",test:e=>e.cssErrors()===0}],why:"Una lista se pone en fila cambiando el `display` de sus `li`. El enlace como bloque hace que toda la zona con relleno se pueda pulsar."},{kind:"code",id:"arregla-cajas",title:"Las cajas rotas",tabs:["css","html"],brief:p("Este CSS de la academia tiene **cuatro fallos**:","- el relleno de las tarjetas no se aplica;","- las esquinas no salen redondeadas;","- el borde de las tarjetas no se ve;","- y ha desaparecido el pie de la página.","","Tienen que quedar con 12px de relleno, esquinas de 6px, un borde de 1px continuo `#6d28d9` y el pie a la vista."),start:{html:xe,css:`${ve}
.tarjeta {
  padding: 12;
  border-raduis: 6px;
  border: 1px #6d28d9;
}

footer {
  display: none;
  background-color: #ede9fe;
}
`},solution:{html:xe,css:`${ve}
.tarjeta {
  padding: 12px;
  border-radius: 6px;
  border: 1px solid #6d28d9;
}

footer {
  background-color: #ede9fe;
}
`},checks:[{label:"Relleno de 12px en las tarjetas",test:e=>e.all(".tarjeta").every(a=>se(e,a,"padding",12)),hint:"Los números llevan unidad."},{label:"Esquinas de 6px",test:e=>e.all(".tarjeta").every(a=>e.px(a,"border-top-left-radius")===6)},{label:"Borde de 1px, `solid`, `#6d28d9`",test:e=>e.all(".tarjeta").every(a=>_a(e,a,1,"solid","#6d28d9")),hint:"Un borde necesita grosor, **estilo** y color."},{label:"El pie se ve",test:e=>e.style("footer","display")!=="none"&&e.color("footer","background-color","#ede9fe")},{label:"Sin errores en el CSS",test:e=>e.cssErrors()===0}],why:"Sin unidad, con la propiedad mal escrita o sin el estilo del borde, el navegador ignora la declaración sin avisar. Y `display: none` esconde el elemento entero: úsalo solo a propósito."},{kind:"quiz",id:"enlace-ancho",title:"El enlace que no crece",question:"Pones `width: 200px;` a un `<a>` y no cambia nada. ¿Por qué?",options:["Porque `<a>` es inline y no acepta width","Porque falta `box-sizing`","Porque los enlaces no aceptan CSS","Porque hay que ponerlo en el `href`"],why:"Los elementos en línea (`a`, `span`, `strong`) ignoran `width` y `height`. Con `display: inline-block` o `block` ya hacen caso."},{kind:"code",id:"encargo-academia",title:"Encargo: las cajas de la academia",tabs:["css","html"],brief:p("**Academia Ritmo** te pide el CSS de las cajas:","","«Que no haya franja blanca alrededor de la página y que todo se mida con el borde incluido. La cabecera con 16px de relleno. El menú en una fila, sin puntos, y cada opción con 8px de relleno arriba y abajo y 12px a los lados. El contenido, de 900px como mucho y centrado, con 20px de relleno. Cada clase en una tarjeta blanca con 16px de relleno, un borde inferior de 4px de color #6d28d9 (solo abajo), esquinas de 10px y 16px de separación con la siguiente. Y el pie con 12px de relleno y el texto centrado.»"),start:{html:xe,css:`${ve}
main {
  background-color: #f3e8ff;
}
`},solution:{html:xe,css:`* {
  box-sizing: border-box;
}

${ve.replace(`body {
`,`body {
  margin: 0;
`).replace(`header {
`,`header {
  padding: 16px;
`)}
nav ul {
  list-style: none;
  padding: 0;
}

nav li {
  display: inline-block;
}

nav a {
  display: inline-block;
  padding: 8px 12px;
}

main {
  background-color: #f3e8ff;
  max-width: 900px;
  margin: 0 auto;
  padding: 20px;
}

.tarjeta {
  background-color: white;
  padding: 16px;
  border-bottom: 4px solid #6d28d9;
  border-radius: 10px;
  margin-bottom: 16px;
}

footer {
  padding: 12px;
  text-align: center;
}
`},checks:[{label:"Sin franja blanca y todo con `box-sizing: border-box`",test:e=>se(e,"body","margin",0)&&["main",".tarjeta","footer"].every(a=>e.style(a,"box-sizing")==="border-box")},{label:"Cabecera con 16px de relleno",test:e=>se(e,"header","padding",16)},{label:"Menú en fila y sin puntos",test:e=>e.all("nav li").every(a=>["inline-block","inline"].includes(e.style(a,"display"))&&e.style(a,"list-style-type")==="none")},{label:"Cada opción con relleno de 8px y 12px",test:e=>e.all("nav a").every(a=>kn(e,a,"padding").join()==="8,12,8,12")},{label:"Contenido de 900px como mucho, centrado y con 20px de relleno",test:e=>e.style("main","max-width")==="900px"&&bt(e,"main")&&se(e,"main","padding",20)},{label:"Tarjetas blancas con 16px de relleno",test:e=>e.all(".tarjeta").every(a=>e.color(a,"background-color","#ffffff")&&se(e,a,"padding",16))},{label:"Solo el borde de abajo: 4px, `#6d28d9`",test:e=>e.all(".tarjeta").every(a=>Xt(e.px(a,"border-bottom-width"),4)&&e.color(a,"border-bottom-color","#6d28d9")&&e.style(a,"border-bottom-style")==="solid"&&e.px(a,"border-top-width")===0&&e.px(a,"border-left-width")===0)},{label:"Esquinas de 10px y 16px de separación",test:e=>e.all(".tarjeta").every(a=>e.px(a,"border-top-left-radius")===10&&e.px(a,"margin-bottom")===16)},{label:"Pie con 12px de relleno y texto centrado",test:e=>se(e,"footer","padding",12)&&e.style("footer p","text-align")==="center"},{label:"Sin errores en el CSS",test:e=>e.cssErrors()===0}],why:"Cada frase del cliente es una caja: relleno, borde, márgenes y display. Con `box-sizing: border-box` y el contenedor centrado, el resto encaja solo."},{kind:"match",id:"tabla-reglas",title:"Cada regla en su sitio",task:"Une cada regla con lo que hace en la tabla.",pairs:[["`table { border-collapse: collapse; }`","Una sola raya entre celdas vecinas"],["`th, td { border: 1px solid gray; }`","Las rayas de dentro de la tabla"],["`th, td { padding: 8px; }`","Aire entre el texto y las rayas"],["`th { background-color: navy; }`","La fila de cabecera de color"],["`tbody tr:nth-child(even) { … }`","Una fila sí y otra no (las pares)"],["`.tabla { overflow-x: auto; }`","La tabla se desliza de lado si no cabe"]],why:"Las rayas y el relleno van en las celdas; `border-collapse` va en la tabla; y la tabla ancha, en una caja que se desliza."},{kind:"code",id:"tabla-horario",title:"El horario con estilo",tabs:["css","html"],brief:p("Dale estilo al horario de la academia:","- la tabla con una sola raya entre celdas y todo el ancho;","- cada celda (`th` y `td`) con un borde de 1px continuo `#6d28d9` y 8px de relleno;","- la cabecera con fondo `#6d28d9` y letra blanca;","- y el texto de las celdas alineado a la izquierda."),start:{html:Ye,css:Pe},solution:{html:Ye,css:`${Pe}
table {
  border-collapse: collapse;
  width: 100%;
}

th,
td {
  border: 1px solid #6d28d9;
  padding: 8px;
  text-align: left;
}

th {
  background-color: #6d28d9;
  color: white;
}
`},checks:[{label:"Una sola raya entre celdas (`border-collapse`)",test:e=>e.style("table","border-collapse")==="collapse"},{label:"La tabla ocupa todo el ancho",test:e=>Math.abs(e.q("table").getBoundingClientRect().width-e.q("main").getBoundingClientRect().width)<2,hint:"`width: 100%;` en `table`."},{label:"Cada celda con borde de 1px, `solid`, `#6d28d9`",test:e=>Ae(e).length===24&&Ae(e).every(a=>_a(e,a,1,"solid","#6d28d9")),hint:"El borde va en `th, td`, no solo en `table`."},{label:"Cada celda con 8px de relleno",test:e=>Ae(e).every(a=>se(e,a,"padding",8))},{label:"Cabecera con fondo `#6d28d9` y letra blanca",test:e=>e.all("th").every(a=>e.color(a,"background-color","#6d28d9")&&e.color(a,"color","#ffffff"))},{label:"Texto de las celdas a la izquierda",test:e=>Ae(e).every(a=>["left","start"].includes(e.style(a,"text-align"))),hint:"Los `th` vienen centrados: `text-align: left;` en `th, td`."},{label:"Sin errores en el CSS",test:e=>e.cssErrors()===0}],why:"Una tabla con estilo son tres reglas: `border-collapse` en `table`, `border` y `padding` en `th, td`, y el color de la cabecera en `th`."},{kind:"code",id:"tabla-rayas",title:"Las filas a rayas",tabs:["css","html"],brief:p("El horario ya tiene rayas. Ahora:","- pinta las filas **pares** del cuerpo de la tabla con fondo `#f3e8ff` (las impares se quedan sin fondo);","- pon en negrita la primera celda de cada fila del cuerpo (el nombre de la clase);","- y el título de la tabla (`caption`) en negrita y con 8px de relleno."),start:{html:Ye,css:`${Pe}
table {
  border-collapse: collapse;
  width: 100%;
}

th,
td {
  border: 1px solid #6d28d9;
  padding: 8px;
}
`},solution:{html:Ye,css:`${Pe}
table {
  border-collapse: collapse;
  width: 100%;
}

th,
td {
  border: 1px solid #6d28d9;
  padding: 8px;
}

tbody tr:nth-child(even) {
  background-color: #f3e8ff;
}

tbody td:first-child {
  font-weight: bold;
}

caption {
  font-weight: bold;
  padding: 8px;
}
`},checks:[{label:"Las filas pares con fondo `#f3e8ff` y las impares sin él",test:e=>e.all("tbody tr").length===5&&e.all("tbody tr").every((a,n)=>e.color(a,"background-color","#f3e8ff")===(n%2===1)),hint:"`tbody tr:nth-child(even)`"},{label:"La primera celda de cada fila en negrita",test:e=>e.all("tbody tr").every(a=>Number(e.style(a.children[0],"font-weight"))>=700&&Number(e.style(a.children[1],"font-weight"))<700),hint:"`tbody td:first-child`"},{label:"El título en negrita y con 8px de relleno",test:e=>Number(e.style("caption","font-weight"))>=700&&se(e,"caption","padding",8)},{label:"Sin errores en el CSS",test:e=>e.cssErrors()===0}],why:"`:nth-child(even)` elige los hijos pares y `:first-child`, el primero. Con `tbody` delante, la fila de cabecera no cuenta."},{kind:"code",id:"tabla-rota",title:"La tabla rota",tabs:["css","html"],brief:p("Este CSS del horario tiene **cuatro fallos**:","- salen rayas dobles entre las celdas;","- las celdas no tienen rayas;","- el relleno de las celdas no se aplica;","- y la cabecera no sale de color.","","Tiene que quedar con una sola raya, celdas con borde de 1px continuo `#999` y 10px de relleno, y la cabecera con fondo `#ede9fe`."),start:{html:Ye,css:`${Pe}
table {
  border-colapse: collapse;
}

th,
td {
  border: 1px #999;
  padding: 10;
}

thead {
  background-color: #ede9fe
}

th {
  background-color: white;
}
`},solution:{html:Ye,css:`${Pe}
table {
  border-collapse: collapse;
}

th,
td {
  border: 1px solid #999;
  padding: 10px;
}

th {
  background-color: #ede9fe;
}
`},checks:[{label:"Una sola raya entre celdas",test:e=>e.style("table","border-collapse")==="collapse",hint:"Mira cómo está escrita la propiedad."},{label:"Celdas con borde de 1px, `solid`, `#999`",test:e=>Ae(e).every(a=>_a(e,a,1,"solid","#999999")),hint:"Un borde necesita grosor, **estilo** y color."},{label:"Celdas con 10px de relleno",test:e=>Ae(e).every(a=>se(e,a,"padding",10)),hint:"Los números llevan unidad."},{label:"La cabecera con fondo `#ede9fe`",test:e=>e.all("th").every(a=>e.color(a,"background-color","#ede9fe")),hint:"El fondo blanco de `th` tapa el de `thead`: píntalo en `th`."},{label:"Sin errores en el CSS",test:e=>e.cssErrors()===0}],why:"Una letra de más o de menos, un número sin unidad o un borde sin estilo hacen que el navegador ignore la línea sin avisar. Y el fondo de una celda tapa el de la fila que la contiene."},{kind:"code",id:"tabla-movil",title:"La tabla que no cabe",tabs:["css","html"],brief:p("El horario de la semana tiene seis columnas y mide como mínimo 600px. En el móvil (375px) no cabe y empuja la página entera hacia un lado.","",'La tabla ya está dentro de `<div class="tabla">`. Haz que, si no cabe, se deslice de lado **dentro de su caja**, sin que la página se mueva. Y centra el texto de todas las celdas.'),start:{html:gt,css:ft},solution:{html:gt,css:ft.replace(`  padding: 8px;
}`,`  padding: 8px;
  text-align: center;
}`)+`
.tabla {
  overflow-x: auto;
}
`},checks:[{label:"La caja de la tabla se desliza de lado",test:e=>["auto","scroll"].includes(e.style(".tabla","overflow-x")),hint:"`overflow-x: auto;` en `.tabla`."},{label:"En el móvil, la página no se mueve de lado",test:async e=>{const a=await e.at(375),n=a.q(".tabla");return!!n&&a.q("html").scrollWidth<=376&&n.scrollWidth>n.clientWidth}},{label:"El texto de las celdas centrado",test:e=>Ae(e).every(a=>e.style(a,"text-align")==="center")},{label:"Sin errores en el CSS",test:e=>e.cssErrors()===0}],why:"Una tabla no se encoge más que su contenido. En vez de romper la página, se mete en una caja con `overflow-x: auto` y solo se desliza esa caja."}]},Ge=(e,a)=>e.px(a,"column-gap"),ce=H("Restaurante Mar",`    <header>
      <img src="img/logo.svg" alt="Logo del Restaurante Mar" width="50">
      <nav>
        <ul>
          <li><a href="#carta">Carta</a></li>
          <li><a href="#reservas">Reservas</a></li>
          <li><a href="#contacto">Contacto</a></li>
        </ul>
      </nav>
    </header>

    <section class="portada">
      <h1>Restaurante Mar</h1>
    </section>

    <main>
      <section id="carta">
        <h2>Carta</h2>
        <div class="platos">
          <article class="plato">
            <h3>Merluza en salsa verde</h3>
            <p>18 €</p>
          </article>
          <article class="plato">
            <h3>Arroz con almejas</h3>
            <p>16 €</p>
          </article>
          <article class="plato">
            <h3>Tarta de queso</h3>
            <p>6 €</p>
          </article>
        </div>
      </section>
    </main>

    <footer>
      <p>Calle del Puerto, 2</p>
      <p>944 000 000</p>
      <p>&copy; 2026 Restaurante Mar</p>
    </footer>`),de=`* {
  box-sizing: border-box;
}

body {
  margin: 0;
  font-family: Arial, sans-serif;
  color: #1d2b3a;
}

header {
  background-color: #0e4c6d;
  padding: 8px 16px;
}

nav ul {
  list-style: none;
  margin: 0;
  padding: 0;
}

nav a {
  color: white;
  text-decoration: none;
}

.portada {
  background-color: #cfe8f3;
}

.portada h1 {
  margin: 0;
}

main {
  padding: 16px;
}

.plato {
  background-color: #f2f8fb;
  border-radius: 8px;
  padding: 12px;
}

footer {
  background-color: #0e4c6d;
  color: white;
  padding: 0 16px;
}
`,ps={n:7,intro:"Flexbox coloca cajas en fila (o en columna) y reparte el espacio entre ellas. Con cuatro propiedades haces el menú horizontal, la cabecera con el logo a un lado y el menú al otro, y las tarjetas que se colocan solas. Es lo que más se usa para maquetar, y en el examen casi seguro.",lessons:[{id:"contenedor",title:"El contenedor y sus hijos",summary:"display: flex y gap",steps:[{text:p("Flexbox siempre tiene dos partes:","- el **contenedor**: la caja a la que pones `display: flex`;","- sus **hijos directos**: se colocan **en fila**, uno al lado de otro.","","La regla de oro: **`display: flex` va en el padre**, no en las cajas que quieres mover. Para poner en fila las opciones de un menú, el flex va en el `ul` (que es el padre de los `li`).","","`gap` es el hueco entre los hijos."),code:{css:`nav ul {
  display: flex;  /* los li, en fila */
  gap: 16px;      /* 16px entre cada uno */
  list-style: none;
  padding: 0;
}`}},{text:"El menú de siempre, ahora con flexbox: mucho más corto que con `inline-block`.",try:{task:"Quita `display: flex;` y el menú vuelve a la vertical. Ponlo otra vez y cambia el `gap` a 40px.",html:`<nav>
  <ul>
    <li><a href="#">Carta</a></li>
    <li><a href="#">Reservas</a></li>
    <li><a href="#">Contacto</a></li>
  </ul>
</nav>
`,css:`nav {
  background-color: #0e4c6d;
  padding: 10px;
  font-family: sans-serif;
}

nav ul {
  display: flex;
  gap: 16px;
  list-style: none;
  margin: 0;
  padding: 0;
}

nav a {
  color: white;
}
`,tabs:["css","html"]},exam:"Si pones `display: flex` y no pasa nada, casi seguro lo has puesto en los hijos (`li`) en vez de en el padre (`ul`)."},{check:{question:'Quieres las tres tarjetas de `<div class="tarjetas">` en fila. ¿Dónde pones `display: flex`?',options:["En `.tarjetas`, el padre","En cada `.tarjeta`","En el `body`","En las dos"],why:"Flex se pone en el contenedor y afecta a sus hijos directos. Si lo pones en cada tarjeta, lo que se coloca en fila es lo de dentro de cada una."}}],recap:["`display: flex` en el padre: sus hijos directos, en fila.","`gap`: hueco entre los hijos.","Menú: `nav ul { display: flex; list-style: none; padding: 0; }`."]},{id:"repartir",title:"Repartir y alinear",summary:"justify-content y align-items",steps:[{text:p("Flexbox tiene dos direcciones:","- `justify-content` reparte los hijos **a lo largo de la fila** (horizontal):","- `flex-start` (al principio, lo normal), `center`, `flex-end` (al final);","- `space-between`: el primero a un lado, el último al otro y el resto repartido;","- `space-around` y `space-evenly`: espacio también en los extremos.","","`align-items` los coloca **en la otra dirección** (vertical en una fila): `center`, `flex-start` (arriba), `flex-end` (abajo) o `stretch` (estirados, lo normal)."),code:{css:`header {
  display: flex;
  justify-content: space-between;  /* logo a la izquierda, menú a la derecha */
  align-items: center;             /* centrados en vertical */
}`}},{text:"La cabecera más pedida: el logo a un lado y el menú al otro, centrados en vertical.",try:{task:"Prueba en el `header` `justify-content: center;`, luego `flex-end;` y vuelve a `space-between;`. Después quita `align-items: center;` y mira cómo el menú sube.",html:`<header>
  <img src="img/logo.svg" alt="Logo" width="60">
  <nav>
    <a href="#">Carta</a>
    <a href="#">Reservas</a>
  </nav>
</header>
`,css:`header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: #0e4c6d;
  padding: 8px 16px;
  font-family: sans-serif;
}

nav {
  display: flex;
  gap: 12px;
}

nav a {
  color: white;
}
`,tabs:["css","html"]},exam:"Cabecera con logo y menú: `display: flex; justify-content: space-between; align-items: center;`. Apréndetela de memoria."},{check:{task:"Une cada valor de `justify-content` con cómo quedan tres cajas en la fila.",pairs:[["`flex-start`","Las tres juntas a la izquierda"],["`center`","Las tres juntas en el centro"],["`flex-end`","Las tres juntas a la derecha"],["`space-between`","Una en cada extremo y la otra en medio"],["`space-evenly`","Separadas con el mismo espacio, también en los bordes"]],why:"`justify-content` reparte a lo largo de la fila; para la otra dirección, `align-items`."}}],recap:["`justify-content`: a lo largo (en fila, horizontal).","`align-items`: en la otra dirección (en fila, vertical).","Logo y menú: `space-between` + `align-items: center`."]},{id:"columnas",title:"Columnas, saltos de línea y centrar",summary:"flex-direction, flex-wrap, flex y centrar del todo",steps:[{text:p("`flex-direction: column` pone los hijos **uno debajo de otro**. Ojo: entonces los ejes se cambian, y `justify-content` pasa a ser vertical y `align-items` horizontal.","","`flex-wrap: wrap` deja que los hijos **bajen a otra línea** cuando no caben. Sin él, flexbox los aprieta todos en una fila.","","En los hijos, `flex: 1` los hace **crecer** para repartirse el sitio que sobra a partes iguales. Con `flex: 1 1 200px` crecen, pero no bajan de unos 200px: si no caben, saltan a la línea de abajo."),code:{css:`.platos {
  display: flex;
  flex-wrap: wrap;
  gap: 16px;
}

.plato {
  flex: 1 1 200px;  /* crece, encoge y mide unos 200px */
}`}},{text:"Las tarjetas que se colocan solas: en una pantalla ancha van en fila y en una estrecha bajan.",try:{task:"Quita `flex-wrap: wrap;` y verás que se aprietan en una fila. Ponlo otra vez y cambia `200px` por `120px`: caben más por fila.",html:`<div class="platos">
  <article class="plato">Merluza</article>
  <article class="plato">Arroz</article>
  <article class="plato">Tarta</article>
</div>
`,css:`.platos {
  display: flex;
  flex-wrap: wrap;
  gap: 16px;
  font-family: sans-serif;
}

.plato {
  flex: 1 1 200px;
  padding: 16px;
  background-color: #cfe8f3;
  border-radius: 8px;
}
`,tabs:["css","html"]}},{text:"Y el truco para **centrar algo del todo**, en horizontal y en vertical, dentro de una caja con altura:",code:{css:`.portada {
  height: 300px;
  display: flex;
  justify-content: center;  /* horizontal */
  align-items: center;      /* vertical */
}`},exam:"Centrar del todo = `display: flex; justify-content: center; align-items: center;` y que la caja tenga altura."},{check:{question:"Tienes `display: flex; flex-direction: column;`. ¿Qué propiedad centra los hijos en horizontal?",options:["`align-items: center`","`justify-content: center`","`text-align: center`","`flex-wrap: center`"],why:"En columna, el eje principal es el vertical (`justify-content`) y el horizontal pasa a `align-items`."}}],recap:["`flex-direction: column`: en columna (los ejes se cambian).","`flex-wrap: wrap`: bajan a otra línea si no caben.","En los hijos, `flex: 1` (crecen) o `flex: 1 1 200px`.","Centrar del todo: `justify-content` y `align-items` en `center`."]}],challenges:[{kind:"quiz",id:"padre",title:"¿Dónde va el flex?",question:"Para poner en fila los `<li>` de un menú, ¿a qué le pones `display: flex`?",options:["Al `<ul>`","A cada `<li>`","A cada `<a>`","Al `<head>`"],why:"Flex va en el contenedor y coloca a sus hijos directos. Los `li` son hijos del `ul`."},{kind:"code",id:"menu",title:"El menú con flexbox",tabs:["css","html"],brief:p("Pon el menú del restaurante en horizontal con flexbox:","- las opciones en fila, con 24px de hueco entre ellas;","- y la lista ya está sin puntos (míralo en el CSS)."),start:{html:ce,css:de},solution:{html:ce,css:de.replace(`nav ul {
`,`nav ul {
  display: flex;
  gap: 24px;
`)},checks:[{label:"El `ul` del menú con `display: flex`",test:e=>V(e,"nav ul"),hint:"En el padre de los `li`."},{label:"Las opciones salen en fila",test:e=>qe(e,"nav li")},{label:"24px de hueco entre ellas",test:e=>Ge(e,"nav ul")===24},{label:"Sin errores en el CSS",test:e=>e.cssErrors()===0}],why:"Con flexbox, un menú horizontal son dos líneas en el `ul`: `display: flex` y `gap`."},{kind:"match",id:"ejes",title:"Cada propiedad en su sitio",task:"Une cada propiedad con lo que hace (en una fila normal).",pairs:[["`display: flex`","Pone a los hijos en fila"],["`justify-content`","Los reparte en horizontal"],["`align-items`","Los coloca en vertical"],["`flex-wrap: wrap`","Los deja bajar a otra línea"],["`gap`","El hueco entre ellos"],["`flex-direction: column`","Los pone uno debajo de otro"]],why:"Todas van en el contenedor. En los hijos solo se suele poner `flex` (cuánto crecen)."},{kind:"code",id:"cabecera",title:"La cabecera del restaurante",tabs:["css","html"],brief:p("Ahora la cabecera: el logo a la izquierda y el menú a la derecha, centrados en vertical. Y el menú en fila, con 16px de hueco."),start:{html:ce,css:de},solution:{html:ce,css:de.replace(`header {
`,`header {
  display: flex;
  justify-content: space-between;
  align-items: center;
`).replace(`nav ul {
`,`nav ul {
  display: flex;
  gap: 16px;
`)},checks:[{label:"La cabecera es un contenedor flex",test:e=>V(e,"header")},{label:"Logo a un lado y menú al otro",test:e=>e.style("header","justify-content")==="space-between"},{label:"Centrados en vertical",test:e=>e.style("header","align-items")==="center"},{label:"El menú en fila con 16px de hueco",test:e=>V(e,"nav ul")&&Ge(e,"nav ul")===16&&qe(e,"nav li")},{label:"Sin errores en el CSS",test:e=>e.cssErrors()===0}],why:"Dos contenedores flex, uno dentro de otro: la cabecera reparte logo y menú, y el `ul` pone las opciones en fila. Es la cabecera de casi todas las webs."},{kind:"quiz",id:"vertical",title:"Centrar en vertical",question:"En una cabecera con `display: flex`, el logo es más alto que el menú y el menú queda arriba. ¿Qué lo centra en vertical?",options:["`align-items: center;` en la cabecera","`justify-content: center;` en la cabecera","`vertical-align: middle;` en el menú","`margin: auto;` en el logo"],why:"En una fila, la dirección vertical es la de `align-items`. `justify-content` reparte en horizontal."},{kind:"code",id:"platos",title:"Los platos en tarjetas",tabs:["css","html"],brief:p('Coloca los platos de la carta (están en `<div class="platos">`) como tarjetas:',"- en fila, con 16px de hueco;","- que bajen a otra línea si no caben;","- y cada plato (`.plato`) que crezca para repartirse el sitio, con una base de 200px."),start:{html:ce,css:de},solution:{html:ce,css:`${de}
.platos {
  display: flex;
  flex-wrap: wrap;
  gap: 16px;
}
`.replace(`.plato {
`,`.plato {
  flex: 1 1 200px;
`)},checks:[{label:"`.platos` con `display: flex`",test:e=>V(e,".platos")},{label:"Bajan a otra línea si no caben",test:e=>e.style(".platos","flex-wrap")==="wrap"},{label:"16px de hueco",test:e=>Ge(e,".platos")===16&&e.px(".platos","row-gap")===16},{label:"Cada plato crece (`flex-grow` 1) con base de 200px",test:e=>e.all(".plato").every(a=>Number(e.style(a,"flex-grow"))>=1&&e.style(a,"flex-basis")==="200px")},{label:"Sin errores en el CSS",test:e=>e.cssErrors()===0}],why:"`flex-wrap: wrap` y `flex: 1 1 200px` hacen tarjetas que se adaptan solas: en una pantalla ancha, tres en fila; en el móvil, una debajo de otra. Sin media queries."},{kind:"code",id:"portada",title:"La portada centrada",tabs:["css","html"],brief:p("La portada (`.portada`) tiene que medir 200px de alto y llevar el título **centrado del todo**: en horizontal y en vertical. Hazlo con flexbox."),start:{html:ce,css:de},solution:{html:ce,css:de.replace(`.portada {
`,`.portada {
  height: 200px;
  display: flex;
  justify-content: center;
  align-items: center;
`)},checks:[{label:"La portada mide 200px de alto",test:e=>Math.round(e.q(".portada")?.getBoundingClientRect().height??0)===200},{label:"Es un contenedor flex",test:e=>V(e,".portada")},{label:"El título centrado en horizontal y en vertical",test:e=>e.style(".portada","justify-content")==="center"&&e.style(".portada","align-items")==="center"},{label:"Sin errores en el CSS",test:e=>e.cssErrors()===0}],why:"Centrar del todo: caja con altura, `display: flex`, `justify-content: center` y `align-items: center`. Antes de flexbox esto era un lío; ahora son tres líneas."},{kind:"code",id:"arregla-flex",title:"El flex que no funciona",tabs:["css","html"],brief:p("Este CSS del restaurante tiene **cuatro fallos** y nada se coloca como debe:","- el menú no se pone en fila;","- el logo y el menú no se separan a los lados;","- no se centran en vertical;","- y entre los platos no hay hueco."),start:{html:ce,css:`${de}
header {
  display: flex;
  justify-contents: space-between;
  align-items: middle;
}

nav li {
  display: flex;
}

.platos {
  display: flex;
  gap: 16;
}
`},solution:{html:ce,css:`${de}
header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

nav ul {
  display: flex;
}

.platos {
  display: flex;
  gap: 16px;
}
`},checks:[{label:"El menú en fila",test:e=>V(e,"nav ul")&&qe(e,"nav li"),hint:"El flex va en el padre de los `li`."},{label:"Logo y menú separados a los lados",test:e=>e.style("header","justify-content")==="space-between"},{label:"Centrados en vertical",test:e=>e.style("header","align-items")==="center",hint:"`middle` no es un valor de `align-items`."},{label:"Hueco de 16px entre los platos",test:e=>Ge(e,".platos")===16},{label:"Sin errores en el CSS",test:e=>e.cssErrors()===0}],why:"Flex en los hijos en vez de en el padre, una propiedad mal escrita, un valor que no existe (`middle` es de `vertical-align`) y un número sin unidad. El navegador los ignora todos sin decir nada."},{kind:"code",id:"encargo-restaurante",title:"Encargo: el restaurante",tabs:["css","html"],brief:p("**Restaurante Mar** te pide la maquetación:","","«En la cabecera, el logo a la izquierda y el menú a la derecha, centrados en vertical; el menú en una fila con 20px entre las opciones. La portada, de 250px de alto, con el título en el centro del todo. Los platos de la carta, como tarjetas en fila con 16px de hueco, que se coloquen en varias líneas si no caben y que cada una crezca a partir de 180px. Y en el pie, los tres datos en una fila, repartidos con el mismo espacio a los lados.»"),start:{html:ce,css:de},solution:{html:ce,css:de.replace(`header {
`,`header {
  display: flex;
  justify-content: space-between;
  align-items: center;
`).replace(`nav ul {
`,`nav ul {
  display: flex;
  gap: 20px;
`).replace(`.portada {
`,`.portada {
  height: 250px;
  display: flex;
  justify-content: center;
  align-items: center;
`).replace(`.plato {
`,`.platos {
  display: flex;
  flex-wrap: wrap;
  gap: 16px;
}

.plato {
  flex: 1 1 180px;
`).replace(`footer {
`,`footer {
  display: flex;
  justify-content: space-around;
`)},checks:[{label:"Cabecera: logo y menú a los lados, centrados en vertical",test:e=>V(e,"header")&&e.style("header","justify-content")==="space-between"&&e.style("header","align-items")==="center"},{label:"Menú en fila con 20px de hueco",test:e=>V(e,"nav ul")&&Ge(e,"nav ul")===20&&qe(e,"nav li")},{label:"Portada de 250px con el título en el centro del todo",test:e=>Math.round(e.q(".portada")?.getBoundingClientRect().height??0)===250&&V(e,".portada")&&e.style(".portada","justify-content")==="center"&&e.style(".portada","align-items")==="center"},{label:"Platos en fila, con salto de línea y 16px de hueco",test:e=>V(e,".platos")&&e.style(".platos","flex-wrap")==="wrap"&&Ge(e,".platos")===16},{label:"Cada plato crece a partir de 180px",test:e=>e.all(".plato").every(a=>Number(e.style(a,"flex-grow"))>=1&&e.style(a,"flex-basis")==="180px")},{label:"Pie: los tres datos en fila, con el mismo espacio a los lados",test:e=>V(e,"footer")&&["space-around","space-evenly"].includes(e.style("footer","justify-content"))&&qe(e,"footer p")},{label:"Sin errores en el CSS",test:e=>e.cssErrors()===0}],why:"Cinco contenedores flex y cada uno con su papel: repartir (cabecera y pie), poner en fila (menú), centrar (portada) y hacer tarjetas que se adaptan (platos). Con esto maquetas casi cualquier web de examen."}]},ms=[["Paseo","Bici de paseo azul","320 €"],["Montaña","Bici de montaña","540 €"],["Carretera","Bici de carretera","890 €"],["Eléctrica","Bici eléctrica","1.450 €"],["Infantil","Bici para niños","180 €"],["Plegable","Bici plegable","410 €"]],hs=ms.map(([e,a,n],t)=>`          <article class="tarjeta${t?"":" destacada"}">
            <img src="img/bici.svg" alt="${a}">
            <h3>${e}</h3>
            <p>${n}</p>
          </article>`).join(`
`),ue=H("Bicis Rueda",`    <header>
      <img src="img/logo.svg" alt="Logo de Bicis Rueda" width="50">
      <nav>
        <ul>
          <li><a href="#bicis">Bicis</a></li>
          <li><a href="#taller">Taller</a></li>
          <li><a href="#contacto">Contacto</a></li>
        </ul>
      </nav>
    </header>

    <main>
      <h1>Bicis Rueda</h1>
      <section id="bicis">
        <h2>Nuestras bicis</h2>
        <div class="tarjetas">
${hs}
        </div>
      </section>
    </main>

    <aside id="taller">
      <h2>Taller</h2>
      <p>Arreglamos tu bici en el día.</p>
    </aside>

    <footer id="contacto">
      <p>Calle Mayor, 8 · 944 111 222</p>
    </footer>`),bs=`/* Que las fotos no se salgan de su caja */
img {
  max-width: 100%;
  height: auto;
}

`,eo=`* {
  box-sizing: border-box;
}

body {
  margin: 0;
  font-family: Arial, sans-serif;
  color: #1d3557;
}

header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: #1d3557;
  padding: 8px 16px;
}

nav ul {
  display: flex;
  gap: 16px;
  list-style: none;
  margin: 0;
  padding: 0;
}

nav a {
  color: white;
  text-decoration: none;
}

main {
  padding: 16px;
}

.tarjeta {
  background-color: #e8f0fb;
  border-radius: 8px;
  padding: 12px;
}

aside {
  background-color: #fdecee;
  padding: 16px;
}

footer {
  background-color: #1d3557;
  color: white;
  padding: 8px 16px;
}
`,be=`${bs}${eo}`,Qe=(e,a)=>`
.tarjetas {
  display: grid;
  grid-template-columns: ${e};
  gap: ${a}px;
}
`,Ma=`<div class="rejilla">
  <div class="caja">1</div>
  <div class="caja">2</div>
  <div class="caja">3</div>
  <div class="caja">4</div>
  <div class="caja">5</div>
  <div class="caja">6</div>
</div>
`,za=`.caja {
  background-color: #e8f0fb;
  border: 2px solid #1d3557;
  border-radius: 6px;
  padding: 12px;
  font: bold 20px sans-serif;
  text-align: center;
}
`,gs={n:8,intro:"Grid es la rejilla: filas y columnas a la vez. Con él colocas los catálogos de tarjetas y hasta la página entera (cabecera, contenido, lateral y pie). Y con las media queries la misma web cambia en el móvil, que es lo que casi todos los enunciados piden: «que se vea bien en el móvil».",lessons:[{id:"rejilla",title:"La rejilla",summary:"display: grid, columnas, fr y repeat",steps:[{text:p("Flexbox coloca en **una** dirección (una fila o una columna). Grid divide la caja en **filas y columnas a la vez**, como una tabla, pero para maquetar.","","Funciona igual que flex: `display: grid` va en el **padre**, y sus hijos se colocan solos en las celdas, de izquierda a derecha y bajando de fila cuando se acaban las columnas.","","`grid-template-columns` dice cuántas columnas hay y cuánto mide cada una: **una medida por columna**."),code:{css:`.tarjetas {
  display: grid;
  grid-template-columns: 200px 200px 200px;  /* 3 columnas de 200px */
  gap: 16px;                                 /* hueco entre celdas */
}`}},{text:p("Con píxeles la rejilla no se adapta a la pantalla. Para eso está la unidad `fr` (de fracción): reparte **el sitio que queda**.","- `1fr 1fr 1fr`: tres columnas iguales.","- `2fr 1fr`: la primera, el doble de ancha que la segunda.","- `repeat(3, 1fr)`: lo mismo que `1fr 1fr 1fr`, más corto."),try:{task:"Cambia `repeat(3, 1fr)` por `repeat(2, 1fr)` y luego por `2fr 1fr 1fr`. Con `repeat(4, 1fr)`, ¿en cuántas filas salen las 6 cajas?",html:Ma,css:`.rejilla {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 12px;
}

${za}`,tabs:["css","html"]},exam:"Las tarjetas «en 3 columnas» de un enunciado: en el contenedor, `display: grid; grid-template-columns: repeat(3, 1fr); gap: 20px;`."},{check:{question:"¿Qué pone las tarjetas de `.tarjetas` en 4 columnas iguales?",options:["`grid-template-columns: repeat(4, 1fr);`","`grid-columns: 4;`","`display: grid(4);`","`grid-template-rows: repeat(4, 1fr);`"],why:"Las columnas se dicen con `grid-template-columns`, con una medida por columna. `grid-template-rows` es lo mismo para las filas."}}],recap:["`display: grid` en el padre: los hijos van a las celdas.","`grid-template-columns`: una medida por columna.","`1fr`: una parte del sitio que queda; `repeat(3, 1fr)`, tres iguales.","`gap`: el hueco entre celdas."]},{id:"zonas",title:"Ocupar celdas y dibujar la página",summary:"grid-column, span y grid-template-areas",steps:[{text:p("Un hijo puede ocupar más de una celda:","- `grid-column: span 2`: dos columnas (y `grid-row: span 2`, dos filas).","- Con números: las líneas entre columnas se cuentan desde 1. `grid-column: 1 / 3` va de la línea 1 a la 3 (dos columnas) y `1 / -1`, de la primera a la última: **todo el ancho**."),try:{task:"Cambia `span 2` por `span 3` y luego por `1 / -1`. Después añade `grid-row: span 2;` a la misma regla.",html:Ma,css:`.rejilla {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 12px;
}

${za}
.caja:first-child {
  grid-column: span 2;
  background-color: #fdecee;
}
`,tabs:["css","html"]}},{text:p("Para la página entera hay una forma muy visual: **dibujarla** con `grid-template-areas`. Cada fila va entre comillas, con un nombre por columna; si un nombre se repite, esa zona ocupa esas celdas.","","Luego, a cada parte de la página le dices su zona con `grid-area`."),code:{css:`body {
  display: grid;
  grid-template-columns: 1fr 250px;
  grid-template-areas:
    "cabecera cabecera"
    "contenido taller"
    "pie pie";
}

header { grid-area: cabecera; }
main   { grid-area: contenido; }
aside  { grid-area: taller; }
footer { grid-area: pie; }`}},{text:"Así queda: la cabecera y el pie a todo lo ancho, y el contenido con el lateral al lado.",try:{task:'Pon el taller a la izquierda: escribe `"taller contenido"` en la segunda fila y cambia las columnas a `250px 1fr`.',html:`<header>Cabecera</header>
<main>Contenido</main>
<aside>Taller</aside>
<footer>Pie</footer>
`,css:`body {
  display: grid;
  grid-template-columns: 1fr 250px;
  grid-template-areas:
    "cabecera cabecera"
    "contenido taller"
    "pie pie";
  gap: 8px;
  margin: 0;
  font: 18px sans-serif;
}

header { grid-area: cabecera; background-color: #1d3557; color: white; padding: 16px; }
main { grid-area: contenido; background-color: #e8f0fb; padding: 16px; height: 150px; }
aside { grid-area: taller; background-color: #fdecee; padding: 16px; }
footer { grid-area: pie; background-color: #1d3557; color: white; padding: 16px; }
`,tabs:["css","html"]},exam:"Si el enunciado dice «cabecera arriba, contenido y lateral, y pie abajo», `grid-template-areas` lo dibuja tal cual. Cada fila con el mismo número de nombres, y cada zona tiene que ser un rectángulo."},{check:{question:'Con `grid-template-areas: "a a" "b c";`, ¿qué ocupa la zona `a`?',options:["Toda la primera fila (las dos columnas)","Solo la primera columna de la primera fila","La primera columna de las dos filas","Nada: un nombre no se puede repetir"],why:"Cada fila tiene un nombre por columna. `a` sale dos veces en la primera fila, así que ocupa sus dos columnas."}}],recap:["`grid-column: span 2`: ocupa dos columnas.","`grid-column: 1 / -1`: todo el ancho.","`grid-template-areas`: dibuja la página con nombres.","`grid-area`: a qué zona va cada parte."]},{id:"movil",title:"La web en el móvil",summary:"meta viewport y media queries",steps:[{text:p("Para que una web se vea bien en el móvil hacen falta dos piezas:",'- En el `<head>`, el `<meta name="viewport" content="width=device-width, initial-scale=1.0">` del mundo 1. Sin él, el móvil hace como si midiera unos 980px y enseña la web de ordenador en pequeño.',"- En el CSS, una **media query**: `@media (max-width: 600px) { … }`. Las reglas de dentro solo se aplican cuando la ventana mide **600px o menos**.","","Dentro solo escribes **lo que cambia** en el móvil. Todo lo demás sigue como arriba."),code:{css:`.tarjetas {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
}

/* En pantallas de 600px o menos */
@media (max-width: 600px) {
  .tarjetas {
    grid-template-columns: 1fr;  /* una sola columna */
  }
}`}},{text:"Encima de la vista tienes tres botones para cambiar el ancho de la ventana: **Ajustada** (el sitio que haya), **Móvil** (375px) y **Ordenador** (1024px, en pequeño si no cabe).",try:{task:"Pulsa **Móvil** y luego **Ordenador**, y mira cómo cambian las columnas y el menú. Después cambia `600px` por `1100px`: ahora en «Ordenador» también sale una columna, porque 1024 es menos de 1100.",html:`<nav>
  <a href="#">Bicis</a>
  <a href="#">Taller</a>
  <a href="#">Contacto</a>
</nav>
${Ma}`,css:`nav {
  display: flex;
  gap: 16px;
  margin-bottom: 12px;
  font: 18px sans-serif;
}

.rejilla {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 12px;
}

${za}
@media (max-width: 600px) {
  nav {
    flex-direction: column;
  }

  .rejilla {
    grid-template-columns: 1fr;
  }
}
`,tabs:["css","html"]}},{text:p("Dos cosas que hay que saber:","- La media query va **al final** del CSS. Sus reglas tienen el mismo selector que las de arriba, y a igualdad gana la última (la cascada del mundo 5).","- Se puede hacer al revés: el CSS normal para el móvil y `@media (min-width: 601px)` para el ordenador («primero el móvil»). Las dos formas valen; usa la que os enseñen en clase."),exam:"Lo típico en el móvil: el menú en columna (`flex-direction: column`), las tarjetas en una sola columna y menos márgenes. Y que no falte el meta viewport."},{check:{question:"La ventana mide 800px. ¿Se aplica lo de dentro de `@media (max-width: 600px)`?",options:["No: solo con 600px o menos","Sí: una media query se aplica siempre","Sí, porque 800 es más que 600","Solo si la página tiene imágenes"],why:"`max-width: 600px` quiere decir «como mucho 600px». Con 800px no se cumple y esas reglas no cuentan."}}],recap:["Meta viewport en el `<head>`: sin él no hay web de móvil.","`@media (max-width: 600px) { … }`: solo con 600px o menos.","Dentro, solo lo que cambia; la media query, al final."]},{id:"adaptable",title:"Medidas que se adaptan",summary:"max-width en las fotos y auto-fit",steps:[{text:p("Una foto mide lo que mide (400px, 1200px…). Si su caja es más estrecha, se sale. La regla de siempre:","","`img { max-width: 100%; height: auto; }`: la foto nunca es más ancha que su caja, y `height: auto` mantiene su forma.","","Y para las cajas grandes, mejor `max-width` que `width`: `main { max-width: 1000px; margin: 0 auto; }` mide 1000px en el ordenador y se estrecha en el móvil. Con `width: 1000px`, en el móvil se sale y hay que mover la página a los lados."),try:{task:"Quita la regla de `img` y mira cómo la foto se sale de la tarjeta. Vuelve a ponerla.",html:`<article class="tarjeta">
  <img src="img/bici.svg" alt="Bici de paseo">
  <h3>Paseo</h3>
  <p>320 €</p>
</article>
`,css:`img {
  max-width: 100%;
  height: auto;
}

.tarjeta {
  width: 220px;
  background-color: #e8f0fb;
  border-radius: 8px;
  padding: 12px;
  font-family: sans-serif;
}
`,tabs:["css","html"]}},{text:p("Un truco de grid para tarjetas que se colocan solas, **sin media query**:","","`grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));` pone tantas columnas como quepan, de al menos 200px cada una, y reparte lo que sobra."),try:{task:"Pulsa **Móvil**, **Ajustada** y **Ordenador** y cuenta las columnas. Cambia `200px` por `300px`.",html:Ma,css:`.rejilla {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 12px;
}

${za}`,tabs:["css","html"]},exam:"Si el enunciado dice «3 columnas en el ordenador y 1 en el móvil», haz `repeat(3, 1fr)` y la media query: es lo que se pide y lo que se corrige. El truco de `auto-fit`, para cuando no dicen cuántas."},{check:{task:"Une cada problema en el móvil con lo que lo arregla.",pairs:[["La web se ve entera, pero en pequeño","Falta el meta viewport"],["La foto se sale de su tarjeta","`img { max-width: 100%; }`"],["Hay que mover la página a los lados","Quitar el `width` fijo de una caja grande"],["Las tarjetas siguen en 3 columnas","Una media query con `grid-template-columns: 1fr;`"]],why:"Son los cuatro fallos típicos cuando se mira la web en el móvil por primera vez."}}],recap:["`img { max-width: 100%; height: auto; }`.","Cajas grandes con `max-width`, no con `width`.","`repeat(auto-fit, minmax(200px, 1fr))`: columnas que caben solas."]}],challenges:[{kind:"quiz",id:"fr",title:"Las fracciones",question:"Una rejilla mide 600px de ancho, sin `gap`, con `grid-template-columns: 1fr 2fr;`. ¿Cuánto mide cada columna?",options:["200px y 400px","1px y 2px","300px y 300px","100px y 200px"],why:"Hay 3 partes (1 + 2): cada una son 200px. La primera columna lleva una parte y la segunda, dos."},{kind:"code",id:"tarjetas",title:"Las bicis en columnas",tabs:["css","html"],brief:p('Coloca las bicis de la tienda (están en `<div class="tarjetas">`) con grid:',"- en 3 columnas iguales;","- con 20px de hueco entre ellas, en las dos direcciones."),start:{html:ue,css:be},solution:{html:ue,css:be+Qe("repeat(3, 1fr)",20)},checks:[{label:"`.tarjetas` es una rejilla (`display: grid`)",test:e=>yn(e,".tarjetas"),hint:"En el padre de las tarjetas."},{label:"En el ordenador, 3 columnas iguales",test:async e=>{const a=await e.at(Q);return oa(a,".tarjetas",3)&&Z(a,".tarjeta")===3},hint:"`repeat(3, 1fr)` o `1fr 1fr 1fr`."},{label:"20px de hueco",test:e=>e.px(".tarjetas","column-gap")===20&&e.px(".tarjetas","row-gap")===20},{label:"Sin errores en el CSS",test:e=>e.cssErrors()===0}],why:"Tres líneas en el contenedor y las seis tarjetas se colocan solas: tres por fila y dos filas."},{kind:"match",id:"piezas",title:"Las piezas de la rejilla",task:"Une cada pieza con lo que hace.",pairs:[["`display: grid`","Convierte la caja en una rejilla"],["`grid-template-columns`","Cuántas columnas hay y cuánto mide cada una"],["`1fr`","Una parte del sitio que queda"],["`grid-column: span 2`","Que un hijo ocupe dos columnas"],["`grid-template-areas`","Dibuja la página con nombres de zonas"],["`@media (max-width: 600px)`","CSS solo para pantallas de 600px o menos"]],why:"Las tres primeras van en el contenedor; `grid-column` y `grid-area`, en los hijos."},{kind:"code",id:"destacada",title:"La oferta del mes",tabs:["css","html"],brief:"Las bicis ya están en 3 columnas. La primera tiene la clase `destacada` porque es la oferta del mes: haz que ocupe **dos columnas**.",start:{html:ue,css:be+Qe("repeat(3, 1fr)",20)},solution:{html:ue,css:`${be+Qe("repeat(3, 1fr)",20)}
.destacada {
  grid-column: span 2;
}
`},checks:[{label:"En el ordenador, la oferta ocupa dos columnas",test:async e=>{const a=await e.at(Q),[n]=Rt(a,".tarjetas");return!!n&&Math.abs(N(a,".destacada").width-(2*n+a.px(".tarjetas","column-gap")))<2},hint:"`grid-column: span 2;` en `.destacada`."},{label:"La rejilla sigue con 3 columnas",test:async e=>oa(await e.at(Q),".tarjetas",3)},{label:"Sin errores en el CSS",test:e=>e.cssErrors()===0}],why:"`span 2` hace que ocupe dos celdas y las demás se recolocan detrás. No hace falta tocar la rejilla."},{kind:"quiz",id:"flex-o-grid",title:"¿Flex o grid?",question:"¿Cuándo te conviene más grid que flexbox?",options:["Cuando quieres filas y columnas a la vez, como un catálogo de tarjetas","Nunca: grid es más antiguo","Solo para tablas de datos","Para cambiar el color de fondo"],why:"Flexbox coloca en una dirección (el menú, la cabecera). Grid, en dos (tarjetas en columnas, la página entera). Se usan juntos: grid para la página y flex dentro de la cabecera."},{kind:"code",id:"zonas",title:"La página en zonas",tabs:["css","html"],brief:p("Coloca la página entera con grid en el `body`:","- la cabecera arriba, a todo lo ancho;","- debajo, el contenido (`main`) y a su derecha el taller (`aside`), de 250px de ancho;","- y el pie abajo, también a todo lo ancho."),start:{html:ue,css:be},solution:{html:ue,css:`${be.replace(`body {
`,`body {
  display: grid;
  grid-template-columns: 1fr 250px;
  grid-template-areas:
    "cabecera cabecera"
    "contenido taller"
    "pie pie";
`)}
header {
  grid-area: cabecera;
}

main {
  grid-area: contenido;
}

aside {
  grid-area: taller;
}

footer {
  grid-area: pie;
}
`},checks:[{label:"El `body` es una rejilla",test:e=>yn(e,"body")},{label:"La cabecera arriba, a todo lo ancho",test:async e=>{const a=await e.at(Q);return Math.abs(N(a,"header").width-N(a,"body").width)<1&&N(a,"header").bottom<=N(a,"main").top+1}},{label:"El contenido y el taller, uno al lado del otro (el taller a la derecha)",test:async e=>{const a=await e.at(Q);return Math.abs(N(a,"main").top-N(a,"aside").top)<2&&N(a,"aside").left>=N(a,"main").right-1}},{label:"El taller mide 250px de ancho",test:async e=>Math.abs(N(await e.at(Q),"aside").width-250)<1},{label:"El pie abajo, a todo lo ancho",test:async e=>{const a=await e.at(Q);return Math.abs(N(a,"footer").width-N(a,"body").width)<1&&N(a,"footer").top>=Math.max(N(a,"main").bottom,N(a,"aside").bottom)-1}},{label:"Sin errores en el CSS",test:e=>e.cssErrors()===0}],why:"Con `grid-template-areas` el CSS se parece al dibujo de la página. También vale con `grid-column: 1 / -1` en la cabecera y el pie."},{kind:"quiz",id:"viewport",title:"En el móvil de verdad",question:"Tu media query funciona en la vista previa, pero en un móvil de verdad la web se ve como en el ordenador, en pequeño. ¿Qué falta?",options:['El `<meta name="viewport" content="width=device-width, initial-scale=1.0">` en el `<head>`',"Escribir `@media (mobile)`","Repetir el CSS en otro archivo","`display: grid` en el `body`"],why:"Sin el meta viewport, el móvil hace como si midiera unos 980px. Como 980 es más que 600, tu media query no se aplica."},{kind:"code",id:"movil",title:"La tienda en el móvil",tabs:["css","html"],brief:p("En el ordenador la tienda ya está bien. Ahora, **en pantallas de 600px o menos**:","- las bicis, en una sola columna;","- y las opciones del menú, una debajo de otra.","","En el ordenador tiene que seguir igual. Usa los botones **Móvil** y **Ordenador** de la vista para comprobarlo."),start:{html:ue,css:be+Qe("repeat(3, 1fr)",16)},solution:{html:ue,css:`${be+Qe("repeat(3, 1fr)",16)}
@media (max-width: 600px) {
  nav ul {
    flex-direction: column;
  }

  .tarjetas {
    grid-template-columns: 1fr;
  }
}
`},checks:[{label:"En el móvil, las bicis en una columna",test:async e=>Z(await e.at(ae),".tarjeta")===1},{label:"En el móvil, el menú en columna",test:async e=>Zn(await e.at(ae),"nav li"),hint:"`flex-direction: column` en el `ul` del menú, dentro de la media query."},{label:"Desde 600px: con 600px, una columna; con 700px, tres",test:async e=>Z(await e.at(600),".tarjeta")===1&&Z(await e.at(700),".tarjeta")===3,hint:"`@media (max-width: 600px)`."},{label:"En el ordenador sigue igual: 3 columnas y el menú en fila",test:async e=>{const a=await e.at(Q);return Z(a,".tarjeta")===3&&qe(a,"nav li")}},{label:"Sin errores en el CSS",test:e=>e.cssErrors()===0}],why:"La media query solo lleva lo que cambia, y va al final para ganar a las reglas de arriba. Si la pones al principio, las reglas de debajo la pisan."},{kind:"code",id:"arregla-grid",title:"La rejilla que no sale",tabs:["css","html"],brief:p("Las bicis tendrían que ir en 3 columnas iguales con 20px de hueco, y en el móvil (600px o menos) en una sola. Pero el CSS tiene **cuatro fallos** y no sale nada de eso."),start:{html:ue,css:`${be}
.tarjeta {
  display: grid;
  grid-template-column: repeat(3, 1fr);
  gap: 20;
}

@media (max-width: 600) {
  .tarjetas {
    grid-template-columns: 1fr;
  }
}
`},solution:{html:ue,css:`${be}
.tarjetas {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 20px;
}

@media (max-width: 600px) {
  .tarjetas {
    grid-template-columns: 1fr;
  }
}
`},checks:[{label:"En el ordenador, 3 columnas iguales",test:async e=>{const a=await e.at(Q);return oa(a,".tarjetas",3)&&Z(a,".tarjeta")===3},hint:"La rejilla va en el padre de las tarjetas. Y mira cómo se escribe la propiedad de las columnas."},{label:"20px de hueco",test:e=>e.px(".tarjetas","column-gap")===20},{label:"En el móvil, una sola columna",test:async e=>Z(await e.at(ae),".tarjeta")===1},{label:"Sin errores en el CSS",test:e=>e.cssErrors()===0}],why:"La rejilla en los hijos en vez de en el padre, `grid-template-column` sin la s, y dos números sin unidad (en `gap` y en la media query). El revisor avisa de tres; el del padre solo se ve mirando la página."},{kind:"code",id:"encargo-tienda",title:"Encargo: la tienda en todas las pantallas",tabs:["css","html"],brief:p("**Bicis Rueda** te pide:","","«Queremos que la web funcione en cualquier pantalla. Que esté preparada para los móviles (revisa el `<head>`). En el ordenador, las bicis en 3 columnas iguales con 24px de hueco; en tablets (900px o menos), en 2; y en el móvil (600px o menos), en una, con el menú uno debajo de otro. Las fotos no se pueden salir de su tarjeta y nunca hay que mover la página a los lados.»"),start:{html:ue.replace(/ *<meta name="viewport"[^>]*>\n/,""),css:eo},solution:{html:ue,css:`${be+Qe("repeat(3, 1fr)",24)}
@media (max-width: 900px) {
  .tarjetas {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (max-width: 600px) {
  nav ul {
    flex-direction: column;
  }

  .tarjetas {
    grid-template-columns: 1fr;
  }
}
`},checks:[{label:"La página está preparada para el móvil (meta viewport)",test:e=>ge(e,'name="viewport"',"width=device-width")},{label:"Ordenador: 3 columnas iguales con 24px de hueco",test:async e=>{const a=await e.at(Q);return oa(a,".tarjetas",3)&&Z(a,".tarjeta")===3&&a.px(".tarjetas","column-gap")===24}},{label:"Tablet: 2 columnas",test:async e=>{const a=await e.at(ko);return oa(a,".tarjetas",2)&&Z(a,".tarjeta")===2},hint:"Otra media query, para 900px o menos. Antes que la de 600px."},{label:"Móvil: una columna y el menú en columna",test:async e=>{const a=await e.at(ae);return Z(a,".tarjeta")===1&&Zn(a,"nav li")}},{label:"Las fotos no se salen y no hay que mover la página a los lados",test:async e=>{const[a,n]=[await e.at(Q),await e.at(ae)];return ha(a)&&ha(n)&&a.all(".tarjeta img").every(t=>t.getBoundingClientRect().right<=(t.parentElement?.getBoundingClientRect().right??0)+.5)},hint:"Las fotos miden 400px: `img { max-width: 100%; height: auto; }`."},{label:"Sin errores en el CSS",test:e=>e.cssErrors()===0}],why:"Una web adaptable: el meta viewport, la rejilla para el ordenador y una media query por cada tamaño, de la más grande a la más pequeña (así la de 600px gana a la de 900px). Y las fotos con `max-width: 100%`."}]},un=(e,a)=>I(e.doc.title)===I(a);function fs(e,a){const n=a.getAttribute("href")??"";return n.startsWith("#")&&n.length>1&&!!e.doc.getElementById(decodeURIComponent(n.slice(1)))}const pn=(e,a)=>a.every(n=>e.all("nav a").some(t=>e.loose(t)===I(n)&&fs(e,t)));function mn(e,a){const n=e.all("h2").find(t=>e.loose(t)===I(a));return n?.closest("section, article, div, main, aside")??n?.parentElement??null}function ys(e){const a=N(e,"header"),n=N(e,e.q("header img")),t=N(e,"header nav"),o=l=>l.top+l.height/2;return n.width>0&&t.width>0&&n.right<=t.left&&n.left-a.left<40&&a.right-t.right<40&&Math.abs(o(n)-o(t))<4}const hn=e=>[...e?.children??[]].map(a=>I(a.textContent??"")),xs=(e,a)=>{const n=e.px(a,"border-top-width");return n>.5&&n<1.5&&e.style(a,"border-top-style")!=="none"},bn=e=>!!e.files.html.trim()&&!!e.files.css.trim()&&e.htmlErrors()===0&&e.cssErrors()===0,gn={html:"",css:""},vs=H("Fontanería Grifo",`    <header>
      <img src="img/logo.svg" alt="Logo de Fontanería Grifo" width="60">
      <h1>Fontanería Grifo</h1>
    </header>

    <nav>
      <ul>
        <li><a href="#servicios">Servicios</a></li>
        <li><a href="#precios">Precios</a></li>
        <li><a href="#contacto">Contacto</a></li>
      </ul>
    </nav>

    <main>
      <section id="servicios">
        <h2>Servicios</h2>
        <ul>
          <li>Reparación de fugas</li>
          <li>Instalación de calentadores</li>
          <li>Desatascos</li>
        </ul>
      </section>

      <section id="precios">
        <h2>Precios</h2>
        <p>El presupuesto es gratis y sin compromiso.</p>
      </section>

      <section id="contacto">
        <h2>Contacto</h2>
        <p>Llámanos al <a href="tel:+34600123456">600 123 456</a>.</p>
      </section>
    </main>

    <footer>
      <p>&copy; 2026 Fontanería Grifo</p>
    </footer>`),qs=`body {
  margin: 0;
  font-family: Arial, sans-serif;
}

header {
  background-color: #0b3d91;
  color: white;
  padding: 10px 16px;
}

nav ul {
  display: flex;
  gap: 16px;
  list-style: none;
  margin: 0;
  padding: 10px 16px;
}

main {
  padding: 0 16px;
}

footer {
  padding: 10px 16px;
}
`,ws=[["tarta","Tarta de queso","18 €"],["galletas","Galletas de mantequilla","6 € la docena"],["cruasan","Cruasanes","1,20 €"]],js=H("Panadería La Espiga",`    <header>
      <img src="img/logo.svg" alt="Logo de la Panadería La Espiga" width="60">
      <nav>
        <ul>
          <li><a href="#productos">Productos</a></li>
          <li><a href="#horario">Horario</a></li>
          <li><a href="#encargos">Encargos</a></li>
        </ul>
      </nav>
    </header>

    <main>
      <h1>Panadería La Espiga</h1>

      <section id="productos">
        <h2>Productos</h2>
        <div class="productos">
${ws.map(([e,a,n])=>`          <article class="producto">
            <img src="img/${e}.svg" alt="${a}">
            <h3>${a}</h3>
            <p>${n}</p>
          </article>`).join(`
`)}
        </div>
      </section>

      <section id="horario">
        <h2>Horario</h2>
        <table>
          <tr>
            <th>Día</th>
            <th>Mañana</th>
            <th>Tarde</th>
          </tr>
          <tr>
            <td>Lunes a viernes</td>
            <td>7:00 a 14:00</td>
            <td>17:00 a 20:00</td>
          </tr>
          <tr>
            <td>Sábados</td>
            <td>8:00 a 14:00</td>
            <td>Cerrado</td>
          </tr>
          <tr>
            <td>Domingos</td>
            <td colspan="2">Cerrado</td>
          </tr>
        </table>
      </section>

      <section id="encargos">
        <h2>Encargos</h2>
        <form>
          <label for="nombre">Nombre</label>
          <input type="text" id="nombre" name="nombre" required>

          <label for="telefono">Teléfono</label>
          <input type="tel" id="telefono" name="telefono" required>

          <label for="producto">Producto</label>
          <select id="producto" name="producto">
            <option>Tarta de queso</option>
            <option>Galletas de mantequilla</option>
            <option>Cruasanes</option>
          </select>

          <label for="fecha">Fecha de recogida</label>
          <input type="date" id="fecha" name="fecha">

          <button type="submit">Encargar</button>
        </form>
      </section>
    </main>

    <footer>
      <p>Calle del Trigo, 3</p>
    </footer>`),Ss=`* {
  box-sizing: border-box;
}

body {
  margin: 0;
  font-family: Arial, sans-serif;
  color: #3b2a1a;
}

img {
  max-width: 100%;
  height: auto;
}

header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: #8b4513;
  padding: 8px 16px;
}

nav ul {
  display: flex;
  gap: 16px;
  list-style: none;
  margin: 0;
  padding: 0;
}

nav a {
  color: white;
  text-decoration: none;
}

main {
  max-width: 1000px;
  margin: 0 auto;
  padding: 16px;
}

.productos {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 16px;
}

.producto {
  background-color: #fdf3e7;
  border-radius: 8px;
  padding: 12px;
}

table {
  border-collapse: collapse;
}

th,
td {
  border: 1px solid #8b4513;
  padding: 6px 10px;
}

label {
  display: block;
  margin-top: 10px;
}

footer {
  background-color: #8b4513;
  color: white;
  padding: 8px 16px;
}

@media (max-width: 600px) {
  .productos {
    grid-template-columns: 1fr;
  }
}
`,Es=[["5 de abril","Vuelta al pantano","45","Fácil"],["12 de abril","Puerto de la Sierra","80","Difícil"],["19 de abril","Ruta de los molinos","60","Medio"],["26 de abril","Vuelta al pantano","45","Fácil"]],Cs=H("Club ciclista Pedalea",`    <header>
      <img src="img/logo.svg" alt="Logo del Club ciclista Pedalea" width="60">
      <h1>Club ciclista Pedalea</h1>
      <nav>
        <ul>
          <li><a href="#salidas">Salidas</a></li>
          <li><a href="#inscripcion">Inscripción</a></li>
          <li><a href="#contacto">Contacto</a></li>
        </ul>
      </nav>
    </header>

    <main>
      <section id="salidas">
        <h2>Salidas</h2>
        <table>
          <caption>Salidas de abril</caption>
          <thead>
            <tr>
              <th>Fecha</th>
              <th>Ruta</th>
              <th>Km</th>
              <th>Nivel</th>
            </tr>
          </thead>
          <tbody>
${Es.map(e=>`            <tr>
${e.map(a=>`              <td>${a}</td>`).join(`
`)}
            </tr>`).join(`
`)}
          </tbody>
        </table>
      </section>

      <section id="inscripcion">
        <h2>Inscripción</h2>
        <form>
          <fieldset>
            <legend>Tus datos</legend>
            <label for="nombre">Nombre</label>
            <input type="text" id="nombre" name="nombre" required>
            <label for="correo">Correo</label>
            <input type="email" id="correo" name="correo" required>
          </fieldset>

          <p>Nivel:</p>
          <input type="radio" id="facil" name="nivel" value="facil">
          <label for="facil">Fácil</label>
          <input type="radio" id="medio" name="nivel" value="medio">
          <label for="medio">Medio</label>
          <input type="radio" id="dificil" name="nivel" value="dificil">
          <label for="dificil">Difícil</label>

          <p>
            <input type="checkbox" id="licencia" name="licencia">
            <label for="licencia">Tengo licencia federativa</label>
          </p>

          <label for="comentarios">Comentarios</label>
          <textarea id="comentarios" name="comentarios"></textarea>

          <button type="submit">Inscribirme</button>
        </form>
      </section>
    </main>

    <aside>
      <h2>Noticias</h2>
      <ul>
        <li>Ya está aquí la nueva equipación del club.</li>
        <li>El 3 de mayo, salida especial con almuerzo.</li>
      </ul>
    </aside>

    <footer id="contacto">
      <p>Escríbenos a <a href="mailto:info@pedalea.es">info@pedalea.es</a></p>
    </footer>`),ks=`* {
  box-sizing: border-box;
}

body {
  margin: 0;
  font-family: Arial, sans-serif;
  display: grid;
  grid-template-columns: 1fr 280px;
  grid-template-areas:
    "cabecera cabecera"
    "contenido lateral"
    "pie pie";
}

header {
  grid-area: cabecera;
  background-color: #264653;
  color: white;
  padding: 8px 16px;
}

nav ul {
  display: flex;
  gap: 20px;
  list-style: none;
  margin: 0;
  padding: 0;
}

nav a {
  color: white;
}

main {
  grid-area: contenido;
  padding: 16px;
}

aside {
  grid-area: lateral;
  background-color: #eef7f6;
  padding: 16px;
}

footer {
  grid-area: pie;
  background-color: #264653;
  color: white;
  padding: 8px 16px;
}

footer a {
  color: white;
}

table {
  border-collapse: collapse;
}

th {
  background-color: #2a9d8f;
  color: white;
}

th,
td {
  padding: 8px;
}

fieldset label,
fieldset input,
textarea {
  display: block;
}

button {
  background-color: #2a9d8f;
  color: white;
  border: none;
  border-radius: 6px;
  padding: 8px 16px;
  margin-top: 12px;
}

@media (max-width: 600px) {
  body {
    grid-template-columns: 1fr;
    grid-template-areas:
      "cabecera"
      "contenido"
      "lateral"
      "pie";
  }
}
`,$s={n:9,intro:"El examen: un enunciado con lo que pide el cliente y dos archivos vacíos. Aquí aprendes a leer el enunciado, el orden para no perder tiempo y el repaso antes de entregar. Y luego, tres simulacros con reloj que se corrigen solos y te dan la nota.",lessons:[{id:"enunciado",title:"Leer el enunciado",summary:"De lo que pide el cliente a una lista de tareas",steps:[{text:p("Un enunciado mezcla tres cosas:","- el **contenido**: los textos, precios, horarios y fotos que tienes que poner;","- la **estructura**: qué partes tiene la página (cabecera, menú, apartados, tabla, formulario, pie). Es el HTML;","- el **diseño**: colores, columnas, qué va al lado de qué y cómo se ve en el móvil. Es el CSS.","","Antes de escribir código, lee el enunciado entero y conviértelo en una **lista de tareas**: cada frase del cliente, una línea. Así no se te olvida nada y al final lo repasas tachando.")},{text:p("Hay palabras que ya te dicen qué usar:","- «título principal» → `<h1>`; «apartado» → `<section>` con su `<h2>`;",'- «menú» → `<nav>` con una lista de enlaces; «que lleve a cada apartado» → `href="#id"`;',"- «lista» → `<ul>` (o `<ol>` si va numerada); «tarjeta» → `<article>`;","- «obligatorio» → `required`; «solo se puede elegir uno» → radios con el mismo `name`;","- «en horizontal», «a un lado y al otro» → flexbox; «en 3 columnas» → grid;","- «centrado» → `margin: 0 auto` (una caja) o `text-align: center` (un texto);","- «que se vea bien en el móvil» → meta viewport y `@media`."),exam:"Si algo no lo entiendes, haz lo más razonable y sigue. Una petición a medias puntúa; una en blanco, no."},{check:{task:"Une cada frase del cliente con lo que tienes que escribir.",pairs:[["«Un menú que lleve a cada apartado»",'`<nav>` con enlaces `href="#id"`'],["«Cada producto en su tarjeta»","Un `<article>` por producto"],["«El domingo, cerrado, ocupando las dos columnas»",'Una celda con `colspan="2"`'],["«El correo, obligatorio»",'`type="email"` y `required`'],["«Las tarjetas en 3 columnas»","`display: grid` y `repeat(3, 1fr)`"],["«El logo a un lado y el menú al otro»","`display: flex` y `space-between`"]],why:"Cada frase del enunciado es una petición, y cada petición tiene su etiqueta o su propiedad. En la corrección se mira una por una."}}],recap:["Contenido, estructura (HTML) y diseño (CSS).","Cada frase del cliente, una tarea de la lista.","Las palabras del enunciado dicen qué etiqueta o propiedad usar."]},{id:"orden",title:"El orden de trabajo",summary:"Qué hacer primero para no perder tiempo",steps:[{text:p("El orden que menos tiempo pierde:","- **1. El esqueleto** con el `<link>` a `estilos.css`. Comprueba que el CSS llega con algo que se vea (`body { background-color: yellow; }`) y luego quítalo.","- **2. Todo el HTML**, de arriba abajo y sin CSS: cabecera, menú, apartados, tabla, formulario y pie, con los textos del enunciado.","- **3. El CSS general**: la fuente, los márgenes del `body`, los colores, los enlaces.","- **4. La maquetación**: la cabecera con flex, las tarjetas con grid, el contenido centrado.","- **5. El móvil**: la media query, al final del CSS.","- **6. El repaso** con tu lista de tareas, frase a frase."),exam:"Reparte el tiempo. En 60 minutos: unos 25 para el HTML, 25 para el CSS y 10 para repasar."},{text:"El esqueleto lo vas a escribir siempre igual. Apréndetelo de memoria, con el `<link>`:",code:{html:H("Nombre de la web","    <!-- aquí va todo lo que se ve -->")}},{check:{question:"Llevas 50 minutos de 60 y la tabla con `colspan` no te sale. ¿Qué haces?",options:["La dejo como está, termino lo que falta y vuelvo si me sobra tiempo","La borro y la empiezo otra vez","Me quedo con ella hasta que salga","Entrego sin hacer el CSS"],why:"Cada petición puntúa por separado. Una tabla casi bien y el resto hecho valen mucho más que una tabla perfecta y la mitad sin hacer."}}],recap:["Esqueleto y `<link>` primero, y comprobar que el CSS llega.","Todo el HTML, luego el CSS, luego el móvil.","Si te atascas, sigue con otra cosa y vuelve después."]},{id:"repaso",title:"El repaso antes de entregar",summary:"Los fallos que más nota quitan",steps:[{text:p("Los fallos que más restan, y en qué fijarte:","- Los archivos se llaman **exactamente** `index.html` y `estilos.css`, en la misma carpeta, y las fotos en `img/` con su nombre y su extensión.","- El `<link>` está en el `<head>` y el CSS se ve.","- Cada etiqueta abierta está cerrada, y en orden.","- Cada `<img>` con `alt`; cada campo con su `<label>` (el `for` igual que el `id`) y su `name`.","- Los enlaces del menú llevan a ids que existen.","- En el CSS: el `;` al final de cada línea, las unidades en las medidas y las clases escritas igual (sin punto en el HTML, con punto en el CSS).","- La media query, al final.")},{text:"A practicar el repaso: esta página tiene **cinco fallos** de los de la lista.",try:{task:"Encuentra y arregla los cinco. El revisor de debajo te señala algunos; los demás tienes que verlos tú en la vista.",html:H("Heladería Polo",`    <header>
      <h1>Heladería Polo</h1>
      <nav>
        <a href="#sabores">Sabores</a>
        <a href="#pedidos">Pedidos</a>
      </nav>
    </header>

    <section id="sabores">
      <h2>Sabores</h2>
      <img src="img/tarta.svg">
      <p class="destacado">Nuevo: helado de tarta de queso.</p>
    </section>

    <section id="pedido">
      <h2>Pedidos</h2>
      <form>
        <label for="correo">Correo</label>
        <input type="email" id="email" name="correo">
        <button type="submit">Pedir</button>
      </form>
    </section>`).replace('href="estilos.css"','href="estilos.ccs"'),css:`body {
  font-family: sans-serif;
  margin: 0 16px;
}

.Destacado {
  color: #b8336a;
  font-weight: bold
}
`},exam:"Si en clase usáis el validador del W3C (validator.w3.org), pásale tu HTML antes de entregar: encuentra lo mismo que este revisor y más."},{check:{question:"Al abrir tu web en el navegador sale sin estilos, pero el CSS está bien escrito. ¿Qué es lo primero que miras?",options:["El `<link>` del `<head>` y que el archivo se llame igual (`estilos.css`)","Los colores del CSS","El `<!DOCTYPE html>`","La media query"],why:"Si no se aplica nada de nada, el CSS no está llegando: el `<link>` falta, está mal escrito o el nombre del archivo no coincide."}}],recap:["Nombres de archivo exactos y rutas de las fotos.","`alt`, `label` con `for` = `id`, y `name`.","Enlaces a ids que existen.","`;`, unidades y clases iguales en el CSS."]},{id:"chuleta",title:"La chuleta",summary:"Lo que más sale, en un vistazo",steps:[{text:"La cabecera con el logo y el menú que lleva a los apartados:",code:{html:`<header>
  <img src="img/logo.svg" alt="Logo de la tienda" width="60">
  <nav>
    <ul>
      <li><a href="#productos">Productos</a></li>
      <li><a href="#contacto">Contacto</a></li>
    </ul>
  </nav>
</header>

<section id="productos">
  <h2>Productos</h2>
</section>`,css:`header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

nav ul {
  display: flex;
  gap: 16px;
  list-style: none;
  padding: 0;
}

nav a {
  text-decoration: none;
}`}},{text:"Una tabla con fila de cabecera y una celda que ocupa dos columnas:",code:{html:`<table>
  <tr>
    <th>Día</th>
    <th>Mañana</th>
    <th>Tarde</th>
  </tr>
  <tr>
    <td>Domingo</td>
    <td colspan="2">Cerrado</td>
  </tr>
</table>`,css:`table {
  border-collapse: collapse;
}

th,
td {
  border: 1px solid #333;
  padding: 6px;
}`}},{text:"Un formulario: cada campo con su `label` (for = id) y su `name`:",code:{html:`<form>
  <label for="nombre">Nombre</label>
  <input type="text" id="nombre" name="nombre" required>

  <label for="tipo">Tipo</label>
  <select id="tipo" name="tipo">
    <option>Uno</option>
    <option>Otro</option>
  </select>

  <input type="radio" id="si" name="aviso" value="si">
  <label for="si">Sí</label>
  <input type="radio" id="no" name="aviso" value="no">
  <label for="no">No</label>

  <button type="submit">Enviar</button>
</form>`}},{text:"Las tarjetas en columnas, el contenido centrado y el móvil:",code:{css:`img {
  max-width: 100%;
  height: auto;
}

main {
  max-width: 1000px;
  margin: 0 auto;
}

.tarjetas {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 16px;
}

@media (max-width: 600px) {
  .tarjetas {
    grid-template-columns: 1fr;
  }
}`},exam:"Cópiala a mano una vez en papel: escribirla ayuda a recordarla mucho más que leerla."}],recap:["Cabecera: flex con `space-between` y `align-items: center`.","Menú: `nav > ul > li > a`, con flex y sin puntos.","Tabla: `th` en la cabecera y `colspan` para juntar.","Formulario: `label for` = `id`, y `name`.","Tarjetas con grid, `main` centrado y la media query al final."]}],challenges:[{kind:"match",id:"frases",title:"Del enunciado al código",task:"Une cada frase de un enunciado con lo que hay que escribir.",pairs:[["«El nombre de la empresa como título principal»","`<h1>`"],["«Una foto de cada producto»",'`<img src="img/…" alt="…">`'],["«Que se pueda llamar desde el móvil»",'`<a href="tel:…">`'],["«El menú sin puntos»","`list-style: none`"],["«Los enlaces sin subrayar»","`text-decoration: none`"],["«El contenido centrado, de 1000px como mucho»","`max-width: 1000px; margin: 0 auto;`"]],why:"En el examen todo empieza así: frase a frase, cada una con su etiqueta o su propiedad."},{kind:"quiz",id:"primero",title:"Lo primero",question:"Empieza el examen y ya has leído el enunciado. ¿Qué escribes primero?",options:["El esqueleto con el `<link>` a `estilos.css`","Los colores del CSS","La media query del móvil","El formulario, que es lo más largo"],why:"Con el esqueleto y el `<link>` hechos, todo lo demás se ve en el navegador según lo escribes. Si el CSS no llega, lo descubres al principio y no al final."},{kind:"code",id:"simulacro-fontaneria",title:"Simulacro 1: la fontanería",exam:{minutes:30},brief:p("**Fontanería Grifo** quiere una web sencilla, de una sola página. Entrega `index.html` y `estilos.css`.","","- La página en español, con el título «Fontanería Grifo» en la pestaña y preparada para el móvil.","- Una cabecera con el logo (`img/logo.svg`) y el nombre de la empresa como título principal.","- Un menú con enlaces a los tres apartados de la página: Servicios, Precios y Contacto.","- Apartado «Servicios»: una lista con al menos tres servicios.","- Apartado «Precios»: un párrafo que diga que el presupuesto es gratis.","- Apartado «Contacto»: el teléfono 600 123 456, como enlace para llamar.","- Un pie con «© 2026 Fontanería Grifo».","","Diseño: la cabecera con fondo azul oscuro (`#0b3d91`) y letras blancas; el menú en horizontal y sin puntos; y toda la página con una letra sin remates (sans-serif)."),start:gn,solution:{html:vs,css:qs},checks:[{label:"Esqueleto completo, en español, preparado para el móvil y con el título «Fontanería Grifo»",test:e=>je(e)&&un(e,"Fontanería Grifo")},{label:"El CSS está en `estilos.css` y enlazado",test:e=>e.linked&&!!e.files.css.trim()},{label:"Cabecera con el logo y el nombre como título principal",test:e=>we(e.q("header img"))&&!!e.q("header img")?.getAttribute("alt")?.trim()&&e.loose("header h1").includes("fontaneria grifo")},{label:"Menú con Servicios, Precios y Contacto, que lleva a cada apartado",test:e=>pn(e,["Servicios","Precios","Contacto"])},{label:"Servicios: una lista con al menos tres",test:e=>(mn(e,"Servicios")?.querySelectorAll("ul > li, ol > li").length??0)>=3},{label:"Precios: el presupuesto es gratis",test:e=>[...mn(e,"Precios")?.querySelectorAll("p")??[]].some(a=>e.loose(a).includes("gratis"))},{label:"Contacto: el teléfono como enlace para llamar",test:e=>[...mn(e,"Contacto")?.querySelectorAll('a[href^="tel:"]')??[]].some(a=>(a.getAttribute("href")??"").replace(/\D/g,"").endsWith("600123456"))},{label:"Pie con «© 2026 Fontanería Grifo»",test:e=>e.text("footer").includes("© 2026")&&e.loose("footer").includes("fontaneria grifo")},{label:"Cabecera azul oscuro (`#0b3d91`) con letras blancas",test:e=>e.color("header","background-color","#0b3d91")&&e.color("header h1","color","white")},{label:"Menú en horizontal y sin puntos",test:async e=>{const a=await e.at(Q),n=a.all("nav li"),t=a.all("nav a").map(o=>Math.round(o.getBoundingClientRect().top));return t.length>=3&&t.every(o=>Math.abs(o-t[0])<4)&&n.every(o=>a.style(o,"list-style-type")==="none")}},{label:"Letra sin remates en toda la página",test:e=>/sans-serif|arial|helvetica|verdana|tahoma/i.test(e.style("body","font-family"))},{label:"Sin errores en el HTML ni en el CSS",test:bn}],why:"Una web completa en 30 minutos: el esqueleto de memoria, los apartados con su `id` para el menú, el enlace `tel:` y cuatro reglas de CSS."},{kind:"code",id:"simulacro-panaderia",title:"Simulacro 2: la panadería",exam:{minutes:60},brief:p("**Panadería La Espiga** abre su web. Te da este contenido:","- Productos: Tarta de queso, 18 € (foto `img/tarta.svg`); Galletas de mantequilla, 6 € la docena (`img/galletas.svg`); Cruasanes, 1,20 € (`img/cruasan.svg`).","- Horario: de lunes a viernes, de 7:00 a 14:00 y de 17:00 a 20:00; los sábados, de 8:00 a 14:00 (por la tarde, cerrado); los domingos, cerrado.","- Dirección: Calle del Trigo, 3. Logo: `img/logo.svg`.","","Lo que pide:","- Página en español, con el título «Panadería La Espiga» y preparada para el móvil.","- Una cabecera con el logo y un menú (Productos, Horario, Encargos) que lleve a cada apartado.","- Apartado «Productos»: cada producto en su tarjeta (`article`) con su foto, su nombre y su precio.","- Apartado «Horario»: una tabla con una fila de cabecera (Día, Mañana, Tarde) y una fila para cada tipo de día. El domingo, «Cerrado» ocupando las dos columnas.","- Apartado «Encargos»: un formulario con nombre, teléfono, producto (una lista desplegable con los tres productos), fecha de recogida y un botón «Encargar». Cada campo con su etiqueta; el nombre y el teléfono, obligatorios.","- Un pie con la dirección.","","Diseño:","- La cabecera con el logo a la izquierda y el menú a la derecha, centrados en vertical, fondo `#8b4513` y los enlaces blancos y sin subrayar.","- El contenido centrado, con 1000px de ancho como mucho.","- Los productos en 3 columnas en el ordenador y en una en el móvil (600px o menos). Las fotos no se pueden salir de su tarjeta.","- La tabla con un borde de 1px en las celdas, sin separación entre ellos."),start:gn,solution:{html:js,css:Ss},checks:[{label:"Esqueleto completo, en español, preparado para el móvil y con su título",test:e=>je(e)&&un(e,"Panadería La Espiga")},{label:"El CSS está en `estilos.css` y enlazado",test:e=>e.linked&&!!e.files.css.trim()},{label:"Cabecera con el logo y el menú",test:e=>we(e.q("header img"))&&e.has("header nav")},{label:"El menú lleva a Productos, Horario y Encargos",test:e=>pn(e,["Productos","Horario","Encargos"])},{label:"Tres tarjetas (`article`) con foto, nombre y precio",test:e=>{const a=e.all("article").filter(t=>we(t.querySelector("img"))&&!!t.querySelector("img")?.getAttribute("alt")?.trim()&&!!t.querySelector("h2, h3, h4")&&(t.textContent??"").includes("€")),n=a.map(t=>t.querySelector("img").getAttribute("src")??"");return a.length>=3&&["tarta","galletas","cruasan"].every(t=>n.some(o=>o.includes(t)))}},{label:"Tabla del horario con la fila de cabecera (Día, Mañana, Tarde)",test:e=>e.all("table").some(a=>{const n=[...a.querySelectorAll("tr")];return n.length>=4&&[...n[0].children].every(t=>t.tagName==="TH")&&hn(n[0]).join("|")==="dia|manana|tarde"})},{label:"El domingo, «Cerrado» ocupando las dos columnas",test:e=>e.all("tr").some(a=>hn(a)[0]?.startsWith("domingo")&&[...a.children].some(n=>n.getAttribute("colspan")==="2"&&I(n.textContent??"")==="cerrado"))},{label:"Nombre y teléfono obligatorios (el teléfono, de tipo `tel`)",test:e=>{const a=O(e,"nombre"),n=O(e,"telefono");return!!a&&me(a)&&G(n)==="tel"&&me(n)}},{label:"El producto en una lista desplegable con los tres",test:e=>{const a=O(e,"producto"),n=Oa(a).join("|");return G(a)==="select"&&["tarta","galletas","cruasan"].every(t=>n.includes(t))}},{label:"La fecha de recogida con un campo de fecha",test:e=>G(O(e,"fecha"))==="date"},{label:"El botón «Encargar» y cada campo con su etiqueta y su `name`",test:e=>De(e,"Encargar")&&Ve(e.doc).length>=4&&Ve(e.doc).every(a=>!!Xe(e.doc,a)&&ne(a))},{label:"Pie con la dirección",test:e=>e.loose("footer").includes("calle del trigo")},{label:"Cabecera: logo a la izquierda y menú a la derecha, centrados en vertical",test:async e=>ys(await e.at(Q))},{label:"Cabecera `#8b4513` con los enlaces blancos y sin subrayar",test:e=>e.color("header","background-color","#8b4513")&&e.all("nav a").length>0&&e.all("nav a").every(a=>e.color(a,"color","white")&&e.style(a,"text-decoration-line")==="none")},{label:"Contenido centrado, de 1000px como mucho",test:async e=>{const a=await e.at(1300),n=N(a,"main");return n.width>0&&n.width<=1000.5&&Math.abs(n.left-(a.doc.documentElement.clientWidth-n.right))<2},hint:"El contenido dentro de `<main>`, con `max-width` y `margin: 0 auto`."},{label:"Productos en 3 columnas en el ordenador y en una en el móvil, sin salirse",test:async e=>{const[a,n]=[await e.at(Q),await e.at(ae)];return Z(a,"article")===3&&Z(n,"article")===1&&ha(a)&&ha(n)}},{label:"Tabla con borde de 1px en las celdas y sin separación",test:e=>e.style("table","border-collapse")==="collapse"&&e.all("td, th").length>0&&e.all("td, th").every(a=>xs(e,a))},{label:"Sin errores en el HTML ni en el CSS",test:bn}],why:"Es una web de examen completa: menú con anclas, tarjetas, una tabla con `colspan`, un formulario con todos sus campos y la maquetación con flex, grid y una media query."},{kind:"code",id:"simulacro-club",title:"Simulacro 3: el club ciclista",exam:{minutes:90},brief:p("El **Club ciclista Pedalea** quiere su web. Te da este contenido:","- Salidas de abril (fecha, ruta, km y nivel): 5 de abril, Vuelta al pantano, 45, Fácil; 12 de abril, Puerto de la Sierra, 80, Difícil; 19 de abril, Ruta de los molinos, 60, Medio; 26 de abril, Vuelta al pantano, 45, Fácil.","- Noticias: «Ya está aquí la nueva equipación del club» y «El 3 de mayo, salida especial con almuerzo».","- Correo: info@pedalea.es. Logo: `img/logo.svg`.","","Lo que pide:","- Página en español, con el título «Club ciclista Pedalea» y preparada para el móvil.","- Una cabecera con el logo, el nombre del club como título principal y un menú (Salidas, Inscripción, Contacto) que lleve a cada parte.","- Apartado «Salidas»: una tabla con el título «Salidas de abril», la fila de cabecera dentro de `thead` y las salidas dentro de `tbody`.","- Apartado «Inscripción»: un formulario con nombre y correo (los dos obligatorios y el correo de tipo email) dentro de un grupo con el título «Tus datos»; el nivel (Fácil, Medio o Difícil, solo uno); una casilla «Tengo licencia federativa»; un cuadro de comentarios y el botón «Inscribirme». Cada campo con su etiqueta.","- Un lateral (`aside`) «Noticias» con las dos noticias en una lista.","- Un pie con el correo como enlace para escribir. Es la parte «Contacto» del menú.","","Diseño:","- Con grid: la cabecera arriba a todo lo ancho; debajo, el contenido y a su derecha el lateral, de 280px; y el pie abajo a todo lo ancho.","- En el móvil (600px o menos), todo en una columna, con el lateral debajo del contenido.","- El menú en horizontal con flexbox y 20px de hueco.","- La cabecera de la tabla con fondo `#2a9d8f` y letras blancas.","- El botón con fondo `#2a9d8f`, letras blancas, sin borde y con las esquinas redondeadas 6px."),start:gn,solution:{html:Cs,css:ks},checks:[{label:"Esqueleto completo, en español, preparado para el móvil y con su título",test:e=>je(e)&&un(e,"Club ciclista Pedalea")},{label:"El CSS está en `estilos.css` y enlazado",test:e=>e.linked&&!!e.files.css.trim()},{label:"Cabecera con el logo, el nombre como título principal y el menú",test:e=>we(e.q("header img"))&&e.loose("header h1").includes("club ciclista pedalea")&&e.has("header nav")},{label:"El menú lleva a Salidas, Inscripción y Contacto",test:e=>pn(e,["Salidas","Inscripción","Contacto"])},{label:"La tabla con el título «Salidas de abril» (`caption`)",test:e=>e.loose("table caption")==="salidas de abril"},{label:"Cabecera en `thead` (Fecha, Ruta, Km, Nivel) y las cuatro salidas en `tbody`",test:e=>hn(e.q("thead tr")).join("|")==="fecha|ruta|km|nivel"&&e.all("thead th").length===4&&e.count("tbody tr")===4},{label:"Nombre y correo obligatorios (el correo de tipo email) en un grupo «Tus datos»",test:e=>{const a=e.all("fieldset").find(o=>I(o.querySelector("legend")?.textContent??"")==="tus datos");if(!a)return!1;const n=O(e,"nombre",a),t=O(e,"correo",a);return!!n&&me(n)&&G(t)==="email"&&me(t)},hint:"Un grupo con título es un `<fieldset>` con su `<legend>`."},{label:"El nivel: Fácil, Medio o Difícil, solo uno",test:e=>{const a=Da(e);return a.all.length===3&&a.names.length===1&&!!a.names[0]&&["facil","medio","dificil"].every(n=>a.labels.includes(n))}},{label:"La casilla «Tengo licencia federativa»",test:e=>G(O(e,"licencia"))==="checkbox"},{label:"Los comentarios en un cuadro de texto y el botón «Inscribirme»",test:e=>G(O(e,"comentarios"))==="textarea"&&De(e,"Inscribirme")},{label:"Cada campo con su etiqueta y su `name`",test:e=>Ve(e.doc).length>=7&&Ve(e.doc).every(a=>!!Xe(e.doc,a)&&ne(a))},{label:"Lateral (`aside`) «Noticias» con las dos en una lista",test:e=>e.loose("aside h2")==="noticias"&&e.count("aside li")>=2},{label:"Pie con el correo como enlace para escribir",test:e=>e.all("footer a").some(a=>(a.getAttribute("href")??"").toLowerCase()==="mailto:info@pedalea.es")},{label:"Ordenador: cabecera y pie a todo lo ancho, y el lateral de 280px a la derecha del contenido",test:async e=>{const a=await e.at(Q),n=N(a,"body"),[t,o,l,s]=[N(a,"header"),N(a,"main"),N(a,"aside"),N(a,"footer")];return Math.abs(t.width-n.width)<1&&Math.abs(s.width-n.width)<1&&Math.abs(l.width-280)<1&&Math.abs(o.top-l.top)<2&&l.left>=o.right-1&&s.top>=Math.max(o.bottom,l.bottom)-1}},{label:"Móvil: todo en una columna, con el lateral debajo del contenido",test:async e=>{const a=await e.at(ae),n=N(a,"body");return Math.abs(N(a,"aside").width-n.width)<1&&N(a,"aside").top>=N(a,"main").bottom-1&&ha(a)}},{label:"Menú en horizontal con flexbox y 20px de hueco",test:async e=>{const a=await e.at(Q),n=a.q("nav ul")??a.q("nav"),t=a.all("nav a").map(o=>Math.round(o.getBoundingClientRect().top));return V(a,n)&&a.px(n,"column-gap")===20&&t.length>=3&&t.every(o=>Math.abs(o-t[0])<4)}},{label:"Cabecera de la tabla con fondo `#2a9d8f` y letras blancas",test:e=>e.all("th").length>0&&e.all("th").every(a=>e.color(a,"background-color","#2a9d8f")&&e.color(a,"color","white"))},{label:"El botón: fondo `#2a9d8f`, letras blancas, sin borde y esquinas de 6px",test:e=>{const a=e.q('form button, form input[type="submit"]');return e.color(a,"background-color","#2a9d8f")&&e.color(a,"color","white")&&(e.style(a,"border-top-style")==="none"||e.px(a,"border-top-width")===0)&&e.px(a,"border-top-left-radius")===6}},{label:"Sin errores en el HTML ni en el CSS",test:bn}],why:"Si has llegado aquí, sabes hacer la web del examen: la página en zonas con grid, la tabla con sus partes, un formulario con todos los tipos de campo y la versión del móvil."}]},ao=H("Floristería Lirio",`    <header>
      <img src="img/logo.svg" alt="Logo de la Floristería Lirio" width="50">
      <nav>
        <a href="#ramos">Ramos</a>
        <a href="#plantas">Plantas</a>
        <a href="#contacto">Contacto</a>
      </nav>
    </header>`),Ls={html:ao,css:`body {
  margin: 0;
  font-family: Arial, sans-serif;
}
`},_s=`body {
  margin: 0;
  font-family: Arial, sans-serif;
}

header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 70px;
  padding: 0 20px;
  background-color: #2e7d32;
}

nav {
  display: flex;
  gap: 24px;
}

nav a {
  color: white;
  text-decoration: none;
  font-size: 18px;
}
`,yt=(e,[a,n,t])=>{const o=e.match(/\d+(\.\d+)?/g)?.map(Number)??[];return o.length>=3&&Math.abs(o[0]-a)<=3&&Math.abs(o[1]-n)<=3&&Math.abs(o[2]-t)<=3},Ms={n:10,intro:"El examen de la web: te dan la web terminada impresa en papel, los códigos de los colores, las imágenes y un .txt con los textos, y tiene que quedar lo más parecida posible. Aquí tienes la rutina, cómo sacar las medidas a ojo y lo que se ve pasado a código. Para practicar con imágenes, en el mapa tienes el puerto, las maquetas y los retos de ojo.",lessons:[{id:"rutina",title:"La rutina del examen de la imagen",summary:"De la imagen a la web en seis pasos",steps:[{text:p("Con una imagen delante dan ganas de empezar por los colores. No lo hagas: lo que más se parece es que **cada cosa esté en su sitio**. El orden:","- **1. Mira la imagen entera** (2 minutos). Cuántas zonas tiene de arriba abajo, qué va en fila, qué va en columnas, qué se repite. Lee también las peticiones: lo que no se ve en la imagen (un `required`, un enlace a un apartado, el `alt`) solo está ahí.","- **2. Dibuja las cajas** en papel o sobre la imagen: cada zona con su etiqueta (`header`, `nav`, `main`, `section`, `article`, `aside`, `footer`) y si sus hijos van en fila (flex) o en rejilla (grid).","- **3. Escribe todo el HTML** con **todos los textos**, copiados del **.txt** que te dan, sin CSS. Cada texto que falta se nota.","- **4. El CSS de la colocación**: las filas y las rejillas, el ancho del contenido y los huecos grandes.","- **5. Los colores y los tamaños**: los códigos de color que te dan, en el fondo de cada zona y en las letras; los tamaños de los títulos, los bordes y las esquinas, a ojo.","- **6. El móvil** (si dan su imagen) y **el repaso**: pon tu web al lado de la imagen y busca diferencias de arriba abajo."),exam:"Reparto para 60 minutos: 5 para mirar y dibujar las cajas, 20 para el HTML, 25 para el CSS y 10 para el móvil y el repaso."},{text:p("El repaso, con la imagen al lado, de **arriba abajo**: si algo de arriba mide distinto, todo lo de debajo se mueve, así que arregla primero lo de arriba.","","En cada zona, pregúntate:","- ¿Están todos los textos, escritos igual?","- ¿Va en fila o en columnas como en la imagen? ¿Al mismo lado?","- ¿El fondo y el color de la letra son los de la imagen?","- ¿El título es igual de grande? ¿Y el hueco de alrededor?","- ¿Las esquinas son redondas o en punta? ¿Hay borde?")},{check:{task:"Ordena la rutina: une cada paso con lo que haces en él.",pairs:[["Paso 1","Mirar la imagen entera y leer las peticiones"],["Paso 2","Dibujar las cajas con su etiqueta"],["Paso 3","Todo el HTML con todos los textos"],["Paso 4","Filas, rejillas y anchos"],["Paso 5","Colores, tamaños, bordes y esquinas"],["Paso 6","El móvil y el repaso de arriba abajo"]],why:"Primero que cada cosa esté y esté en su sitio; los detalles, al final. Un color un poco distinto se nota menos que una columna que falta."}},{check:{question:"Llevas 40 minutos de 60. Tu web tiene todo el HTML y las columnas, pero los colores aún son los del navegador. ¿Qué haces?",options:["Los fondos y colores de cada zona con los códigos que te dan, y después el repaso","Rehago el HTML para que quede más limpio","Me pongo con la media query del móvil","Ajusto el tamaño de letra del título píxel a píxel, aunque tarde"],why:"Con 20 minutos, lo que más parecido gana es poner el color de cada zona: los códigos ya los tienes. Un tamaño exacto es un detalle: si sobra tiempo, se afina."}}],recap:["Primero que cada cosa esté en su sitio; los detalles, al final.","Cajas, HTML con todos los textos, colocación, colores y tamaños, móvil y repaso.","Las peticiones que no se ven en la imagen también puntúan.","Repasa de arriba abajo con la imagen al lado."]},{id:"medidas",title:"Colores dados y medidas a ojo",summary:"El papel, los códigos y la letra de 16px",steps:[{text:p("La web viene **impresa en papel**: no hay cuentagotas ni Paint. Pero tienes dos ayudas:","- **Los colores te los dan** con su código. Escríbelos tal cual en el `background-color` o el `color` de cada zona: `#2e7d32`.","- **Los textos te los dan** en un .txt: cópialos y pégalos, así no hay faltas.","","Lo único que sacas tú son **las medidas**, y a ojo, comparando con algo que conoces."),exam:"Antes de empezar, apunta en el papel, al lado de cada zona, su código de color. Y escríbelos con cuidado: con `#` y 6 cifras o letras de la a a la f; una cambiada es otro color."},{text:"Los códigos se copian así en el CSS. Prueba a cambiarlos:",try:{task:"Pon de fondo de la cabecera el verde #2e7d32 y al título el amarillo #ffeb3b.",tabs:["css"],html:H("Colores",`    <header>
      <h1>Floristería Lirio</h1>
    </header>`),css:`header {
  background-color: #cccccc;
  padding: 10px 20px;
}

h1 {
  color: #000000;
}
`}},{text:p("**La vara de medir es la letra normal: 16px.** Compara todo con ella:","- Un título como **dos** líneas de texto normal: `32px` (el `h1`); como una y media: `24px` (el `h2`).","- Un hueco como una línea de texto: unos `16px`; como media: `8px`; como dos o tres: `32` o `40px`.","- Un ancho, **en proporción**: si una columna ocupa un tercio, son 3 columnas (`repeat(3, 1fr)`); si la foto ocupa casi la mitad, `width: 40%` o `50%`.","- Una cabecera baja, con una línea de menú: de 60 a 80px de alto.","","Y **redondea** a las medidas que más salen: 8, 10, 16, 20, 24, 32 y 40px; esquinas de 4 a 10px (un círculo, `50%`); bordes de 1px.")},{text:p("Si puedes usar una **regla** en el papel, pasa los centímetros a píxeles con una regla de tres:","- Mide el ancho de la web entera en el papel (por ejemplo, **20 cm**) y piensa que en el ordenador son unos **1000px**.","- Entonces **1 cm son 50px** (1000 / 20) y 1 mm, 5px. Un botón de 3 cm mide unos 150px.","","Para practicar como en el examen: en las **maquetas**, activa el **modo papel** (sin cuentagotas ni regla, con los colores dados); en el **modo examen**, el modelo se ve como una hoja."),exam:"No pierdas tiempo midiéndolo todo: basta con que se parezca. Mide solo lo grande (la cabecera, las columnas, la foto) y lo demás, a ojo."},{check:{question:"Un título del papel se ve más o menos el doble de alto que el texto normal. ¿Qué tamaño de letra le pones?",options:["32px","16px","64px","2px"],why:"La letra normal mide 16px: el doble son 32px, el tamaño del `h1`."}},{check:{question:"En el papel la web mide 20 cm de ancho y es para un ordenador de 1000px. Un botón mide 3 cm. ¿Qué ancho tiene?",options:["150px","30px","300px","60px"],why:"1000 / 20 = 50px cada centímetro; 3 cm × 50 = 150px."}}],recap:["Los colores y los textos te los dan: cópialos tal cual.","Las medidas, a ojo: la letra normal mide 16px.","Los anchos, en proporción: un tercio, la mitad.","Con regla: el ancho del papel son unos 1000px.","Redondea: 8, 16, 24, 32px."]},{id:"patrones",title:"Lo que ves → el código",summary:"Las formas que más salen en una imagen",steps:[{text:"**Un menú en fila** (los enlaces uno al lado de otro, con hueco entre ellos):",code:{css:`nav ul {
  display: flex;
  gap: 20px;
  list-style: none;
  padding: 0;
}`}},{text:"**El logo a un lado y el menú al otro**, a la misma altura:",try:{task:"Cambia `space-between` por `center` y luego quita `align-items`. Mira qué pasa.",html:H("Cabecera",`    <header>
      <img src="img/logo.svg" alt="Logo" width="50">
      <nav>
        <a href="#">Inicio</a>
        <a href="#">Tienda</a>
      </nav>
    </header>`),css:`header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 20px;
  background-color: #e8f5e9;
}

nav {
  display: flex;
  gap: 16px;
}
`}},{text:p("**Centrado**: depende de qué.","- Un texto: `text-align: center`.","- Una caja (el contenido de la página, con hueco a los lados): `max-width: 1000px; margin: 0 auto;`.","- Una cosa en medio de otra, en las dos direcciones: `display: flex; justify-content: center; align-items: center;`."),code:{css:`main {
  max-width: 1000px;
  margin: 0 auto;
}

.portada {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 300px;
}`}},{text:"**Tarjetas iguales en columnas** (cuenta cuántas hay en la primera fila):",try:{task:"Ponlas en 2 columnas y luego haz que la primera sea el doble de ancha (`2fr 1fr`).",html:H("Tarjetas",`    <div class="tarjetas">
      <article>Uno</article>
      <article>Dos</article>
      <article>Tres</article>
    </div>`),css:`.tarjetas {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 20px;
}

article {
  background-color: #fff3e0;
  border: 1px solid #e0a060;
  border-radius: 8px;
  padding: 16px;
}
`}},{text:"**Foto a un lado y texto al otro**: una fila de dos. Si la foto va a la derecha, se pone después en el HTML.",code:{css:`.presentacion {
  display: flex;
  gap: 30px;
  align-items: center;
}

.presentacion img {
  width: 40%;
}`}},{text:"**El pie en columnas** y **la cabecera que se queda arriba** al bajar:",code:{css:`footer {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 20px;
}

header {
  position: sticky;
  top: 0;
}`}},{text:"**Detalles**: botón redondeado, foto en círculo y un fondo con imagen.",code:{css:`.boton {
  background-color: #2e7d32;
  color: white;
  padding: 10px 20px;
  border-radius: 20px;
  text-decoration: none;
}

.avatar {
  width: 80px;
  height: 80px;
  border-radius: 50%;
  object-fit: cover;
}

.portada {
  background-image: url("img/paisaje.svg");
  background-size: cover;
}`},exam:"Un botón que en la imagen tiene los lados del todo redondos es un `border-radius` grande (la mitad de su alto o más)."},{check:{task:"Une lo que ves en la imagen con el CSS que lo hace.",pairs:[["El logo a la izquierda y el menú a la derecha","`justify-content: space-between`"],["Tres tarjetas iguales en una fila","`grid-template-columns: repeat(3, 1fr)`"],["Una foto redonda","`border-radius: 50%`"],["El contenido en medio, con hueco a los lados","`max-width` y `margin: 0 auto`"],["Los enlaces del menú separados","`gap: 20px`"],["La cabecera no se va al bajar","`position: sticky; top: 0;`"]],why:"Mirando la imagen ya sabes qué propiedad usar: estas seis salen en casi todas."}}],recap:["En fila: flex y `gap`; a los lados: `space-between`.","En columnas: grid con tantas `1fr` como cajas en la fila.","Centrar una caja: `max-width` y `margin: 0 auto`.","Círculo: `border-radius: 50%`; pegado arriba: `sticky`."]}],challenges:[{kind:"match",id:"ves-codigo",title:"Lo que ves",task:"Une lo que se ve en una imagen con lo que hay que escribir.",pairs:[["Los productos en 4 columnas iguales","`repeat(4, 1fr)`"],["Una columna el doble de ancha que la otra","`2fr 1fr`"],["Las esquinas un poco redondeadas","`border-radius: 8px`"],["Una raya fina gris alrededor","`border: 1px solid #ccc`"],["Los enlaces sin subrayar","`text-decoration: none`"],["En el móvil, todo en una columna","`@media (max-width: 600px)` con `1fr`"]],why:"Cada cosa que se ve tiene su propiedad. Cuanto antes la reconozcas, más tiempo te queda para los detalles."},{kind:"quiz",id:"empezar-imagen",title:"Lo primero con la imagen",question:"Te dan la imagen de la web y 60 minutos. ¿Qué haces primero?",options:["Mirarla entera, leer las peticiones y dibujar sus cajas","Escribir en el CSS todos los códigos de color que te dan","Escribir el CSS de la cabecera","Medir con la regla cada letra del papel"],why:"Con las cajas dibujadas sabes qué HTML escribir y qué va con flex o con grid. Los colores y las medidas vienen después."},{kind:"quiz",id:"color-paint",title:"El código del color",question:"Te dan el color de fondo de la cabecera: `#1b5e20`. ¿Cómo lo escribes?",options:["`background-color: #1b5e20;`","`background-color: 1b5e20;`","`color: #1b5e20;`","`background-color: #1b5e2;`"],why:"El fondo es `background-color` (`color` es el de la letra), y el código va con `#` delante y sus 6 cifras, tal cual te lo dan."},{kind:"quiz",id:"escala",title:"Del papel a los píxeles",question:"En el papel la web mide 25 cm de ancho y es para un ordenador de 1000px. El hueco entre tarjetas mide 5 mm. ¿Qué `gap` pones?",options:["`20px`","`5px`","`50px`","`4px`"],why:"1000px / 250 mm = 4px cada milímetro; 5 mm × 4 = 20px."},{kind:"code",id:"cabecera-medida",title:"La cabecera del papel",brief:p("Así ves en el papel la cabecera de la **Floristería Lirio**. Escribe el CSS para que quede igual (las medidas, a ojo: vale lo que se parezca):","","- El logo a la izquierda y el menú a la derecha, los dos centrados en vertical.","- Es una cabecera baja, de una sola línea de menú (de 60 a 80px de alto), con un hueco a izquierda y derecha como una línea de texto.","- El fondo, con el color que te dan: `#2e7d32`.","- Los enlaces del menú, en fila y bien separados, en blanco, sin subrayar y algo más grandes que el texto normal."),tabs:["css"],start:Ls,solution:{html:ao,css:_s},checks:[{label:"El logo a la izquierda y el menú a la derecha",test:e=>{const a=N(e,"header"),n=N(e,"header img"),t=N(e,"header nav");return V(e,"header")&&n.width>0&&n.right<=t.left&&n.left-a.left<30&&a.right-t.right<30},hint:"La cabecera con `display: flex` y `justify-content: space-between`."},{label:"Los dos centrados en vertical",test:e=>{const a=N(e,"header img"),n=N(e,"header nav");return Math.abs(a.top+a.height/2-(n.top+n.height/2))<3},hint:"`align-items: center` en la cabecera."},{label:"Una cabecera baja (de 60 a 80px)",test:e=>Math.abs(N(e,"header").height-70)<=10,hint:"`height: 70px` (si usas `padding` arriba y abajo, cuenta que se suma)."},{label:"Hueco a los lados (de 12 a 32px)",test:e=>["padding-left","padding-right"].every(a=>e.px("header",a)>=12&&e.px("header",a)<=32),hint:"`padding: 0 20px;` (una línea de texto son unos 16px)."},{label:"El fondo con el color dado",test:e=>yt(e.style("header","background-color"),[46,125,50]),hint:"`background-color: #2e7d32;`"},{label:"Los enlaces en fila y separados (de 12 a 40px)",test:e=>{const a=e.all("nav a").map(t=>t.getBoundingClientRect()),n=a.length>1?a[1].left-a[0].right:0;return a.length===3&&a.every(t=>Math.abs(t.top-a[0].top)<2)&&n>=12&&n<=40},hint:"El `nav` con `display: flex` y `gap: 24px`."},{label:"Enlaces blancos, sin subrayar y algo más grandes (de 17 a 22px)",test:e=>e.all("nav a").every(a=>yt(e.style(a,"color"),[255,255,255])&&!e.style(a,"text-decoration-line").includes("underline")&&e.px(a,"font-size")>=17&&e.px(a,"font-size")<=22),hint:"`nav a { color: white; text-decoration: none; font-size: 18px; }`"}],why:"Así se hace en el examen: el color, tal cual te lo dan; las medidas, a ojo comparando con la letra de 16px, y redondeadas. Con la rutina, cada zona de la imagen es una cabecera como esta."}]},Ka={1:ts,2:os,3:ss,4:rs,5:cs,6:us,7:ps,8:gs,9:$s,10:Ms},no=[{n:1,part:"html",title:"El esqueleto",topic:"Etiquetas, el documento y las zonas de la página"},{n:2,part:"html",title:"Los contenidos",topic:"Listas, enlaces, imágenes y el menú de navegación"},{n:3,part:"html",title:"Las tablas",topic:"Filas, celdas, cabeceras y celdas que se juntan"},{n:4,part:"html",title:"Los formularios",topic:"Campos, etiquetas, opciones y botones"},{n:5,part:"css",title:"La pintura",topic:"Selectores, colores, fuentes y la cascada"},{n:6,part:"css",title:"Las cajas",topic:"Márgenes, relleno, bordes, medidas, display y tablas con estilo"},{n:7,part:"css",title:"La fila",topic:"Flexbox: menús en horizontal, centrar y repartir"},{n:8,part:"css",title:"La rejilla",topic:"Grid, tarjetas en columnas y la web en el móvil"},{n:9,part:"exam",title:"El encargo",topic:"Del enunciado del cliente a la web completa"},{n:10,part:"exam",title:"La imagen",topic:"De la web en papel a tu código: la rutina, las medidas a ojo y lo que ves"}],zs={html:"HTML",css:"CSS",exam:"Examen"},Ta=(e,...a)=>n=>n.startsWith(`<${e} `)&&n.endsWith(">")&&a.every(t=>n.includes(t)),B=(e,a,n,t,o)=>({id:`h-${e}`,topic:"html",q:a,a:n,why:t,also:o}),Y=(e,a,n,t,o)=>({id:`c-${e}`,topic:"css",q:a,a:n,why:t,also:o}),to=[B("doctype","La primera línea de toda página","<!DOCTYPE html>","Dice que es HTML5. El validador lo pide siempre."),B("lang","La etiqueta que lo envuelve todo, en español",'<html lang="es">',"lang le dice al navegador (y al validador) el idioma."),B("charset","Que se vean bien las tildes y la ñ",'<meta charset="UTF-8">',"Va en el <head>, lo primero."),{...B("viewport","Que la página se adapte al ancho del móvil",'<meta name="viewport" content="width=device-width, initial-scale=1.0">',"Sin él, las @media no funcionan bien en el móvil."),test:Ta("meta",'name="viewport"','content="width=device-width')},B("title","El texto de la pestaña del navegador","<title>","Va dentro del <head>.",["<title></title>"]),{...B("link","Enlazar la hoja de estilos estilos.css",'<link rel="stylesheet" href="estilos.css">','En el <head>. rel="stylesheet" y href con el nombre exacto.'),test:Ta("link",'rel="stylesheet"','href="estilos.css"')},B("header","La cabecera de la página (logo y título)","<header>"),B("nav","El bloque del menú de navegación","<nav>","Dentro, una lista <ul> con un <li> por enlace."),B("main","El contenido principal, uno por página","<main>"),B("section","Un apartado con su propio título","<section>","Suele empezar con un <h2>."),B("article","Una tarjeta que tiene sentido sola (un producto, una noticia)","<article>"),B("aside","Un bloque al lado del contenido (información extra)","<aside>"),B("footer","El pie de la página (copyright, licencia)","<footer>"),B("div","Una caja sin significado, solo para agrupar y dar estilo","<div>",'Úsala para el contenedor de las tarjetas: <div class="tarjetas">.'),B("h1","El título principal de la página","<h1>","Uno por página. Luego <h2> para apartados y <h3> para tarjetas."),B("p","Un párrafo","<p>"),B("ul","Una lista con puntos","<ul>","Cada elemento, en un <li>."),B("ol","Una lista numerada","<ol>"),B("li","Cada elemento de una lista","<li>"),B("a","Un enlace a productos.html",'<a href="productos.html">',"El texto del enlace va entre <a> y </a>."),B("tel","Un enlace para llamar al 944 123 456",'<a href="tel:944123456">',"Sin espacios en el número."),B("mailto","Un enlace para escribir un correo a hola@tienda.com",'<a href="mailto:hola@tienda.com">'),{...B("img","Una imagen de la carpeta img con su texto alternativo",'<img src="img/foto.jpg" alt="Descripción">',"<img> no se cierra. alt describe la imagen (el validador lo pide)."),test:Ta("img",'src="img/','alt="')},B("strong","Poner un texto en negrita porque es importante","<strong>"),B("br","Un salto de línea dentro de un párrafo","<br>","No se cierra."),B("table","Una tabla","<table>","<table> → <tr> (fila) → <th> o <td> (celda)."),B("tr","Una fila de una tabla","<tr>"),B("th","Una celda de cabecera de una tabla (en negrita y centrada)","<th>"),B("td","Una celda normal de una tabla","<td>"),B("colspan","Que una celda ocupe dos columnas",'colspan="2"',"En el <td> o <th>. Para filas: rowspan."),B("form","Un formulario","<form>"),B("label",'El texto de un campo, unido al campo con id="correo"','<label for="correo">',"for del label = id del input."),{...B("email","Un campo para escribir un correo",'<input type="email">',"Con id (para el label) y name (para enviarlo)."),test:Ta("input",'type="email"')},B("textarea","Un campo para escribir un mensaje largo","<textarea>"),B("button","El botón que envía el formulario",'<button type="submit">',"El texto del botón va entre <button> y </button>.",["<button>"]),Y("selector-class",'En el CSS, elegir los elementos con class="tarjeta"',".tarjeta","Clase con punto; id con almohadilla (#contacto)."),Y("selector-id",'En el CSS, elegir el elemento con id="contacto"',"#contacto"),Y("selector-desc","En el CSS, elegir los enlaces que están dentro del nav","nav a","Un espacio entre los dos: «los a que están dentro de nav»."),Y("color","El color de las letras","color","color: white; (o el código que den: #3e2723)."),Y("bg","El color de fondo","background-color","background-color: #8b4513;"),{...Y("font-family","Una letra sin remates","font-family: sans-serif;"),test:e=>/^font-family:.*sans-serif$/.test(e)},Y("font-size","El tamaño de la letra","font-size","font-size: 20px;"),Y("bold","Letra en negrita desde el CSS","font-weight: bold;"),Y("center-text","Centrar un texto","text-align: center;"),Y("no-underline","Quitar el subrayado de los enlaces","text-decoration: none;"),Y("padding","El espacio de dentro de una caja, entre el borde y el contenido","padding","padding: 16px; (fuera del borde es margin)."),Y("margin","El espacio de fuera de una caja, para separarla de las otras","margin"),Y("center-box","Centrar una caja con un ancho máximo","margin: 0 auto;","Con max-width: 1000px; por ejemplo."),{...Y("border","Un borde gris de 1 píxel","border: 1px solid gray;","Grosor, estilo y color."),test:e=>/^border:1px solid (gray|grey|lightgray|lightgrey|darkgray|darkgrey|#[0-9a-f]{3,6})$/.test(e)},Y("radius","Esquinas redondeadas","border-radius","border-radius: 8px;"),Y("max-width-img","Que una imagen no se salga de su caja","max-width: 100%;"),Y("list-none","Quitar los puntos de una lista","list-style: none;",void 0,["list-style-type: none;"]),Y("flex","Poner los hijos de una caja en fila","display: flex;","Lo primero del menú y de las tarjetas."),Y("column","Con flexbox, poner los hijos uno debajo de otro","flex-direction: column;"),Y("gap","Con flexbox, separar los hijos 16px","gap: 16px;"),Y("justify-center","Con flexbox, centrar los hijos en la fila (horizontal)","justify-content: center;"),Y("space-between","Con flexbox, uno a cada extremo (logo a la izquierda y menú a la derecha)","justify-content: space-between;"),Y("align-center","Con flexbox, centrar los hijos en vertical","align-items: center;"),Y("wrap","Con flexbox, que los hijos bajen a otra fila si no caben","flex-wrap: wrap;"),Y("flex-1","Con flexbox, que un hijo ocupe el sitio que sobra (o que todos midan igual)","flex: 1;"),Y("min-height","Que el body ocupe al menos toda la pantalla de alto (para el pie abajo)","min-height: 100vh;"),Y("media","Los estilos solo para pantallas de 600px de ancho o menos","@media (max-width: 600px)","Al final del CSS. Dentro van reglas normales, con sus llaves.",["@media screen and (max-width: 600px)"]),Y("grid","Una rejilla de 3 columnas iguales","grid-template-columns: repeat(3, 1fr);","Con display: grid; en el contenedor.",["grid-template-columns: 1fr 1fr 1fr;"])];function xt(e){return e.trim().toLowerCase().replace(/'/g,'"').replace(/\s+/g," ").replace(/\s*([:;,=(){}])\s*/g,"$1").replace(/\s*\/?>$/,">").replace(/;$/,"")}function Ts(e,a){const n=xt(a);return n?e.test?.(n)?!0:[e.a,...e.also??[]].some(t=>{const o=xt(t);if(n===o)return!0;const l=/^<([a-z0-9!]+)>$/.exec(o)?.[1];return l&&(n===l||n===`<${l}></${l}>`)?!0:/^[a-z-]+$/.test(o)&&n===`${o}:`}):!1}const Aa={html:"",css:""},As=["index.html","productos.html","contacto.html"],Le=H("La tienda",`    <header>
      <h1>La tienda</h1>
    </header>
    <nav>
      <ul>
        <li><a href="index.html">Inicio</a></li>
        <li><a href="productos.html">Productos</a></li>
        <li><a href="contacto.html">Contacto</a></li>
      </ul>
    </nav>
    <main>
      <h2>Bienvenidos</h2>
      <p>Todo lo que buscas, cerca de casa.</p>
    </main>
    <footer>
      <p>Licencia Creative Commons BY-SA 4.0</p>
    </footer>`),Ln=`nav ul {
  display: flex;
  justify-content: center;
  gap: 24px;
  margin: 0;
  padding: 12px;
  list-style: none;
}
`,vt=`body {
  margin: 0;
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}

main {
  flex: 1;
}
`,qt=`${Ln}
@media (max-width: 600px) {
  nav ul {
    flex-direction: column;
    align-items: center;
  }
}
`,wt=H("Productos",`    <main>
      <div class="tarjetas">
        <article class="tarjeta">
          <img src="img/tarta.svg" alt="Tarta de queso">
          <h3>Tarta de queso</h3>
          <p>18 €</p>
        </article>
        <article class="tarjeta">
          <img src="img/galletas.svg" alt="Galletas">
          <h3>Galletas</h3>
          <p>6 €</p>
        </article>
        <article class="tarjeta">
          <img src="img/cruasan.svg" alt="Cruasanes">
          <h3>Cruasanes</h3>
          <p>1,20 €</p>
        </article>
      </div>
    </main>`),Ps=`.tarjetas {
  display: flex;
  gap: 16px;
}

.tarjeta {
  flex: 1;
}

.tarjeta img {
  max-width: 100%;
}

@media (max-width: 600px) {
  .tarjetas {
    flex-direction: column;
  }
}
`,Hs=e=>e.all("nav ul > li > a").map(a=>(a.getAttribute("href")??"").trim()),jt=e=>As.every(a=>Hs(e).includes(a)),Ds=e=>!/<style[\s>]|\sstyle\s*=/i.test(e.source()),Ga=[{kind:"code",id:"esqueleto",title:"El esqueleto",exam:{minutes:3},tabs:["html"],brief:p("Escribe de memoria el esqueleto completo de una página que se llame «Mi web» en la pestaña, en español, preparada para el móvil y enlazada con `estilos.css`. El `<body>` puede quedar vacío."),start:Aa,solution:{html:H("Mi web","    <h1>Mi web</h1>"),css:""},checks:[{label:"Empieza por `<!DOCTYPE html>`",test:e=>/^\s*<!doctype html\s*>/i.test(e.source())},{label:'`<html lang="es">`',test:e=>e.attr("html","lang").toLowerCase().startsWith("es")},{label:'`<meta charset="UTF-8">` en el head',test:e=>ge(e,"charset")},{label:"El meta viewport",test:e=>ge(e,'name="viewport"',"width=device-width")},{label:"El título «Mi web»",test:e=>e.text("title")==="Mi web"},{label:"El `<link>` a estilos.css",test:e=>e.linked},{label:"Head y body, cada uno en su sitio y sin errores",test:e=>/<head[\s>][\s\S]*<\/head>\s*<body[\s>][\s\S]*<\/body>\s*<\/html>/i.test(e.source())&&e.htmlErrors()===0}],why:"El esqueleto se escribe siempre igual: DOCTYPE, html con lang, y en el head charset, viewport, title y link."},{kind:"code",id:"bloques",title:"Los cuatro bloques y el menú",exam:{minutes:5},tabs:["html"],brief:p("Escribe de memoria una página «La tienda» (con su esqueleto) con:","- una cabecera con el título principal «La tienda»;","- el menú con una lista de enlaces a `index.html` (Inicio), `productos.html` (Productos) y `contacto.html` (Contacto);","- el contenido principal con un título de apartado y un párrafo;","- un pie con «Licencia Creative Commons BY-SA 4.0»."),start:Aa,solution:{html:Le,css:""},checks:[{label:"El esqueleto completo",test:e=>je(e)&&e.linked},{label:"Cabecera con el título principal «La tienda»",test:e=>e.loose("header h1")==="la tienda"},{label:"Menú: `nav` → `ul` → `li` → `a`",test:e=>e.count("nav ul > li > a")>=3},{label:"El menú enlaza las tres páginas",test:jt},{label:"Contenido en `<main>` con un título y un párrafo",test:e=>e.has("main h2")&&e.has("main p")},{label:"Pie con la licencia Creative Commons",test:e=>e.loose("footer").includes("creative commons")},{label:"Los bloques en orden: header, nav, main, footer",test:e=>e.kids("body").filter(a=>["header","nav","main","footer"].includes(a)).join(",")==="header,nav,main,footer"},{label:"Sin errores en el HTML",test:e=>e.htmlErrors()===0}],why:"Así empiezan todas las páginas del examen. Escríbelo una vez y cópialo en las demás páginas: la cabecera, el menú y el pie tienen que ser iguales."},{kind:"code",id:"menu-flex",title:"El menú con flexbox",exam:{minutes:4},tabs:["css"],brief:p("El HTML ya está hecho. En `estilos.css`, pon el menú en horizontal y centrado, sin puntos, con los enlaces separados 24px y la lista sin el margen que trae."),start:{html:Le,css:""},solution:{html:Le,css:Ln},checks:[{label:"Los enlaces del menú en una fila",test:async e=>qe(await e.at(Q),"nav li")},{label:"Con flexbox",test:async e=>{const a=await e.at(Q);return V(a,"nav ul")||V(a,"nav")}},{label:"Sin puntos",test:e=>e.all("nav li").every(a=>e.style(a,"list-style-type")==="none")},{label:"Centrados",test:async e=>{const a=await e.at(Q),n=a.q("nav ul").getBoundingClientRect(),t=a.all("nav li").map(o=>o.getBoundingClientRect());return t.length>0&&Math.abs(t[0].left-n.left-(n.right-t[t.length-1].right))<30}},{label:"Separados 24px (gap)",test:e=>e.px("nav ul","column-gap")===24||e.px("nav","column-gap")===24},{label:"La lista sin margen",test:e=>e.px("nav ul","margin-top")===0}],why:"nav ul { display: flex; list-style: none; gap; justify-content } es el menú de todas las webs."},{kind:"code",id:"pagina-flex",title:"La página con flexbox",exam:{minutes:4},tabs:["css"],brief:p("El HTML ya está hecho. Organiza la página con flexbox: los bloques uno debajo de otro, el body sin margen y al menos tan alto como la pantalla, y el `main` estirado para que el pie quede abajo del todo."),start:{html:Le,css:""},solution:{html:Le,css:vt},checks:[{label:"El body con `display: flex`",test:e=>V(e,"body")},{label:"Los bloques en columna",test:e=>e.style("body","flex-direction")==="column"},{label:"El body sin margen",test:e=>e.px("body","margin-top")===0&&e.px("body","margin-left")===0},{label:"Al menos tan alto como la pantalla",test:e=>/100vh|100dvh|100svh/.test(e.files.css)},{label:"El pie abajo del todo",test:async e=>{const a=await e.at(Q),n=a.q("footer").getBoundingClientRect();return Math.abs(n.bottom-a.doc.documentElement.clientHeight)<4}}],why:"body { display: flex; flex-direction: column; min-height: 100vh; } y main { flex: 1; } cumplen «flexbox para organizar la página»."},{kind:"code",id:"media",title:"El menú en el móvil (@media)",exam:{minutes:4},tabs:["css"],brief:p("El menú ya está en fila. Añade lo que haga falta para que, en pantallas de 600px o menos, los enlaces queden uno debajo de otro y centrados."),start:{html:Le,css:Ln},solution:{html:Le,css:qt},checks:[{label:"En el ordenador, el menú sigue en fila",test:async e=>qe(await e.at(Q),"nav li")},{label:"En el móvil, uno debajo de otro",test:async e=>{const n=(await e.at(ae)).all("nav li").map(t=>t.getBoundingClientRect().top);return n.length>=3&&n.every((t,o)=>!o||t>n[o-1]+4)}},{label:"En el móvil, centrados",test:async e=>{const a=await e.at(ae),n=a.q("nav ul").getBoundingClientRect();return a.all("nav li").every(t=>{const o=t.getBoundingClientRect();return Math.abs(o.left-n.left-(n.right-o.right))<12})}},{label:"Con `@media (max-width: 600px)`",test:e=>/@media[^{]*max-width\s*:\s*600px/i.test(e.files.css)}],why:"@media (max-width: 600px) { nav ul { flex-direction: column; align-items: center; } }, al final del CSS."},{kind:"code",id:"tarjetas",title:"Tres tarjetas en fila",exam:{minutes:6},tabs:["css"],brief:p("El HTML ya está hecho. Pon las tres tarjetas en fila, del mismo ancho y separadas 16px, con las fotos sin salirse; en el móvil (600px o menos), una debajo de otra."),start:{html:wt,css:""},solution:{html:wt,css:Ps},checks:[{label:"En el ordenador, en fila",test:async e=>qe(await e.at(Q),".tarjeta")},{label:"Del mismo ancho",test:async e=>{const n=(await e.at(Q)).all(".tarjeta").map(t=>Math.round(t.getBoundingClientRect().width));return n.length===3&&Math.max(...n)-Math.min(...n)<3}},{label:"Separadas 16px",test:e=>e.px(".tarjetas","column-gap")===16},{label:"Las fotos sin salirse de la tarjeta",test:async e=>(await e.at(Q)).all(".tarjeta").every(n=>n.querySelector("img").getBoundingClientRect().width<=n.getBoundingClientRect().width+1)},{label:"En el móvil, una debajo de otra",test:async e=>{const n=(await e.at(ae)).all(".tarjeta").map(t=>t.getBoundingClientRect().top);return n.every((t,o)=>!o||t>n[o-1]+20)}}],why:".tarjetas { display: flex; gap } y .tarjeta { flex: 1; }; en la @media, flex-direction: column."},{kind:"code",id:"formulario",title:"El formulario de contacto",exam:{minutes:5},tabs:["html"],brief:p("Escribe de memoria una página «Contacto» (con su esqueleto) con un formulario: nombre (texto), correo (de correo electrónico), mensaje (texto largo) y un botón «Enviar». Cada campo con su texto unido al campo y con nombre para enviarlo."),start:Aa,solution:{html:H("Contacto",`    <form>
      <label for="nombre">Nombre</label>
      <input type="text" id="nombre" name="nombre">
      <label for="correo">Correo</label>
      <input type="email" id="correo" name="correo">
      <label for="mensaje">Mensaje</label>
      <textarea id="mensaje" name="mensaje"></textarea>
      <button type="submit">Enviar</button>
    </form>`),css:""},checks:[{label:"El esqueleto completo",test:e=>je(e)&&e.linked},{label:"Nombre: texto, con su label y name",test:e=>G(O(e,"Nombre"))==="text"&&ne(O(e,"Nombre"))},{label:'Correo: `type="email"`, con su label y name',test:e=>G(O(e,"Correo"))==="email"&&ne(O(e,"Correo"))},{label:"Mensaje: `<textarea>`, con su label y name",test:e=>G(O(e,"Mensaje"))==="textarea"&&ne(O(e,"Mensaje"))},{label:"El botón «Enviar»",test:e=>De(e,"Enviar")},{label:"Sin errores en el HTML",test:e=>e.htmlErrors()===0}],why:'label for = id del campo, y cada campo con name. El botón: <button type="submit">.'},{kind:"code",id:"pagina-completa",title:"Una página entera, como en el examen",exam:{minutes:15},brief:p("De memoria, una página «La tienda» como las del examen:","- el esqueleto, enlazado con `estilos.css`;","- cabecera con el título, menú con enlaces a `index.html`, `productos.html` y `contacto.html`, contenido con un título y un párrafo, y pie con la licencia Creative Commons;","- en el CSS: la página con flexbox en columna y el pie abajo, el menú en fila con flexbox y sin puntos, y en pantallas de 600px o menos el menú en columna;","- todos los estilos en `estilos.css`, nada de `style`."),start:Aa,solution:{html:Le,css:`${vt}
${qt}`},checks:[{label:"Esqueleto completo y enlazado con estilos.css",test:e=>je(e)&&e.linked},{label:"Los cuatro bloques en orden",test:e=>e.kids("body").filter(a=>["header","nav","main","footer"].includes(a)).join(",")==="header,nav,main,footer"},{label:"El menú enlaza las tres páginas",test:jt},{label:"La licencia Creative Commons en el pie",test:e=>e.loose("footer").includes("creative commons")},{label:"La página con flexbox en columna",test:e=>V(e,"body")&&e.style("body","flex-direction")==="column"},{label:"El menú en fila, con flexbox y sin puntos",test:async e=>{const a=await e.at(Q);return qe(a,"nav li")&&(V(a,"nav ul")||V(a,"nav"))&&a.all("nav li").every(n=>a.style(n,"list-style-type")==="none")}},{label:"En el móvil, el menú en columna",test:async e=>{const n=(await e.at(ae)).all("nav li").map(t=>t.getBoundingClientRect().top);return n.length>=3&&n.every((t,o)=>!o||t>n[o-1]+4)}},{label:'Sin `<style>` ni `style=""`',test:Ds},{label:"Sin errores en el HTML ni en el CSS",test:e=>e.htmlErrors()===0&&e.cssErrors()===0}],why:"Es la base de cada página del examen: con esto ya cumples la mitad de la lista de instrucciones."}],Rs=e=>Ga.find(a=>a.id===e),oo={html:"HTML",css:"CSS",todo:"Todo"},Us=12,lo=e=>`memoria/${e}`,Ns=e=>(Math.round(e.hits/e.total*100)/10).toLocaleString("es-ES"),xa=e=>to.filter(a=>e==="todo"||a.topic===e);function so(e){const a=Dt(),t=xa(e).filter(l=>We(l.id)).filter(l=>We(l.id).due<=a).sort((l,s)=>We(l.id).box-We(s.id).box),o=xa(e).filter(l=>!We(l.id));return[...Re(t),...e==="todo"?Re(o):o]}const ro=e=>xa(e).filter(a=>(We(a.id)?.box??0)>=3).length,St=()=>({done:ro("todo"),total:to.length});function Is(e,a,n){return a==="tarjetas"?io(e,["html","css","todo"].includes(n)?n:"todo"):a?Os(e,a):(e.innerHTML=`
    <div class="sheet">
      <header class="topbar">
        <a class="btn btn--small" href="#/mapa">Mapa</a>
        <h1 class="topbar__title">De memoria</h1>
      </header>
      <p class="lead">En el examen no hay chuleta. Aquí entrenas a escribir las etiquetas y las propiedades sin mirar: primero sueltas, con tarjetas, y luego las piezas de la web, con reloj.</p>
      <section class="panel">
        <h2 class="panel__title">Tarjetas</h2>
        <p>Lees qué se quiere hacer y escribes la etiqueta o la propiedad. Las que fallas vuelven ese mismo día; las que aciertas, cada vez más tarde.</p>
        <ul class="memory-topics">
          ${["html","css","todo"].map(t=>{const o=so(t).length;return`<li><a class="btn${t==="todo"?" btn--main":""}" href="#/memoria/tarjetas/${t}">${oo[t]}</a>
                <span class="hint">${ro(t)} de ${xa(t).length} sabidas · ${o?`${o} para hoy`:"nada para hoy"}</span></li>`}).join("")}
        </ul>
      </section>
      <section aria-labelledby="drills-t">
        <h2 class="section-title" id="drills-t">Retos con reloj</h2>
        <p class="hint">Escribe cada pieza de cero, sin avisos de fallos y sin ver lo que se corrige hasta entregar. Repítelos hasta hacerlos en menos tiempo del que dan.</p>
        <ol class="cards">
          ${Ga.map(t=>{const o=Wa(lo(t.id)),l=o?.mark?`${Ns(o.mark)} · ${o.mark.minutes} min`:o?"Empezado":`${t.exam.minutes} min`,s=o?.mark&&o.mark.hits===o.mark.total;return`<li><a class="card card--link card--train" href="#/memoria/${t.id}">
              <span class="card__n" aria-hidden="true">⏱</span>
              <span class="card__body"><span class="card__title">${R(t.title)}</span><span class="card__topic">${t.tabs?.length===1?t.tabs[0]==="css"?"Solo CSS":"Solo HTML":"HTML y CSS"} · ${t.exam.minutes} minutos</span></span>
              <span class="card__state${s?" card__state--done":""}">${l}</span>
            </a></li>`}).join("")}
        </ol>
      </section>
    </div>`,()=>{})}function io(e,a){let n=so(a);const t=!n.length;t&&(n=Re(xa(a)));const o=n.slice(0,Us).map(g=>({card:g,again:!1})),l=o.length;let s=0,r=0;const c=[];e.innerHTML=`
    <div class="sheet memory">
      <header class="topbar">
        <a class="btn btn--small" href="#/memoria">De memoria</a>
        <h1 class="topbar__title">Tarjetas · ${oo[a]}</h1>
      </header>
      ${t?'<p class="hint">Hoy no te toca ninguna: repasas unas cuantas al azar (cuentan igual).</p>':""}
      <div class="lesson__bar" aria-hidden="true"><span></span></div>
      <p class="challenge__meta" data-meta></p>
      <section class="panel memory__card" data-card></section>
    </div>`;const i=e.querySelector("[data-card]");function d(){if(s>=o.length)return y();const{card:g}=o[s];e.querySelector(".lesson__bar span").style.width=`${s/o.length*100}%`,e.querySelector("[data-meta]").textContent=`${Math.min(s+1,o.length)} de ${o.length} · ${g.topic==="html"?"HTML":"CSS"}`,i.innerHTML=`
      <p class="memory__q">${R(g.q)}</p>
      <form class="memory__form" data-form>
        <label class="sr-only" for="answer">Tu respuesta</label>
        <input class="memory__input" id="answer" autocomplete="off" autocapitalize="off" autocorrect="off" spellcheck="false" placeholder="Escríbelo aquí">
        <button class="btn btn--main" type="submit">Comprobar</button>
      </form>
      <button class="btn btn--small memory__skip" type="button" data-skip>No me acuerdo</button>
      <div class="memory__result" aria-live="polite"></div>`;const v=i.querySelector("#answer");v.focus(),i.querySelector("[data-form]").addEventListener("submit",k=>{k.preventDefault(),v.value.trim()&&m(g,Ts(g,v.value),v.value)}),i.querySelector("[data-skip]").addEventListener("click",()=>m(g,!1,""))}function m(g,v,k){const _=o[s];_.again||(Vn(g.id,v),v?r++:c.push(g)),!v&&!_.again&&o.push({card:g,again:!0}),i.querySelector("#answer").disabled=!0,i.querySelector("[data-form] button").disabled=!0,i.querySelector("[data-skip]").hidden=!0;const M=i.querySelector(".memory__result");M.innerHTML=`
      <p class="feedback__title feedback__title--${v?"ok":"bad"}">${v?"¡Bien!":k?"No es eso. Era:":"Era:"}</p>
      <pre class="memory__answer"><code>${R(g.a)}</code></pre>
      ${g.why?`<p class="hint">${W(g.why)}</p>`:""}
      ${!v&&k&&!_.again?'<p class="hint">Si lo has escrito bien de otra forma: <button class="btn btn--small" type="button" data-mine>Lo tenía bien</button></p>':""}
      ${v?"":'<p class="hint">Escríbela una vez a mano en un papel: vuelve al final de la ronda.</p>'}
      <div class="actions"><button class="btn btn--main" type="button" data-next>Siguiente</button></div>`;const T=M.querySelector("[data-next]");T.focus(),T.addEventListener("click",()=>{s++,d()}),M.querySelector("[data-mine]")?.addEventListener("click",()=>{Vn(g.id,!0),r++,c.splice(c.indexOf(g),1);const q=o.findIndex((E,A)=>A>s&&E.card===g);q>=0&&o.splice(q,1),s++,d()})}function y(){e.querySelector(".lesson__bar span").style.width="100%",e.querySelector("[data-meta]").textContent="",i.innerHTML=`
      <p class="review__big">${r} de ${l} a la primera.</p>
      ${c.length?`<p>Para repasar (vuelven hoy mismo):</p><ul class="memory__missed">${c.map(g=>`<li>${R(g.q)}: <code>${R(g.a)}</code></li>`).join("")}</ul>`:"<p>¡Todas! Vuelven dentro de unos días para que no se olviden.</p>"}
      <div class="actions">
        <a class="btn btn--main" href="#/memoria">Volver</a>
        <button class="btn" type="button" data-again>Otra ronda</button>
      </div>`,i.querySelector("[data-again]").addEventListener("click",()=>{io(e,a)})}return o.length?(d(),()=>{}):(i.innerHTML="<p>No hay tarjetas.</p>",()=>{})}function Os(e,a){const n=Rs(a);if(!n)return location.hash="#/memoria",()=>{};const t=Ga.indexOf(n),o=Ga[t+1];return e.innerHTML=`
    <div class="sheet challenge--code">
      <header class="topbar">
        <a class="btn btn--small" href="#/memoria">De memoria</a>
        <h1 class="topbar__title">${R(n.title)}</h1>
      </header>
      <div class="challenge__body"></div>
    </div>`,Dn(e.querySelector(".challenge__body"),n,{next:o?{label:"Siguiente reto",href:`#/memoria/${o.id}`}:{label:"Volver",href:"#/memoria"},draftKey:lo(n.id)})}function In(e,a,n){return`
    <header class="topbar">
      <a class="btn btn--small" href="${e}">${a}</a>
      <h1 class="topbar__title">${R(n)}</h1>
    </header>`}const Bs=e=>e?'<span class="card__state card__state--done">Hecho</span>':"";function Fs(e){const a=[...e.lessons.map(n=>Pn(e.n,n.id)),...e.challenges.map(n=>Hn(e.n,n.id))];return{done:a.filter(ze).length,total:a.length}}function Ys(e,a){const n=Ka[a],t=no.find(s=>s.n===a);if(!n||!t)return location.hash="#/mapa",()=>{};const o=`#/mundo/${a}`,l=(s,r,c,i,d)=>`
    <li><a class="card card--link" href="${s}">
      <span class="card__n" aria-hidden="true">${r+1}</span>
      <span class="card__body">
        <span class="card__title">${R(c)}</span>
        <span class="card__topic">${i}</span>
      </span>
      ${Bs(d)}
    </a></li>`;return e.innerHTML=`
    <div class="sheet">
      ${In("#/mapa","Mapa",`${a}. ${t.title}`)}
      <p class="lead">${R(n.intro)}</p>
      <section aria-labelledby="w-lessons">
        <h2 class="section-title" id="w-lessons">Lecciones</h2>
        <ol class="cards">${n.lessons.map((s,r)=>l(`${o}/leccion/${s.id}`,r,s.title,R(s.summary),ze(Pn(a,s.id)))).join("")}</ol>
      </section>
      <section aria-labelledby="w-challenges">
        <h2 class="section-title" id="w-challenges">Retos</h2>
        <ol class="cards">${n.challenges.map((s,r)=>l(`${o}/reto/${s.id}`,r,s.title,Ut(s),ze(Hn(a,s.id)))).join("")}</ol>
      </section>
    </div>`,()=>{}}function Gs(e,a,n){const t=Ka[a],o=t?.lessons.findIndex(T=>T.id===n)??-1;if(!t||o<0)return location.hash=`#/mundo/${a}`,()=>{};const l=t.lessons[o],s=t.lessons[o+1],r=s?`#/mundo/${a}/leccion/${s.id}`:`#/mundo/${a}/reto/${t.challenges[0].id}`,c=l.steps.length+1;let i=0,d=()=>{};e.innerHTML=`
    <div class="sheet lesson">
      ${In(`#/mundo/${a}`,"Mundo",l.title)}
      <div class="lesson__bar" aria-hidden="true"><span></span></div>
      <p class="lesson__count" aria-live="polite"></p>
      <div class="lesson__body"></div>
      <div class="lesson__nav">
        <button class="btn" type="button" data-go="prev">Anterior</button>
        <button class="btn btn--main" type="button" data-go="next">Siguiente</button>
      </div>
    </div>`;const m=e.querySelector(".lesson__body"),y=e.querySelector('[data-go="prev"]'),g=e.querySelector('[data-go="next"]'),v=e.querySelector(".lesson__count");function k(T){const q=m.querySelector("[data-check]"),E="pairs"in T.check?{kind:"match",...T.check}:{kind:"quiz",...T.check};d=Dn(q,E,{next:{label:"Seguir",onClick:()=>M(1)},onAnswer:A=>{A||i===0||queueMicrotask(()=>{const C=document.createElement("button");C.type="button",C.className="btn",C.textContent="Volver a leerlo",C.addEventListener("click",()=>M(-1)),q.querySelector(".feedback .actions")?.prepend(C)})}})}function _(){d(),d=()=>{};const T=i===c-1;if(e.querySelector(".lesson__bar span").style.width=`${(i+1)/c*100}%`,y.disabled=i===0,g.hidden=!1,g.textContent=T?s?"Siguiente lección":"Ir a los retos":"Siguiente",T){v.textContent=`Resumen · ${i+1} de ${c}`,m.innerHTML=`
        <section class="panel recap" aria-labelledby="l-sum">
          <h2 class="panel__title" id="l-sum">Lo que tienes que saber</h2>
          <ul>${l.recap.map(E=>`<li>${W(E)}</li>`).join("")}</ul>
        </section>`;return}const q=l.steps[i];if(v.textContent=`${q.check?"Comprueba":"Cuadro"} ${i+1} de ${c}`,m.innerHTML=`
      ${q.text?`<div class="lesson__text">${ke(q.text)}</div>`:""}
      ${q.code?ea(q.code):""}
      ${q.try?`<section class="try" aria-label="Pruébalo"><p class="try__task"><span class="try__label">Pruébalo</span> ${W(q.try.task)}</p><div data-try></div></section>`:""}
      ${q.exam?`<p class="exam-tip"><span class="exam-tip__label">En el examen</span> ${W(q.exam)}</p>`:""}
      ${q.check?'<section class="panel lesson__check" aria-label="Comprueba lo que has leído"><p class="panel__title">Comprueba lo que has leído</p><div data-check></div></section>':""}`,q.try){const E=ja(m.querySelector("[data-try]"),{files:{html:q.try.html,css:q.try.css},tabs:q.try.tabs,compact:!0});d=()=>E.destroy()}q.check&&(k(q),g.hidden=!0)}function M(T){if(T>0&&i===c-1){An(Pn(a,l.id)),location.hash=r;return}i=Math.min(Math.max(i+T,0),c-1),_(),v.scrollIntoView({block:"nearest"})}return e.querySelector(".lesson__nav").addEventListener("click",T=>{const q=T.target.closest("[data-go]")?.dataset.go;q==="prev"&&i>0?M(-1):q==="next"&&M(1)}),_(),()=>d()}function Qs(e,a,n){const t=Ka[a],o=t?.challenges.findIndex(c=>c.id===n)??-1;if(!t||o<0)return location.hash=`#/mundo/${a}`,()=>{};const l=t.challenges[o],s=t.challenges[o+1],r=Hn(a,l.id);return e.innerHTML=`
    <div class="sheet challenge${l.kind==="code"?" challenge--code":""}">
      ${In(`#/mundo/${a}`,"Mundo",l.title)}
      <p class="challenge__meta">${Ut(l)} · Reto ${o+1} de ${t.challenges.length}${ze(r)?" · Ya resuelto":""}</p>
      <div class="challenge__body"></div>
    </div>`,Dn(e.querySelector(".challenge__body"),l,{onAnswer:c=>c&&An(r),next:s?{label:"Siguiente reto",href:`#/mundo/${a}/reto/${s.id}`}:{label:"Volver al mundo",href:`#/mundo/${a}`},draftKey:r})}function Ws(){return[{href:"#/puerto",icon:"⚓",title:"El puerto",topic:"Juego de flexbox y grid: lleva cada barco a su amarre escribiendo CSS",p:qo()},{href:"#/maquetas",icon:"▣",title:"Maquetas",topic:"De la imagen a la web: dibuja sus cajas, cálcala y compárala con la imagen",p:hl()},{href:"#/ojo",icon:"◉",title:"Retos de ojo",topic:"Mira y adivina el CSS: tamaños, huecos, esquinas, filas y rejillas",p:jn()?{done:jn(),total:10}:null}].map(a=>`
    <li><a class="card card--link card--train" href="${a.href}">
      <span class="card__n" aria-hidden="true">${a.icon}</span>
      <span class="card__body">
        <span class="card__title">${a.title}</span>
        <span class="card__topic">${a.topic}</span>
      </span>
      ${a.p?`<span class="card__state${a.p.done===a.p.total?" card__state--done":""}">${a.p.done} de ${a.p.total}</span>`:""}
    </a></li>`).join("")}function Vs(e){const a=Ka[e.n],n=a&&Fs(a),t=n?`<span class="card__state${n.done===n.total?" card__state--done":""}">${n.done} de ${n.total}</span>`:'<span class="card__state card__state--soon">En obras</span>',o=a?"a":"span";return`
    <li><${o} class="card card--${e.part}${a?" card--link":""}"${a?` href="#/mundo/${e.n}"`:""}>
      <span class="card__n" aria-hidden="true">${e.n}</span>
      <span class="card__body">
        <span class="card__unit">${zs[e.part]}</span>
        <span class="card__title">${e.title}</span>
        <span class="card__topic">${e.topic}</span>
      </span>
      ${t}
    </${o}></li>`}function Ks(e){const a=n=>no.filter(t=>t.part===n).map(Vs).join("");return e.innerHTML=`
    <div class="sheet map">
      <header class="topbar">
        <a class="btn btn--small" href="#/">Portada</a>
        <h1 class="topbar__title">El mapa</h1>
      </header>
      <a class="card card--link card--tool" href="#/taller">
        <span class="card__n" aria-hidden="true">&lt;/&gt;</span>
        <span class="card__body">
          <span class="card__title">Taller libre</span>
          <span class="card__topic">El editor sin retos: prueba lo que quieras y descarga tus dos archivos</span>
        </span>
      </a>
      <a class="card card--link card--tool card--exam" href="#/examen">
        <span class="card__n" aria-hidden="true">✎</span>
        <span class="card__body">
          <span class="card__title">Modo examen</span>
          <span class="card__topic">Sin chuleta ni avisos: una web de 3 páginas con la lista de instrucciones del reto, reloj y nota</span>
        </span>
      </a>
      <a class="card card--link card--tool card--exam" href="#/memoria">
        <span class="card__n" aria-hidden="true">⏱</span>
        <span class="card__body">
          <span class="card__title">De memoria</span>
          <span class="card__topic">Sin chuleta: tarjetas para escribir etiquetas y propiedades, y retos con reloj</span>
        </span>
        <span class="card__state">${St().done} de ${St().total}</span>
      </a>
      <section aria-labelledby="map-html">
        <h2 class="section-title" id="map-html">HTML: qué hay en la página</h2>
        <ol class="cards">${a("html")}</ol>
      </section>
      <section aria-labelledby="map-css">
        <h2 class="section-title" id="map-css">CSS: cómo se ve</h2>
        <ol class="cards">${a("css")}</ol>
      </section>
      <section aria-labelledby="map-exam">
        <h2 class="section-title" id="map-exam">El examen</h2>
        <ol class="cards">${a("exam")}</ol>
      </section>
      <section aria-labelledby="map-train">
        <h2 class="section-title" id="map-train">Entrenamiento para el examen de la imagen</h2>
        <ol class="cards">${Ws()}</ol>
      </section>
    </div>`,()=>{}}const Zs=`<header>
  <h1>Floristería Margarita</h1>
</header>
<p>Ramos por encargo en el día.</p>`,Js=`header {
  background: #b8336a;
  color: white;
}`;function Et(e){return e.innerHTML=`
    <div class="sheet title">
      <div class="title__side">
        <p class="stamp">Lenguajes de marcas · HTML y CSS</p>
        <h1 class="title__name">Web<span>Quest</span></h1>
        <p class="title__lead">Aprende a hacer páginas web desde cero hasta el examen: escribes el HTML y el CSS, ves la página al momento y cada reto se corrige solo.</p>
        <div class="actions">
          <a class="btn btn--main" href="#/mapa">Empezar</a>
          <a class="btn" href="#/taller">Taller libre</a>
        </div>
      </div>
      <div class="title__demo" aria-hidden="true">
        ${ea({html:Zs,css:Js})}
        <div class="browser browser--demo">
          <div class="browser__bar"><span class="browser__dots"><i></i><i></i><i></i></span><span class="browser__url">index.html</span></div>
          <div class="demo-page">
            <div class="demo-page__head">Floristería Margarita</div>
            <p>Ramos por encargo en el día.</p>
          </div>
        </div>
      </div>
    </div>`,()=>{}}const fn={html:`<!DOCTYPE html>
<html lang="es">
  <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Mi web</title>
    <link rel="stylesheet" href="estilos.css">
  </head>
  <body>
    <h1>Mi web</h1>
  </body>
</html>
`,css:`body {
  font-family: sans-serif;
}
`};function Ct(e,a,n){const t=URL.createObjectURL(new Blob([a],{type:`${n};charset=utf-8`})),o=document.createElement("a");o.href=t,o.download=e,document.body.append(o),o.click(),o.remove(),setTimeout(()=>URL.revokeObjectURL(t),1e3)}function Xs(e){e.innerHTML=`
    <div class="sheet challenge--code">
      <header class="topbar">
        <a class="btn btn--small" href="#/mapa">Mapa</a>
        <h1 class="topbar__title">Taller libre</h1>
      </header>
      <p class="lead">Escribe lo que quieras: se guarda solo en este navegador. Cuando acabes, descarga los dos archivos y ábrelos en tu ordenador como en el examen.</p>
      <div data-editor></div>
      <div class="actions">
        <button class="btn btn--main" type="button" data-down="html">Descargar ${ga}</button>
        <button class="btn" type="button" data-down="css">Descargar ${J}</button>
        <button class="btn" type="button" data-reset>Empezar de cero</button>
      </div>
    </div>`;const a=ja(e.querySelector("[data-editor]"),{files:Qa(Ja)??fn,onChange:n=>Je(Ja,n)});return e.querySelector(".actions").addEventListener("click",n=>{const t=n.target.closest("button");if(!t)return;const o=a.files();if(t.dataset.down==="html")Ct(ga,o.html,"text/html");else if(t.dataset.down==="css")Ct(J,o.css,"text/css");else if("reset"in t.dataset){if(!t.dataset.sure){t.dataset.sure="1",t.textContent="Pulsa otra vez para borrarlo";return}delete t.dataset.sure,t.textContent="Empezar de cero",a.set(fn),Je(Ja,fn)}}),()=>a.destroy()}const oe=document.getElementById("app");let pe=()=>{};async function co(){pe();const[e,a,n,t]=location.hash.replace(/^#\/?/,"").split("/");switch(e){case"mapa":pe=Ks(oe);break;case"puerto":pe=Eo(oe,decodeURIComponent(a??""));break;case"ojo":pe=Ll(oe);break;case"maquetas":pe=bl(oe);break;case"maqueta":pe=n==="cajas"?jl(oe,decodeURIComponent(a??"")):yl(oe,decodeURIComponent(a??""));break;case"examen":pe=a?as(oe,decodeURIComponent(a)):es(oe);break;case"memoria":pe=Is(oe,decodeURIComponent(a??""),decodeURIComponent(n??""));break;case"taller":pe=Xs(oe);break;case"mundo":{const o=Number(a),l=decodeURIComponent(t??"");pe=n==="leccion"?Gs(oe,o,l):n==="reto"?Qs(oe,o,l):Ys(oe,o);break}case"comprobar":pe=Et(oe);break;default:pe=Et(oe)}window.scrollTo(0,0),oe.focus({preventScroll:!0})}window.addEventListener("hashchange",co);co();"serviceWorker"in navigator&&window.addEventListener("load",()=>{navigator.serviceWorker.register("./sw.js").catch(()=>{})});
