<?php
// Database connection

// Enable error reporting for debugging
ini_set('display_errors', 1);
error_reporting(E_ALL);

$host = "localhost";
$user = "board_user";
$password = "JDP_p100_PWD!";
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
        // Decode the message from Base64
        $row['message'] = base64_decode($row['message']);
        
        // Decode file content if it's Base64 encoded
        if ($row['file_name']) {
            $row['file_data'] = base64_decode($row['file_data']);
        }

        $messages[] = $row;
    }
}

echo json_encode(["success" => true, "messages" => $messages]);

$conn->close();
?>
