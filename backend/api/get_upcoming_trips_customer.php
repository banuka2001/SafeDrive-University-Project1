<?php
require_once '../db.php';
require_once '../classes/Customer.php';

if (isset($_SERVER['HTTP_ORIGIN'])) {
    header("Access-Control-Allow-Origin: " . $_SERVER['HTTP_ORIGIN']);
    header("Access-Control-Allow-Credentials: true");
}
header("Access-Control-Allow-Methods: GET, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization, X-Requested-With");
header("Content-Type: application/json; charset=UTF-8");

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

ini_set('display_errors', 0);
error_reporting(E_ALL);

session_set_cookie_params([
    'samesite' => 'Lax',
    'secure' => false,
    'path' => '/',
]);
session_start();

try {
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
    $customer = new Customer($conn);
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
    $customer_row = $result->fetch_assoc();
    $customer_id = $customer_row['customer_id'];
    $stmt->close();
    $stmt = $conn->prepare("
        SELECT 
            t.id,
            t.pickup_location AS pickup,
            t.destination,
            t.trip_time AS datetime,
            d.first_name AS driver_first_name,
            d.last_name AS driver_last_name
        FROM trips t
        JOIN drivers d ON t.driver_id = d.driver_id
        WHERE t.customer_id = ? AND t.status = 'approved' AND t.trip_time > NOW()
        ORDER BY t.trip_time ASC
    ");
    $stmt->bind_param("i", $customer_id);
    $stmt->execute();
    $result = $stmt->get_result();
    $trips = $result->fetch_all(MYSQLI_ASSOC);
    $stmt->close();
    http_response_code(200);
    echo json_encode($trips);
} catch (Exception $e) {
    http_response_code(500);
    echo json_encode(['error' => 'Server error', 'message' => $e->getMessage()]);
} 