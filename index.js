
const jsConfetti = new JSConfetti();

var initState = false,alarm,displayStatus,minutesTimer,timer = null,secondsTimer,minutes,seconds,time = 1500,timeStudy = 25,timeBreak = 5,timeOn = false,timerStatus = 'STUDY TIME!';
var studySlider,breakSlider;
function setTimerDisplay(){
    minutes = Math.floor(time/60);
    seconds = time%60;
    minutesTimer = minutes<10?"0"+minutes.toString():minutes.toString();
    secondsTimer = seconds<10?"0"+seconds.toString():seconds.toString();
    document.getElementById("minutes").innerHTML = minutesTimer;
    document.getElementById("seconds").innerHTML = secondsTimer;
}
function setTime(nuevoTime){
    time = nuevoTime*60;
    setTimerDisplay();
}
function setSliderTime(){
    timeStudy = studySlider.value;
    timeBreak = breakSlider.value;
    document.getElementById("study-time-span").innerHTML = studySlider.value;
    document.getElementById("break-time-span").innerHTML = breakSlider.value;

    resetTimer();
}
function updateSliderTextStudy(val){
    console.log("HOla");
    document.getElementById("study-time-span").innerHTML = val;
}
function updateSliderTextBreak(val){
    document.getElementById("break-time-span").innerHTML = val;
}
function resetTimer(){
    if (timerStatus === 'STUDY TIME!'){
        setTime(timeStudy);
        timeOn = true;
        toggleTimer();
    }else{
        setTime(timeBreak);
        timeOn = true;
        toggleTimer();
    }
}
function alterModeButton()
{
    timeOn = true;
    alterMode();
    resetTimer();
}
function alterMode(){
    if(timerStatus !== 'BREAK TIME!'){
        timerStatus = 'BREAK TIME!';
        setTime(timeBreak);
        document.getElementById('switch').innerHTML = "STUDY";
    }else{
        timerStatus = 'STUDY TIME!';
        setTime(timeStudy);
        document.getElementById('switch').innerHTML = "BREAK";
    }
    displayStatus.innerHTML = timerStatus;
}
function startTimer(){

    console.log("Inicio de conteo");
    timer = setInterval(function(){
        console.log("time"+time);
        setTimerDisplay();
        if(time !== 0){
            time--;
        }else{
            jsConfetti.addConfetti({
                emojis: ['⭐️','🌸','✨','🎉'],
                emojiSize: 50,
                confettiNumber: 70,
            });
            alarm.play();
            console.log("Cambio de turno");
            alterMode();
        }
    },1000);
}

function pauseTimer(){
    timeOn = false;
    document.getElementById("run-state").innerHTML = "START";
    clearInterval(timer);
}

function toggleTimer(){
    displayStatus.innerHTML = timerStatus;
    if(timeOn){
        studySlider.disabled = false;
        breakSlider.disabled = false;
        pauseTimer();
    }else{
        timeOn = true;
        document.getElementById("run-state").innerHTML = "PAUSE";
        studySlider.disabled = true;
        breakSlider.disabled = true;
        startTimer();

    }
}
function main(){
    alarm = new Audio('/sounds/callto.mp3');
    displayStatus = document.getElementById("status");
    minutesTimer = document.getElementById("minutes");
    secondsTimer = document.getElementById("seconds");
    studySlider = document.getElementById("study-slider");
    breakSlider = document.getElementById("break-slider");
    studySlider.oninput = setSliderTime;
    breakSlider.oninput = setSliderTime;
    document.getElementById('reset').onclick = resetTimer;
    document.getElementById('switch').onclick = alterModeButton;
    document.getElementById('run-state').onclick = toggleTimer;
    document.body.onkeydown = function(e){
        console.log(e.key);
        if(e.key === 'z'){
            toggleTimer();
        }
        if(e.key === 'x'){
            alterModeButton();
        }
        if(e.key === 'c'){
            resetTimer();
        }
    }

}
setTime(timeStudy);


main();