// Отримання елементу, який відображає результат обчислень
const out = document.getElementById('calcScreen');

// Отримання кнопки "AC" для очищення
const ac = document.getElementById('ac');

// Отримання контейнера для кнопок калькулятора
const buttons = document.getElementById('buttons');

// Змінні для збереження чисел, операції та стану обчислень
let firstNumber = '';
let secondNumber = '';
let operationNumber = '';
let finish = false;

// Масиви для визначення кнопок з цифрами та арифметичними діями
const digit = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '0', '.'];
const acshen = ['-', '+', 'x', '/'];

// Функція для очищення всіх даних
function clearAll() {
  firstNumber = '';
  secondNumber = '';
  operationNumber = '';
  finish = false;
  out.textContent = '0';
}

// Обробник події кліку на кнопках калькулятора
buttons.onclick = (event) => {
  // Перевірка, чи клік був на кнопці
  if (!event.target.classList.contains('btn')) return;

  // Очищення даних, якщо натиснута кнопка "AC"
  if (event.target.classList.contains('ac')) clearAll();

  // Отримання значення натиснутої кнопки
  const key = event.target.textContent;

  // Обробка натискання кнопок з цифрами та "."
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
  }

  // Обробка натискання кнопок з арифметичними діями
  else if (acshen.includes(key)) {
    operationNumber = key;
    out.textContent = operationNumber;
  }

  // Обчислення та відображення результату
  if (key === '=') {
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

  // Обробка натискання кнопок "%" та "+/-"
  function performUnaryOperation(operation) {
    if (secondNumber === '' && operationNumber === '') {
      firstNumber = operation(firstNumber);
      out.textContent = firstNumber;
    } else if (firstNumber !== '' && operationNumber !== '') {
      secondNumber = operation(secondNumber);
      out.textContent = secondNumber;
    }
  }

  if (key == '%') performUnaryOperation((value) => value / 100);
  if (key == '+/-') performUnaryOperation((value) => value / -1);
};
