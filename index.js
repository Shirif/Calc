const elem = document.querySelector(".calc-container");
const previousOperand = document.querySelector(".previous-operand");
const currentOperand = document.querySelector(".current-operand");
let inputData = "";
let dot = false;
let action = "";
let firstNumber = 0;
let secondNumber = 0;
let resultNumber = 0;
let flagInput = false;
let flagCalc = false;

elem.addEventListener("click", (e) => {
  if (e.target.tagName == "BUTTON") currentInputData(e.target.innerText);
});
document.addEventListener("keydown", (e) => currentInputData(e.key));

clearData = () => {
  inputData = "";
  firstNumber = 0;
  secondNumber = 0;
  resultNumber = 0;
  previousOperand.innerText = "";
  action = "";
  dot = false;
  flagInput = false;
  flagCalc = false;
};

calculation = () => {

  if (action == "+") {
    resultNumber = firstNumber + secondNumber;
    inputData = String(resultNumber);
  }

  if (action == "-") {
    resultNumber = firstNumber - secondNumber;
    inputData = String(resultNumber);
  }

  if (action == "*") {
    resultNumber = firstNumber * secondNumber;
    inputData = String(resultNumber);
  }

  if (action == "/") {
    resultNumber = firstNumber / secondNumber;
    inputData = String(resultNumber);
  }

  if (action == "^") {
    resultNumber = firstNumber * firstNumber;
    inputData = String(resultNumber);
  }

  firstNumber = 0;
};

currentInputData = (input) => {
  console.log(input);
 

  if ((input == "." && !dot && !flagInput) || (input == "," && !dot && !flagInput)) {
    inputData = inputData ? inputData + "." : "0.";
    dot = true;
  } else if (
    (input == "." && inputData[inputData.length - 1] == ".") ||
    (input == "," && inputData[inputData.length - 1] == ".")
  ) {
    dot = false;
    inputData = inputData.slice(0, inputData.length - 1);
  }

  if (input == "AC" || input == "Escape") clearData();

  if (input == "DEL" || input == "Backspace") {
    if (flagInput) {
      previousOperand.innerText = "";
      secondNumber = 0;
      resultNumber = 0;
      flagInput = false;
      flagCalc = false;
    } else {
      if (inputData[inputData.length - 1] == ".") dot = false;
      inputData = inputData.slice(0, inputData.length - 1);
    }
  }

  if (input.match(/[0-9]/) && inputData.length <= 20) {
    if (flagInput) {
      inputData = "";
      flagInput = false;
    }

    if (action == "=") clearData();

    inputData += input;
    console.log(inputData);
  }

  if (input == "^") {
    firstNumber = Number(inputData);
    action = input;
    calculation();
  }

  if (input.match(/[\/*\-+=÷]|Enter/)) {
    if (action == "=") {
      previousOperand.innerText = "";
      inputData = currentOperand.innerText;
      flagInput = false;
    }
    if (!flagInput) {
      previousOperand.innerText += inputData
        ? ` ${inputData} ${input == "Enter" ? "=" : input == "/" ? "÷" : input}`
        : "";

      if (!firstNumber) firstNumber = Number(inputData);

      if (input == "=" || input == "Enter") {
        secondNumber = Number(currentOperand.innerText);
        calculation();
        inputData = String(resultNumber);
      } else if (flagCalc) {
        secondNumber = Number(currentOperand.innerText);
        calculation();
        inputData = String(resultNumber);
        firstNumber = resultNumber;
      }
    } else {
      previousOperand.innerText = `${previousOperand.innerText.slice(0, previousOperand.innerText.length - 1)}${
        input == "Enter" ? "=" : input == "/" ? "÷" : input
      }`;
    }

    action = input == "÷" ? "/" : input == "Enter" ? "=" : input;
    flagInput = true;
    flagCalc = true;
    dot = false;
  }

  currentOperand.innerText = inputData ? inputData : "0";

};
