<?php

session_start();

require_once "../db-connection/MySQLConnection.php";

if ($_SERVER['REQUEST_METHOD'] === "POST") {
    $courseCode = $_POST['code'];
    $studentCode = $_SESSION['student-session'];


    $connection->insertApply(new StudentCourse($studentCode, $courseCode));
}
