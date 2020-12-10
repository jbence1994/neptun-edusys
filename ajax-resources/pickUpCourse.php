<?php

session_start();

require_once "../db-connection/MySQLConnection.php";

if ($_SERVER['REQUEST_METHOD'] === "POST") {
    $courseCode = $_POST['code'];
    $studentCode = $_SESSION['student-session'];

    $connection->query("INSERT INTO student_courses (student_code, course_code) VALUES ('{$studentCode}', 
            '{$courseCode}');");
}
