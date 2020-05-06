class Admin {

    constructor(code, password) {
        this._code = code;
        this._password = password;
    }

    get code() {
        return this._code;
    }

    set code(code) {
        this._code = code;
    }

    get password() {
        return this._password;
    }

    set password(password) {
        this._password = password;
    }

}
