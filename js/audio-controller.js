'use strict';

(function (
  EventUtil
) {
  var makeDragStart = EventUtil.make.makeDragStart;

  var playlist = document.querySelector('.latter-compositions__playlist');
  var playerControls = document.querySelectorAll('.player-control');
  var audioSources = playlist.querySelectorAll('audio');
  var audioSourcesArray = Array.prototype.slice.call(audioSources);
  var controlButtons = playlist.querySelectorAll('.player-control__toggle');
  var totalBars = playlist.querySelectorAll('.player-control__bar');
  var progressBars = playlist.querySelectorAll('.player-control__progress-bar');
  var timePins = playlist.querySelectorAll('.player-control__pin');
  var currentTimes = playlist.querySelectorAll('.player-control__current-time');
  var totalTimes = playlist.querySelectorAll('.player-control__total-time');

  var lengthRatio = [];
  var currentPinNum = 0;

  var getWidthValue = function (element) {
    return +window.getComputedStyle(element).width.slice(0, -2);
  };

  var barLength = getWidthValue(totalBars[0]) - getWidthValue(timePins[0]);

  var EffectLineRect = {
    LEFT: 0,
    RIGHT: barLength
  };

  var pinOffset = getWidthValue(timePins[0]) / 2;

  for (var i = 0; i < controlButtons.length; i++) {
    controlButtons[i].setAttribute('id', i);
  };

  audioSources.forEach(function (audioSource, idx) {
    var onLoadMetaData = function () {
      var duration = audioSource.duration;

      totalTimes[idx].textContent = getTime(duration);
      lengthRatio[idx] = barLength / duration;
      audioSource.removeEventListener('loadedmetadata', onLoadMetaData);
    }
    audioSource.addEventListener('loadedmetadata', onLoadMetaData);
  });

  var onPinStartX = function (evt) {
    var idx = currentPinNum;
    if (controlButtons[idx].classList.contains('player-control__toggle--playing')) {
      audioSources[idx].pause();
    }

    return timePins[idx].offsetLeft;
  };

  var canPinMove = function (x, moveEvt) {
    return x >= EffectLineRect.LEFT
      && x <= EffectLineRect.RIGHT;
  };

  var pinMoveX = function (x) {
    timePins[currentPinNum].style.left = x + 'px';
    progressBars[currentPinNum].style.width = x + 'px';
  };

  var onPinMoveX = function (x, moveEvt) {
    console.log(canPinMove(x, moveEvt));

    return canPinMove(x, moveEvt) && pinMoveX(x, moveEvt);
  };

  var onPinEndX = function (x) {
    var idx = currentPinNum;
    if (controlButtons[idx].classList.contains('player-control__toggle--playing')) {
      audioSources[idx].play();
    }

    audioSources[idx].currentTime = x * audioSources[idx].duration / barLength;
  };

  var onPinDrag = makeDragStart(onPinStartX, onPinMoveX, onPinEndX);

  var onBarClick = function (evt) {
    var x = evt.offsetX - pinOffset;
    x = x < 0 ? 0 : x;
    x = x > EffectLineRect.RIGHT ? EffectLineRect.RIGHT : x;

    pinMoveX(x);
    onPinEndX(x);
  };

  var getTime = function (time) {
    var data = new Date(time * 1000);
    var minutes = data.getMinutes();
    var seconds = data.getSeconds();

    seconds = Math.floor(seconds / 10) === 0 ? '0' + seconds : seconds;

    return minutes + ':' + seconds;
  };

  var renderPlayerControl = function (time, idx) {
    var pin = timePins[idx];
    var progressBar = progressBars[idx];
    var currentTime = currentTimes[idx];

    pin.style.left = time === 0
      ? 0
      : Math.floor(time * lengthRatio[idx]) + 'px';

    progressBar.style.width = pin.style.left;
    currentTime.textContent = getTime(time);
  };

  var stopPlayer = function (controlButton, idx) {
    if (controlButton.classList.contains('player-control__toggle--current')) {
      var audio = audioSources[idx];
      if (!audio.paused) {
        audio.pause();
      }

      audio.currentTime = 0;
      renderPlayerControl(0, idx);
      controlButton.classList.remove('player-control__toggle--current');
      timePins[idx].removeEventListener('mousedown', onPinDrag);
      totalBars[idx].removeEventListener('click', onBarClick);
      audioSources[idx].removeEventListener('ended', onAudioEnded);
      if (controlButton.classList.contains('player-control__toggle--playing')) {
        controlButton.classList.remove('player-control__toggle--playing');
      }
    }
  }

  var stopPlayers = function () {
    controlButtons.forEach(function (controlButton, idx) {
      stopPlayer(controlButton, idx);
    });
  };

  var onPlaying = function (evt) {
    renderPlayerControl(evt.target.currentTime, audioSourcesArray.indexOf(evt.target));
  };

  var onAudioEnded = function (evt) {
    var idx = audioSourcesArray.indexOf(evt.target);
    renderPlayerControl(0, audioSourcesArray.indexOf(evt.target));
    controlButtons[idx].classList.remove('player-control__toggle--playing');
  };

  var onPlaylistClick = function (evt) {
    if (evt.target.classList.contains('player-control__toggle')) {
      var target = evt.target;
      var idx = target.id;

      if (!target.classList.contains('player-control__toggle--current')) {
        currentPinNum = idx;
        stopPlayers();
        target.classList.add('player-control__toggle--current');
        timePins[idx].addEventListener('mousedown', onPinDrag);
        totalBars[idx].addEventListener('click', onBarClick);
        audioSources[idx].addEventListener('ended', onAudioEnded);
      }

      if (target.classList.contains('player-control__toggle--playing')) {
        audioSources[idx].pause();
        audioSources[idx].removeEventListener('timeupdate', onPlaying);
      } else {
        audioSources[idx].play();
        audioSources[idx].addEventListener('timeupdate', onPlaying);
      }

      evt.target.classList.toggle('player-control__toggle--playing');
    }
  }


  playlist.addEventListener('click', onPlaylistClick);


  //--------------------------------------
  // var audio = document.querySelector('audio');

  // console.log(audio.duration);

  // audio.addEventListener('loadedmetadata', function () {

  //   var duration = audio.duration;
  //   var date = new Date(duration * 1000);
  //   var minutes = date.getMinutes();
  //   var seconds = date.getSeconds();

  //   console.log(audio.duration);
  //   console.log(minutes);

  //   console.log(seconds);
  //   console.log(minutes + ':' + (Math.floor(seconds / 10) === 0 ? ('0' + seconds) : seconds));

  // });

  // audio.addEventListener('timeupdate', function () {
  //   console.log(audio.currentTime);
  // })
})(
  window.EventUtil
);


