<?php
require '../_db/conexao.php';

header('Access-Control-Allow-Origin: *');
header('Content-Type: application/json; charset=utf-8; ');

// STRING API: http://localhost/_web/_php/_api/inserirDados.php?usuario=' variavelk_usuario + '&temp=' + variavel_temperatura + '&umiAr=55&umiSolo=55&reserv=55&planta=1

try {
    $usuario = $_GET['usuario'];
    $temperatura = $_GET['temp'];
    $umidadeAr = $_GET['umiAr'];
    $umidadeSolo = $_GET['umiSolo'];
    $reservatorio = $_GET['reserv'];
    $planta = $_GET['planta'];

    $query = "INSERT INTO dados (usuario, temperatura, umidade_ar, umidade_solo, reservatorio, planta, data) VALUES (:usuario, :temperatura, :umidadeAr, :umidadeSolo, :reservatorio, :planta, NOW())";
    $stmt = $con->prepare($query);

    $stmt->bindParam(':usuario', $usuario);
    $stmt->bindParam(':reservatorio', $reservatorio);
    $stmt->bindParam(':umidadeSolo', $umidadeSolo);
    $stmt->bindParam(':umidadeAr', $umidadeAr);
    $stmt->bindParam(':temperatura', $temperatura);
    $stmt->bindParam(':planta', $planta);

    $stmt->execute();

    if($stmt->rowCount() >= 1){
        echo 'Inserção bem sucedida';
        return true;
    }
    echo 'Erro';
    return false;
} catch (PDOException $e) {
    echo $e;
}