console.log('Hello, Dasha!');

let editButton = document.querySelector('.profile__edit-button');
let popup = document.querySelector('.popup');
let closeButton = document.querySelector('.popup__close-button');





let likeButtons = document.querySelectorAll('.element__like-button');
console.log(likeButtons.length);

let profileName = document.querySelector('.profile__name');

let profileActivity = document.querySelector('.profile__about');
let fieldName = document.querySelector('.name');
let fieldActivity = document.querySelector('.about');
let submitButton = document.querySelector('.popup__submit-button');
let button;

editButton.addEventListener('click', function () {
    popup.classList.remove('hidden');
    fieldName.value = profileName.textContent;
    fieldActivity.value = profileActivity.textContent;
})

function addLike(button) {
    button.classList.toggle('element__like-button_active');
}


likeButtons.forEach(function (likeButton) {
    likeButton.addEventListener('click', () => addLike(likeButton)
    );
});


closeButton.addEventListener('click', function () {
    popup.classList.add('hidden');
})

submitButton.addEventListener('click', function (evt) {
    evt.preventDefault();
    let inputs = document.querySelectorAll('input');
    profileName.textContent = inputs[0].value;
    profileActivity.textContent = inputs[1].value;
})

