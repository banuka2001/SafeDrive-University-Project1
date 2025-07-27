<?php
require_once __DIR__ . '/Vehicle.php';
require_once __DIR__ . '/Notification.php';
class BookingManager {
    private $conn;
    private $notification;
    public function __construct($conn) {
        $this->conn = $conn;
        $this->notification = new Notification($conn);
    }
    public function scheduleTrip($customer_id, $driver_id, $pickup_location, $destination, $pickup_town, $datetime) {
        if (empty($pickup_location) || empty($pickup_town) || empty($destination) || empty($datetime) || empty($driver_id) || empty($customer_id)) {
            throw new Exception('All fields are required.');
        }
        $stmt = $this->conn->prepare("INSERT INTO trips (customer_id, driver_id, pickup_location, destination, pickup_town, trip_time) VALUES (?, ?, ?, ?, ?, ?)");
        $stmt->bind_param("iissss", $customer_id, $driver_id, $pickup_location, $destination, $pickup_town, $datetime);
        if ($stmt->execute()) {
            return true;
        } else {
            throw new Exception('Failed to schedule trip.');
        }
    }
    public function cancelTrip($trip_id, $customer_id) {
        // Verify the trip belongs to this customer and is approved
        $stmt = $this->conn->prepare("SELECT driver_id, destination FROM trips WHERE id = ? AND customer_id = ? AND status = 'approved'");
        $stmt->bind_param("ii", $trip_id, $customer_id);
        $stmt->execute();
        $result = $stmt->get_result();
        if ($result->num_rows === 0) {
            throw new Exception('Trip not found or not approved.');
        }
        $trip = $result->fetch_assoc();
        $driver_id = $trip['driver_id'];
        $destination = $trip['destination'];
        // Update trip status to cancelled
        $stmt = $this->conn->prepare("UPDATE trips SET status = 'cancelled' WHERE id = ?");
        $stmt->bind_param("i", $trip_id);
        if (!$stmt->execute()) {
            throw new Exception('Failed to cancel trip.');
        }
        // Get driver's user_id to send notification
        $stmt = $this->conn->prepare("SELECT user_id FROM drivers WHERE driver_id = ?");
        $stmt->bind_param("i", $driver_id);
        $stmt->execute();
        $result = $stmt->get_result();
        $driver = $result->fetch_assoc();
        $driver_user_id = $driver['user_id'];
        // Send notification to driver
        $message = "A customer has cancelled their trip to " . htmlspecialchars($destination) . ".";
        $this->notification->createNotification($driver_user_id, $message);
        return true;
    }
} 