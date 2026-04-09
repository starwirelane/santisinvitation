import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import fieldTexture from "@/assets/field-texture.jpg";
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
    <div className="min-h-screen relative flex items-center justify-center px-6 py-16">
      <div className="absolute inset-0">
        <img src={fieldTexture} alt="" className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" />
      </div>

      <motion.div
        className="relative z-10 max-w-md w-full space-y-8"
        initial="hidden"
        animate="visible"
      >
        <motion.div className="text-center space-y-2" variants={fadeUp} custom={0}>
          <h1 className="font-heading text-3xl font-bold text-white">🎁 Ideas de Regalo</h1>
          <p className="text-white/50 text-sm">
            No es obligatorio, pero si quieres traer algo, aquí van algunas ideas
          </p>
        </motion.div>

        <div className="space-y-4">
          {gifts.map((gift, i) => (
            <motion.div
              key={gift.title}
              className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl p-6 flex items-center gap-5 hover:bg-white/15 transition-all duration-300"
              variants={fadeUp}
              custom={i + 1}
            >
              <img src={gift.img} alt={gift.title} className="w-16 h-16 object-contain flex-shrink-0 rounded-xl" />
              <div className="space-y-1">
                <h3 className="font-heading font-semibold text-base text-white">{gift.title}</h3>
                <p className="text-white/60 text-sm">{gift.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div className="text-center pt-4" variants={fadeUp} custom={4}>
          <Link
            to="/"
            className="inline-block px-8 py-4 rounded-full border border-white/30 text-white font-heading font-semibold text-sm hover:bg-white/10 transition-all duration-300"
          >
            ← Volver a la invitación
          </Link>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default Gifts;
