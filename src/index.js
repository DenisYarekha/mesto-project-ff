import "../src/index.css";
import { closeModal, openModal } from "./components/modal.js";
import { createCard, deleteCard, likeCard } from "./components/cards.js";
import { initialCards } from "./components/cards.js";

// DOM узлы
const cardsContainer = document.querySelector(".places__list");

//DOM элементы кнопок и попапов
const popupEdit = document.querySelector(".popup_type_edit");
const buttonEdit = document.querySelector(".profile__edit-button");
const buttonClose = popupEdit.querySelector(".popup__close");
const buttonAdd = document.querySelector(".profile__add-button");
const popupAdd = document.querySelector(".popup_type_new-card");
const buttonCloseEdit = popupAdd.querySelector(".popup__close");
const popupImg = document.querySelector(".popup_type_image");
const buttonCloseImg = popupImg.querySelector(".popup__close");

// DOM элементы форм
const formElement = popupEdit.querySelector(".popup__form");
const nameInput = formElement.querySelector(".popup__input_type_name");
const jobInput = formElement.querySelector(".popup__input_type_description");
const formImg = popupAdd.querySelector(".popup__form");

// Функция открытия img
function popupCard(event) {
  popupImg.querySelector(".popup__image").src = event.target.src;
  popupImg.querySelector(".popup__image").alt = event.target.alt;
  popupImg.querySelector(".popup__caption").textContent = event.target.alt;
  openModal(popupImg);
}

// Вывести карточки на страницу
initialCards.forEach((cardItem) => {
  const card = createCard(
    cardItem.link,
    cardItem.name,
    deleteCard,
    likeCard,
    popupCard
  );
  cardsContainer.append(card);
});

// Функции открытия модального окна редактирования профиля
buttonEdit.addEventListener("click", (e) => {
  nameInput.value = document.querySelector(".profile__title").textContent;
  jobInput.value = document.querySelector(".profile__description").textContent;
  openModal(popupEdit);
});

//Функция открытия модального окна добавления карточек
buttonAdd.addEventListener("click", (e) => {
  openModal(popupAdd);
});

// Функция закрытия модального окна на крестик
buttonClose.addEventListener("click", (e) => {
  closeModal(popupEdit);
});

buttonCloseEdit.addEventListener("click", (e) => {
  closeModal(popupAdd);
});

buttonCloseImg.addEventListener("click", (e) => {
  closeModal(popupImg);
});

// Обработчик отправки формы добавления карточки
function handleSubmitAdd(evt) {
  evt.preventDefault();
  const nameInputAdd = popupAdd.querySelector(".popup__input_type_card-name");
  const linkInputAdd = popupAdd.querySelector(".popup__input_type_url");
  const cardAdd = createCard(
    linkInputAdd.value,
    nameInputAdd.value,
    deleteCard,
    likeCard,
    popupCard
  );
  cardsContainer.prepend(cardAdd);
  closeModal(popupAdd);
}

// Обработчик отправки формы профиля
function handleFormSubmit(evt) {
  evt.preventDefault();
  const name = nameInput.value;
  const job = jobInput.value;
  document.querySelector(".profile__title").textContent = name;
  document.querySelector(".profile__description").textContent = job;
  closeModal(popupEdit);
}

// Прикрепляем обработчик к форме:
formElement.addEventListener("submit", handleFormSubmit);
formImg.addEventListener("submit", handleSubmitAdd);
