const out = document.getElementById('calcScreen');
const ac = document.getElementById('ac');
const buttons = document.getElementById('buttons');

let a = '';
let b = '';
let sing = '';
let finish = false;

const digit = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '0', '.'];
const acshen = ['-', '+', 'x', '/'];

// кнопка очистити
function clearAll() {
  a = '';
  b = '';
  sing = '';
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
  //якщо нажато від 0-9 або .
  if (digit.includes(key)) {
    if (b == '' && sing == '') {
      a += key;

      out.textContent = a;
    } else if (a !== '' && b !== '' && finish) {
      b = key;
      finish = false;
      out.textContent = b;
    } else {
      b += key;
      out.textContent = b;
    }
    //якщо нажато -,+,х,/,
  } else if (acshen.includes(key)) {
    sing = key;
    out.textContent = sing;
  }
  console.log(a, sing, b);

  if (key === '=') {
    //нажато =
    if (b === '') b = a;
    switch (sing) {
      case '+':
        a = +a + +b;
        break;
      case '-':
        a = +a - +b;
        break;
      case 'x':
        a = +a * +b;
        break;
      case '/':
        if (b === '0') {
          out.textContent = 'Помилка';
          a = '';
          b = '';
          sing = '';
          return;
        }
        a = +a / +b;
        break;
    }
    finish = true;
    out.textContent = a;
  }

  console.log(a);
};
