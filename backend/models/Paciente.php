<?php
class Paciente
{

    public static function getAll($db)
    {
        return $db->query("SELECT * FROM paciente")->fetchAll(PDO::FETCH_ASSOC);
    }

    public static function create($db, $data)
    {

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
            $data['tipo_documento_id'],
            $data['numero_documento'],
            $data['nombre1'],
            $data['nombre2'],
            $data['apellido1'],
            $data['apellido2'],
            $data['genero_id'],
            $data['departamento_id'],
            $data['municipio_id'],
            $data['correo']
        ]);
    }

    public static function update($db, $id, $data)
    {

        $stmt = $db->prepare("
    UPDATE paciente SET
      nombre1 = ?,
      apellido1 = ?,
      correo = ?
    WHERE id = ?
  ");

        $stmt->execute([
            $data['nombre1'] ?? null,
            $data['apellido1'] ?? null,
            $data['correo'] ?? null,
            $id
        ]);
    }

    public static function delete($db, $id)
    {
        $stmt = $db->prepare("DELETE FROM paciente WHERE id = ?");
        $stmt->execute([$id]);
    }
}