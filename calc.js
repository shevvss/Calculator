class Calculator {
  constructor(
    previousOperandTextElement,
    currentOperandTextElement,
    memoryTextElement
  ) {
    this.previousOperandTextElement = previousOperandTextElement;
    this.currentOperandTextElement = currentOperandTextElement;
    this.memoryTextElement = memoryTextElement;
    this.clear();
  }

  clear() {
    this.currentOperand = '';
    this.previousOperand = '';
    this.operation = undefined;
    this.inMemory = 0;
  }

  plusMinus() {
    this.currentOperand = -this.currentOperand;
  }

  mPlus() {
    this.inMemory += +this.currentOperand;
  }

  mMinus() {
    this.inMemory -= +this.currentOperand;
  }

  mc() {
    this.inMemory = 0;
  }

  mr() {
    this.currentOperand = this.inMemory;
  }

  delete() {
    this.currentOperand = this.currentOperand.toString().slice(0, -1);
  }

  appendNumber(number) {
    if (number === '.' && this.currentOperand.includes('.')) return;
    this.currentOperand = this.currentOperand.toString() + number.toString();
  }

  chooseOperation(operation) {
    if (this.currentOperand === '') return;
    if (this.previousOperand !== '') {
      this.compute();
    }
    this.operation = operation;
    this.previousOperand = this.currentOperand;
    this.currentOperand = '';
  }

  compute() {
    let computation;
    const prev = parseFloat(this.previousOperand);
    const current = parseFloat(this.currentOperand);
    if (isNaN(prev) || isNaN(current)) return;
    switch (this.operation) {
      case '+':
        computation = prev + current;
        break;
      case '-':
        computation = prev - current;
        break;
      case '*':
        computation = prev * current;
        break;
      case '÷':
        computation = prev / current;
        break;
      default:
        return;
    }
    this.currentOperand = computation;
    this.operation = undefined;
    this.previousOperand = '';
  }

  getDisplayNumber(number) {
    const stringNumber = number.toString();
    const integerDigits = parseFloat(stringNumber.split('.')[0]);
    const decimalDigits = stringNumber.split('.')[1];
    let integerDisplay;
    if (isNaN(integerDigits)) {
      integerDisplay = '';
    } else {
      integerDisplay = integerDigits.toLocaleString('en', {
        maximumFractionDigits: 0,
      });
    }
    if (decimalDigits != null) {
      return `${integerDisplay}.${decimalDigits.slice(0, 8)}`;
    } else {
      return integerDisplay;
    }
  }

  updateDisplay() {
    this.currentOperandTextElement.innerText = this.getDisplayNumber(
      this.currentOperand
    );
    if (this.operation != null) {
      this.previousOperandTextElement.innerText = `${this.getDisplayNumber(
        this.previousOperand
      )} ${this.operation}`;
    } else {
      this.previousOperandTextElement.innerText = '';
    }
    this.memoryTextElement.innerText = `M: ${this.getDisplayNumber(
      this.inMemory
    )}`;
  }
}

const numberButtons = document.querySelectorAll('[data-number]');
const operationButtons = document.querySelectorAll('[data-operation]');
const equalsButton = document.querySelector('[data-equals]');
const deleteButton = document.querySelector('[data-delete]');
const allClearButton = document.querySelector('[data-all-clear]');
const mPlusButton = document.querySelector('[data-m-plus]');
const mMinusButton = document.querySelector('[data-m-minus]');
const mcButton = document.querySelector('[data-mc]');
const mrButton = document.querySelector('[data-mr]');
const plusMinusButton = document.querySelector('[data-plus-minus]');
const previousOperandTextElement = document.querySelector(
  '[data-previous-operand]'
);
const currentOperandTextElement = document.querySelector(
  '[data-current-operand]'
);
const memoryTextElement = document.querySelector('[data-memory]');

const calculator = new Calculator(
  previousOperandTextElement,
  currentOperandTextElement,
  memoryTextElement
);

numberButtons.forEach((button) => {
  button.addEventListener('click', () => {
    calculator.appendNumber(button.innerText);
    calculator.updateDisplay();
  });
});

operationButtons.forEach((button) => {
  button.addEventListener('click', () => {
    calculator.chooseOperation(button.innerText);
    calculator.updateDisplay();
  });
});

equalsButton.addEventListener('click', (button) => {
  calculator.compute();
  calculator.updateDisplay();
});

allClearButton.addEventListener('click', (button) => {
  calculator.clear();
  calculator.updateDisplay();
});

mPlusButton.addEventListener('click', (button) => {
  calculator.mPlus();
  calculator.updateDisplay();
});

mMinusButton.addEventListener('click', (button) => {
  calculator.mMinus();
  calculator.updateDisplay();
});

mcButton.addEventListener('click', (button) => {
  calculator.mc();
  calculator.updateDisplay();
});

mrButton.addEventListener('click', (button) => {
  calculator.mr();
  calculator.updateDisplay();
});

plusMinusButton.addEventListener('click', (button) => {
  calculator.plusMinus();
  calculator.updateDisplay();
});

deleteButton.addEventListener('click', (button) => {
  calculator.delete();
  calculator.updateDisplay();
});
