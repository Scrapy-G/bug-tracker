<?php

use Firebase\JWT\JWT;
require_once('../vendor/autoload.php'); //called from api directory
require_once '../config.php'; 

$authorized = false;

$headers = apache_request_headers();

if (! preg_match('/Bearer\s(\S+)/', $headers['authorization'], $matches)) {
    echo json_encode(array('error' => '401 Token not found in request'));
    exit;
}

$jwt = $matches[1];

if (! $jwt) {
    // No token was able to be extracted from the authorization header
    header('HTTP/1.1 400 Bad Request');
    exit;
}

$jwt = htmlentities($jwt);

try {
    $token = JWT::decode($jwt, $secretKey, ['HS512']);
} catch(Exception $e){
    echo json_encode(array('error' => 'Unauthorized'));
    exit;
}

$now = new DateTimeImmutable();
$serverName = "chadcodes.me";

if ($token->iss !== $serverName ||
    $token->nbf > $now->getTimestamp() ||
    $token->exp < $now->getTimestamp())
{
    echo json_encode(array('error' => '401 Expired token'));
    exit;
}    

$authorized = true;
