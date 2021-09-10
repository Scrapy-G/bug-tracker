<?php
include '../models/Log.php';
include '../models/Database.php';
include '../models/Date.php';
include 'authorize.php';


if(!$authorized) exit;
$db = new DBConnection();
$log = new Log($db->getConnection());
$bug = $note = "";

$json = file_get_contents('php://input');

if($json){
    $data = json_decode($json);
    $issue = $db->sanitize($data->id);
    $note = $db->sanitize($data->note);

    $result = $log->post($issue, $note);

    if($result){
        $last_insert = $db->getConnection()->insert_id;
        $result = $log->readLog($last_insert);
    	
        $row = $result->fetch_assoc();        
    	$post_item = array(
    		'id' => $row['id'], 
    		'date' => new Date($row['date']), 
    		'note' => $row['note']
    	);
        echo json_encode(array("success" => "Record added", "data" => $post_item));
        
    }else {
        echo json_encode(array("error" => "Something went wrong"));
    }

}else {
    echo json_encode(array("error" => "Empty post request"));
}