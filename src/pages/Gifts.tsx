import { motion } from "framer-motion";
import { Link } from "react-router-dom";

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.12, duration: 0.5, ease: "easeOut" as const },
  }),
};

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

        <motion.ul className="space-y-3" variants={fadeUp} custom={1}>
          {[
            ["👕", "Jerseys de fútbol"],
            ["💵", "Dinero"],
            ["🎫", "Tarjetas de regalo"],
          ].map(([icon, item]) => (
            <li key={item} className="flex items-center gap-4 bg-card rounded-2xl px-6 py-5 shadow-sm border border-border">
              <span className="text-2xl">{icon}</span>
              <span className="font-heading font-semibold">{item}</span>
            </li>
          ))}
        </motion.ul>

        <motion.div className="text-center pt-4" variants={fadeUp} custom={2}>
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
