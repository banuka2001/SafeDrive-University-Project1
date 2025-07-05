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
header("Access-Control-Allow-Methods: GET, POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization, X-Requested-With");
header("Content-Type: application/json; charset=UTF-8");

// Handle preflight requests
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

include '../db.php';

if (!isset($_SESSION['loggedin']) || $_SESSION['loggedin'] !== true) {
    http_response_code(401);
    echo json_encode(['error' => 'User not logged in.']);
    exit();
}

$user_id = $_SESSION['user_id'];

// The user_id from the session is used to get user details from users and drivers table
$stmt = $conn->prepare("SELECT u.user_id, d.first_name, d.last_name, u.email_or_phone_number AS email, d.profile_picture_url FROM users u JOIN drivers d ON u.user_id = d.user_id WHERE u.user_id = ?");
$stmt->bind_param("i", $user_id);
$stmt->execute();
$result = $stmt->get_result();
$user_data = $result->fetch_assoc();
$stmt->close();
$conn->close();

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
    echo json_encode(['error' => 'Driver data not found.']);
}
exit();
?> 