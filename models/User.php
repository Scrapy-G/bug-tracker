<?php
class User {

    public $username;
    public $password;

    public function __construct($username) {
        $this->username = $username;
    }

    public function getToken() {
        
    }
    
    public function login() {
        $salt1 = "%#$^&32";
        $salt2 = "L&%32;H";
        $token = hash('ripemd128', "$salt1$pass$salt2");
        $query = "SELECT * FROM users WHERE username='$username' AND 'password'='$pass'";
        
    }
}