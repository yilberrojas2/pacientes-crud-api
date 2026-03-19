<?php
require_once __DIR__ . '/../vendor/autoload.php';
ob_start();

ini_set('display_errors', 1);
error_reporting(E_ALL);

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Content-Type, Authorization");
header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS");
header("Content-Type: application/json");

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

function response($data, $status = 200)
{
    http_response_code($status);
    ob_clean();
    echo json_encode($data);
    exit();
}

require_once __DIR__ . '/config/database.php';
require_once __DIR__ . '/controllers/PacienteController.php';
require_once __DIR__ . '/controllers/UserController.php';
require_once __DIR__ . '/config/jwt.php'; // ACTIVADO TEMPORAL

function getToken()
{
    $headers = getallheaders();
    return $headers['Authorization'] ?? null;
}

try {

    $db = Database::connect();
    $method = $_SERVER['REQUEST_METHOD'];

    // 🔓 LOGIN
    if ($method === 'POST' && isset($_GET['login'])) {
        $input = json_decode(file_get_contents("php://input"), true);
        $controller = new UserController();
        response($controller->login($db, $input));
    }

    // 🔥 SIN JWT POR AHORA (para que TODO funcione)
    $controller = new PacienteController();

    if ($method === 'GET') {
        response($controller->index($db));
    }

    if ($method === 'POST') {
        $input = json_decode(file_get_contents("php://input"), true);
        response($controller->store($db, $input));
    }

    if ($method === 'PUT') {
        parse_str($_SERVER['QUERY_STRING'], $params);
        response($controller->update($db, $params['id'], json_decode(file_get_contents("php://input"), true)));
    }

    if ($method === 'DELETE') {
        parse_str($_SERVER['QUERY_STRING'], $params);
        response($controller->delete($db, $params['id']));
    }

    response(["error" => "Método no permitido"], 405);

} catch (Exception $e) {
    response([
        "error" => "Error interno",
        "detalle" => $e->getMessage()
    ], 500);
}