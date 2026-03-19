import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Plus, LogOut } from "lucide-react";
import { Trash2, Pencil, Users, Search } from "lucide-react";
import PacienteModal from "./components/PacienteModal";
import toast from "react-hot-toast";
import Login from "./components/Login";

function App() {
  const [pacientes, setPacientes] = useState([]);
  const [loading, setLoading] = useState(true);

  const [showModal, setShowModal] = useState(false);
  const [pacienteSeleccionado, setPacienteSeleccionado] = useState(null);
  const [confirmDelete, setConfirmDelete] = useState(null);

  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [perPage, setPerPage] = useState(5);

  // 🔐 AUTH
  const [isAuth, setIsAuth] = useState(!!localStorage.getItem("token"));

  // 🔥 FETCH
  const obtenerPacientes = async () => {
    setLoading(true);
    try {
      const res = await fetch("http://localhost:8000/index.php");
      const data = await res.json();

      // 🔥 PROTECCIÓN (evita crash si backend falla)
      if (Array.isArray(data)) {
        setPacientes(data);
      } else {
        setPacientes([]);
      }
    } catch {
      toast.error("Error al cargar pacientes");
    } finally {
      setLoading(false);
    }
  };

  // 🔥 EFECTO
  useEffect(() => {
    if (isAuth) {
      obtenerPacientes();
    }
  }, [isAuth]);

  // 🔥 LOGIN VIEW
  if (!isAuth) {
    return (
      <Login
        onLogin={() => {
          localStorage.setItem("token", "ok");
          setIsAuth(true);
        }}
      />
    );
  }

  // 🔍 FILTRO
  const pacientesFiltrados = pacientes.filter((p) =>
    `${p.nombre1} ${p.apellido1} ${p.correo}`
      .toLowerCase()
      .includes(search.toLowerCase()),
  );

  // 📄 PAGINACIÓN
  const totalPages = Math.ceil(pacientesFiltrados.length / perPage);

  const data = pacientesFiltrados.slice((page - 1) * perPage, page * perPage);

  // 🗑️ ELIMINAR
  const eliminarPaciente = async (id) => {
    try {
      await fetch(`http://localhost:8000/index.php?id=${id}`, {
        method: "DELETE",
      });

      toast.success("Paciente eliminado");
      obtenerPacientes(); // 🔥 refresca automáticamente
    } catch {
      toast.error("Error al eliminar");
    }
  };

  // ✏️ EDITAR
  const editarPaciente = (paciente) => {
    setPacienteSeleccionado(paciente);
    setShowModal(true);
  };

  // ➕ NUEVO
  const nuevoPaciente = () => {
    setPacienteSeleccionado(null);
    setShowModal(true);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-100 via-blue-50 to-slate-200 p-6">
      {/* 🔥 HEADER */}
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="mb-8 flex flex-col md:flex-row justify-between items-center gap-4"
      >
        <div>
          <h1 className="text-3xl font-bold text-slate-800">
            Gestión de Pacientes
          </h1>
          <p className="text-slate-500 text-sm">Panel administrativo</p>
        </div>

        <div className="flex items-center gap-4 flex-wrap">
          {/* KPI */}
          <div
            className="
    bg-white/80 backdrop-blur-md
    border border-slate-200
    shadow-sm hover:shadow-md
    rounded-2xl px-6 py-3
    flex items-center gap-4
    transition-all duration-200
  "
          >
            <div
              className="
      bg-gradient-to-br from-blue-100 to-blue-200
      p-2.5 rounded-xl
      shadow-inner
    "
            >
              <Users className="text-blue-600" size={20} />
            </div>

            <div>
              <p className="text-xs text-slate-500 tracking-wide">Pacientes</p>
              <p className="text-xl font-bold text-slate-800 leading-none">
                {pacientes.length}
              </p>
            </div>
          </div>

          {/* ➕ NUEVO PACIENTE */}
          <motion.button
            onClick={nuevoPaciente}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.97 }}
            className="
      flex items-center gap-2
      px-6 py-3 rounded-2xl
      text-white font-semibold text-sm
      bg-gradient-to-r from-[#0E5DA8] via-[#1B82D1] to-[#3FA9F5]
      shadow-md hover:shadow-xl
      transition-all duration-200
    "
          >
            <Plus size={18} />
            Nuevo Paciente
          </motion.button>

          {/* 🚪 LOGOUT */}
          <motion.button
            onClick={() => {
              localStorage.removeItem("token");
              window.location.reload();
            }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.97 }}
            className="
      flex items-center gap-2
      px-6 py-3 rounded-2xl
      text-white font-semibold text-sm
      bg-gradient-to-r from-red-500 to-red-600
      shadow-md hover:shadow-xl
      transition-all duration-200
    "
          >
            <LogOut size={18} />
            Salir
          </motion.button>
        </div>
      </motion.div>

      {/* 🔍 BUSCADOR */}
      <div className="flex justify-between items-center mb-4 gap-4 flex-wrap">
        <div className="relative w-full max-w-sm">
          <Search className="absolute left-3 top-3 text-slate-400" size={18} />
          <input
            type="text"
            placeholder="Buscar paciente..."
            className="
              pl-10 pr-4 py-3 rounded-xl border w-full
              focus:ring-2 focus:ring-blue-500
              transition
              outline-none
            "
            onChange={(e) => {
              setSearch(e.target.value);
              setPage(1);
            }}
          />
        </div>

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

      {/* 🔥 TABLA */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="bg-white rounded-2xl shadow-md overflow-hidden"
      >
        <table className="w-full text-sm">
          <thead className="bg-slate-50 text-slate-600">
            <tr>
              <th className="p-4 text-left">Nombre</th>
              <th className="p-4 text-left">Apellido</th>
              <th className="p-4 text-left">Correo</th>
              <th className="p-4 text-right">Acciones</th>
            </tr>
          </thead>

          <tbody className="divide-y divide-slate-100">
            {loading
              ? [...Array(5)].map((_, i) => (
                  <tr key={i}>
                    <td className="p-4">
                      <div className="h-4 bg-slate-200 rounded w-24 animate-pulse"></div>
                    </td>
                    <td className="p-4">
                      <div className="h-4 bg-slate-200 rounded w-24 animate-pulse"></div>
                    </td>
                    <td className="p-4">
                      <div className="h-4 bg-slate-200 rounded w-32 animate-pulse"></div>
                    </td>
                  </tr>
                ))
              : data.map((p) => (
                  <tr key={p.id} className="hover:bg-slate-50 transition">
                    <td className="p-4 font-medium">{p.nombre1}</td>
                    <td className="p-4">{p.apellido1}</td>
                    <td className="p-4">{p.correo}</td>

                    <td className="p-4 flex justify-end gap-3">
                      <button
                        onClick={() => editarPaciente(p)}
                        className="p-2 rounded-lg hover:bg-blue-100 transition"
                      >
                        <Pencil size={18} className="text-blue-600" />
                      </button>

                      <button
                        onClick={() => setConfirmDelete(p)}
                        className="p-2 rounded-lg hover:bg-red-100 transition"
                      >
                        <Trash2 size={18} className="text-red-600" />
                      </button>
                    </td>
                  </tr>
                ))}
          </tbody>
        </table>

        {/* PAGINACIÓN */}
        <div className="flex justify-between items-center p-4">
          <span className="text-sm text-slate-500">
            Mostrando {data.length} de {pacientesFiltrados.length}
          </span>

          <div className="flex gap-2">
            <button
              onClick={() => setPage(page - 1)}
              disabled={page === 1}
              className="px-3 py-1 bg-slate-200 rounded disabled:opacity-50"
            >
              ←
            </button>

            <span className="text-sm font-medium">
              {page} / {totalPages || 1}
            </span>

            <button
              onClick={() => setPage(page + 1)}
              disabled={page === totalPages || totalPages === 0}
              className="px-3 py-1 bg-slate-200 rounded disabled:opacity-50"
            >
              →
            </button>
          </div>
        </div>
      </motion.div>

      {/* MODAL */}
      {showModal && (
        <PacienteModal
          pacientes={pacientes}
          paciente={pacienteSeleccionado}
          onClose={() => setShowModal(false)}
          onSuccess={obtenerPacientes}
        />
      )}

      {confirmDelete && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="bg-white rounded-2xl p-6 w-full max-w-sm shadow-2xl"
          >
            <h2 className="text-lg font-bold text-slate-800 mb-2">
              Eliminar paciente
            </h2>

            <p className="text-sm text-slate-500 mb-4">
              ¿Seguro que deseas eliminar a{" "}
              <span className="font-semibold text-slate-700">
                {confirmDelete.nombre1}
              </span>
              ?
            </p>

            <div className="flex justify-end gap-3">
              <button
                onClick={() => setConfirmDelete(null)}
                className="px-4 py-2 rounded-lg bg-gray-200 hover:bg-gray-300"
              >
                Cancelar
              </button>

              <button
                onClick={async () => {
                  await eliminarPaciente(confirmDelete.id);
                  setConfirmDelete(null);
                }}
                className="px-4 py-2 rounded-lg bg-red-600 text-white hover:scale-105 transition"
              >
                Eliminar
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
}

export default App;
