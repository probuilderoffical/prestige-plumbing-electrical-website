const header = document.querySelector('.site-header');
const menuButton = document.querySelector('.menu-toggle');
const nav = document.querySelector('.site-nav');

window.addEventListener('load', () => {
  window.setTimeout(() => document.querySelector('.page-loader')?.classList.add('loaded'), 350);
});

const setHeader = () => header.classList.toggle('scrolled', window.scrollY > 24);
setHeader();
window.addEventListener('scroll', setHeader, { passive: true });

function closeMenu() {
  menuButton.classList.remove('active');
  menuButton.setAttribute('aria-expanded', 'false');
  nav.classList.remove('open');
  document.body.classList.remove('menu-open');
}

menuButton.addEventListener('click', () => {
  const opening = !nav.classList.contains('open');
  menuButton.classList.toggle('active', opening);
  menuButton.setAttribute('aria-expanded', String(opening));
  nav.classList.toggle('open', opening);
  document.body.classList.toggle('menu-open', opening);
});

nav.querySelectorAll('a').forEach(link => link.addEventListener('click', closeMenu));
document.addEventListener('keydown', event => { if (event.key === 'Escape') closeMenu(); });

const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.12, rootMargin: '0px 0px -35px' });

document.querySelectorAll('.reveal').forEach(element => observer.observe(element));
document.getElementById('year').textContent = new Date().getFullYear();

// Scroll progress and gentle parallax depth.
const progress = document.querySelector('.scroll-progress');
const heroVisual = document.querySelector('.hero-visual');
window.addEventListener('scroll', () => {
  const available = document.documentElement.scrollHeight - innerHeight;
  progress.style.width = `${available > 0 ? (scrollY / available) * 100 : 0}%`;
  if (heroVisual && scrollY < innerHeight) heroVisual.style.transform = `translate3d(0,${scrollY * .075}px,0)`;
}, { passive: true });

// Refined pointer for desktop only.
const cursorDot = document.querySelector('.cursor-dot');
const cursorRing = document.querySelector('.cursor-ring');
if (matchMedia('(pointer:fine)').matches) {
  let ringX = 0, ringY = 0, mouseX = 0, mouseY = 0;
  document.addEventListener('mousemove', event => {
    mouseX = event.clientX; mouseY = event.clientY;
    cursorDot.style.transform = `translate(${mouseX - 2.5}px,${mouseY - 2.5}px)`;
  });
  const follow = () => {
    ringX += (mouseX - ringX) * .16; ringY += (mouseY - ringY) * .16;
    cursorRing.style.transform = `translate(${ringX - 17}px,${ringY - 17}px)`;
    requestAnimationFrame(follow);
  };
  follow();
  document.querySelectorAll('a,button,[data-tilt]').forEach(el => {
    el.addEventListener('mouseenter', () => cursorRing.classList.add('hover'));
    el.addEventListener('mouseleave', () => cursorRing.classList.remove('hover'));
  });
}

// Magnetic controls and subtle 3D cards create depth without hurting usability.
if (matchMedia('(hover:hover) and (pointer:fine)').matches) {
  document.querySelectorAll('.magnetic').forEach(item => {
    item.addEventListener('mousemove', event => {
      const box = item.getBoundingClientRect();
      item.style.transform = `translate(${(event.clientX - box.left - box.width / 2) * .13}px,${(event.clientY - box.top - box.height / 2) * .16}px)`;
    });
    item.addEventListener('mouseleave', () => item.style.transform = '');
  });
  document.querySelectorAll('[data-tilt]').forEach(card => {
    card.addEventListener('mousemove', event => {
      const box = card.getBoundingClientRect();
      const rx = ((event.clientY - box.top) / box.height - .5) * -5;
      const ry = ((event.clientX - box.left) / box.width - .5) * 6;
      card.style.transform = `perspective(1000px) rotateX(${rx}deg) rotateY(${ry}deg)`;
    });
    card.addEventListener('mouseleave', () => card.style.transform = '');
  });
}
