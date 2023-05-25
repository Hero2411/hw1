<!DOCTYPE html>
<html>

<head>
    <link rel="stylesheet" href="./hw1.css">
    <link href='https://fonts.googleapis.com/css?family=Montserrat' rel='stylesheet'>
    <title>Set</title>
    <meta name="viewport" content="width=device-width, initial-scale=1">
</head>

<body>

<?php
    include("./components/header.php")
    ?>

    <img id="prev" src="./immagini/previous.png" width=48px>
    <img id="next" src="./immagini/next.png" width=48px>

    <div id="titleimg">
    </div>

    <section class="grid">
    </section>

    </div>

    </div>
    <h3>Rating</h3>
    <section id="rating">
    </section>

    <h3>Comments</h3>
    <section id="comments">
    </section>

    </div>

    <?php
    include("./components/footer.php")
    ?>

    <script>
        // NEEDED TO PASS VARIABLE FROM PHP TO JS
        var set_id = <?php
            if (!isset($_GET['id'])) {
                echo "0";
            }
            else {
                echo $_GET['id'];
            }
         ?>
    </script>

    <script src="./js/utils.js"></script>
    <script src="./js/setsingolo.js"></script>

</body>

</html>