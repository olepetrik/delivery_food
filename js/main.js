const cartButton = document.querySelector("#cart-button");
const modal = document.querySelector(".modal");
const close = document.querySelector(".close");

cartButton.addEventListener("click", toggleModal);
close.addEventListener("click", toggleModal);

function toggleModal() {
  modal.classList.toggle("is-open");
}


// Day 1

const buttonAuth = document.querySelector('.button-auth');
const modalAuth = document.querySelector('.modal-auth');
const closeAuth = document.querySelector('.close-auth');
const loginForm = document.querySelector('#logInForm');
const loginInput = document.querySelector('#login');
const userName = document.querySelector('.user-name');
const buttonOut = document.querySelector('.button-out');
const notificationAuth = document.querySelector('.notificationAuth');

let username = localStorage.getItem('customerLogin');

function toggleModalAuth() {
  modalAuth.classList.toggle('is-open');
}

function authorized() {

  function logout() {
    username = null;
    buttonOut.removeEventListener('click', logout);
    checkAuth();
    buttonAuth.style.display = '';
    userName.style.display = '';
    buttonOut.style.display = '';
    localStorage.removeItem('customerLogin');
  }

  buttonAuth.style.display = 'none';
  userName.style.display = 'inline';
  buttonOut.style.display = 'block';
  userName.textContent = username;

  buttonOut.addEventListener('click', logout);
}

function notAuthorized() {
  function login(event) {
    event.preventDefault();
    let verifiedLogin = verifyLogin(loginInput.value);

    if (verifiedLogin) {
      toggleModalAuth();
      buttonAuth.removeEventListener('click', toggleModalAuth);
      closeAuth.removeEventListener('click', toggleModalAuth);
      loginForm.removeEventListener('submit', login);
      loginForm.reset();
      checkAuth();
    } else {
      notificationAuth.textContent = 'Please enter login';
      notificationAuth.style.display = 'inline';
    }
  }

  buttonAuth.addEventListener('click', toggleModalAuth);
  closeAuth.addEventListener('click', toggleModalAuth);
  loginForm.addEventListener('submit', login);
}

function verifyLogin(value) {
  if (!value) {
    return false;
  } else {
    username = value;
    localStorage.setItem('customerLogin', value);
    
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

checkAuth();