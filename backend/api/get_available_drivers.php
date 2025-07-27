<?php
require_once '../db.php';

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

$town = isset($_GET['town']) ? trim($_GET['town']) : '';

try {
    if (empty($town)) {
        http_response_code(400);
        echo json_encode(['error' => 'No town provided.']);
        exit();
    }
    $stmt = $conn->prepare("
        SELECT driver_id as id, first_name, last_name, experience_years, nearest_town as town
        FROM drivers 
        WHERE LOWER(nearest_town) = LOWER(?) AND is_available = 1
        ORDER BY experience_years DESC
    ");
    $stmt->bind_param("s", $town);
    $stmt->execute();
    $result = $stmt->get_result();
    $drivers = $result->fetch_all(MYSQLI_ASSOC);
    $stmt->close();
    if (empty($drivers)) {
        http_response_code(404);
        echo json_encode(['error' => 'No available drivers found for this town.']);
        exit();
    }
    http_response_code(200);
    echo json_encode($drivers);
} catch (Exception $e) {
    http_response_code(500);
    echo json_encode(['error' => 'Server error', 'message' => $e->getMessage()]);
} 