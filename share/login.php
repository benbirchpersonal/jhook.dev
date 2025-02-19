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

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $email = $_POST['email'];
    $password = $_POST['password'];

    $stmt = $conn->prepare("SELECT id, password_hash FROM users WHERE email = ?");
    $stmt->bind_param("s", $email);
    $stmt->execute();
    $stmt->store_result();
    $stmt->bind_result($user_id, $hashed_password);
    
    if ($stmt->fetch() && password_verify($password, $hashed_password)) {
        // Generate a session token
        $session_token = bin2hex(random_bytes(16));

        // Store session token in the sessions table
        $stmt2 = $conn->prepare("INSERT INTO sessions (user_id, session_token) VALUES (?, ?)");
        $stmt2->bind_param("is", $user_id, $session_token);
        $stmt2->execute();

        // Set session cookie
        setcookie("session_token", $session_token, time() + 3600, "/");

        header("Location: user_page.php");
        exit;
    } else {
        echo "Invalid credentials.";
    }

    $stmt->close();
}

$conn->close();
?>
