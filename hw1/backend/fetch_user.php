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

$query = "SELECT id, username  FROM users WHERE token='$token'";
$result = $db_connector->query($query);
    if (!$result) {
        $response_data["error"] = "Unable to execute query";
    }
    else {
        if (mysqli_num_rows($result) > 0) {
            $response_data["data"] = $result->fetch_assoc();
            $sub_query = "SELECT * FROM photos p, photo_favorites pf WHERE pf.photo_id = p.id and pf.user_id = \"" . $response_data["data"]['id'] . "\"";
            $sub_result = $db_connector->query($sub_query);
                if (!$sub_result) {
                    $response_data["error"] = "Unable to execute sub_query";
                }
                else {
                    $response_data["data"]["images"] = $sub_result->fetch_all(MYSQLI_ASSOC);
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
