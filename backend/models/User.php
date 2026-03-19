<?php

class User
{
    public static function login($db, $email, $password)
    {
        $stmt = $db->prepare("SELECT * FROM users WHERE email = ?");
        $stmt->execute([$email]);

        $user = $stmt->fetch(PDO::FETCH_ASSOC);

        if (!$user)
            return false;

        // 🔥 SOPORTA HASH Y TEXTO PLANO
        if (
            $user['password'] === $password ||
            password_verify($password, $user['password'])
        ) {
            return $user;
        }

        return false;
    }
}