<?php
include '../models/Status.php';
include '../models/Database.php';
include 'authorize.php';


if(!$authorized) exit;
$db = new DBConnection();
$status = new Status($db->getConnection());

$result = $status->read();

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