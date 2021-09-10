<?php
include '../models/Status.php';
include '../models/Database.php';
include 'authorize.php';


if(!$authorized) exit;
$db = new DBConnection();
$status = new Status($db->getConnection());
$issueId = $statusId = "";

$json = file_get_contents('php://input');

if($json){

    $data = json_decode($json);
    $issueId = $db->sanitize($data->id);
    $statusId = $db->sanitize($data->status_id);
    $result = $status->update($issueId, $statusId);    

    $response = "";
    if($result){
        $response = array("success" => "Record updated");
    }else {
        $response = array("error" => "Invalid parameters");
    }

    echo json_encode($response);

}else {
    echo json_encode(array("error" => "Issue or Status ID not defined"));
}