
window.onload = function () {
// on form submit, flip a coin and display the result
document.getElementById("frm").onsubmit = function () {

    disableButton();
    // flip a coin
    var result = flipCoin();
    var text = formatResult(result);
    // display the result
    document.getElementById("lblResult").innerHTML = text;
    // add bootstrap success style to label
    document.getElementById("lblResult").className = getResultClass(result);
    // display the timestamp
    document.getElementById("lblTimestamp").innerHTML = result.timestamp.toLocaleTimeString();

    saveResult(result);
    displayResults();

    // prevent the form from submitting
    return false;
}

// format result for display
function formatResult(result) {
    return result.result ? "Heads" : "Tails";
}

// get result class
function getResultClass(result) {
    return result.result ? "label label-success" : "label label-warning";
}

// disable button for 1 seconds
function disableButton() {
    document.getElementById("btnGo").disabled = true;
    setTimeout(function () {
        document.getElementById("btnGo").disabled = false;
    }, 1000);
}

// function to flip a coin
function flipCoin() {
    return {
        result: Math.random() < 0.5,
        timestamp: new Date()
    };
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
    for (var i = 0; i < results.length; i++) {
        var row = tblBody.insertRow(i);
        var date = new Date(results[i].timestamp);

        var cell1 = row.insertCell(0);
        var cell2 = row.insertCell(1);
        cell1.innerHTML = '<label class=\"' + getResultClass(results[i]) + '\">' + formatResult(results[i]) + "</label>";
        cell2.innerHTML = date.toLocaleDateString() + ' ' + date.toLocaleTimeString();
    }

    // reverse the table so the newest results are at the top
    tbl.tBodies[0].innerHTML = tbl.tBodies[0].innerHTML.split("</tr>").reverse().join("</tr>");
}

displayResults();



// var tries = 10000000;
// var trues = 0;
// var falses = 0;
// for (var i = 0; i < tries; i++) {
//     var result = flipCoin();
//     if (result == true) {
//         trues++;
//     } else {
//         falses++;
//     }
// }

// console.log('Trues: ' + trues/tries*100 + '%');
// console.log('Falses: ' + falses/tries*100 + '%');
}