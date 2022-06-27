let popup = document.querySelector('.popup');
let editButton = document.querySelector('.profile__edit-button');
let closeButton = document.querySelector('.popup__close-button');

let profileName = document.querySelector('.profile__name');
let profileJob = document.querySelector('.profile__about');
let formElement = document.querySelector('.popup__form');
/* 12. Убрали лишнюю переменную submitButton*/
let nameInput = formElement.querySelector('.popup__field_type_name');
let jobInput = formElement.querySelector('.popup__field_type_about');

/*let likeButtons = document.querySelectorAll('.element__like-button');*/
/* 13. Вынесли работу с модификатором opened блока в отдельную функцию */
function closePopup() {
    popup.classList.remove('popup_opened');
}

editButton.addEventListener('click', function () {
    popup.classList.add('popup_opened');
    nameInput.value = profileName.textContent;
    jobInput.value = profileJob.textContent;
})

closeButton.addEventListener('click', () => closePopup()
)

/* 14. Повесили обработчик события submit на popup__form */
formElement.addEventListener('submit', function (evt) {
    evt.preventDefault();
    /* 15. Убрали querySelectorAll для 'input' */
    profileName.textContent = nameInput.value;
    profileJob.textContent = jobInput.value;
    /* 16. Закрываем попап после сохранения изменений*/
    closePopup();
})

/*function addLike(button) {
    button.classList.toggle('element__like-button_active');
}

likeButtons.forEach(function (likeButton) {
    likeButton.addEventListener('click', () => addLike(likeButton)
    );
});*/

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

const cardTemplate = document.querySelector('#element').content;
const cardsGrid = document.querySelector('.elements');

initialCards.forEach(function(card)
{
const cardElement = cardTemplate.querySelector('.element').cloneNode(true);
cardElement.querySelector('.element__photo').src = card.link;
cardElement.querySelector('.element__photo').alt = 'Фото ' + card.name;
cardElement.querySelector('.element__title').textContent = card.name;
cardsGrid.append(cardElement); 
})
