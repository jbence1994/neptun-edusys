class Student {

    constructor(code, password, specialty) {
        this._code = code;
        this._password = password;
        this._specialty = specialty;
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

    get specialty() {
        return this._specialty;
    }

    set specialty(specialty) {
        this._specialty = specialty;
    }

}
