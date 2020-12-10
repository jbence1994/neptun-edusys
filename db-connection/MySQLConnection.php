<?php

class MySQLConnection
{
    private $server;
    private $username;
    private $password;
    private $database;
    private $port;

    public function __construct($server, $username, $password, $database, $port)
    {
        $this->server = $server;
        $this->username = $username;
        $this->password = $password;
        $this->database = $database;
        $this->port = $port;
    }
}
