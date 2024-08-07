
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
    hideError(input, errorElement, config);
  } else {
    showError(input, errorElement, config);
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
  toggleButtonState(submitBtn, formElement.checkValidity(), config);
  [...inputList].forEach(function (input) {
    input.addEventListener("input", function () {
      toggleButtonState(submitBtn, formElement.checkValidity(), config); 
      checkInputValidity(input, formElement, config);
    });
  });
}

//Включение валидации
export function enableValidation(config) {
  const formList = document.querySelectorAll(config.formSelector);
  [...formList].forEach(function (formElement) {
    setEventListener(formElement, config);
  });
}

//Очистка ошибок
export const clearValidation = (formElement, config) => {
  const inputList = formElement.querySelectorAll(config.inputSelector);
  const submitBtn = formElement.querySelector(config.submitButtonSelector);
  toggleButtonState(submitBtn, formElement.checkValidity(), config);
  [...inputList].forEach((input) => {
    input.setCustomValidity("");
    hideError(input, input.nextElementSibling, config);
  });
};
