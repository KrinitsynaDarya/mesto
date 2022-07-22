export class FormValidator {
    constructor(config, formElement) {
        this._config = config;
        this._formElement = formElement;
    }
    /* валидация форм */
    _hasInvalidInput(inputList) {
        return inputList.some((inputElement) => {
            return !inputElement.validity.valid;
        })
    };

    _inactivateButton(buttonElement) {
        buttonElement.classList.add(this._config.inactiveButtonClass);
        buttonElement.disabled = true;
    };

    _activateButton(buttonElement) {
        buttonElement.classList.remove(this._config.inactiveButtonClass);
        buttonElement.disabled = false;
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

    _toggleButtonState(inputList, buttonElement) {
        if (this._hasInvalidInput(inputList)) {
            this._inactivateButton(buttonElement);
        } else {
            this._activateButton(buttonElement);
        }
    };

    _setEventListeners() {

        const buttonElement = this._formElement.querySelector(this._config.submitButtonSelector);
        const inputList = Array.from(this._formElement.querySelectorAll(this._config.inputSelector));

        this._formElement.addEventListener('submit', (evt) => {
            evt.preventDefault();
        });

        inputList.forEach((inputElement) => {
            inputElement.addEventListener('input', () => {
                this._isValid(inputElement);
                this._toggleButtonState(inputList, buttonElement);
            });
        });
    };

    toggleButtonState(inputList, buttonElement) {
        this._toggleButtonState(inputList, buttonElement);
    }

    resetFormCondition(inputList) {
        inputList.forEach((inputElement) => {
            this._isValid(inputElement);
        });
    };

    enableValidation() {
        this._setEventListeners();
    };
}