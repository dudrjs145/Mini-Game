"use strict";

// Fetch the items from the JSON file
function loadItems() {
  return fetch("data/data.json")
    .then((response) => response.json())
    .then((json) => json.items);
}

// Update the list with the given items
function displayItems(items) {
  const container = document.querySelector(".items");
  const html = items.map((item) => createHTMLString(item)).join("");
  container.innerHTML = html;
}

// Create HTML list item from the given data item
function createHTMLString(item) {
  return `
  <li class="item">
    <img src="${item.image}" alt="${item.type}" class="item__thumbnail" />
    <span class="item__description">${item.gender}, ${item.size}</span>
  </li>
  `;
}
// onXXXXXX 가 들어가면 이벤트를 처리하는 함수라는 뜻
function onButtonClick(event, items) {
  const dataset = event.target.dataset;
  const key = dataset.key;
  const value = dataset.value;

  if (key == null || value == null) {
    return;
  }

  // 현재는 클릭 때마다 items를 새로 업데이트 함
  // -> class visible을 이용해 한 번 업데이트 된 아이템으로 보여지기 조절
  const filter = items.filter((item) => item[key] === value);
  displayItems(filter);
}

function setEventListeners(items) {
  const logo = document.querySelector(".logo");
  const buttons = document.querySelector(".buttons");
  logo.addEventListener("click", () => displayItems(items));
  buttons.addEventListener("click", (event) => onButtonClick(event, items));
}

// main
loadItems()
  .then((items) => {
    displayItems(items);
    setEventListeners(items);
  })
  .catch(console.log);
