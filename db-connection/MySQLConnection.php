<?php

require_once '../models/Course.php';
require_once '../models/StudentCourse.php';

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

    public function isExistingStudent($studentCode, $studentPassword)
    {
        $sql = "SELECT code, password FROM students WHERE code = ? AND password = ?;";

        $isExisting = false;

        $statement = $this->mysqlConnection->prepare($sql);
        $statement->bind_param('ss', $studentCode, $studentPassword);
        $statement->execute();
        $statement->store_result();

        if ($statement->num_rows == 1) {
            $statement->bind_result($studentCode, $studentPassword);
            $statement->fetch();
            $isExisting = true;
        }

        $statement->close();

        return $isExisting;
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
        $this
            ->mysqlConnection
            ->query
            ("INSERT INTO courses (code, name, type, credit) " .
                "VALUES ('{$course->getCode()}', '{$course->getName()}', 
                '{$course->getType()}', {$course->getCredit()});");
    }

    public function insertApply(StudentCourse $studentCourse)
    {
        $this
            ->mysqlConnection
            ->query("INSERT INTO student_courses(student_code, course_code) VALUES('{$studentCourse->getStudentCode()}',
        '{$studentCourse->getCourseCode()}');");
    }
}

$connection = new MySQLConnection("127.0.0.1", "root", "", "neptun_edusys", "3306");
