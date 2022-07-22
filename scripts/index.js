/*попапы*/
const popupEditProfile = document.querySelector('#popup-profile-edit');
const popupAddCard = document.querySelector('#popup-card-new');
const popupViewPhoto = document.querySelector('#popup_view-photo');
/*кнопки*/
const editProfileButton = document.querySelector('.profile__edit-button');
const addButton = document.querySelector('.profile__add-button');

const closeButtons = document.querySelectorAll('.popup__close-button');
/*формы*/
const formEditProfile = document.querySelector('#popup-profile-edit');
const formAddCard = document.querySelector('#popup-card-new');

/*поля ввода*/
const nameInput = formEditProfile.querySelector('#profile-name');
const jobInput = formEditProfile.querySelector('#profile-job');

const placeInput = formAddCard.querySelector('.popup__field_type_place');
const linkInput = formAddCard.querySelector('.popup__field_type_link');

/*вспомогательные переменные*/
const profileName = document.querySelector('.profile__name');
const profileJob = document.querySelector('.profile__about');
/*const cardTemplate = document.querySelector('#element').content;*/
const imgLink = popupViewPhoto.querySelector('.popup__photo');
const imgCaption = popupViewPhoto.querySelector('.popup__photo-caption');
const config =
{
    formSelector: '.popup__form',
    inputSelector: '.popup__field',
    submitButtonSelector: '.popup__submit-button',
    inactiveButtonClass: 'popup__submit-button_inactive',
    inputErrorClass: 'popup__field_type_error',
    errorClass: 'popup__field-error_active'
};

const editProfileForm = document.querySelector('.popup__form_type_edit-profile');
const editProfileFormValidator = new FormValidator(config, editProfileForm);
const addCardForm = document.querySelector('.popup__form_type_add-card');
const addCardFormValidator = new FormValidator(config, addCardForm);
editProfileFormValidator.enableValidation();
addCardFormValidator.enableValidation();

const submitEditProfileFormBtn = popupEditProfile.querySelector(config.submitButtonSelector);
const inputsListEditProfileForm = Array.from(popupEditProfile.querySelectorAll(config.inputSelector));
const submitAddCardFromBtn = popupAddCard.querySelector(config.submitButtonSelector);
const inputsListAddCardForm = Array.from(popupAddCard.querySelectorAll(config.inputSelector));

function closePopup(popup) {
    popup.classList.remove('popup_opened');
    document.removeEventListener('keydown', closePopupByEsc);
};

function closePopupByEsc(evt) {
    if (evt.key === 'Escape') {
        const popup = document.querySelector('.popup_opened');
        closePopup(popup);
    }
};

function openPopup(popupElement) {
    popupElement.classList.add('popup_opened');
    document.addEventListener('keydown', closePopupByEsc);
};

function closePopupByClick(evt, popup) {
    if (evt.target === evt.currentTarget) { closePopup(popup); }
};

popupEditProfile.addEventListener('click', (evt) => closePopupByClick(evt, popupEditProfile));
popupAddCard.addEventListener('click', (evt) => closePopupByClick(evt, popupAddCard));
popupViewPhoto.addEventListener('click', (evt) => closePopupByClick(evt, popupViewPhoto));

editProfileButton.addEventListener('click', function () {
    nameInput.value = profileName.textContent;
    jobInput.value = profileJob.textContent;
    editProfileFormValidator.resetFormCondition(inputsListEditProfileForm);
    addCardFormValidator.toggleButtonState(inputsListAddCardForm, submitAddCardFromBtn);
    openPopup(popupEditProfile);
})

addButton.addEventListener('click', function () {
    addCardFormValidator.toggleButtonState(inputsListAddCardForm, submitAddCardFromBtn);
    openPopup(popupAddCard);
});

closeButtons.forEach(function (btn) {
    const popup = btn.closest('.popup');
    btn.addEventListener('click', () => closePopup(popup));
}
)

formEditProfile.addEventListener('submit', function (evt) {
    evt.preventDefault();
    profileName.textContent = nameInput.value;
    profileJob.textContent = jobInput.value;
    closePopup(popupEditProfile);
})

formAddCard.addEventListener('submit', function (evt) {
    evt.preventDefault();
    const item = {
        name: placeInput.value,
        link: linkInput.value
    };
    const card = new Card(item, openPopup);
    const cardElement = card.generateCard();

    renderCard(cardElement);
    closePopup(popupAddCard);
    evt.target.reset();
})

const cardsGrid = document.querySelector('.elements');

import { initialCards } from './initial-cards.js'; /* импортируем начальные данные */
import { Card } from './Card.js';
import { FormValidator } from './FormValidator.js';

initialCards.forEach(function (item) {
    const card = new Card(item,openPopup);
    const cardElement = card.generateCard();
    renderCard(cardElement);
})

function renderCard(card) {
    cardsGrid.prepend(card);
}

/*const formList = Array.from(document.querySelectorAll(config.formSelector));
formList.forEach((formElement) => {
    const formValidator = new FormValidator(config, formElement);
    formValidator.enableValidation();
});*/
