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

// Start session
session_set_cookie_params([
    'samesite' => 'Lax',
    'secure' => false,
    'path' => '/',
]);
session_start();

// Check login status
if (isset($_SESSION['loggedin']) && $_SESSION['loggedin'] === true) {
    http_response_code(200);
    echo json_encode([
        'success' => true,
        'user_id' => $_SESSION['user_id'],
        'roles' => $_SESSION['roles']
    ]);
    exit();
} else {
    http_response_code(401);
    echo json_encode(['success' => false, 'error' => 'User not logged in.']);
    exit();
}
?> 