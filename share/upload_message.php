<?php

// Enable error reporting for debugging
ini_set('display_errors', 1);
error_reporting(E_ALL);

session_start();

// Database connection
$host = "localhost";
$user = "board_user";
$password = "JDP_p100_PWD!";
$database = "message_board";

$conn = new mysqli($host, $user, $password, $database);

if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

// Check if the user is logged in
if (!isset($_COOKIE['session_token'])) {
    header("Location: login.html");
    exit;
}

$session_token = $_COOKIE['session_token'];
$stmt = $conn->prepare("SELECT user_id FROM sessions WHERE session_token = ?");
$stmt->bind_param("s", $session_token);
$stmt->execute();
$stmt->store_result();
$stmt->bind_result($user_id);

if (!$stmt->fetch()) {
    header("Location: login.html");
    exit;
}

$stmt->close();

// Get message and file data
$message = $_POST['message'] ?? '';
$is_private = isset($_POST['is_private']) ? 1 : 0;
$file_name = null;
$file_data = null;

// Handle file upload
if (isset($_FILES["file"]) && $_FILES["file"]["error"] === UPLOAD_ERR_OK) {
    $file_name = $_FILES["file"]["name"];
    $file_data = file_get_contents($_FILES["file"]["tmp_name"]);
}

// Insert message into the database
$stmt2 = $conn->prepare("INSERT INTO messages (user_id, message, file_name, file_data, is_private) VALUES (?, ?, ?, ?, ?)");
$stmt2->bind_param("isssi", $user_id, $message, $file_name, $file_data, $is_private);

if ($stmt2->execute()) {
    header("Location: user_page.php?user_id=$user_id");
} else {
    echo "Failed to upload message.";
}

$stmt2->close();
$conn->close();
?>
