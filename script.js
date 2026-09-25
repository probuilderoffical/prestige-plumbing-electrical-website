const $=(s,p=document)=>p.querySelector(s), $$=(s,p=document)=>[...p.querySelectorAll(s)];
document.body.classList.add('lock');
const boot=$('.boot'), count=$('.boot-count'); let n=0;
const counter=setInterval(()=>{n=Math.min(100,n+Math.ceil(Math.random()*12));count.textContent=String(n).padStart(2,'0');if(n===100){clearInterval(counter);setTimeout(()=>{boot.classList.add('done');document.body.classList.remove('lock')},260)}},75);
$('#year').textContent=new Date().getFullYear();

const nav=$('.nav'),progress=$('.page-progress');
addEventListener('scroll',()=>{nav.classList.toggle('scrolled',scrollY>30);const h=document.documentElement.scrollHeight-innerHeight;progress.style.width=`${h?scrollY/h*100:0}%`},{passive:true});
const menuButton=$('.menu-button'),menu=$('#menu');
menuButton.addEventListener('click',()=>{const open=!menu.classList.contains('open');menu.classList.toggle('open',open);menuButton.setAttribute('aria-expanded',open);document.body.classList.toggle('lock',open)});
$$('#menu a').forEach(a=>a.addEventListener('click',()=>{menu.classList.remove('open');document.body.classList.remove('lock')}));

const observer=new IntersectionObserver(entries=>entries.forEach(e=>{if(e.isIntersecting){e.target.classList.add('visible');observer.unobserve(e.target)}}),{threshold:.13,rootMargin:'0px 0px -30px'});
$$('.reveal,.reveal-text').forEach(el=>observer.observe(el));

const descriptions=[
'Professional installations, diagnostics and durable repairs that keep water moving exactly where it should.',
'Safe, precise electrical solutions designed around the way your home or business actually works.',
'Preventative care and practical repairs that reduce repeat problems, disruption and unnecessary cost.'
];
const tabs=$$('.service-tab'),serviceImages=$$('.visual-images img'),serviceNumber=$('.visual-counter b'),serviceText=$('#service-description');
tabs.forEach((tab,index)=>tab.addEventListener('click',()=>{tabs.forEach(t=>{t.classList.remove('active');t.setAttribute('aria-selected','false')});serviceImages.forEach(i=>i.classList.remove('active'));tab.classList.add('active');tab.setAttribute('aria-selected','true');serviceImages[index].classList.add('active');serviceNumber.textContent=index+1;serviceText.animate([{opacity:0,transform:'translateY(8px)'},{opacity:1,transform:'none'}],{duration:420,easing:'ease-out'});serviceText.textContent=descriptions[index]}));

// Fluid-electric particle field: a light 2D canvas with 3D depth cues.
const canvas=$('#energy-canvas'),ctx=canvas.getContext('2d',{alpha:true});let particles=[],mx=.5,my=.5;
function sizeCanvas(){const d=Math.min(devicePixelRatio,2);canvas.width=innerWidth*d;canvas.height=innerHeight*d;canvas.style.width=innerWidth+'px';canvas.style.height=innerHeight+'px';ctx.setTransform(d,0,0,d,0,0);const total=Math.min(95,Math.floor(innerWidth/14));particles=Array.from({length:total},(_,i)=>({x:Math.random()*innerWidth,y:Math.random()*innerHeight,vx:(Math.random()-.5)*.24,vy:(Math.random()-.5)*.24,r:Math.random()*1.4+.3,c:i%4===0?'237,170,22':'98,215,239'}))}
function draw(){ctx.clearRect(0,0,innerWidth,innerHeight);for(const p of particles){p.x+=p.vx+(mx-.5)*.05;p.y+=p.vy+(my-.5)*.05;if(p.x<0)p.x=innerWidth;if(p.x>innerWidth)p.x=0;if(p.y<0)p.y=innerHeight;if(p.y>innerHeight)p.y=0;ctx.beginPath();ctx.arc(p.x,p.y,p.r,0,Math.PI*2);ctx.fillStyle=`rgba(${p.c},.4)`;ctx.fill()}for(let i=0;i<particles.length;i++){for(let j=i+1;j<particles.length;j++){const a=particles[i],b=particles[j],dx=a.x-b.x,dy=a.y-b.y,d=Math.hypot(dx,dy);if(d<105){ctx.beginPath();ctx.moveTo(a.x,a.y);ctx.lineTo(b.x,b.y);ctx.strokeStyle=`rgba(70,130,160,${(1-d/105)*.09})`;ctx.stroke()}}}requestAnimationFrame(draw)}
sizeCanvas();draw();addEventListener('resize',sizeCanvas);addEventListener('pointermove',e=>{mx=e.clientX/innerWidth;my=e.clientY/innerHeight;const core=$('[data-depth]');if(core)core.style.transform=`translate(-50%,-50%) rotateX(${(my-.5)*-8}deg) rotateY(${(mx-.5)*10}deg)`},{passive:true});

if(matchMedia('(pointer:fine)').matches){const cursor=$('.cursor'),dot=$('.cursor i'),ring=$('.cursor span');let x=0,y=0,rx=0,ry=0;addEventListener('pointermove',e=>{x=e.clientX;y=e.clientY;dot.style.transform=`translate(${x-2.5}px,${y-2.5}px)`});(function follow(){rx+=(x-rx)*.14;ry+=(y-ry)*.14;ring.style.transform=`translate(${rx-19}px,${ry-19}px)`;requestAnimationFrame(follow)})();$$('a,button,[data-tilt]').forEach(el=>{el.addEventListener('mouseenter',()=>cursor.classList.add('active'));el.addEventListener('mouseleave',()=>cursor.classList.remove('active'))});$$('.magnetic').forEach(el=>{el.addEventListener('mousemove',e=>{const r=el.getBoundingClientRect();el.style.transform=`translate(${(e.clientX-r.left-r.width/2)*.1}px,${(e.clientY-r.top-r.height/2)*.13}px)`});el.addEventListener('mouseleave',()=>el.style.transform='')});const tilt=$('[data-tilt]');tilt?.addEventListener('mousemove',e=>{const r=tilt.getBoundingClientRect();tilt.style.transform=`perspective(1000px) rotateX(${((e.clientY-r.top)/r.height-.5)*-4}deg) rotateY(${((e.clientX-r.left)/r.width-.5)*5}deg)`});tilt?.addEventListener('mouseleave',()=>tilt.style.transform='')}
