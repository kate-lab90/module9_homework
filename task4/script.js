// Задание 4
//
// Напишите код приложения, интерфейс которого представляет собой 2 input и кнопку submit. В input можно ввести любое число.
//
//   При клике на кнопку происходит следующее:
//
//   Если оба числа не попадают в диапазон от 100 до 300 или введено не число — выводить ниже текст «одно из чисел вне
//   диапазона от 100 до 300»;
// Если числа попадают в диапазон от 100 до 300 — сделать запрос c помощью fetch по URL https://picsum.photos/200/300,
// где первое число — ширина картинки, второе — высота.
//   Пример. Если пользователь ввёл 150 и 200, то запрос будет вида https://picsum.photos/150/200.
//   После получения данных вывести ниже картинку на экран.

//Находим кнопку, которую надо нажать для выполнения запроса
const btn = document.querySelector('.j-btn');
// Ищем ноду для вставки результата запроса
const resultNode = document.querySelector('.j-result');

// Функция, которая возвращает fetch
const useRequest = () => {
  //Получение значения, введённого в инпут, limit
  const value1 = document.querySelector('.j-inp').value;
  const value2 = document.querySelector('.j-inp-2').value;

  if (value1 < 100 || value1 > 300 || value2 < 100 || value2 > 300) {
    resultNode.innerHTML = "Одно из чисел вне диапазона от 100 до 300";
  } else {
    fetch(`https://picsum.photos/${value1}/${value2}`)
      .then((response) => {
        console.log('response', response);
        return response;
      })
      .then((data) => {
        resultNode.innerHTML = `<img alt="img" src=${data.url}>`
      })
      .catch(() => {
        console.log('error')
      });
  }
};

btn.addEventListener('click', async () => {
  console.log('start');

  const requestResult = await useRequest();
  console.log('requestResult', requestResult);

  console.log('end');
});
