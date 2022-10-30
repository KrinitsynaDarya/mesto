import './index.css';
import { UserInfo } from '../components/UserInfo';
import { initialCards } from '../components/initial-cards.js';
import { Card } from '../components/Card.js';
import { FormValidator } from '../components/FormValidator.js';
import { Section } from '../components/Section.js';
import { cardListSection, editProfileButton, addButton, nameInput, jobInput, placeInput, linkInput, config, editProfileForm, addCardForm } from '../utils/constants.js';
import { PopupWithForm } from '../components/PopupWithForm';
import { PopupWithImage } from '../components/PopupWithImage';

/*пользователь*/
const userInfo = new UserInfo('.profile__name', '.profile__about');

/*попапы*/
const popupEditProfile = new PopupWithForm('#popup-profile-edit', () => {
    userInfo.setUserInfo(nameInput.value, jobInput.value);
    popupEditProfile.close();
});
popupEditProfile.setEventListeners();

const popupAddCard = new PopupWithForm('#popup-card-new', () => {
    const item = {
        name: placeInput.value,
        link: linkInput.value
    };
    cardsList.addItem(createCard(item));
    popupAddCard.close();
});
popupAddCard.setEventListeners();

const popupCardPhoto = new PopupWithImage('#popup_view-photo');
popupCardPhoto.setEventListeners();

/*валидация форм*/
const editProfileFormValidator = new FormValidator(config, editProfileForm);
editProfileFormValidator.enableValidation();
const addCardFormValidator = new FormValidator(config, addCardForm);
addCardFormValidator.enableValidation();

/*слушатели кнопок*/
editProfileButton.addEventListener('click', function () {
    const { name, about } = userInfo.getUserInfo();
    nameInput.value = name;
    jobInput.value = about;
    editProfileFormValidator.resetFormCondition();
    popupEditProfile.open();
})

addButton.addEventListener('click', function () {
    addCardFormValidator.resetFormCondition();
    popupAddCard.open();
});

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
    const cardElement = card.generateCard();
    return cardElement;
}