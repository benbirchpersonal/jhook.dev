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

// Fetch messages
$sql = "SELECT id, message, file_name, created_at FROM messages ORDER BY created_at DESC";
$result = $conn->query($sql);

$messages = [];
if ($result->num_rows > 0) {
    while ($row = $result->fetch_assoc()) {
        $messages[] = $row;
    }
}

echo json_encode(["success" => true, "messages" => $messages]);

$conn->close();
?>
