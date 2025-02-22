import { addNewCard } from "./card.js";
import { profileForm, popupFormDescription } from "../../index.js";

function handlePressKey(event) {
  if (event.key === "Escape") {
    const isOpened = document.querySelector(".popup_is-opened");
    if (isOpened != null) closeModal(isOpened);
  }
}

export const openModal = (modal) => {
  modal.classList.add("popup_is-opened");
  document.addEventListener("keydown", handlePressKey);
};

export const closeModal = (modal) => {
  modal.classList.remove("popup_is-opened");
  document.removeEventListener("keydown", handlePressKey);
};


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

