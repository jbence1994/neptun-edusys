<?php

require_once '../models/Course.php';

class MySQLConnection
{
    private $mysqlConnection;

    public function __construct($server, $username, $password, $database, $port)
    {
        $this->mysqlConnection = new mysqli($server, $username, $password, $database, $port);

        if ($this->mysqlConnection->connect_errno) {
            die("Database connection error...");
        }

        if (!$this->mysqlConnection->set_charset("utf8")) {
            die("Karakterkódolási hiba...");
        }
    }

    public function select($sql)
    {
        $result = $this->mysqlConnection->query($sql);

        if (!$result)
            throw new Exception("Error...");

        return $result;
    }

    public function insertCourse(Course $course)
    {
        /*$sql = "INSERT INTO courses (code, name, type, credit) " .
            "VALUES ('{$course->getCode()}', '{$course->getName()}', 
                '{$course->getType()}', {$course->getCredit()};";

        var_dump($sql);
        die();*/


        $this
            ->mysqlConnection
            ->query
            ("INSERT INTO courses (code, name, type, credit) " .
                "VALUES ('{$course->getCode()}', '{$course->getName()}', 
                '{$course->getType()}', {$course->getCredit()});");
    }
}
