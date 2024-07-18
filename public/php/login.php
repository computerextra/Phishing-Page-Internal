<?php

require("./vendor/autoload.php");

$dotenv = Dotenv\Dotenv::createImmutable(__DIR__);
$dotenv->load();


define(MYSQL_SERVER, $_ENV['MYSQL_SERVER']);
define(MYSQL_USER, $_ENV['MYSQL_USER']);
define(MYSQL_PASSWORD, $_ENV['MYSQL_PASSWORD']);
define(MYSQL_DATABASE, $_ENV['MYSQL_DATABASE']);

$con = new mysqli($servername, $username, $password, $database);
$con->set_charset("utf8mb4");
if ($con->connect_error) {
    die("Connection failed: " . $con->connect_error);
}

$username = $_POST["username"];
$password = $_POST["password"];

if(!isset($username) || !isset($password)){
    echo(json_encode("No Username or Password"));
    die();
}

$query = "INSERT INTO fischer (username, password, count) VALUES('$username', '$password', 1) ON DUPLICATE KEY UPDATE count = count + 1";

if ($conn->query($query) === TRUE) {
    echo(json_encode("ready"));
} else {
    echo(json_encode("error"));
}

$conn->close();
