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
$_POST = json_decode(file_get_contents('php://input'), true);
// REGISTER START
if (!isset($_POST['username']) or !isset($_POST['password'])) {
    $response_data["error"] = "Missing credentials";
    $response_json = json_encode($response_data);
    echo $response_json;
    die();
}
$usernameRegex = '/^[a-zA-Z0-9\.]{5,}$/';
$pwdRegex = '/^[a-zA-Z0-9\.\!\$\%\&\?\*\:\#\@]{8,}$/';
$username = $_POST['username'];
$password = md5($_POST['password']);

if (!preg_match($usernameRegex, $username) or !preg_match($pwdRegex, $password)) {
    $response_data["error"] = "Invalid credentials";
    $response_json = json_encode($response_data);
    echo $response_json;
    die();
}
$query = "SELECT COUNT(*) as count FROM users WHERE username = '$username'";
$result = $db_connector->query($query);
if (!$result) {
    $response_data["error"] = "Unable to execute query";
}
else {
    $count = $result->fetch_assoc()['count'];
    if ($count > 0) {
        $response_data["error"] = "Username is already taken!";
    }
    else {
            $sub_query = "INSERT INTO `users` (username, password, token) VALUES ('$username','$password', UUID())";
            $sub_result = $db_connector->query($sub_query);
                if (!$sub_result) {
                    $response_data["error"] = "Unable to execute sub_query";
                }
                else {
                    $response_data["data"] = "Success";
                }
            }
    }

$response_json = json_encode($response_data);
echo $response_json;

// LOGIC END
terminate($db_connector);
?>
