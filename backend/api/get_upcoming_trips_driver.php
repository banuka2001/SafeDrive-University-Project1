<?php
require_once '../db.php';
require_once '../classes/User.php';

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
    if (!in_array('driver', $_SESSION['roles'])) {
        http_response_code(403);
        echo json_encode(['error' => 'User is not a driver.']);
        exit();
    }
    $user = new User($conn);
    $user_id = $_SESSION['user_id'];
    $stmt = $conn->prepare("SELECT driver_id FROM drivers WHERE user_id = ?");
    $stmt->bind_param("i", $user_id);
    $stmt->execute();
    $result = $stmt->get_result();
    if ($result->num_rows === 0) {
        http_response_code(404);
        echo json_encode(['error' => 'Driver not found.']);
        exit();
    }
    $driver_row = $result->fetch_assoc();
    $driver_id = $driver_row['driver_id'];
    $stmt->close();
    $stmt = $conn->prepare("
        SELECT 
            t.id,
            t.pickup_location AS pickup,
            t.destination,
            t.trip_time AS datetime,
            c.first_name AS customer_name,
            c.phone_number AS customer_phone
        FROM trips t
        JOIN customers c ON t.customer_id = c.customer_id
        WHERE t.driver_id = ? AND t.status = 'approved' AND t.trip_time > NOW()
        ORDER BY t.trip_time ASC
    ");
    $stmt->bind_param("i", $driver_id);
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