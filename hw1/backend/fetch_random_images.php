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

$query = "SELECT filename, alt_text  FROM photos ORDER BY RAND() LIMIT 9";
$result = $db_connector->query($query);
    if (!$result) {
        $response_data["error"] = "Unable to execute query";
    }
    else {
        if (mysqli_num_rows($result) > 0) {
            $response_data["data"] = $result->fetch_all(MYSQLI_ASSOC);
        }
        else {
            $response_data["error"] = "No images found!";
        }
    }
$response_json = json_encode($response_data);
echo $response_json;

// LOGIC END
terminate($db_connector)
?>
