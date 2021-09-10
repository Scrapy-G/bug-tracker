<?php
class Issue {
    public $id;
    public $subject;
    public $status;
    public $status_id;
    public $created;
    public $description;
    public $dueDate;
    public $type;
    private $con;

    public function __construct($db) {
        $this->con = $db;
    }
    
    /**
     * Read issue by id. 
     * Reads all issues if no id is passed
     */
    public function read($id = null) {
        $query = "SELECT 
            b.id,
        	b.created, 
        	b.description, 
        	b.due_date, 
        	b.subject, 
        	t.description as type, 
        	s.description as status, 
        	s.id as status_id
                    FROM bugs b 
                        INNER JOIN type t 
                            ON t.id=b.type
                        INNER JOIN status s
                            ON s.id=b.status";

        if($id) $query = $query . " WHERE b.id='$id'";

        $result = $this->con->query($query);
        return $result;
    }

    public function post($subject, $description, $type){
        $query = "INSERT INTO bugs (subject, description, type, status)
                    VALUES ('$subject', '$description', '$type' , '1')";
        
        $result = $this->con->query($query);
        return $result;
    }

    public function search($category, $term) {
        $query = "SELECT 
                    b.id,
                    b.created, 
                    b.description, 
                    b.due_date, 
                    b.subject, 
                    t.description as type, 
                    s.description as status, 
                    s.id as status_id
                            FROM bugs b 
                                INNER JOIN type t 
                                    ON t.id=b.type
                                INNER JOIN status s
                                    ON s.id=b.status";


        if($category == 'id')
            $query = $query . " WHERE b.$category=$term";
        else    
            $query = $query. " WHERE b.$category LIKE '%$term%'";
            
        $result = $this->con->query($query);
        echo $this->con->error;
        return $result;

    }

}
