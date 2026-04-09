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

const gifts = [
  {
    img: jerseyImg,
    title: "Jerseys de fútbol",
    desc: "De cualquier equipo — Liga MX, Premier League, selecciones... ¡todos valen!",
  },
  {
    img: moneyImg,
    title: "Dinero",
    desc: "Siempre es bienvenido para lo que Santiago necesite.",
  },
  {
    img: giftcardImg,
    title: "Tarjetas de regalo",
    desc: "Amazon, Nike, Visa — cualquier tarjeta es una buena opción.",
  },
];

const Gifts = () => {
  return (
    <div className="min-h-screen relative flex items-center justify-center px-6 py-16">

      {/* Blurred soccer field background with gold overlay */}
      <div className="absolute inset-0">
        <img src={fieldTexture} alt="" className="w-full h-full object-cover" />
        <div className="absolute inset-0 backdrop-blur-sm" style={{ background: "rgba(40, 24, 0, 0.75)" }} />
        <div className="absolute inset-0" style={{ background: "radial-gradient(ellipse at top, rgba(245,197,24,0.15) 0%, transparent 70%)" }} />
      </div>

      <motion.div
        className="relative z-10 max-w-md w-full space-y-8"
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

        <div className="space-y-4">
          {gifts.map((gift, i) => (
            <motion.div
              key={gift.title}
              className="rounded-2xl p-6 flex items-center gap-5 transition-all duration-300"
              style={{ background: "rgba(245,197,24,0.08)", border: "1px solid rgba(245,197,24,0.25)", backdropFilter: "blur(8px)" }}
              whileHover={{ background: "rgba(245,197,24,0.15)" } as any}
              variants={fadeUp}
              custom={i + 1}
            >
              <img src={gift.img} alt={gift.title} className="w-16 h-16 object-contain flex-shrink-0 rounded-xl" />
              <div className="space-y-1">
                <h3 className="font-heading font-semibold text-base" style={{ color: "#f5c518" }}>{gift.title}</h3>
                <p className="text-sm" style={{ color: "rgba(245,197,24,0.6)" }}>{gift.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div className="text-center pt-4" variants={fadeUp} custom={4}>
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
