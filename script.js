const menuButton=document.querySelector('.menu');
const nav=document.querySelector('#nav');

menuButton.addEventListener('click',()=>{
  const open=!nav.classList.contains('open');
  nav.classList.toggle('open',open);
  menuButton.setAttribute('aria-expanded',String(open));
  document.body.classList.toggle('menu-open',open);
});

nav.querySelectorAll('a').forEach(link=>link.addEventListener('click',()=>{
  nav.classList.remove('open');
  menuButton.setAttribute('aria-expanded','false');
  document.body.classList.remove('menu-open');
}));

const observer=new IntersectionObserver(entries=>{
  entries.forEach(entry=>{
    if(entry.isIntersecting){
      entry.target.classList.add('visible');
      observer.unobserve(entry.target);
    }
  });
},{threshold:.1,rootMargin:'0px 0px -35px'});

document.querySelectorAll('.reveal').forEach(element=>observer.observe(element));

const lightbox=document.querySelector('.lightbox');
const lightboxImage=lightbox.querySelector('img');
document.querySelectorAll('.gallery-item').forEach(item=>item.addEventListener('click',()=>{
  lightboxImage.src=item.dataset.image;
  lightboxImage.alt=item.querySelector('img').alt;
  lightbox.showModal();
}));
lightbox.querySelector('button').addEventListener('click',()=>lightbox.close());
lightbox.addEventListener('click',event=>{if(event.target===lightbox)lightbox.close()});
document.addEventListener('keydown',event=>{if(event.key==='Escape'&&lightbox.open)lightbox.close()});

document.querySelector('#year').textContent=new Date().getFullYear();
