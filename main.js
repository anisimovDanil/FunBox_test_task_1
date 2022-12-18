//const item_container = document.querySelector('.item-container'); // чтобы это сработало, надо в отдельную функцию иметь
const items = document.querySelector('.items');
const li = document.querySelectorAll('.items li');
//const product_weight = document.querySelector('.product-weight');


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
    if(el.id) {
      document.querySelectorAll('.item-container')[el.id - 1].classList.add('active');
      document.querySelectorAll('.product-weight')[el.id - 1].classList.add('active');
    }
  })
}


function checkWarehouse({id, productTaste, countPortions}) {
  if(countPortions === "" || countPortions === "0") { 
    document.querySelectorAll('.item-container')[id - 1].style.backgroundColor = '#B3B3B3';
    document.querySelectorAll('.product-weight')[id - 1].style.backgroundColor = '#B3B3B3';
    document.querySelectorAll('.product-description')[id - 1].style.color = "#FFFF66";
    document.querySelectorAll('.item-inner-container')[id - 1].classList.add('empty');
    document.querySelectorAll('.product-description')[id - 1].innerHTML =  `Печалька, ${productTaste} закончился.`
  }
}


function hoverEffect(el) {
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
          <p class="present">заказчик доволен</p>
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


// надо это безобразие перенести в функцию, хотя хз как, там ж много parentElement
function makeChoice(el) {
    el.addEventListener('click', function(e) {
    if(e.target.tagName === 'SPAN' && e.target.parentElement.className === 'product-description') {
      if(document.querySelectorAll('.item-container')[+e.target.parentElement.parentElement.id.match(/\d+/g) - 1].classList.value.includes('active') === true) {
        document.querySelectorAll('.item-container')[+e.target.parentElement.parentElement.id.match(/\d+/g) - 1].classList.remove("active");
        document.querySelectorAll('.product-weight')[+e.target.parentElement.parentElement.id.match(/\d+/g) - 1].classList.remove("active");
      }
      else {
        document.querySelectorAll('.item-container')[+e.target.parentElement.parentElement.id.match(/\d+/g) - 1].classList.add('active');
        document.querySelectorAll('.product-weight')[+e.target.parentElement.parentElement.id.match(/\d+/g) - 1].classList.add('active');
      }
    }
    else if( (e.target.tagName === 'P' || 
        e.target.tagName === 'H3' || 
        e.target.tagName === 'H5' || 
        e.target.tagName === 'IMG') && e.target.className !== 'product-description') {
      //item_container.classList.add('active'); // браузер не видет item_container, потому и ошибка
      //document.querySelectorAll('.item-container')[1].classList.add('active'); // нужны idшники
      //e.target.parentElement.id.match(/\d+/g)[0] // получение idшника
      if(document.querySelectorAll('.item-container')[+e.target.parentElement.parentElement.parentElement.id.match(/\d+/g) - 1].classList.value.includes('active') === true) {
        document.querySelectorAll('.item-container')[+e.target.parentElement.parentElement.parentElement.id.match(/\d+/g) - 1].classList.remove("active");
        document.querySelectorAll('.product-weight')[+e.target.parentElement.parentElement.parentElement.id.match(/\d+/g) - 1].classList.remove("active");
      }
      else {
        document.querySelectorAll('.item-container')[+e.target.parentElement.parentElement.parentElement.id.match(/\d+/g) - 1].classList.add('active');
        document.querySelectorAll('.product-weight')[+e.target.parentElement.parentElement.parentElement.id.match(/\d+/g) - 1].classList.add('active');
      }
    }
    else if(e.target.className === 'item-inner-container') {
      if(document.querySelectorAll('.item-container')[+e.target.parentElement.parentElement.id.match(/\d+/g) - 1].classList.value.includes('active') === true) {
        document.querySelectorAll('.item-container')[+e.target.parentElement.parentElement.id.match(/\d+/g) - 1].classList.remove("active");
        document.querySelectorAll('.product-weight')[+e.target.parentElement.parentElement.id.match(/\d+/g) - 1].classList.remove("active");
      }
      else {
      document.querySelectorAll('.item-container')[+e.target.parentElement.parentElement.id.match(/\d+/g) - 1].classList.add('active');
      document.querySelectorAll('.product-weight')[+e.target.parentElement.parentElement.id.match(/\d+/g) - 1].classList.add('active');
      }
    }
    else if(e.target.tagName === 'SPAN') {
      if(document.querySelectorAll('.item-container')[+e.target.parentElement.parentElement.parentElement.parentElement.id.match(/\d+/g) - 1].classList.value.includes('active') === true) {
        document.querySelectorAll('.item-container')[+e.target.parentElement.parentElement.parentElement.parentElement.id.match(/\d+/g) - 1].classList.remove("active");
        document.querySelectorAll('.product-weight')[+e.target.parentElement.parentElement.parentElement.parentElement.id.match(/\d+/g) - 1].classList.remove("active");
      }
      else {
      document.querySelectorAll('.item-container')[+e.target.parentElement.parentElement.parentElement.parentElement.id.match(/\d+/g) - 1].classList.add('active');
      document.querySelectorAll('.product-weight')[+e.target.parentElement.parentElement.parentElement.parentElement.id.match(/\d+/g) - 1].classList.add('active');
      }
    }
    else if(e.target.className.includes('item-container')) {
      if(document.querySelectorAll('.item-container')[+e.target.parentElement.id.match(/\d+/g) - 1].classList.value.includes('active') === true) {
        document.querySelectorAll('.item-container')[+e.target.parentElement.id.match(/\d+/g) - 1].classList.remove("active");
        document.querySelectorAll('.product-weight')[+e.target.parentElement.id.match(/\d+/g) - 1].classList.remove("active");
      }
      else {
      document.querySelectorAll('.item-container')[+e.target.parentElement.id.match(/\d+/g) - 1].classList.add('active');
      document.querySelectorAll('.product-weight')[+e.target.parentElement.id.match(/\d+/g) - 1].classList.add('active');
      }
    }
  });
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
  document.querySelectorAll('.item-inner-container').forEach(el => hoverEffect(el));
  // выбор упаковки
  document.querySelectorAll('.item').forEach(el => makeChoice(el));
});

  
  //items.addEventListener('click', e => console.log('hello')) // рабочий вариант

  /*document.querySelectorAll('.item').forEach(el => {
    el.addEventListener('click',function (e) {
      console.log(e.target)
    });
  });*/ // рабочий вариант, клики по всем элементам li