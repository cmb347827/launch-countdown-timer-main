'use strict'; 

$(window).resize(function(){
	
});


const data ={
	 days: document.getElementById('days'),
     hours: document.getAnimations('hours'),
     minutes:document.getElementById('minutes'),
     seconds:document.getElementById('seconds'),
}


function addListener(){
	// Set up event listeners for next and previous buttons
    //document.getElementById('nextBtn').addEventListener('click', nextSlide);
    //document.getElementById('prevBtn').addEventListener('click', previousSlide);
}

const countDown=(days,hours,minutes,seconds)=>{
    //start countdown . At first start becomes days-1, 24 hours, 00 minutes, 00 seconds.
    data.days.textContent = Number(days);
}


$(window).on('load',function(){
    //initialize with start of 14 days.
	countDown('14','00','00','00');
    
});

