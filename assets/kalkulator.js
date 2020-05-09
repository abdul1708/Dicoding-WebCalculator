const calculator = {
  displayNumber: '0',
  operator: null,
  firstNumber: null,
  waitingForSecondNumber: false
}

function update() {
  document.querySelector('#displayNumber').innerHTML = calculator.displayNumber
}

function clear() {
  calculator.displayNumber = '0',
    calculator.operator = null,
    calculator.firstNumber = null,
    calculator.waitingForSecondNumber = false
}

function input(digit) {
  if (calculator.waitingForSecondNumber && calculator.firstNumber === calculator.displayNumber) {
    calculator.displayNumber = digit;
  } else {
    if (calculator.displayNumber === '0') {
      calculator.displayNumber = digit;
    } else {
      calculator.displayNumber += digit;
    }
  }
}

function inverse() {
  if (calculator.displayNumber === '0') {
    return
  }
  calculator.displayNumber = calculator.displayNumber * -1
}

function handle(operator) {
  if (!calculator.waitingForSecondNumber) {
    calculator.operator = operator;
    calculator.waitingForSecondNumber = true;
    calculator.firstNumber = calculator.displayNumber;
  } else {
    alert('Operator sudah ditetapkan')
  }
}

function perform() {

  if (calculator.operator == null || calculator.firstNumber == null) {
    alert('Anda belum menetapkan operator!')
    return
  }

  let result = 0
  if (calculator.operator === '+') {
    result = parseInt(calculator.firstNumber) + parseInt(calculator.displayNumber)
  } else {
    result = parseInt(calculator.firstNumber) - parseInt(calculator.displayNumber)
  }

  // objek yang akan dikirimkan sebagai argumen fungsi put()
  const history = {
    firstNumber: calculator.firstNumber,
    secondNumber: calculator.displayNumber,
    operator: calculator.operator,
    result: result
  }
  put(history);
  calculator.displayNumber = result;
  render();
}

const buttons = document.querySelectorAll('.button')

for (const button of buttons) {
  button.addEventListener('click', function (event) {

    const target = event.target

    if (target.classList.contains('clear')) {
      clear()
      update()
      return
    }

    if (target.classList.contains('equals')) {
      perform()
      update()
      return
    }

    if (target.classList.contains('negative')) {
      inverse()
      update()
      return
    }

    if (target.classList.contains('operator')) {
      handle(target.innerText)
      update()
      return
    }

    input(target.innerText)
    update()
  })
}