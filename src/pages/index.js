import './index.css';
import { UserInfo } from '../components/UserInfo';
import { initialCards } from '../utils/initial-cards.js';/* 1 перенесен в другую директорию */
import { Card } from '../components/Card.js';
import { FormValidator } from '../components/FormValidator.js';
import { Section } from '../components/Section.js';
import { cardListSection, buttonEditProfile, buttonAdd, nameInput, jobInput, placeInput, linkInput, config, /*editProfileForm, addCardForm*/formEditProfile, formAddCard } from '../utils/constants.js';
import { PopupWithForm } from '../components/PopupWithForm';
import { PopupWithImage } from '../components/PopupWithImage';
import Api from '../components/Api';
/* API */
const api = new Api({
    baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-52',
    headers: {
        authorization: '258a83b0-9c97-4384-ab74-1331eb2f1b83',
        'Content-Type': 'application/json'
    }
});
let userId;

api.getUserInfo().then((userData) => {
    userInfo.setUserInfo(userData);
    userId = userData._id;
    console.log(userData);
})
    .catch((err) => {
        console.log(`Ошибка: ${err}`);
    });

const cardsList = new Section({
    renderer: (item) => {
        cardsList.addItem(createCard(item));
    }
},
    cardListSection);
    
api.getInitialCards().then((cardsData) => {
    console.log(cardsData);
    /*создание карточки*/

    cardsList.renderItems(cardsData);
})
    .catch((err) => {
        console.log(`Ошибка: ${err}`);
    });

/*пользователь*/
const userInfo = new UserInfo('.profile__name', '.profile__about', '.profile__avatar');

/*попапы*/
/* 2 поменяли входные параметры */
const popupEditProfile = new PopupWithForm('#popup-profile-edit', (userData) => {
    api.editUserInfo(userData)
        .then((userData) => {
            userInfo.setUserInfo(userData);
            popupEditProfile.close();
            console.log(userData);
        })
        .catch((err) => {
            console.log(`Ошибка: ${err}`);
        });
    // userInfo.setUserInfo(userData);

});
popupEditProfile.setEventListeners();
/* 3 поменяли входные параметры */
const popupAddCard = new PopupWithForm('#popup-card-new', (itemData) => {
    api.addNewCard(itemData)
        .then((itemData) => {
            cardsList.addItem(createCard(itemData));
            popupAddCard.close();
        })
        .catch((err) => {
            console.log(`Ошибка: ${err}`);
        });
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



function createCard(item) {
    const card = new Card(item, '#element', (name, link) => { popupCardPhoto.open(name, link) }, userId);
    /* 8* избавились от избыточной переменной */
    return card.generateCard();
}