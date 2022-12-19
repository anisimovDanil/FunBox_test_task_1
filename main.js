const items = document.querySelector('.items');
const li = document.querySelectorAll('.items li');


function updateProductDescription(productDescription) {
  return productDescription.includes('купи') ? productDescription.replace("купи", "<span>купи</span>") : productDescription;
}


function fixText(val, correct_forms) { 
  const n1 = val % 10;
  if(val === 0) return `${correct_forms[0]}`;
  if (val > 10 && val < 20) return `${val} ${correct_forms[2]}`; 
  if (n1 > 1 && n1 < 5) return `${val} ${correct_forms[1]}`; 
  if (n1 == 1) return `${val} ${correct_forms[0]}`; 
  return `${val} ${correct_forms[2]}`;
}


function choiceCart(val) {
  val.forEach(el => {
    document.querySelectorAll('.item-container')[el.id - 1].classList.add('active');
    document.querySelectorAll('.product-weight')[el.id - 1].classList.add('active');
  });
}


function checkWarehouse({id, productTaste, countPortions}) {
  if(countPortions === "" || countPortions === "0") { 
    document.querySelectorAll('.item-container')[id - 1].style.backgroundColor = '#B3B3B3';
    document.querySelectorAll('.item-inner-container')[id - 1].classList.add('empty');
    document.querySelectorAll('.present-note')[id - 1].style.display = "block";
    document.querySelectorAll('.product-weight')[id - 1].style.backgroundColor = '#B3B3B3';
    document.querySelectorAll('.product-description')[id - 1].style.color = "#FFFF66";
    document.querySelectorAll('.product-description')[id - 1].innerHTML =  `Печалька, ${productTaste} закончился.`
  }
}


async function loadJSON() {
  const res = await fetch('db.json');
  const productsInfo = await res.json();
  return productsInfo;
}


function createHTML({id, productTitle, productName, productTaste, countPortions, present, productWeight, productDescription}) {
  items.insertAdjacentHTML('beforeend', `
    <li class="item" id=item-${id}>
      <div class="item-container">
        <div class="item-inner-container">
          <p class="product-title">${productTitle}</p>
          <h3 class="product-name">${productName}</h3>
          <h5 class="product-taste">${productTaste}</h5>
          <p class="count-portions">${fixText(countPortions, ['порция', 'порции', 'порций'])}</p>
          <p class="present">${fixText(present, ['мышь', 'мыши', 'мышей'])} в подарок</p>
          <p class="present-note">заказчик доволен</p>
          <p class="product-weight"><span>${productWeight}</span> кг</p>
          <img class="cat" src="imgs/cat.png" alt="">
        </div>
      </div>
      <p class="product-description">${updateProductDescription(productDescription)}</p>
    </li>  
  `) 
}


function getInfo(productsInfo) {
  items.innerHTML = "";
  productsInfo.forEach(el => createHTML(el));
}


function switchActive(target) {
  document.querySelectorAll('.item-container')[+target.closest(".item").id.match(/\d+/g) - 1].classList.toggle('active');
  document.querySelectorAll('.product-weight')[+target.closest(".item").id.match(/\d+/g) - 1].classList.toggle('active');
}


function makeChoice(el) {
  el.addEventListener('click', e => switchActive(e.target));
}


function setStyle(el, val_prop) {
  document.querySelectorAll('.item-inner-container')[+el.closest(".item").id.match(/\d+/g) - 1].style.top = val_prop[0] + 'px';
  document.querySelectorAll('.item-inner-container')[+el.closest(".item").id.match(/\d+/g) - 1].style.left = val_prop[1] + 'px';
  document.querySelectorAll('.item-inner-container')[+el.closest(".item").id.match(/\d+/g) - 1].style.width = val_prop[2] + 'px';
  document.querySelectorAll('.item-inner-container')[+el.closest(".item").id.match(/\d+/g) - 1].style.height = val_prop[3] + 'px';
  document.querySelectorAll('.item-inner-container')[+el.closest(".item").id.match(/\d+/g) - 1].style.transition = "all 1s";
}



window.addEventListener('DOMContentLoaded', async() => {

  // подгрузка данных из db.json
  const productsInfo = await loadJSON();

  // вывод данных на страницу
  getInfo(productsInfo);

  // проверка на наличие продуктов, если их нет, то будет "серая" упаковка
  productsInfo.forEach(el => checkWarehouse(el));

  // в задании второй элемент "красный", фича реализации
  choiceCart([{id: 2}]);

  // кастом hover эффект
  document.querySelectorAll('.item-container').forEach(el => {
    el.addEventListener('mouseover', e => {
      if(e.target.closest(".item-container").classList.contains('item-container')) setStyle(el, [4, 4, 261, 472]);
    });
    el.addEventListener('mouseout', e => {
      if(e.target.closest(".item-container").classList.contains('item-container') && 
        !el.childNodes[1].classList.contains('empty')) setStyle(el, [0, 0, 269, 480]);
      setTimeout( () => setStyle(el, [4, 4, 261, 472]), 1500);
    });
  });
  
  // выбор упаковки
  document.querySelectorAll('.item-container').forEach(el => makeChoice(el));
  document.querySelectorAll('.product-description span').forEach(el => makeChoice(el));
});