//Default countdown times in minutes
const pomodoro = 25;
const shortBreak = 5;
const longBreak = 15;

//Set clock for 1st pomodoro as default
loadClock('pomodoro');

document.querySelector('#p').addEventListener('click', () => loadClock('pomodoro'));
document.querySelector('#b').addEventListener('click', () => loadClock('short'));
document.querySelector('#j').addEventListener('click', () => loadClock('long'));

//if hit pause, then save time left as variable
//reset will update clock to 25 minutes
//need buttons for break time or automatically go to break time after main clock goes down

function loadClock(type){
    const clockDiv = document.querySelector('#time-div');
    const min = clockDiv.querySelector('#minutes');
    const sec = clockDiv.querySelector('#seconds');
    var addtime = 0;

    switch (type){
        case 'pomodoro':
            min.innerHTML = ('0' + `${pomodoro}`).slice(-2);
            addtime = pomodoro*60*1000;
            break;
        case 'short':
            min.innerHTML = ('0' + `${shortBreak}`).slice(-2);
            addtime = shortBreak*60*1000;
            break;
        case 'long':
            min.innerHTML = ('0' + `${longBreak}`).slice(-2);
            addtime = longBreak*60*1000;
            break;
        default:
            min.innerHTML = `${pomodoro}`;
            addtime = pomodoro*60*1000;
    }
    
    sec.innerHTML = '00';

    // return{
    //     addtime
    // };

    //Event listeners to start, pause, or reset the timer
    document.querySelector('#start').addEventListener('click', () => initializeClock(addtime));
    // document.querySelector('#pause').addEventListener('click', pause);
    // document.querySelector('#reset').addEventListener('click', reset_timer);
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
    const clock = document.querySelector('#time-div');
    const mdiv = clock.querySelector('#minutes');
    const sdiv = clock.querySelector('#seconds');

    //Determine the exact end time for the countdown
    const time = new Date(Date.parse(new Date()) + addtime);

    function updateClock() {
        const t = countdown(time);

        mdiv.innerHTML = ('0' + t.minutes).slice(-2);
        sdiv.innerHTML = ('0' + t.seconds).slice(-2);

        if (t.total <= 0) {
        clearInterval(timeinterval);
        }
    }

    updateClock();
    const timeinterval = setInterval(updateClock, 1000);
}