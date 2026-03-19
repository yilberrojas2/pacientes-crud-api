<?php
class Database
{
    public static function connect()
    {
        return new PDO("mysql:host=db;dbname=pacientes_db", "root", "root");
    }
}