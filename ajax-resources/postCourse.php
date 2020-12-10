<?php

require_once "../db-connection/MySQLConnection.php";
require_once "../models/Course.php";

if ($_SERVER['REQUEST_METHOD'] === "POST") {
    $code = $_POST['code'];
    $name = $_POST['name'];
    $credit = $_POST['credit'];
    $type = $_POST['type'];


    $course = new Course($code, $name, $credit, $type);
    $connection->insertCourse($course);
}
