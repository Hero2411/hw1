<?php
// COPYPASTA START
include "utils.php";

header('Content-Type: application/json');
$response_data = [];

$db_connector = getDB();

if (!$db_connector) {
    die();
}

// COPYPASTA END

// LOGIC START

if (!isset($_GET['id'])) {
    $response_data["error"] = "Set not provided";
    $response_json = json_encode($response_data);
    echo $response_json;
    die();
}
$query = "SELECT * FROM shoot_sets WHERE id = " . $_GET['id'];
$result = $db_connector->query($query);
    if (!$result) {
        $response_data["error"] = "Unable to execute query";
    }
    else {
        if (mysqli_num_rows($result) > 0) {
            $response_data["data"] = $result->fetch_assoc();
            $sub_query = "SELECT * FROM photos WHERE set_id = " . $_GET['id'];
            $sub_result = $db_connector->query($sub_query);
                if (!$sub_result) {
                    $response_data["error"] = "Unable to execute sub_query";
                }
                else {
                    $response_data["data"]["images"] = $sub_result->fetch_all(MYSQLI_ASSOC);
                }
            }
        else {
            $response_data["error"] = "Set ID not valid";
        }
    }
$response_json = json_encode($response_data);
echo $response_json;

// LOGIC END
terminate($db_connector)
?>
