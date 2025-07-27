<?php
require_once '../db.php';
require_once '../classes/Customer.php';

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Credentials: true");
header("Access-Control-Allow-Methods: GET, POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization, X-Requested-With");
header("Content-Type: application/json; charset=UTF-8");
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}
ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);
set_error_handler(function($severity, $message, $file, $line) {
    if (!(error_reporting() & $severity)) return;
    throw new ErrorException($message, 0, $severity, $file, $line);
});
set_exception_handler(function($exception) {
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
if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(['error' => 'Method not allowed.']);
    exit();
}
$customer = new Customer($conn);
try {
    $customer->register($_POST, $_FILES);
    http_response_code(201);
    echo json_encode(['success' => 'Customer registered successfully.']);
} catch (Exception $e) {
    http_response_code(500);
    echo json_encode(['error' => 'Registration failed: ' . $e->getMessage()]);
} 