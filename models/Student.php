<?php

class Student
{
    private $code;
    private $password;
    private $firstName;
    private $lastName;

    public function __construct($code, $password, $firstName, $lastName)
    {
        $this->code = $code;
        $this->password = $password;
        $this->firstName = $firstName;
        $this->lastName = $lastName;
    }
}
