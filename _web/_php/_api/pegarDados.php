<?php
require '../../_db/conexao.php';

header('Access-Control-Allow-Origin: *');
header("Access-Control-Allow-Methods: GET, POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization");
header('Content-Type: application/json; charset=utf-8; ');

$dataComeco = '1000-01-01';
$dataFim = '9999-12-31';
try {
    if (isset($_GET['dataComeco'])) {
        $dataComeco = $_GET['dataComeco'];
    }
    if (isset($_GET['dataFim'])) {
        $dataFim = $_GET['dataFim'];
    }
    $dataComeco .= ' 00:00:00';
    $dataFim .= ' 23:59:59';
    $usuario = $_GET['codigo'] ?? $_SESSION['codigo'];

    $query = "SELECT temperatura, umidade_ar, umidade_solo, reservatorio, data FROM dados WHERE usuario = :usuario AND data BETWEEN :dataComeco AND :dataFim ORDER BY data DESC;";

    $stmt = $con->prepare($query);

    $stmt->bindParam(':dataComeco', $dataComeco);
    $stmt->bindParam(':dataFim', $dataFim);
    $stmt->bindParam(':usuario', $usuario);

    $stmt->execute();

    $dados_usuario = $stmt->fetchAll(PDO::FETCH_ASSOC);
    echo json_encode($dados_usuario);
} catch (PDOException $e) {
    echo json_encode(["error" => $e]);
} finally {
    exit();
}
