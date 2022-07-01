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
const imgLink = popupViewPhoto.querySelector('.popup__photo');
/* 1. переменной дано более понятное имя */
const imgCaption = popupViewPhoto.querySelector('.popup__photo-caption');
function openPopup(popupElement) {
    popupElement.classList.add('popup_opened');
}
/* 2. убрали e из параметров */
function closePopup(popup) {
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
    btn.addEventListener('click', () => closePopup(popup));
}
)

formEditProfile.addEventListener('submit', function (evt) {
    evt.preventDefault();
    profileName.textContent = nameInput.value;
    profileJob.textContent = jobInput.value;
    /* 3. функции передано имя попапа в явном виде */
    closePopup(popupEditProfile);
})

formAddCard.addEventListener('submit', function (evt) {
    evt.preventDefault();
    renderCard(createCard(placeInput.value, linkInput.value));
    /* 4. функции передано имя попапа в явном виде */
    closePopup(popupAddCard);
    /* 5. сброс значений полей после добавления карточки */
    evt.target.reset();
})

/* 6. функция переименована */
function toggleLike(button) {
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

function deleteCard(el) {
    el.remove();
}

initialCards.forEach(function (card) {
    renderCard(createCard(card.name, card.link));
})

function createCard(name, link) {
    const cardElement = cardTemplate.querySelector('.element').cloneNode(true);
    const cardPhoto = cardElement.querySelector('.element__photo');
    const cardLike = cardElement.querySelector('.element__like-button');
    const cardTitle = cardElement.querySelector('.element__title');
    /* 7. заменили на переменную для избежания дублирования поиска */
    cardPhoto.src = link;
    cardPhoto.alt = 'Фото ' + name;
    cardTitle.textContent = name;

    /* 8. переносим обработчики событий, убирая делегирование */
    cardPhoto.addEventListener('click', function (evt) {
        imgLink.src = cardPhoto.src;
        /* 9. добавляем alt в попап с картинкой */
        imgLink.alt = cardPhoto.alt;
        imgCaption.textContent = cardTitle.textContent;
        openPopup(popupViewPhoto);
    });

    cardLike.addEventListener('click', function (evt) {
        toggleLike(cardLike);
    });

    cardElement.querySelector('.element__delete-button').addEventListener('click', function (evt) {
        deleteCard(cardElement);
    });

    return cardElement;
}

function renderCard(card) {
    cardsGrid.prepend(card);
}