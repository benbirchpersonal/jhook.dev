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
        $message = $row['message'];
        $fileName = $row['file_name'];
        $createdAt = $row['created_at'];

        // Format timestamp
        $timestamp = formatTimestamp($createdAt);

        $messages[] = [
            'id' => $row['id'],
            'message' => $message,
            'file_name' => $fileName,
            'timestamp' => $timestamp
        ];
    }
}

echo json_encode(["success" => true, "messages" => $messages]);

$conn->close();

// Function to format timestamp
function formatTimestamp($timestamp) {
    $date = new DateTime($timestamp);
    $now = new DateTime();
    
    // If the message was created today, show only the time
    if ($date->format('Y-m-d') == $now->format('Y-m-d')) {
        return $date->format('H:i'); // Time format (HH:MM)
    }
    
    // If the message was created in the past week, show the weekday
    if ($now->diff($date)->days <= 7) {
        return $date->format('l'); // Full weekday name
    }
    
    // Otherwise, show the full date
    return $date->format('Y-m-d'); // Date format (YYYY-MM-DD)
}
?>
