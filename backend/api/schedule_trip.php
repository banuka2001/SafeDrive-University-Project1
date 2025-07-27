<?php
$allowed_origin = 'http://localhost:5173';
$origin = isset($_SERVER['HTTP_ORIGIN']) ? $_SERVER['HTTP_ORIGIN'] : '';
if ($origin === $allowed_origin) {
    header("Access-Control-Allow-Origin: $origin");
    header("Access-Control-Allow-Credentials: true");
} else {
    header("Access-Control-Allow-Origin: $allowed_origin");
    header("Access-Control-Allow-Credentials: true");
}
header("Access-Control-Allow-Methods: POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization, X-Requested-With");
header("Content-Type: application/json; charset=UTF-8");

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

ini_set('display_errors', 0);
error_reporting(E_ALL);

set_exception_handler(function ($exception) {
    http_response_code(500);
    echo json_encode([
        'error' => 'Server error',
        'message' => $exception->getMessage()
    ]);
    exit();
});

session_set_cookie_params([
    'samesite' => 'Lax',
    'secure' => false,
    'path' => '/',
]);
session_start();

include '../db.php';

if (!isset($_SESSION['loggedin']) || $_SESSION['loggedin'] !== true) {
    http_response_code(401);
    echo json_encode(['error' => 'User not logged in.']);
    exit();
}

if (!in_array('customer', $_SESSION['roles'])) {
    http_response_code(403);
    echo json_encode(['error' => 'User is not a customer.']);
    exit();
}

$user_id = $_SESSION['user_id'];
$stmt = $conn->prepare("SELECT customer_id FROM customers WHERE user_id = ?");
$stmt->bind_param("i", $user_id);
$stmt->execute();
$result = $stmt->get_result();
if ($result->num_rows === 0) {
    http_response_code(404);
    echo json_encode(['error' => 'Customer not found.']);
    exit();
}
$customer = $result->fetch_assoc();
$customer_id = $customer['customer_id'];

$data = json_decode(file_get_contents('php://input'), true);

$pickup_location = $data['pickup'] ?? '';
$pickup_town = $data['pickuptown'] ?? '';
$destination = $data['destination'] ?? '';
$datetime = $data['datetime'] ?? '';
$driver_id = $data['driverId'] ?? '';

if (empty($pickup_location) || empty($pickup_town) || empty($destination) || empty($datetime) || empty($driver_id) || empty($customer_id)) {
    http_response_code(400);
    echo json_encode(['error' => 'All fields are required.']);
    exit();
}

$stmt = $conn->prepare("INSERT INTO trips (customer_id, driver_id, pickup_location, destination, pickup_town, trip_time) VALUES (?, ?, ?, ?, ?, ?)");
$stmt->bind_param("iissss", $customer_id, $driver_id, $pickup_location, $destination, $pickup_town, $datetime);

if ($stmt->execute()) {
    http_response_code(201);
    echo json_encode(['success' => 'Trip scheduled successfully.']);
} else {
    http_response_code(500);
    echo json_encode(['error' => 'Failed to schedule trip.']);
}

$stmt->close();
$conn->close();

?> 