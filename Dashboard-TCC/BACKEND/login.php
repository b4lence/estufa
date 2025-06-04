<?php
include 'conexao.php';

if ($_SERVER['REQUEST_METHOD'] != 'POST') {
    exit();
}

try {
    $nome = $_POST['nome'];
    $codigo = $_POST['codigo'];

    $query = "SELECT * FROM usuarios WHERE nome = :nome AND codigo = :codigo";

    $stmt = $con->prepare($query);

    $stmt->bindParam(':nome', $nome);
    $stmt->bindParam(':codigo', $codigo);

    $stmt->execute();

    if ($stmt->rowCount() == 1) {
        $_SESSION['nome'] = $nome;
        $_SESSION['codigo'] = $codigo;
        header('Location: ../HTML/inicio.html');
        exit();
    } else {
        header('Location: ../HTML/login.html');
        exit();
    }
} catch (PDOException $e) {
    echo $e;
}
