import { addLike, deleteLike, deleteCards } from "./api";

// Функция создания карточки
export function createCard(
  card,
  cardTemplate,
  deleteCallback,
  likeCallback,
  popupCallback,
  userId
) {
  const cardElement = cardTemplate.querySelector(".card").cloneNode(true);
  const cardId = card._id;
  const cardImage = cardElement.querySelector(".card__image");
  const cardTitle = cardElement.querySelector(".card__title");
  const deleteButton = cardElement.querySelector(".card__delete-button");
  const likeButton = cardElement.querySelector(".card__like-button");
  const likeCounter = cardElement.querySelector(".card__like-counter");
  cardImage.src = card.link;
  cardImage.alt = card.name;
  cardTitle.textContent = card.name;
  likeCounter.textContent = card.likes.length;

  const likedCard = card.likes.some((like) => like._id === userId);
  if (likedCard) {
    likeButton.classList.add("card__like-button_is-active");
  }
  likeButton.addEventListener("click", () => {
    likeCallback(likeButton, cardId, likeCounter);
  });

  deleteButton.addEventListener("click", () => {
    deleteCallback(deleteButton, cardId);
  });

  cardImage.addEventListener("click", popupCallback);

  if (card.owner._id !== userId) {
    deleteButton.remove();
  }
  return cardElement;
}

// Функция удаления карточки
export function deleteCard(deleteButton, cardId) {
  deleteCards(cardId)
    .then(() => {
      deleteButton.closest(".card").remove();
    })
    .catch((error) => {
      console.log(error);
    });
}

// Функция лайка карточки
export function likeCard(likeButton, cardId, likeCounter) {
  if (likeButton.classList.contains("card__like-button_is-active")) {
    deleteLike(cardId)
      .then((res) => {
        likeButton.classList.remove("card__like-button_is-active");
        likeCounter.textContent = res.likes.length;
      })
      .catch((error) => {
        console.log(error);
      });
  } else {
    addLike(cardId)
      .then((res) => {
        likeButton.classList.add("card__like-button_is-active");
        likeCounter.textContent = res.likes.length;
      })
      .catch((error) => {
        console.log(error);
      });
  }
}
