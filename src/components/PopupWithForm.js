import Popup from './Popup.js';
export class PopupWithForm extends Popup {
    constructor(popupSelector, handleFormSubmit) {
        super(popupSelector);
        this._form = this._popup.querySelector('.popup__form');
        // достаём все элементы полей 5* прямо в конструкторе
        this._inputList = this._popup.querySelectorAll('.popup__field');
        this._submitButton = this._popup.querySelector('.popup__submit-button');
        this._submitButtonTextDefault = 'Сохранить';
        this._handleFormSubmit = handleFormSubmit;
    }

    _getInputValues() {
        // создаём пустой объект
        this._formValues = {};
        // добавляем в этот объект значения всех полей
        this._inputList.forEach(input => {
            this._formValues[input.name] = input.value;
        });
        // возвращаем объект значений
        return this._formValues;
    }

    renderLoading(isLoading) {
        if (isLoading) {
            this._submitButton.textContent = 'Сохранение...';
            debugger;
            console.log(this._submitButton.textContent);
        }
        else {
            this._submitButton.textContent = this._submitButtonTextDefault;
        }
    }

    close() {
        super.close();
        this._form.reset();
    }

    setEventListeners() {
        super.setEventListeners();
        this._popup.addEventListener('submit', (evt) => {
            evt.preventDefault();
            // добавим вызов функции _handleFormSubmit
            // передадим ей объект — результат работы _getInputValues
            this._handleFormSubmit(this._getInputValues());
        });
    }
}