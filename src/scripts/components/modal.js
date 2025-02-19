import { addNewCard } from "./card.js";

const popupForm = document.querySelector('[name="edit-profile"');
const profileForm = popupForm.querySelector(".popup__input_type_name");
const popupFormDescription = popupForm.querySelector(
  ".popup__input_type_description"
);
const nameInput = document.querySelector(".profile__title").textContent;
const jobInput = document.querySelector(".profile__description").textContent;

function loadPopupData() {
  profileForm.value = nameInput;
  popupFormDescription.value = jobInput;
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

export function openModal(modal) {
  modal.classList.add("popup_is-opened");
  document.addEventListener("keydown", handlePressKey);

  const closeButton = modal.querySelector(".popup__close");
  closeButton.addEventListener("click", handleCloseClick(modal));
}

function closeModal(modal) {
  modal.classList.remove("popup_is-opened");
  document.removeEventListener("keydown", handlePressKey);

  const closeButton = modal.querySelector(".popup__close");
  closeButton.removeEventListener("click", handleCloseClick(modal));
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
    closeButton.addEventListener(
      "click",
      () => {
        closeModal(element);
      },
      { once: true }
    );
  }

  element.addEventListener("mousedown", (event) => {
    const classList = event.target.classList;
    if (classList.contains("popup")) {
      closeModal(element);
    }
  });
}

export function editUser(modal) {
  loadPopupData();
  openModal(modal);
}
