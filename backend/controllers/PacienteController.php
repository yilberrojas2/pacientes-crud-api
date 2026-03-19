<?php
require_once __DIR__ . '/../models/Paciente.php';
class PacienteController
{

    public function index($db)
    {
        return Paciente::getAll($db);
    }

    public function store($db, $data)
    {

        if (empty($data['nombre1']) || empty($data['correo'])) {
            return ["error" => "Campos obligatorios faltantes"];
        }

        if (!filter_var($data['correo'], FILTER_VALIDATE_EMAIL)) {
            return ["error" => "Correo inválido"];
        }

        Paciente::create($db, $data);

        return ["message" => "Paciente creado correctamente"];
    }

    public function update($db, $id, $data)
    {

        if (!filter_var($data['correo'], FILTER_VALIDATE_EMAIL)) {
            return ["error" => "Correo inválido"];
        }

        Paciente::update($db, $id, $data);

        return ["message" => "Paciente actualizado correctamente"];
    }

    public function delete($db, $id)
    {

        $stmt = $db->prepare("SELECT * FROM paciente WHERE id = ?");
        $stmt->execute([$id]);
        $paciente = $stmt->fetch();

        if (!$paciente) {
            return ["error" => "Paciente no existe"];
        }

        Paciente::delete($db, $id);

        return ["message" => "Paciente eliminado correctamente"];
    }
}