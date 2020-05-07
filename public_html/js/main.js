$(document).ready(function () {

    function initalizeLocalStoreageWithTestData() {

        let studentsArray = [];

        $.get('students.json', function (data) {

            let adatok = JSON.parse(data);

            for (let i = 0; i < adatok.length; i++) {

                let student = new Student(adatok[i].code, adatok[i].password, adatok[i].speciality);
                studentsArray.push(student);
            }

            localStorage.setItem('studentsArray', JSON.stringify(studentsArray));
        }, 'text');
    }

    initalizeLocalStoreageWithTestData();



    /*
     
     function getStudentsDataFromFile() {
     
     $.get('students.txt', function (data) {
     
     }, 'text');
     
     return studentsArray;
     }
     
     
     
     
     
     
     studentsArray = getStudentsDataFromFile();
     
     
     function getCourseArray() {
     let courseArray = localStorage.getItem('courseArray');
     
     if (!courseArray) {
     courseArray = [];
     localStorage.setItem('courseArray', JSON.stringify(courseArray));
     } else {
     courseArray = JSON.parse(courseArray);
     }
     
     return courseArray;
     }
     
     for (let i = 0; i < courseArray.length; i++) {
     let key = courseArray[i];
     let value = JSON.parse(localStorage[key]);
     addCourseToDOM(key, value);
     }
     
     function addCourseToDOM(key, value) {
     $('#TÁBLÁZAT').append("<tr></tr>");
     }
     
     function deleteCourse(key) {
     localStorage.removeItem(key);
     
     let courseArray = getCourseArray();
     
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
     
     
     $(document).on('click', '#admin-login', function () {
     window.location = "mainAdmin.html";
     });
     
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
     
     
     
     $(document).on('click', '#deleteCookie', function () {
     let key = prompt("Süti törlés kulcsa: ");
     setCookie(key, "", -1);
     });
     */
});
