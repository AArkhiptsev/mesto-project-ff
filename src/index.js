import { createCard, cardsContainer } from "./scripts/components/card.js";
import { openModal, closeModal } from "./scripts/components/modal.js";
import { initialCards } from "./scripts/components/cards.js";

import "./pages/index.css";

//DOM узлы
const popupEditProfile = document.querySelector(".popup_type_edit");
const popupNewCard = document.querySelector(".popup_type_new-card");
const popupImage = document.querySelector(".popup_type_image");

const popupEditButton = document.querySelector(".profile__edit-button");
const addCardButton = document.querySelector(".profile__add-button");

const nameInput = document.querySelector(".profile__title").textContent;
const jobInput = document.querySelector(".profile__description").textContent;
const popupForm = document.querySelector('[name="edit-profile"');

export const profileForm = popupForm.querySelector(".popup__input_type_name");
export const popupFormDescription = popupForm.querySelector(
  ".popup__input_type_description"
);

export function handlePressKey(event) {
  if (event.key === "Escape") {
    const isOpened = document.querySelector(".popup_is-opened");
    if (isOpened != null) closeModal(isOpened);
  }
}

export function handleFormSubmit(evt) {
  evt.preventDefault();

  if (evt.srcElement[0].classList.contains("popup__input_type_name")) {
    document.querySelector(".profile__title").textContent = profileForm.value;
    document.querySelector(".profile__description").textContent =
      popupFormDescription.value;
  } else {
    let card = {
      name: document.querySelector(".popup__input_type_card-name").value,
      link: document.querySelector(".popup__input_type_url").value,
      alt: document.querySelector(".popup__input_type_card-name").value,
    };
    addNewCard(card);
  }
  closeModal(document.querySelector(".popup_is-opened"));
}

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

export function openPopupImage(alt, src) {
  const popupImageForm = document.querySelector(".popup_type_image");
  popupImageForm.querySelector(".popup__image").src = src;
  popupImageForm.querySelector(".popup__caption").textContent = alt;
  popupImageForm.querySelector(".popup__image").alt = alt;
  openModal(popupImageForm);
}

export function editUser(modal) {
  loadPopupData();
  openModal(modal);
}

//Функция добавления карточки
export function addNewCard(card) {
  cardsContainer.insertBefore(
    createCard(card, deleteCard),
    cardsContainer.firstChild
  );
}

//Функция удаления карточки
export function deleteCard(cardElement) {
  cardElement.remove();
}

function loadPopupData() {
  profileForm.value = nameInput;
  popupFormDescription.value = jobInput;
}

function addListner(popup) {
  const closeButton = popup.querySelector(".popup__close");
  closeButton.addEventListener("click", () => {
    closeModal(popup);
  });

  document.addEventListener("mousedown", (event) => {
    if (event.target.classList.contains("popup")) {
      closeModal(popup);
    }
  });
}

renderCards();

addListner(popupEditProfile);
addListner(popupNewCard);
addListner(popupImage);

popupEditButton.addEventListener("click", () => editUser(popupEditProfile));
addCardButton.addEventListener("click", () => openModal(popupNewCard));
document.addEventListener("submit", handleFormSubmit);
