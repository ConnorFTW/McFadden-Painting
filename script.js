const header = document.getElementById('header');
const toggle = document.querySelector('.menu-toggle');
const nav = document.querySelector('.header-nav');
const video = document.querySelector('.hero-video');

window.addEventListener('scroll', () => {
  header.classList.toggle('solid', window.scrollY > 50);
}, { passive: true });

toggle.addEventListener('click', () => {
  const open = nav.classList.toggle('open');
  toggle.setAttribute('aria-expanded', open);
  document.body.style.overflow = open ? 'hidden' : '';
});

nav.querySelectorAll('a').forEach(a => {
  a.addEventListener('click', () => {
    nav.classList.remove('open');
    toggle.setAttribute('aria-expanded', 'false');
    document.body.style.overflow = '';
  });
});

if (video) {
  const go = () => video.play().then(() => video.classList.add('on')).catch(() => {});
  video.addEventListener('playing', () => video.classList.add('on'));
  go();
  document.addEventListener('click', go, { once: true });
}

const reveals = document.querySelectorAll('.reveal');
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });

reveals.forEach(el => observer.observe(el));

function handleSubmit(e) {
  e.preventDefault();
  const name = new FormData(e.target).get('name');
  e.target.className = 'form done';
  e.target.innerHTML = `<div><h3>Thanks, ${name}!</h3><p>We'll be in touch within one business day.<br>Or call <a href="tel:2505122608" style="color:var(--gold)">(250) 512-2608</a></p></div>`;
}
