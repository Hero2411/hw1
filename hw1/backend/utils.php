<?php
function getDB() {
    try {
        return new mysqli("localhost", "root", "", "hw1");
    } catch (Exception $e) {
        $response_data["error"] = "Unable to communicate with the database!";
        $response_json = json_encode($response_data);
        echo $response_json;
        return null;
    }
}

function isAuthorized($db_connector) {
    $auth = false;
    if (isset($_GET['token'])) {
        $token = $_GET['token'];
        $query = "SELECT COUNT(*) as count FROM users WHERE token = '$token'";
        $result = $db_connector->query($query);
        if (!$result) {
            $response_data["error"] = "Unable to execute Token validation";
        }
        else {
            $count = $result->fetch_assoc()['count'];
            if ($count == 0) {
                $response_data["error"] = "Token is not valid!";
            } else {
                $auth = true;
            }
        }
    } else {
        $response_data["error"] = "No Token has been provided!";
    }
    if(!$auth) {
        $response_json = json_encode($response_data);
        echo $response_json;
    }
    return $auth;
}

function terminate($db_connector) {
    $db_connector->close();
    die();
}
?>