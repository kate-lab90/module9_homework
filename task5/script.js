// Задание 5.
//
// Написать код приложения, интерфейс которого состоит из двух input и кнопки. В input можно ввести любое число.
// Заголовок первого input — «номер страницы».Заголовок второго input — «лимит».Заголовок кнопки — «запрос».
// При клике на кнопку происходит следующее:
//  Если число в первом input не попадает в диапазон от 1 до 10 или не является числом — выводить ниже текст «Номер страницы вне диапазона от 1 до 10»;
// Если число во втором input не попадает в диапазон от 1 до 10 или не является числом — выводить ниже текст «Лимит вне диапазона от 1 до 10»;
// Если и первый, и второй input не в диапазонах или не являются числами — выводить ниже текст «Номер страницы и лимит вне диапазона от 1 до 10»;
// Если числа попадают в диапазон от 1 до 10 — сделать запрос по URL https://picsum.photos/v2/list?page=1&limit=10, где GET-параметр page — это число из первого input, а GET-параметр limit — это введённое число второго input.
//   Пример. Если пользователь ввёл 5 и 7, то запрос будет вида https://picsum.photos/v2/list?page=5&limit=7.
//   После получения данных вывести список картинок на экран.
//
//   Если пользователь перезагрузил страницу, то ему должны показываться картинки из последнего
//   успешно выполненного запроса (использовать localStorage).

const btn = document.querySelector('.j-btn');
const resultNode = document.querySelector('.j-result');

Cnhjqrf200390

const displayResult = (data) => {
  let cards = '';
  data.forEach(item => {
    const cardBlock = `
              <div class="card">
              <img src="${item.download_url}" class="card-image" width=50% />
              <p>${item.author}</p>
              </div>
              `;
    cards = cards + cardBlock;
  });  ///// for each
  resultNode.innerHTML = cards;
}


  // data.map(item => (
  //     `<div class="card">
  //       <img
  //         src="${item.download_url}"
  //         class="card-image" width=50%
  //       />
  //       <p>${item.author}</p>
  //     </div>`
  //   )
  // ) ///// map
  // Полученный и обработанный результат вставляем в html
  // resultNode.innerHTML = cards;
 //function

const useRequest = () => {
  const page = document.querySelector('.j-inp').value;
  const limit = document.querySelector('.j-inp-2').value;
  console.log(page, limit)

  if (!(typeof(+page) != 'number' || isNaN(+page) || page == '' || page == ' ')) {
    if (page >= 1 && page <= 200) {
      if (limit >= 1 && limit <= 200) {
        // Делаем запрос данных
        fetch(`https://picsum.photos/v2/list?page${page}&limit=${limit}`)
          //Читаем данные:
          .then((response) => {
            // Объект ответа на запрос превращаем объект в JSON.
            const  result = response.json();
            return result;
          })
          .then((data) => {
            console.log(data);
            if (data) {
              displayResult(data)
              localStorage.setItem('myKey', JSON.stringify(data));
            }

          })
          .catch(() => {
            console.log('error')
          });
      } else {
        resultNode.innerHTML = 'Лимит вне диапазона от 1 до 10';
      }
    } else {
      resultNode.innerHTML = 'Номер страницы вне диапазона от 1 до 10';
    }
  } else {
    resultNode.innerHTML = 'Номер страницы и лимит вне диапазона от 1 до 10';
  }
}




// Берём данные из localStorage
let myString = localStorage.getItem('myKey');
console.log(myString)
if(myString != ' ' || myString != ''){
  displayResult(JSON.parse(myString))
}

btn.addEventListener('click', async () => {
  console.log('start');

  const requestResult = await useRequest();
  // console.log('requestResult', requestResult);
});

