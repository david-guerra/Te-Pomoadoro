var displayStatus,minutesTimer,secondsTimer,minutes,seconds,time = 1500,timeStudy = 25,timeBreak = 5,timeOn = false,timerStatus = 'STUDY TIME!';

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
function alterMode(){
    if(timerStatus !== 'BREAK TIME!'){
        timerStatus = 'BREAK TIME!';
        setTime(timeBreak);
        document.getElementById('switch').innerHTML = "STUDY";
        timeOn = true;
        toggleTimer();
    }else{
        timerStatus = 'STUDY TIME!';
        setTime(timeStudy);
        document.getElementById('switch').innerHTML = "BREAK";
        timeOn = true;
        toggleTimer();
    }
    displayStatus.innerHTML = timerStatus;
}
function startTimer(){

    timer = setInterval(function(){
        setTimerDisplay();
        if(time !== 0){
            time--;
        }else{
            alterMode();
        }
    },1000);
}

function toggleTimer(){
    if(timeOn){
        timeOn = false;
        document.getElementById("run-state").innerHTML = "START";
        clearInterval(timer);

    }else{
        timeOn = true;
        document.getElementById("run-state").innerHTML = "PAUSE";
        startTimer();

    }
    console.log(document.getElementById("main-container").classList);

}
function main(){
    displayStatus = document.getElementById("status");
    minutesTimer = document.getElementById("minutes");
    secondsTimer = document.getElementById("seconds");
    document.getElementById('reset').onclick = resetTimer;
    document.getElementById('switch').onclick = alterMode;
    document.getElementById('run-state').onclick = toggleTimer;
    document.body.onkeydown = function(e){
        console.log(e.key);
        if(e.key === 'z'){
            toggleTimer();
        }
        if(e.key === 'x'){
            alterMode();
        }
        if(e.key === 'c'){
            resetTimer();
        }
    }

}
main();