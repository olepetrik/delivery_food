'use strict';

const cartButton = document.querySelector("#cart-button");
const modal = document.querySelector(".modal");
const close = document.querySelector(".close");
const buttonAuth = document.querySelector(".button-auth");
const modalAuth = document.querySelector(".modal-auth");
const closeAuth = document.querySelector(".close-auth");
const loginForm = document.querySelector("#logInForm");
const loginInput = document.querySelector("#login");
const userName = document.querySelector(".user-name");
const buttonOut = document.querySelector(".button-out");
const notificationAuth = document.querySelector(".notificationAuth");
const cardsRestaurants = document.querySelector(".cards-restaurants");
const containerPromo = document.querySelector(".container-promo");
const restaurants = document.querySelector(".restaurants");
const menu = document.querySelector(".menu");
const logo = document.querySelector(".logo");
const cardsMenu = document.querySelector('.cards-menu');

let username = localStorage.getItem("customerLogin");

function toggleModal() {
  modal.classList.toggle("is-open");
}

function toggleModalAuth() {
  modalAuth.classList.toggle("is-open");
}

function authorized() {
  function logout() {
    username = null;
    buttonOut.removeEventListener("click", logout);
    checkAuth();
    buttonAuth.style.display = "";
    userName.style.display = "";
    buttonOut.style.display = "";
    localStorage.removeItem("customerLogin");
  }

  buttonAuth.style.display = "none";
  userName.style.display = "inline";
  buttonOut.style.display = "block";
  userName.textContent = username;

  buttonOut.addEventListener("click", logout);
}

function notAuthorized() {
  function login(event) {
    event.preventDefault();
    let verifiedLogin = verifyLogin(loginInput.value);

    if (verifiedLogin) {
      toggleModalAuth();
      buttonAuth.removeEventListener("click", toggleModalAuth);
      closeAuth.removeEventListener("click", toggleModalAuth);
      loginForm.removeEventListener("submit", login);
      loginForm.reset();
      checkAuth();
    } else {
      notificationAuth.textContent = "Please enter login";
      notificationAuth.style.display = "inline";
    }
  }

  buttonAuth.addEventListener("click", toggleModalAuth);
  closeAuth.addEventListener("click", toggleModalAuth);
  loginForm.addEventListener("submit", login);
}

function verifyLogin(value) {
  if (!value) {
    return false;
  } else {
    username = value;
    localStorage.setItem("customerLogin", value);

    return true;
  }
}

function checkAuth() {
  if (username) {
    authorized();
  } else {
    notAuthorized();
  }
}

function createCardsRestaurants() {
  const card = `
    <a class="card card-restaurant">
      <img src="img/tanuki/preview.jpg" alt="image" class="card-image"/>
      <div class="card-text">
        <div class="card-heading">
          <h3 class="card-title">Тануки</h3>
          <span class="card-tag tag">60 мин</span>
        </div>
        <!-- /.card-heading -->
        <div class="card-info">
          <div class="rating">
            4.5
          </div>
          <div class="price">От 1 200 ₽</div>
          <div class="category">Суши, роллы</div>
        </div>
        <!-- /.card-info -->
      </div>
      <!-- /.card-text -->
    </a>
    <!-- /.card -->
  `;

  cardsRestaurants.insertAdjacentHTML("afterbegin", card);
}

function createCardGood() {
  const card = document.createElement('div')
  card.className = 'card';
  card.insertAdjacentHTML('beforeend', `
    <img src="img/pizza-plus/pizza-classic.jpg" alt="image" class="card-image"/>
    <div class="card-text">
      <div class="card-heading">
        <h3 class="card-title card-title-reg">Пицца Классика</h3>
      </div>
      <!-- /.card-heading -->
      <div class="card-info">
        <div class="ingredients">Соус томатный, сыр «Моцарелла», сыр «Пармезан», ветчина, салями,
          грибы.
        </div>
      </div>
      <!-- /.card-info -->
      <div class="card-buttons">
        <button class="button button-primary button-add-cart">
          <span class="button-card-text">В корзину</span>
          <span class="button-cart-svg"></span>
        </button>
        <strong class="card-price-bold">510 ₽</strong>
      </div>
    </div>
    <!-- /.card-text -->
  `);

  cardsMenu.insertAdjacentElement('beforeend',card);
}

function openGoods(event) {
  const target = event.target;

  const restaurant = target.closest(".card-restaurant");

  if (restaurant && username) {
    containerPromo.classList.add("hide");
    restaurants.classList.add("hide");
    menu.classList.remove("hide");

    cardsMenu.textContent = '';
    createCardGood();
  } else {
    toggleModalAuth();
  }

  
}

cartButton.addEventListener("click", toggleModal);

close.addEventListener("click", toggleModal);

cardsRestaurants.addEventListener("click", openGoods);

logo.addEventListener("click", function () {
  containerPromo.classList.remove("hide");
  restaurants.classList.remove("hide");
  menu.classList.add("hide");
});


checkAuth();


createCardsRestaurants();
createCardsRestaurants();
createCardsRestaurants();