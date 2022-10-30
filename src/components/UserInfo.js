export class UserInfo {
    constructor(userNameSelector, aboutUserSelector) {
        this._userName = document.querySelector(userNameSelector);
        this._about = document.querySelector(aboutUserSelector);
    }
    getUserInfo() {
        const userInfo = {
            name: this._userName.textContent,
            about: this._about.textContent
        };
        return userInfo;
    }
    setUserInfo(name, about) {
        this._userName.textContent = name;
        this._about.textContent = about;
    }
}