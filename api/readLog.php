<?php
include '../models/Log.php';
include '../models/Date.php';
include '../models/Database.php';
include 'authorize.php';


if(!$authorized) exit;
$db = new DBConnection();
$log = new Log($db->getConnection());
$issueId = "";

if(isset($_GET['id'])){
 
    $issueId = $db->sanitize($_GET['id']);
    $result = $log->read($issueId);    

    if($result->num_rows){
        
        $response = array();

        while($row = $result->fetch_assoc()){
            $post_item = array(
                'id' => $row['id'],
                'date' => new Date($row['date']),
                'note' => $row['note']
            );
            array_push($response, $post_item);
        }

        echo json_encode($response);
    
    }else {
        $response = array("error" => "No data");
        echo json_encode($response);
    }

}else {
    echo json_encode(array("error" => "Issue ID not defined"));
}

$db->getConnection()->close();
