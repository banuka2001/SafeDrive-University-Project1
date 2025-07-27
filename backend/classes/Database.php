<?php
class Database {
    private $servername = "localhost";
    private $username = "root";
    private $password = "root";
    private $dbname = "safedrive";
    private $conn;

    public function __construct() {
        $this->conn = new mysqli(
            $this->servername,
            $this->username,
            $this->password,
            $this->dbname
        );
        if ($this->conn->connect_error) {
            http_response_code(500);
            echo json_encode(['error' => "Connection failed: " . $this->conn->connect_error]);
            exit();
        }
    }

    public function getConnection() {
        return $this->conn;
    }

    public function __destruct() {
        if ($this->conn) {
            $this->conn->close();
        }
    }
} 