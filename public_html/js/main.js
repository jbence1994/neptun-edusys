$(document).ready(function () {
    let counter = 0;

    function getCourses() {
        return JSON.parse(localStorage.getItem('courses'));
    }

    function getStudents() {
        return JSON.parse(localStorage.getItem('students'));
    }

    function getStudentCourses() {
        return JSON.parse(localStorage.getItem('student_courses'))
    }

    $(document).on('click', '#admin-login', function () {
        window.location = "mainAdmin.html";
    });

    function initalizeLocalStoreageWithTestStudents() {
        let students = getStudents() || [];

        if (students && students.length) {
            return;
        }

        $.get('students.json', function (JSONData) {

            let data = JSON.parse(JSONData);
            for (let i = 0; i < data.length; i++) {

                let student = new Student
                        (data[i].code, data[i].password, data[i].speciality);
                students.push(student);
            }

            localStorage.setItem('students', JSON.stringify(students));
        }, 'text');
    }

    function initalizeLocalStoreageWithTestCourses() {
        let fetchCourses = getCourses();

        if (fetchCourses && fetchCourses.length) {
            return;
        }

        let courses = [];
        $.get('courses.json', function (JSONData) {

            let data = JSON.parse(JSONData);

            for (let i = 0; i < data.length; i++) {

                let course = new Course
                        (data[i].name, data[i].code, data[i].credit,
                                data[i].maxStudent, data[i].teacher, data[i].type);
                courses.push(course);
            }

            localStorage.setItem('courses', JSON.stringify(courses));
        }, 'text');
    }

    function displayCourses() {
        let courses = getCourses();

        if (!courses || !courses.length) {
            return;
        }

        for (let i = 0; i < courses.length; i++) {
            $('#courses').append('<tr><td>' + courses[i]._name + '</td>' +
                    '<td>' + courses[i]._code + '</td>' +
                    '<td>' + courses[i]._credit + '</td>' +
                    '<td>' + courses[i]._maxStudent + '</td>' +
                    '<td>' + courses[i]._teacher + '</td>' +
                    '<td>' + courses[i]._type + '</td>' +
                    '<td><button data-id="' + i + '" class="course_update btn btn-primary">Szerkesztés</button></td>' +
                    '<td><button data-id="' + i + '"class="course_delete btn btn-danger">Törlés</button></td>' +
                    '</tr>');
            $('#courses_student').append('<tr><td>' + courses[i]._name + '</td>' +
                    '<td>' + courses[i]._code + '</td>' +
                    '<td>' + courses[i]._credit + '</td>' +
                    '<td>' + courses[i]._maxStudent + '</td>' +
                    '<td>' + courses[i]._teacher + '</td>' +
                    '<td>' + courses[i]._type + '</td>' +
                    '<td><button data-code="' + courses[i]._code + '" data-id="' + i + '" class="course_handle btn btn-primary">Felvétel</button></td>'
                    );
        }

        let studentCourses = getStudentCourses();

        if (!studentCourses || !Object.keys(studentCourses).length) {
            return;
        }

        let user = JSON.parse(getCookie('user'));
        let currentStudentCourses = studentCourses[user._code];

        for (let i in currentStudentCourses) {
            $('[data-code="' + i + '"]').text("Leadás")
                    .addClass("btn-danger")
                    .removeClass("btn-primary")
                    .attr("data-remove", true);
        }
    }

    initalizeLocalStoreageWithTestStudents();
    initalizeLocalStoreageWithTestCourses();
    displayCourses();

    $(document).on('click', '.logout', function () {
        window.location = "index.html";
    });

    $('#course').on('submit', function (e) {
        e.preventDefault();
        let courses = getCourses();
        let newCourseData = $(this).serializeArray();
        let tmp = {};

        for (let i = 0; i < newCourseData.length; i++) {
            tmp[newCourseData[i].name] = newCourseData[i].value;
        }

        let courseInstance = new Course(
                tmp._name,
                tmp._code,
                tmp._credit,
                tmp._maxStudent,
                tmp._teacher,
                tmp._type
                );

        if ($("#submit_course").attr("update")) {
            $("#submit_course").val("Kurzus felvétele");
            let id = $("#_id").val();
            courses[id] = courseInstance;
        } else {
            courses.push(courseInstance);
        }

        localStorage.setItem('courses', JSON.stringify(courses));
        document.location.reload();
    });

    $(document).on('click', '.course_handle', function () {
        let id = $(this).data("id");
        let courses = getCourses();

        if (!courses[id]) {
            return;
        }

        let remove = $(this).data("remove");
        let studentCourses = getStudentCourses() || {};
        let student = JSON.parse(getCookie('user'));

        if (!studentCourses[student._code]) {
            studentCourses[student._code] = {};
        }

        let userCourses = {};

        for (let i in studentCourses) {
            let keys = Object.keys(studentCourses[i]);

            for (j = 0; j < keys.length; j++) {
                if (userCourses[keys[j]]) {
                    ++userCourses[keys[j]];
                } else {
                    userCourses[keys[j]] = 1;
                }
            }
        }

        let code = $(this).data("code");

        for (let i = 0; i < courses.length; i++) {
            if (code === courses[i]._code) {
                if (userCourses[code]
                        && userCourses[code] >= parseInt(courses[i]._maxStudent)
                        ) {
                    alert('Betelt a hely a kurzuson');
                    return;

                }
            }
        }

        let studentsList = getStudents();
        let count = 0;

        if (remove) {
            delete studentCourses[student._code][code];
            localStorage.removeItem(studentCourses[student._code][code]);
            let count = 0;

            for (let j = 0; j < courses.length; j++) {
                if (courses[j]._code === code) {
                    count += 1 * courses[j]._credit;
                }
            }

            for (let i = 0; i < studentsList.length; i++) {
                if (studentsList[i]._code === student._code) {
                    studentsList[i]['_credit'] -= count;
                }
            }
        } else {
            studentCourses[student._code][courses[id]._code] = 1;

            for (let i in studentCourses[student._code]) {
                for (let j = 0; j < courses.length; j++) {
                    if (i === courses[j]._code) {
                        count += 1 * courses[j]._credit;
                    }
                }
            }

            if (count > 30) {
                delete studentCourses[student._code][courses[id]._code];
                alert('30 kredit limitet elérted');
                return;
            }

            for (let i = 0; i < studentsList.length; i++) {
                if (studentsList[i]._code === student._code) {
                    studentsList[i]['_credit'] = count;
                }
            }
        }

        localStorage.setItem('students', JSON.stringify(studentsList));
        localStorage.setItem('student_courses', JSON.stringify(studentCourses));
        document.location.reload();
    });

    function editCourse() {
        $(".course_update").on("click", function () {
            let id = $(this).data("id");
            let courses = getCourses();

            if (!courses[id]) {
                return;
            }

            $("#submit_course").val("Kurzus módosítása");
            $("#submit_course").attr("update", true);

            for (let i in courses[id]) {
                $("#" + i).val(courses[id][i]);
            }

            $("#_id").val(id);
        });
    }

    function deleteCourse() {
        $(".course_delete").on("click", function () {
            let id = $(this).data("id");
            let courseArray = getCourses();

            if (!courseArray) {
                return;
            }

            if (!courseArray[id]) {
                return;
            }

            let studentCourses = getStudentCourses();

            if (studentCourses && Object.keys(studentCourses).length > 0) {
                for (i in studentCourses) {
                    for (j in studentCourses[i]) {
                        if (j == courseArray[id]._code) {
                            alert('A kurzus nem törölhető, már van feliratkozó');
                            return;
                        }
                    }
                }
            }

            courseArray.splice(id, 1);
            localStorage.setItem('courses', JSON.stringify(courseArray));
            localStorage.removeItem(id);
            document.location.reload();
        });
    }

    function setCookie(key, value, expTime) {
        let expires = "";

        if (expTime) {
            let date = new Date();
            date.setTime(date.getTime() + expTime);
            expires = "; expires= " + date.toUTCString();
        }

        document.cookie = key + "=" + value + expires + ";path=/";
    }

    function getCookie(key) {
        var name = key + "=";
        var decodedCookie = decodeURIComponent(document.cookie);
        var ca = decodedCookie.split(';');

        for (var i = 0; i < ca.length; i++) {
            var c = ca[i];
            while (c.charAt(0) === ' ') {
                c = c.substring(1);
            }
            if (c.indexOf(name) === 0) {
                return c.substring(name.length, c.length);
            }
        }

        return "";
    }

    $(document).on('click', '#student-login', function () {
        if (getCookie('login_limit')) {
            alert('Még nem telt le az 5 perc');
            return;
        }

        ++counter;

        if (counter > 5) {
            setCookie('login_limit', true, 1000 * 60 * 5);
            alert('Pihenj 5 percig');
            return;
        }

        let student_code = $("#studentCode").val();
        let student_password = $("#studentPassword").val();

        if (student_code && student_password) {
            let students = getStudents();

            for (let i = 0; i < students.length; i++) {
                if (students[i]._code === student_code
                        && students[i]._password === student_password) {
                    setCookie('user', JSON.stringify(students[i]), 1000 * 60 * 60 * 60 * 24);
                    window.location = "mainStudent.html";

                }
            }
        }
    });

    function displayStudentData() {
        let cookie = JSON.parse(getCookie('user'));
        $('#student_data').html(cookie._code + " (" + cookie._specialty + ")");

        let students = getStudents();

        if (!students || !students.length) {
            return;
        }

        for (let i = 0; i < students.length; i++) {
            if (cookie._code === students[i]._code) {
                $("#credits").html("<br>" + (1 * students[i]._credit || 0) + " kredit");
            }
        }
    }

    displayStudentData();
    deleteCourse();
    editCourse();
});
