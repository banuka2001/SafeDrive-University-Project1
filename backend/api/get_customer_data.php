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

session_set_cookie_params([
    'samesite' => 'Lax',
    'secure' => false,
    'path' => '/',
]);
session_start();
ini_set('display_errors', 1);
error_reporting(E_ALL);

if (!isset($_SESSION['loggedin']) || $_SESSION['loggedin'] !== true) {
    http_response_code(401);
    echo json_encode(['error' => 'User not logged in.']);
    exit();
}

try {
    $customer = new Customer($conn);
    $user_id = $_SESSION['user_id'];
    $stmt = $conn->prepare("SELECT u.user_id, c.first_name, c.last_name, u.email_or_phone_number AS email, c.profile_picture_url FROM users u JOIN customers c ON u.user_id = c.user_id WHERE u.user_id = ?");
    $stmt->bind_param("i", $user_id);
    $stmt->execute();
    $result = $stmt->get_result();
    $user_data = $result->fetch_assoc();
    $stmt->close();
    if ($user_data) {
        $user_data['roles'] = $_SESSION['roles'];
        $user_data['username'] = $user_data['first_name'] . ' ' . $user_data['last_name'];
        unset($user_data['first_name'], $user_data['last_name']);
        http_response_code(200);
        echo json_encode([
            'success' => true,
            'data' => $user_data
        ]);
    } else {
        http_response_code(404);
        echo json_encode(['error' => 'User data not found.']);
    }
} catch (Exception $e) {
    http_response_code(500);
    echo json_encode(['error' => 'Server error', 'message' => $e->getMessage()]);
} 