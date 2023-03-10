/* Этап 1. Подготовка данных */

const parser = new DOMParser();

// XML, который мы будем парсить
const xmlString = `
<list>
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
</list>
`;

/* Этап 2. Получение данных */

// Парсинг XML
const xmlDOM = parser.parseFromString(xmlString, "text/xml");

// Получение DOM-нод
const listNode = xmlDOM.querySelector("list");
const studentNode = listNode.querySelectorAll("student"); // массив студентов
let list = new Array();

/* Этап 3. Запись данных в результирующий объект */

for (let i = 0; i <= studentNode.length - 1; i++) {
  let nameNode = studentNode[i].querySelector("name");
  let firstNode = nameNode.querySelector("first");
  let secondNode = nameNode.querySelector("second");
  let nameNodeFull = firstNode.textContent + " " + secondNode.textContent;
  let ageNode = studentNode[i].querySelector("age");
  let profNode = studentNode[i].querySelector("prof");
  let langAttr = nameNode.getAttribute("lang");
  list[i] = {
    name: nameNodeFull,
    age: Number(ageNode.textContent),
    prof: profNode.textContent,
    lang: langAttr,
  };
}
console.log(list);
