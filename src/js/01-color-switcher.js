const startBtn = document.querySelector('[data-start]');
const stopBtn = document.querySelector('[data-stop]');
let intervalId = null;
stopBtn.disabled = true;

startBtn.addEventListener('click', colorChangeStarter);
stopBtn.addEventListener('click', colorChangeStoper);

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215)
    .toString(16)
    .padStart(6, 0)}`;
}

function colorPicker() {
  document.body.style.backgroundColor = getRandomHexColor();
}

function colorChangeStarter() {
  colorPicker();
  intervalId = setInterval(colorPicker, 1000);
  startBtn.disabled = true;
  stopBtn.disabled = false;
}

function colorChangeStoper() {
  clearInterval(intervalId);
  startBtn.disabled = false;
  stopBtn.disabled = true;
}
