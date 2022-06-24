let popup = document.querySelector('.popup');
let editButton = document.querySelector('.profile__edit-button');
let closeButton = document.querySelector('.popup__close-button');

let profileName = document.querySelector('.profile__name');
let profileJob = document.querySelector('.profile__about');
let formElement = document.querySelector('.popup__form');
/* 12. Убрали лишнюю переменную submitButton*/
let nameInput = formElement.querySelector('.popup__field_name');
let jobInput = formElement.querySelector('.popup__field_about');

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