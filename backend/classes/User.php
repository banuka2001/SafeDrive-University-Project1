<?php
class User {
    protected $conn;
    protected $user_id;
    protected $roles = [];

    public function __construct($conn) {
        $this->conn = $conn;
    }

    public function authenticate($email_phone, $password) {
        $stmt = $this->conn->prepare("SELECT user_id, password FROM users WHERE email_or_phone_number = ?");
        $stmt->bind_param("s", $email_phone);
        $stmt->execute();
        $result = $stmt->get_result();
        if ($result->num_rows === 0) {
            return false;
        }
        $user = $result->fetch_assoc();
        if (!password_verify($password, $user['password'])) {
            return false;
        }
        $this->user_id = $user['user_id'];
        $this->setRoles();
        return true;
    }

    protected function setRoles() {
        $roles = [];
        // Check if user is a customer
        $stmt_customer = $this->conn->prepare("SELECT customer_id FROM customers WHERE user_id = ?");
        $stmt_customer->bind_param("i", $this->user_id);
        $stmt_customer->execute();
        if ($stmt_customer->get_result()->num_rows > 0) {
            $roles[] = 'customer';
        }
        $stmt_customer->close();
        // Check if user is a driver
        $stmt_driver = $this->conn->prepare("SELECT driver_id FROM drivers WHERE user_id = ?");
        $stmt_driver->bind_param("i", $this->user_id);
        $stmt_driver->execute();
        if ($stmt_driver->get_result()->num_rows > 0) {
            $roles[] = 'driver';
        }
        $stmt_driver->close();
        $this->roles = $roles;
    }

    public function getUserId() {
        return $this->user_id;
    }

    public function getRoles() {
        return $this->roles;
    }

    public function isLoggedIn() {
        return isset($_SESSION['loggedin']) && $_SESSION['loggedin'] === true;
    }

    public function loginSession() {
        $_SESSION['user_id'] = $this->user_id;
        $_SESSION['roles'] = $this->roles;
        $_SESSION['loggedin'] = true;
    }

    public function logoutSession() {
        session_unset();
        session_destroy();
    }
}



