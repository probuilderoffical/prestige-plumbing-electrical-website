const toggle=document.querySelector('.menu-toggle');
const menu=document.querySelector('#menu');
const header=document.querySelector('.site-header');
toggle?.addEventListener('click',()=>{const open=toggle.getAttribute('aria-expanded')==='true';toggle.setAttribute('aria-expanded',String(!open));toggle.setAttribute('aria-label',open?'Open menu':'Close menu');menu.classList.toggle('open',!open);document.body.classList.toggle('menu-open',!open)});
menu?.querySelectorAll('a').forEach(link=>link.addEventListener('click',()=>{toggle.setAttribute('aria-expanded','false');toggle.setAttribute('aria-label','Open menu');menu.classList.remove('open');document.body.classList.remove('menu-open')}));
let lastY=0;
addEventListener('scroll',()=>{const y=scrollY;header.classList.toggle('scrolled',y>24);header.classList.toggle('hidden',y>lastY&&y>180&&!menu.classList.contains('open'));lastY=y},{passive:true});
const reduced=matchMedia('(prefers-reduced-motion: reduce)').matches;
const reveals=document.querySelectorAll('.reveal');
if(reduced)reveals.forEach(el=>el.classList.add('visible'));else{const observer=new IntersectionObserver(entries=>entries.forEach(entry=>{if(entry.isIntersecting){entry.target.classList.add('visible');observer.unobserve(entry.target)}}),{threshold:.12,rootMargin:'0px 0px -45px'});reveals.forEach(el=>observer.observe(el))}
const dialog=document.querySelector('.lightbox');
const dialogImage=dialog?.querySelector('img');
document.querySelectorAll('[data-image]').forEach(button=>button.addEventListener('click',()=>{dialogImage.src=button.dataset.image;dialog.showModal()}));
dialog?.querySelector('button').addEventListener('click',()=>dialog.close());
dialog?.addEventListener('click',event=>{if(event.target===dialog)dialog.close()});
addEventListener('keydown',event=>{if(event.key==='Escape'&&dialog?.open)dialog.close()});
document.querySelector('#year').textContent=new Date().getFullYear();
