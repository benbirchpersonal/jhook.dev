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

$query = $_GET['query'] ?? '';

// Search for users by username
$stmt = $conn->prepare("SELECT id, username FROM users WHERE username LIKE ?");
$search_query = "%" . $query . "%";
$stmt->bind_param("s", $search_query);
$stmt->execute();
$result = $stmt->get_result();

echo "<h2>Search Results</h2>";

while ($row = $result->fetch_assoc()) {
    echo "<div class='user'>
            <a href='user_page.php?user_id=" . $row['id'] . "'>" . htmlspecialchars($row['username']) . "</a>
          </div>";
}

$stmt->close();
$conn->close();
?>
