import { useState, useEffect } from "react";
import toast from "react-hot-toast";
import { motion, AnimatePresence } from "framer-motion";
import { Loader2, LogIn, Mail, Lock } from "lucide-react";

const text = "Bienvenido";

function Login({ onLogin }) {
  const [showWelcome, setShowWelcome] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [mouse, setMouse] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const timer = setTimeout(() => setShowWelcome(false), 2600);
    return () => clearTimeout(timer);
  }, []);

  // 🔥 FOLLOW MOUSE GLOW
  const handleMouseMove = (e) => {
    setMouse({
      x: e.clientX,
      y: e.clientY,
    });
  };

  const handleLogin = async (e) => {
    e.preventDefault();

    if (!email || !password) {
      toast.error("Completa todos los campos");
      return;
    }

    setLoading(true);

    try {
      const res = await fetch("http://localhost:8000/index.php?login=1", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (!res.ok || data.error) {
        throw new Error(data.error || "Error en login");
      }

      localStorage.setItem("token", "ok");
      toast.success("Bienvenido 🚀");
      onLogin();
    } catch (err) {
      toast.error(err.message || "Error de conexión");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      onMouseMove={handleMouseMove}
      className="min-h-screen flex items-center justify-center bg-[#020617] relative overflow-hidden"
    >
      {/* 🔥 MOUSE GLOW */}
      <div
        className="pointer-events-none absolute w-[400px] h-[400px] rounded-full blur-3xl opacity-20"
        style={{
          background: "radial-gradient(circle, #3FA9F5, transparent)",
          left: mouse.x - 200,
          top: mouse.y - 200,
        }}
      />

      {/* 🔥 BACKGROUND ORBS */}
      <div className="absolute inset-0">
        <div className="absolute w-[500px] h-[500px] bg-[#1B82D1]/20 rounded-full blur-3xl top-[-100px] left-[-100px] animate-pulse"></div>
        <div className="absolute w-[400px] h-[400px] bg-[#3FA9F5]/20 rounded-full blur-3xl bottom-[-100px] right-[-100px] animate-pulse"></div>
      </div>

      <AnimatePresence mode="wait">
        {/* 🔥 BIENVENIDA CON LETRAS */}
        {showWelcome ? (
          <motion.div
            key="welcome"
            initial={{ scale: 1.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ opacity: 0, scale: 0.7, filter: "blur(12px)" }}
            className="z-10 flex flex-col items-center"
          >
            <div className="flex gap-1 text-5xl md:text-6xl font-bold text-white">
              {text.split("").map((letter, i) => (
                <motion.span
                  key={i}
                  initial={{ opacity: 0, y: 40 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{
                    delay: i * 0.05,
                    type: "spring",
                    stiffness: 120,
                  }}
                >
                  {letter}
                </motion.span>
              ))}
            </div>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8 }}
              className="text-slate-400 mt-4"
            >
              Tecnologías Sinergia
            </motion.p>
          </motion.div>
        ) : (
          /* 🔥 LOGIN */
          <motion.div
            key="login"
            initial={{ opacity: 0, y: 80, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="
              relative z-10
              w-full max-w-md
              bg-white/5 backdrop-blur-2xl
              border border-white/10
              rounded-3xl
              p-8
              shadow-[0_30px_80px_rgba(0,0,0,0.8)]
            "
          >
            {/* HEADER */}
            <div className="text-center mb-8">
              <h1 className="text-2xl font-bold text-white">Iniciar sesión</h1>
              <p className="text-slate-400 text-sm">Plataforma Sinergia</p>
            </div>

            <form onSubmit={handleLogin} className="space-y-5">
              {/* EMAIL */}
              <div className="relative group">
                <Mail
                  className="absolute left-3 top-3 text-slate-400 group-focus-within:text-[#3FA9F5]"
                  size={18}
                />
                <input
                  type="email"
                  autoComplete="email"
                  placeholder="Correo electrónico"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="
                    w-full pl-10 pr-4 py-3 rounded-xl
                    bg-white/10 text-white
                    border border-white/10
                    focus:ring-2 focus:ring-[#3FA9F5]
                    focus:shadow-[0_0_20px_rgba(63,169,245,0.4)]
                    outline-none transition-all
                  "
                />
              </div>

              {/* PASSWORD */}
              <div className="relative group">
                <Lock
                  className="absolute left-3 top-3 text-slate-400 group-focus-within:text-[#3FA9F5]"
                  size={18}
                />
                <input
                  type="password"
                  autoComplete="current-password"
                  placeholder="Contraseña"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="
                    w-full pl-10 pr-4 py-3 rounded-xl
                    bg-white/10 text-white
                    border border-white/10
                    focus:ring-2 focus:ring-[#3FA9F5]
                    focus:shadow-[0_0_20px_rgba(63,169,245,0.4)]
                    outline-none transition-all
                  "
                />
              </div>

              {/* BOTÓN PRO */}
              <motion.button
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                disabled={loading}
                className="
                  relative w-full py-3 rounded-xl font-semibold text-white
                  bg-gradient-to-r from-[#0E5DA8] via-[#1B82D1] to-[#3FA9F5]
                  overflow-hidden
                  shadow-lg
                "
              >
                {/* shimmer */}
                <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent translate-x-[-100%] hover:translate-x-[100%] transition duration-700"></span>

                <span className="relative flex items-center justify-center gap-2">
                  {loading ? (
                    <>
                      <Loader2 className="animate-spin" size={18} />
                      Ingresando...
                    </>
                  ) : (
                    <>
                      <LogIn size={18} />
                      Iniciar sesión
                    </>
                  )}
                </span>
              </motion.button>
            </form>

            <p className="text-center text-slate-500 text-xs mt-6">
              © {new Date().getFullYear()} Tecnologías Sinergia
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default Login;
