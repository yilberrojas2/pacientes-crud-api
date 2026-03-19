<?php
class Paciente
{
    public static function getAll($db)
    {
        return $db->query("SELECT * FROM paciente")->fetchAll(PDO::FETCH_ASSOC);
    }

    public static function create($db, $data)
    {
        // 🔥 VALIDAR DUPLICADO POR CORREO
        $check = $db->prepare("SELECT COUNT(*) FROM paciente WHERE correo = ?");
        $check->execute([$data['correo']]);

        if ($check->fetchColumn() > 0) {
            echo json_encode(["error" => "El correo ya está registrado"]);
            exit;
        }

        $stmt = $db->prepare("
            INSERT INTO paciente (
                tipo_documento_id,
                numero_documento,
                nombre1,
                nombre2,
                apellido1,
                apellido2,
                genero_id,
                departamento_id,
                municipio_id,
                correo
            ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
        ");

        $stmt->execute([
            $data['tipo_documento_id'] ?? 1,
            $data['numero_documento'] ?? '000',
            $data['nombre1'],
            $data['nombre2'] ?? null,
            $data['apellido1'],
            $data['apellido2'] ?? null,
            $data['genero_id'] ?? 1,
            $data['departamento_id'] ?? 1,
            $data['municipio_id'] ?? 1,
            $data['correo']
        ]);

        echo json_encode(["message" => "Paciente creado"]);
    }

    public static function update($db, $id, $data)
    {
        // 🔥 VALIDAR DUPLICADO EN UPDATE
        $check = $db->prepare("SELECT COUNT(*) FROM paciente WHERE correo = ? AND id != ?");
        $check->execute([$data['correo'], $id]);

        if ($check->fetchColumn() > 0) {
            echo json_encode(["error" => "El correo ya está registrado"]);
            exit;
        }

        $stmt = $db->prepare("
            UPDATE paciente SET
                nombre1 = ?,
                apellido1 = ?,
                correo = ?
            WHERE id = ?
        ");

        $stmt->execute([
            $data['nombre1'],
            $data['apellido1'],
            $data['correo'],
            $id
        ]);

        echo json_encode(["message" => "Paciente actualizado"]);
    }

    public static function delete($db, $id)
    {
        $stmt = $db->prepare("DELETE FROM paciente WHERE id = ?");
        $stmt->execute([$id]);

        echo json_encode(["message" => "Paciente eliminado"]);
    }
}