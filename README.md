# 🚀 Sistema de Gestión de Pacientes – Tecnologías Sinergia

Aplicación web fullstack desarrollada para la gestión de pacientes, implementando un enfoque moderno de arquitectura, experiencia de usuario (UX) y diseño visual tipo SaaS.

---

## 🧠 Descripción del proyecto

Este sistema permite administrar pacientes mediante operaciones CRUD, integrando:

- Backend en PHP (API REST)
- Frontend en React + Vite
- Base de datos MySQL (Docker)
- Diseño UI/UX moderno (Tailwind + Framer Motion)

Además, se implementaron mejoras avanzadas en experiencia de usuario como animaciones, feedback visual y estructura escalable.

---

## ⚙️ Tecnologías utilizadas

### 🔹 Frontend

- React
- Vite
- TailwindCSS
- Framer Motion
- Lucide Icons
- React Hot Toast

### 🔹 Backend

- PHP 8+
- API REST
- JWT (en proceso / opcional)
- PDO (conexión a MySQL)

### 🔹 Base de datos

- MySQL (Docker)
- phpMyAdmin

---

## ✨ Funcionalidades implementadas

### 🔐 Autenticación

- Login funcional
- Manejo de sesión con localStorage
- Validación de credenciales desde backend

---

### 👨‍⚕️ Gestión de pacientes

- Crear paciente
- Editar paciente
- Eliminar paciente
- Listado dinámico

---

### 🔎 UX avanzada

- Buscador en tiempo real
- Paginación dinámica
- Contador de pacientes (KPI)
- Loading skeleton

---

### 🎨 UI / Diseño

- Diseño tipo dashboard profesional
- Botones con gradientes y microinteracciones
- Modal elegante para CRUD
- Animaciones fluidas (Framer Motion)

---

### 🚀 Experiencia premium (diferencial)

- Animación de bienvenida tipo Apple
- Transición suave hacia login
- Animación por letras (stagger)
- Glow dinámico con movimiento del mouse
- Efecto shimmer en botones
- Glassmorphism UI

---

## 🗂️ Estructura del proyecto

pacientes-app/
│
├── backend/
│ ├── config/
│ ├── controllers/
│ ├── models/
│ └── index.php
│
├── frontend-react/
│ ├── src/
│ │ ├── components/
│ │ ├── App.jsx
│ │ └── Login.jsx
│ └── package.json
│
└── docker/

---

## 🐳 Configuración con Docker

El proyecto utiliza contenedores para la base de datos.

### 🔹 Conexión actual

```php
$host = "127.0.0.1";
$port = "3307";
$db   = "pacientes_db";
$user = "root";
$pass = "root";

----------------------------------

▶️ Cómo ejecutar el proyecto
1️⃣ Backend
cd backend
php -S localhost:8000

2️⃣ Frontend
cd frontend-react
npm install
npm run dev

3️⃣ Acceso

Frontend: http://localhost:5173

Backend: http://localhost:8000

🔑 Credenciales de prueba
email: admin@admin.com
password: 1234567890

Nota: La contraseña debe estar encriptada con password_hash en la base de datos.

👨‍💻 Autor

Desarrollado por:

Yilber Rojas Garrido
Ingeniero de Software | Fullstack Developer
```
