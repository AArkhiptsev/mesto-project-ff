import {
  createCard,
  deleteCard,
  cardsContainer,
} from "./scripts/components/card.js";
import {
  openModal,
  editUser,
  handleFormSubmit,
} from "./scripts/components/modal.js";
import { initialCards } from "./scripts/components/cards.js";

import "./pages/index.css";

//DOM узлы
const popupEditProfile = document.querySelector(".profile__edit-button");
const popupEdit = document.querySelector(".popup_type_edit");
const addCardButton = document.querySelector(".profile__add-button");
const newCard = document.querySelector(".popup_type_new-card");

//Вывести карточки на страницу
function renderCards() {
  initialCards.forEach((card) => {
    cardsContainer.append(createCard(card, deleteCard));
  });
}

export function setLikeCard(cardElement) {
  const likeButton = cardElement.querySelector(".card__like-button");
  if (likeButton.classList.contains("card__like-button_is-active"))
    likeButton.classList.remove("card__like-button_is-active");
  else likeButton.classList.add("card__like-button_is-active");
}

renderCards();

popupEditProfile.addEventListener("click", () => editUser(popupEdit));
addCardButton.addEventListener("click", () => openModal(newCard));
document.addEventListener("submit", handleFormSubmit);
