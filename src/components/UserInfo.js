export class UserInfo {
    constructor(userNameSelector, aboutUserSelector, avatarUserSelector) {
        this._userName = document.querySelector(userNameSelector);
        this._about = document.querySelector(aboutUserSelector);
        this._avatar = document.querySelector(avatarUserSelector);
    }
    /* 7* убрали избыточную переменную userInfo */
    getUserInfo() {
        return {
            name: this._userName.textContent,
            about: this._about.textContent,
            avatar: this._avatar.src
        };
    }
    setUserInfo(data) {
        this._userName.textContent = data.name;
        this._about.textContent = data.about;
        this._avatar.src = data.avatar;
    }
}