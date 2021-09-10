<?php

require_once 'config.php';
require_once './models/Database.php';

function verifyUser($username, $password) {
    global $salt1, $salt2;

    $db = new DBConnection();
    $con = $db->getConnection();
    
    $username = $db->sanitize($username);
    $password = $db->sanitize($password);

    $token = hash('ripemd128', "$salt1$password$salt2");
    $query = "SELECT * FROM users
                WHERE username='$username'
                    AND password='$token'";
    $result = $con->query($query);

    if($result->num_rows)
        return true;
     
    return false;
}