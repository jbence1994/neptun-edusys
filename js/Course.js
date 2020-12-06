class Course {

    constructor(name, code, credit, maxStudent, teacher, type) {
        this._name = name;
        this._code = code;
        this._credit = credit;
        this._maxStudent = maxStudent;
        this._teacher = teacher;
        this._type = type;
    }

    get name() {
        return this._name;
    }

    set name(name) {
        this._name = name;
    }

    get code() {
        return this._code;
    }

    set code(code) {
        this._code = code;
    }

    get credit() {
        return this._credit;
    }

    set credit(credit) {
        this._credit = credit;
    }

    get maxStudent() {
        return this._maxStudent;
    }

    set maxStudent(maxStudent) {
        this._maxStudent = maxStudent;
    }

    get teacher() {
        return this._teacher;
    }

    set teacher(teacher) {
        this._teacher = teacher;
    }

    get type() {
        return this._type;
    }

    set type(type) {
        this._type = type;
    }

}
