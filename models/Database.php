<?php

class DBConnection {
    private $host = 'localhost';
    private $db = 'bugtracker';
    private $user = 'root';
    private $pass = 'richkid';
    private $con;

    public function __construct() {
        $this->con = new mysqli($this->host, $this->user, $this->pass, $this->db);
        if($this->con->connect_error) die ($this->con->connect_error);
    }

    public function getConnection(){
        return $this->con;
    }   

    public function sanitize($string) {
        return $this->con->real_escape_string($string);
    }
}