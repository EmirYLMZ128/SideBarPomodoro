//Variable
pomodoroMin = document.getElementById("pomodoroMin");
pomodoroSec = document.getElementById("pomodoroSec");
pomodorotext = document.getElementById("ptext");
SBreakeMin = document.getElementById("SBreakeMin");
SBreakeSec = document.getElementById("SBreakeSec");
SBreaketext = document.getElementById("SBtext");
Tour = document.getElementById("tour");
Tourtext = document.getElementById("Tourtext");
LBreakeMin = document.getElementById("LBreakeMin");
LBreakeSec = document.getElementById("LBreakeSec");
LBreakeText = document.getElementById("LBreaketext");
vstart = document.getElementById("startbtn");
player = document.getElementById("alarm");
darkbtn = document.getElementById("dark");
lightbtn = document.getElementById("light");
exit = document.getElementById("exit")
var setbtn = document.getElementById("setbtn");
var visiblety=0;
//Theme
function theme(){
    themevalue = localStorage.getItem('theme');
    if(themevalue == "dark"){
        Classes = ["body", "input-number", "select", "theme-btn"];
        adding = "dark";
        deleteing = "light";
    }if (themevalue == "light") {
        Classes = ["body", "input-number", "select", "theme-btn"];
        adding = "light";
        deleteing = "dark";
    }
    for (i = 0; i < Classes.length; i++) {
        Elements = document.getElementsByClassName(Classes[i]);
        if (Elements.length == 1) {
            Elements[0].classList.remove(Classes[i]+"-"+deleteing);
            Elements[0].classList.add(Classes[i]+"-"+adding);
        }
        if(Elements.length != 1){
            for (let ii = 0; ii < Elements.length; ii++) {
                Elements[ii].classList.remove(Classes[i]+"-"+deleteing);
                Elements[ii].classList.add(Classes[i]+"-"+adding);
            }

        }
    }
}
//theme change
darkbtn.addEventListener("click", ()=>{
    localStorage.setItem('theme', "dark"); 
    theme();
})
lightbtn.addEventListener("click", ()=>{
    localStorage.setItem('theme', "light"); 
    theme();
})
//Settings
setbtn.addEventListener("click", () => {
    let set = document.getElementById("set");
    let pomodoro = document.getElementById("pomodoro");
    if (visiblety == 0) {
        set.classList.remove("invisible");
        pomodoro.classList.add("invisible");
        setbtn.textContent = "Pomodoro";
        return visiblety = 1;
    }
    if (visiblety = 1) {
        set.classList.add("invisible");
        pomodoro.classList.remove("invisible");
        setbtn.textContent = "Settings";
        return visiblety = 0;
    }
});
//Load functions
document.addEventListener("load",  setTime());
document.addEventListener("load", setlocal());
document.addEventListener("load", setAlarm());
window.addEventListener("load", ()=>{
    localStorage.setItem('theme', "light"); 
    theme();
});
//setlocal
function setlocal() {
    localStorage.setItem('Tour', Tour.value); 
    localStorage.setItem('PMin', pomodoroMin.value); 
    localStorage.setItem('PSec', pomodoroSec.value); 
    localStorage.setItem('SBMin', SBreakeMin.value); 
    localStorage.setItem('SBSec', SBreakeSec.value); 
    localStorage.setItem('LBMin', LBreakeMin.value); 
    localStorage.setItem('LBSec', LBreakeSec.value); 
}
//Inspection few nine
function fewNine(a, b, c,) {
    if (a.value <= 9) {
        c.innerText = b.value + ":0" + a.value;
    }
    if (b.value <= 9) {
        c.innerText = "0" + b.value + ":" + a.value;
    }
    if (a.value <= 9 && b.value <= 9) {
        c.innerText = "0" + b.value + ":0" + a.value;
    }
}
//Inspection
function warnning(a) {
    if (a.value == 00) {
        a.value = 0;
    }
    if (a.value >= 60) {
        a.value = 59;
        return alert("Your Max Sec or Min number 59");
    }
}
//Last Settings
function last() {
    pomodoroMin.value = localStorage.getItem('PMin');
    pomodoroSec.value = localStorage.getItem('PSec');
    SBreakeMin.value = localStorage.getItem('SBMin');
    SBreakeSec.value = localStorage.getItem('SBSec');
    LBreakeMin.value = localStorage.getItem('LBMin');
    LBreakeSec.value = localStorage.getItem('LBSec');
}
//SetTime
function setTime() {
    pomodorotext.innerText = pomodoroMin.value + ":" + pomodoroSec.value;
    SBreaketext.innerText = SBreakeMin.value + ":" + SBreakeSec.value;
    Tourtext.innerText = Tour.value;
    LBreakeText.innerText = LBreakeMin.value + ":" + LBreakeSec.value;
    warnning(pomodoroMin);
    warnning(pomodoroSec);
    warnning(SBreakeMin);
    warnning(SBreakeSec);
    warnning(LBreakeMin);
    warnning(LBreakeSec);
    fewNine(pomodoroSec, pomodoroMin, pomodorotext);
    fewNine(SBreakeSec, SBreakeMin,  SBreaketext);
    return fewNine(LBreakeSec, LBreakeMin,  LBreakeText);
}
//Alarm
function setAlarm() {
    let alarm = document.getElementById("rselect");
    player.setAttribute('src', 'Assest/VFX/' + alarm.value + '.wav');
}
//Pomodoro
function pomodoro() {
    if (pomodoroSec.value == 00 && pomodoroMin.value == 00) {
        sbreaketimer = setInterval(sbreake, 1000);
        player.play();
        return clearInterval(pomodorotimer);
    }
    if (pomodoroSec.value == 00) {
        pomodoroMin.value --;
        pomodoroSec.value = 59;
    }
    if (pomodoroSec.value >= 00) {
        pomodoroSec.value --;
    }
    setTime();
}
//SBreake
function sbreake() {
    if (SBreakeSec.value == 00 && SBreakeMin.value == 00) {
        Tour.value --;
       if (Tour.value == 0) {
            LBTimer = setInterval(lbreake, 1000);
            player.play();
            return clearInterval(sbreaketimer);
        }
        if (Tour.value != 0) {
            last();
            setTime();
            Tourtext.innerText = Tour.value;
            pomodorotimer = setInterval(pomodoro, 1000);
        }
        Tourtext.innerText = Tour.value;
        player.play();
        return clearInterval(sbreaketimer);
    }
    if (SBreakeSec.value == 00) {
        SBreakeMin.value --;
        SBreakeSec.value = 59;
    }
    if (SBreakeSec.value >= 00) {
        SBreakeSec.value --;
    }
    setTime();
}
//LBreake
function lbreake() {
    if (LBreakeMin.value == 00 && LBreakeSec.value == 00) {
        player.play();
        last();
        Tour.value = localStorage.getItem('Tour');
        setTime();
        vstart.classList.remove("invisible");
        player.classList.remove("invisible");
        setbtn.classList.remove("invisible");
        exit.classList.add("invisible");
        return clearInterval(LBTimer);
    }
    if (LBreakeSec.value == 00) {
        LBreakeMin.value--;
        LBreakeSec.value = 59;
    }
    if (LBreakeSec.value >= 00) {
        LBreakeSec.value--;
    }
    setTime();
}
//Set
var sett = document.getElementById("sett");
sett.addEventListener("click", () =>{
    setTime(); 
    setlocal();
    setAlarm();
});
//Start
vstart.addEventListener("click", () =>{
    vstart.classList.add("invisible");
    player.classList.add("invisible");
    setbtn.classList.add("invisible");
    exit.classList.remove("invisible");
    pomodorotimer = setInterval(pomodoro, 1000);
});
//exit
exit.addEventListener("click", ()=>{
    if (pomodorotext.textContent != "00:00"){
        clearInterval(pomodorotimer);
    }
    if (pomodorotext.textContent == "00:00" && SBreaketext.textContent != "00:00") {
        clearInterval(sbreaketimer);
    }
    if (pomodorotext.textContent == "00:00" && SBreaketext.textContent == "00:00" && Tourtext.textContent == "0") {
        clearInterval(LBTimer);
    }
    last();
    Tour.value = localStorage.getItem('Tour');
    setTime();
    vstart.classList.remove("invisible");
    player.classList.remove("invisible");
    setbtn.classList.remove("invisible");
    exit.classList.add("invisible");
});