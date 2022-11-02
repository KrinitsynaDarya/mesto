export class Card {
  /* 3 передаём селектор темплейта в конструктор */
  constructor(data, cardSelector, handleCardClick, userId) {
    this._cardPhoto = data.link;
    this._cardTitle = data.name;
    this._cardSelector = cardSelector;
    this._cardPhotoPopup = document.querySelector('#popup_view-photo');
    /* 5 объявляем элементы полями класса */
    this._popupPhotoLink = this._cardPhotoPopup.querySelector('.popup__photo');
    this._popupPhotoCaption = this._cardPhotoPopup.querySelector('.popup__photo-caption');
    this._handleCardClick = handleCardClick;
    this._ownerId = data.owner._id;
    this._userId = userId;
  }
  /* 4 передаём селектор темплейта в метод */
  _getTemplate() {
    /* 1* убираем избыточную переменную cardElement */
    return document
      .querySelector(this._cardSelector)
      .content
      .querySelector('.element')
      .cloneNode(true);
  }

  generateCard() {
    console.log(this._ownerId,',', this._userId);
    this._element = this._getTemplate();
    /* 5 объявляем элементы полями класса */
    this._elementPhoto = this._element.querySelector('.element__photo');
    this._elementTitle = this._element.querySelector('.element__title');
    this._elementLike = this._element.querySelector('.element__like-button');
    this._elementDelete = this._element.querySelector('.element__delete-button');
    if (this._ownerId != this._userId) {
      this._elementDelete.remove();
    };
    this._elementPhoto.src = this._cardPhoto;
    /* 2* упрощаем подпись, для современных скринридеров нет необходимости добавлять слова "фото", "изображение" и т.д.*/
    this._elementPhoto.alt = this._cardTitle;
    this._elementTitle.textContent = this._cardTitle;

    this._setEventListeners();
    return this._element;
  }

  _toggleLike() {
    this._elementLike.classList.toggle('element__like-button_active');
  }

  _deleteCard() {
    this._element.remove();
    /* 3* после удаления карточки очищаем ссылку на DOM-элемент*/
    this._element = null;
  }

  _setEventListeners() {
    this._elementPhoto.addEventListener('click', (evt) => {
      this._popupPhotoLink.src = this._cardPhoto;
      this._popupPhotoLink.alt = this._cardTitle;
      this._popupPhotoCaption.textContent = this._cardTitle;

      this._handleCardClick(this._cardTitle, this._cardPhoto);
    });

    this._elementLike.addEventListener('click', (evt) => {
      this._toggleLike();
    });

    this._elementDelete.addEventListener('click', (evt) => {
      this._deleteCard();
    });
  }

}