const token = "513d1137-6943-46a3-ad65-70df3e80c42f";
const cohort = "wff-cohort-33";
const server = "https://nomoreparties.co/v1";

const CONFIG = {
  baseUrl: `${server}/${cohort}`,
  headers: {
    authorization: token,
    "Content-Type": "application/json",
  },
};

const handleResponse = (response) => {
  if (response.ok) {
    return response.json();
  }

  return Promise.reject(`Ошибка: ${response.status}`);
};

export const getUserInfo = () => {
  return fetch(`${CONFIG.baseUrl}/users/me`, { headers: CONFIG.headers }).then(
    handleResponse
  );
};

export const getInitialCards = () => {
  return fetch(`${CONFIG.baseUrl}/cards`, { headers: CONFIG.headers }).then(
    handleResponse
  );
};

export const postCard = ({ name, link }) => {
  return fetch(`${CONFIG.baseUrl}/cards`, {
    headers: CONFIG.headers,
    method: "POST",
    body: JSON.stringify({
      name,
      link,
    }),
  }).then(handleResponse);
};

export const deleteCard = (cardId) => {
  return fetch(`${CONFIG.baseUrl}/cards/${cardId}`, {
    headers: CONFIG.headers,
    method: "DELETE",
  }).then(handleResponse);
};

export const updateUserInfo = ({ name, description }) => {
  return fetch(`${CONFIG.baseUrl}/users/me`, {
    headers: CONFIG.headers,
    method: "PATCH",
    body: JSON.stringify({
      name,
      about: description,
    }),
  }).then(handleResponse);
};

export const updateUserAvatar = (url) => {
  return fetch(`${CONFIG.baseUrl}/users/me/avatar`, {
    headers: CONFIG.headers,
    method: "PATCH",
    body: JSON.stringify({
      avatar: url,
    }),
  }).then(handleResponse);
};

export const likeCard = (cardId) => {
  return fetch(`${CONFIG.baseUrl}/cards/likes/${cardId}`, {
    headers: CONFIG.headers,
    method: "PUT",
  }).then(handleResponse);
};

export const unLikeCard = (cardId) => {
  return fetch(`${CONFIG.baseUrl}/cards/likes/${cardId}`, {
    headers: CONFIG.headers,
    method: "DELETE",
  }).then(handleResponse);
};
