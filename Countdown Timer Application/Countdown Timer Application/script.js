let timeLeft = 60;
let timer;
let running = false;

const timerDisplay = document.getElementById("timer");
const startBtn = document.getElementById("startBtn");
const pauseBtn = document.getElementById("pauseBtn");
const stopBtn = document.getElementById("stopBtn");

function updateTimer(){
    timerDisplay.textContent = timeLeft;

    if(timeLeft <= 15){
        timerDisplay.style.color = "red";
        timerDisplay.style.backgroundColor = "rgba(0,0,0,0.3)";
        timerDisplay.style.padding = "5px";
        timerDisplay.style.borderRadius = "5px";
    }

    if(timeLeft === 0){
        clearInterval(timer);
        alert("Times up. Take a short break.");
        resetTimer();
    }

    timeLeft--;
}

function startTimer(){

    timer = setInterval(updateTimer,1000);
    running = true;

    startBtn.disabled = true;
    pauseBtn.disabled = false;
    stopBtn.disabled = false;
}

function pauseTimer(){

    if(running){
        clearInterval(timer);
        pauseBtn.textContent = "Resume";
        running = false;
    }
    else{
        timer = setInterval(updateTimer,1000);
        pauseBtn.textContent = "Pause";
        running = true;
    }

}

function stopTimer(){
    clearInterval(timer);
    resetTimer();
}

function resetTimer(){
    timeLeft = 60;
    timerDisplay.textContent = timeLeft;

    timerDisplay.style.color = "white";
    timerDisplay.style.backgroundColor = "transparent";

    startBtn.disabled = false;
    pauseBtn.disabled = true;
    stopBtn.disabled = true;

    pauseBtn.textContent = "Pause";
}

startBtn.addEventListener("click",startTimer);
pauseBtn.addEventListener("click",pauseTimer);
stopBtn.addEventListener("click",stopTimer);