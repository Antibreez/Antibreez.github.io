'use strict';

(function () {
  var makeDragStart = function (onStartX, onMoveX, onEndX) {
    return function (evt) {
      evt.preventDefault();
      var startX = onStartX(evt) || 0;
      var x = 0;

      var onMouseMove = function (moveEvt) {
        moveEvt.preventDefault();
        x = startX + moveEvt.clientX - evt.clientX;
        onMoveX(x);
      };

      var onMouseUp = function (upEvt) {
        upEvt.preventDefault();
        onEndX(x);
        document.removeEventListener('mousemove', onMouseMove);
      };

      document.addEventListener('mousemove', onMouseMove);
      document.addEventListener('mouseup', onMouseUp, {once: true});
    };
  };

  window.EventUtil = {
    isEscapeKey: function (evt) {
      return evt.key === 'Esc' || evt.key === 'Escape';
    },

    isEnterKey: function (evt) {
      return evt.key === 'Enter';
    },

    isLeftKey: function (evt) {
      return evt.key === 'ArrowLeft' || evt.key === 'Left';
    },

    isRightKey: function (evt) {
      return evt.key === 'ArrowRight' || evt.key === 'Right';
    },

    isNotTarget: function (evt, element) {
      return evt.target !== element;
    },

    make: {
      makeDragStart: makeDragStart
    },

    debounce: function (onDelay, delay) {
      var timeoutId = 0;
      return function () {
        var params = arguments;

        if (timeoutId > 0) {
          clearTimeout(timeoutId);
        }

        var onTimeout = function () {
          onDelay.apply(null, params);
        };

        timeoutId = setTimeout(onTimeout, delay || DEBOUNCE_DELAY);
      };
    }
  };
})();
