import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import toast from "react-hot-toast";

function PacienteModal({ onClose, onSuccess, paciente }) {
  const [form, setForm] = useState({
    nombre1: "",
    apellido1: "",
    correo: "",
  });

  useEffect(() => {
    if (paciente) {
      setForm(paciente);
    }
  }, [paciente]);

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!form.nombre1 || !form.apellido1 || !form.correo) {
      toast.error("Todos los campos son obligatorios");
      return;
    }

    try {
      const metodo = paciente ? "PUT" : "POST";

      const url = paciente
        ? `http://localhost:8000/index.php?id=${paciente.id}`
        : "http://localhost:8000/index.php";

      const res = await fetch(url, {
        method: metodo,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(form),
      });

      const text = await res.text();

      let data;
      try {
        data = JSON.parse(text);
      } catch {
        throw new Error("Respuesta inválida del servidor");
      }

      // 🔥 MANEJO DE ERRORES BACKEND
      if (data.error) {
        toast.error(data.error);
        return;
      }

      toast.success(
        paciente
          ? "Paciente actualizado correctamente"
          : "Paciente creado correctamente",
      );

      onSuccess();
      onClose();
    } catch (error) {
      console.error(error);
      toast.error(error.message);
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/40 backdrop-blur-sm z-50">
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="bg-white rounded-2xl shadow-2xl w-full max-w-md p-6"
      >
        <h2 className="text-xl font-bold mb-4 text-primary">
          {paciente ? "Editar Paciente" : "Nuevo Paciente"}
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            name="nombre1"
            placeholder="Nombre"
            value={form.nombre1}
            onChange={handleChange}
            className="w-full border p-3 rounded-lg focus:ring-2 focus:ring-primary outline-none"
          />

          <input
            type="text"
            name="apellido1"
            placeholder="Apellido"
            value={form.apellido1}
            onChange={handleChange}
            className="w-full border p-3 rounded-lg focus:ring-2 focus:ring-primary outline-none"
          />

          <input
            type="email"
            name="correo"
            placeholder="Correo"
            value={form.correo}
            onChange={handleChange}
            className="w-full border p-3 rounded-lg focus:ring-2 focus:ring-primary outline-none"
          />

          <div className="flex justify-end gap-3 mt-4">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-lg bg-gray-200 hover:bg-gray-300"
            >
              Cancelar
            </button>

            <button
              type="submit"
              className="px-4 py-2 rounded-lg text-white font-semibold bg-gradient-to-r from-[#0E5DA8] via-[#1B82D1] to-[#3FA9F5] hover:scale-105 transition"
            >
              {paciente ? "Actualizar" : "Guardar"}
            </button>
          </div>
        </form>
      </motion.div>
    </div>
  );
}

export default PacienteModal;
