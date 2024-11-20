<?php
// Database connection
$host = "localhost";
$user = "board_user";
$password = "secure_password";
$database = "message_board";

$conn = new mysqli($host, $user, $password, $database);

if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

// Fetch all messages
$sql = "SELECT id, message, file_name FROM messages";
$result = $conn->query($sql);

$messages = [];
while ($row = $result->fetch_assoc()) {
    $messages[] = $row;
}

echo json_encode(["success" => true, "messages" => $messages]);

$conn->close();
?>
