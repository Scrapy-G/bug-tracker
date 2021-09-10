<?php

use Firebase\JWT\JWT;
require_once('./vendor/autoload.php');
require_once 'config.php';
require_once 'checkuser.php';

$json = file_get_contents('php://input');

if(!$json) {
    header("HTTP/1.1 400 Bad Request");
    echo json_encode(array("error" => "No username/password provided"));
    exit;
}

$data = json_decode($json);
$username = $data->username;
$password = $data->password;

//username or password incorrect
if(!verifyUser($username, $password)){
    echo json_encode(array("error" => "Invalid username/password"));
    exit;
} 

$issuedAt = new DateTimeImmutable();
$expire = $issuedAt->modify('+30 days')->getTimestamp();
$serverName = 'chadcodes.me';
$username = "$username";

$data = [
    'iat' => $issuedAt->getTimestamp(),
    'iss' => $serverName,
    'nbf' => $issuedAt->getTimestamp(),
    'exp' => $expire,
    'username' => $username
];

$jwt = JWT::encode(
    $data,
    $secretKey,
    'HS512'
);

echo json_encode(array("token" => $jwt));