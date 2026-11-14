/* Shift Report : interface professionnelle */
(()=>{
'use strict';
const K='sr-pro', root=document.documentElement;
let S={side:'full',density:'normal',fs:'md',motion:'on'};
try{Object.assign(S,JSON.parse(localStorage.getItem(K)||'{}'));}catch(e){}
const apply=()=>{Object.entries(S).forEach(([k,v])=>root.dataset[k]=v);try{localStorage.setItem(K,JSON.stringify(S));}catch(e){}};
apply();

/* ---------- Styles ---------- */
const font=document.createElement('link');font.rel='stylesheet';
font.href='https://fonts.googleapis.com/css2?family=IBM+Plex+Sans:wght@400;500;600;700&display=swap';
document.head.appendChild(font);
const css=document.createElement('style');
css.textContent=`
:root{--sb:#0e1a22;--sbi:#c3d0da;--sbm:#6f8394;--r:10px}
body{font-family:"IBM Plex Sans","Segoe UI",system-ui,sans-serif;font-size:14.5px}
html[data-fs=sm] body{font-size:13.5px}html[data-fs=lg] body{font-size:16px}
html[data-density=compact] th,html[data-density=compact] td{padding:3px 8px}
html[data-density=compact] .card{padding:11px;margin-bottom:10px}
html[data-density=aere] th,html[data-density=aere] td{padding:11px 12px}
html[data-density=aere] .card{padding:22px;margin-bottom:18px}
html[data-motion=off] *{animation:none!important;transition:none!important}
/* Une seule animation d'entrée (le splash) : plus de scintillement à chaque actualisation */
.card{animation:none!important}
.tiles b,table,.rate{font-variant-numeric:tabular-nums}
/* En-tête */
header{padding:8px 20px!important;gap:12px}
header .ctl{display:none}
.pro-act{display:flex;gap:8px;align-items:center}
.pro-ib{width:36px;height:36px;padding:0!important;display:grid;place-items:center}
.pro-ib svg,.side svg,.pro-k svg,#pro-cmd svg,#pro-top svg,#pro-set svg{width:17px;height:17px;stroke:currentColor;fill:none;stroke-width:1.8;stroke-linecap:round;stroke-linejoin:round;flex:none}
.pro-k{display:flex;gap:8px;align-items:center;min-width:190px;justify-content:space-between;color:var(--mute)}
.pro-k kbd{font:11px "IBM Plex Sans";border:1px solid var(--line);border-radius:5px;padding:1px 6px;background:var(--bg)}
.pro-user{display:flex;gap:9px;align-items:center;padding:3px 10px 3px 3px;border:1px solid var(--line);border-radius:999px;background:var(--card)}
.pro-av{width:30px;height:30px;border-radius:50%;background:var(--acc);color:#fff;display:grid;place-items:center;font-weight:600;font-size:12px}
.pro-user div{line-height:1.15}.pro-user small{display:block;color:var(--mute);font-size:11.5px;text-transform:capitalize}
.pro-sync{display:flex;gap:6px;align-items:center;color:var(--mute);font-size:12.5px}
.pro-sync i{width:8px;height:8px;border-radius:50%;background:var(--acc);box-shadow:0 0 0 3px color-mix(in srgb,var(--acc) 22%,transparent)}
/* Menu latéral sombre */
.side{background:var(--sb);border-color:var(--sb);padding:10px 8px;top:68px;min-height:calc(100vh - 100px)}
.side h4{color:var(--sbm);margin:16px 10px 5px;letter-spacing:.08em}
.side button{display:flex;gap:11px;align-items:center;color:var(--sbi);border-radius:7px;padding:9px 10px}
.side button:hover:not(:disabled){background:rgba(255,255,255,.07);color:#fff}
.side button.on{background:rgba(255,255,255,.1);color:#fff;border-left-color:var(--acc2)}
.side button.on svg{stroke:var(--acc2)}
.side .sbtog{justify-content:flex-end;color:var(--sbm);margin-bottom:2px}
.side .sbtog svg{transition:transform .2s}
html[data-side=mini] .shell{grid-template-columns:62px minmax(0,1fr)}
html[data-side=mini] .side .t,html[data-side=mini] .side h4{display:none}
html[data-side=mini] .side button{justify-content:center;padding:10px 0;border-left:0}
html[data-side=mini] .side .sbtog svg{transform:rotate(180deg)}
@media(max-width:900px){.side{min-height:0}.side .sbtog{display:none}html[data-side=mini] .shell{grid-template-columns:1fr}html[data-side=mini] .side .t{display:inline}.pro-k,.pro-user div,.pro-sync{display:none}}
/* Contenu */
.pgh h2{font-size:22px;font-weight:650}
.card{border-radius:var(--r);border-color:var(--line)}
th{background:color-mix(in srgb,var(--bg) 60%,var(--card))}
tbody tr:hover td,table tr:hover td{background:color-mix(in srgb,var(--acc) 6%,transparent)}
#app.busy #adm{opacity:.5;pointer-events:none;transition:opacity .15s}
/* Barre de chargement */
#pro-bar{position:fixed;inset:0 0 auto 0;height:3px;z-index:300;transform-origin:left;transform:scaleX(0);background:linear-gradient(90deg,var(--acc),var(--acc2));opacity:0;pointer-events:none}
/* Splash */
#pro-splash{position:fixed;inset:0;z-index:400;display:grid;place-items:center;background:var(--bg);transition:opacity .45s,visibility .45s}
#pro-splash.out{opacity:0;visibility:hidden}
#pro-splash .in{text-align:center;width:min(280px,80vw)}
#pro-splash .lg{width:64px;height:64px;margin:0 auto 18px;border-radius:16px;background:var(--acc);color:#fff;display:grid;place-items:center;font-weight:700;font-size:22px;position:relative}
#pro-splash .lg::after{content:"";position:absolute;inset:-7px;border-radius:21px;border:2px solid transparent;border-top-color:var(--acc2);animation:pspin 1s linear infinite}
@keyframes pspin{to{transform:rotate(360deg)}}
#pro-splash h1{font-size:19px;margin-bottom:2px}#pro-splash p{margin:0 0 16px;color:var(--mute);font-size:13px}
#pro-splash .tr{height:4px;border-radius:4px;background:var(--line);overflow:hidden}
#pro-splash .tr u{display:block;height:100%;width:40%;background:var(--acc);border-radius:4px;animation:pslide 1.1s ease-in-out infinite}
@keyframes pslide{0%{transform:translateX(-100%)}100%{transform:translateX(260%)}}
/* Paramètres */
#pro-ov{position:fixed;inset:0;z-index:250;background:rgba(10,18,24,.45);opacity:0;visibility:hidden;transition:.2s}
#pro-ov.on{opacity:1;visibility:visible}
#pro-set{position:fixed;top:0;right:0;bottom:0;width:min(360px,100vw);z-index:260;background:var(--card);border-left:1px solid var(--line);transform:translateX(100%);transition:transform .25s ease;display:flex;flex-direction:column}
#pro-set.on{transform:none}
#pro-set .hd{display:flex;justify-content:space-between;align-items:center;padding:16px 18px;border-bottom:1px solid var(--line)}
#pro-set .hd h3{margin:0;font-size:16px}
#pro-set .bd2{padding:6px 18px 18px;overflow:auto;flex:1}
#pro-set h5{margin:18px 0 8px;font-size:12px;color:var(--mute);font-weight:600}
.seg{display:flex;border:1px solid var(--line);border-radius:8px;overflow:hidden}
.seg button{flex:1;border:0;border-radius:0;padding:7px 4px;background:transparent;font-size:13px}
.seg button+button{border-left:1px solid var(--line)}
.seg button.on{background:var(--acc);color:#fff}
.sw{display:flex;gap:10px}.sw button{width:30px;height:30px;padding:0;border-radius:50%;border:2px solid var(--card);box-shadow:0 0 0 1px var(--line)}
.sw button.on{box-shadow:0 0 0 2px var(--ink)}
#pro-set .ft{padding:14px 18px;border-top:1px solid var(--line);display:flex;gap:8px;flex-wrap:wrap}
/* Palette de commandes */
#pro-cmd{position:fixed;inset:0;z-index:270;display:none;align-items:flex-start;justify-content:center;padding-top:14vh;background:rgba(10,18,24,.45)}
#pro-cmd.on{display:flex}
#pro-cmd .bx{width:min(520px,92vw);background:var(--card);border:1px solid var(--line);border-radius:12px;overflow:hidden;box-shadow:0 24px 60px -12px rgba(0,0,0,.4)}
#pro-cmd input{width:100%;border:0;border-bottom:1px solid var(--line);border-radius:0;padding:14px 16px;font-size:15px}
#pro-cmd ul{list-style:none;margin:0;padding:6px;max-height:340px;overflow:auto}
#pro-cmd li{padding:9px 12px;border-radius:7px;cursor:pointer;display:flex;gap:10px;align-items:center}
#pro-cmd li.on{background:color-mix(in srgb,var(--acc) 12%,transparent);color:var(--acc)}
#pro-cmd li{white-space:nowrap}
#pro-cmd li svg{color:var(--mute)}
#pro-cmd li.on svg{color:var(--acc)}
#pro-cmd li em{margin-left:auto;font-style:normal;color:var(--mute);font-size:12px}
/* Notifications */
#pro-toasts{position:fixed;right:16px;bottom:16px;z-index:300;display:grid;gap:8px}
.pro-t{background:var(--ink);color:var(--bg);padding:10px 14px;border-radius:9px;font-size:13.5px;max-width:340px;box-shadow:0 8px 24px -8px rgba(0,0,0,.4);border-left:4px solid var(--acc2);animation:tin .25s ease both}
.pro-t.err{border-left-color:var(--err)}
@keyframes tin{from{opacity:0;transform:translateY(8px)}to{opacity:1;transform:none}}
#pro-top{position:fixed;right:16px;bottom:72px;z-index:50;width:38px;height:38px;border-radius:50%;padding:0;display:none;place-items:center}
#pro-top.on{display:grid}
`;
document.head.appendChild(css);

/* ---------- Icônes ---------- */
const I=p=>`<svg viewBox="0 0 24 24">${p}</svg>`;
const IC={
dash:I('<rect x="3" y="3" width="7" height="9" rx="1"/><rect x="14" y="3" width="7" height="5" rx="1"/><rect x="14" y="12" width="7" height="9" rx="1"/><rect x="3" y="16" width="7" height="5" rx="1"/>'),
goals:I('<circle cx="12" cy="12" r="9"/><circle cx="12" cy="12" r="5"/><circle cx="12" cy="12" r="1"/>'),
perf:I('<path d="M4 20V10M10 20V4M16 20v-8M22 20H2"/>'),
agent:I('<circle cx="12" cy="8" r="4"/><path d="M4 21c0-4 4-6 8-6s8 2 8 6"/>'),
team:I('<circle cx="9" cy="8" r="3.5"/><path d="M2 20c0-3.5 3-5.5 7-5.5s7 2 7 5.5M17 4.5a3.5 3.5 0 010 7M22 20c0-2.5-1.5-4-4-5"/>'),
comm:I('<path d="M19 5L5 19"/><circle cx="7" cy="7" r="2.5"/><circle cx="17" cy="17" r="2.5"/>'),
bonus:I('<path d="M12 3l2.7 5.6 6.1.9-4.4 4.3 1 6.1L12 17l-5.4 2.9 1-6.1L3.2 9.5l6.1-.9z"/>'),
sanctions:I('<path d="M12 3l9 17H3z"/><path d="M12 10v4M12 17v.5"/>'),
access:I('<rect x="4" y="10" width="16" height="11" rx="2"/><path d="M8 10V7a4 4 0 018 0v3"/>'),
tool:I('<path d="M14 4h6v6M20 4l-9 9M18 14v5a1 1 0 01-1 1H5a1 1 0 01-1-1V7a1 1 0 011-1h5"/>'),
gear:I('<circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.7 1.7 0 00.3 1.9l.1.1a2 2 0 11-2.8 2.8l-.1-.1a1.7 1.7 0 00-1.9-.3 1.7 1.7 0 00-1 1.5V21a2 2 0 11-4 0v-.1a1.7 1.7 0 00-1-1.5 1.7 1.7 0 00-1.9.3l-.1.1a2 2 0 11-2.8-2.8l.1-.1a1.7 1.7 0 00.3-1.9 1.7 1.7 0 00-1.5-1H3a2 2 0 110-4h.1a1.7 1.7 0 001.5-1 1.7 1.7 0 00-.3-1.9l-.1-.1a2 2 0 112.8-2.8l.1.1a1.7 1.7 0 001.9.3h0a1.7 1.7 0 001-1.5V3a2 2 0 114 0v.1a1.7 1.7 0 001 1.5h0a1.7 1.7 0 001.9-.3l.1-.1a2 2 0 112.8 2.8l-.1.1a1.7 1.7 0 00-.3 1.9v0a1.7 1.7 0 001.5 1H21a2 2 0 110 4h-.1a1.7 1.7 0 00-1.5 1z"/>'),
search:I('<circle cx="11" cy="11" r="7"/><path d="M21 21l-4.3-4.3"/>'),
chev:I('<path d="M15 6l-6 6 6 6"/>'),
up:I('<path d="M6 15l6-6 6 6"/>'),
x:I('<path d="M6 6l12 12M18 6L6 18"/>')
};
const $=s=>document.querySelector(s), el=(h)=>{const d=document.createElement('div');d.innerHTML=h.trim();return d.firstChild;};

/* ---------- Splash ---------- */
const splash=el(`<div id="pro-splash"><div class="in"><div class="lg">SR</div><h1>Shift Report</h1><p>Chargement de votre espace…</p><div class="tr"><u></u></div></div></div>`);
document.body.appendChild(splash);
let splashT=Date.now();
const hideSplash=()=>{const w=Math.max(0,250-(Date.now()-splashT));setTimeout(()=>{splash.classList.add('out');setTimeout(()=>splash.remove(),600);},w);};
setTimeout(()=>splash.isConnected&&hideSplash(),6000);

/* ---------- Barre de chargement + état occupé ---------- */
const bar=el('<div id="pro-bar"></div>');document.body.appendChild(bar);
let UA=0,barT=null,busy=0;
document.addEventListener('click',()=>{UA=Date.now();},true);
const barStart=()=>{clearTimeout(barT);bar.style.transition='none';bar.style.opacity=1;bar.style.transform='scaleX(.05)';requestAnimationFrame(()=>{bar.style.transition='transform 6s cubic-bezier(.1,.6,.2,1)';bar.style.transform='scaleX(.85)';});};
const barDone=()=>{bar.style.transition='transform .2s, opacity .4s .2s';bar.style.transform='scaleX(1)';bar.style.opacity=0;};
const _show=window.show;
if(typeof _show==='function'){
  window.show=async function(){
    const manual=Date.now()-UA<800, app=$('#app');
    busy++;barStart();if(manual&&app)app.classList.add('busy');
    try{return await _show.apply(this,arguments);}
    finally{if(--busy<=0){barDone();app&&app.classList.remove('busy');}}
  };
}

/* ---------- Paramètres ---------- */
const COL={vert:'#1f6f5c',bleu:'#2563eb',violet:'#7c3aed',orange:'#c2410c',rose:'#be185d'};
const seg=(k,opts,get)=>`<div class="seg" data-k="${k}">${opts.map(([v,l])=>`<button type="button" data-v="${v}" class="${get()===v?'on':''}">${l}</button>`).join('')}</div>`;
const ov=el('<div id="pro-ov"></div>'), set=el('<aside id="pro-set" aria-label="Paramètres" role="dialog"></aside>');
document.body.append(ov,set);
function drawSet(){
  set.innerHTML=`<div class="hd"><h3>Paramètres</h3><button type="button" class="pro-ib" data-a="close" aria-label="Fermer">${IC.x}</button></div><div class="bd2">
  <h5>Thème</h5>${seg('mode',[['auto','Auto'],['light','Clair'],['dark','Sombre']],()=>UI.mode)}
  <h5>Couleur d'accentuation</h5><div class="sw" data-k="accent">${Object.keys(ACCENTS).map(k=>`<button type="button" data-v="${k}" class="${UI.accent===k?'on':''}" style="background:${COL[k]}" aria-label="${ACCENTS[k]}" title="${ACCENTS[k]}"></button>`).join('')}</div>
  <h5>Densité des tableaux</h5>${seg('density',[['compact','Compacte'],['normal','Normale'],['aere','Aérée']],()=>S.density)}
  <h5>Taille du texte</h5>${seg('fs',[['sm','Petit'],['md','Moyen'],['lg','Grand']],()=>S.fs)}
  <h5>Menu latéral</h5>${seg('side',[['full','Étendu'],['mini','Réduit']],()=>S.side)}
  <h5>Animations</h5>${seg('motion',[['on','Activées'],['off','Désactivées']],()=>S.motion)}
  <h5>Raccourcis</h5><p class="hint" style="margin:0"><b>Ctrl + K</b> : recherche et navigation · <b>Échap</b> : fermer</p></div>
  <div class="ft"><button type="button" data-a="refresh">Actualiser les données</button><button type="button" data-a="logout">Se déconnecter</button></div>`;
}
const openSet=()=>{drawSet();ov.classList.add('on');set.classList.add('on');};
const closeSet=()=>{ov.classList.remove('on');set.classList.remove('on');};
ov.onclick=closeSet;
set.addEventListener('click',e=>{
  const b=e.target.closest('button');if(!b)return;
  if(b.dataset.a==='close')return closeSet();
  if(b.dataset.a==='refresh'){closeSet();return show();}
  if(b.dataset.a==='logout'){closeSet();return logout();}
  const k=b.parentElement.dataset.k,v=b.dataset.v;if(!k||!v)return;
  if(k==='mode'){UI.mode=v;applyUI();}
  else if(k==='accent'){setAccent(v);}
  else{S[k]=v;apply();}
  drawSet();
});

/* ---------- Palette de commandes (Ctrl + K) ---------- */
const cmd=el('<div id="pro-cmd"><div class="bx"><input type="text" placeholder="Aller à… (page, action)" aria-label="Recherche"><ul></ul></div></div>');
document.body.appendChild(cmd);
let items=[],sel=0;
function build(){
  items=[];
  document.querySelectorAll('.side button[onclick^="setTab"]').forEach(b=>{
    const k=(b.getAttribute('onclick').match(/'(\w+)'/)||[])[1];
    items.push({l:b.textContent.trim(),ic:IC[k]||'',h:'Page',f:()=>setTab(k)});
  });
  items.push({l:'Paramètres',ic:IC.gear,h:'Action',f:openSet},{l:'Actualiser les données',ic:'',h:'Action',f:()=>show()},{l:'Se déconnecter',ic:'',h:'Action',f:()=>logout()});
}
function list(){
  const q=cmd.querySelector('input').value.toLowerCase();
  const res=items.filter(i=>i.l.toLowerCase().includes(q));sel=Math.min(sel,Math.max(res.length-1,0));
  cmd.querySelector('ul').innerHTML=res.map((i,n)=>`<li data-n="${items.indexOf(i)}" class="${n===sel?'on':''}">${i.ic}${i.l}<em>${i.h}</em></li>`).join('')||'<li>Aucun résultat</li>';
  return res;
}
function openCmd(){if(typeof me==='undefined'||!me)return;build();cmd.classList.add('on');const i=cmd.querySelector('input');i.value='';sel=0;list();i.focus();}
const closeCmd=()=>cmd.classList.remove('on');
cmd.addEventListener('click',e=>{const li=e.target.closest('li[data-n]');if(li){closeCmd();items[li.dataset.n].f();}else if(e.target===cmd)closeCmd();});
cmd.querySelector('input').addEventListener('input',()=>{sel=0;list();});
document.addEventListener('keydown',e=>{
  if((e.ctrlKey||e.metaKey)&&e.key.toLowerCase()==='k'){e.preventDefault();return cmd.classList.contains('on')?closeCmd():openCmd();}
  if(e.key==='Escape'){closeCmd();closeSet();}
  if(cmd.classList.contains('on')&&['ArrowDown','ArrowUp','Enter'].includes(e.key)){
    e.preventDefault();const r=list();
    if(e.key==='Enter'){const it=r[sel];closeCmd();it&&it.f();}
    else{sel=(sel+(e.key==='ArrowDown'?1:-1)+r.length)%r.length;list();}
  }
});

/* ---------- Notifications ---------- */
const tw=el('<div id="pro-toasts" aria-live="polite"></div>');document.body.appendChild(tw);
const seen=new Map();
function toast(t,err){
  const k=t+err,now=Date.now();if(seen.get(k)>now-3000)return;seen.set(k,now);
  const d=el(`<div class="pro-t${err?' err':''}"></div>`);d.textContent=t;tw.appendChild(d);
  setTimeout(()=>{d.style.transition='opacity .3s';d.style.opacity=0;setTimeout(()=>d.remove(),300);},3800);
}
function scanToasts(){
  document.querySelectorAll('#app .ok').forEach(n=>{const t=n.textContent.trim();if(t)toast(t,false);});
  document.querySelectorAll('#app [id$="_msg"].msg,#app #am.msg,#app #sm.msg').forEach(n=>{const t=n.textContent.trim();if(t)toast(t,true);});
}

/* ---------- Remonter en haut ---------- */
const top=el(`<button type="button" id="pro-top" aria-label="Haut de page">${IC.up}</button>`);document.body.appendChild(top);
top.onclick=()=>scrollTo({top:0,behavior:'smooth'});
addEventListener('scroll',()=>top.classList.toggle('on',scrollY>500),{passive:true});

/* ---------- Habillage du contenu rendu (après chaque show()) ---------- */
function decorate(){
  const app=$('#app');if(!app)return;
  if(app.querySelector('.shell,.auth,#adm')&&splash.isConnected&&!splash.classList.contains('out'))hideSplash();
  const hdr=app.querySelector('header .row');
  if(hdr&&!hdr.dataset.p){
    hdr.dataset.p=1;
    const old=[...hdr.children].find(c=>c.tagName==='SPAN');
    const name=old?old.textContent.split(' · ')[0]:'',role=old?(old.textContent.split(' · ')[1]||''):'';
    const ini=name.split(/[ @.]/).filter(Boolean).slice(0,2).map(s=>s[0].toUpperCase()).join('')||'SR';
    if(old)old.replaceWith(el(`<div class="pro-user"><span class="pro-av"></span><div><b></b><small></small></div></div>`));
    const u=hdr.querySelector('.pro-user');
    if(u){u.querySelector('.pro-av').textContent=ini;u.querySelector('b').textContent=name;u.querySelector('small').textContent=role;}
    const act=el(`<div class="pro-act"><span class="pro-sync"><i></i><span id="pro-st"></span></span>${typeof me!=='undefined'&&me&&me.role==='admin'?`<button type="button" class="pro-k" data-a="cmd">${IC.search}<span>Rechercher</span><kbd>Ctrl K</kbd></button>`:''}<button type="button" class="pro-ib" data-a="set" aria-label="Paramètres" title="Paramètres">${IC.gear}</button></div>`);
    hdr.prepend(act);
    act.addEventListener('click',e=>{const b=e.target.closest('button');if(!b)return;b.dataset.a==='set'?openSet():openCmd();});
  }
  const st=$('#pro-st');if(st&&typeof lastRefresh!=='undefined')st.textContent='Synchronisé à '+lastRefresh.toLocaleTimeString('fr-FR',{hour:'2-digit',minute:'2-digit'});
  const side=app.querySelector('.side');
  if(side&&!side.dataset.p){
    side.dataset.p=1;
    side.querySelectorAll('button').forEach(b=>{
      const m=(b.getAttribute('onclick')||'').match(/setTab\('(\w+)'\)/);
      const key=m?m[1]:'tool',txt=b.textContent.trim();
      b.title=txt;b.innerHTML=(IC[key]||IC.tool)+`<span class="t"></span>`;b.querySelector('.t').textContent=txt;
    });
    const tg=el(`<button type="button" class="sbtog" aria-label="Réduire le menu" title="Réduire / étendre le menu">${IC.chev}</button>`);
    tg.onclick=()=>{S.side=S.side==='mini'?'full':'mini';apply();};
    side.prepend(tg);
  }
  scanToasts();
}
let raf=0;
new MutationObserver(()=>{cancelAnimationFrame(raf);raf=requestAnimationFrame(decorate);}).observe($('#app'),{childList:true,subtree:true});
decorate();
})();
