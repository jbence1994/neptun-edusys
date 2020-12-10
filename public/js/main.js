$(function () {

    $.ajax({
        method: "GET",
        url: "ajax-resources/getCourses.php",
        success: function (response) {
            $('.COURSETABLE').html(response);
            console.log(response);
        },
        error: function (xhr) {
            alert(xhr.status);
        }
    });


    $(document).on('click', '#submit_course', function (e) {
        e.preventDefault();
        addCourse();
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
        success: function (res) {
            console.log(res);
        },
        error: function (xhr) {
            alert(xhr.status);
        }
    });
}
