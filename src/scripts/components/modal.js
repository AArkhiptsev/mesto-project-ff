import { initialCards, renderCards, addNewCard } from "./cards.js";

const popupForm = document.querySelector('[name="edit-profile"');
const cardForm = document.querySelector('[name="new-place"');
const popupFormName = popupForm.querySelector(".popup__input_type_name");
const popupFormDescription = popupForm.querySelector(
  ".popup__input_type_description"
);

function loadPopupData() {
  popupFormName.value = document.querySelector(".profile__title").textContent;
  popupFormDescription.value = document.querySelector(
    ".profile__description"
  ).textContent;
}

function handleFormSubmit(evt) {
  evt.preventDefault();
  document.querySelector(".profile__title").textContent = popupFormName.value;
  document.querySelector(".profile__description").textContent =
    popupFormDescription.value;
  closeModal(document.querySelector(".popup_is-opened"));
}

function handleCardSubmit(evt) {
  evt.preventDefault();
  let card = {
    name: document.querySelector(".popup__input_type_card-name").value,
    link: document.querySelector(".popup__input_type_url").value,
    alt: document.querySelector(".popup__input_type_card-name").value,
  };
  addNewCard(card);
  closeModal(document.querySelector(".popup_is-opened"));
}

export function openModal(modal) {
  modal.classList.add("popup_is-opened");

  modal.addEventListener("keydown", handlePressKey);

  const closeButton = modal.querySelector(".popup__close");
  closeButton.addEventListener("click", handleCloseClick(modal));

  if (modal.classList.contains("popup_type_edit")) {
    loadPopupData();
    popupForm.addEventListener("submit", handleFormSubmit);
  } else {
    cardForm.addEventListener("submit", handleCardSubmit);
  }
}

function closeModal(modal) {
  modal.classList.remove("popup_is-opened");
  document.removeEventListener("keydown", handlePressKey);
  document.removeEventListener("click", handleCloseClick(modal));
}

function handlePressKey(event) {
  if (event.key === "Escape") {
    const isOpened = document.querySelector(".popup_is-opened");
    if (isOpened != null) closeModal(isOpened);
  }
}

function handleCloseClick(element) {
  const closeButton = element.querySelector(".popup__close");
  if (closeButton != null) {
    closeButton.addEventListener("click", () => {
      closeModal(element);
    });
  }

  element.addEventListener("mousedown", (event) => {
    const classList = event.target.classList;
    if (classList.contains("popup")) {
      closeModal(element);
    }
  });
}
