/* Этап 1. Подготовка данных */
// JSON, который мы будем парсить

const jsonString = `
{
    "list": [
    {
     "name": "Petr",
     "age": "20",
     "prof": "mechanic"
    },
    {
     "name": "Vova",
     "age": "60",
     "prof": "pilot"
    }
   ]
}
`;

/* Этап 2. Получение данных */
const data = JSON.parse(jsonString);
let list = data.list;
// console.log(list);

let listArr = new Array();

/* Этап 3. Запись данных в результирующий объект */
for (i = 0; i < list.length; i++) {
  listArr[i] = {
    name: list[i].name,
    age: Number(list[i].age),
    prof: list[i].prof,
  };
}
console.log(listArr);
