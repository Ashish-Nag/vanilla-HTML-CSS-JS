// To make the countdown timer work we need to have an ending date, get todays date and subtract to get the remaining hours and days.

const daysEl = document.getElementById("days");
const hoursEl = document.getElementById("hours");
const minutesEl = document.getElementById("minutes");
const secondsEl = document.getElementById("seconds");

const endDate = '21 feb 2022';

function countdown() {
    const endingDate = new Date(endDate);
    const currentDate = new Date();
    let seconds = (endingDate - currentDate) / 1000;

    let days = Math.floor(seconds / 3600 / 24);
    let hours = Math.floor(seconds / 3600) % 24;
    let minutes = Math.floor(seconds / 60) % 60;
    let remainingSeconds = Math.floor(seconds) % 60;

    daysEl.innerHTML = formatTime(days);
    hoursEl.innerHTML = formatTime(hours);
    minutesEl.innerHTML = formatTime(minutes);
    secondsEl.innerHTML = formatTime(remainingSeconds);
}

function formatTime(time) {
    return time < 10 ? `0${time}` : time;
}

// Initial call
countdown();


setInterval(countdown, 1000);
