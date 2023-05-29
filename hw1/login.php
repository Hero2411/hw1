<!DOCTYPE html>
<html>
<head>
	<title>Login e Registrazione</title>
	<link rel="stylesheet" href="hw1.css">
</head>
<body>

<?php
    include("./components/header.php")
    ?>

    <div id = "divform">
        <div id="capyform">
            <h2>Credenziali</h2>
            <label for="Username">Username:</label>
            <input type="text" id="username" placeholder="Username">
            <label for="password">Password:</label>
            <input type="password" id="password" placeholder="Password">
            <div>
            <button id="login">Accedi</button>
            <button id="reg">Registrati</button>
</div>
        </div>
    </div>

    <script src="./js/utils.js"></script>
    <script src="./js/log.js"></script>

    <?php
    include("./components/footer.php")
    ?>
    
</body>
</html>