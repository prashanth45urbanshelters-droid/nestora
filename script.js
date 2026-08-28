const form = document.querySelector('#enquiry-form');
const toast = document.querySelector('.toast');
const submitButton = form.querySelector('button[type="submit"]');
const LEADS_ENDPOINT = 'https://script.google.com/macros/s/AKfycbwmhFRJPumaGDNKyfqznmdIVrh4w16Lwaeb_WBBotUVkjmgWBMwMMXG1PAJfVWD4RwzkA/exec';
const slides = [...document.querySelectorAll('.slide')];
const dots = [...document.querySelectorAll('.carousel-dots button')];
let activeSlide = 0;

function showSlide(index) {
  activeSlide = index;
  slides.forEach((slide, i) => slide.classList.toggle('is-active', i === index));
  dots.forEach((dot, i) => dot.classList.toggle('is-active', i === index));
}

dots.forEach((dot, index) => dot.addEventListener('click', () => showSlide(index)));
window.setInterval(() => showSlide((activeSlide + 1) % slides.length), 3000);

form.addEventListener('submit', async (event) => {
  event.preventDefault();
  if (!form.checkValidity()) return form.reportValidity();

  const name = form.elements.name.value.trim();
  const phone = form.elements.phone.value.replace(/\D/g, '');
  submitButton.disabled = true;
  submitButton.textContent = 'Submitting…';

  try {
    await fetch(LEADS_ENDPOINT, {
      method: 'POST',
      mode: 'no-cors',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8' },
      body: new URLSearchParams({ name, phone }),
    });
    toast.textContent = 'Thank you! We’ll call you shortly.';
    toast.classList.add('show');
    form.reset();
  } catch {
    toast.textContent = 'Something went wrong. Please try again.';
    toast.classList.add('show');
  } finally {
    submitButton.disabled = false;
    submitButton.innerHTML = 'Get project details <span>→</span>';
    window.setTimeout(() => toast.classList.remove('show'), 3500);
  }
});
