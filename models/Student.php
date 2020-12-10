<?php

class Student
{
    private $code;
    private $firstName;
    private $lastName;
    private $credit;

    public function __construct($code, $firstName, $lastName, $credit)
    {
        $this->code = $code;
        $this->firstName = $firstName;
        $this->lastName = $lastName;
        $this->credit = $credit;
    }
}
