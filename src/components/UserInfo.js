export class UserInfo {
    constructor(userNameSelector, aboutUserSelector) {
        this._userName = document.querySelector(userNameSelector);
        this._about = document.querySelector(aboutUserSelector);
    }
    /* 7* убрали избыточную переменную userInfo */
    getUserInfo() {
        return {
            name: this._userName.textContent,
            about: this._about.textContent
        };
    }
    setUserInfo(data) {
        this._userName.textContent = data.profileName;
        this._about.textContent = data.profileJob;
    }
}