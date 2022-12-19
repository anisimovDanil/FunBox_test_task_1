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


/*function hoverEffect(el) {
  el.addEventListener('mouseout', () => {
    el.style.top = "0";
    el.style.left = "0";
    el.style.width = "269px";
    el.style.height = "480px";
    el.style.transition = "all 1s";
    
    function backStyles() {
      el.style.top = "4px";
      el.style.left = "4px";
      el.style.width = "261px";
      el.style.height = "472px";
    }
    setTimeout(backStyles, 2500);
  });
}*/
//document.querySelectorAll('.item-inner-container')[+target.closest(".item").id.match(/\d+/g) - 1].classList.toggle('active');



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


function switchClass(target) {
  document.querySelectorAll('.item-container')[+target.closest(".item").id.match(/\d+/g) - 1].classList.toggle('active');
  document.querySelectorAll('.product-weight')[+target.closest(".item").id.match(/\d+/g) - 1].classList.toggle('active');
}


function makeChoice(el) {
  el.addEventListener('click', e => switchClass(e.target));
}


function returnStyleContainer(el) {
  document.querySelectorAll('.item-inner-container')[+el.closest(".item").id.match(/\d+/g) - 1].style.top = "4px";
  document.querySelectorAll('.item-inner-container')[+el.closest(".item").id.match(/\d+/g) - 1].style.left = "4px";
  document.querySelectorAll('.item-inner-container')[+el.closest(".item").id.match(/\d+/g) - 1].style.width = "261px";
  document.querySelectorAll('.item-inner-container')[+el.closest(".item").id.match(/\d+/g) - 1].style.height = "472px";
}

function setStyleContainer(el) {
  document.querySelectorAll('.item-inner-container')[+el.closest(".item").id.match(/\d+/g) - 1].style.top = "0";
  document.querySelectorAll('.item-inner-container')[+el.closest(".item").id.match(/\d+/g) - 1].style.left = "0";
  document.querySelectorAll('.item-inner-container')[+el.closest(".item").id.match(/\d+/g) - 1].style.width = "269px";
  document.querySelectorAll('.item-inner-container')[+el.closest(".item").id.match(/\d+/g) - 1].style.height = "480px";
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
      if(e.target.closest(".item-container").classList.contains('item-container')) returnStyleContainer(el);
    });
    el.addEventListener('mouseout', e => {
      if(e.target.closest(".item-container").classList.contains('item-container')) setStyleContainer(el)
      setTimeout( () => returnStyleContainer(el), 2500);
    });
  });

  // выбор упаковки
  document.querySelectorAll('.item-container').forEach(el => makeChoice(el));
  document.querySelectorAll('.product-description span').forEach(el => makeChoice(el));
});