'use strict';

/**
 * Modal window
 */

let modal = document.querySelector('.modal');
let overlay = document.querySelector('.overlay');
let modalLink = document.querySelectorAll('.posts__link');
let modalButtons = document.querySelectorAll('.modal__button');
let modalClose = document.querySelectorAll('.modal__close');

/**
 * Modal window listeners
 */

modalLink.forEach(function (item) {
  item.addEventListener('click', function (event) {
    let offset = window.scrollY;

    event.preventDefault();
    modal.classList.add('modal--show');
    overlay.classList.add('overlay--show');

    document.body.style.position = 'fixed';
    document.body.style.top = '-' + offset + 'px' ;
  });
});

modalButtons.forEach(function (item) {
  item.addEventListener('click', function (event) {
    let offset = document.body.style.top;

    event.preventDefault();
    modal.classList.remove('modal--show');
    overlay.classList.remove('overlay--show');

    document.body.style.position = '';
    document.body.style.top = '';
    window.scrollTo(0, parseInt(offset || '0') * -1);
  });
});

modalClose.forEach(function (item) {
  item.addEventListener('click', function (event) {
    let offset = document.body.style.top;

    event.preventDefault();
    modal.classList.remove('modal--show');
    overlay.classList.remove('overlay--show');

    document.body.style.position = '';
    document.body.style.top = '';
    window.scrollTo(0, parseInt(offset || '0') * -1);
  });
});

window.addEventListener('keydown', function (event) {
  if (event.keyCode === 27) {
    if (modal.classList.contains('modal--show')) {
      let offset = document.body.style.top;

      event.preventDefault();
      modal.classList.remove('modal--show');
      overlay.classList.remove('overlay--show');

      document.body.style.position = '';
      document.body.style.top = '';
      window.scrollTo(0, parseInt(offset || '0') * -1);
    }
  }
});

/**
 * Form logic
 */

let form = document.querySelector('.main-form');
let formFields = document.querySelectorAll('input, select');
let formFieldsInputs = document.querySelectorAll('input');
let formFieldsSelects = document.querySelectorAll('select');
let formFieldsCheckboxes = document.querySelectorAll('input[type="checkbox"]');
let formSubmitButton = document.querySelector('.main-form__button');
let isFormError = false;
let formUsername = document.getElementById('username');
let formEmail = document.getElementById('email');
let formButtonsReset = document.querySelectorAll('.main-form__reset-field');

/**
 * Local Storage
 */

let isStorageSupport = true;
let storage = {};

try {
  storage.username = localStorage.getItem('username');
  storage.email = localStorage.getItem('email');
} catch (err) {
  isStorageSupport = false;
}

window.onload = function () {
  if (isStorageSupport && storage.username) {
    formUsername.value = storage.username;
  }

  if (isStorageSupport && storage.email) {
    formEmail.value = storage.email;
  }
}

function createTooltip(parent) {
  let tooltip = document.createElement('div');
      tooltip.classList.add('tooltip');
      parent.appendChild(tooltip);
}

formFields.forEach(
  (el) => {
    createTooltip(el.closest('.main-form__row'));
  }
);

function checkEmptyFields() {
  let isError = false;

  formFieldsInputs.forEach(

    (el) => {
      if (!el.value) {
        el.closest('.main-form__row').classList.add('main-form__row--error');
        isError = true;
      } else {
        el.closest('.main-form__row').classList.remove('main-form__row--error');
      }
    }
  );

  formFieldsSelects.forEach(
    (el) => {
      if (el.value === 'Select your country') {
        el.closest('.main-form__row').classList.add('main-form__row--error');
        isError = true;
      } else {
        el.closest('.main-form__row').classList.remove('main-form__row--error');
      }
    }
  );

  formFieldsCheckboxes.forEach(
    (el) => {
      if (!el.checked) {
        isError = true;
        el.closest('.main-form__row').classList.add('main-form__row--error');
      } else {
        el.closest('.main-form__row').classList.remove('main-form__row--error');
      }
    }
  );

  return isError;
};


(function addValidityToFields() {
  formFieldsInputs.forEach(
    (el) => {
      let tooltip = el.closest('.main-form__row').querySelector('.tooltip');
      tooltip.classList.remove('tooltip--show');

      el.addEventListener('invalid', function (event) {
        event.preventDefault();

        if (el.type !== 'checkbox') {
          if (!event.target.validity.valid) {
            tooltip.textContent = 'Enter correct ' + el.name;
            tooltip.classList.add('tooltip--show');
          } else {
            tooltip.classList.remove('tooltip--show');
          }
        }
      });
    }
  );
})();

formSubmitButton.addEventListener('click', function (event) {
  event.preventDefault();
  let isError = false;

  formFieldsInputs.forEach(
    (el) => {
      let tooltip = el.closest('.main-form__row').querySelector('.tooltip');

      if (el.checkValidity()) {
        el.closest('.main-form__row').classList.remove('main-form__row--error');
        tooltip.classList.remove('tooltip--show');
      } else {
        isError = true;
        el.closest('.main-form__row').classList.add('main-form__row--error');
      }
    }
  );

  formFieldsSelects.forEach(
    (el) => {
      let tooltip = el.closest('.main-form__row').querySelector('.tooltip');

      if (el.value === 'Select your country') {
        tooltip.textContent = 'Enter correct ' + el.name;
        tooltip.classList.add('tooltip--show');
        el.closest('.main-form__row').classList.add('main-form__row--error');
        isError = true;
      } else {
        tooltip.classList.remove('tooltip--show');
        el.closest('.main-form__row').classList.remove('main-form__row--error');
      }
    }
  );

  if (isError) {
    form.classList.remove('main-form--error');
    form.offsetWidth;
    form.classList.add('main-form--error');
  } else {
    form.submit();
    localStorage.setItem('username', formUsername.value);
    localStorage.setItem('email', formEmail.value);
  }

});

form.addEventListener('submit', function (event) {
  if (checkEmptyFields()) {
    event.preventDefault();
    form.classList.remove('main-form--error');
    form.offsetWidth;
    form.classList.add('main-form--error');
  }
});

formButtonsReset.forEach(
  (el) => {
    let parent = el.closest('.main-form__row');
    let input = parent.querySelector('.main-form__input');

    el.addEventListener('click', function (event) {
      event.preventDefault();

      input.value='';
    });
  }
);
