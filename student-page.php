<?php

session_start();

if (!isset($_SESSION['student-session'])) {
    header('Location: index.php');
}


$pageName = "Diák felület";

require_once("public/components/navbar.php");

require_once 'public/components/head.php';
?>
<div class="row">
    <div class="col-12">
        <h5 id="student_data"></h5>
        <h4 id="credits"></h4>
        <div id="display-courses-to-students"></div>
    </div>
</div>

<?php require_once("public/components/footer.php"); ?>
