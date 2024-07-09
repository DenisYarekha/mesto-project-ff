export const initialCards = [
  {
    name: "Архыз",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg",
  },
  {
    name: "Челябинская область",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg",
  },
  {
    name: "Иваново",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg",
  },
  {
    name: "Камчатка",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg",
  },
  {
    name: "Холмогорский район",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg",
  },
  {
    name: "Байкал",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg",
  },
];

// Функция создания карточки
export function createCard(
  cardImage,
  cardName,
  deleteCallback,
  likeCallback,
  popupCallback
) {
  const cardTemplate = document.querySelector("#card-template").content;
  const cardElement = cardTemplate.querySelector(".card").cloneNode(true);
  const cardsImage = cardElement.querySelector(".card__image");
  cardsImage.src = cardImage;
  cardsImage.alt = cardName;
  cardElement.querySelector(".card__title").textContent = cardName;
  cardElement
    .querySelector(".card__delete-button")
    .addEventListener("click", deleteCallback);
  cardElement
    .querySelector(".card__like-button")
    .addEventListener("click", likeCallback);
  cardElement
    .querySelector(".card__image")
    .addEventListener("click", popupCallback);
  return cardElement;
}

// Функция удаления карточки
export function deleteCard(event) {
  const deletedCard = event.target.closest(".card");
  deletedCard.remove();
}

// Функция лайка карточки
export function likeCard(event) {
  event.target.classList.toggle("card__like-button_is-active");
}
