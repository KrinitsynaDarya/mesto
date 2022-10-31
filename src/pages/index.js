import './index.css';
import { UserInfo } from '../components/UserInfo';
import { initialCards } from '../utils/initial-cards.js';/* 1 перенесен в другую директорию */
import { Card } from '../components/Card.js';
import { FormValidator } from '../components/FormValidator.js';
import { Section } from '../components/Section.js';
import { cardListSection, buttonEditProfile, buttonAdd, nameInput, jobInput, placeInput, linkInput, config, /*editProfileForm, addCardForm*/formEditProfile, formAddCard } from '../utils/constants.js';
import { PopupWithForm } from '../components/PopupWithForm';
import { PopupWithImage } from '../components/PopupWithImage';

/*пользователь*/
const userInfo = new UserInfo('.profile__name', '.profile__about');

/*попапы*/
/* 2 поменяли входные параметры */
const popupEditProfile = new PopupWithForm('#popup-profile-edit', (userData) => {
    userInfo.setUserInfo(userData);
    popupEditProfile.close();
});
popupEditProfile.setEventListeners();
/* 3 поменяли входные параметры */
const popupAddCard = new PopupWithForm('#popup-card-new', (itemData) => {
    /*const item = {
        name: placeInput.value,
        link: linkInput.value
    };*/
    cardsList.addItem(createCard(itemData));
    popupAddCard.close();
});
popupAddCard.setEventListeners();

const popupCardPhoto = new PopupWithImage('#popup_view-photo');
popupCardPhoto.setEventListeners();

/*валидация форм*/
const profileEditFormValidator = new FormValidator(config, formEditProfile);
profileEditFormValidator.enableValidation();
const cardAddFormValidator = new FormValidator(config, formAddCard);
cardAddFormValidator.enableValidation();

/*слушатели кнопок*/
/* 4 колбэки вынесены в отдельные функции */
function handleBtnEditProfileClick() {
    const { name, about } = userInfo.getUserInfo();
    nameInput.value = name;
    jobInput.value = about;
    profileEditFormValidator.resetFormCondition();
    popupEditProfile.open();
}
buttonEditProfile.addEventListener('click', handleBtnEditProfileClick)

/* 4 колбэки вынесены в отдельные функции */
function handleButtonAddClick() {
    cardAddFormValidator.resetFormCondition();
    popupAddCard.open();
}
buttonAdd.addEventListener('click', handleButtonAddClick);

/*создание карточки*/
const cardsList = new Section({
    items: initialCards,
    renderer: (item) => {
        cardsList.addItem(createCard(item));
    }
},
    cardListSection);
cardsList.renderItems();

function createCard(item) {
    const card = new Card(item, '#element', (name, link) => { popupCardPhoto.open(name, link) });
    /* 8* избавились от избыточной переменной */
    return card.generateCard();
}