var background=0;
let time;
let stopwatchTime=0;
let countdownElement;
var interval;
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
function dragItem(element,e){
    //elmnt=document.getElementById("timer");
    elmnt = document.getElementById(element);
    e = e || window.event;
   // e.preventDefault();
    // get the mouse cursor position at startup:
    pos3 = e.clientX;
    pos4 = e.clientY;
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
    elmnt.style.zIndex=++z;
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
var swElement
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
    console.log("update function was called");
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
    // Number 13 is the "Enter" key on the keyboard
  if (event.keyCode === 13) {
    // Cancel the default action, if needed
    event.preventDefault();
    // Trigger the button element with a click
    newTask();
  }
}
// Create a "close" button and append it to each list item
var myNodelist = document.getElementsByTagName("LI");
var i;
for (i = 0; i < myNodelist.length; i++) {
  var span = document.createElement("SPAN");
  var txt = document.createTextNode("\u00D7");
  span.className = "close";
  span.appendChild(txt);
  myNodelist[i].appendChild(span);
}

// Click on a close button to hide the current list item
var close = document.getElementsByClassName("close");
var i;
for (i = 0; i < close.length; i++) {
  close[i].onclick = function() {
    var div = this.parentElement;
    div.style.display = "none";
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
