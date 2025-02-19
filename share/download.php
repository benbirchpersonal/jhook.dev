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

if (isset($_GET["id"])) {
    $id = intval($_GET["id"]);

    $stmt = $conn->prepare("SELECT file_name, file_data FROM messages WHERE id = ?");
    $stmt->bind_param("i", $id);
    $stmt->execute();
    $stmt->bind_result($fileName, $fileData);

    if ($stmt->fetch()) {
        header("Content-Disposition: attachment; filename=" . $fileName);
        echo base64_decode($fileData); // Decode file data before sending
    }

    $stmt->close();
}

$conn->close();
?>
