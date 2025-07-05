<?php
// This script will completely reset your database.
// Run this file once by navigating to http://localhost/SafeDrive-University-Project1/backend/reset_database.php

echo "<pre>"; // Use <pre> for better formatting

// --- Database Connection ---
// These are the exact same details from your db.php file.
$servername = "localhost";
$username = "root";
$password = "root"; // Using the password that seems to be active
$dbname = "safedrive";

// Create connection
$conn = new mysqli($servername, $username, $password);

// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error . "\n");
}
echo "Successfully connected to MySQL server.\n";

// --- Drop the old database ---
$sql_drop = "DROP DATABASE IF EXISTS `$dbname`";
if ($conn->query($sql_drop) === TRUE) {
    echo "Database `$dbname` dropped successfully (if it existed).\n";
} else {
    die("Error dropping database: " . $conn->error . "\n");
}

// --- Create the new database ---
$sql_create_db = "CREATE DATABASE `$dbname` CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci";
if ($conn->query($sql_create_db) === TRUE) {
    echo "Database `$dbname` created successfully.\n";
} else {
    die("Error creating database: " . $conn->error . "\n");
}

// --- Select the new database ---
$conn->select_db($dbname);
echo "Switched to database `$dbname`.\n";

// --- Create the drivers table ---
$sql_create_table = "
CREATE TABLE `drivers` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `full_name` VARCHAR(255) NOT NULL,
  `email_phone` VARCHAR(255) NOT NULL,
  `password` VARCHAR(255) NOT NULL,
  `registration_date` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE INDEX `email_phone_UNIQUE` (`email_phone` ASC)
);";

if ($conn->query($sql_create_table) === TRUE) {
    echo "Table `drivers` created successfully.\n";
} else {
    die("Error creating table `drivers`: " . $conn->error . "\n");
}

echo "\nDATABASE RESET COMPLETE.\n";
echo "You can now try submitting the driver registration form.\n";
echo "Please delete this file (reset_database.php) when you are done.";

$conn->close();
echo "</pre>";

?> 