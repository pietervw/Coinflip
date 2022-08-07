
window.onload = function () {

    // on btnGo click
    document.getElementById("btnGo").onclick = function () {

    var result = executeFlip();
    
    saveResult(result);
    displayResults(); 

    // prevent the form from submitting
    return false;
}

function executeFlip()
{
    disableButton();
    // flip a coin
    var result = flipCoin();
    var icon = getResultIcon(result);
    var text = getResultText(result);

    // display the result
    document.getElementById("btnGo").innerHTML = icon;
    document.getElementById("btnGo").className = getResultClass(result) + " round";
    document.getElementById("resultText").innerText = text;
    showLabel()
// set label text

    return result;
}


// format result for display
function getResultIcon(result) {
    return result.result ? "➕" : "➖️";
}

function getResultText(result) {
    return result.result ? "Heads" : "Tails";
}

// get result class
function getResultClass(result) {
    return result.result ? "label label-success" : "label label-warning";
}

function hideLabel() {
    document.getElementById("resultText").style.display = "none";
}

function showLabel() {
    document.getElementById("resultText").style.display = "";
}

// disable button for a short while
function disableButton() {
    document.getElementById("btnGo").disabled = true;
    setTimeout(function () {
        document.getElementById("btnGo").disabled = false;
    }, 500);
}

// function to flip a coin
function flipCoin() {
    return {
        result: Math.random() < 0.5,
        timestamp: new Date()
    };
}

// btnClearHistory click
document.getElementById("btnClearHistory").onclick = function () {
    clearResults();
    // reset btnGo
    document.getElementById("btnGo").innerHTML = "👋 Flip!";
    document.getElementById("btnGo").className = "label label-default round";
    displayResults();
    hideLabel();
}


// add the results to local storage
function saveResult(result) {
    var results = getResults();
    debugger;
    results.push(result);

    localStorage.setItem("results", JSON.stringify(results));
}


// get all reuslts from local storage, ordered by timestamp
function getResults() {
    var results = JSON.parse(localStorage.getItem("results"));
    if (!results) {
        results = [];
    }
    return results;
}

// clear results from local storage
function clearResults() {
    localStorage.clear('result');
}

// display results in table
function displayResults() {
    var results = getResults();
    var tbl = document.getElementById("tblResults");
    var tblBody = tbl.tBodies[0];
    tblBody.innerHTML = "";

    if (results.length > 0) {
        document.getElementById("btnClearHistory").style.display = ""; 

    for (var i = 0; i < results.length; i++) {
        var row = tblBody.insertRow(i);
        var date = new Date(results[i].timestamp);

        var cell1 = row.insertCell(0);
        var cell2 = row.insertCell(1);
        cell1.innerHTML = '<label class=\"' + getResultClass(results[i]) + '\">' + getResultIcon(results[i]) + 
        ' &nbsp;' + getResultText(results[i]) + '</label>';
        cell2.innerHTML = date.toLocaleDateString() + ' ' + date.toLocaleTimeString();
    }
}
else {
    // hide btnClearHistory
    document.getElementById("btnClearHistory").style.display = "none";
}
    // reverse the table so the newest results are at the top
    tbl.tBodies[0].innerHTML = tbl.tBodies[0].innerHTML.split("</tr>").reverse().join("</tr>");
}

displayResults();


function executeTest(){
var tries = 100;
var trues = 0;
var falses = 0;

for (var i = 0; i < tries; i++) {
    var result = flipCoin().result;
    if (result == true) {
        trues++;
    } else {
        falses++;
    }
}

console.log('Trues: ' + trues/tries*100 + '%');
console.log('Falses: ' + falses/tries*100 + '%');
}
}