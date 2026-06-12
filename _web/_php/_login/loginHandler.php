<?php
require '../../_db/conexao.php';

if ($_SERVER['REQUEST_METHOD'] != 'POST') {
    exit();
}

try {
    $nome = $_POST['nome'];
    $senha = $_POST['senha'];

    $query = "SELECT * FROM usuarios WHERE nome = :nome AND senha = :senha";

    $stmt = $con->prepare($query);

    $stmt->bindParam(':nome', $nome);
    $stmt->bindParam(':senha', $senha);

    $stmt->execute();

    if ($stmt->rowCount() == 1) {
        $_SESSION['nome'] = $nome;
        $_SESSION['codigo'] = $stmt->fetch(PDO::FETCH_ASSOC)['codigo'];
        header('Location: ../../inicio.php');
        exit();
    } else {
        $_SESSION['error'] = 'Usuario ou senha incorretos';
        header('Location: ../../login.php');
        exit();
    }
} catch (PDOException $e) {
    echo $e;
    header('Location: ../../login.php');
    exit();
}
