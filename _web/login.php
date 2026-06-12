<?php require_once '_php\errorHandler.php'; ?>

<!DOCTYPE html>

<html lang="pt-BR">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="_css/login.css">
    <link rel="stylesheet" href="_css/popup.css">
    <title>Login FloraSync</title>
</head>

<body>

    <?php errorHandler(); ?>
    <div class="main-container">
        <div class="left">
            <img src="_assets/_img-login/login-animate.svg" alt="Imagem de um homem fazendo login" class="img-login">
        </div>

        <div class="right">
            <div class="header">
                <h1 style="font-size: 3.5vh; color: #14ad84;">FloraSync</h1>
            </div>
            <div class="login">

                <form action="_php/_login/loginHandler.php" method="post" class="form-box">

                    <div class="input-box">
                        <input type="text" name="nome" class="input" required placeholder=" " />
                        <label class="label">Usuário</label>
                    </div>

                    <div class="input-box">
                        <input type="password" name="senha" class="input" required placeholder=" " />
                        <label class="label">Senha</label>
                    </div>

                    <div class="input-button">
                        <input type="submit" value="Entrar" class="button">
                    </div>

                </form>

            </div>
            <a href="cadastrar.php" class="linkCadastrar">Criar uma conta</a>

        </div>

    </div>

</body>

</html>