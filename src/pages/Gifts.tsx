import { motion, AnimatePresence } from "framer-motion";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";

const PASS2U_LINK = "https://www.pass2u.net/p/FPkLMTlCfhc2?openExternalBrowser=1";

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.15, duration: 0.5, ease: "easeOut" as const },
  }),
};

const giftCards = ["🎮 Roblox", "🔍 Google", "🍔 In-N-Out", "🎯 Target", "💳 Visa"];

const GlowOrbs = () => (
  <div className="absolute inset-0 overflow-hidden pointer-events-none">
    {[
      { color: "rgba(245,197,24,0.12)", top: "-10%", left: "-10%" },
      { color: "rgba(99,102,241,0.12)", bottom: "-10%", right: "-10%" },
      { color: "rgba(34,197,94,0.08)", top: "40%", right: "15%" },
    ].map((orb, i) => (
      <motion.div
        key={i}
        className="absolute w-80 h-80 rounded-full"
        style={{ background: `radial-gradient(circle, ${orb.color} 0%, transparent 70%)`, ...orb } as any}
        animate={{ scale: [1, 1.4, 1], opacity: [0.5, 1, 0.5] }}
        transition={{ duration: 4 + i, repeat: Infinity, ease: "easeInOut" }}
      />
    ))}
  </div>
);

const FloatingIcons = () => {
  const icons = ["⚽", "🎁", "🏆", "🎣", "⭐", "✨", "💫", "🎓", "⚽", "🎁"];
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {icons.map((icon, i) => (
        <motion.div
          key={i}
          className="absolute text-xl select-none"
          style={{ left: `${(i * 10 + 5) % 100}%`, top: `${(i * 13 + 5) % 100}%` }}
          animate={{ y: [-15, -100, -15], opacity: [0.05, 0.12, 0.05], rotate: [0, i % 2 === 0 ? 180 : -180, 0] }}
          transition={{ duration: 5 + i * 0.5, repeat: Infinity, delay: i * 0.4, ease: "easeInOut" }}
        >
          {icon}
        </motion.div>
      ))}
    </div>
  );
};

const Gifts = () => {
  const [selectedCards, setSelectedCards] = useState<string[]>([]);
  const [selectedSections, setSelectedSections] = useState<string[]>([]);
  const navigate = useNavigate();

  const hasSelection = selectedCards.length > 0 || selectedSections.length > 0;

  const toggleCard = (card: string) => {
    setSelectedCards(prev =>
      prev.includes(card) ? prev.filter(c => c !== card) : [...prev, card]
    );
  };

  const toggleSection = (title: string) => {
    setSelectedSections(prev =>
      prev.includes(title) ? prev.filter(s => s !== title) : [...prev, title]
    );
  };

  return (
    <div className="min-h-screen relative flex items-center justify-center px-6 py-16" style={{ background: "linear-gradient(135deg, #0a0a1a 0%, #0d1b2a 50%, #0a0a1a 100%)" }}>
      <GlowOrbs />
      <FloatingIcons />
      <motion.div className="relative z-10 max-w-lg w-full space-y-6 py-8" initial="hidden" animate="visible">

        {/* Header */}
        <motion.div className="text-center space-y-2" variants={fadeUp} custom={0}>
          <motion.p className="text-4xl mb-2" animate={{ rotate: [0, -10, 10, -10, 0], scale: [1, 1.2, 1] }} transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}>
            🎁
          </motion.p>
          <h1 className="font-heading text-3xl font-bold text-white">Ideas de Regalo</h1>
          <p className="text-white/40 text-sm">No es obligatorio, pero si quieres traer algo, aqui van algunas ideas</p>
          <p className="text-sm font-semibold" style={{ color: "rgba(245,197,24,0.8)" }}>Por favor selecciona una opcion</p>
        </motion.div>

        {/* Gift Cards */}
        <motion.div
          className="rounded-2xl p-6 space-y-4"
          style={{
            background: selectedSections.includes("giftcards") ? "rgba(245,197,24,0.12)" : "rgba(255,255,255,0.04)",
            border: selectedSections.includes("giftcards") ? "2px solid rgba(245,197,24,0.6)" : "1px solid rgba(255,255,255,0.1)",
            backdropFilter: "blur(12px)",
            cursor: "pointer",
            transition: "all 0.3s",
          }}
          variants={fadeUp}
          custom={1}
          onClick={() => toggleSection("giftcards")}
          whileHover={{ scale: 1.02 } as any}
        >
          <div className="flex items-center gap-4">
            <span className="text-3xl flex-shrink-0 w-14 h-14 flex items-center justify-center rounded-xl" style={{ background: "rgba(245,197,24,0.1)", border: "1px solid rgba(245,197,24,0.2)" }}>
              🎫
            </span>
            <div className="flex-1">
              <h3 className="font-heading font-bold text-lg text-white">Tarjetas de regalo</h3>
              <p className="text-sm text-white/50">Toca para seleccionar — toca una tarjeta para elegir</p>
            </div>
            {selectedSections.includes("giftcards") && <span className="text-2xl">✅</span>}
          </div>
          <div className="flex flex-wrap gap-2">
            {giftCards.map((card) => (
              <button
                key={card}
                onClick={(e) => { e.stopPropagation(); toggleCard(card); }}
                className="px-3 py-1 rounded-full text-xs font-heading font-semibold transition-all duration-200"
                style={{
                  background: selectedCards.includes(card) ? "rgba(245,197,24,0.4)" : "rgba(245,197,24,0.1)",
                  color: selectedCards.includes(card) ? "#fff" : "rgba(245,197,24,0.8)",
                  border: selectedCards.includes(card) ? "1px solid rgba(245,197,24,0.8)" : "1px solid rgba(245,197,24,0.25)",
                  transform: selectedCards.includes(card) ? "scale(1.05)" : "scale(1)",
                }}
              >
                {selectedCards.includes(card) ? "✓ " : ""}{card}
              </button>
            ))}
          </div>
        </motion.div>

        {/* Jerseys */}
        <motion.div variants={fadeUp} custom={2}>
          <div
            className="rounded-2xl p-6 space-y-4"
            style={{
              background: selectedSections.includes("jerseys") ? "rgba(245,197,24,0.12)" : "rgba(255,255,255,0.04)",
              border: selectedSections.includes("jerseys") ? "2px solid rgba(245,197,24,0.6)" : "1px solid rgba(255,255,255,0.1)",
              backdropFilter: "blur(12px)",
              cursor: "pointer",
              transition: "all 0.3s",
            }}
            onClick={() => toggleSection("jerseys")}
          >
            <div className="flex items-center gap-4">
              <span className="text-3xl flex-shrink-0 w-14 h-14 flex items-center justify-center rounded-xl" style={{ background: "rgba(245,197,24,0.1)", border: "1px solid rgba(245,197,24,0.2)" }}>
                👕
              </span>
              <div className="flex-1">
                <h3 className="font-heading font-bold text-lg text-white">Jerseys de futbol</h3>
                <p className="text-sm text-white/50">Toca para seleccionar</p>
              </div>
              {selectedSections.includes("jerseys") && <span className="text-2xl">✅</span>}
            </div>
            <div className="flex flex-wrap gap-2">
              {["Barcelona", "Pumas", "Argentina", "Espana", "Mexico", "Brasil", "Francia"].map((tag) => (
                <span key={tag} className="px-3 py-1 rounded-full text-xs font-heading font-semibold" style={{ background: "rgba(245,197,24,0.1)", color: "rgba(245,197,24,0.8)", border: "1px solid rgba(245,197,24,0.25)" }}>
                  {tag}
                </span>
              ))}
            </div>
            <Link
              to="/shop/jerseys"
              onClick={(e) => e.stopPropagation()}
              className="inline-block text-xs font-semibold"
              style={{ color: "rgba(99,102,241,0.8)", textDecoration: "underline" }}
            >
              Ver opciones de jerseys →
            </Link>
          </div>
        </motion.div>

        {/* Fishing */}
        <motion.div variants={fadeUp} custom={3}>
          <div
            className="rounded-2xl p-6 space-y-4"
            style={{
              background: selectedSections.includes("fishing") ? "rgba(245,197,24,0.12)" : "rgba(255,255,255,0.04)",
              border: selectedSections.includes("fishing") ? "2px solid rgba(245,197,24,0.6)" : "1px solid rgba(255,255,255,0.1)",
              backdropFilter: "blur(12px)",
              cursor: "pointer",
              transition: "all 0.3s",
            }}
            onClick={() => toggleSection("fishing")}
          >
            <div className="flex items-center gap-4">
              <span className="text-3xl flex-shrink-0 w-14 h-14 flex items-center justify-center rounded-xl" style={{ background: "rgba(245,197,24,0.1)", border: "1px solid rgba(245,197,24,0.2)" }}>
                🎣
              </span>
              <div className="flex-1">
                <h3 className="font-heading font-bold text-lg text-white">Equipo de pesca</h3>
                <p className="text-sm text-white/50">Toca para seleccionar</p>
              </div>
              {selectedSections.includes("fishing") && <span className="text-2xl">✅</span>}
            </div>
            <div className="flex flex-wrap gap-2">
              {["Anzuelos", "Canas de pescar", "Caja de pesca", "Carnadas", "Chaleco de pesca"].map((tag) => (
                <span key={tag} className="px-3 py-1 rounded-full text-xs font-heading font-semibold" style={{ background: "rgba(245,197,24,0.1)", color: "rgba(245,197,24,0.8)", border: "1px solid rgba(245,197,24,0.25)" }}>
                  {tag}
                </span>
              ))}
            </div>
            <Link
              to="/shop/fishing"
              onClick={(e) => e.stopPropagation()}
              className="inline-block text-xs font-semibold"
              style={{ color: "rgba(99,102,241,0.8)", textDecoration: "underline" }}
            >
              Ver opciones de pesca →
            </Link>
          </div>
        </motion.div>

        {/* Dinero */}
        <motion.div
          className="rounded-2xl p-6"
          style={{
            background: selectedSections.includes("dinero") ? "rgba(245,197,24,0.12)" : "rgba(255,255,255,0.04)",
            border: selectedSections.includes("dinero") ? "2px solid rgba(245,197,24,0.6)" : "1px solid rgba(255,255,255,0.1)",
            backdropFilter: "blur(12px)",
            cursor: "pointer",
            transition: "all 0.3s",
          }}
          variants={fadeUp}
          custom={4}
          onClick={() => toggleSection("dinero")}
          whileHover={{ scale: 1.01 } as any}
        >
          <div className="flex items-center gap-4">
            <span className="text-3xl flex-shrink-0 w-14 h-14 flex items-center justify-center rounded-xl" style={{ background: "rgba(245,197,24,0.1)", border: "1px solid rgba(245,197,24,0.2)" }}>
              💵
            </span>
            <div className="flex-1">
              <h3 className="font-heading font-bold text-lg text-white">Dinero</h3>
              <p className="text-sm text-white/50">Siempre es bienvenido para lo que Santiago necesite.</p>
            </div>
            {selectedSections.includes("dinero") && <span className="text-2xl">✅</span>}
          </div>
        </motion.div>

        {/* Continuar Button */}
        <AnimatePresence>
          {hasSelection && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              transition={{ duration: 0.4 }}
            >
              <button
                onClick={() => navigate("/pass")}
                className="w-full py-4 rounded-2xl font-heading font-bold text-lg"
                style={{
                  background: "linear-gradient(135deg, #ffed02, #f5c518)",
                  color: "#0a0a1a",
                  boxShadow: "0 0 30px rgba(255,237,2,0.4)",
                }}
              >
                Continuar →
              </button>
            </motion.div>
          )}
        </AnimatePresence>

        <motion.div className="text-center pt-2" variants={fadeUp} custom={5}>
          <Link to="/" className="inline-block px-8 py-4 rounded-full font-heading font-semibold text-sm transition-all duration-300 hover:bg-white/10" style={{ border: "1px solid rgba(245,197,24,0.3)", color: "rgba(245,197,24,0.7)" }}>
            Volver a la invitacion
          </Link>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default Gifts;
