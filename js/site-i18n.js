(function () {
  var STORAGE_KEY = 'jl-language';
  var translatableEls = [].slice.call(document.querySelectorAll('[data-en]'));
  var languageButtons = [].slice.call(document.querySelectorAll('[data-language]'));

  function readLanguage() {
    try { return localStorage.getItem(STORAGE_KEY) === 'ENG' ? 'ENG' : 'KOR'; } catch (e) { return 'KOR'; }
  }

  function render(language) {
    var isEnglish = language === 'ENG';
    document.documentElement.lang = isEnglish ? 'en' : 'ko';
    translatableEls.forEach(function (el) {
      if (!el.dataset.ko) el.dataset.ko = el.textContent;
      el.textContent = isEnglish ? el.dataset.en : el.dataset.ko;
    });
    languageButtons.forEach(function (item) {
      item.classList.toggle('is-active', item.dataset.language === language);
    });
  }

  languageButtons.forEach(function (button) {
    button.addEventListener('click', function () {
      try { localStorage.setItem(STORAGE_KEY, button.dataset.language); } catch (e) {}
      render(button.dataset.language);
    });
  });

  // Back/forward restores a cached page without re-running scripts, and other tabs may have switched language.
  window.addEventListener('pageshow', function () { render(readLanguage()); });
  window.addEventListener('storage', function (e) { if (e.key === STORAGE_KEY) render(readLanguage()); });

  render(readLanguage());
})();
