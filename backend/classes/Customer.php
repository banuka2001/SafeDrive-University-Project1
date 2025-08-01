<?php
require_once __DIR__ . '/User.php';
require_once __DIR__ . '/Vehicle.php';
class Customer extends User {
    private $vehicle;
    public function register($data, $files) {
        $first_name = $data['firstName'] ?? '';
        $last_name = $data['lastName'] ?? '';
        $email_phone = $data['email'] ?? '';
        $password = $data['password'] ?? '';
        $phone = $data['phone'] ?? '';
        $profile_photo = $files['profilePhoto'] ?? null;
        $vehicle_front = $files['vehicleFront'] ?? null;
        $vehicle_back = $files['vehicleBack'] ?? null;
        $vehicle_side = $files['vehicleSide'] ?? null;
        if (empty($first_name) || empty($last_name) || empty($email_phone) || empty($password) || empty($phone)) {
            throw new Exception('All text fields are required.');
        }
        $hashed_password = password_hash($password, PASSWORD_DEFAULT);
        $uploaded_paths = [];
        $profile_upload_dir = '../uploads/customer_profiles/';
        if (!is_dir($profile_upload_dir)) {
            mkdir($profile_upload_dir, 0777, true);
        }
        if ($profile_photo && $profile_photo['error'] == UPLOAD_ERR_OK) {
            $file_name = uniqid() . '-' . basename($profile_photo['name']);
            $target_path = $profile_upload_dir . $file_name;
            if (move_uploaded_file($profile_photo['tmp_name'], $target_path)) {
                $uploaded_paths['profile_picture_url'] = $target_path;
            } else {
                throw new Exception('Failed to upload profile photo.');
            }
        } else {
            throw new Exception('Profile photo is required.');
        }
        $this->vehicle = new Vehicle($data['vehicleNumber'] ?? '', $vehicle_front, $vehicle_back, $vehicle_side);
        $vehicle_uploads = $this->vehicle->handleUploads();
        $uploaded_paths = array_merge($uploaded_paths, $vehicle_uploads);
        $this->conn->begin_transaction();
        try {
            $stmt_check = $this->conn->prepare("SELECT user_id FROM users WHERE email_or_phone_number = ?");
            $stmt_check->bind_param("s", $email_phone);
            $stmt_check->execute();
            $result = $stmt_check->get_result();
            $user_id = null;
            if ($result->num_rows > 0) {
                $user = $result->fetch_assoc();
                $user_id = $user['user_id'];
            } else {
                $stmt_user = $this->conn->prepare("INSERT INTO users (email_or_phone_number, password) VALUES (?, ?)");
                $stmt_user->bind_param("ss", $email_phone, $hashed_password);
                $stmt_user->execute();
                $user_id = $this->conn->insert_id;
                $stmt_user->close();
            }
            $stmt_check->close();
            $stmt_customer_check = $this->conn->prepare("SELECT customer_id FROM customers WHERE user_id = ?");
            $stmt_customer_check->bind_param("i", $user_id);
            $stmt_customer_check->execute();
            if ($stmt_customer_check->get_result()->num_rows > 0) {
                throw new Exception('Customer profile already exists for this user.');
            }
            $stmt_customer_check->close();
            $stmt_customer = $this->conn->prepare("INSERT INTO customers (user_id, first_name, last_name, phone_number, profile_picture_url, vehicle_number, vehicle_front_url, vehicle_back_url, vehicle_side_url) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)");
            $profile_picture_url = $uploaded_paths['profile_picture_url'];
            $vehicle_number = $this->vehicle->getNumber();
            $vehicle_front_url = $uploaded_paths['vehicle_front_url'];
            $vehicle_back_url = $uploaded_paths['vehicle_back_url'];
            $vehicle_side_url = $uploaded_paths['vehicle_side_url'];
            $stmt_customer->bind_param(
                "issssssss",
                $user_id,
                $first_name,
                $last_name,
                $phone,
                $profile_picture_url,
                $vehicle_number,
                $vehicle_front_url,
                $vehicle_back_url,
                $vehicle_side_url
            );
            $stmt_customer->execute();
            if ($stmt_customer->affected_rows > 0) {
                $this->conn->commit();
                return true;
            } else {
                throw new Exception('Failed to create customer profile.');
            }
            $stmt_customer->close();
        } catch (Exception $e) {
            $this->conn->rollback();
            throw $e;
        }
    }
} 