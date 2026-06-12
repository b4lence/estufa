<?php
require '../_db/conexao.php';

function userExists($nome, $codigo)
{
    global $con;
    try {
        $sql = "SELECT * FROM usuarios WHERE nome = :nome OR codigo = :codigo";
        $stmt = $con->prepare($sql);

        $stmt->bindParam(":nome", $nome);
        $stmt->bindParam(":codigo", $codigo);

        $stmt->execute();

        if ($stmt->rowCount() >= 1) {
            return 1;
        }
        return 0;
    } catch (PDOException $e) {
        echo $e;
    }
    return 1;
}

try {
    $nome = $_POST['nome'];
    $senha = $_POST['senha'];
    $codigo = $_POST['codigo'];
    $plantaDefault = 1;
    $caminhoFoto = 'default.png';

    if (userExists($nome, $codigo)) {
        $_SESSION['error'] = 'Usuario com mesmo nome ou código já existe';
        header('Location: ../cadastrar.php');
        exit();
    }

    $query = 'INSERT INTO usuarios (nome, senha, codigo, planta, foto) VALUES (:nome, :senha, :codigo, :planta, :foto)';
    $stmt = $con->prepare($query);

    $stmt->bindParam(':nome', $nome);
    $stmt->bindParam(':senha', $senha);
    $stmt->bindParam(':codigo', $codigo);
    $stmt->bindParam(':planta', $plantaDefault);
    $stmt->bindParam(':foto', $caminhoFoto);

    $stmt->execute();

    header('Location: ../login.php');
} catch (PDOException $e) {
    $_SESSION['error'] = 'Erro ao criar o usuário';
    header('Location: ../cadastrar.php');
} finally {
    exit();
}
