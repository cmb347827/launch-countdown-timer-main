'use strict'; 

$(window).resize(function(){
	
});


const data ={
	 display_days: document.getElementById('days'),
     display_hours: document.getAnimations('hours'),
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

}


const addLeadingZero=(string,length)=>{
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
    data.timePassed = currentime - data.startTime;
}
const updateMilliseconds=()=>{
     //data.daysMilliseconds = calculateMilliseconds(days) line 85.
     //difference between calculateMilliseconds(days) and timePassed()
      data.timeLeft = data.daysMilliseconds - data.timePassed;             
     //displayCountdown  , call with string values for days,hours,minutes and seconds.
}
const calculateMilliseconds=(days)=>{
    //1 day: 24 hours : 24 * 60 = 1440 minutes * 60 = 86400 seconds * 1000 = 86400000 milliseconds
    //so total number of milliseconds in number of (days) parameter.
    const millisecondsDays = parseInt(days) * 86400000;
    return millisecondsDays;
}

const updateValues=()=>{
    console.log(data.timeLeft);
    //convert milliseconds to days , hours, minutes, and seconds remaining.
}

const countDown=(days,hours,minutes,seconds)=>{
    //start countdown . At first start becomes days-1, 24 hours, 00 minutes, 00 seconds.
    displayCountdown(days,hours,minutes,seconds);
    
    setInterval(() => {
        if(!data.reachedZero){
            //asynchronous calls ...............
            timePassed();
            updateMilliseconds();
            updateValues();
        } else if(data.reachedZero){
            //should be all zeros.
            displayCountdown(data.days,data.hours,data.minutes,data.seconds); 
        }
       
    }, 1000);

   


}


$(window).on('load',function(){
    
    const now= new Date();
    data.startTime = now.getTime();
    //initialize with start of 14 days.
    data.daysMilliseconds = calculateMilliseconds('14');
	countDown('14','00','00','00');
    //test with other start value.
});

