const header = document.querySelector('.header-wrap');
const navigation = document.querySelector('.nav');
const languageButtons = [...document.querySelectorAll('[data-language]')];
const translatableEls = [...document.querySelectorAll('[data-en]')];
const metaDescription = document.querySelector('meta[name="description"]');
const slides = [...document.querySelectorAll('.hero-slide')];
const pagerButtons = [...document.querySelectorAll('.pager button')];
let activeSlide = 0;

navigation.addEventListener('mouseenter', () => header.classList.add('menu-open'));
navigation.addEventListener('mouseleave', () => header.classList.remove('menu-open'));

function applyLanguage(language) {
  const isEnglish = language === 'ENG';
  document.documentElement.lang = isEnglish ? 'en' : 'ko';
  translatableEls.forEach((el) => {
    if (!el.dataset.ko) el.dataset.ko = el.textContent;
    el.textContent = isEnglish ? el.dataset.en : el.dataset.ko;
  });
  if (metaDescription) {
    if (!metaDescription.dataset.ko) metaDescription.dataset.ko = metaDescription.content;
    metaDescription.content = isEnglish ? metaDescription.dataset.en : metaDescription.dataset.ko;
  }
  languageButtons.forEach((item) => item.classList.toggle('is-active', item.dataset.language === language));
  localStorage.setItem('jl-language', language);
}

languageButtons.forEach((button) => button.addEventListener('click', () => applyLanguage(button.dataset.language)));
applyLanguage(localStorage.getItem('jl-language') === 'ENG' ? 'ENG' : 'KOR');

function showSlide(index) {
  activeSlide = index;
  slides.forEach((slide, slideIndex) => slide.classList.toggle('is-active', slideIndex === activeSlide));
  pagerButtons.forEach((button, buttonIndex) => button.classList.toggle('is-active', buttonIndex === activeSlide));
}

pagerButtons.forEach((button, index) => button.addEventListener('click', () => showSlide(index)));
setInterval(() => showSlide((activeSlide + 1) % slides.length), 5000);

window.addEventListener('scroll', () => {
  header.classList.toggle('is-scrolled', window.scrollY > 40);
});