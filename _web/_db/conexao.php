<?php
$is_local = true;

if ($is_local == true){
    $server = "localhost";
    $database = "estufa";
    $user = "root";
    $password = "";
} else {
    $server = "localhost";
    $database = "u231088764_estufa";
    $user = "u231088764_root";
    $password = "0w^PZz7W";
}

session_start();

try {
    $con = new PDO("mysql:host=" . $server . ";dbname=" . $database . ";", $user, $password);
} catch (PDOException $e) {
    echo $e;
}
