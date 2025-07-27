<?php
require_once __DIR__ . '/User.php';
class Driver extends User {
    public function register($data, $files) {
        $first_name = $data['firstName'] ?? '';
        $last_name = $data['lastName'] ?? '';
        $email_phone = $data['email'] ?? '';
        $password = $data['password'] ?? '';
        $phone = $data['phone'] ?? '';
        $age = $data['age'] ?? '';
        $experience_years = $data['experienceYears'] ?? 0;
        $nearest_town = $data['nearestTown'] ?? '';
        $profile_photo = $files['profilePhoto'] ?? null;
        $license_front = $files['licenseFront'] ?? null;
        $license_back = $files['licenseBack'] ?? null;
        if (empty($first_name) || empty($last_name) || empty($email_phone) || empty($password) || empty($phone) || empty($age) || empty($experience_years) || empty($nearest_town)) {
            throw new Exception('All text fields are required.');
        }
        $hashed_password = password_hash($password, PASSWORD_DEFAULT);
        $uploaded_paths = [];
        $profile_upload_dir = '../uploads/driver_profiles/';
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
        $license_upload_dir = '../uploads/driver_profiles/';
        if (!is_dir($license_upload_dir)) {
            mkdir($license_upload_dir, 0777, true);
        }
        // License front
        if ($license_front && $license_front['error'] == UPLOAD_ERR_OK) {
            $file_name = uniqid() . '-' . basename($license_front['name']);
            $target_path = $license_upload_dir . $file_name;
            if (move_uploaded_file($license_front['tmp_name'], $target_path)) {
                $uploaded_paths['license_front_url'] = $target_path;
            } else {
                throw new Exception('Failed to upload license front.');
            }
        } else {
            throw new Exception('License front is required.');
        }
        // License back
        if ($license_back && $license_back['error'] == UPLOAD_ERR_OK) {
            $file_name = uniqid() . '-' . basename($license_back['name']);
            $target_path = $license_upload_dir . $file_name;
            if (move_uploaded_file($license_back['tmp_name'], $target_path)) {
                $uploaded_paths['license_back_url'] = $target_path;
            } else {
                throw new Exception('Failed to upload license back.');
            }
        } else {
            throw new Exception('License back is required.');
        }
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
            $stmt_driver_check = $this->conn->prepare("SELECT driver_id FROM drivers WHERE user_id = ?");
            $stmt_driver_check->bind_param("i", $user_id);
            $stmt_driver_check->execute();
            if ($stmt_driver_check->get_result()->num_rows > 0) {
                throw new Exception('Driver profile already exists for this user.');
            }
            $stmt_driver_check->close();
            $stmt_driver = $this->conn->prepare("INSERT INTO drivers (user_id, first_name, last_name, age, experience_years, profile_picture_url, license_front_url, license_back_url, phone_number, nearest_town, is_available) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, 1)");
            $stmt_driver->bind_param(
                "isssisssss",
                $user_id,
                $first_name,
                $last_name,
                $age,
                $experience_years,
                $uploaded_paths['profile_picture_url'],
                $uploaded_paths['license_front_url'],
                $uploaded_paths['license_back_url'],
                $phone,
                $nearest_town
            );
            $stmt_driver->execute();
            if ($stmt_driver->affected_rows > 0) {
                $this->conn->commit();
                return true;
            } else {
                throw new Exception('Failed to create driver profile.');
            }
            $stmt_driver->close();
        } catch (Exception $e) {
            $this->conn->rollback();
            throw $e;
        }
    }
} 