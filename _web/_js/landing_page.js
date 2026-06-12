// Typewriter effect
const typewriter = document.getElementById("typewriter");
const text = "Estufa Automática para sua casa";
let i = 0;

function typeEffect() {
  if (i < text.length) {
    typewriter.innerHTML += text.charAt(i);
    i++;
    setTimeout(typeEffect, 80);
  }
}
document.addEventListener("DOMContentLoaded", typeEffect);

// Fade-in scroll
const faders = document.querySelectorAll('.fade-in');
const appearOptions = { threshold: 0.3 };
const appearOnScroll = new IntersectionObserver((entries, observer) => {
  entries.forEach(entry => {
    if (!entry.isIntersecting) return;
    entry.target.classList.add('appear');
    observer.unobserve(entry.target);
  });
}, appearOptions);

faders.forEach(fader => {
  appearOnScroll.observe(fader);
});
