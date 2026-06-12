<?php
require '../../_db/conexao.php';

header('Access-Control-Allow-Origin: *');
header("Access-Control-Allow-Methods: GET, POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization");
header('Content-Type: application/json; charset=utf-8; ');

if (!isset($_GET['planta'])) {
    try {
        $query = "SELECT * FROM plantas";
        $stmt = $con->prepare($query);
        $stmt->execute();

        $dados_planta = $stmt->fetchAll(PDO::FETCH_ASSOC);

        echo json_encode($dados_planta);
    } catch (PDOException $e) {
        echo json_encode($e);
    } finally {
        exit();
    }
} else {
    try {
        $planta = $_GET['planta'];
        $query = "SELECT * FROM plantas WHERE id = :id";
        $stmt = $con->prepare($query);

        $stmt->bindParam(':id', $planta);
        $stmt->execute();

        $dados_planta = $stmt->fetchAll(PDO::FETCH_ASSOC);

        echo json_encode($dados_planta);
    } catch (PDOException $e) {
        echo json_encode(["error" => $e]);
    } finally {
        exit();
    }
}
