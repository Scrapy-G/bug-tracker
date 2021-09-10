<?php 

class Type {
    public $id;
    public $description;
    private $con;

    public function __construct($db){
        $this->con = $db;
    }

    public function read() {

        $query = "SELECT * FROM type";
        $result = $this->con->query($query);        
        return $result;
    }
}