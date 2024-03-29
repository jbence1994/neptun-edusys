$(function () {

    displayStudentName();
    displayCourses();
    displayCoursesToStudents();

    $(document).on('click', '#submit_course', function (e) {
        e.preventDefault();
        addCourse();
    });

    $(document).on('click', '#admin-login', function () {
        let adminCode = $('#adminCode').val();
        let adminPassword = $('#adminPassword').val();

        if (adminCode === "root" && adminPassword === "12345")
            location.href = "admin-page.php";
        else
            $('#admin-login-error').text("Rossz felhasználónév vagy jelszó").css('color', 'red');
    });

    $(document).on('click', '#student-login', function (e) {
        e.preventDefault();

        let studentCode = $('#studentCode').val();
        let studentPassword = $('#studentPassword').val();

        $.ajax({
            method: "POST",
            url: "ajax-resources/login.php",
            data: {
                code: studentCode,
                password: studentPassword
            },
            success: function () {
                location.href = "student-page.php";
            },
            error: function () {
                $('#student-login-error')
                    .text("Hibás felhasználónév vagy jelszó")
                    .css('color', 'red');
            }
        });
    });

    $(document).on('click', '.pick-up-course', function () {
        let gomb = $(this);
        let courseCode = gomb.data('course-code');
        let row = gomb.parent().parent();

        $.ajax({
            method: "POST",
            url: "ajax-resources/pickUpCourse.php",
            data: {
                code: courseCode
            },
            success: function () {
                row.fadeOut();
            },
            error: function (xhr) {
                alert(xhr.status);
            }
        });
    });

    $(document).on('click', '.logout', function (e) {
        e.preventDefault();

        $.ajax({
            method: 'get',
            url: 'ajax-resources/logout.php',
            success: function () {
                location.href = "index.php";
            },
            error: function (xhr) {
                alert(xhr.status);
            }
        });
    });
});


function addCourse() {
    let courseCode = $('#_code').val();
    let courseName = $('#_name').val();
    let courseCredit = $('#_credit').val();
    let courseType = $('#_type').val();

    $.ajax({
        method: "POST",
        url: "ajax-resources/postCourse.php",
        data: {
            code: courseCode,
            name: courseName,
            credit: courseCredit,
            type: courseType
        },
        success: function () {
            displayCourses();
        },
        error: function (xhr) {
            alert(xhr.status);
        }
    });
}

function displayCourses() {
    $.ajax({
        method: "GET",
        url: "ajax-resources/getCourses.php",
        success: function (response) {
            $('#display-courses').html(response);
        },
        error: function (xhr) {
            alert(xhr.status);
        }
    });
}

function displayCoursesToStudents() {
    $.ajax({
        method: "GET",
        url: "ajax-resources/getCoursesToStudentPage.php",
        success: function (response) {
            $('#display-courses-to-students').html(response);
        },
        error: function (xhr) {
            alert(xhr.status);
        }
    });
}

function displayStudentName() {

    $.ajax({
        method: 'GET',
        url: "ajax-resources/getUser.php",
        success: function (result) {
            $('#student_data').text("Neptun azonosító: " + result);
        },
        error: function (xhr) {
            alert(xhr.status);
        }
    });
}
