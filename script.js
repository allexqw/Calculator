const state = {
  result: "",
  firstNumber: "",
  secondNumber: "",
};

const init = () => {
  div = document.createElement("div");
  div.className = "container";
  div.id = "calculator";

  document.body.append(div);
  input = document.createElement("input");
  input.id = "inputNumber";
  input.className = "input-text";
  calculator.append(input);

  let map = new Map([
    ["allClean", "AC"],
    ["square", "^2"],
    ["point", "."],
    ["increment", "+"],
    ["decrement", "-"],
    ["divide", "/"],
    ["multiply", "*"],
    ["equal", "="],
    ["one", "1"],
    ["two", "2"],
    ["three", "3"],
    ["four", "4"],
    ["five", "5"],
    ["six", "6"],
    ["seven", "7"],
    ["eight", "8"],
    ["nine", "9"],
    ["zero", "0"],
  ]);

  map.forEach((value, key, map) => {
    button = document.createElement("button");
    button.type = "button";
    button.className = "button" + " " + "button" + "-" + key;
    button.id = key;
    button.innerHTML = value;
    calculator.append(button);
  });
};
init();
