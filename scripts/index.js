// Темплейт карточки
const cardTemplate = document.querySelector('#card-template').content;

// DOM узлы
const cardsContainer = document.querySelector('.places__list');

// Функция создания карточки
function createCard(cardImage, cardName, deleteCallback) {
    const cardElement = cardTemplate.querySelector('.card').cloneNode(true);
    const cardsImage = cardElement.querySelector('.card__image');
    cardsImage.src = cardImage;
    cardsImage.alt = cardName;
    cardElement.querySelector('.card__title').textContent = cardName; 
    cardElement.querySelector('.card__delete-button').addEventListener('click', deleteCallback);
    return cardElement;
}

// Функция удаления карточки
function deleteCard(event) {
    const deletedCard = event.target.closest('.card'); 
    deletedCard.remove();
}

// Вывести карточки на страницу
initialCards.forEach((cardItem) => {
    const card = createCard(cardItem.link, cardItem.name, deleteCard);
    cardsContainer.append(card);
})