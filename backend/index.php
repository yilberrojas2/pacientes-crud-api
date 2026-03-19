<?php
header("Content-Type: application/json");

require_once __DIR__ . '/config/database.php';
require_once __DIR__ . '/controllers/PacienteController.php';

$db = Database::connect();
$controller = new PacienteController();

$method = $_SERVER['REQUEST_METHOD'];

if ($method === 'GET') {
    echo json_encode($controller->index($db));
}

if ($method === 'POST') {
    $data = json_decode(file_get_contents("php://input"), true);
    echo json_encode($controller->store($db, $data));
}

if ($method === 'PUT') {
    parse_str($_SERVER['QUERY_STRING'], $params);
    $id = $params['id'];

    $data = json_decode(file_get_contents("php://input"), true);

    echo json_encode($controller->update($db, $id, $data));
}

if ($method === 'DELETE') {
    parse_str($_SERVER['QUERY_STRING'], $params);
    $id = $params['id'];

    echo json_encode($controller->delete($db, $id));
}