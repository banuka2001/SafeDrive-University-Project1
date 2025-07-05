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

// Enable error reporting
ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);

// Custom error handler
set_error_handler(function($severity, $message, $file, $line) {
    if (!(error_reporting() & $severity)) return;
    // Always send CORS headers for errors
    global $origin, $allowed_origin;
    if ($origin === $allowed_origin) {
        header("Access-Control-Allow-Origin: $origin");
        header("Access-Control-Allow-Credentials: true");
    } else {
        header("Access-Control-Allow-Origin: $allowed_origin");
        header("Access-Control-Allow-Credentials: true");
    }
    header("Content-Type: application/json; charset=UTF-8");
    throw new ErrorException($message, 0, $severity, $file, $line);
});

// Exception handler
set_exception_handler(function($exception) {
    global $origin, $allowed_origin;
    if ($origin === $allowed_origin) {
        header("Access-Control-Allow-Origin: $origin");
        header("Access-Control-Allow-Credentials: true");
    } else {
        header("Access-Control-Allow-Origin: $allowed_origin");
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

// Include DB
include '../db.php';

$response = [];

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $email_phone = $_POST['email_phone'] ?? '';
    $password = $_POST['password'] ?? '';

    if (empty($email_phone) || empty($password)) {
        http_response_code(400);
        echo json_encode(['error' => 'Email/Phone and password are required.']);
        exit();
    }

    // First, check if user exists in the users table
    $stmt = $conn->prepare("SELECT user_id, password FROM users WHERE email_or_phone_number = ?");
    $stmt->bind_param("s", $email_phone);
    $stmt->execute();
    $result = $stmt->get_result();

    if ($result->num_rows === 0) {
        http_response_code(404);
        echo json_encode(['error' => 'User not found.']);
        exit();
    }

    $user = $result->fetch_assoc();

    if (!password_verify($password, $user['password'])) {
        http_response_code(401);
        echo json_encode(['error' => 'Invalid credentials.']);
        exit();
    }

    $user_id = $user['user_id'];
    $roles = [];

    // Check if user is a customer
    $stmt_customer = $conn->prepare("SELECT customer_id FROM customers WHERE user_id = ?");
    $stmt_customer->bind_param("i", $user_id);
    $stmt_customer->execute();
    if ($stmt_customer->get_result()->num_rows > 0) {
        $roles[] = 'customer';
    }
    $stmt_customer->close();

    // Check if user is a driver
    $stmt_driver = $conn->prepare("SELECT driver_id FROM drivers WHERE user_id = ?");
    $stmt_driver->bind_param("i", $user_id);
    $stmt_driver->execute();
    if ($stmt_driver->get_result()->num_rows > 0) {
        $roles[] = 'driver';
    }
    $stmt_driver->close();

    if (empty($roles)) {
        http_response_code(403);
        echo json_encode(['error' => 'User has no assigned roles.']);
        exit();
    }

    $_SESSION['user_id'] = $user_id;
    $_SESSION['roles'] = $roles;
    $_SESSION['loggedin'] = true;

    echo json_encode([
        'success' => 'Login successful.',
        'roles' => $roles,
        'user_id' => $user_id
    ]);
    exit();
}

http_response_code(405);
echo json_encode(['error' => 'Method not allowed.']);
$conn->close();
?>
