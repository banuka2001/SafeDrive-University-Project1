<?php
class TripManager {
    private $conn;
    public function __construct($conn) {
        $this->conn = $conn;
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
} 