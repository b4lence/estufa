<?php
$server = "localhost";
$database = "estufa";
$user = "root";
$password = "";

session_start();

try {
    $con = new PDO("mysql:hosts=" . $server . ";dbname=" . $database . ";", $user, $password);
} catch (PDOException $e) {
    echo $e;
}
