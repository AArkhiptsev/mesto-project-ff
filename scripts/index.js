// @todo: Темплейт карточки
const cardTemplate = document.querySelector("#card-template").content;
const cardsContainer = document.querySelector(".places__list");

// @todo: DOM узлы

// @todo: Функция создания карточки
function createCard(card, deleteButton) {
  const cardElement = cardTemplate.querySelector(".card").cloneNode(true);
  cardElement.querySelector(".card__image").src = card.link;
  cardElement.querySelector(".card__image").alt = card.alt;
  cardElement.querySelector(".card__title").textContent = card.name;
  const removeButton = cardElement.querySelector(".card__delete-button");
  removeButton.addEventListener("click", () => deleteCard(cardElement));
  return cardElement;
}

// @todo: Функция удаления карточки
function deleteCard(deleteButton) {
  deleteButton.closest(".places__item").remove();
}

// @todo: Вывести карточки на страницу
function renderCards() {
  initialCards.forEach((card) => {
    cardsContainer.append(createCard(card, deleteCard));
  });
}

renderCards();
