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
header("Access-Control-Allow-Methods: GET, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization, X-Requested-With");
header("Content-Type: application/json; charset=UTF-8");

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

include '../db.php';

$town = isset($_GET['town']) ? $_GET['town'] : '';

if (empty($town)) {
    echo json_encode([]);
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
$conn->close();

echo json_encode($drivers);
?> 