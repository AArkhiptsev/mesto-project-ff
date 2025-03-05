import { setLikeCard, openPopupImage } from "../../index.js";

const cardTemplate = document.querySelector("#card-template").content;
export const cardsContainer = document.querySelector(".places__list");

//Функция создания карточки
export function createCard(card, deleteCard, isLiked, currentUserId) {
  const cardElement = cardTemplate.querySelector(".card").cloneNode(true);
  const likeButton = cardElement.querySelector(".card__like-button");
  const cardImage = cardElement.querySelector(".card__image");

  const likeCounter = cardElement.querySelector(".card__like-counter");

  if (card.likes.length > 0) {
    likeCounter.classList.add("card__like-counter_is-active");
    likeCounter.textContent = card.likes.length;
  }

  cardElement.querySelector(".card__image").src = card.link;
  cardElement.querySelector(".card__image").alt = card.alt;
  cardElement.querySelector(".card__title").textContent = card.name;

  if (isLiked) likeButton.classList.add("card__like-button_is-active");
  else likeButton.classList.remove("card__like-button_is-active");

  likeButton.addEventListener("click", () => setLikeCard(cardElement));
  cardImage.addEventListener("click", () =>
    openPopupImage(card.alt, card.link)
  );

  const removeButton = cardElement.querySelector(".card__delete-button");

  if (card.owner["_id"] === currentUserId) {
    removeButton.classList.add("card__delete-button_is-active");
    removeButton.addEventListener("click", () =>
      deleteCard(cardElement, card._id)
    );
  }

  return cardElement;
}