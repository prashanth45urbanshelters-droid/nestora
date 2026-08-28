const form = document.querySelector('#enquiry-form');
const toast = document.querySelector('.toast');
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

form.addEventListener('submit', (event) => {
  event.preventDefault();
  if (!form.checkValidity()) return form.reportValidity();
  toast.classList.add('show');
  form.reset();
  window.setTimeout(() => toast.classList.remove('show'), 3500);
});
