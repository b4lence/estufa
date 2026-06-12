<?php

require '../../_db/conexao.php';

function verificarSenha($senhaVelha)
{
    global $con;
    $codigo = $_SESSION['codigo'];

    $query = 'SELECT senha FROM usuarios WHERE codigo = :codigo';

    $stmt = $con->prepare($query);
    $stmt->bindParam(':codigo', $codigo);

    $stmt->execute();

    $result = $stmt->fetch(PDO::FETCH_ASSOC);
    if ($result['senha'] == $senhaVelha) {
        return true;
    } else {
        return false;
    }
}

try {
    $codigo = $_SESSION['codigo'];
    $senhaNova = $_POST['novaSenha'];
    $senhaVelha = $_POST['velhaSenha'];
    $confirmarSenha = $_POST['confirmarSenha'];

    if ($confirmarSenha != $senhaNova) {
        $_SESSION['error'] = 'As senhas não condizem';
        header('Location: ../../configuracoes.php');
        exit();
    }
    if (!verificarSenha($senhaVelha)) {
        $_SESSION['error'] = 'A senha antiga está incorreta';
        header('Location: ../../configuracoes.php');
        exit();
    }

    $query = 'UPDATE usuarios SET senha = :senha WHERE codigo = :codigo';

    $stmt = $con->prepare($query);
    $stmt->bindParam(':senha', $senhaNova);
    $stmt->bindParam(':codigo', $codigo);

    $stmt->execute();

    header('Location: ../../configuracoes.php');
} catch (PDOException $e) {
    $_SESSION['error'] = 'Erro ao alterar a senha';
    header('Location: ../../configuracoes.php');
} finally {
    exit();
}
