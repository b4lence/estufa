<?php
require '../../_db/conexao.php';

header('Access-Control-Allow-Origin: *');
header("Access-Control-Allow-Methods: GET, POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization");
header('Content-Type: application/json; charset=utf-8; ');

try {
    $usuario = $_GET['usuario'];
    $temperatura = $_GET['temp'];
    $umidadeAr = $_GET['umiAr'];
    $umidadeSolo = $_GET['umiSolo'];
    $reservatorio = $_GET['reserv'];

    $query = "INSERT INTO dados (usuario, temperatura, umidade_ar, umidade_solo, reservatorio, data) VALUES (:usuario, :temperatura, :umidadeAr, :umidadeSolo, :reservatorio, :planta, NOW())";
    $stmt = $con->prepare($query);

    $stmt->bindParam(':usuario', $usuario);
    $stmt->bindParam(':reservatorio', $reservatorio);
    $stmt->bindParam(':umidadeSolo', $umidadeSolo);
    $stmt->bindParam(':umidadeAr', $umidadeAr);
    $stmt->bindParam(':temperatura', $temperatura);

    $stmt->execute();

    if($stmt->rowCount() >= 1){
        echo json_encode(["sucesso" => 'inserção bem sucedida']);
        return true;
    }
    return false;
} catch (PDOException $e) {
    echo json_encode(["error" => $e]);
} finally {
    exit();
}