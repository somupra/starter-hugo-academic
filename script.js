// Typing animation
const phrases = [
  'Building Strata.OS — the AI operating system for businesses',
  'Systems builder. Technical founder.',
  'eBPF + Firecracker + LLMs = Strata.OS',
  'IIT Kanpur → Quant → HFT → Founder'
];

const typingEl = document.querySelector('.typing-text');
let phraseIndex = 0;
let charIndex = 0;
let deleting = false;
let pauseEnd = 0;

function typeLoop() {
  const currentPhrase = phrases[phraseIndex];
  const now = Date.now();

  if (now < pauseEnd) {
    requestAnimationFrame(typeLoop);
    return;
  }

  if (!deleting) {
    typingEl.textContent = currentPhrase.slice(0, charIndex + 1);
    charIndex++;
    if (charIndex === currentPhrase.length) {
      deleting = true;
      pauseEnd = now + 2000;
    }
  } else {
    typingEl.textContent = currentPhrase.slice(0, charIndex - 1);
    charIndex--;
    if (charIndex === 0) {
      deleting = false;
      phraseIndex = (phraseIndex + 1) % phrases.length;
    }
  }

  const speed = deleting ? 30 : 50;
  setTimeout(() => requestAnimationFrame(typeLoop), speed);
}

requestAnimationFrame(typeLoop);

// Scroll fade-in
const fadeEls = document.querySelectorAll('.fade-in');

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
      }
    });
  },
  { threshold: 0.1 }
);

fadeEls.forEach((el) => observer.observe(el));

// Nav active state
const sections = document.querySelectorAll('.section[id]');
const navLinks = document.querySelectorAll('.nav-links a');

function updateActiveNav() {
  const scrollPos = window.scrollY + 100;

  sections.forEach((section) => {
    const top = section.offsetTop;
    const height = section.offsetHeight;
    const id = section.getAttribute('id');

    if (scrollPos >= top && scrollPos < top + height) {
      navLinks.forEach((link) => {
        link.style.color = '';
        if (link.getAttribute('href') === `#${id}`) {
          link.style.color = '#e0e0e0';
        }
      });
    }
  });
}

window.addEventListener('scroll', updateActiveNav, { passive: true });
