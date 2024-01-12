const screenTop = document.querySelector('#top');
const screenBottom = document.querySelector('#bottom');
const buttons = document.querySelectorAll('button');

let lastColored = "clear";
let history = "";
let lastNumber = "";
let actualNumber = "";
let signal = "";
let result = "";

buttons.forEach((button) => {
    button.addEventListener('click', () => {
        separeButtons(button.value);
    })
})

function separeButtons(value) {
    if (value == "decimal") {
        changeNumber(".");
    } else if (value.length > 1) {
        calculate(value)
    } else {
        changeNumber(value)
    }
}

function colorKey(value) {
    document.getElementById(value).style.backgroundColor = "grey";
    lastColored = value;
}

function startAgain() {
    colorKeyBack();
    lastColored = "clear";
    history = "";
    lastNumber = "";
    actualNumber = "";
    signal = "";
    result = "";
    screenTop.textContent = history
    screenBottom.textContent = actualNumber
}

function colorKeyBack() {
    document.getElementById(lastColored).style.backgroundColor = "rgb(239, 239, 239)";
}

function calculate(operation) {
    colorKeyBack();
    colorKey(operation);
    signal = operation
    if (signal == "clear") {
        startAgain();
    } else if (history == "") {
        createHistory();
    } else if (actualNumber == ""){
        changeHistorySignal(operation);
    } else {
        makeCalculation();
        updateHistory();
        updateValue();
    }
    
}

function changeHistorySignal(signal) {
    switch (signal) {
        case "divide":
            if (testLastDigit()) {
                history = history.slice(0, -1) + "/";
            } else {
                history += "/";
            }
        break;
        case "multiply":
            if (testLastDigit()) {
                history = history.slice(0, -1) + "*";
            } else {
                history += "*";
            }
        break;
        case "subtract":
            if (testLastDigit()) {
                history = history.slice(0, -1) + "-";
            } else {
                history += "-";
            }
        break;
        case "sum":
            if (testLastDigit()) {
                history = history.slice(0, -1) + "+";
            } else {
                history += "+";
            }
        break;
        case "equal":
            if (testLastDigit()) {
                history = history.slice(0, -1);
            }
            actualNumber = ""
        break;
    }
    screenTop.textContent = history;
}

function testLastDigit(){
    let lastDigit = history.slice(-1);
    return (lastDigit === "+" || lastDigit === "-" || lastDigit === "/" || lastDigit === "*")
}

function updateHistory() {
    switch (signal) {
        case "sum":
            history = result + "+";
        break;
        case "subtract":
            history = result + "-";
        break;
        case "multiply":
            history = result + "*";
        break;
        case "divide":
            history = result + "/";;
        break;
    }
    screenTop.textContent = history;
}

function makeCalculation() {
    switch (history.slice(-1)) {
        case "/":
            divide();
        break;
        case "*":
            multiply();
        break;
        case "-":
            subtract();
        break;
        case "+":
            sum();
        break;
    }
    lastNumber = result;
}

function updateValue() {
    screenBottom.textContent = result;
    actualNumber = ""
}

function createHistory() {
    switch (signal) {
        case "divide":
            history = historyExpo() + "/";
        break;
        case "multiply":
            history = historyExpo() + "*";
        break;
        case "subtract":
            history = historyExpo() + "-";
        break;
        case "sum":
            history = historyExpo() + "+";
        break;
        case "equal":
            history = `${historyExpo()}`;
        break;
    }
    screenTop.textContent = history;
    lastNumber = actualNumber;
    actualNumber = "";
}

function historyExpo() {
    if (actualNumber.length < 13) {
        return actualNumber;
    } else {
        return (+actualNumber).toExponential(3);
    }
}

function changeNumber(value) {
    if (value == "." && actualNumber == "") {
        actualNumber = "0."
    } else {
        actualNumber += value;
    }
    colorKeyBack();
    showBottom(actualNumber);
}

function showBottom(value) {
    if (value.length < 13) {
        screenBottom.textContent = value;
    } else {
        screenBottom.textContent = (+value).toExponential(3);
    }
}

function sum() {
    result = +lastNumber + +actualNumber;
    exponent();
}

function subtract() {
    result = +lastNumber - +actualNumber;
    exponent();
}

function multiply() {
    result = +lastNumber * +actualNumber;
    exponent();
}

function divide() {
    result = +lastNumber / +actualNumber;
    exponent();
}

function exponent() {
    let string = result.toString();
    if (string.length >= 13) {
     result = (result).toExponential(3);
    }
    
}