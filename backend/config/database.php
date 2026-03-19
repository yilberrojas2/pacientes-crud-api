<?php

class Database
{
    public static function connect()
    {
        $host = "127.0.0.1"; // ✅ CORRECTO
        $port = "3307";      // ✅ CLAVE
        $db = "pacientes_db";
        $user = "root";
        $pass = "root";

        try {
            $pdo = new PDO(
                "mysql:host=$host;port=$port;dbname=$db;charset=utf8",
                $user,
                $pass
            );

            $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

            return $pdo;

        } catch (PDOException $e) {
            die(json_encode([
                "error" => "Error conexión DB",
                "detalle" => $e->getMessage()
            ]));
        }
    }
}