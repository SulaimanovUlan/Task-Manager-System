function showBreak(){
    
    let breakBlock = document.querySelector('.break');
    breakBlock.style.display = 'flex';
    breakBlock.childNodes[1].classList.add('break_animation');
    
}

function setTimerDuration(){
    timer.setTimerDuration(timerValue.getWorkTime);
}
