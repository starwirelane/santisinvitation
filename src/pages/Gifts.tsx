import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import fieldTexture from "@/assets/field-texture.jpg";
import jerseyImg from "@/assets/jersey.jpg";
import moneyImg from "@/assets/money.jpg";
import giftcardImg from "@/assets/gift card.jpg";

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
    title: "Jerseys de fútbol",
    img: jerseyImg,
    desc: "Le encantan estos equipos — cualquier jersey de uno de ellos sería perfecto:",
    tags: ["🔵 Barcelona", "🟡 Pumas", "🔵 Argentina", "🔴 España", "🟢 México", "🟡 Brasil", "🔵 Francia"],
  },
  {
    title: "Tarjetas de regalo",
    img: giftcardImg,
    desc: "Cualquiera de estas tarjetas le va a encantar:",
    tags: ["🎮 Roblox", "🔍 Google", "🍔 In-N-Out", "🎯 Target", "💳 Visa"],
  },
  {
    title: "Equipo de pesca",
    img: null,
    emoji: "🎣",
    desc: "Le encanta la pesca — cualquier cosa relacionada es bienvenida:",
    tags: ["🪝 Anzuelos", "🎣 Cañas de pescar", "🧰 Caja de pesca", "🐟 Carnadas", "🦺 Chaleco de pesca"],
  },
  {
    title: "Dinero",
    img: moneyImg,
    desc: "Siempre es bienvenido para lo que Santiago necesite 💵",
    tags: [],
  },
];

const Gifts = () => {
  return (
    <div className="min-h-screen relative flex items-center justify-center px-6 py-16">
      <div className="absolute inset-0">
        <img src={fieldTexture} alt="" className="w-full h-full object-cover" />
        <div className="absolute inset-0 backdrop-blur-sm" style={{ background: "rgba(40, 24, 0, 0.75)" }} />
        <div className="absolute inset-0" style={{ background: "radial-gradient(ellipse at top, rgba(245,197,24,0.15) 0%, transparent 70%)" }} />
      </div>

      <motion.div
        className="relative z-10 max-w-lg w-full space-y-6 py-8"
        initial="hidden"
        animate="visible"
      >
        <motion.div className="text-center space-y-2" variants={fadeUp} custom={0}>
          <p className="text-4xl mb-2">🏆</p>
          <h1 className="font-heading text-3xl font-bold" style={{ color: "#f5c518" }}>Ideas de Regalo</h1>
          <p className="text-sm" style={{ color: "rgba(245,197,24,0.5)" }}>
            No es obligatorio, pero si quieres traer algo, aquí van algunas ideas
          </p>
        </motion.div>

        {sections.map((section, i) => (
          <motion.div
            key={section.title}
            className="rounded-2xl p-6 space-y-4"
            style={{ background: "rgba(245,197,24,0.08)", border: "1px solid rgba(245,197,24,0.25)", backdropFilter: "blur(8px)" }}
            variants={fadeUp}
            custom={i + 1}
          >
            <div className="flex items-center gap-4">
              {section.img ? (
                <img src={section.img} alt={section.title} className="w-14 h-14 object-contain flex-shrink-0 rounded-xl" />
              ) : (
                <span className="text-4xl flex-shrink-0">{section.emoji}</span>
              )}
              <div>
                <h3 className="font-heading font-bold text-lg" style={{ color: "#f5c518" }}>{section.title}</h3>
                <p className="text-sm" style={{ color: "rgba(245,197,24,0.6)" }}>{section.desc}</p>
              </div>
            </div>
            {section.tags.length > 0 && (
              <div className="flex flex-wrap gap-2">
                {section.tags.map((tag) => (
                  <span
                    key={tag}
                    className="px-3 py-1 rounded-full text-xs font-heading font-semibold"
                    style={{ background: "rgba(245,197,24,0.15)", color: "#f5c518", border: "1px solid rgba(245,197,24,0.3)" }}
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
            className="inline-block px-8 py-4 rounded-full font-heading font-semibold text-sm transition-all duration-300"
            style={{ border: "1px solid rgba(245,197,24,0.4)", color: "#f5c518" }}
          >
            ← Volver a la invitación
          </Link>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default Gifts;
