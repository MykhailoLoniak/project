const out = document.getElementById('calcScreen');
const ac = document.getElementById('ac');
const buttons = document.getElementById('buttons');

let firstNumber = '';
let secondNumber = '';
let operationNuber = '';
let finish = false;

const digit = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '0', '.'];
const acshen = ['-', '+', 'x', '/'];

// кнопка очистити
function clearAll() {
  firstNumber = '';
  secondNumber = '';
  operationNuber = '';
  finish = false;
  out.textContent = '0';
}
// надиманя на будь яку кнопку
buttons.onclick = (event) => {
  //нажато на calc
  if (!event.target.classList.contains('btn')) return;
  // нажато на AC
  if (event.target.classList.contains('ac')) clearAll();

  //отримуємо нажату кнопку
  const key = event.target.textContent;
  console.log(key);

  //якщо нажато від 0-9 або .
  if (digit.includes(key)) {
    if (secondNumber == '' && operationNuber == '') {
      firstNumber += key;

      out.textContent = firstNumber;
    } else if (firstNumber !== '' && secondNumber !== '' && finish) {
      secondNumber = key;
      finish = false;
      out.textContent = secondNumber;
    } else {
      secondNumber += key;
      out.textContent = secondNumber;
    }
    //якщо нажато -,+,х,/,
  } else if (acshen.includes(key)) {
    operationNuber = key;
    out.textContent = operationNuber;
  }

  if (key === '=') {
    //нажато =
    if (secondNumber === '') secondNumber = firstNumber;
    switch (operationNuber) {
      case '+':
        firstNumber = +firstNumber + +secondNumber;
        break;
      case '-':
        firstNumber = +firstNumber - +secondNumber;
        break;
      case 'x':
        firstNumber = +firstNumber * +secondNumber;
        break;
      case '/':
        if (secondNumber === '0') {
          out.textContent = 'Помилка';
          firstNumber = '';
          secondNumber = '';
          operationNuber = '';
          return;
        }
        firstNumber = +firstNumber / +secondNumber;
        break;
    }
    finish = true;
    out.textContent = firstNumber;
  }
  // якщо нажато % або +/-
  function performUnaryOperation(operation) {
    if (secondNumber === '' && operationNuber === '') {
      firstNumber = operation(firstNumber);
      out.textContent = firstNumber;
    } else if (firstNumber !== '' && operationNuber !== '') {
      secondNumber = operation(secondNumber);
      out.textContent = secondNumber;
    }
  }
  // якщо нажато %
  if (key == '%') performUnaryOperation((value) => value / 100);
  //якщо натиснуто +/-
  if (key == '+/-') performUnaryOperation((value) => value / -1);
};
