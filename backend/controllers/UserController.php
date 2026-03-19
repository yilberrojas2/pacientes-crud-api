<?php
require_once __DIR__ . '/../models/User.php';

class UserController
{
    public function login($db, $data)
    {
        if (!isset($data['email']) || !isset($data['password'])) {
            return ["error" => "Datos incompletos"];
        }

        $user = User::login($db, $data['email'], $data['password']);

        if (!$user) {
            return ["error" => "Credenciales inválidas"];
        }

        // 🔥 SIN JWT (para que funcione ya)
        return [
            "message" => "Login exitoso",
            "user" => [
                "id" => $user['id'],
                "email" => $user['email']
            ]
        ];
    }
}