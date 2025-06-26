<?php
require 'conexao.php';

header('Access-Control-Allow-Origin: *');
header('Content-Type: application/json; charset=utf-8');

//http://localhost/Dashboard-TCC/_web/_php/inserirDados.php?codigo=a0a0a0&temp=50&umiAr=50&umiSolo=50&rpm=50&reserv=50&planta=1

try {
    $codigo = $_GET['codigo'];
    $temperatura = $_GET['temp'];
    $umidadeAr = $_GET['umiAr'];
    $rpm = $_GET['rpm'];
    $umidadeSolo = $_GET['umiSolo'];
    $reservatorio = $_GET['reserv'];
    $planta = $_GET['planta'];

    $query = "INSERT INTO dados (codigo, rpm, temperatura, umidade_ar, umidade_solo, reservatorio, planta, data, hora) VALUES (:codigo, :rpm, :temperatura, :umidadeAr, :umidadeSolo, :reservatorio, :planta, CURRENT_DATE(), CURRENT_TIME())";
    $stmt = $con->prepare($query);

    $stmt->bindParam(':codigo', $codigo);
    $stmt->bindParam(':reservatorio', $reservatorio);
    $stmt->bindParam(':umidadeSolo', $umidadeSolo);
    $stmt->bindParam(':umidadeAr', $umidadeAr);
    $stmt->bindParam(':temperatura', $temperatura);
    $stmt->bindParam(':rpm', $rpm);
    $stmt->bindParam(':planta', $planta);

    $stmt->execute();

    if($stmt->rowCount() >= 1){
        return true;
    }
    return false;
} catch (PDOException $e) {
    echo $e;
}