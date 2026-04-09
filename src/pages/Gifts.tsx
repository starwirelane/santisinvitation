import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import giftJerseys from "@/assets/gift-jerseys.jpg";
import giftCash from "@/assets/gift-cash.jpg";
import giftCards from "@/assets/gift-cards.jpg";

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
    img: giftJerseys,
    title: "Jerseys de fútbol",
    desc: "De cualquier equipo — Liga MX, Premier League, selecciones... ¡todos valen!",
  },
  {
    img: giftCash,
    title: "Dinero",
    desc: "Siempre es bienvenido para lo que Santiago necesite.",
  },
  {
    img: giftCards,
    title: "Tarjetas de regalo",
    desc: "Amazon, Nike, Visa — cualquier tarjeta es una buena opción.",
  },
];

const Gifts = () => {
  return (
    <div className="min-h-screen bg-background text-foreground flex items-center justify-center px-6 py-16">
      <motion.div
        className="max-w-md w-full space-y-8"
        initial="hidden"
        animate="visible"
      >
        <motion.div className="text-center space-y-2" variants={fadeUp} custom={0}>
          <h1 className="font-heading text-3xl font-bold">🎁 Ideas de Regalo</h1>
          <p className="text-muted-foreground text-sm">
            No es obligatorio, pero si quieres traer algo, aquí van algunas ideas
          </p>
        </motion.div>

        <div className="space-y-4">
          {gifts.map((gift, i) => (
            <motion.div
              key={gift.title}
              className="bg-card rounded-2xl overflow-hidden shadow-sm border border-border"
              variants={fadeUp}
              custom={i + 1}
            >
              <div className="h-44 overflow-hidden">
                <img
                  src={gift.img}
                  alt={gift.title}
                  className="w-full h-full object-cover"
                  loading="lazy"
                  width={640}
                  height={640}
                />
              </div>
              <div className="p-5 space-y-1">
                <h3 className="font-heading font-semibold text-base">{gift.title}</h3>
                <p className="text-muted-foreground text-sm">{gift.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div className="text-center pt-4" variants={fadeUp} custom={4}>
          <Link
            to="/"
            className="inline-block px-8 py-3.5 rounded-full bg-primary text-primary-foreground font-heading font-semibold text-sm shadow-lg hover:scale-105 transition-transform duration-300"
          >
            ← Volver a la invitación
          </Link>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default Gifts;
