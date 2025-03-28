'use strict'; 

$(window).resize(function(){
	
});


const data ={
	 display_days: document.getElementById('days'),
     display_hours: document.getElementById('hours'),
     display_minutes:document.getElementById('minutes'),
     display_seconds:document.getElementById('seconds'),
     
     daysMilliseconds: 0,
     startTime: 0,
     timePassed:0,
     timeLeft:0,
     daysLeft: 0,
     hoursLeft:0,
     minutesLeft:0,
     secondsLeft:0,

     reachedZero: false,
     intervalId:null,
     counterId: null,
     
     pause: document.getElementById('pause'),
     paused: false,
}


const addLeadingZero=(string,length)=>{
    if(typeof string !== String){
        string = String(string);
    }
    return string.padStart(length,'0');
}
const displayCountdown=(days,hours,minutes,seconds)=>{
    data.display_days.textContent = addLeadingZero(days,2);
    data.display_hours.textContent = addLeadingZero(hours,2);
    data.display_minutes.textContent = addLeadingZero(minutes,2);
    data.display_seconds.textContent = addLeadingZero(seconds,2);
}

const timePassed=()=>{
    //currentime - startime
    const currentdate = new Date();
    const currentime = currentdate.getTime();
    return currentime - data.startTime;
}
const updateMilliseconds=()=>{
     //data.daysMilliseconds = calculateMilliseconds(days) line 85.
     //difference between calculateMilliseconds(days) and timePassed()
      data.timePassed= timePassed();
      return data.daysMilliseconds - data.timePassed;    
}
const calculateMilliseconds=(days)=>{
    //1 day: 24 hours : 24 * 60 = 1440 minutes * 60 = 86400 seconds * 1000 = 86400000 milliseconds
    //so total number of milliseconds in number of (days) parameter.
    const millisecondsDays = parseInt(days) * 86400000;
    return millisecondsDays;
}

const updateValues=()=>{
    //convert data.timeLeft is in milliseconds to days , hours, minutes, and seconds remaining.
    // divide by 1000 is in seconds. 
    data.secondsLeft = data.timeLeft /1000;
    //convert secondsleft to number of days first, then hours, then minutes, and what's left is data.secondsLeft
    data.daysLeft = Math.floor((data.secondsLeft / 86400));
    let hoursMinutesSeconds = data.secondsLeft % 86400;
    //remainder becomes hours 
    data.hoursLeft = Math.floor(hoursMinutesSeconds / 3600);
    let minutesSeconds = hoursMinutesSeconds % 3600;
    data.minutesLeft = Math.floor(minutesSeconds / 60);
    data.secondsLeft = Math.ceil(minutesSeconds % 60);
    console.log(data.hoursLeft);
    
    //update reachedZero.
}

const removeEventListeners=()=>{

}
const addEventListeners=()=>{
    let counter=1;

    data.pause.addEventListener('click', (event) => {
        data.paused = !(data.paused);
        if(data.paused){
            pauseCountdown();
            data.counterId = setInterval(()=>{
                data.pause.innerHTML= `Continue (counter): ${counter}`;
                ++counter;
                if(!data.paused){
                   data.counterId=clearInterval(data.counterId);
                   data.pause.innerHTML= 'Pause';
                   counter=1;
                }
            },1000);
        }else if(!data.paused){
            //continue after pause.
            //When setInterval is restarted, updateMilliseconds (in startCountdown), calls timePassed , which gets the current time, 
            //startTime is once again subtracted from current time , so no extra calculations needed as this difference is all that's needed.
            data.intervalId = setInterval(startCountdown,1000);
        }
    });
}

const startCountdown=()=>{
    if(!data.reachedZero){
        const difference= updateMilliseconds();
        data.timeLeft = difference;
        updateValues();
     }else if(data.reachedZero){
        clearInterval(data.intervalId);
     }
    displayCountdown(data.daysLeft,data.hoursLeft,data.minutesLeft,data.secondsLeft); 
}
const pauseCountdown=()=>{
    data.intervalId = clearInterval(data.intervalId); 
}

const countDown=(days,hours,minutes,seconds)=>{
    //start countdown . At first start becomes days-1, 24 hours, 00 minutes, 00 seconds.
    displayCountdown(days,hours,minutes,seconds);
    data.intervalId = setInterval(startCountdown,1000);
}


$(window).on('load',function(){
    addEventListeners();
    const now= new Date();
    data.startTime = now.getTime();
    //initialize with start of 14 days.
    data.daysMilliseconds = calculateMilliseconds('14');
	countDown('14','00','00','00');
    //test with other start value.

});

