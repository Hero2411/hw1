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

$limit = "";
if (isset($_GET['limit'])) {
    $limit = "LIMIT " . $_GET['limit'];
}
$search = "";
if (isset($_GET['search'])) {
    $search = "WHERE title LIKE \"%" . $_GET['search'] ."%\"";
}
$query = "SELECT * FROM shoot_sets ". $search ." ORDER BY (shoot_date) DESC " . $limit;
$result = $db_connector->query($query);
    if (!$result) {
        $response_data["error"] = "Unable to execute query";
    }
    else {
        $response_data["data"] = $result->fetch_all(MYSQLI_ASSOC);
    }
$response_json = json_encode($response_data);
echo $response_json;

// LOGIC END
terminate($db_connector)
?>
