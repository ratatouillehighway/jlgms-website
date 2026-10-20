// Mobile menu: adds a menu button to the header and opens the main menu as a panel on small screens.
(function () {
  var wrap = document.querySelector('.header-wrap, .jl-header-wrap');
  if (!wrap) return;
  var bar = wrap.querySelector('.header, .jl-header');
  var nav = wrap.querySelector('.nav, .jl-nav');
  if (!bar || !nav) return;
  var isEnglish = function () { return document.documentElement.lang === 'en'; };

  if (!nav.id) nav.id = 'site-menu';
  var button = document.createElement('button');
  button.type = 'button';
  button.className = 'menu-toggle';
  button.setAttribute('aria-controls', nav.id);
  button.setAttribute('aria-expanded', 'false');
  button.innerHTML = '<span></span><span></span><span></span>';
  bar.appendChild(button);

  function label(open) {
    button.setAttribute('aria-label', open ? (isEnglish() ? 'Close menu' : '메뉴 닫기') : (isEnglish() ? 'Open menu' : '메뉴 열기'));
  }
  function setOpen(open) {
    wrap.classList.toggle('nav-open', open);
    document.documentElement.classList.toggle('nav-locked', open);
    button.setAttribute('aria-expanded', open ? 'true' : 'false');
    label(open);
  }
  label(false);

  button.addEventListener('click', function () { setOpen(!wrap.classList.contains('nav-open')); });
  nav.addEventListener('click', function (e) { if (e.target.closest('a')) setOpen(false); });
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && wrap.classList.contains('nav-open')) { setOpen(false); button.focus(); }
  });
  var wide = window.matchMedia('(min-width: 1025px)');
  var onWide = function () { if (wide.matches) setOpen(false); };
  if (wide.addEventListener) wide.addEventListener('change', onWide); else wide.addListener(onWide);
  // Language switch changes the label language too.
  [].forEach.call(document.querySelectorAll('[data-language]'), function (b) {
    b.addEventListener('click', function () { setTimeout(function () { label(wrap.classList.contains('nav-open')); }, 0); });
  });
})();
