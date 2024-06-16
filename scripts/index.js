// @todo: Темплейт карточки
const cardTemplate = document.querySelector('#card-template').content;

// @todo: DOM узлы
const addButton = document.querySelector('.profile__add-button');
const placesList = document.querySelector('.places__list');

// Функция создания карточки
function createCard(cardImage, cardName, deleteCallback) {
    const songElement = cardTemplate.querySelector('.card').cloneNode(true);
    songElement.querySelector('.card__image').src = cardImage;
    songElement.querySelector('.card__title').textContent = cardName; 
    songElement.querySelector('.card__delete-button').addEventListener('click', deleteCallback);
    return songElement;
}

// Функция удаления карточки
function deleteCard(event) {
    const deletedCard = event.target.closest('.card'); 
    deletedCard.remove();
}

// Вывести карточки на страницу
initialCards.forEach((cardItem) => {
    card = createCard(cardItem.link, cardItem.name, deleteCard);
    placesList.append(card);
})