<?php
/**
 * This file is for creating tables and relationships 
 * between them. Also inserts some records to get started.
 * Should be deleted after.
 */
include './models/Database.php';
include 'config.php';

$db = "";

echo "Connecting to database...<br>";
$db = new DBConnection();
$con = $db->getConnection();


echo "Creating STATUS table...";
$query = "CREATE TABLE IF NOT EXISTS status (
            id SMALLINT AUTO_INCREMENT PRIMARY KEY,
            description VARCHAR(20) NOT NULL UNIQUE
            )";
if(!$con->query($query)) die ($con->error);
echo "done<br>";

echo "Inserting records...";
$query = "INSERT INTO status (description) 
            VALUES   
                ('open'),
                ('in progress'),
                ('resolved'),
                ('closed')";
if(!$con->query($query)) die ($con->error);
echo "done<br>";

echo "Creating TYPE table...";
$query = "CREATE TABLE IF NOT EXISTS type (
            id SMALLINT AUTO_INCREMENT PRIMARY KEY,
            description VARCHAR(20) NOT NULL UNIQUE
        )";
if(!$con->query($query)) die ($con->error);
echo "done<br>";

echo "Inserting records...";
$query = "INSERT INTO type (description) 
            VALUES   
                ('release'),
                ('bug'),
                ('update'),
                ('test')";
if(!$con->query($query)) die ($con->error);
echo "done<br>";


echo "Creating BUGS table...";
$query = "CREATE TABLE IF NOT EXISTS bugs (
            id INT AUTO_INCREMENT PRIMARY KEY,
            status SMALLINT NOT NULL,
            type SMALLINT NOT NULL,
            created DATETIME DEFAULT CURRENT_TIMESTAMP NOT NULL,
            subject VARCHAR(40) NOT NULL,
            due_date DATE,
            description TEXT NOT NULL;
            FOREIGN KEY (status) REFERENCES status(id),
            FOREIGN KEY (type) REFERENCES type(id)
        )";
if(!$con->query($query)) die ($con->error);
echo "done<br>";


echo "Creating LOGS table...";
$query = "CREATE TABLE IF NOT EXISTS logs (
            id INT AUTO_INCREMENT PRIMARY KEY,
            bug INT NOT NULL,
            note TEXT NOT NULL,
            date DATETIME DEFAULT CURRENT_TIMESTAMP NOT NULL,
            FOREIGN KEY (bug) REFERENCES bugs(id)
        )";
if(!$con->query($query)) die ($con->error);
echo "done<br>";

echo "Creating USERS table...";
$query = "CREATE TABLE IF NOT EXISTS users (
            username VARCHAR(20) PRIMARY KEY,
            password VARCHAR(32) NOT NULL
        )";
if(!$con->query($query)) die ($con->error);
echo "done<br>";

echo "Inserting records...";
$password = "password";
$token = hash('ripemd128', "$salt1$password$salt2");
$query = "INSERT INTO users 
            VALUES   
                ('user', '$token');";
if(!$con->query($query)) die ($con->error);
echo "done<br>";

echo "<br>DONE!";