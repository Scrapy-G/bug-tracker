<?php
include '../models/Type.php';
include '../models/Database.php';

$db = new DBConnection();
$type = new Type($db->getConnection());

$result = $type->read();

if($result->num_rows){

    $response = array("data" => array());
    
    while($row = $result->fetch_assoc()){

        $post_item = array(
            'id' => $row['id'],
            'description' => $row['description']
        );

        array_push($response["data"], $post_item);
    }

    echo json_encode($response["data"]);    
}