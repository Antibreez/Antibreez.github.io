"use strict";

(function () {
  var sceneHeader = document.querySelector('.header__bg');
  var headerParallaxInstance = new Parallax(sceneHeader);
  var sceneWorks = document.querySelector('.how-it-works__bg');
  var worksParallaxInstance = new Parallax(sceneWorks);
})();

(function () {
  var vh = window.innerHeight * 0.01;
  document.documentElement.style.setProperty('--vh', "".concat(vh, "px"));
  var $body = document.querySelector('body');

  function debounce(func) {
    var timer;
    return function (event) {
      if (timer) clearTimeout(timer);
      timer = setTimeout(func, 100, event);
    };
  }

  function onResize() {
    var vh = window.innerHeight * 0.01;
    document.documentElement.style.setProperty('--vh', "".concat(vh, "px"));
  }

  ;
  window.addEventListener('resize', debounce(onResize));

  function Modal(trigger, modal) {
    this.trigger = trigger;
    this.modal = modal;
    this.overlay = this.modal.querySelector('.modal__overlay');
    this.closeBtn = this.modal.querySelector('.modal__close');
    this.onOverlayClick = this.onOverlayClick.bind(this);
    this.onCloseClick = this.onCloseClick.bind(this);
    this.onTriggerClick = this.onTriggerClick.bind(this); //this.onResize = this.onResize.bind(this);

    this.addEventListeners();
  }

  Modal.prototype.open = function () {
    this.modal.classList.add('js-show');
    $body.classList.add('js__body-no-scroll');
  };

  Modal.prototype.close = function () {
    this.modal.classList.remove('js-show');
    $body.classList.remove('js__body-no-scroll');
  };

  Modal.prototype.onOverlayClick = function (e) {
    if (e.target === this.overlay) {
      this.close();
    }
  };

  Modal.prototype.onCloseClick = function () {
    this.close();
  };

  Modal.prototype.onTriggerClick = function () {
    this.open();
  }; // Modal.prototype.onResize = function() {
  //     let vh = window.innerHeight * 0.01;
  //     document.documentElement.style.setProperty('--vh', `${vh}px`);
  // };


  Modal.prototype.addEventListeners = function () {
    this.overlay.addEventListener('click', this.onOverlayClick);
    this.closeBtn.addEventListener('click', this.onCloseClick);
    this.trigger.addEventListener('click', this.onTriggerClick);
  };

  window.Modal = Modal;
})();

(function () {
  var inputs = document.querySelectorAll('.input-phone');

  if (!inputs[0]) {
    return;
  }

  var im = new Inputmask("+7(999) 999-99-99");
  inputs.forEach(function (item) {
    im.mask(item);
  });
})();

(function () {
  $("a.header__nav-link").click(function () {
    var elementClick = $(this).attr('href');
    var destination = $(elementClick).offset().top - 80;
    $('html, body').animate({
      scrollTop: destination
    }, 400);
    $(this).parents('.header__bar').removeClass('js-opened');
    return false;
  });
  $(window).scrollTop() > 800 ? $('.to-top').addClass('show') : $('.to-top').removeClass('show');
  $(window).scroll(function () {
    $(this).scrollTop() > 800 ? $('.to-top').addClass('show') : $('.to-top').removeClass('show');
  });
  $('.to-top').click(function () {
    $('html, body').animate({
      scrollTop: 0
    }, 400);
  });
})();

(function () {
  var items = document.querySelectorAll('.mobile-control__item-text');

  var onItemsClick = function onItemsClick(e) {//e.preventDefault();
  }; // const onItemOver = function(e) {
  //   const target = e.currentTarget;
  //   target.classList.add('hovered');
  // }
  // const onItemLeave = function(e) {
  //   const target = e.currentTarget;
  //   target.classList.remove('hovered');
  // }
  // items.forEach(function(item) {
  //   item.addEventListener('click', onItemsClick);
  //   item.addEventListener('mouseenter', onItemOver);
  //   item.addEventListener('mouseleave', onItemLeave);
  // });
  // $('mobile-control__item-text').click(function() {
  //   $('.mobile-control__item-text').removeClass(ho)
  // });

})();

(function () {
  var filters = document.querySelector('.catalog__filters-list'); // const allRadio = document.querySelector('.catalog__filters-radio[value="all"]');
  // const daichiRadio = document.querySelector('.catalog__filters-radio[value="daichi"]');
  // const daikinRadio = document.querySelector('.catalog__filters-radio[value="daikin"]');
  // const boschRadio = document.querySelector('.catalog__filters-radio[value="bosch"]');
  // const mideaRadio = document.querySelector('.catalog__filters-radio[value="midea"]');

  var cards = document.querySelectorAll('.catalog__item');
  var radios = document.querySelectorAll('.catalog__filters-radio'); // const findCheckedBrand = function() {
  //   let brand = '';
  //   radios.forEach(function(radio) {
  //     if (radio.checked) {
  //       brand = radio.getAttribute('value');
  //     }
  //   });
  //   return brand;
  // };

  var showCard = function showCard(card) {
    if (card.classList.contains('hidden')) {
      card.classList.remove('hidden');
    }
  };

  var hideCard = function hideCard(card) {
    if (!card.classList.contains('hidden')) {
      card.classList.add('hidden');
    }
  };

  var showAllCards = function showAllCards() {
    cards.forEach(function (card) {
      showCard(card);
    });
  }; // const hideAllCards = function() {
  //   cards.forEach(function(card) {
  //    hideCard(card);
  //   })
  // };


  var renderCards = function renderCards(brand) {
    if (brand === 'all') {
      showAllCards();
    } else {
      showAllCards();
      cards.forEach(function (card) {
        if (card.getAttribute('data-brand') !== brand) {
          hideCard(card);
        }
      });
    }
  };

  var onRadioChange = function onRadioChange(e) {
    var brand = e.currentTarget.getAttribute('value');
    renderCards(brand);
  };

  radios.forEach(function (radio) {
    radio.addEventListener('change', onRadioChange);
  });
  $('.catalog__select-block select').change(function () {
    var text = $(this).children('option:selected').text();
    var value = $(this).val();
    $(this).parent().prev().text(text);

    if (value === 'all') {
      $('.catalog__item').removeClass('hidden');
    } else {
      $('.catalog__item').addClass('hidden');
      $('.catalog__item[data-brand=' + value + ']').removeClass('hidden');
    }
  });
})();

(function () {
  var swiper = new Swiper('.device-card__slider-container', {
    // Optional parameters
    watchOverflow: true,
    //loop: true,
    // If we need pagination
    pagination: {
      el: '.swiper-pagination',
      clickable: true
    }
  });
})();

(function () {
  $('.header__nav-btn').click(function () {
    $(this).parents('.header__bar').toggleClass('js-opened');
  });
})();

(function () {
  $('.mobile-control-mobile__item-top').click(function () {
    $(this).toggleClass('opened');
    $(this).next().slideToggle();
  });
})();

(function () {
  $('.questions__item-top').click(function () {
    $(this).toggleClass('opened');
    $(this).next().slideToggle();
  });
})();