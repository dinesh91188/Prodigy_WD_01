// Get the HTML elements
const display = document.getElementById('display');
const startBtn = document.getElementById('startBtn');
const pauseBtn = document.getElementById('pauseBtn');
const resetBtn = document.getElementById('resetBtn');
const lapBtn = document.getElementById('lapBtn');
const lapsList = document.getElementById('laps');

// Variables to keep track of time
let startTime;
let elapsedTime = 0;
let timerInterval;
let lapCounter = 1;

// Function to turn numbers into text (like 00:00:00.00)
function timeToString(time) {
    let diffInHrs = time / 3600000;
    let hh = Math.floor(diffInHrs);

    let diffInMin = (diffInHrs - hh) * 60;
    let mm = Math.floor(diffInMin);

    let diffInSec = (diffInMin - mm) * 60;
    let ss = Math.floor(diffInSec);

    let diffInMs = (diffInSec - ss) * 100;
    let ms = Math.floor(diffInMs);

    let formattedHH = hh.toString().padStart(2, "0");
    let formattedMM = mm.toString().padStart(2, "0");
    let formattedSS = ss.toString().padStart(2, "0");
    let formattedMS = ms.toString().padStart(2, "0");

    return `${formattedHH}:${formattedMM}:${formattedSS}.${formattedMS}`;
}

// Function to start the stopwatch
function start() {
    startTime = Date.now() - elapsedTime;
    timerInterval = setInterval(function printTime() {
        elapsedTime = Date.now() - startTime;
        display.innerText = timeToString(elapsedTime);
    }, 10); // Updates every 10 milliseconds
}

// Function to pause the stopwatch
function pause() {
    clearInterval(timerInterval);
}

// Function to reset everything back to zero
function reset() {
    clearInterval(timerInterval);
    display.innerText = "00:00:00.00";
    elapsedTime = 0;
    lapsList.innerHTML = ""; // Clears the laps
    lapCounter = 1;
}

// Function to record a lap
function recordLap() {
    let li = document.createElement("li");
    li.innerText = `Lap ${lapCounter}: ${timeToString(elapsedTime)}`;
    lapsList.appendChild(li);
    lapCounter++;
}

// Connect the buttons to the functions
startBtn.addEventListener("click", start);
pauseBtn.addEventListener("click", pause);
resetBtn.addEventListener("click", reset);
lapBtn.addEventListener("click", recordLap);