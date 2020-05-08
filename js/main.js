"use strict";

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
const cardsMenu = document.querySelector(".cards-menu");

let username = localStorage.getItem("customerLogin");

const getData = async function (url) {
  const response = await fetch(url);

  if (!response.ok) {
    throw new Error(`error by address ${url}`);
  }

  return await response.json();
};

const toggleModal = function () {
  modal.classList.toggle("is-open");
};

const toggleModalAuth = function () {
  modalAuth.classList.toggle("is-open");
};

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

function createCardsRestaurants({
  image,
  kitchen,
  name,
  price,
  stars,
  products,
  time_of_delivery,
}) {
  const card = `
    <a class="card card-restaurant" data-products="${products}" data-name="${name}" data-price="${price}" data-kitchen="${kitchen}"
      data-stars="${stars}">
      <img src="${image}" alt="image" class="card-image"/>
      <div class="card-text">
        <div class="card-heading">
          <h3 class="card-title">${name}</h3>
          <span class="card-tag tag">${time_of_delivery}</span>
        </div>
        <!-- /.card-heading -->
        <div class="card-info">
          <div class="rating">
            ${stars}
          </div>
          <div class="price">От ${price} ₽</div>
          <div class="category">${kitchen}</div>
        </div>
        <!-- /.card-info -->
      </div>
      <!-- /.card-text -->
    </a>
    <!-- /.card -->
  `;

  cardsRestaurants.insertAdjacentHTML("afterbegin", card);
}

function createCardGood({ image, name, description, id, price }) {
  const card = document.createElement("div");
  card.className = "card";
  card.insertAdjacentHTML(
    "beforeend",
    `
    <img src="${image}" alt="image" class="card-image"/>
    <div class="card-text">
      <div class="card-heading">
        <h3 class="card-title card-title-reg">${name}</h3>
      </div>
      <!-- /.card-heading -->
      <div class="card-info">
        <div class="ingredients">
          ${description}
        </div>
      </div>
      <!-- /.card-info -->
      <div class="card-buttons">
        <button class="button button-primary button-add-cart">
          <span class="button-card-text">В корзину</span>
          <span class="button-cart-svg"></span>
        </button>
        <strong class="card-price-bold">${price} ₽</strong>
      </div>
    </div>
    <!-- /.card-text -->
  `
  );

  cardsMenu.insertAdjacentElement("beforeend", card);
}

function createMenu({ name, stars, price, kitchen}) {
  const heading = menu.firstElementChild;
  heading.textContent = '';
  heading.insertAdjacentHTML('afterbegin', 
  `<h2 class="section-title restaurant-title">${name}</h2>
    <div class="card-info">
      <div class="rating">
        ${stars}
      </div>
      <div class="price">От ${price} ₽</div>
      <div class="category">${kitchen}</div>
    </div>
    <!-- /.card-info -->`);
}

function openGoods(event) {
  const target = event.target;

  const restaurant = target.closest(".card-restaurant");

  if (restaurant && username) {
    createMenu(restaurant.dataset);
    cardsMenu.textContent = "";
    containerPromo.classList.add("hide");
    restaurants.classList.add("hide");
    menu.classList.remove("hide");

    getData(`../db/${restaurant.dataset.products}`).then((data) => {
      data.forEach(createCardGood);
    });
  } else {
    toggleModalAuth();
  }
}

function init() {
  getData("../db/partners.json").then((data) => {
    data.forEach(createCardsRestaurants);
  });

  cartButton.addEventListener("click", toggleModal);

  close.addEventListener("click", toggleModal);

  cardsRestaurants.addEventListener("click", openGoods);

  logo.addEventListener("click", function () {
    containerPromo.classList.remove("hide");
    restaurants.classList.remove("hide");
    menu.classList.add("hide");
  });

  checkAuth();
}

init();
