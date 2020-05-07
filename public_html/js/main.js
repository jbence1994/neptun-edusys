$(document).ready(function () {
    let counter = 0;

    function getCourses() {
        return JSON.parse(localStorage.getItem('courses'));
    }

    function getStudents() {
        return JSON.parse(localStorage.getItem('students'))
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
                '<td><button data-id="' + i + '" class="course_apply btn btn-primary">Felvétel</button></td>'
            );
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
        
        
        // Handling update..
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

    $(document).on('click', '#list_courses', function () {
        // diák oldalon kurzus lista ...
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
                $("#"+i).val(courses[id][i]);
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
            
            if (!courseArray[id]){
                return;
            }
            
            courseArray.splice(id, 1);
            localStorage.setItem('courses', JSON.stringify(courseArray));
            localStorage.removeItem(id);
            document.location.reload();
        });
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
            while (c.charAt(0) == ' ') { // === ?
                c = c.substring(1);
            }
            if (c.indexOf(name) == 0) { // === ?
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
        $('#student_data').html(cookie._code); // TODO: adatok



    }
    
    


    displayStudentData();
    deleteCourse();
    editCourse();
});
