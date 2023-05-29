<html>
<head>
    <link rel="stylesheet" href="./hw1.css">
    <link href='https://fonts.googleapis.com/css?family=Montserrat' rel='stylesheet'>
    <title>AlterPhotograpy</title>
    <meta name="viewport" content="width=device-width, initial-scale=1">
</head>

<body>

    <?php
    include("./components/header.php")
    ?>

    <header>
        <div id="introduction">
            <p><span id="random_quote">AlterPhotograpy</span></p>
        </div>


    </header>

    <div id="socialbutton">
        <a href="https://www.instagram.com/alter.photography_" target="_blank">
            <img src="immagini/insta.png" alt="Insta link">
        </a>
        <a href="https://t.me/alterphotography" target="_blank">
            <img src="immagini/tele.png" alt="Telegram link">
        </a>
    </div>

    <div class="titoli">
        <h1> Sezione set vari</h1>
        <p>Web programming refers to the creation
            of websites and web applications using
            various programming languages. Below
            are some of the commonly used programming
            languages in web development:</p>
    </div>


    <div id="cardbody">
    </div>

    <div class="titoli">
        <h1> Sezione foto random 16:9 <img id="refresh_images" src="./immagini/refresh.png" width=35px/></h1>
        <p>Web programming refers to the creation
            of websites and web applications using
            various programming languages. Below
            are some of the commonly used programming
            languages in web development:</p>
    </div>
    <section class="grid">
    </section>

    <section id="zoom" class="hidden"> </section>

    <?php
    include("./components/footer.php")
    ?>

    <script src="./js/utils.js"></script>
    <script src="./js/hw1.js"></script>

</body>

</html>