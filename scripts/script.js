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
const nameInput = formEditProfile.querySelector('.popup__field_type_name');
const jobInput = formEditProfile.querySelector('.popup__field_type_about');

const placeInput = formAddCard.querySelector('.popup__field_type_place');
const linkInput = formAddCard.querySelector('.popup__field_type_link');

/*вспомогательные переменные*/
const profileName = document.querySelector('.profile__name');
const profileJob = document.querySelector('.profile__about');
const cardTemplate = document.querySelector('#element').content;
const link = popupViewPhoto.querySelector('.popup__photo');
const cap = popupViewPhoto.querySelector('.popup__photo-caption');
function openPopup(popupElement) {
    popupElement.classList.add('popup_opened');
}

function closePopup(popup, e) {
    popup.classList.remove('popup_opened');
}

editProfileButton.addEventListener('click', function () {
    openPopup(popupEditProfile);
    nameInput.value = profileName.textContent;
    jobInput.value = profileJob.textContent;
})

addButton.addEventListener('click', function () {
    openPopup(popupAddCard);
});

closeButtons.forEach(function (btn) {
    const popup = btn.closest('.popup');
    btn.addEventListener('click', (evt) => closePopup(popup, evt));
}
)

formEditProfile.addEventListener('submit', function (evt) {
    evt.preventDefault();
    profileName.textContent = nameInput.value;
    profileJob.textContent = jobInput.value;
    /* 16. Закрываем попап после сохранения изменений*/
    const popup = evt.target.closest('.popup');
    closePopup(popup);
})

formAddCard.addEventListener('submit', function (evt) {
    evt.preventDefault();
    renderCard(createCard(placeInput.value, linkInput.value));
    const popup = evt.target.closest('.popup');
    closePopup(popup);
})

function addLike(button) {
    button.classList.toggle('element__like-button_active');
}

const initialCards = [
    {
        name: 'Архыз',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
    },
    {
        name: 'Челябинская область',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
    },
    {
        name: 'Иваново',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
    },
    {
        name: 'Камчатка',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
    },
    {
        name: 'Холмогорский район',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
    },
    {
        name: 'Байкал',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
    }
];

const cardsGrid = document.querySelector('.elements');
cardsGrid.addEventListener('click', function (evt) {
    if (evt.target.classList.contains('element__like-button')) {
        addLike(evt.target);
    }
    else if (evt.target.classList.contains('element__delete-button')) {
        const el = evt.target.closest('.element');
        deleteCard(el);
    }
    else if (evt.target.classList.contains('element__photo')) {
        link.src = evt.target.src;
        cap.textContent = evt.target.alt;
        openPopup(popupViewPhoto);
    }
});

function deleteCard(el) {
    el.remove();
}

initialCards.forEach(function (card) {
    renderCard(createCard(card.name, card.link));
})

function createCard(name, link) {
    const cardElement = cardTemplate.querySelector('.element').cloneNode(true);
    cardElement.querySelector('.element__photo').src = link;
    cardElement.querySelector('.element__photo').alt = 'Фото ' + name;
    cardElement.querySelector('.element__title').textContent = name;
    return cardElement;
}

function renderCard(card) {
    cardsGrid.prepend(card);
}