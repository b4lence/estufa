<?php
require_once '_db/conexao.php';
function errorHandler()
{
    if (isset($_SESSION['error'])) {
        echo "<div class=\"popup opened\" id=\"popup\">
                <img src=\"./_assets/warning.png\" alt=\"warning\">
    
                <h2 class=\"title\">Erro!</h2>
    
                <p class=\"desc\">" . $_SESSION['error'] . "</p>
    
                <button class=\"close-popup-button\" onclick=\"document.getElementById('popup').classList['remove']('opened');\">
                    Fechar
                </button>
            </div>";
        unset($_SESSION['error']);
    }
}
