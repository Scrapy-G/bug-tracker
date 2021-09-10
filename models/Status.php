<?php 

class Status {
    public $id;
    public $description;
    private $con;

    public function __construct($db){
        $this->con = $db;
    }

    public function read() {

        $query = "SELECT * FROM status";
        $result = $this->con->query($query);        
        return $result;
    }

    public function update($id, $status) {

        $query = "UPDATE bugs SET status='$status' WHERE id='$id'";
        $result = $this->con->query($query);
        return $result;
    }
}