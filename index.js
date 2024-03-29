//Default countdown times in minutes
const pomodoroDefault = 25;
const shortBreakDefault = 5;
const longBreakDefault = 15;

//Time Settings
var addtime = 0;
var holdtime = 0; //keep track of time left when paused
var page = 'pomodoro';
var timeinterval = null;
var pomodoro = pomodoroDefault;
var shortBreak = shortBreakDefault;
var longBreak = longBreakDefault;

//Identify divs that will need to be updated
const minDiv = document.querySelector('#minutes');
const secDiv = document.querySelector('#seconds');
const pomBtn = document.querySelector('#p');
const breakBtn = document.querySelector('#b');
const longBtn = document.querySelector('#j');

//Set clock for 1st pomodoro as default
loadClock('pomodoro');

//Event listeners for length of countdown
pomBtn.addEventListener('click', () => loadClock('pomodoro'));
breakBtn.addEventListener('click', () => loadClock('short'));
longBtn.addEventListener('click', () => loadClock('long'));

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
            pomBtn.classList.add('highlight');
            breakBtn.classList.remove('highlight');
            longBtn.classList.remove('highlight');
            break;
        case 'short':
            minDiv.innerHTML = ('0' + `${shortBreak}`).slice(-2);
            addtime = shortBreak*60*1000; 
            page = type;            
            pomBtn.classList.remove('highlight');
            breakBtn.classList.add('highlight');
            longBtn.classList.remove('highlight');
            break;
        case 'long':
            minDiv.innerHTML = ('0' + `${longBreak}`).slice(-2);
            addtime = longBreak*60*1000;
            page = type;
            pomBtn.classList.remove('highlight');
            breakBtn.classList.remove('highlight');
            longBtn.classList.add('highlight');
            break;
        default:
            minDiv.innerHTML = `${pomodoro}`;
            addtime = pomodoro*60*1000;
            page = 'pomodoro';
            pomBtn.classList.add('highlight');
            breakBtn.classList.remove('highlight');
            longBtn.classList.remove('highlight');
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
                document.querySelector('#boop').play();
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

function defaultTime() {
    pomodoro = pomodoroDefault;
    shortBreak = shortBreakDefault;
    longBreak = longBreakDefault;

    pomSettings.value = pomodoroDefault;
    shortSettings.value = shortBreakDefault;
    longSettings.value = longBreakDefault;
}

//Show settings menu
const gear = document.querySelector('#gear');
const settings = document.querySelector('#settings') 
gear.addEventListener('click', () => {
    if(settings.classList.contains('hidden')){
        settings.classList.remove('hidden');
    } else{
        settings.classList.add('hidden');
    }
})

//Change length of each timer based on input
const settingsForm = document.querySelector('#settings-form');
const pomSettings = document.querySelector('#pom-time');
const shortSettings = document.querySelector('#short-time');
const longSettings = document.querySelector('#long-time');

settingsForm.addEventListener('submit', (event) => {
    event.preventDefault();
    pomodoro = pomSettings.value;
    shortBreak = shortSettings.value;
    longBreak = longSettings.value;

    resetClock();
})

const defaultBtn = document.querySelector('#default-btn');
defaultBtn.addEventListener('click', () => {
    defaultTime();
    resetClock();
})