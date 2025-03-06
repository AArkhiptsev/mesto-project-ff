//const regex = /^[a-zA-Zа-яА-ЯёЁ\s-]+$/; //латиница, кириллица, пробелы, дефисы

const showInputError = (formElement, inputElement, inputErrorClass, errorClass, errorMessage) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  errorElement.classList.add(errorClass);
  errorElement.textContent = errorMessage;
  inputElement.classList.add(inputErrorClass);
};

const hideInputError = (formElement, inputElement, inputErrorClass, errorClass,) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.remove(inputErrorClass);
  errorElement.classList.remove(errorClass);
  errorElement.textContent = "";
};


const checkInputValidity = (formElement, inputElement, inputErrorClass, errorClass) => {
  if (!inputElement.validity.valid) {
    showInputError({formElement, inputElement, errorMessage: inputElement.validationMessage, errorClass, inputErrorClass });
  } else {
    hideInputError({formElement, inputElement, errorClass, inputErrorClass});
  }

  if (!inputElement.validity.valid) {
    showInputError({formElement, inputElement, errorMessage: inputElement.validationMessage, errorClass, inputErrorClass });
  } else {
    hideInputError({formElement, inputElement, errorClass, inputErrorClass });
  }
 
};

const hasInvalidInput = (inputList) => {
  return inputList.some((inputElement) => {
    return !inputElement.validity.valid;
  });
};

const toggleButtonState = (inputList, buttonElement, inactiveButtonClass) => {
  if (hasInvalidInput(inputList)) {
    buttonElement.disabled = true;
    buttonElement.classList.add(inactiveButtonClass);
  } else {
    buttonElement.disabled = false;
    buttonElement.classList.remove(inactiveButtonClass);
  }
};


const setEventListeners = ({formElement, inputSelector, inputErrorClass, submitButtonSelector, inactiveButtonClass, errorClass}) => {
  const inputList = Array.from(formElement.querySelectorAll(inputSelector));
  const buttonElement = formElement.querySelector(submitButtonSelector);

  toggleButtonState(inputList, buttonElement, inactiveButtonClass);

  inputList.forEach((inputElement) => {
    inputElement.addEventListener("input", () => {
      checkInputValidity(formElement, inputElement, inputErrorClass, errorClass);
      toggleButtonState(inputList, buttonElement, inactiveButtonClass);
    });
  });
};

export const enableValidation = (formSelector, inputSelector, submitButtonSelector, inactiveButtonClass, inputErrorClass,  errorClass) => {
  const formList = Array.from(document.querySelectorAll(formSelector));
  formList.forEach((formElement) => {
    formElement.addEventListener('submit', (event) => {
      event.preventDefault();
    });
    setEventListeners(formElement, inputSelector, submitButtonSelector, inactiveButtonClass, inputErrorClass, errorClass);
  });
};

const clearValidation = (formElement, {submitButtonSelector, inactiveButtonClass, inputSelector, inputErrorClass, errorClass}) => {
  const inputList = [...formElement.querySelectorAll(inputSelector)];
  const submitButtonElement = formElement.querySelector(submitButtonSelector);

  inputList.forEach((inputElement) => {
    hideInputError({formElement, inputElement, inputErrorClass, errorClass});
  });

  toggleButtonState({inputList, submitButtonElement, inactiveButtonClass });
};