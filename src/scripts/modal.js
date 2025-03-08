export const openModal = (modal) => {
  modal.classList.add('popup_is-opened');
  document.addEventListener('keydown', handleDocumentKeydown);
};

export const closeModal = (modal) => {
  modal.classList.remove('popup_is-opened');
  document.removeEventListener('keydown', handleDocumentKeydown);
};

export const handleModalClick = (event) => {
  if (event.target.classList.contains('popup_is-opened')) {
    return closeModal(event.target);
  }

  if (event.target.closest('.popup__close')) {
    return closeModal(event.target.closest('.popup'));
  }
};

const handleDocumentKeydown = (event) => {
  if (event.key === 'Escape') {
    closeModal(document.querySelector('.popup_is-opened'));
  }
};