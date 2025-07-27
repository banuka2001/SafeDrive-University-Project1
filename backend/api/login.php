<?php
require_once '../db.php';
require_once '../classes/User.php';

if (isset($_SERVER['HTTP_ORIGIN'])) {
    header("Access-Control-Allow-Origin: " . $_SERVER['HTTP_ORIGIN']);
    header("Access-Control-Allow-Credentials: true");
}
header("Access-Control-Allow-Methods: GET, POST, OPTIONS");
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
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);
set_error_handler(function($severity, $message, $file, $line) {
    if (!(error_reporting() & $severity)) return;
    if (isset($_SERVER['HTTP_ORIGIN'])) {
        header("Access-Control-Allow-Origin: " . $_SERVER['HTTP_ORIGIN']);
        header("Access-Control-Allow-Credentials: true");
    }
    header("Content-Type: application/json; charset=UTF-8");
    throw new ErrorException($message, 0, $severity, $file, $line);
});
set_exception_handler(function($exception) {
    if (isset($_SERVER['HTTP_ORIGIN'])) {
        header("Access-Control-Allow-Origin: " . $_SERVER['HTTP_ORIGIN']);
        header("Access-Control-Allow-Credentials: true");
    }
    header("Content-Type: application/json; charset=UTF-8");
    http_response_code(500);
    echo json_encode([
        'error' => 'Server error',
        'message' => $exception->getMessage()
    ]);
    exit();
});

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $email_phone = $_POST['email_phone'] ?? '';
    $password = $_POST['password'] ?? '';
    if (empty($email_phone) || empty($password)) {
        http_response_code(400);
        echo json_encode(['error' => 'Email/Phone and password are required.']);
        exit();
    }
    $user = new User($conn);
    if (!$user->authenticate($email_phone, $password)) {
        http_response_code(401);
        echo json_encode(['error' => 'Invalid credentials or user not found.']);
        exit();
    }
    if (empty($user->getRoles())) {
        http_response_code(403);
        echo json_encode(['error' => 'User has no assigned roles.']);
        exit();
    }
    $user->loginSession();
    echo json_encode([
        'success' => 'Login successful.',
        'roles' => $user->getRoles(),
        'user_id' => $user->getUserId()
    ]);
    exit();
}
http_response_code(405);
echo json_encode(['error' => 'Method not allowed.']);
