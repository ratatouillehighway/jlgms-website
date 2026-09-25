(function () {
  var translatableEls = [].slice.call(document.querySelectorAll('[data-en]'));
  var languageButtons = [].slice.call(document.querySelectorAll('[data-language]'));

  function applyLanguage(language) {
    var isEnglish = language === 'ENG';
    document.documentElement.lang = isEnglish ? 'en' : 'ko';
    translatableEls.forEach(function (el) {
      if (!el.dataset.ko) el.dataset.ko = el.textContent;
      el.textContent = isEnglish ? el.dataset.en : el.dataset.ko;
    });
    languageButtons.forEach(function (item) {
      item.classList.toggle('is-active', item.dataset.language === language);
    });
    localStorage.setItem('jl-language', language);
  }

  languageButtons.forEach(function (button) {
    button.addEventListener('click', function () {
      applyLanguage(button.dataset.language);
    });
  });

  applyLanguage(localStorage.getItem('jl-language') === 'ENG' ? 'ENG' : 'KOR');
})();
