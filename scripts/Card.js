
export class Card {
  /* 3 передаём селектор темплейта в конструктор */
  constructor(data, cardSelector, openPopup) {
    this._cardPhoto = data.link;
    this._cardTitle = data.name;
    this._cardSelector = cardSelector;
    this._cardPhotoPopup = document.querySelector('#popup_view-photo');
    /* 5 объявляем элементы полями класса */
    this._popupPhotoLink = this._cardPhotoPopup.querySelector('.popup__photo');
    this._popupPhotoCaption = this._cardPhotoPopup.querySelector('.popup__photo-caption');

    this._openPopup = () => { openPopup(this._cardPhotoPopup); };
  }
  /* 4 передаём селектор темплейта в метод */
  _getTemplate() {
    const cardElement = document
      .querySelector(this._cardSelector)
      .content
      .querySelector('.element')
      .cloneNode(true);

    return cardElement;
  }

  generateCard() {
    this._element = this._getTemplate();
    /* 5 объявляем элементы полями класса */
    this._elementPhoto = this._element.querySelector('.element__photo');
    this._elementTitle = this._element.querySelector('.element__title');
    this._elementLike = this._element.querySelector('.element__like-button');
    this._elementDelete = this._element.querySelector('.element__delete-button');

    this._elementPhoto.src = this._cardPhoto;
    this._elementPhoto.alt = 'Фото ' + this._cardTitle;
    this._elementTitle.textContent = this._cardTitle;

    this._setEventListeners();
    return this._element;
  }

  _toggleLike() {
    this._elementLike.classList.toggle('element__like-button_active');
  }

  _deleteCard() {
    this._element.remove();
  }

  _setEventListeners() {
    this._elementPhoto.addEventListener('click', (evt) => {
      this._popupPhotoLink.src = this._cardPhoto;
      this._popupPhotoLink.alt = this._cardTitle;
      this._popupPhotoCaption.textContent = this._cardTitle;

      this._openPopup();
    });

    this._elementLike.addEventListener('click', (evt) => {
      this._toggleLike();
    });

    this._elementDelete.addEventListener('click', (evt) => {
      this._deleteCard();
    });
  }

}