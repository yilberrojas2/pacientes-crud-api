<?php

use Firebase\JWT\JWT;
use Firebase\JWT\Key;

class JWTHandler
{
    private static $key = "1234567890";

    public static function generate($data)
    {
        $payload = [
            "iss" => "localhost",
            "iat" => time(),
            "exp" => time() + (60 * 60), // 1 hora
            "data" => $data
        ];

        return JWT::encode($payload, self::$key, 'HS256');
    }

    public static function validate($token)
    {
        return JWT::decode($token, new Key(self::$key, 'HS256'));
    }
}