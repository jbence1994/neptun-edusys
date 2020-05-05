$(document).ready(function () {

    $(document).on('click', '#admin-login', function () {
        window.location = "mainAdmin.html";
    });

    $(document).on('click', '#student-login', function () {

        let code = $('#studentCode').val();
        let password = $('#studentPassword').val();

        if (code === "" || password === "") {
            alert("Hibás Neptun kód vagy jelszó!");
        }

        // ...

    });

});
