$(document).ready(function () {

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

        // $('#courses').empty(); // HTML reinit

        let values = getCourseArray();

        for (let i = 0; i < values.length; i++) {
            $('#courses').append('<tr><td>' + values[i]._name + '</td>' +
                    '<td>' + values[i]._code + '</td>' +
                    '<td>' + values[i]._credit + '</td>' +
                    '<td>' + values[i]._maxStudent + '</td>' +
                    '<td>' + values[i]._teacher + '</td>' +
                    '<td>' + values[i]._type + '</td>' +
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
        
        courses.push(new Course(newCourseData));
        localStorage.setItem('courses', JSON.stringify(courses));
        
        displayCourses();
    });

    $(document).on('click', '#list_courses', function () {
        // diák oldalon kurzus lista ...
    });




    /*     
     
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
     
     function setCookie(key, value, days) {
     let expires = ""; // lejárati dátum
     
     if (days) {
     let date = new Date();
     date.setTime(date.getTime() + (1000 * 60 * 60 * 24 * days));
     expires = "; expires= " + date.toUTCString();
     }
     
     document.cookie = key + "=" + value + expires + ";path=/";
     }
     
     function getCookie(key) {
     let searchName = key + "=";
     let cookies = document.cookies.split(';');
     
     let c;
     
     for (let i = 0; cookies.length; i++) {
     c = cookies[i];
     while (c.charAt(0) === '') {
     c = c.substring(1, c.length);
     }
     
     if (c.indexOf(searchName) === 0) {
     return c.substring(searchName.length, c.length);
     }
     }
     
     return null; // nincs süti
     }
     
     
     
     
     $(document).on('click', '#student-login', function () {
     
     let code = $('#studentCode').val();
     let password = $('#studentPassword').val();
     
     if (code === "" || password === "") {
     alert("Hibás Neptun kód vagy jelszó!");
     } 
     
     let key = prompt("Kérem a süti nevét: ");
     let value = prompt("Kérem a süti értékét: ");
     let days = prompt("Süti napja? ");
     
     setCookie(key, value, days);
     });
     
     
     
     */
});
