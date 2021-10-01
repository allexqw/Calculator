const init = () => {
  div = document.createElement("div");
  div.className = "container";
  div.id = "bodyCalculator";

  document.body.append(div);
  input = document.createElement("input");
  input.id = "inputNumber";
  input.type = "text";
  input.className = "input";
  bodyCalculator.append(input);

  let map = new Map([
    ["operation allClean", "AC"],
    ["operation square", "^2"],
    ["operation increment", "+"],
    ["operation decrement", "-"],
    ["operation divide", "/"],
    ["operation multiply", "*"],
    ["operation equal", "="],
    ["number one", "1"],
    ["number two", "2"],
    ["number three", "3"],
    ["number four", "4"],
    ["number five", "5"],
    ["number six", "6"],
    ["number seven", "7"],
    ["number eight", "8"],
    ["number nine", "9"],
    ["number zero", "0"],
    ["number point", "."],
  ]);

  map.forEach((value, key, map) => {
    button = document.createElement("button");
    button.type = "button";
    button.className = "button" + "-" + key;
    button.innerHTML = value;
    bodyCalculator.append(button);
  });
};
init();

class Calculator {
  constructor(currentValue) {
    this.currentValue = currentValue;
    this.clear();
  }

  clear() {
    this.previousOperand = "";
    this.currentOperand = "";
    this.operation = undefined;

    this.updateDisplay();
  }
  appendNumber(number) {
    if (number === "." && this.currentOperand == "") {
      this.currentOperand = this.currentOperand.toString() + "0";
    }
    if (number === "0" && this.currentOperand === "") {
      return;
    }
    if (number === "." && this.currentOperand.includes(".")) {
      return;
    }
    this.currentOperand = this.currentOperand.toString() + number.toString();
  }
  updateDisplay() {
    this.currentValue.value = this.currentOperand;
    if (this.currentOperand.length == 0) {
      currentValue.value = "0";
    }
  }

  square() {
    this.currentOperand = Math.pow(this.currentOperand, 2);
    this.updateDisplay();
  }

  getDisplayNumber(number) {
    const stringNumber = number.toString();
    const integerDigits = parseFloat(stringNumber.split("."[0]));
    const decimalDigits = stringNumber.split(".")[1];
    let integerDisplay;
    if (isNaN(integerDigits)) {
      integerDisplay = "";
    } else {
      integerDisplay = integerDigits.toLocaleString("en", {
        maximumFractionDigits: 0,
      });
      if (decimalDigits != null) {
        return `${integerDigits}`;
      } else {
        return integerDisplay;
      }
    }
  }

  chooseOperation(operation) {
    switch (operation) {
      case "^2":
        this.square();
        break;
      case "AC":
        this.clear();
        break;
      case "=":
        this.compute();
      default:
        this.operation = operation;
        this.previousOperand = this.currentOperand;
        this.currentOperand = "";
    }
  }

  compute() {
    let computation;
    const previous = parseFloat(this.previousOperand);
    const current = parseFloat(this.currentOperand);

    if (isNaN(previous) || isNaN(current)) return;
    switch (this.operation) {
      case "+":
        computation = previous + current;
        if (previous % 1 !== 0 && current % 1 !== 0) {
          const previousLength = (previous % 1).toString.length - 2;
          const currentLength = (current % 1).toString.length - 2;
          computation = computation.toFixed(
            Math.max(previousLength, currentLength)
          );
        }
        break;
      case "-":
        computation = previous - current;
        break;
      case "*":
        computation = previous * current;
        break;
      case "/":
        computation = previous / current;
        break;
      default:
        return;
    }

    this.currentOperand = computation;
    this.previousOperand = "";
    this.operation = undefined;
    this.updateDisplay();
  }
}

const numbersButton = document.querySelectorAll(".button-number");
const operationButton = document.querySelectorAll(".button-operation");
const allClearButton = document.querySelector(".allClean");
const currentValue = document.querySelector(".input");
const calculator = new Calculator(currentValue);

// currentValue.value = "0";

numbersButton.forEach((button) => {
  button.addEventListener("click", () => {
    calculator.appendNumber(button.innerText);
    calculator.updateDisplay();
  });
});

operationButton.forEach((button) => {
  button.addEventListener("click", () => {
    calculator.chooseOperation(button.innerText);
  });
});
