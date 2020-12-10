<?php

session_start();

require_once '../db-connection/MySQLConnection.php';

if ($_SERVER['REQUEST_METHOD'] === "POST") {
    $studentCode = $_POST['code'];
    $studentPassword = $_POST['password'];

    if ($connection->isExistingStudent($studentCode, $studentPassword)) {
        $_SESSION['student-session'] = $studentCode;
        http_response_code(200);
    } else {
        http_response_code(401);
    }
}
