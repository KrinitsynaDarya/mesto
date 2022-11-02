export class Section {
    constructor({ /*items,*/ renderer }, containerSelector) {
       // this._initialArray = items;
        this._renderer = renderer; // renderer — это функция

        this._container = document.querySelector(containerSelector);
    }

    renderItems(data) {
        /*this._initialArray.*/data.forEach(item => this._renderer(item));
    }
    /* 6* добавляем карточки в начало */
    addItem(element) { this._container.prepend(element); }
}