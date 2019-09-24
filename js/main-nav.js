var menu = document.querySelector('.main-nav');
var toggleButton = menu.querySelector('.main-nav__toggle');

var onToggleClick = function (evt) {
  evt.preventDefault();
  menu.classList.toggle('main-nav--closed');
  menu.classList.toggle('main-nav--opened');
}

toggleButton.addEventListener('click', onToggleClick);

var audio = document.querySelector('audio');

console.log(audio);

audio.addEventListener('loadedmetadata', function () {

  var duration = audio.duration;
  var date = new Date(duration * 1000);
  var minutes = date.getMinutes();
  var seconds = date.getSeconds();

  console.log(audio.duration);
  console.log(minutes);

  console.log(seconds);
  console.log(minutes + ':' + (Math.floor(seconds / 10) === 0 ? ('0' + seconds) : seconds));

});

audio.addEventListener('timeupdate', function () {
  console.log(audio.currentTime);
})


