import "../src/index.css";
import { closeModal, openModal } from "./components/modal.js";
import { createCard, deleteCard, likeCard } from "./components/card.js";
import { enableValidation, clearValidation } from "./components/validation.js";
import { configArg } from "./components/validation.js";
import {
  getUserData,
  getCardsData,
  getInitialInfo,
  editProfile,
  postNewCard,
  updateUserAvatar,
} from "./components/api.js";

// DOM узлы
const cardTemplate = document.querySelector("#card-template").content;
const cardsContainer = document.querySelector(".places__list");
const avatarImage = document.querySelector(".profile__image");
const profileTitle = document.querySelector(".profile__title");
const profileDescription = document.querySelector(".profile__description");

//DOM элементы кнопок и попапов
const popupEdit = document.querySelector(".popup_type_edit");
const buttonEdit = document.querySelector(".profile__edit-button");
const buttonClose = popupEdit.querySelector(".popup__close");
const buttonAdd = document.querySelector(".profile__add-button");
const popupAdd = document.querySelector(".popup_type_new-card");
const buttonCloseEdit = popupAdd.querySelector(".popup__close");
const popupImg = document.querySelector(".popup_type_image");
const buttonCloseImg = popupImg.querySelector(".popup__close");
const avatarEdit = document.querySelector(".popup_type_avatar");
const buttonCloseAvatar = avatarEdit.querySelector(".popup__close");

// DOM элементы форм
const formElementEdit = popupEdit.querySelector(".popup__form");
const nameInput = formElementEdit.querySelector(".popup__input_type_name");
const jobInput = formElementEdit.querySelector(
  ".popup__input_type_description"
);
const formImg = popupAdd.querySelector(".popup__form");
const formAvatar = avatarEdit.querySelector(".popup__form");

//UX кнопки
const LoadingButton = (isLoading, button) => {
  if (isLoading) {
    button.textContent = "Сохранение...";
  } else {
    button.textContent = "Сохранить";
  }
};

//Функция добавления карточки
function addCard(
  card,
  cardTemplate,
  deleteCard,
  likeCard,
  openPopupCard,
  userID
) {
  const cardElement = createCard(
    card,
    cardTemplate,
    deleteCard,
    likeCard,
    openPopupCard,
    userID
  );
  cardsContainer.append(cardElement);
}
// Функция вывода карточек на страницу
function fillInitialCards(initialCards, userID) {
  initialCards.forEach((card) => {
    addCard(card, cardTemplate, deleteCard, likeCard, openPopupCard, userID);
  });
}

// Функции открытия модального окна редактирования профиля
buttonEdit.addEventListener("click", (e) => {
  nameInput.value = profileTitle.textContent;
  jobInput.value = profileDescription.textContent;
  clearValidation(formElementEdit, configArg);
  openModal(popupEdit);
});

//Функция открытия модального окна добавления карточек
buttonAdd.addEventListener("click", (e) => {
  openModal(popupAdd);
  formImg.reset();
  clearValidation(formImg, configArg);
});

//Функция открытия модального окна изменения аватара
avatarImage.addEventListener("click", (e) => {
  openModal(avatarEdit);
  formAvatar.reset();
  clearValidation(formAvatar, configArg);
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

buttonCloseAvatar.addEventListener("click", (e) => {
  closeModal(avatarEdit);
});

// Функция открытия img
function openPopupCard(event) {
  popupImg.querySelector(".popup__image").src = event.target.src;
  popupImg.querySelector(".popup__image").alt = event.target.alt;
  popupImg.querySelector(".popup__caption").textContent = event.target.alt;
  openModal(popupImg);
}

// Обработчик отправки формы добавления карточки
function handleSubmitAdd(evt) {
  evt.preventDefault();
  const nameInputAdd = popupAdd.querySelector(".popup__input_type_card-name");
  const linkInputAdd = popupAdd.querySelector(".popup__input_type_url");
  LoadingButton(true, popupAdd.querySelector(".popup__button"));
  postNewCard(nameInputAdd.value, linkInputAdd.value)
    .then((res) => {
      const newCard = createCard(
        card,
        cardTemplate,
        deleteCard,
        likeCard,
        openPopupCard
      );
      cardsContainer.prepend(newCard);
      closeModal(popupAdd);
      console.log(res);
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(() => {
      LoadingButton(false, popupAdd.querySelector(".popup__button"));
      formImg.reset();
      closeModal(popupAdd);
    });
}

// Обработчик отправки формы профиля
function handleFormSubmitEdit(evt) {
  evt.preventDefault();
  const name = nameInput.value;
  const job = jobInput.value;
  LoadingButton(true, popupEdit.querySelector(".popup__button"));
  editProfile(name, job)
    .then((res) => {
      profileTitle.textContent = res.name;
      profileDescription.textContent = res.about;
      closeModal(popupEdit);
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(() => {
      LoadingButton(false, popupEdit.querySelector(".popup__button"));
      formElementEdit.reset();
      closeModal(popupEdit);
    });
}

//Обработчик отправки формы аватара
function handleSubmitAvatar(evt) {
  evt.preventDefault();
  const linkValue = document.querySelector(".avatar__input_type_url").value;
  avatarImage.src = linkValue;
  LoadingButton(true, avatarEdit.querySelector(".popup__button"));
  updateUserAvatar(linkValue)
    .then((res) => {
      avatarImage.style.backgroundImage = `url(${res.avatar})`;
      closeModal(avatarEdit);
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(() => {
      LoadingButton(false, avatarEdit.querySelector(".popup__button"));
      formAvatar.reset();
      closeModal(avatarEdit);
    });
}

// Прикрепляем обработчик к форме:
formElementEdit.addEventListener("submit", handleFormSubmitEdit);
formImg.addEventListener("submit", handleSubmitAdd);
formAvatar.addEventListener("submit", handleSubmitAvatar);

// Инициализация
let userID;

getInitialInfo();
Promise.all([getCardsData(), getUserData()])
  .then(([cards, user]) => {
    profileTitle.textContent = user.name;
    profileDescription.textContent = user.about;
    avatarImage.style.backgroundImage = `url(${user.avatar})`;
    userID = user._id;
    fillInitialCards(cards, userID);
  })
  .catch((error) => {
    console.log(error);
  });

// Включение валидации
enableValidation(configArg);
