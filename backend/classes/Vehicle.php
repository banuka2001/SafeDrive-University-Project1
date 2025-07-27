<?php
class Vehicle {
    private $number;
    private $front;
    private $back;
    private $side;

    public function __construct($number, $front, $back, $side) {
        $this->number = $number;
        $this->front = $front;
        $this->back = $back;
        $this->side = $side;
    }

    public function getNumber() {
        return $this->number;
    }

    public function handleUploads() {
        $vehicle_upload_dir = '../uploads/customer/';
        if (!is_dir($vehicle_upload_dir)) {
            mkdir($vehicle_upload_dir, 0777, true);
        }
        $uploads = [];
        $files = [
            'vehicle_front_url' => $this->front,
            'vehicle_back_url' => $this->back,
            'vehicle_side_url' => $this->side
        ];
        foreach ($files as $key => $file) {
            if ($file && $file['error'] == UPLOAD_ERR_OK) {
                $file_name = uniqid() . '-' . basename($file['name']);
                $target_path = $vehicle_upload_dir . $file_name;
                if (move_uploaded_file($file['tmp_name'], $target_path)) {
                    $uploads[$key] = $target_path;
                } else {
                    throw new Exception("Failed to upload file for $key.");
                }
            } else {
                throw new Exception("File upload is required for $key.");
            }
        }
        return $uploads;
    }
} 