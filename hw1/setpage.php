<!DOCTYPE html>
<html>

<head>
    <link rel="stylesheet" href="./hw1.css">
    <link href='https://fonts.googleapis.com/css?family=Montserrat' rel='stylesheet'>
    <title>Natura</title>
    <meta name="viewport" content="width=device-width, initial-scale=1">
</head>

<body>

<?php
    include("./components/header.php")
    ?>

    
    <div id="ricerca">
        <input type="text" id="searchInput">
        <button id="search_button">Cerca</button>
    </div>


    <div id = "containerset">
    </div>



    <?php
    include("./components/footer.php")
    ?>

    <script src="./js/utils.js"></script>
    <script src="./js/setpage.js"></script>

</body>

</html>