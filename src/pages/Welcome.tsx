import { motion } from "framer-motion";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const SUPABASE_URL = "https://yhvxzbrmzjervjhokcao.supabase.co";
const SUPABASE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inlodnh6YnJtemplcnZqaG9rY2FvIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzYwMTY0NDcsImV4cCI6MjA5MTU5MjQ0N30.wSbgfeDgexQEiSVZE2Xc2iQfvxf3emEY37VzQYzO3-o";

const Welcome = () => {
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async () => {
    if (!name.trim()) { setError("Por favor escribe tu nombre"); return; }
    setLoading(true);
    try {
      const device = navigator.userAgent.includes("Mobile") ? "Mobile" : "Desktop";
      await fetch(`${SUPABASE_URL}/rest/v1/visitors`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "apikey": SUPABASE_KEY,
          "Authorization": `Bearer ${SUPABASE_KEY}`,
        },
        body: JSON.stringify({ name: name.trim(), device }),
      });
      navigate("/invite");
    } catch {
      setError("Algo salio mal, intenta de nuevo");
      setLoading(false);
    }
  };

  return (
    <div
      className="min-h-screen relative flex flex-col items-center justify-center px-6 text-center overflow-hidden"
      style={{ background: "linear-gradient(135deg, #0a0a1a 0%, #0d1b2a 50%, #0a0a1a 100%)" }}
    >
      {/* Glow orbs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[
          { color: "rgba(59,130,246,0.15)", top: "-10%", left: "-10%" },
          { color: "rgba(245,197,24,0.1)", bottom: "-10%", right: "-10%" },
          { color: "rgba(99,102,241,0.12)", top: "40%", right: "15%" },
        ].map((orb, i) => (
          <motion.div
            key={i}
            className="absolute w-96 h-96 rounded-full"
            style={{ background: `radial-gradient(circle, ${orb.color} 0%, transparent 70%)`, ...orb } as any}
            animate={{ scale: [1, 1.4, 1], opacity: [0.4, 1, 0.4] }}
            transition={{ duration: 4 + i, repeat: Infinity, ease: "easeInOut" }}
          />
        ))}
      </div>

      {/* Floating particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {["⚽","✨","⭐","💫","🎓","⚽","✨"].map((p, i) => (
          <motion.div
            key={i}
            className="absolute text-lg select-none"
            style={{ left: `${(i * 15 + 5) % 100}%`, top: `${(i * 13 + 5) % 100}%`, opacity: 0.08 }}
            animate={{ y: [-20, -140, -20], opacity: [0.05, 0.15, 0.05], rotate: [0, i % 2 === 0 ? 360 : -360, 0] }}
            transition={{ duration: 5 + i * 0.6, repeat: Infinity, delay: i * 0.5, ease: "easeInOut" }}
          >
            {p}
          </motion.div>
        ))}
      </div>

      <motion.div
        className="relative z-10 max-w-sm w-full space-y-8"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
      >
        <div className="space-y-3">
          <motion.p
            className="text-5xl"
            animate={{ rotate: [0, -10, 10, -10, 0], scale: [1, 1.2, 1] }}
            transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}
          >
            ⚽
          </motion.p>
          <h1 className="font-heading text-3xl font-extrabold text-white">¡Bienvenido!</h1>
          <p className="text-white/50 text-sm">Escribe tu nombre para abrir tu invitacion</p>
        </div>

        <div className="space-y-4">
          <input
            type="text"
            placeholder="Tu nombre..."
            value={name}
            onChange={(e) => { setName(e.target.value); setError(""); }}
            onKeyDown={(e) => e.key === "Enter" && handleSubmit()}
            className="w-full px-6 py-4 rounded-2xl font-heading text-base text-white placeholder-white/30 outline-none"
            style={{ background: "rgba(255,255,255,0.07)", border: "1px solid rgba(255,255,255,0.15)", backdropFilter: "blur(12px)" }}
          />
          {error && <p className="text-red-400 text-xs">{error}</p>}
          <motion.button
            onClick={handleSubmit}
            disabled={loading}
            className="w-full px-8 py-4 rounded-2xl font-heading font-extrabold text-base text-white transition-all duration-300"
            style={{ background: "linear-gradient(135deg, #3b82f6, #1d4ed8)", boxShadow: "0 0 25px rgba(59,130,246,0.4)" }}
            whileHover={{ scale: 1.03, boxShadow: "0 0 45px rgba(59,130,246,0.6)" }}
            whileTap={{ scale: 0.97 }}
          >
            {loading ? "Abriendo..." : "Abrir invitacion →"}
          </motion.button>
        </div>

        <p className="text-white/20 text-xs">Graduacion de Santiago · Junio 2026</p>
      </motion.div>
    </div>
  );
};

export default Welcome;
