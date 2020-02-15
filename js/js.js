"use strict"
class CountUpTimer{
    constructor(){
        // first of all we need a bolean to keep track of our timer state
        this.active = false;
        this.timer = document.querySelector('#countDownTimer');
        this.circle = document.getElementById('svgCircle');
        this.stateTile = document.querySelector('#stay_state');
        this.arr = this.timer.innerHTML.split(':'); // splitting our timmer into array by ':', so min goes to arr[0], sec goes to arr[1]
        this.min = this.arr[0];
        this.sec = this.arr[1];
        this.duration = 0;
    }
    
    startTimer(){
        if(this.active){
            if(this.sec == 59){
                this.min++;
                this.sec = 0;
                if(this.min < 10) 
                    this.min = `0${this.min}`;
            }
            else{
                this.sec++;
                if(this.sec < 10)
                    this.sec = `0${this.sec}`;
            }
            
            /**********************Show brake form********************************/
            if(this.duration == 5 || this.duration == 15){
                if(`0${this.duration}` == this.min || this.duration == this.min){
                    this.reset();
                    setTimerDuration();
                }
            }
            else{
                if(`0${this.duration}` == this.min || this.duration == this.min){
                    showBreak();
                    this.reset();
                }
            }
            
            /**********************Show brake form********************************/
            
            setTimeout(this.startTimer.bind(this), 1000);
            this.timer.innerHTML = `${this.min}:${this.sec}`;
        } 
    }

    changeState(){
        if(this.active == false){
            this.active = true;
            this.stateTile.innerText = "Stay Focused!";
            this.startTimer();
            this.circle.style.webkitAnimationPlayState = "running";
        }
        else{
            this.stateTile.innerText = "Continue Work!";
            this.active = false;
            this.circle.style.webkitAnimationPlayState = "paused";
        }
        
    }
    
    reset(){
        this.timer.innerHTML = "00:00";
        this.min = "00";
        this.sec = "00";
        this.active = false; 
        let newCircle = this.circle.cloneNode(true);
        this.circle.parentNode.replaceChild(newCircle, this.circle);
        this.circle = newCircle;
        this.circle.style.webkitAnimationPlayState = "paused";
    }
    
    setTimerDuration(duration){
        this.circle.style.animationDuration = `${(duration * 60) - 1}s`;
        this.duration = duration;
        this.reset();
    }
}


class SetTimer{
    timerGoal;
    workTime;
    repeatNumber;
    
    get getGoal(){
        if(this.timerGoal){
            return this.timerGoal;
        }
        else{
            return undefined;
        }
    }
    
    
    get getWorkTime(){
        if(this.workTime){
            return this.workTime;
        }
        else{
            return undefined;
        }
    }
    
    get getRepeatNumber(){
        if(this.repeatNumber){
            return this.repeatNumber;
        }
        else{
            return undefined;
        }
    }
    
    setData(){
        this.timerGoal = document.querySelector('.set_goal').value;
        this.workTime =  document.querySelector('#fade').value;
        let repeatCircles = document.querySelectorAll('.repeat_circle');
        this.repeatNumber = 0;
        
        repeatCircles.forEach((item) => {
            if(item.classList[1] == 'checked'){
                this.repeatNumber++;
            }
        });
         
    }
    
}




let timer = new CountUpTimer();
let timerValue = new SetTimer();


 
