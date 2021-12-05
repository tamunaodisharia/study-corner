var background=0;
let time;
let countdownElement;
var interval;
function changeBackground(){
    background++;
    if(background>8){
        background=0;
    }
    document.getElementById("container").style.backgroundImage="url(backgrounds/"+background+".gif)";
  
}
function displayTimer(){
    var x = document.getElementById("timer");
        if (x.style.display === "none") {
          x.style.display = "block";
        } else {
          x.style.display = "none";
        }
    var selectMinutes=document.getElementById("selectMinutes");
    var selectSeconds=document.getElementById("selectSeconds");
    for (var i = 0; i<=60; i++){
        var opt = document.createElement('option');
        opt.value = i;
        if(i<10){
            opt.innerHTML = "0"+i;
        }else{
            opt.innerHTML = i;
        }
        selectMinutes.appendChild(opt);
    }
    for (var i = 0; i<=60; i++){
        var opt = document.createElement('option');
        opt.value = i;
        if(i<10){
            opt.innerHTML = "0"+i;
        }else{
            opt.innerHTML = i;
        }
        selectSeconds.appendChild(opt);
    }
}
function startTimer(){
    if(interval){
       // clearInterval(interval);
    }else{
        let startingMinutes=document.getElementById("selectMinutes").value;
        let startingSeconds=document.getElementById("selectSeconds").value;
      
        time=startingMinutes * 60 + parseInt(startingSeconds,10);
       if(time ==0){
    
       }else{
        countdownElement=document.getElementById("countdown");
        interval = setInterval(updateCountdown,1000);
       }
    }
    

}
function updateCountdown(){
   let minutes=Math.floor(time/60);
   let seconds=time % 60;
   minutes = minutes < 10 ? '0' + minutes : minutes;
    seconds = seconds < 10 ? '0' + seconds : seconds;
   countdownElement.innerHTML= `${minutes}:${seconds}`;
    time--;
    if(time<0){
        clearInterval(interval);
    }
}
function stopTimer(){
    clearInterval(interval);
}
function resetTimer(){
    clearInterval(interval);
    countdownElement.innerHTML= "00:00";
}
var newinterval;
function resumeTimer(){
    
    if(newinterval){
        
    }else{
        if(time>0)
        newinterval = interval= setInterval(updateCountdown,1000);
        
    }
    
}
var pos1=0,pos2=0,pos3=0,pos4=0;
var elmnt;
function dragTimer(e){
    elmnt=document.getElementById("timer");
    console.log("drag mouse");
    console.log(elmnt);
    e = e || window.event;
   // e.preventDefault();
    // get the mouse cursor position at startup:
    pos3 = e.clientX;
    pos4 = e.clientY;
    console.log(pos3);
    console.log(pos4);
    document.onmouseup = closeDragElement;
    // call a function whenever the cursor moves:
    document.onmousemove = elementDrag;
}
function elementDrag(e) {
    e = e || window.event;
    e.preventDefault();
    // calculate the new cursor position:
    pos1 = pos3 - e.clientX;
    pos2 = pos4 - e.clientY;
    pos3 = e.clientX;
    pos4 = e.clientY;
    // set the element's new position:
    elmnt.style.top = (elmnt.offsetTop - pos2) + "px";
    elmnt.style.left = (elmnt.offsetLeft - pos1) + "px";
  }
  function closeDragElement() {
    // stop moving when mouse button is released:
    document.onmouseup = null;
    document.onmousemove = null;
  }