
export class Card {
  constructor(data, openPopup) {
    this._cardPhoto = data.link;
    this._cardTitle = data.name;
    this._cardPhotoPopup = document.querySelector('#popup_view-photo');
    this._openPopup = () => { openPopup(this._cardPhotoPopup);};
  }
 
  _getTemplate() {
    const cardElement = document
      .querySelector('#element')
      .content
      .querySelector('.element')
      .cloneNode(true);

    return cardElement;
  }

  generateCard() {
    this._element = this._getTemplate();
    this._setEventListeners();

    this._element.querySelector('.element__photo').src = this._cardPhoto;
    this._element.querySelector('.element__photo').alt = 'Фото ' + this._cardTitle;
    this._element.querySelector('.element__title').textContent = this._cardTitle;

    return this._element;
  }

  _toggleLike(button) {
    button.classList.toggle('element__like-button_active');
  }

  _deleteCard() {
    this._element.remove();
  }
  _setEventListeners() {
    const cardLike = this._element.querySelector('.element__like-button');
    this._element.querySelector('.element__photo').addEventListener('click', (evt) => {
      const imgLink = this._cardPhotoPopup.querySelector('.popup__photo');
      const imgCaption = this._cardPhotoPopup.querySelector('.popup__photo-caption');
      imgLink.src = this._cardPhoto;
      imgLink.alt = this._cardTitle;
      imgCaption.textContent = this._cardTitle;
      this._openPopup();
    });

    cardLike.addEventListener('click', (evt) => {
      this._toggleLike(cardLike);
    });

    this._element.querySelector('.element__delete-button').addEventListener('click', (evt) => {
      this._deleteCard();
    });
  }
  
}