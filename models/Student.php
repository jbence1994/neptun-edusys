<?php

class Student {
    private $code;
    private $firstName;
    private $lastName;

    public function __construct($code, $firstName, $lastName) {
        $this->code = $code;
        $this->firstName = $firstName;
        $this->lastName = $lastName;
    }
}
