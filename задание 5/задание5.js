let form = document.querySelector(".form"); // получение данных из <form>
form.addEventListener("submit", checkData); // слушатель-обработчик на кнопку
let arrValues = new Array(); // массив для данных из <form>
let resultNode = document.querySelector(".result"); // сообщение на странице под формой
let cards = "";
if (localStorage.getItem("cards") !== null) {
  cards = localStorage.getItem("cards");
  resultNode.innerHTML = cards;
}

// функция проверки введёных данных

function checkData(event) {
  event.preventDefault(); // остановка обновления страницы

  // получение значений из <input> в массив
  for (let i = 0; i < form.elements.length - 1; i++) {
    arrValues[i] = Number(form.elements[i].value); // приведение значений массива из 'string' в 'number'
  }

  // проверка значений массива на тип и диапазон
  let arrValuesFilter = arrValues.filter(function (item, i) {
    if (item >= 1 && item <= 10) {
      return item;
    } else {
      // console.log(`${form.elements[i].id} вне диапазона от 1 до 10`);
      resultNode.innerHTML = `${form.elements[i].placeholder} вне диапазона от 1 до 10`;
    }
  });
  console.log(arrValuesFilter);

  // проверка кол-ва значений
  if (arrValuesFilter.length === 0) {
    // console.log("Номер страницы и лимит вне диапазона от 1 до 10");
    resultNode.innerHTML = "Номер страницы и лимит вне диапазона от 1 до 10";
  } else if (arrValuesFilter.length === arrValues.length) {
    dataRequest();
  }
}

// функция запроса данных на сервер

function dataRequest() {
  let params = new URLSearchParams();
  params.set("page", arrValues[0]);
  params.set("limit", arrValues[1]);
  let paramsString = params.toString();
  console.log(paramsString);
  let reqUrl = `https://picsum.photos/v2/list?${paramsString}`; // ссылка запроса
  console.log(cards);
  fetch(reqUrl)
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      cards = "";
      // console.log(data);
      data.forEach((item) => {
        const cardBlock = `
          <div class="card">
            <img
              src="${item.download_url}"
              class="card-image"
            />
            <p>${item.author}</p>
          </div>
        `;
        cards = cards + cardBlock;
      });
      resultNode.innerHTML = cards;
      localStorage.setItem("cards", resultNode.innerHTML);
    })
    .catch(() => {
      console.log("error");
    });
}
