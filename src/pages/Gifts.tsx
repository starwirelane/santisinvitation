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

const walletStyles = `
  .wallet {
    position: relative;
    width: 280px;
    height: 230px;
    cursor: pointer;
    perspective: 1000px;
    display: flex;
    justify-content: center;
    align-items: flex-end;
    transition: transform 0.4s ease;
  }
  .wallet:hover { transform: translateY(-5px); }
  .wallet-back {
    position: absolute;
    bottom: 0;
    width: 280px;
    height: 200px;
    background: #1e341e;
    border-radius: 22px 22px 60px 60px;
    z-index: 5;
    box-shadow: inset 0 25px 35px rgba(0,0,0,0.4), inset 0 5px 15px rgba(0,0,0,0.5);
  }
  @keyframes slideIntoPocket {
    0% { transform: translateY(-100px); opacity: 0; }
    100% { transform: translateY(0); opacity: 1; }
  }
  .card {
    position: absolute;
    width: 260px;
    height: 140px;
    left: 10px;
    border-radius: 16px;
    padding: 18px;
    color: white;
    box-shadow: inset 0 1px 1px rgba(255,255,255,0.3), 0 -4px 15px rgba(0,0,0,0.1);
    transition: transform 0.6s cubic-bezier(0.34, 1.56, 0.64, 1);
    animation: slideIntoPocket 0.8s cubic-bezier(0.2, 0.8, 0.2, 1) backwards;
  }
  .card-inner { display: flex; flex-direction: column; justify-content: space-between; height: 100%; }
  .card-top { display: flex; justify-content: space-between; align-items: center; font-size: 14px; text-transform: uppercase; letter-spacing: 1px; }
  .card-bottom { display: flex; justify-content: space-between; align-items: flex-end; }
  .label { font-size: 8px; opacity: 0.7; text-transform: uppercase; margin-bottom: 2px; display: block; }
  .value { font-size: 12px; font-weight: 600; }
  .chip { width: 32px; height: 24px; background: rgba(255,255,255,0.2); border-radius: 4px; border: 1px solid rgba(255,255,255,0.1); }
  .card-1 { background: linear-gradient(135deg, #e52e2e, #b91c1c); bottom: 90px; z-index: 10; animation-delay: 0.1s; }
  .card-2 { background: linear-gradient(135deg, #2563eb, #1d4ed8); bottom: 65px; z-index: 20; animation-delay: 0.2s; }
  .card-3 { background: linear-gradient(135deg, #f59e0b, #d97706); color: #1a1a1a; bottom: 40px; z-index: 30; animation-delay: 0.3s; }
  .card-3 .chip { background: rgba(0,0,0,0.1); }
  .pocket {
    position: absolute;
    bottom: 0;
    width: 280px;
    height: 160px;
    z-index: 40;
    filter: drop-shadow(0 15px 25px rgba(20,40,20,0.4));
  }
  .pocket-content {
    position: absolute;
    top: 45px;
    width: 100%;
    text-align: center;
    z-index: 50;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 6px;
  }
  .pocket-label { color: #a7c59e; font-size: 11px; opacity: 0.6; letter-spacing: 1px; text-transform: uppercase; }
  .pocket-cards { color: #839e7b; font-size: 13px; font-weight: 600; transition: 0.3s; }
  .pocket-cards-hover { color: #a7c59e; font-size: 12px; font-weight: 600; opacity: 0; position: absolute; top: 20px; left: 50%; transform: translate(-50%, 10px); transition: 0.3s; white-space: nowrap; }
  .wallet:hover .card-1 { transform: translateY(-75px) rotate(-4deg); }
  .wallet:hover .card-2 { transform: translateY(-45px) rotate(3deg); }
  .wallet:hover .card-3 { transform: translateY(-10px); }
  .card:hover { z-index: 100 !important; }
  .wallet:hover .card-1:hover { transform: translateY(-60px) scale(1.05) rotate(0); }
  .wallet:hover .card-2:hover { transform: translateY(-70px) scale(1.05) rotate(0); }
  .wallet:hover .card-3:hover { transform: translateY(-60px) scale(1.05) rotate(0); }
  .wallet:hover .pocket-cards { opacity: 0; }
  .wallet:hover .pocket-cards-hover { opacity: 1; transform: translate(-50%, 0); }
  .wallet::after {
    content: "Hover para ver las tarjetas";
    position: absolute;
    bottom: -28px;
    font-style: italic;
    color: rgba(245,197,24,0.6);
    font-size: 12px;
    font-weight: 500;
    white-space: nowrap;
  }
`;

const sections = [
  {
    emoji: "👕",
    title: "Jerseys de futbol",
    desc: "Le encantan estos equipos:",
    tags: ["Barcelona", "Pumas", "Argentina", "Espana", "Mexico", "Brasil", "Francia"],
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

const WalletCard = () => (
  <div className="wallet">
    <div className="wallet-back" />
    <div className="card card-1">
      <div className="card-inner">
        <div className="card-top">
          <span>Roblox</span>
          <div className="chip" />
        </div>
        <div className="card-bottom">
          <div>
            <span className="label">Gift Card</span>
            <span className="value">🎮 Roblox</span>
          </div>
        </div>
      </div>
    </div>
    <div className="card card-2">
      <div className="card-inner">
        <div className="card-top">
          <span>Google / Target</span>
          <div className="chip" />
        </div>
        <div className="card-bottom">
          <div>
            <span className="label">Gift Card</span>
            <span className="value">🔍 Google · 🎯 Target</span>
          </div>
        </div>
      </div>
    </div>
    <div className="card card-3">
      <div className="card-inner">
        <div className="card-top">
          <span>In-N-Out · Visa</span>
          <div className="chip" />
        </div>
        <div className="card-bottom">
          <div>
            <span className="label">Gift Card</span>
            <span className="value">🍔 In-N-Out · 💳 Visa</span>
          </div>
        </div>
      </div>
    </div>
    <svg className="pocket" viewBox="0 0 280 160" fill="none">
      <path d="M0 60 Q140 0 280 60 L280 160 Q140 120 0 160 Z" fill="#2d4a2d" />
      <path d="M0 60 Q140 10 280 60" stroke="#3a5c3a" strokeWidth="2" fill="none" />
    </svg>
    <div className="pocket-content">
      <span className="pocket-label">Tarjetas</span>
      <span className="pocket-cards">🎫 5 opciones</span>
      <span className="pocket-cards-hover">Roblox · Google · In-N-Out · Target · Visa</span>
    </div>
  </div>
);

const Gifts = () => {
  return (
    <div
      className="min-h-screen relative flex items-center justify-center px-6 py-16"
      style={{ background: "linear-gradient(135deg, #0a0a1a 0%, #0d1b2a 50%, #0a0a1a 100%)" }}
    >
      <style>{walletStyles}</style>
      <GlowOrbs />
      <FloatingIcons />

      <motion.div className="relative z-10 max-w-lg w-full space-y-6 py-8" initial="hidden" animate="visible">
        <motion.div className="text-center space-y-2" variants={fadeUp} custom={0}>
          <motion.p
            className="text-4xl mb-2"
            animate={{ rotate: [0, -10, 10, -10, 0], scale: [1, 1.2, 1] }}
            transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}
          >
            🎁
          </motion.p>
          <h1 className="font-heading text-3xl font-bold text-white">Ideas de Regalo</h1>
          <p className="text-white/40 text-sm">No es obligatorio, pero si quieres traer algo, aqui van algunas ideas</p>
        </motion.div>

        {/* Wallet Gift Card Section */}
        <motion.div
          className="rounded-2xl p-8 flex flex-col items-center gap-6"
          style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.1)", backdropFilter: "blur(12px)" }}
          variants={fadeUp}
          custom={1}
        >
          <div className="text-center">
            <h3 className="font-heading font-bold text-lg text-white mb-1">Tarjetas de regalo</h3>
            <p className="text-sm text-white/50">Cualquiera de estas le va a encantar</p>
          </div>
          <WalletCard />
        </motion.div>

        {/* Other gift sections */}
        {sections.map((section, i) => (
          <motion.div
            key={section.title}
            className="rounded-2xl p-6 space-y-4"
            style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.1)", backdropFilter: "blur(12px)" }}
            variants={fadeUp}
            custom={i + 2}
            whileHover={{ scale: 1.01, background: "rgba(255,255,255,0.07)" } as any}
          >
            <div className="flex items-center gap-4">
              <span
                className="text-3xl flex-shrink-0 w-14 h-14 flex items-center justify-center rounded-xl"
                style={{ background: "rgba(245,197,24,0.1)", border: "1px solid rgba(245,197,24,0.2)" }}
              >
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
                  <span
                    key={tag}
                    className="px-3 py-1 rounded-full text-xs font-heading font-semibold"
                    style={{ background: "rgba(245,197,24,0.1)", color: "rgba(245,197,24,0.8)", border: "1px solid rgba(245,197,24,0.25)" }}
                  >
                    {tag}
                  </span>
                ))}
              </div>
            )}
          </motion.div>
        ))}

        <motion.div className="text-center pt-2" variants={fadeUp} custom={5}>
          <Link
            to="/"
            className="inline-block px-8 py-4 rounded-full font-heading font-semibold text-sm transition-all duration-300 hover:bg-white/10"
            style={{ border: "1px solid rgba(245,197,24,0.3)", color: "rgba(245,197,24,0.7)" }}
          >
            Volver a la invitacion
          </Link>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default Gifts;
