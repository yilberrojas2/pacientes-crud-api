import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Trash2, Pencil } from "lucide-react";
import PacienteModal from "./components/PacienteModal";
import ConfirmModal from "./components/ConfirmModal";
import toast from "react-hot-toast";

function App() {
  const [pacientes, setPacientes] = useState([]);
  const [loading, setLoading] = useState(true);

  const [showModal, setShowModal] = useState(false);
  const [pacienteSeleccionado, setPacienteSeleccionado] = useState(null);

  const [confirmDelete, setConfirmDelete] = useState(null);

  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [perPage, setPerPage] = useState(5);

  // 🔥 GET
  const obtenerPacientes = async () => {
    try {
      setLoading(true);
      const res = await fetch("http://localhost:8000/backend/index.php");
      const data = await res.json();
      setPacientes(data);
    } catch (error) {
      toast.error("Error cargando pacientes");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    obtenerPacientes();
  }, []);

  // 🔍 BUSCADOR
  const pacientesFiltrados = pacientes.filter((p) =>
    `${p.nombre1} ${p.apellido1} ${p.correo}`
      .toLowerCase()
      .includes(search.toLowerCase()),
  );

  // 📄 PAGINACIÓN
  const totalPages = Math.ceil(pacientesFiltrados.length / perPage);

  const data = pacientesFiltrados.slice((page - 1) * perPage, page * perPage);

  // 🗑️ ELIMINAR
  const eliminarPaciente = async () => {
    try {
      await fetch(
        `http://localhost:8000/backend/index.php?id=${confirmDelete}`,
        { method: "DELETE" },
      );

      toast.success("Paciente eliminado");
      setConfirmDelete(null);
      obtenerPacientes();
    } catch {
      toast.error("Error al eliminar");
    }
  };

  // ✏️ EDITAR
  const editarPaciente = (p) => {
    setPacienteSeleccionado(p);
    setShowModal(true);
  };

  // ➕ NUEVO
  const nuevoPaciente = () => {
    setPacienteSeleccionado(null);
    setShowModal(true);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-100 via-blue-50 to-slate-200 p-6">
      {/* HEADER */}
      <div className="mb-6 flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-slate-800">
            Gestión de Pacientes
          </h1>

          {/* 🔥 CONTADOR */}
          <p className="text-sm text-slate-500 mt-1">
            Total: {pacientes.length} | Mostrando: {data.length}
          </p>
        </div>

        <button
          onClick={nuevoPaciente}
          className="px-6 py-3 rounded-xl text-white font-semibold bg-gradient-to-r from-[#0E5DA8] via-[#1B82D1] to-[#3FA9F5] shadow-lg hover:scale-105 transition"
        >
          + Nuevo Paciente
        </button>
      </div>

      {/* BUSCADOR + SELECTOR */}
      <div className="flex justify-between items-center mb-4 gap-4 flex-wrap">
        <input
          type="text"
          placeholder="Buscar paciente..."
          className="px-4 py-2 rounded-lg border w-full max-w-sm"
          onChange={(e) => {
            setSearch(e.target.value);
            setPage(1);
          }}
        />

        <select
          value={perPage}
          onChange={(e) => {
            setPerPage(Number(e.target.value));
            setPage(1);
          }}
          className="border px-3 py-2 rounded-lg"
        >
          <option value={5}>5</option>
          <option value={10}>10</option>
          <option value={20}>20</option>
        </select>
      </div>

      {/* CARD */}
      <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
        {loading ? (
          // 🔥 SKELETON
          <div className="p-6 space-y-3 animate-pulse">
            {[...Array(5)].map((_, i) => (
              <div key={i} className="h-6 bg-slate-200 rounded"></div>
            ))}
          </div>
        ) : (
          <>
            <table className="w-full text-sm">
              <thead className="bg-slate-50 text-slate-600">
                <tr>
                  <th className="p-4 text-left">Nombre</th>
                  <th className="p-4 text-left">Apellido</th>
                  <th className="p-4 text-left">Correo</th>
                  <th className="p-4 text-right">Acciones</th>
                </tr>
              </thead>

              <tbody className="divide-y">
                {data.map((p) => (
                  <tr key={p.id} className="hover:bg-slate-50">
                    <td className="p-4">{p.nombre1}</td>
                    <td className="p-4">{p.apellido1}</td>
                    <td className="p-4">{p.correo}</td>

                    <td className="p-4 flex justify-end gap-3">
                      <button onClick={() => editarPaciente(p)}>
                        <Pencil className="text-blue-600" />
                      </button>

                      <button onClick={() => setConfirmDelete(p.id)}>
                        <Trash2 className="text-red-600" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            {/* PAGINACIÓN */}
            <div className="flex justify-end gap-2 p-4">
              <button onClick={() => setPage(page - 1)} disabled={page === 1}>
                ←
              </button>

              <span>{page}</span>

              <button
                onClick={() => setPage(page + 1)}
                disabled={page === totalPages}
              >
                →
              </button>
            </div>
          </>
        )}
      </div>

      {/* MODAL FORM */}
      {showModal && (
        <PacienteModal
          pacientes={pacientes}
          paciente={pacienteSeleccionado}
          onClose={() => setShowModal(false)}
          onSuccess={obtenerPacientes}
        />
      )}

      {/* MODAL DELETE */}
      {confirmDelete && (
        <ConfirmModal
          title="Eliminar paciente"
          message="¿Seguro que deseas eliminar este paciente?"
          onConfirm={eliminarPaciente}
          onCancel={() => setConfirmDelete(null)}
        />
      )}
    </div>
  );
}

export default App;
