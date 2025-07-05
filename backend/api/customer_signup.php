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

// Enable error reporting
ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);

// Custom error handler
set_error_handler(function($severity, $message, $file, $line) {
    if (!(error_reporting() & $severity)) return;
    throw new ErrorException($message, 0, $severity, $file, $line);
});

// Exception handler
set_exception_handler(function($exception) {
    http_response_code(500);
    echo json_encode([
        'error' => 'Server error',
        'message' => $exception->getMessage()
    ]);
    exit();
});

include '../db.php';

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

$response = array();

$first_name = $_POST['firstName'] ?? '';
$last_name = $_POST['lastName'] ?? '';
$email_phone = $_POST['email'] ?? '';
$password = $_POST['password'] ?? '';
$profile_photo = $_FILES['profilePhoto'] ?? null;

if (empty($first_name) || empty($last_name) || empty($email_phone) || empty($password)) {
    http_response_code(400);
    echo json_encode(['error' => 'All text fields are required.']);
    exit();
}

$hashed_password = password_hash($password, PASSWORD_DEFAULT);
$uploaded_path = '';

// Handle the single file upload
$upload_dir = '../uploads/customer_profiles/';
if (!is_dir($upload_dir)) {
    mkdir($upload_dir, 0777, true);
}

if ($profile_photo && $profile_photo['error'] == UPLOAD_ERR_OK) {
    $file_name = uniqid() . '-' . basename($profile_photo['name']);
    $target_path = $upload_dir . $file_name;
    if (move_uploaded_file($profile_photo['tmp_name'], $target_path)) {
        $uploaded_path = $target_path;
    } else {
        throw new Exception("Failed to upload profile photo.");
    }
} else {
    throw new Exception("Profile photo is required.");
}

$conn->begin_transaction();

try {
    // Check if user already exists
    $stmt_check = $conn->prepare("SELECT user_id FROM users WHERE email_or_phone_number = ?");
    $stmt_check->bind_param("s", $email_phone);
    $stmt_check->execute();
    $result = $stmt_check->get_result();
    $user_id = null;

    if ($result->num_rows > 0) {
        $user = $result->fetch_assoc();
        $user_id = $user['user_id'];
    } else {
        $stmt_user = $conn->prepare("INSERT INTO users (email_or_phone_number, password) VALUES (?, ?)");
        $stmt_user->bind_param("ss", $email_phone, $hashed_password);
        $stmt_user->execute();
        $user_id = $conn->insert_id;
        $stmt_user->close();
    }
    $stmt_check->close();

    // Check if customer already exists
    $stmt_customer_check = $conn->prepare("SELECT customer_id FROM customers WHERE user_id = ?");
    $stmt_customer_check->bind_param("i", $user_id);
    $stmt_customer_check->execute();
    if ($stmt_customer_check->get_result()->num_rows > 0) {
        throw new Exception("Customer profile already exists for this user.");
    }
    $stmt_customer_check->close();

    // Create customer profile (this automatically gives them the 'customer' role)
    $stmt_customer = $conn->prepare("INSERT INTO customers (user_id, first_name, last_name, profile_picture_url) VALUES (?, ?, ?, ?)");
    $stmt_customer->bind_param("isss", $user_id, $first_name, $last_name, $uploaded_path);
    $stmt_customer->execute();

    if ($stmt_customer->affected_rows > 0) {
        $conn->commit();
        http_response_code(201);
        echo json_encode(['success' => 'Customer registered successfully.']);
    } else {
        throw new Exception("Failed to create customer profile.");
    }
    $stmt_customer->close();

} catch (Exception $e) {
    $conn->rollback();
    http_response_code(500);
    echo json_encode(['error' => 'Registration failed: ' . $e->getMessage()]);
} finally {
    $conn->close();
    exit();
}
?> 