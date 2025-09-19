<?php
include '_db/conexao.php';

if ($_SERVER['REQUEST_METHOD'] != 'POST') {
    exit();
}

function cleanUserData(string $codigoUsuario)
{
    global $con;
    try {
        $query = "DELETE FROM dados WHERE usuario = :usuario";

        $stmt = $con->prepare($query);
        $stmt->bindParam(":usuario", $codigoUsuario);

        $stmt->execute();
    } catch (PDOException $e) {
        echo $e;
    }
}

function searchPlant(string $nome)
{
    global $con;
    try {
        $query = "SELECT id FROM plantas WHERE nome = :nome";

        $stmt = $con->prepare($query);
        $stmt->bindParam(":nome", $nome);

        $stmt->execute();

        if ($stmt->rowCount() <= 1) {
            return $stmt->fetchColumn(0);
        }
    } catch (PDOException $e) {
        echo $e;
    }
}

try {
    $planta = searchPlant($_POST["planta"]);
    $usuario = $_SESSION["codigo"];

    $query = "UPDATE usuarios SET planta = :planta WHERE codigo = :codigo";

    $stmt = $con->prepare($query);
    $stmt->bindParam(":planta", $planta);
    $stmt->bindParam(":codigo", $usuario);

    $stmt->execute();

    cleanUserData($usuario);
} catch (PDOException $e) {
    echo $e;
} finally {
    header("Location: ../inicio.html");
    exit();
}