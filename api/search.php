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

$db = new DBConnection();
$issue = new Issue($db->getConnection());

if(!isset($_GET['category']) || !isset($_GET['term'])) exit;

$category = $db->sanitize($_GET['category']);
$term = $db->sanitize($_GET['term']);

$result = $issue->search($category, $term);

if(!$result){
    header("HTTP/1.1 500 Internal Error");
    echo json_encode(array("error" => "internal error"));
    exit;
}

if($result->num_rows){
    $response = array("data" => array());

    while($row = $result->fetch_assoc()){
        $row['created'] = new Date($row['created']);              
        array_push($response["data"], $row);
    }
    echo json_encode($response["data"]);

}else {
    $response = array("error" => "No results found");
    echo json_encode($response);
}