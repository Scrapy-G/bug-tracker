<?php
include '../models/Issue.php';
include '../models/Database.php';

$db = new DBConnection();
$issue = new Issue($db->getConnection());
$subject = $description = $type = "";

$json = file_get_contents('php://input');

if($json){
    $data = json_decode($json);
    $subject = $db->sanitize($data->subject);
    $description = $db->sanitize($data->description);
    $type = $db->sanitize($data->type);

    $result = $issue->post($subject, $description, $type);

    if($result){
        echo json_encode(array("success" => "Record added", "id" => $db->getConnection()->insert_id));
    }else {
        echo json_encode(array("error" => "Something went wrong"));
    }

}else {
    echo json_encode(array("error" => "Empty post request"));
}