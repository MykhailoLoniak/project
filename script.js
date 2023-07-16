const out = document.getElementById('calcScreen');
const ac = document.getElementById('ac');
const buttons = document.getElementById('buttons');

let firstNumber = '';
let secondNumber = '';
let operationNumber = '';
let finish = false;

const digit = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '0', '.'];
const acshen = ['-', '+', 'x', '/'];

// кнопка очистити
function clearAll() {
  firstNumber = '';
  secondNumber = '';
  operationNumber = '';
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
    if (secondNumber == '' && operationNumber == '') {
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
    operationNumber = key;
    out.textContent = operationNumber;
  }

  if (key === '=') {
    //нажато =
    if (secondNumber === '') secondNumber = firstNumber;
    switch (operationNumber) {
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
          operationNumber = '';
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
    if (secondNumber === '' && operationNumber === '') {
      firstNumber = operation(firstNumber);
      out.textContent = firstNumber;
    } else if (firstNumber !== '' && operationNumber !== '') {
      secondNumber = operation(secondNumber);
      out.textContent = secondNumber;
    }
  }
  // якщо нажато %
  if (key == '%') performUnaryOperation((value) => value / 100);
  //якщо натиснуто +/-
  if (key == '+/-') performUnaryOperation((value) => value / -1);
};
