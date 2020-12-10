<?php


class StudentCourse
{
    private $studentCode;
    private $courseCode;

    public function __construct($studentCode, $courseCode)
    {
        $this->studentCode = $studentCode;
        $this->courseCode = $courseCode;
    }

    public function getStudentCode()
    {
        return $this->studentCode;
    }

    public function getCourseCode()
    {
        return $this->courseCode;
    }
}
