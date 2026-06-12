<?php
require '../../_db/conexao.php';

header('Access-Control-Allow-Origin: *');
header("Access-Control-Allow-Methods: GET, POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization");
header('Content-Type: application/json; charset=utf-8; ');

if (!isset($_SESSION['codigo'])) {
    echo json_encode(["error" => "Usuário não logado ou sessão expirada"]);
    exit();
}

try {
    $codigo = $_SESSION['codigo'];
    $query = 'SELECT * FROM usuarios WHERE codigo = :codigo';

    $stmt = $con->prepare($query);
    $stmt->bindParam(':codigo', $codigo);
    $stmt->execute();

    $result = $stmt->fetchAll(PDO::FETCH_ASSOC);
    echo json_encode($result, JSON_UNESCAPED_UNICODE | JSON_PRETTY_PRINT);
} catch (PDOException $e) {
    echo json_encode(["error" => $e]);
} finally {
    exit();
}
