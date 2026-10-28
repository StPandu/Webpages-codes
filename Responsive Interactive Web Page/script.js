/* Create Welcome text at the top */

const studentName = "Alexandru Chiriac";

document.getElementById("welcomeMessage").textContent =
    `Welcome, ${studentName}!`;


    /* Create Button to Count ammount of study session */
let count = 0;

const counterText = document.getElementById("sessionCount");
const addBtn = document.getElementById("addBtn");
const resetBtn = document.getElementById("resetBtn");

function updateCounter() {
    counterText.textContent =
        `Study sessions today: ${count}`;
}

addBtn.addEventListener("click", function () {
    count++;
    updateCounter();
});

resetBtn.addEventListener("click", function () {
    count = 0;
    updateCounter();
});

/* Create goal button to show goals */
const goals = [
    "Read notes",
    "Finish lab",
    "Practice JavaScript"
];

for (let i = 0; i < goals.length; i++) {
    console.log(goals[i]);
}

const showGoalsBtn = document.getElementById("showGoalsBtn");
const goalOutput = document.getElementById("goalOutput");

showGoalsBtn.addEventListener("click", function () {

    goalOutput.innerHTML = "";

    goals.forEach(function(goal) {
        const li = document.createElement("li");
        li.textContent = goal;
        goalOutput.appendChild(li);
    });
});

/* Create logs to see if made good progress based on how many hours studdied */
const hoursStudied = 3;

if (hoursStudied >= 3) {
    console.log("Good progress");
} else {
    console.log("You should study more");
}


