import { motion } from "framer-motion";
import { Link } from "react-router-dom";

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.15, duration: 0.5, ease: "easeOut" as const },
  }),
};

const sections = [
  {
    emoji: "👕",
    title: "Jerseys de fútbol",
    desc: "Le encantan estos equipos:",
    tags: ["Barcelona", "Pumas", "Argentina", "España", "Mexico", "Brasil", "Francia"],
  },
  {
    emoji: "🎫",
    title: "Tarjetas de regalo",
    desc: "Cualquiera de estas tarjetas le va a encantar:",
    tags: ["Roblox", "Google", "In-N-Out", "Target", "Visa"],
  },
  {
    emoji: "🎣",
    title: "Equipo de pesca",
    desc: "Le encanta la pesca, cualquier cosa relacionada es bienvenida:",
    tags: ["Anzuelos", "Canas de pescar", "Caja de pesca", "Carnadas", "Chaleco de pesca"],
  },
  {
    emoji: "💵",
    title: "Dinero",
    desc: "Siempre es bienvenido para lo que Santiago necesite.",
    tags: [],
  },
];

const AnimatedBackground = () => {
  const particles = ["soccer", "gift", "star", "trophy", "fish", "soccer", "gift", "star", "trophy", "fish", "soccer", "gift", "star", "trophy", "fish"];
  const emojis = ["⚽", "🎁", "⭐", "🏆", "🎣", "⚽", "🎁", "⭐", "🏆", "🎣", "✨", "💫", "🌟", "🎓", "⚽"];
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {emojis.map((p, i) => (
        <motion.div
          key={i}
          className="absolute text-xl select-none"
          style={{ left: `${(i * 7) % 100}%`, top: `${(i * 13) % 100}%`, opacity: 0.12 }}
          animate={{ y: [-30, -150, -30], x: [0, i % 2 === 0 ? 30 : -30, 0], opacity: [0.08, 0.2, 0.08], rotate: [0, i % 2 === 0 ? 180 : -180, 0] }}
          transition={{ duration: 5 + (i * 0.4), repeat: Infinity, delay: i * 0.3, ease: "easeInOut" }}
        >
          {p}
        </motion.div>
      ))}
      <motion.div
        className="absolute w-96 h-96 rounded-full"
        style={{ top: "-10%", left: "-10%", background: "radial-gradient(circle, rgba(99,102,241,0.15) 0%, transparent 70%)" }}
        animate={{ scale: [1, 1.3, 1], opacity: [0.5, 1, 0.5] }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute w-96 h-96 rounded-full"
        style={{ bottom: "-10%", right: "-10%", background: "radial-gradient(circle, rgba(236,72,153,0.12) 0%, transparent 70%)" }}
        animate={{ scale: [1.3, 1, 1.3], opacity: [0.5, 1, 0.5] }}
        transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute w-64 h-64 rounded-full"
        style={{ top: "40%", right: "20%", background: "radial-gradient(circle, rgba(59,130,246,0.1) 0%, transparent 70%)" }}
        animate={{ scale: [1, 1.4, 1], opacity: [0.3, 0.8, 0.3] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", delay: 1 }}
      />
    </div>
  );
};

const Gifts = () => {
  return (
    <div className="min-h-screen relative flex items-center justify-center px-6 py-16" style={{ background: "linear-gradient(135deg, #0a0a1a 0%, #0d1b2a 50%, #0a0a1a 100%)" }}>
      <AnimatedBackground />
      <motion.div className="relative z-10 max-w-lg w-full space-y-6 py-8" initial="hidden" animate="visible">

        <motion.div className="text-center space-y-2" variants={fadeUp} custom={0}>
          <motion.p className="text-4xl mb-2" animate={{ rotate: [0, -10, 10, -10, 0], scale: [1, 1.2, 1] }} transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}>
            🎁
          </motion.p>
          <h1 className="font-heading text-3xl font-bold text-white">Ideas de Regalo</h1>
          <p className="text-white/40 text-sm">No es obligatorio, pero si quieres traer algo, aqui van algunas ideas</p>
        </motion.div>

        {sections.map((section, i) => (
          <motion.div
            key={section.title}
            className="rounded-2xl p-6 space-y-4"
            style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.1)", backdropFilter: "blur(12px)" }}
            variants={fadeUp}
            custom={i + 1}
            whileHover={{ scale: 1.01 } as any}
          >
            <div className="flex items-center gap-4">
              <span className="text-4xl flex-shrink-0 w-14 h-14 flex items-center justify-center rounded-xl" style={{ background: "rgba(255,255,255,0.06)" }}>
                {section.emoji}
              </span>
              <div>
                <h3 className="font-heading font-bold text-lg text-white">{section.title}</h3>
                <p className="text-sm text-white/50">{section.desc}</p>
              </div>
            </div>
            {section.tags.length > 0 && (
              <div className="flex flex-wrap gap-2">
                {section.tags.map((tag) => (
                  <span key={tag} className="px-3 py-1 rounded-full text-xs font-heading font-semibold" style={{ background: "rgba(255,255,255,0.08)", color: "rgba(255,255,255,0.7)", border: "1px solid rgba(255,255,255,0.15)" }}>
                    {tag}
                  </span>
                ))}
              </div>
            )}
          </motion.div>
        ))}

        <motion.div className="text-center pt-2" variants={fadeUp} custom={5}>
          <Link to="/" className="inline-block px-8 py-4 rounded-full font-heading font-semibold text-sm text-white/60 transition-all duration-300 hover:bg-white/10" style={{ border: "1px solid rgba(255,255,255,0.2)" }}>
            Volver a la invitacion
          </Link>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default Gifts;
