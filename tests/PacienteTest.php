<?php
use PHPUnit\Framework\TestCase;

class PacienteTest extends TestCase
{

    public function testCorreoValido()
    {
        $this->assertTrue(
            filter_var("test@test.com", FILTER_VALIDATE_EMAIL) !== false
        );
    }
}