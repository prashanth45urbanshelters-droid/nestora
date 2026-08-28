const form = document.querySelector('#enquiry-form');
const submitButton = form.querySelector('button[type="submit"]');
const successModal = document.querySelector('#success-modal');
const closeSuccessModal = successModal.querySelector('.success-modal__button');
const LEADS_ENDPOINT = 'https://script.google.com/macros/s/AKfycbx32tYyxSVS4p9KAr_MgBR9WEImIM4HR1foXy4CzI_CmoJ74tAtA60-mQcMCoaQtNmjLA/exec';
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
    successModal.hidden = false;
    form.reset();
  } catch {
    window.alert('Something went wrong. Please try again.');
  } finally {
    submitButton.disabled = false;
    submitButton.innerHTML = 'Get project details <span>→</span>';
  }
});

closeSuccessModal.addEventListener('click', () => { successModal.hidden = true; });
