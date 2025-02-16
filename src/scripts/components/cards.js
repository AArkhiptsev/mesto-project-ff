import { openModal } from "./modal";

const initialCards = [
  {
    name: "Архыз",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg",
    alt: "Вид на гору Архыз",
  },
  {
    name: "Челябинская область",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg",
    alt: "Суровая челябинская обл",
  },
  {
    name: "Иваново",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg",
    alt: "Город невест",
  },
  {
    name: "Камчатка",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg",
    alt: "Это сладкое слово - Камчатка",
  },
  {
    name: "Холмогорский район",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg",
    alt: "без комментариев",
  },
  {
    name: "Байкал",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg",
    alt: "озеро Байкал",
  },
];

const cardTemplate = document.querySelector("#card-template").content;
const cardsContainer = document.querySelector(".places__list");

//Функция создания карточки
function createCard(card, deleteCard, isLiked) {
  const cardElement = cardTemplate.querySelector(".card").cloneNode(true);
  const likeButton = cardElement.querySelector(".card__like-button");
  const cardImage = cardElement.querySelector(".card__image");

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
  removeButton.addEventListener("click", () => deleteCard(cardElement));
  return cardElement;
}

//Функция удаления карточки
function deleteCard(cardElement) {
  cardElement.remove();
}

//Вывести карточки на страницу
export function renderCards() {
  initialCards.forEach((card) => {
    cardsContainer.append(createCard(card, deleteCard));
  });
}

export function addNewCard(card) {
  cardsContainer.insertBefore(
    createCard(card, deleteCard),
    cardsContainer.firstChild
  );
}

function setLikeCard(cardElement) {
  const likeButton = cardElement.querySelector(".card__like-button");
  if (likeButton.classList.contains("card__like-button_is-active"))
    likeButton.classList.remove("card__like-button_is-active");
  else likeButton.classList.add("card__like-button_is-active");
}

function openPopupImage(alt, src) {
  const popupImageForm = document.querySelector(".popup_type_image");
  popupImageForm.querySelector(".popup__image").src = src;
  popupImageForm.querySelector(".popup__caption").textContent = alt;

  openModal(popupImageForm);
}
