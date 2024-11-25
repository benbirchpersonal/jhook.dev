<?php
require 'vendor/autoload.php';

$dotenv = Dotenv\Dotenv::createImmutable(__DIR__);
$dotenv->load();

\Stripe\Stripe::setApiKey($_ENV['STRIPE_SECRET_KEY']);

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $cartData = json_decode($_POST['cart-data'], true);
    $totalAmount = array_reduce($cartData, function($sum, $item) {
        return $sum + $item['price'];
    }, 0);

    // Save order details to a JSON file
    $orderData = [
        'timestamp' => date('Y-m-d H:i:s'),
        'items' => $cartData,
        'total' => $totalAmount
    ];
    $ordersFile = 'orders.json';
    $existingOrders = file_exists($ordersFile) ? json_decode(file_get_contents($ordersFile), true) : [];
    $existingOrders[] = $orderData;
    file_put_contents($ordersFile, json_encode($existingOrders, JSON_PRETTY_PRINT));

    // Create Stripe Checkout Session
    $session = \Stripe\Checkout\Session::create([
        'payment_method_types' => ['card', 'apple_pay'],
        'line_items' => array_map(function ($item) {
            return [
                'price_data' => [
                    'currency' => 'usd',
                    'product_data' => [
                        'name' => $item['name'],
                    ],
                    'unit_amount' => $item['price'] * 100,
                ],
                'quantity' => 1,
            ];
        }, $cartData),
        'mode' => 'payment',
        'success_url' => 'https://yourdomain.com/success.html',
        'cancel_url' => 'https://yourdomain.com/cancel.html',
    ]);

    header('Content-Type: application/json');
    echo json_encode(['id' => $session->id]);
}
?>