/*селекторы*/
export const cardListSection = '.elements';
export const config =
{
    formSelector: '.popup__form',
    inputSelector: '.popup__field',
    submitButtonSelector: '.popup__submit-button',
    inactiveButtonClass: 'popup__submit-button_inactive',
    inputErrorClass: 'popup__field_type_error',
    errorClass: 'popup__field-error_active'
};
/*кнопки*/
export const editProfileButton = document.querySelector('.profile__edit-button');
export const addButton = document.querySelector('.profile__add-button');

/*формы*/
const formEditProfile = document.querySelector('#popup-profile-edit');
const formAddCard = document.querySelector('#popup-card-new');
export const editProfileForm = document.querySelector('.popup__form_type_edit-profile');
export const addCardForm = document.querySelector('.popup__form_type_add-card');

/*поля ввода*/
export const nameInput = formEditProfile.querySelector('#profile-name');
export const jobInput = formEditProfile.querySelector('#profile-job');

export const placeInput = formAddCard.querySelector('.popup__field_type_place');
export const linkInput = formAddCard.querySelector('.popup__field_type_link');