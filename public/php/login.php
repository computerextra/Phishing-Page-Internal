<?php
error_reporting(E_ALL);
ini_set('display_errors', 1);

header("Access-Control-Allow-Origin: *");
header('Content-Type: application/json; charset=utf-8');

require("./vendor/autoload.php");

$dotenv = Dotenv\Dotenv::createImmutable(__DIR__);
$dotenv->load();


define("MYSQL_SERVER", $_ENV['MYSQL_SERVER']);
define("MYSQL_USER", $_ENV['MYSQL_USER']);
define("MYSQL_PASSWORD", $_ENV['MYSQL_PASSWORD']);
define("MYSQL_DATABASE", $_ENV['MYSQL_DATABASE']);

$con = new mysqli(MYSQL_SERVER, MYSQL_USER, MYSQL_PASSWORD, MYSQL_DATABASE);
$con->set_charset("utf8mb4");
if ($con->connect_error) {
    echo(json_encode("Connection failed: " . $con->connect_error));
    die();
}

$_POST = json_decode(file_get_contents('php://input'), true);
$username = $_POST["username"];
$password = $_POST["password"];

if(!isset($username) || !isset($password)){
    echo(json_encode("No Username or Password"));
    die();
}

$query = "INSERT INTO fischer (username, password, count) VALUES('$username', '$password', 1) ON DUPLICATE KEY UPDATE count = count + 1, password='$password'";

if ($con->query($query) === TRUE) {
    http_response_code(200);
    echo(json_encode("ready"));
} else {
    echo(json_encode("error"));
}

$con->close();

?>