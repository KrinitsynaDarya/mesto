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
const cardTemplate = document.querySelector('#element').content;
const imgLink = popupViewPhoto.querySelector('.popup__photo');

const imgCaption = popupViewPhoto.querySelector('.popup__photo-caption');
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
}

popupEditProfile.addEventListener('click', (evt) => closePopupByClick(evt, popupEditProfile));
popupAddCard.addEventListener('click', (evt) => closePopupByClick(evt, popupAddCard));
popupViewPhoto.addEventListener('click', (evt) => closePopupByClick(evt, popupViewPhoto));

editProfileButton.addEventListener('click', function () {
    nameInput.value = profileName.textContent;
    jobInput.value = profileJob.textContent;

    const buttonElement = popupEditProfile.querySelector(config.submitButtonSelector);
    const inputList = Array.from(popupEditProfile.querySelectorAll(config.inputSelector));
    inputList.forEach((inputElement) => {
        isValid(popupEditProfile, inputElement, config);
        toggleButtonState(inputList, buttonElement, config);
    });

    openPopup(popupEditProfile);
})

addButton.addEventListener('click', function () {
    const buttonElement = popupAddCard.querySelector(config.submitButtonSelector);
    const inputList = Array.from(popupAddCard.querySelectorAll(config.inputSelector));
    toggleButtonState(inputList, buttonElement, config);

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
    renderCard(createCard(placeInput.value, linkInput.value));
    closePopup(popupAddCard);
    evt.target.reset();
})

function toggleLike(button) {
    button.classList.toggle('element__like-button_active');
}

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
    cardPhoto.src = link;
    cardPhoto.alt = 'Фото ' + name;
    cardTitle.textContent = name;

    cardPhoto.addEventListener('click', function (evt) {
        imgLink.src = cardPhoto.src;
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

