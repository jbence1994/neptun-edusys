<?php

class Course {
    private $code;
    private $name;
    private $credit;
    private $type;

    public function __construct($code, $name, $credit, $type) {
        $this->code = $code;
        $this->name = $name;
        $this->credit = $credit;
        $this->type = $type;
    }
}
