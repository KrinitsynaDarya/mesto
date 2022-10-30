export class FormValidator {
    constructor(config, formElement) {
        this._config = config;
        this._formElement = formElement;
        /* 3* объявляем элементы полями класса*/
        this._buttonElement = this._formElement.querySelector(this._config.submitButtonSelector);
        this._inputList = Array.from(this._formElement.querySelectorAll(this._config.inputSelector));
    }
    /* валидация форм */
    _hasInvalidInput() {
        return this._inputList.some((inputElement) => {
            return !inputElement.validity.valid;
        })
    };

    _inactivateButton() {
        this._buttonElement.classList.add(this._config.inactiveButtonClass);
        this._buttonElement.disabled = true;
    };

    _activateButton() {
        this._buttonElement.classList.remove(this._config.inactiveButtonClass);
        this._buttonElement.disabled = false;
    };

    _showInputError(inputElement, errorMessage) {
        const errorElement = this._formElement.querySelector(`.${inputElement.id}-error`);
        inputElement.classList.add(this._config.inputErrorClass);
        errorElement.textContent = errorMessage;
        errorElement.classList.add(this._config.errorClass);
    };

    _hideInputError(inputElement) {
        const errorElement = this._formElement.querySelector(`.${inputElement.id}-error`);
        inputElement.classList.remove(this._config.inputErrorClass);
        errorElement.classList.remove(this._config.errorClass);
        errorElement.textContent = '';
    };

    _isValid(inputElement) {
        if (!inputElement.validity.valid) {
            this._showInputError(inputElement, inputElement.validationMessage);
        } else {
            this._hideInputError(inputElement);
        }
    };

    _toggleButtonState() {
        if (this._hasInvalidInput()) {
            this._inactivateButton();
        } else {
            this._activateButton();
        }
    };

    _setEventListeners() {
        /* 3* уже объявили элементы полями класса*/
        /*const buttonElement = this._formElement.querySelector(this._config.submitButtonSelector);
        const inputList = Array.from(this._formElement.querySelectorAll(this._config.inputSelector));*/

        this._formElement.addEventListener('submit', (evt) => {
            evt.preventDefault();
        });

        this._inputList.forEach((inputElement) => {
            inputElement.addEventListener('input', () => {
                this._isValid(inputElement);
                this._toggleButtonState();
            });
        });
    };

    resetFormCondition() {
        this._inputList.forEach((inputElement) => {
            this._hideInputError(inputElement);
        });
        this._toggleButtonState();
    };

    enableValidation() {
        this._setEventListeners();
    };
}