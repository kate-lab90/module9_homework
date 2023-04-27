// Задание 1.
// Вам дана заготовка и результат, который вы должны получить. Ваша задача — написать код, который будет
// преобразовывать XML в JS-объект и выводить его в консоль.

//{
//   list: [
//     { name: 'Ivan Ivanov', age: 35, prof: 'teacher', lang: 'en' },
//     { name: 'Петр Петров', age: 58, prof: 'driver', lang: 'ru' },
//   ]
// }

//xml который мы будем парсить
const xmlString = `<list> 
  <student>
    <name lang="en">
      <first>Ivan</first>
      <second>Ivanov</second>
    </name>
    <age>35</age>
    <prof>teacher</prof>
  </student>
  <student>
    <name lang="ru">
      <first>Петр</first>
      <second>Петров</second>
    </name>
    <age>58</age>
    <prof>driver</prof>
  </student>
</list>`;

const parser = new DOMParser(); // создание экземпляра класса DOMParser. Он позволит нам парсить XML.
const xmlDOM = parser.parseFromString(xmlString, 'text/xml'); // Парсинг xml. хранится ссфлка на результирующее дом дерево на основе xml строки, записанной в  xmlString

// получение всех Dom-нод
const studentNode = xmlDOM.querySelectorAll('student');
const student1 = studentNode[0];
const nameNode = student1.querySelector('name');
const firstNameNode = nameNode.querySelector('first');
const secondNameNode = nameNode.querySelector('second');
const ageNode = student1.querySelector('age');
const profNode = student1.querySelector('prof');
const langAttr = nameNode.getAttribute('lang');


const student2 = studentNode[1];
const nameNode2 = student2.querySelector('name');
const firstNameNode2 = nameNode2.querySelector('first');
const secondNameNode2 = nameNode2.querySelector('second');
const ageNode2 = student2.querySelector('age');
const profNode2 = student2.querySelector('prof');
const langAttr2 = nameNode2.getAttribute('lang');

//console.log(nameNode)
// console.log(student1)
// console.log(studentNode)

//запись данных в результирующий объект
const list = [
  {
    name: `${firstNameNode.textContent} ${secondNameNode.textContent}`,
    age: ageNode.textContent,
    prof: profNode.textContent,
    lang: langAttr
  },
  {
    name: `${firstNameNode2.textContent} ${secondNameNode2.textContent}`,
    age: ageNode2.textContent,
    prof: profNode2.textContent,
    lang: langAttr2
  }
];

console.log(list);


