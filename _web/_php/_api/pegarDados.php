<?php
require '../_db/conexao.php';

header('Access-Control-Allow-Origin: *');
header('Content-Type: application/json; charset=utf-8; ');

$dataComeco = '1000-01-01';
$dataFim = '9999-12-31';
try {
    if($_GET['dataComeco']){
        $dataComeco = $_GET['dataComeco'];
        $dataFim = $_GET['dataFim'];
    }
    $dataComeco .= ' 00:00:00';
    $dataFim .= ' 23:59:59';
    $usuario = $_GET['codigo'] ?? $_SESSION['codigo'];

    $query = "SELECT planta, temperatura, umidade_ar, umidade_solo, reservatorio, data FROM dados WHERE usuario = :usuario AND data BETWEEN :dataComeco AND :dataFim ORDER BY data;";
    $stmt = $con->prepare($query);

    $stmt->bindParam(':dataComeco', $dataComeco);
    $stmt->bindParam(':dataFim', $dataFim);
    $stmt->bindParam(':usuario', $usuario);

    $stmt->execute();

    $dados_usuario = $stmt->fetchAll(PDO::FETCH_ASSOC);
    echo json_encode($dados_usuario);
} catch (PDOException $e) {
    echo $e;
}
