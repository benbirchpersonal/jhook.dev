<?php

// Enable error reporting for debugging
ini_set('display_errors', 1);
error_reporting(E_ALL);

session_start();

// Database connection
$host = "localhost";
$user = "jdp";
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

// Get the user ID from the session token
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

// Get the username or user ID from the URL (i.e., `/user/{username}`)
$user_page_id = isset($_GET['user_id']) ? intval($_GET['user_id']) : $user_id;

// Fetch user information (name, profile, etc. if needed)
$stmt2 = $conn->prepare("SELECT username FROM users WHERE id = ?");
$stmt2->bind_param("i", $user_page_id);
$stmt2->execute();
$stmt2->store_result();
$stmt2->bind_result($username);
$stmt2->fetch();
$stmt2->close();

// Fetch public messages for the user
$stmt3 = $conn->prepare("SELECT message, file_name, created_at FROM messages WHERE user_id = ? AND is_private = 0 ORDER BY created_at DESC");
$stmt3->bind_param("i", $user_page_id);
$stmt3->execute();
$result = $stmt3->get_result();

echo "<h1>$username's Public Page</h1>";
echo "<h2>Public Messages</h2>";

while ($row = $result->fetch_assoc()) {
    echo "<div class='message'>";
    echo "<p>" . htmlspecialchars($row['message']) . "</p>";
    if ($row['file_name']) {
        echo "<a href='download.php?id=" . $row['id'] . "'>Download " . htmlspecialchars($row['file_name']) . "</a>";
    }
    echo "<p><small>" . $row['created_at'] . "</small></p>";
    echo "</div>";
}

$stmt3->close();
$conn->close();
?>
