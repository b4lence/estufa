<?php

require '../../_db/conexao.php';

function getLastImg($codigo)
{
    global $con;
    try {
        $sql = "SELECT foto FROM usuarios WHERE codigo = :codigo";
        $stmt = $con->prepare($sql);

        $stmt->bindParam(':codigo', $codigo);

        $stmt->execute();
        if ($stmt->rowCount() >= 1) {
            return $stmt->fetchAll(PDO::FETCH_ASSOC)[0]['foto'];
        }
        return 0;
    } catch (PDOException $e) {
        echo $e;
    }
}

function deleteImg($file)
{
    if ($file != 'default.png') {
        unlink('../../_assets/_img-userconfig/' . $file);
    }
}

function uploadImg($file)
{
    if (file_exists($file['name'])) {
        return $file['name'];
    }
    move_uploaded_file($file['tmp_name'], '../../_assets/_img-userconfig/' . $file['name']);
    return $file['name'];
}

try {
    $codigo = $_SESSION['codigo'];
    deleteImg(getLastImg($codigo));
    $foto = uploadImg($_FILES['uploadImg']);

    $query = "UPDATE usuarios SET foto = :foto WHERE codigo = :codigo";
    $stmt = $con->prepare($query);

    $stmt->bindParam(":codigo", $codigo);
    $stmt->bindParam(":foto", $foto);

    $stmt->execute();
} catch (PDOException $e) {
    $_SESSION['error'] = 'Erro ao trocar a imagem';
} finally {
    header('Location: ../../configuracoes.php');
    exit();
}
