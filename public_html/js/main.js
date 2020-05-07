$(document).ready(function () {
    let counter = 0;

    function getCourseArray() {
        return JSON.parse(localStorage.getItem('courses'));
    }

    $(document).on('click', '#admin-login', function () {
        window.location = "mainAdmin.html";
    });

    function initalizeLocalStoreageWithTestStudents() {

        let students = [];
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

        // $('#courses').empty();
        // HTML reinit ne legyen duplikáltan benne, ami már benne van ...

        let courses = getCourseArray();

        for (let i = 0; i < courses.length; i++) {
            $('#courses').append('<tr><td>' + courses[i]._name + '</td>' +
                    '<td>' + courses[i]._code + '</td>' +
                    '<td>' + courses[i]._credit + '</td>' +
                    '<td>' + courses[i]._maxStudent + '</td>' +
                    '<td>' + courses[i]._teacher + '</td>' +
                    '<td>' + courses[i]._type + '</td>' +
                    '</tr>');
        }
    }

    initalizeLocalStoreageWithTestStudents();
    initalizeLocalStoreageWithTestCourses();
    displayCourses();

    $(document).on('click', '.logout', function () {
        window.location = "index.html";
    });

    $('#new_course').on('submit', function (e) {

        e.preventDefault();

        let newCourseData = $(this).serialize();
        console.log(newCourseData.value);

        let courses = getCourseArray();

        // course data split for .ctor set

        console.log(courses);
        console.log(newCourseData);



        courses.push(new Course(newCourseData));
        localStorage.setItem('courses', JSON.stringify(courses));

        displayCourses();
    });

    $(document).on('click', '#list_courses', function () {
        // diák oldalon kurzus lista ...
    });





    function deleteCourse(key) {
        localStorage.removeItem(key);


        if (courseArray) {
            for (let i = 0; i < courseArray.length; i++) {
                if (key === courseArray[i]) {
                    courseArray.splice(i, 1);
                }
            }
            localStorage.setItem('courseArray', JSON.stringify(courseArray));
        }
    }

    function setCookie(key, value, expTime) {
        let expires = ""; // lejárati dátum

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
            while (c.charAt(0) == ' ') {
                c = c.substring(1);
            }
            if (c.indexOf(name) == 0) {
                return c.substring(name.length, c.length);
            }
        }

        return "";
    }

    $(document).on('click', '#student-login', function () {

        // user login storeage-ból

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
    });
});
