<?php
session_start();

// Redirect to login if not authenticated
if (empty($_SESSION['logged_in'])) {
    header('Location: login.php');
    exit;
}

// Load orders from the JSON file
$ordersFile = 'orders.json';
$orders = file_exists($ordersFile) ? json_decode(file_get_contents($ordersFile), true) : [];
?>

<!DOCTYPE html>
<html>
<head>
    <title>Orders</title>
</head>
<body>
    <h2>Order Details</h2>
    <a href="logout.php">Logout</a>
    <hr>
    <?php if (empty($orders)): ?>
        <p>No orders yet.</p>
    <?php else: ?>
        <?php foreach ($orders as $order): ?>
            <h3>Order placed on <?php echo htmlspecialchars($order['timestamp']); ?></h3>
            <ul>
                <?php foreach ($order['items'] as $item): ?>
                    <li><?php echo htmlspecialchars($item['name']); ?> - $<?php echo number_format($item['price'], 2); ?></li>
                <?php endforeach; ?>
            </ul>
            <p><strong>Total:</strong> $<?php echo number_format($order['total'], 2); ?></p>
            <hr>
        <?php endforeach; ?>
    <?php endif; ?>
</body>
</html>