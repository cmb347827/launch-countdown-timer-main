'use strict'; 

$(window).resize(function(){
	
});


const data ={
	 display_days: document.getElementById('days'),
     display_hours: document.getElementById('hours'),
     display_minutes:document.getElementById('minutes'),
     display_seconds:document.getElementById('seconds'),
     
     totalSeconds: 0,
     startTime: 0,
     currentTime:0,
     timePassed:0,
     timeLeft:0,
     daysLeft: 0,
     hoursLeft:0,
     minutesLeft:0,
     secondsLeft:0,
     previousDaysLeft:0,
     previousHoursLeft:0,
     previousMinutesLeft:0,
     previousSecondsLeft:0,

     reachedZero: false,
     intervalId:null,
     counterId: null,
     
     pause: document.getElementById('pause'),
     paused: false,
     skip:'dont-skip',
     badValue:false,

     dayChange: false,
     hourChange: false,
     minuteChange: false,
     secondChange:false,
}


const addLeadingZero=(string,length)=>{
    if(typeof string !== String){
        string = String(string);
    }
    return string.padStart(length,'0');
}
const displayCountdown=(days,hours,minutes,seconds)=>{
    data.display_days.children[0].textContent = addLeadingZero(days,2);
    data.display_hours.children[0].textContent = addLeadingZero(hours,2);
    data.display_minutes.children[0].textContent = addLeadingZero(minutes,2);
    data.display_seconds.children[0].textContent = addLeadingZero(seconds,2);
}

const timePassed=()=>{
    //currentime - startime
    const currentdate = new Date();
    data.currentTime= currentdate.getTime();

    if(data.currentTime > data.startTime){
        return data.currentTime - data.startTime;
    }else if((data.currentTime ===data.startTime) || (data.currentTime < data.startTime)){
        return 0;
    }
}
const updateSeconds=()=>{
     //data.daysMilliseconds = calculateMilliseconds(days) line 85.
     //difference between calculateMilliseconds(days) and timePassed()
      data.timePassed= timePassed();

      if(data.totalSeconds>0){
           return data.totalSeconds - data.timePassed; 
      }else if((data.totalSeconds ===0) || (data.totalSeconds < 0)){
           return 0;
      }
          
}
const testisNanOrInfinite=(value)=>{
    value = Number.isFinite(value);          //returns false for any non-number input, such as Infinity, 0/0, NaN, 'NaN' etc
    if(!value){
       return true;
    }
}
const calculateMilliseconds=(...para)=>{
    //1 day: 24 hours : 24 * 60 = 1440 minutes * 60 = 86400 seconds * 1000 = 86400000 milliseconds
    //so total number of milliseconds in number of (days) parameter.
    
    let paras= [...para];
    let arr=[];
    //check to make sure only numbers entered. 
    //good practice again with rest parameters.
    for(let i=0;i<paras.length;++i){
        //Math.abs and Math.round will return NaN or Infinity if unable to convert to a positive number : with text string, symbols etc
        //-1, 1.99, -1.99 etc are converted to their positive , integer values.
        let val = Math.abs(paras[i]);
        val = Math.round(val);
        arr[i] = val;
        let result = testisNanOrInfinite(val);
        if(result){
            //found a string that can't be parsed to int.
            //set data.badValue to true to skip the rest of this function and will just default to all zeros as startCountdown never runs
            data.badValue=true;
            break;
        }
    }
    if(!data.badValue){
        
        let day = arr[0];
        let hour = arr[1];
        let minute = arr[2];
        let second = arr[3];

        if(second> 0){
            data.totalSeconds += second;
        }
        if(minute> 0){
            data.totalSeconds = minute * 60 + data.totalSeconds;
        }
        if(hour>0){
            data.totalSeconds=  hour * 60 * 60 + data.totalSeconds;
        }
        if(day>0){
            data.totalSeconds = day * 86400 + data.totalSeconds;
        }
        //return milliseconds
        return data.totalSeconds * 1000;
    }
}

const addFlips=(change,display)=>{
        if(change){
                
               //display.children[0].className=' flipTop';
           // display.className ='red-thick-font top-z-index flip';
            display.className ='red-thick-font top-z-index flipIn';
            // display.parentElement.className ='display-flex direction-column justify-content-flex-start align-items-center me-2 screen flipBottom';
            const timer =setTimeout(() => {
                display.className='red-thick-font top-z-index flipOut';
                //display.className ='red-thick-font top-z-index flipafter';
                //display.parentElement.className ='display-flex direction-column justify-content-flex-start align-items-center me-2 screen flipAfter';
            }, 500)
            //clearTimeout(timer);

        }else if(!change){ 
            display.className ='red-thick-font top-z-index';
            //display.children[0].className='';
            //display.parentElement.className ='display-flex direction-column justify-content-flex-start align-items-center me-2 screen ';
            
            //display.parentElement.className ='display-flex direction-column justify-content-flex-start align-items-center me-2 screen ';
        }
}
const updateValues=()=>{
    //convert data.timeLeft is in milliseconds to days , hours, minutes, and seconds remaining.
    // divide by 1000 is in seconds, as setinterval is standard in using milliseconds .
    data.secondsLeft = data.timeLeft/1000;

    //update reachedZero if all zeros 
    if(data.secondsLeft<=0){
        data.secondsLeft = 0;
        data.reachedZero=true;
        return;
    }
    //convert secondsleft to number of days first, then hours, then minutes, and what's left is data.secondsLeft
    data.daysLeft = Math.floor((data.secondsLeft / 86400));
    data.dayChange = (data.daysLeft===data.previousDaysLeft)?false:true;
    data.previousDaysLeft = data.daysLeft;
    //if data.previousDaysleft is not the same as data.daysLeft, the day screen should 'flip'. Set data.dayChange to true 
    addFlips(data.dayChange,data.display_days);

    let hoursMinutesSeconds = data.secondsLeft % 86400;
    //remainder becomes hours 
    data.hoursLeft = Math.floor(hoursMinutesSeconds / 3600);
    data.hourChange = (data.hoursLeft===data.previousHoursLeft)?false:true;
    data.previousHoursLeft= data.hoursLeft;
    addFlips(data.hourChange,data.display_hours);
    
    let minutesSeconds = hoursMinutesSeconds % 3600;

    data.minutesLeft = Math.floor(minutesSeconds / 60);
    data.minuteChange = (data.minutesLeft===data.previousMinutesLeft)?false:true;
    data.previousMinutesLeft = data.minutesLeft;
    addFlips(data.minuteChange,data.display_minutes);
   
    data.secondsLeft = Math.ceil(minutesSeconds % 60);
    data.secondChange= (data.secondsLeft===data.previousSecondsLeft)?false:true;
    data.previousSecondsLeft = data.secondsLeft;
    addFlips(data.secondChange,data.display_seconds);
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
                    //calculate timeleft here now, to save about 0.5-1 seconds so counter and continuing time line up better.
                    const currentdate = new Date();
                    data.currentTime = currentdate.getTime();     
                    data.timePassed= data.currentTime - data.startTime;               
                    data.timeLeft = data.totalSeconds - data.timePassed;
                    //clear counter setinterval id.
                   data.counterId=clearInterval(data.counterId);
                   data.pause.innerHTML= 'Pause';
                   counter=1;
                   data.skip='skip';
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
    if(!data.reachedZero && !(data.badValue)){
        //displayCountdown(days,hours,minutes,seconds);
        if(data.skip==='dont-skip'){
            const difference= updateSeconds();                
            data.timeLeft = difference;
            updateValues();
        } else if(data.skip==='skip'){
            updateValues();
            data.skip='dont-skip';
        }
     }else if(data.reachedZero || data.badValue){
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
    data.totalSeconds = calculateMilliseconds('14');
	countDown('14','00','00','00');

    //test with purposely wrong value: sock , returns NaN
    //data.totalSeconds = calculateMilliseconds('sock','01','01','10');
    // countDown('sock','01','01','10');

    //test with purposely wrong value: 0/0 , returns Infinity
    //data.totalSeconds = calculateMilliseconds(0/0,'01','01','10');
    //countDown('sock','01','01','10');

    //test with purposely wrong value: -9, will be converted to 9
    //data.totalSeconds = calculateMilliseconds('-9','01','01','10');
    //countDown('-9','01','01','10');
    
     //test with purposely wrong value: -1.99, will be converted to 2 
     //data.totalSeconds = calculateMilliseconds('-1.99','01','01','10');
     //countDown('-1.99','01','01','10');

    //test with some other values
    // data.totalSeconds = calculateMilliseconds('00','01','01','10');
    // countDown('00','01','01','10');
});

