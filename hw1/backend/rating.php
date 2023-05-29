<?php
// COPYPASTA START
include "utils.php";

header('Content-Type: application/json');
$response_data = [];

$db_connector = getDB();

if (!$db_connector) {
    die();
}

if (!isAuthorized($db_connector)) {
    die();
}

// COPYPASTA END

$token = $_GET["token"];

if (!isset($_GET['image_id'])) {
    $response_data["error"] = "Image id not provided";
    $response_json = json_encode($response_data);
    echo $response_json;
    die();
}

if (!isset($_GET['rate'])) {
    $response_data["error"] = "Rate value not provided";
    $response_json = json_encode($response_data);
    echo $response_json;
    die();
} else {
    if ($_GET['rate'] <= 0 || $_GET['rate'] > 5) {
        $response_data["error"] = "Rate value not valid";
        $response_json = json_encode($response_data);
        echo $response_json;
        die();
    }
}

$query = "SELECT id FROM users WHERE token='$token'";
$result = $db_connector->query($query);
    if (!$result) {
        $response_data["error"] = "Unable to execute query";
    }
    else {
        if (mysqli_num_rows($result) > 0) {
            $user_id = $result->fetch_assoc()["id"];
            $sub_query = "Insert into photo_ratings values (".$user_id.", " . $_GET['image_id'] . ", " . $_GET['rate'] . ")";
            try {
                $sub_result = $db_connector->query($sub_query);
                if (!$sub_result) {
                    $response_data["error"] = "Unable to execute sub_query";
                }
                else {
                    $response_data["data"] = "Rating saved!";
                }
            } catch (Exception $e) {
                $response_data["error"] = "Image already rated!";
            }
        }
        else {
            $response_data["error"] = "No user found!";
        }
    }
$response_json = json_encode($response_data);
echo $response_json;

// LOGIC END
terminate($db_connector)
?>
