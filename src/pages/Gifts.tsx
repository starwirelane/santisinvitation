import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import jerseyImg from "@/assets/jersey.jpg";
import moneyImg from "@/assets/money.jpg";
import giftcardImg from "@/assets/gift-cards.jpg";

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
    <div className="min-h-screen relative flex items-center justify-center px-6 py-16" style={{ background: "linear-gradient(135deg, #1a1200 0%, #3d2b00 40%, #1a1200 100%)" }}>

      {/* Gold glow circles */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-96 h-96 rounded-full opacity-20" style={{ background: "radial-gradient(circle, #f5c518 0%, transparent 70%)" }} />
      <div className="absolute bottom-0 right-0 w-64 h-64 rounded-full opacity-10" style={{ background: "radial-gradient(circle, #f5c518 0%, transparent 70%)" }} />

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
              style={{ background: "rgba(245,197,24,0.08)", border: "1px solid rgba(245,197,24,0.25)" }}
              whileHover={{ background: "rgba(245,197,24,0.15)" }}
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
