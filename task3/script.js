// Задание 3
//
// Напишите код приложения, интерфейс которого представляет собой input и кнопку. В input можно ввести любое число.
// При клике на кнопку происходит следующее:
//
//   Если число не попадает в диапазон от 1 до 10 — выводить ниже текст «число вне диапазона от 1 до 10».
// Если число попадает в диапазон от 1 до 10 — сделать запрос c помощью XHR по URL https://picsum.photos/v2/list?limit=10,
// где get-параметр limit — это введённое число.
//   Пример. Если пользователь ввёл 5, то запрос будет вида: https://picsum.photos/v2/list?limit=5.
//   После получения данных вывести ниже картинки на экран.


//Функция-обёртка, внутри экземпляр запроса, инициализация запроса,
//обработчик загрузки, обработчик ошибки и отправка запроса
function useRequest(url, callback) {
  let xhr = new XMLHttpRequest();
  xhr.open('GET', url, true);

  xhr.onload = function() {
    if (xhr.status != 200) {
      console.log('Статус ответа: ', xhr.status);
    } else {
      const result = JSON.parse(xhr.response);
      if (callback) {
        callback(result);
      }
    }
  };

  xhr.onerror = function() {
    console.log('Ошибка! Статус ответа: ', xhr.status);
  };

  xhr.send();
};


//Находим кнопку, которую надо нажать для выполнения запроса
const btnNode = document.querySelector('.j-btn');
// Ищем ноду для вставки результата запроса
const resultNode = document.querySelector('.j-result');
// console.log(resultNode);

//Функция обработки полученного результата
//apiData - объект с результатом запроса

function displayResult(apiData) {
  let cards = '';
  // console.log('start cards', cards);

  apiData.forEach(item => {
    const cardBlock = `
      <div class="card">
        <img
          src="${item.download_url}"
          class="card-image" width=50%
        />
        <p>${item.author}</p>
      </div>
    `;
    cards = cards + cardBlock;
  });

  // Полученный и обработанный результат вставляем в html
  resultNode.innerHTML = cards;
}

// Вешаем обработчик на кнопку для запроса
  btnNode.addEventListener('click', () => {
    //Получение значения, введённого в инпут, limit
    const value = document.querySelector('.j-inp').value;
    // console.log(value)
    if (value < 1 || value > 10) {
      resultNode.innerHTML = "Число вне диапазона от 1 до 10";
    } else {
      useRequest(`https://picsum.photos/v2/list?limit=${value}`, displayResult);
    }

  });



