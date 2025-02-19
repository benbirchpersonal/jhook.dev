<?php
// Database connection
$host = "localhost";
$user = "board_user";
$password = "JDP_p100_PWD!";
$database = "message_board";

$conn = new mysqli($host, $user, $password, $database);

if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

// Handle incoming data
$message = $_POST["message"] ?? null;
$fileName = null;
$fileData = null;

// Handle file upload
if (isset($_FILES["file"]) && $_FILES["file"]["error"] === UPLOAD_ERR_OK) {
    $fileName = $_FILES["file"]["name"];
    $fileData = file_get_contents($_FILES["file"]["tmp_name"]);
    // Encode file content to Base64
    $fileData = base64_encode($fileData);
}

// Encode message to Base64
if ($message) {
    $message = base64_encode($message); // Encode the message text
}

// Insert into database
$stmt = $conn->prepare("INSERT INTO messages (message, file_name, file_data) VALUES (?, ?, ?)");
$stmt->bind_param("sss", $message, $fileName, $fileData);

if ($stmt->execute()) {
    echo json_encode(["success" => true, "message" => "Message uploaded successfully."]);
} else {
    echo json_encode(["success" => false, "message" => "Failed to upload message."]);
}

$stmt->close();
$conn->close();
?>
