import { createCard, cardsContainer } from "./scripts/components/card.js";
import { openModal, closeModal } from "./scripts/components/modal.js";
import { enableValidation } from "./scripts/components/validation.js";
import {
  getUserInfo,
  getInitialCards,
  updateUserInfo,
  postCard,
  deleteCardAPI,
} from "./scripts/components/api.js";

import "./pages/index.css";

//DOM узлы
const popupEditProfile = document.querySelector(".popup_type_edit");
const popupNewCard = document.querySelector(".popup_type_new-card");
const popupImage = document.querySelector(".popup_type_image");
const popupAvatar = document.querySelector(".popup_type_edit-avatar");


const popupEditButton = document.querySelector(".profile__edit-button");
const addCardButton = document.querySelector(".profile__add-button");

const popupForm = document.querySelector('[name="edit-profile"');

const popupConfirmDialog = document.querySelector(".popup_type_confirm");
const popupConfirmButton = popupConfirmDialog.querySelector(
  ".popup__button_confirm"
);

const popupEditAvatarButton = document.querySelector(".profile__image");

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


function renderLoading ({ buttonElement, isLoading })  {
  if (isLoading) {
    buttonElement.textContent = 'Сохранение...';
  } else {
    buttonElement.textContent = 'Сохранить';
  }
};

export function handleFormSubmit(evt) {
  evt.preventDefault();

  const cardFormSubmitButton = popupNewCard.querySelector('.popup__button');

  if (evt.srcElement[0].classList.contains("popup__input_type_name")) {
    updateUserInfo(profileForm.value, popupFormDescription.value);
    document.querySelector(".profile__title").textContent = profileForm.value;
    document.querySelector(".profile__description").textContent =
      popupFormDescription.value;
  } else {
    let card = {
      name: document.querySelector(".popup__input_type_card-name").value,
      link: document.querySelector(".popup__input_type_url").value,
      alt: document.querySelector(".popup__input_type_card-name").value,
    };
    addNewCard(card, cardFormSubmitButton);
  }
  closeModal(document.querySelector(".popup_is-opened"));
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
export function addNewCard(card,cardFormSubmitButton) {
  card.likes = [];
  card.owner = {};

  renderLoading({
    buttonElement: cardFormSubmitButton,
    isLoading: true,
  });

  getUserInfo()
    .then(({ ["_id"]: currentUserId }) => {
      postCard(card)
        .then(() => {
          card.owner._id = currentUserId;
          cardsContainer.prepend(
            createCard(card, deleteCard, false, currentUserId)
          );
        })
        .catch((error) => {
          console.error(error);
        });
    })
    .catch((error) => {
      console.error(error);
    })
    .finally(() => {

      renderLoading({
        buttonElement: cardFormSubmitButton,
        isLoading: false,
      });

    })

}

//Функция удаления карточки
export function deleteCard(cardElement, cardId) {
  openModal(popupConfirmDialog);

  popupConfirmButton.onclick = () => {
    deleteCardAPI(cardId)
      .then(() => {
        cardElement.remove();
      })
      .catch((error) => {
        console.error(error);
      })
      .finally(() => {
        closeModal(popupConfirmDialog);
      });
  };
}

function loadPopupData() {
  document.querySelector(".popup__input_type_name").value =
    document.querySelector(".profile__title").textContent;
  document.querySelector(".popup__input_type_description").value =
    document.querySelector(".profile__description").textContent;
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

const setProfile = ({ name, description, avatar }) => {
  document.querySelector(".profile__title").textContent = name;
  document.querySelector(".profile__description").textContent = description;
  document.querySelector(".profile__image").style.backgroundImage = `url(${avatar})`;
};




addListner(popupEditProfile);
addListner(popupNewCard);
addListner(popupImage);
addListner(popupConfirmDialog);
addListner(popupAvatar);


popupEditButton.addEventListener("click", () => editUser(popupEditProfile));
addCardButton.addEventListener("click", () => openModal(popupNewCard));
document.addEventListener("submit", handleFormSubmit);

popupEditAvatarButton.addEventListener("click", () => openModal(popupAvatar));

// Вызовем валидацию всех форм
enableValidation();

Promise.all([getUserInfo(), getInitialCards()])
  .then(([{ name, about, avatar, ["_id"]: currentUserId }, cardsData]) => {
    setProfile({
      name,
      description: about,
      avatar,
    });

    cardsData.forEach((cardData) => {
      cardsContainer.append(
        createCard(cardData, deleteCard, false, currentUserId)
      );
    });
  })
  .catch((error) => {
    console.error(error);
  });
