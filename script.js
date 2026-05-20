// Custom cursor — desativado em touch
const cursor = document.getElementById('cursor');
const ring = document.getElementById('cursor-ring');
let mx = 0, my = 0, rx = 0, ry = 0;

const isTouchDevice = () =>
  window.matchMedia('(hover: none) and (pointer: coarse)').matches;

if (!isTouchDevice()) {
  document.addEventListener('mousemove', e => {
    mx = e.clientX; my = e.clientY;
    cursor.style.transform = `translate(${mx - 5}px, ${my - 5}px)`;
  });

  function animateRing() {
    rx += (mx - rx - 18) * 0.12;
    ry += (my - ry - 18) * 0.12;
    ring.style.transform = `translate(${rx}px, ${ry}px)`;
    requestAnimationFrame(animateRing);
  }
  animateRing();
}

if (!isTouchDevice()) {
  document.querySelectorAll('a, button, .skill-card, .project-card, .stat-card, .contact-link').forEach(el => {
    el.addEventListener('mouseenter', () => {
      cursor.style.transform += ' scale(1.5)';
      ring.style.opacity = '1';
      ring.style.width = '50px';
      ring.style.height = '50px';
    });
    el.addEventListener('mouseleave', () => {
      ring.style.opacity = '0.6';
      ring.style.width = '36px';
      ring.style.height = '36px';
    });
  });
}

// Intersection Observer for fade-up + skill bars
const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      entry.target.querySelectorAll('.skill-fill').forEach(bar => {
        setTimeout(() => {
          bar.style.width = bar.dataset.width + '%';
        }, 200);
      });
    }
  });
}, { threshold: 0.15 });

document.querySelectorAll('.fade-up').forEach(el => observer.observe(el));

// Also animate skill bars if already visible
document.querySelectorAll('.skill-fill').forEach(bar => {
  const observed = new IntersectionObserver(entries => {
    if (entries[0].isIntersecting) {
      setTimeout(() => { bar.style.width = bar.dataset.width + '%'; }, 300);
      observed.disconnect();
    }
  }, { threshold: 0.5 });
  observed.observe(bar);
});

// Form submit
function handleSubmit(btn) {
  btn.textContent = 'Mensagem enviada ✓';
  btn.style.background = '#22c55e';
  btn.style.borderColor = '#22c55e';
  setTimeout(() => {
    btn.textContent = 'Enviar mensagem →';
    btn.style.background = 'var(--blue)';
    btn.style.borderColor = 'var(--blue)';
  }, 3000);
}

// Menu hambúrguer
const navToggle = document.getElementById('nav-toggle');
const navLinks = document.getElementById('nav-links');

if (navToggle) {
  navToggle.addEventListener('click', () => {
    navToggle.classList.toggle('open');
    navLinks.classList.toggle('open');
  });
}

// Fecha o menu ao clicar em um link
document.querySelectorAll('.nav-links a').forEach(a => {
  a.addEventListener('click', () => {
    navToggle?.classList.remove('open');
    navLinks?.classList.remove('open');
  });
});

// Smooth nav
document.querySelectorAll('a[href^="#"]').forEach(a => {
  a.addEventListener('click', e => {
    e.preventDefault();
    document.querySelector(a.getAttribute('href'))?.scrollIntoView({ behavior: 'smooth' });
  });
});
