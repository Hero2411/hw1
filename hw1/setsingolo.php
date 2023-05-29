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

    <img id="prev" src="./immagini/previous.png" width=55px>
    <img id="next" src="./immagini/next.png" width=55px>

    <div id="titleimg">
    </div>

    <section class="grid">
    </section>

    <div id = "show">
        <img id = "showselected">
    </div>

    <div id="commentsection">
        <div class="comments-container" id="comments">
        </div>

        <div id="rating-container">
            <h2 id="rating"></h2>
        </div>
    </div>

    <div id = "interactions">
        <button id="like-button">Like</button></br>
        <label for="rating">Rating:</label>
        <input type="number" max = 5 min = 1 id="rating_input" placeholder="From 1 to 5">
        <button id = "rating_input_btn">Send</button></br>
        <label for="commenta">Comment:</label>
        <input type="text" id="comment_input" placeholder="Write your comment">
        <button id = "comment_input_btn">Send</button>
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