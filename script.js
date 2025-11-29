const display = document.getElementById("display");

let firstNum = null;
let operator = null;
let shouldReset = false;

document.querySelectorAll(".btn").forEach(btn => {
  btn.addEventListener("click", () => {
    const value = btn.dataset.value;
    const action = btn.dataset.action;

    if (value !== undefined) {
      inputNumber(value);
    }

    if (action === "operator") {
      handleOperator(btn.dataset.value);
      highlightOperator(btn);
    }

    if (action === "clear") {
      clearAll();
    }

    if (action === "equals") {
      calculate();
      clearActiveOperators();
    }

    if (action === "sign") {
      display.textContent = parseFloat(display.textContent) * -1;
    }

    if (action === "percent") {
      display.textContent = parseFloat(display.textContent) / 100;
    }
  });
});

function inputNumber(value) {
  if (display.textContent === "0" || shouldReset) {
    display.textContent = value;
    shouldReset = false;
  } else {
    display.textContent += value;
  }
}

function handleOperator(op) {
  if (firstNum === null) {
    firstNum = parseFloat(display.textContent);
  } else if (!shouldReset) {
    calculate();
  }
  operator = op;
  shouldReset = true;
}

function calculate() {
  if (operator === null || firstNum === null) return;

  const secondNum = parseFloat(display.textContent);
  let result = 0;

  switch (operator) {
    case "+": result = firstNum + secondNum; break;
    case "−": result = firstNum - secondNum; break;
    case "×": result = firstNum * secondNum; break;
    case "÷": result = firstNum / secondNum; break;
  }

  display.textContent = result.toString();
  firstNum = result;
  operator = null;
}

function clearAll() {
  display.textContent = "0";
  firstNum = null;
  operator = null;
  clearActiveOperators();
}

function highlightOperator(btn) {
  clearActiveOperators();
  btn.classList.add("active");
}

function clearActiveOperators() {
  document.querySelectorAll(".operator").forEach(op => op.classList.remove("active"));
}
