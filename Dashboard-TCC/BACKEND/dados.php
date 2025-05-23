<?php
require 'conexao.php';

try {
    $dataComeco = $_GET['dataComeco'];
    $dataFim = $_GET['dataFim'];
    $codigo = $_SESSION['codigo'];

    $query = "SELECT rpm, temperatura, umidade_ar, umidade_solo, reservatorio, data, hora FROM dados WHERE codigo = :codigo AND data BETWEEN :dataComeco AND :dataFim";
    $stmt = $con->prepare($query);

    $stmt->bindParam(':codigo', $codigo);
    $stmt->bindParam(':dataComeco', $dataComeco);
    $stmt->bindParam(':dataFim', $dataFim);

    $stmt->execute();

    $dados = $stmt->fetchAll(PDO::FETCH_ASSOC);

    echo json_encode($dados);
} catch (PDOException $e) {
    echo $e;
}
