import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import Notiflix from 'notiflix';

const startBtn = document.querySelector('[data-start]');
const daysCounter = document.querySelector('[data-days]');
const hoursCounter = document.querySelector('[data-hours]');
const minutesCounter = document.querySelector('[data-minutes]');
const secondsCounter = document.querySelector('[data-seconds]');
let intervalId = null;

startBtn.disabled = true;
document.body.style = 'animation: color 9s infinite linear';

function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = Math.floor(ms / day);
  // Remaining hours
  const hours = Math.floor((ms % day) / hour);
  // Remaining minutes
  const minutes = Math.floor(((ms % day) % hour) / minute);
  // Remaining seconds
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    console.log(selectedDates[0]);

    if (selectedDates[0] <= new Date()) {
      Notiflix.Notify.failure('Please choose a date in the future');
      startBtn.disabled = true;
    } else {
      startBtn.disabled = false;
      startBtn.addEventListener('click', () => {
        timerStarter(selectedDates[0]);
      });
    }
  },
};

flatpickr('#datetime-picker', options);

function timerStarter(chosenDate) {
  clearInterval(intervalId);
  siteCleaner();

  intervalId = setInterval(() => {
    let currentTime = Date.now();
    let diferenceTime = chosenDate - currentTime;

    siteFiller(diferenceTime);
  }, 1000);
}

function addLeadingZero(value) {
  return String(value).padStart(2, '0');
}

function siteFiller(date) {
  const { days, hours, minutes, seconds } = convertMs(date);

  secondsCounter.textContent = addLeadingZero(seconds);
  minutesCounter.textContent = addLeadingZero(minutes);
  hoursCounter.textContent = addLeadingZero(hours);
  daysCounter.textContent = addLeadingZero(days);
}

function siteCleaner() {
  secondsCounter.textContent = '00';
  minutesCounter.textContent = '00';
  hoursCounter.textContent = '00';
  daysCounter.textContent = '00';
}
