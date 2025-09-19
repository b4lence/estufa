<?php
require '../_db/conexao.php';

header('Access-Control-Allow-Origin: *');
header('Content-Type: application/json; charset=utf-8; ');

if (!$_GET['planta']) {
    try {
        $query = "SELECT * FROM plantas";
        $stmt = $con->prepare($query);
        $stmt->execute();

        $dados_planta = $stmt->fetchAll(PDO::FETCH_ASSOC);

        echo json_encode($dados_planta);
    } catch (PDOException $e) {
        echo $e;
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
        return;
    } catch (PDOException $e) {
        echo $e;
    }
}
