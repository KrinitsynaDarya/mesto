import './index.css';
import { UserInfo } from '../components/UserInfo';
import { Card } from '../components/Card.js';
import { FormValidator } from '../components/FormValidator.js';
import { Section } from '../components/Section.js';
import { cardListSection, buttonEditAvatar, buttonEditProfile, buttonAdd, config, formEditProfile, formAddCard, formEditAvatar } from '../utils/constants.js';
import { PopupWithForm } from '../components/PopupWithForm';
import { PopupWithImage } from '../components/PopupWithImage';
import { PopupWithConfirm } from '../components/PopupWithConfirm';
import Api from '../components/Api';
/* API */
const api = new Api({
    baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-52',
    headers: {
        authorization: '258a83b0-9c97-4384-ab74-1331eb2f1b83',
        'Content-Type': 'application/json'
    }
});

/*пользователь*/
const userInfo = new UserInfo('.profile__name', '.profile__about', '.profile__avatar');
let userId;

/*создание карточки*/
const cardsList = new Section({
    renderer: (item) => {
        cardsList.addItem(createCard(item));
    }
},
    cardListSection);

/* объединяем два запроса к серверу */
Promise.all([api.getUserInfo(), api.getInitialCards()])
    .then(([userData, cardsData]) => {
        userInfo.setUserInfo(userData);
        userId = userData._id;
        cardsList.renderItems(cardsData);
    })
    .catch((err) => {
        console.log(`Ошибка: ${err}`);
    });

/*попапы*/
/* 2 поменяли входные параметры */
const popupEditProfile = new PopupWithForm('#popup-profile-edit', (userData) => {
    popupEditProfile.renderLoading(true);
    api.editUserInfo(userData)
        .then((userData) => {
            userInfo.setUserInfo(userData);
            popupEditProfile.close();
        })
        .catch((err) => {
            console.log(`Ошибка: ${err}`);
        })
        .finally(() => { popupEditProfile.renderLoading(false); });

});
popupEditProfile.setEventListeners();

const popupEditAvatar = new PopupWithForm('#popup-avatar-edit', (userData) => {
    popupEditAvatar.renderLoading(true);
    api.editUserAvatar(userData)
        .then((userData) => {
            userInfo.setUserInfo(userData);
            popupEditAvatar.close();
        })
        .catch((err) => {
            console.log(`Ошибка: ${err}`);
        })
        .finally(() => { popupEditAvatar.renderLoading(false); });
});
popupEditAvatar.setEventListeners();

/* 3 поменяли входные параметры */
const popupAddCard = new PopupWithForm('#popup-card-new', (itemData) => {
    popupAddCard.renderLoading(true);
    api.addNewCard(itemData)
        .then((itemData) => {
            cardsList.addItem(createCard(itemData));
            popupAddCard.close();
        })
        .catch((err) => {
            console.log(`Ошибка: ${err}`);
        })
        .finally(() => { popupAddCard.renderLoading(false); });
});
popupAddCard.setEventListeners();

const popupCardPhoto = new PopupWithImage('#popup_view-photo');
popupCardPhoto.setEventListeners();

const popupDeleteBtn = new PopupWithConfirm('#popup-card-delete', () => {
    api.deleteCard()
        .then()
        .catch((err) => {
            console.log(`Ошибка: ${err}`);
        });
})
popupDeleteBtn.setEventListeners();

/*валидация форм*/
const profileEditFormValidator = new FormValidator(config, formEditProfile);
profileEditFormValidator.enableValidation();
const cardAddFormValidator = new FormValidator(config, formAddCard);
cardAddFormValidator.enableValidation();
const editAvatarValidator = new FormValidator(config, formEditAvatar);
editAvatarValidator.enableValidation();

/*слушатели кнопок*/
/* 4 колбэки вынесены в отдельные функции */
function handleBtnEditProfileClick() {
    /* добавив новый метод setInputValues, избавляемся от ввода в инпутах */
    popupEditProfile.setInputValues(userInfo.getUserInfo());
    profileEditFormValidator.resetFormCondition();
    popupEditProfile.open();
}
buttonEditProfile.addEventListener('click', handleBtnEditProfileClick)

function handleBtnEditAvatar() {
    /* добавив новый метод setInputValues, избавляемся от ввода в инпутах */
    popupEditAvatar.setInputValues(userInfo.getUserInfo());
    editAvatarValidator.resetFormCondition();
    popupEditAvatar.open()
}
buttonEditAvatar.addEventListener('click', handleBtnEditAvatar);

function handleButtonAddClick() {
    cardAddFormValidator.resetFormCondition();
    popupAddCard.open();
}
buttonAdd.addEventListener('click', handleButtonAddClick);

function createCard(item) {
    const card = new Card(item, '#element',
        (name, link) => { popupCardPhoto.open(name, link) }, /* если кликнули на картинку */
        (cardId) => { /* попытка удалить картинку*/
            popupDeleteBtn.open();
            /* инструкция действий в случае подтверждения*/
            popupDeleteBtn.handleConfifm(() => {
                api.deleteCard(cardId)
                    .then(() => {
                        card.deleteCard();
                        popupDeleteBtn.close();
                    })
                    .catch((err) => {
                        console.log(`Ошибка: ${err}`);
                    });
            });
        },
        (cardId) => {/* ставим лайк */
            api.addLike(cardId)
                .then((cardData) => {/* если на сервере все прошло успешно, обновляем интерфейс */
                    card.toggleLike();
                    card.updateLikeCounter(cardData);
                })
                .catch((err) => {
                    console.log(`Ошибка: ${err}`);
                });
        },
        (cardId) => {/* убираем лайк */
            api.removeLike(cardId)
                .then((cardData) => {
                    card.toggleLike();
                    card.updateLikeCounter(cardData);
                })
                .catch((err) => {
                    console.log(`Ошибка: ${err}`);
                });
        },
        userId);
    /* 8* избавились от избыточной переменной */
    return card.generateCard();
}