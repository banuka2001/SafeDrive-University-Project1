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

// New fields from the form
$first_name = $_POST['firstName'] ?? '';
$last_name = $_POST['lastName'] ?? '';
$email_phone = $_POST['email'] ?? '';
$password = $_POST['password'] ?? '';
$experience_years = $_POST['experienceYears'] ?? 0;

// Handle multiple file uploads
$profile_photo = $_FILES['profilePhoto'] ?? null;
$license_front = $_FILES['licenseFront'] ?? null;
$license_back = $_FILES['licenseBack'] ?? null;

if (empty($first_name) || empty($last_name) || empty($email_phone) || empty($password)) {
    http_response_code(400);
    echo json_encode(['error' => 'All text fields are required.']);
    exit();
}

$hashed_password = password_hash($password, PASSWORD_DEFAULT);

// Handle the multiple file uploads
$upload_dir = '../uploads/driver_profiles/';
if (!is_dir($upload_dir)) {
    mkdir($upload_dir, 0777, true);
}

// Process each file
$uploaded_paths = [];
$files_to_upload = [
    'profile_picture_url' => $profile_photo,
    'license_front_url' => $license_front,
    'license_back_url' => $license_back
];

foreach ($files_to_upload as $key => $file) {
    if ($file && $file['error'] == UPLOAD_ERR_OK) {
        $file_name = uniqid() . '-' . basename($file['name']);
        $target_path = $upload_dir . $file_name;
        if (move_uploaded_file($file['tmp_name'], $target_path)) {
            $uploaded_paths[$key] = $target_path;
        } else {
            throw new Exception("Failed to upload file for $key.");
        }
    } else {
        throw new Exception("File upload is required for $key.");
    }
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

    // Check if driver already exists
    $stmt_driver_check = $conn->prepare("SELECT driver_id FROM drivers WHERE user_id = ?");
    $stmt_driver_check->bind_param("i", $user_id);
    $stmt_driver_check->execute();
    if ($stmt_driver_check->get_result()->num_rows > 0) {
        throw new Exception("Driver profile already exists for this user.");
    }
    $stmt_driver_check->close();

    // Create driver profile (this automatically gives them the 'driver' role)
    $stmt_driver = $conn->prepare(
        "INSERT INTO drivers (user_id, first_name, last_name, experience_years, profile_picture_url, license_front_url, license_back_url) VALUES (?, ?, ?, ?, ?, ?, ?)"
    );
    $stmt_driver->bind_param(
        "ississs",
        $user_id,
        $first_name,
        $last_name,
        $experience_years,
        $uploaded_paths['profile_picture_url'],
        $uploaded_paths['license_front_url'],
        $uploaded_paths['license_back_url']
    );
    $stmt_driver->execute();

    if ($stmt_driver->affected_rows > 0) {
        $conn->commit();
        http_response_code(201);
        echo json_encode(['success' => 'Driver registered successfully.']);
    } else {
        throw new Exception("Failed to create driver profile.");
    }
    $stmt_driver->close();
} catch (Exception $e) {
    $conn->rollback();
    http_response_code(500);
    echo json_encode(['error' => 'Registration failed: ' . $e->getMessage()]);
} finally {
    $conn->close();
    exit();
}
?> 