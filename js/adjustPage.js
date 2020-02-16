

(() => {
    let clientWidth = document.documentElement.clientWidth
    let svgCircle = document.getElementById('svgCircle');
    
    
    // This Section Sets Circle Lenth
    (() => {
        
        if(clientWidth >= 1800){
            svgCircle.setAttribute('r', '232px');
            svgCircle.setAttribute('cx', '240px');
            svgCircle.setAttribute('cy', '240px');
        }
        else if(clientWidth <= 500){
            svgCircle.setAttribute('r', '108px');
            svgCircle.setAttribute('cx', '111px');
            svgCircle.setAttribute('cy', '111px');
        }
        
        // Our Circle Initially Stoped
        svgCircle.style.webkitAnimationPlayState = "paused";
        
    })();
    
    // This Section Sets Animation to Set Timer Modal
    (() => {
        // set timer button
        document.getElementById('set_timer').addEventListener('click', function(){
            document.querySelector('.set_timmer_modal').style.animationName = "animatezoom";
            document.querySelector('.set_timmer_modal').style.display = "block";
        });
        
        // cancel modal button
        document.querySelector('.timer_cancel').addEventListener('click', function(){
            document.querySelector('.set_timmer_modal').style.animationName = "animatezoom2";
            setTimeout(() => document.querySelector('.set_timmer_modal').style.display = "none", 500)
        });
        
        // set modal button
        document.querySelector('.timer_set').addEventListener('click', function(){
            document.querySelector('.set_timmer_modal').style.animationName = "animatezoom2";
            setTimeout(() => document.querySelector('.set_timmer_modal').style.display = "none", 500)
            
            timerValue.setData();
            setTimerDuration();
        });
        
    })();
    
    // This Section Sets Animation to Daily Target
    (() => {
        let statistic = document.querySelector('.daily_target');
        let closeStat = document.querySelector('.statClick');
        let dayliTanimation = document.querySelector('.daily_target_animation');
        
        statistic.addEventListener('click', (event) => {
            
            
            if(event.target.classList[0] === 'statClick'){
                dayliTanimation.classList.add('daily_target_animation2');
                statistic.classList.remove('daily_target2');
                closeStat.style.display = 'none';
                dayliTanimation.style.left = '-100%';
            }
            else{
                dayliTanimation.classList.remove('daily_target_animation2');
                statistic.classList.add('daily_target2');
                closeStat.style.display = 'flex';
                dayliTanimation.style.left = '100%';
            }  
        });
         
    })();
    
    // Range slider Functionality
    (() => {
        let fadeLenth = document.querySelector('#fade');
        let timerValue = document.querySelector('.timer_value_number');
        fadeLenth.addEventListener('input', function(event){
        timerValue.innerText = `${fadeLenth.value}`;
        });
    })();
    
    // Check Boxes Functionality
    (() => {
        let checkWraper = document.querySelector('.repeat_checkboxes');
    
        checkWraper.addEventListener('click', function(e){
        
            if(e.target.classList[0] === 'repeat_circle'){
                if(e.target.classList[1] === 'checked'){
                    e.target.classList.remove('checked');
                }
                else{
                    e.target.classList.add('checked');
                }
            }
        });
        
    })();
    
    // Stop, Start, Abort Timer Functionality
    (() =>{
        document.querySelector('#circle').addEventListener('click', () =>{
            setTimeout(() => timer.changeState(), 500);
        });

        document.getElementById('abort').addEventListener('click', () =>{
            timer.reset();
        });
    })();
    
    // Break Control Funtinality
    (() => {
        let shortBrake = document.querySelector('.short_break');
        let skipBrake = document.querySelector('.skip_break');
        let breakBlock = document.querySelector('.break');
    
        shortBrake.addEventListener('click', function(){
            timer.setTimerDuration(5);
            timer.changeState();
            breakBlock.style.display = 'none';
            breakBlock.childNodes[1].classList.remove('break_animation');
        });
    
        skipBrake.addEventListener('click', function(){
            timer.setTimerDuration(timerValue.getWorkTime);
            breakBlock.style.display = 'none';
            breakBlock.childNodes[1].classList.remove('break_animation');
        });
        
    })();
    
    // ToDo Lists Scroll And Close Show Functionality
    (() => {
        
        let todo_icons = document.querySelectorAll('.todo_icons');
        todo_icons.forEach((item) => {
            item.addEventListener('click', function(){
                let todoBlock = document.querySelector(`.${this.dataset.note}`);
                if(todoBlock.classList[2] === 'hidde'){
                    todoBlock.classList.remove('hidde');
                    this.style.transform = 'rotate(0deg)';
                }
                else{
                    todoBlock.classList.add('hidde');
                    this.style.transform = 'rotate(80deg)';
                    console.log(todoBlock.childElementCount);
                }
                
            });
            
            let todoBlock = document.querySelector(`.${item.dataset.note}`);
            console.log(todoBlock.childElementCount);
            if(todoBlock.childElementCount > 6 && item.dataset.note === 'inprocess'){
                todoBlock.style.overflowY = 'scroll';
                todoBlock.style.height = '320px';
            }
            else if(todoBlock.childElementCount > 4 && item.dataset.note === 'completed'){
                todoBlock.style.overflowY = 'scroll';
                todoBlock.style.height = '220px';
            }
        });

    })();
    
    // Open Close Add Task Window
    (() => {
        let openTask = document.querySelector('.add_task_button');
        let addTask = document.querySelector('.add_task_form_wrapper');
        let backAdd = document.querySelector('.back_add_icon');
        
        openTask.addEventListener('click', function(){
            addTask.style.display = "block";
        });
        
        backAdd.addEventListener('click', function(){
            addTask.style.display = "none";
        });
    })();
    
    
    // This Code is Used to Manage Set Reminder Window
    (() => {

        let defaultActiveNumber = 'number12';
        let clockState = 'hour';
        let clock = document.querySelector('.clock');
        let cHand = document.querySelector('.clock_hand');
        let timeNumber = document.querySelector('.time_number');
        let clockOk = document.querySelector('.clock_ok');
        let reminderHour = 0;
        let reminderMin = 0;
        
        clock.addEventListener('click', function(event){
            let currentItem = event.target;
            if(event.target.classList[0] === 'number'){
                
                // here we set active and rotate our clock hand
                currentItem.classList.add('number_active');
                
                
                // here we set clock numbers value
                if(clockState === 'hour'){
                    reminderHour = currentItem.innerHTML;
                    cHand.style.transform = `rotate(${(currentItem.innerHTML * 30)}deg)`;
                    if(reminderHour < 10){
                        timeNumber.innerHTML = `0${reminderHour}:00`;
                    }
                    else if(reminderHour === '12'){
                        timeNumber.innerHTML = `00:00`;
                    }
                    else{
                        timeNumber.innerHTML = `${reminderHour}:00`;
                    }
                    
                }
                else if(clockState === 'minutes'){
                    if(reminderHour < 10)
                        timeNumber.innerHTML = `0${reminderHour}:`;
                    else
                        timeNumber.innerHTML = `${reminderHour}:`;
                    
                    cHand.style.transform = `rotate(${(currentItem.innerHTML * 6)}deg)`;
                    reminderMin = currentItem.innerText;
                    
                    if(reminderMin < 10){
                        timeNumber.innerHTML += `${reminderMin}`
                    }
                    else if(reminderMin === '60'){
                        timeNumber.innerHTML += `00`;
                    }
                    else{
                        timeNumber.innerHTML += `${reminderMin}`;
                    }
                    
                }
                
                // here we delete active by defaul active number
                if(event.target.classList[1] !== defaultActiveNumber){
                    document.querySelector(`.${defaultActiveNumber}`).classList.remove('number_active');
                    defaultActiveNumber = currentItem.classList[1];
                }
    
                
            }
            
        });
        
        let numbers = document.querySelectorAll('.number');
        let clokcOkState = 'firstStage';
        let clockWindow = document.querySelector('.clock_window');
        
        clockOk.addEventListener('click', function(){
            let step = 0;
            
            // here we change clock hours to minutes
            if(clokcOkState === 'firstStage'){
                
               numbers.forEach(function(item){
                    if(step < 10)
                        item.innerText = `0${step}`;
                    else
                        item.innerText = step;
                    
                    if(step === 0){
                        document.querySelector(`.${defaultActiveNumber}`).classList.remove('number_active');
                        item.classList.add('number_active');
                        cHand.style.transform = `rotate(${(0)}deg)`;
                        defaultActiveNumber = 'number12';
                    }
                    step += 5;
                });
                clockState = 'minutes';
                clokcOkState = 'secondStage';
            }
            else if(clokcOkState === 'secondStage'){
                clockWindow.style.display = 'none';
                console.log(reminderHour);
                console.log(reminderMin);
                clockState = 'hour';
                clokcOkState = 'firstStage';
                
                numbers.forEach(function(item, index){
                    if(index === 0)
                        item.innerText = 12;
                    else
                        item.innerText = index;
                    
                });
            }
            
            

            
        });
    
    })();
    
    
    
    
    
    document.querySelector('.remove_add_icon').addEventListener('click', function(){
        document.querySelector('.clock_window').style.display = 'flex';            
    });
    
    
    
    
    
    
    
    
    
    
    
})();


































