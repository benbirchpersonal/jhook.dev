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

if ($_SERVER["REQUEST_METHOD"] === "POST") {
    $message = $_POST["message"] ?? null;
    $fileName = null;
    $fileData = null;

    // Handle file upload
    if (isset($_FILES["file"]) && $_FILES["file"]["error"] === UPLOAD_ERR_OK) {
        $fileName = $_FILES["file"]["name"];
        $fileData = file_get_contents($_FILES["file"]["tmp_name"]);
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
}

$conn->close();
?>
