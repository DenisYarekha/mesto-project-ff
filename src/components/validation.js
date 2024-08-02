export const configArg = {
  formSelector: ".popup__form",
  inputSelector: ".popup__input",
  submitButtonSelector: ".popup__button",
  inactiveButtonClass: "popup__button_disabled",
  inputErrorClass: "popup__input_type_error",
  errorClass: "popup__error_visible",
};
//Показ и скрытие ошибки
function showError(input, errorElement, config) {
  input.classList.add(config.inputErrorClass);
  errorElement.textContent = input.validationMessage;
  errorElement.classList.add(config.errorClass);
}

export function hideError(input, errorElement, config) {
  input.classList.remove(config.inputErrorClass);
  errorElement.textContent = input.validationMessage;
  errorElement.classList.remove(config.errorClass);
}

//Валидация
function checkInputValidity(input, formElement, config) {
  const isInputValid = input.validity.valid;
  const errorElement = formElement.querySelector(`#${input.name}-error`);
  if (input.validity.patternMismatch) {
    input.setCustomValidity(input.dataset.errorMessage);
  } else {
    input.setCustomValidity("");
  }
  if (isInputValid) {
    hideError(input, errorElement, configArg);
  } else {
    showError(input, errorElement, configArg);
  }
}

//Состояние кнопки
function toggleButtonState(submitBtn, isActive, config) {
  if (isActive) {
    submitBtn.disabled = false;
    submitBtn.classList.remove(config.inactiveButtonClass);
  } else {
    submitBtn.disabled = true;
    submitBtn.classList.add(config.inactiveButtonClass);
  }
}

//Добавление слушателя
function setEventListener(formElement, config) {
  const inputList = formElement.querySelectorAll(config.inputSelector);
  const submitBtn = formElement.querySelector(config.submitButtonSelector);
  toggleButtonState(submitBtn, formElement.checkValidity(), configArg);
  [...inputList].forEach(function (input) {
    input.addEventListener("input", function () {
      toggleButtonState(submitBtn, formElement.checkValidity(), configArg);
      checkInputValidity(input, formElement, configArg);
    });
  });
}

//Включение валидации
export function enableValidation(config) {
  const formList = document.querySelectorAll(config.formSelector);
  [...formList].forEach(function (formElement) {
    setEventListener(formElement, configArg);
  });
}

//Очистка ошибок
export const clearValidation = (formElement, config) => {
  const inputList = formElement.querySelectorAll(config.inputSelector);
  [...inputList].forEach((input) => {
    input.setCustomValidity("");
    hideError(input, input.nextElementSibling, configArg);
  });
};
