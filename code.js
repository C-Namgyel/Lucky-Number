//Functions
function randomNumber(min, max) {
    return(Math.floor(Math.random() * (parseInt(max) - parseInt(min) + 1) + parseInt(min)))
}
function setScreen(id) {
    for (let s = 0; s < document.querySelectorAll(".scrn").length; s++) {
        if (document.querySelectorAll(".scrn")[s].id == id) {
            document.querySelectorAll(".scrn")[s].hidden = false;
        } else {
            document.querySelectorAll(".scrn")[s].hidden = true;
        }
    }
}
//Variables
if ("save" in localStorage == false) {
    localStorage.save = JSON.stringify({})
}
var banList = []
if ("banList" in localStorage) {
    banList = localStorage.banList.split(",").map(Number);
    if (banList.length == 1 && banList[0] == 0) {
        banList = []
    }
}
if ("minVal" in localStorage) {
    document.getElementById("minVal").value = localStorage.minVal
}
if ("maxVal" in localStorage) {
    document.getElementById("maxVal").value = localStorage.maxVal
}
if ("result" in localStorage) {
    document.getElementById("result").innerHTML = localStorage.result
}
document.getElementById("banCount").innerHTML = banList.length + "/" + (parseInt(document.getElementById("maxVal").value) - parseInt(document.getElementById("minVal").value) + 1)
//Codes
document.getElementById("pickBtn").onclick = function() {
    let min = document.getElementById("minVal").value
    let max = document.getElementById("maxVal").value
    if (max.trim() != "" && min.trim() != "" && max != NaN && min != NaN) {
        if (parseInt(min) < parseInt(max)) {
            let rand = randomNumber(min, max);
            if (banList.length <= (parseInt(max) - parseInt(min))) {
                while (banList.indexOf(rand) != -1) {
                    rand = randomNumber(min, max);
                }
                banList.push(rand)
            } else {
                banList = [rand];
                alert("The ban list has been cleared!")
            }
            localStorage.banList = banList
            document.getElementById("banCount").innerHTML = banList.length + "/" + (parseInt(max) - parseInt(min) + 1)
            document.getElementById("result").innerHTML = rand;
            localStorage.result = rand;
        } else {
            alert("Minimum value cannot be greater than maximum value")
        }
    } else {
        alert("Please enter a valid number")
    }
}
document.getElementById("banList").onclick = function() {
    setScreen("banScrn")
    document.getElementById("banListHolder").value = ""
    for (let b = 0; b < banList.length; b++) {
        document.getElementById("banListHolder").value += banList[b]
        if (b + 1 != banList.length) {
            document.getElementById("banListHolder").value += ","
        }
    }
}
document.getElementById("minVal").oninput = function() {
    document.getElementById("banCount").innerHTML = banList.length + "/" + (parseInt(document.getElementById("maxVal").value) - parseInt(document.getElementById("minVal").value) + 1)
    localStorage.minVal = document.getElementById("minVal").value
}
document.getElementById("maxVal").oninput = function() {
    document.getElementById("banCount").innerHTML = banList.length + "/" + (parseInt(document.getElementById("maxVal").value) - parseInt(document.getElementById("minVal").value) + 1)
    localStorage.maxVal = document.getElementById("maxVal").value
}
document.getElementById("banListHolder").onchange = function() {
    banList = document.getElementById("banListHolder").value.split(",").map(Number);
    localStorage.banList = banList;
    if (banList.length == 1 && banList[0] == 0) {
        banList = []
    }
}
document.getElementById("banListBack").onclick = function() {
    setScreen("mainScrn")
    document.getElementById("banCount").innerHTML = banList.length + "/" + (parseInt(document.getElementById("maxVal").value) - parseInt(document.getElementById("minVal").value) + 1)
}
document.getElementById("banListSave").onclick = function() {
    let name = prompt("Enter the name for the data.\nEg: Class 10 E")
    let dat = JSON.parse(localStorage.save)
    dat[name] = document.getElementById("banListHolder").value;
    localStorage.save = JSON.stringify(dat)
}
document.getElementById("banListLoad").onclick = function() {
    let str = "Enter the index number of the saved data\n"
    for (let l = 0; l < Object.keys(JSON.parse(localStorage.save)).length; l++) {
        str += (l + 1) + ". " + Object.keys(JSON.parse(localStorage.save))[l] + "\n"
    }
    let opt = prompt(str)
    document.getElementById("banListHolder").value = JSON.parse(localStorage.save)[Object.keys(JSON.parse(localStorage.save))[parseInt(opt)-1]]
    banList = document.getElementById("banListHolder").value.split(",").map(Number);
    localStorage.banList = banList;
    if (banList.length == 1 && banList[0] == 0) {
        banList = []
    }
}
document.getElementById("banListDelete").onclick = function() {
    let str = "Enter the index number of the data which is to be deleted\n"
    for (let l = 0; l < Object.keys(JSON.parse(localStorage.save)).length; l++) {
        str += (l + 1) + ". " + Object.keys(JSON.parse(localStorage.save))[l] + "\n"
    }
    let opt = prompt(str)
    let obj = JSON.parse(localStorage.save)
    delete obj[Object.keys(obj)[parseInt(opt)-1]]
    localStorage.save = JSON.stringify(obj)
}