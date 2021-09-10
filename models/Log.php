<?php

class Log {
    public $id;
    public $bug;
    public $date;
    public $note;
    private $con;
    
    public function __construct($db){
        $this->con = $db;
    }

    public function read($id) {
        
        $query = "SELECT id, date, note FROM logs WHERE bug='$id'";
        $result = $this->con->query($query);
        return $result;
        
    }

    public function readLog($id) {
        $query = "SELECT id, date, note FROM logs WHERE id='$id'";
        $result = $this->con->query($query);
        return $result;
    }

    public function post($bug, $note) {
        $query = "INSERT INTO logs (bug, note)
                    VALUES ('$bug', '$note')";
        
        $result = $this->con->query($query);
        return $result;
    }

}