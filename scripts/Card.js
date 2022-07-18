class Card {
  constructor(data) {
    this._cardPhoto = data.link;
    this._cardTitle = data.name;
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

  _setEventListeners() {
    const cardLike = this._element.querySelector('.element__like-button');
    this._element.querySelector('.element__photo').addEventListener('click', (evt) => {
      imgLink.src = this._cardPhoto;
      imgLink.alt = this._cardTitle;
      imgCaption.textContent = this._cardTitle;
      openPopup(popupViewPhoto);
    });

    cardLike.addEventListener('click', (evt) => {
      toggleLike(cardLike);
    });

    this._element.querySelector('.element__delete-button').addEventListener('click', (evt) => {
      deleteCard(this._element);
    });
  }
}