let popup = document.querySelector('.popup');
let editButton = document.querySelector('.profile__edit-button');
let closeButton = document.querySelector('.popup__close-button');

let profileName = document.querySelector('.profile__name');
let profileJob = document.querySelector('.profile__about');

let formElement = document.querySelector('.popup__form');
let submitButton = formElement.querySelector('.popup__submit-button');
let nameInput = formElement.querySelector('.name');
let jobInput = formElement.querySelector('.about');

let likeButtons = document.querySelectorAll('.element__like-button');

editButton.addEventListener('click', function () {
    popup.classList.add('popup_opened');
    nameInput.value = profileName.textContent;
    jobInput.value = profileJob.textContent;
})

closeButton.addEventListener('click', function () {
    popup.classList.remove('popup_opened');
})

submitButton.addEventListener('click', function (evt) {
    evt.preventDefault();
    let inputs = document.querySelectorAll('input');
    profileName.textContent = inputs[0].value;
    profileJob.textContent = inputs[1].value;
})

function addLike(button) {
    button.classList.toggle('element__like-button_active');
}

likeButtons.forEach(function (likeButton) {
    likeButton.addEventListener('click', () => addLike(likeButton)
    );
});