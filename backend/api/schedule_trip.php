<?php
require_once '../db.php';
require_once '../classes/BookingManager.php';

if (isset($_SERVER['HTTP_ORIGIN'])) {
    header("Access-Control-Allow-Origin: " . $_SERVER['HTTP_ORIGIN']);
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
$tripManager = new BookingManager($conn);
try {
    $tripManager->scheduleTrip($customer_id, $driver_id, $pickup_location, $destination, $pickup_town, $datetime);
    http_response_code(201);
    echo json_encode(['success' => 'Trip scheduled successfully.']);
} catch (Exception $e) {
    http_response_code(500);
    echo json_encode(['error' => $e->getMessage()]);
} 