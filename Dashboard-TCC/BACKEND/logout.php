<?php
session_start();

unset($_SESSION['nome']);
unset($_SESSION['codigo']);

header('Location: ../HTML/login.html');
exit();
