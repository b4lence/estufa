<?php

require '../../_db/conexao.php';

function userExists($nome)
{
    global $con;
    try {
        $sql = "SELECT * FROM usuarios WHERE nome = :nome";
        $stmt = $con->prepare($sql);

        $stmt->bindParam(":nome", $nome);

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
    $codigo = $_SESSION['codigo'];
    $nomeNovo = $_POST['novoUsuario'];
    $confirmacao = $_POST['confirmeUsuario'];

    if ($nomeNovo != $confirmacao) {
        $_SESSION['error'] = 'Os nomes não condizem';
        header('Location: ../../configuracoes.php');
        exit();
    }
    if (userExists($nomeNovo)) {
        $_SESSION['error'] = 'Um usuario com esse nome já existe';
        header('Location: ../../configuracoes.php');
        exit();
    }

    $query = 'UPDATE usuarios SET nome = :nome WHERE codigo = :codigo';

    $stmt = $con->prepare($query);
    $stmt->bindParam(':codigo', $codigo);
    $stmt->bindParam(':nome', $nomeNovo);

    $stmt->execute();

    header('Location: ../../configuracoes.php');
} catch (PDOException $e) {
    $_SESSION['error'] = 'Erro ao alterar o nome';
    header('Location: ../../configuracoes.php');
} finally {
    exit();
}
