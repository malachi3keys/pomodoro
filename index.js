//Default countdown times in minutes
const pomodoro = 25;
const shortBreak = 5;
const longBreak = 15;

//Time memory
var addtime = 0;
var holdtime = 0; //keep track of time left when paused
var page = 'pomodoro';
var timeinterval = null;

//Identify divs that will need to be updated
const minDiv = document.querySelector('#minutes');
const secDiv = document.querySelector('#seconds');

//Set clock for 1st pomodoro as default
loadClock('pomodoro');

//Event listeners for length of countdown
document.querySelector('#p').addEventListener('click', () => loadClock('pomodoro'));
document.querySelector('#b').addEventListener('click', () => loadClock('short'));
document.querySelector('#j').addEventListener('click', () => loadClock('long'));

//Event listeners to start, pause, or reset the timer
document.querySelector('#start').addEventListener('click', () => initializeClock(addtime));
document.querySelector('#pause').addEventListener('click', pauseClock);
document.querySelector('#reset').addEventListener('click', resetClock);

function loadClock(type) {
    // Stop any running timer when switching to another one 
    if (timeinterval) {
        clearClock();
    }

    //Update clock based on timer selection
    switch (type) {
        case 'pomodoro':
            minDiv.innerHTML = ('0' + `${pomodoro}`).slice(-2);
            addtime = pomodoro*60*1000;
            page = type;
            break;
        case 'short':
            minDiv.innerHTML = ('0' + `${shortBreak}`).slice(-2);
            addtime = shortBreak*60*1000; 
            page = type;            break;
        case 'long':
            minDiv.innerHTML = ('0' + `${longBreak}`).slice(-2);
            addtime = longBreak*60*1000;
            page = type;
            break;
        default:
            minDiv.innerHTML = `${pomodoro}`;
            addtime = pomodoro*60*1000;
            page = 'pomodoro';
    }
   
    secDiv.innerHTML = '00';
}

function countdown(time) {
    const total = Date.parse(time) - Date.parse(new Date());
    const seconds = Math.floor((total / 1000) % 60);
    const minutes = Math.floor((total / 1000 / 60) % 60);
    
    return {
      total,
      minutes,
      seconds
    };
}
  
function initializeClock(addtime) {
    //Prevent start of multiple countdowns
    if (!timeinterval) {
        //Determine the exact end time for the countdown
        const time = new Date(Date.parse(new Date()) + addtime);

        function updateClock() {
            const t = countdown(time);
            holdtime = t.total;

            minDiv.innerHTML = ('0' + t.minutes).slice(-2);
            secDiv.innerHTML = ('0' + t.seconds).slice(-2);

            if (t.total <= 0) {
                clearClock();
            }
        }

        updateClock();
        timeinterval = setInterval(updateClock, 1000);
    }     
}

function pauseClock() {
    if (timeinterval) {
        clearClock();
        addtime = holdtime;    
    }     
}

function resetClock() {
    clearClock();

    //Update clock based on current selected timer
    loadClock(page);
}

function clearClock() {
    clearInterval(timeinterval);
    timeinterval = null;
}