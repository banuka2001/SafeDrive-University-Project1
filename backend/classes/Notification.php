<?php
class Notification {
    private $conn;

    public function __construct($conn) {
        $this->conn = $conn;
    }

    public function createNotification($user_id, $message) {
        if (empty($user_id) || empty($message)) {
            throw new Exception('User ID and message are required.');
        }
        if (strlen($message) > 255) {
            throw new Exception('Message must be 255 characters or less.');
        }
        $stmt = $this->conn->prepare("INSERT INTO notifications (user_id, message) VALUES (?, ?)");
        $stmt->bind_param("is", $user_id, $message);
        if (!$stmt->execute()) {
            throw new Exception('Failed to create notification.');
        }
        return $this->conn->insert_id;
    }

    public function getNotificationsByUserId($user_id) {
        if (empty($user_id)) {
            throw new Exception('User ID is required.');
        }
        $stmt = $this->conn->prepare("SELECT * FROM notifications WHERE user_id = ? ORDER BY created_at DESC");
        $stmt->bind_param("i", $user_id);
        $stmt->execute();
        $result = $stmt->get_result();
        $notifications = $result->fetch_all(MYSQLI_ASSOC);
        $stmt->close();
        return $notifications;
    }

    public function markNotificationsAsRead($user_id) {
        if (empty($user_id)) {
            throw new Exception('User ID is required.');
        }
        $stmt = $this->conn->prepare("UPDATE notifications SET is_read = 1 WHERE user_id = ? AND is_read = 0");
        $stmt->bind_param("i", $user_id);
        if (!$stmt->execute()) {
            throw new Exception('Failed to mark notifications as read.');
        }
        return $stmt->affected_rows;
    }

    public function getUnreadCount($user_id) {
        if (empty($user_id)) {
            throw new Exception('User ID is required.');
        }
        $stmt = $this->conn->prepare("SELECT COUNT(*) as count FROM notifications WHERE user_id = ? AND is_read = 0");
        $stmt->bind_param("i", $user_id);
        $stmt->execute();
        $result = $stmt->get_result();
        $count = $result->fetch_assoc()['count'];
        $stmt->close();
        return $count;
    }

    public function deleteNotification($id, $user_id) {
        if (empty($id) || empty($user_id)) {
            throw new Exception('Notification ID and User ID are required.');
        }
        $stmt = $this->conn->prepare("DELETE FROM notifications WHERE id = ? AND user_id = ?");
        $stmt->bind_param("ii", $id, $user_id);
        if (!$stmt->execute()) {
            throw new Exception('Failed to delete notification.');
        }
        return $stmt->affected_rows > 0;
    }
} 