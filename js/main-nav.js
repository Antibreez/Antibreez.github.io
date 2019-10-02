'use strict';

(function () {
  var menu = document.querySelector('.main-nav');
  var toggleButton = menu.querySelector('.main-nav__toggle');

  var onToggleClick = function (evt) {
    evt.preventDefault();
    menu.classList.toggle('main-nav--closed');
    menu.classList.toggle('main-nav--opened');
  };

  toggleButton.addEventListener('click', onToggleClick);
})();







