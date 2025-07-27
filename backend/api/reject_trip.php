<?php
if (isset($_SERVER['HTTP_ORIGIN'])) {
    header("Access-Control-Allow-Origin: " . $_SERVER['HTTP_ORIGIN']);
    header("Access-Control-Allow-Credentials: true");
}
header("Access-Control-Allow-Methods: POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization, X-Requested-With");
header("Content-Type: application/json; charset=UTF-8");

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

ini_set('display_errors', 0);
error_reporting(E_ALL);

set_exception_handler(function ($exception) {
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

include '../db.php';

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

$data = json_decode(file_get_contents('php://input'), true);
$trip_id = $data['id'] ?? null;

if (!$trip_id) {
    http_response_code(400);
    echo json_encode(['error' => 'Trip ID is required.']);
    exit();
}

$stmt = $conn->prepare("UPDATE trips SET status = 'rejected' WHERE id = ?");
$stmt->bind_param("i", $trip_id);

if ($stmt->execute()) {
    $stmt_trip_details = $conn->prepare("
        SELECT c.user_id, t.destination
        FROM trips t
        JOIN customers c ON t.customer_id = c.customer_id
        WHERE t.id = ?
    ");
    $stmt_trip_details->bind_param("i", $trip_id);
    $stmt_trip_details->execute();
    $result = $stmt_trip_details->get_result();
    $trip_info = $result->fetch_assoc();

    if ($trip_info) {
        $user_id = $trip_info['user_id'];
        $destination = $trip_info['destination'];
        $message = "Your trip to " . htmlspecialchars($destination) . " has been rejected.";
        $stmt_notification = $conn->prepare("INSERT INTO notifications (user_id, message) VALUES (?, ?)");
        $stmt_notification->bind_param("is", $user_id, $message);
        $stmt_notification->execute();
    }

    http_response_code(200);
    echo json_encode(['success' => 'Trip rejected successfully.']);
} else {
    http_response_code(500);
    echo json_encode(['error' => 'Failed to reject trip.']);
}

$stmt->close();
$conn->close();
