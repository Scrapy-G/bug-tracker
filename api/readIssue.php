<?php
include '../models/Issue.php';
include '../models/Database.php';
include '../models/Date.php';
include 'authorize.php';

if(!$authorized) exit;
/**
 * Reads issue if id parameter is set in GET,
 * otherwise read all issues.
 */

$id = "";
$db = new DBConnection();
$issue = new Issue($db->getConnection());

if(isset($_GET['id'])){
    $id = $db->sanitize($_GET['id']);
    $result = $issue->read($id);

    if($result->num_rows){
        $row = $result->fetch_assoc();
        $issue->id = $id;
        $issue->subject = $row["subject"];
        $issue->status_id = $row["status_id"];
        $issue->status = $row["status"];
        $issue->created = $row["created"];
        $issue->description = $row["description"];
        $issue->dueDate = $row["due_date"];
        $issue->type = $row["type"];
        
        $response = array("data" => $issue);
        echo json_encode($response["data"]);

    }else {
        $response = array("error" => "Issue does not exist");
        header("HTTP/1.1 404 Not Found");
        echo json_encode($response);
    }

    
}else { //read all issues
    $result = $issue->read();
    
    if(!$result){
        header("HTTP/1.1 500 Internal Error");
        exit;
    } 

    if($result->num_rows){
    
    $response = array("data" => array());

    while($row = $result->fetch_assoc()){

        $post_item = array(
            'id' => $row["id"],
            'subject' => $row["subject"],
            'status_id' => $row["status_id"],
            'status' => $row["status"],
            'created' => new Date($row["created"]),
            'description' => $row["description"],
            'due_date' => $row["due_date"],
            'type' => $row["type"]
        );

        array_push($response["data"], $post_item);
    }

    echo json_encode($response['data']);

    }else {
        $response = array("error" => "No issue exists");
        header("HTTP/1.1 404 Not Found");
        echo json_encode($response);
    }

}
