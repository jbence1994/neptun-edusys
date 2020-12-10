<?php

require_once "../db-connection/MySQLConnection.php";
require_once "../models/Course.php";

$mySqlConnection = new MySQLConnection("127.0.0.1", "root", "",
    "neptun_edusys", "3306");

$courses = [];

try {
    $result = $mySqlConnection->select("select * from courses");
} catch (Exception $e) {
}

$html = '<table id="courses" class="table table-striped text-center">'
    . '<tr>'
    . '<td>Kurzus kódja</td>'
    . '<td>Kurzus neve</td>'
    . '<td>Kreditszám</td>'
    . '<td>Típus</td>'
    . '<tr>';

while ($row = $result->fetch_row()) {
    $html .= "<tr><td>{$row[0]}</td>";
    $html .= "<td>{$row[1]}</td>";
    $html .= "<td>{$row[2]}</td>";
    $html .= "<td>{$row[3]}</td></tr>";

//array_push($courses, new Course($row[0], $row[1], $row[2], $row[3]));
}

$html .= "</table>";

echo $html;
