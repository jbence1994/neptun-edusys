<?php

require_once "../db-connection/MySQLConnection.php";
require_once "../models/Course.php";

try {
    $result = $connection->select("select * from courses");
} catch (Exception $e) {
}

$html = '<table id="courses" class="table table-striped text-center">'
    . '<tr>'
    . '<td>Kurzus kódja</td>'
    . '<td>Kurzus neve</td>'
    . '<td>Kredit érték</td>'
    . '<td colspan="2">Típus</td>'
    . '<tr>';

while ($row = $result->fetch_row()) {
    $html .= "<tr><td>{$row[0]}</td>";
    $html .= "<td>{$row[1]}</td>";
    $html .= "<td>{$row[2]}</td>";
    $html .= "<td>{$row[3]}</td>";
    $html .= "<td><button class='btn btn-success pick-up-course' data-course-code='" . $row[0] . "'>Felvétel</button></td></tr>";
}

$html .= "</table>";

echo $html;
