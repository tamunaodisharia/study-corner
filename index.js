document.addEventListener('visibilitychange', function (event) {
    if (!document.hidden) {
        document.title=`Study Corner`;
    }
});

//Change background
var background=0;
function changeBackground(){
    background++;
    if(background>8){
        background=0;
    }
    document.getElementById("container").style.backgroundImage="url(backgrounds/"+background+".gif)";
}
///////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////// DRAGGING ITEMS ///////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////
var pos1=0,pos2=0,pos3=0,pos4=0;
var elmnt;
var z=0;
function dragItem(element,e){     //element=this.id
    elmnt = document.getElementById(element);
    e = e || window.event;
   //e.preventDefault();
    // get the mouse cursor position at startup:
    pos3 = e.clientX;
    pos4 = e.clientY;
    document.onmouseup = closeDragElement;   // stop dragging
    document.onmousemove = elementDrag;    //call function everytime mouse moves
}
function elementDrag(e) {
    e = e || window.event;
    e.preventDefault();
    // calculate the new cursor position:
    pos1 = pos3 - e.clientX;
    pos2 = pos4 - e.clientY;
    pos3 = e.clientX;
    pos4 = e.clientY;
    elmnt.style.zIndex=++z;     //make z index bigger
    // set the element's new position:
    elmnt.style.top = (elmnt.offsetTop - pos2) + "px";
    elmnt.style.left = (elmnt.offsetLeft - pos1) + "px";
  }
  function closeDragElement() {
    // stop moving when mouse button is released:
    document.onmouseup = null;
    document.onmousemove = null;
}
///////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////// TIMER ////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////
let time;
let countdownElement;
var interval;
var flashInterval;
var timeout
var flash;
function flashTimer1(){
    document.title=flash;
    switch(flash){
        case "00:00": 
            flash="Study Corner";
            break;
        case "Study Corner":
            flash="00:00";
            break;
    }
}
document.addEventListener('visibilitychange', function (event) {
    if (!document.hidden) {
        if(flashInterval){
            document.title=`Study Corner`;
            clearInterval(flashInterval);
            flashInterval=undefined;
        }
    }
});
function displayTimer(){
    var x = document.getElementById("timer");
    if (x.style.display === "none") {
        x.style.display = "block";
    } else {
        x.style.display = "none";
    }

    //initialize select tags:
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
   if (document.hidden) {
        document.title=`${minutes}:${seconds}`;
    }else{
        document.title="Study Corner";
    }
    time--;
   
    if(time<0){
        clearInterval(interval);
        if(document.hidden){
            document.title="Study Corner";
            flash="00:00"
            flashInterval = setInterval(flashTimer1,700);
           
        }
    }
}
function stopTimer(){
    clearInterval(interval);
    interval=undefined;
}
function resetTimer(){
    clearInterval(interval);
    interval=undefined;
    countdownElement.innerHTML= "00:00";
    time=0;
}
function resumeTimer(){
    if(interval){
    }else{
        if(time>0)
        interval = setInterval(updateCountdown,1000);
    }
}
//////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////// STOPWATCH //////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////
var swInterval;
var swTime=0;
var swElement;
let stopwatchTime=0;
function displayStopwatch(){
    var x = document.getElementById("stopwatch");
    if (x.style.display === "none") {
        x.style.display = "block";
    } else {
        x.style.display = "none";
    }
}
function startStopwatch(){
    if(swInterval){
    }else{
       if(swTime==0){
        swElement=document.getElementById("swCountdown");
        swInterval = setInterval(updateStopwatch,1000);
       }
    }
}
function updateStopwatch(){
    let hours=Math.floor(swTime/3600);
    let minutes=Math.floor(swTime/60);
    let seconds=swTime % 60;
    hours = hours < 10 ? '0' + hours : hours;
    minutes = minutes < 10 ? '0' + minutes : minutes;
    seconds = seconds < 10 ? '0' + seconds : seconds;
    swElement.innerHTML= `${hours}:${minutes}:${seconds}`;
    swTime++;
}
function stopStopwatch(){
    clearInterval(swInterval);
    swInterval=undefined;
}
function resetStopwatch(){
    clearInterval(swInterval);
    swInterval=undefined;
    swElement.innerHTML= "00:00:00";
    swTime=0;
}
function resumeStopwatch(){
    if(swInterval){
    }else{
        swInterval = setInterval(updateStopwatch,1000);
    }
}
//////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////// TASKS ////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////
function displayTasks(){
    var x = document.getElementById("tasks");
    if (x.style.display === "none") {
        x.style.display = "block";
    } else {
        x.style.display = "none";
    }
}
function enter(event){
  if (event.keyCode === 13) { //check if the key is 'enter'
    event.preventDefault();
    newTask();
  }
}
// Create a new list item when clicking on the "Add" button
function newTask() {
  var li = document.createElement("li");
  var inputValue = document.getElementById("myInput").value;
  var t = document.createTextNode(inputValue);
  li.appendChild(t);
  li.addEventListener('click', function(ev) {
    if (ev.target.tagName === 'LI') {
      ev.target.classList.toggle('checked');
    }
  }, false);
  if (inputValue === '') {
    alert("Task can't be blank!");
  } else {
    document.getElementById("myUL").appendChild(li);
  }
  document.getElementById("myInput").value = "";

  var span = document.createElement("SPAN");
  var txt = document.createTextNode("\u00D7");
  span.className = "close";
  span.appendChild(txt);
  li.appendChild(span);
  var close = document.getElementsByClassName("close");
  var i;
  for (i = 0; i < close.length; i++) {
    close[i].onclick = function() {
      var div = this.parentElement;
      div.style.display = "none";
    }
  }
}
///////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////// AUDIO ////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////
function displayAudio(){
    var x = document.getElementById("audio");
    if (x.style.display === "none") {
        x.style.display = "block";
    } else {
        x.style.display = "none";
    }
}
