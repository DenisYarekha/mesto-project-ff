export const configAPI = {
  baseUrl: "https://nomoreparties.co/v1/wff-cohort-19",
  headers: {
    authorization: "b8f67a7d-e964-4184-b09c-85090c5cec14",
    "Content-Type": "application/json",
  },
};

export const getResData = (res) => {
  if (res.ok) {
    return res.json();
  } else {
    return Promise.reject(`Error: ${res.status}`);
  }
};

//Загрузка информации о пользователе с сервера
export const getUserData = () => {
  return fetch(`${configAPI.baseUrl}/users/me`, {
    headers: configAPI.headers,
  }).then((res) => getResData(res));
};

//Загрузка карточек с сервера
export const getCardsData = () => {
  return fetch(`${configAPI.baseUrl}/cards`, {
    headers: configAPI.headers,
  }).then((res) => getResData(res));
};

//Загрузка информации о пользователе и карточках с сервера
export const getInitialInfo = () => {
  return Promise.all([getCardsData(), getUserData()]);
};

//Редактирование профиля
export const editProfile = (userProfileName, userProfileAbout) => {
  return fetch(`${configAPI.baseUrl}/users/me`, {
    method: "PATCH",
    headers: configAPI.headers,
    body: JSON.stringify({
      name: userProfileName,
      about: userProfileAbout,
    }),
  }).then((res) => getResData(res));
};

//Добавление новой карточки
export const postNewCard = (nameCard, linkCard) => {
  return fetch(`${configAPI.baseUrl}/cards`, {
    method: "POST",
    headers: configAPI.headers,
    body: JSON.stringify({
      name: nameCard,
      link: linkCard,
    }),
  }).then((res) => getResData(res));
};

//Отображение количества лайков карточки
export const addLike = (cardId) => {
  return fetch(`${configAPI.baseUrl}/cards/likes/${cardId}`, {
    method: "PUT",
    headers: configAPI.headers,
  }).then((res) => getResData(res));
};

export const deleteLike = (cardId) => {
  return fetch(`${configAPI.baseUrl}/cards/likes/${cardId}`, {
    method: "DELETE",
    headers: configAPI.headers,
  }).then((res) => getResData(res));
};

//Удаление карточки
export const deleteCards = (cardId) => {
  return fetch(`${configAPI.baseUrl}/cards/${cardId}`, {
    method: "DELETE",
    headers: configAPI.headers,
  }).then((res) => getResData(res));
};

//Обновление аватара
export const updateUserAvatar = (avatarLink) => {
  return fetch(`${configAPI.baseUrl}/users/me/avatar`, {
    method: "PATCH",
    headers: configAPI.headers,
    body: JSON.stringify({
      avatar: avatarLink,
    }),
  }).then((res) => getResData(res));
};
