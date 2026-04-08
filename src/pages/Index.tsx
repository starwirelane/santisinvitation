import { motion } from "framer-motion";
import santiagoImg from "@/assets/santiago-soccer.png";

const SoccerBall = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10" />
    <path d="M12 2a15 15 0 0 1 4 10 15 15 0 0 1-4 10 15 15 0 0 1-4-10 15 15 0 0 1 4-10z" />
    <path d="M2 12h20" />
  </svg>
);

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.1, duration: 0.6, ease: "easeOut" as const },
  }),
};

const Index = () => {
  const scrollToContent = () => {
    document.getElementById("main")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Field line decorations */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden opacity-[0.04]">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full border-2 border-foreground" />
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-px h-full bg-foreground" />
      </div>

      {/* Hero */}
      <section className="min-h-screen flex flex-col items-center justify-center px-6 text-center relative">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <SoccerBall className="w-10 h-10 text-primary mx-auto mb-8 opacity-60" />
        </motion.div>
        <motion.h1
          className="font-heading text-3xl sm:text-4xl md:text-5xl font-light leading-tight max-w-lg"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.7 }}
        >
          Hey, has sido invitado a la graduación de Santiago 🎓⚽
        </motion.h1>
        <motion.button
          onClick={scrollToContent}
          className="mt-10 px-8 py-3 rounded-full bg-primary text-primary-foreground font-heading font-medium text-sm tracking-wide hover:opacity-90 transition-opacity"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8, duration: 0.6 }}
        >
          Abrir invitación
        </motion.button>
      </section>

      {/* Main Content */}
      <section id="main" className="min-h-screen flex items-center justify-center px-6 py-20">
        <motion.div
          className="max-w-md w-full space-y-12"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          <motion.div className="text-center space-y-1" variants={fadeUp} custom={0}>
            <SoccerBall className="w-6 h-6 text-primary mx-auto mb-4 opacity-40" />
            <h2 className="font-heading text-2xl font-semibold">Santiago Luvianos</h2>
            <p className="text-muted-foreground text-sm">14 años</p>
          </motion.div>

          <motion.div
            className="bg-card rounded-2xl p-8 space-y-5 border border-border"
            variants={fadeUp}
            custom={1}
          >
            <h3 className="font-heading text-lg font-medium text-primary">Detalles del evento</h3>
            <div className="space-y-3 text-sm">
              {[
                ["Evento", "Graduación 🎓"],
                ["Fecha", "Sábado, 13 de junio"],
                ["Hora", "3:30 PM"],
                ["Ubicación", "Galt, Liberty Road"],
              ].map(([label, value]) => (
                <div key={label} className="flex justify-between items-baseline">
                  <span className="text-muted-foreground">{label}</span>
                  <span className="font-medium">{value}</span>
                </div>
              ))}
            </div>
            <p className="text-xs text-muted-foreground pt-2 border-t border-border">
              Evento al aire libre ☀️
            </p>
          </motion.div>

          {/* Wishlist */}
          <motion.div
            className="bg-card rounded-2xl p-8 space-y-5 border border-border"
            variants={fadeUp}
            custom={2}
          >
            <h3 className="font-heading text-lg font-medium text-primary">Lista de regalos 🎁</h3>
            <ul className="space-y-3 text-sm">
              {["Jerseys de fútbol", "Dinero", "Tarjetas de regalo"].map((item) => (
                <li key={item} className="flex items-center gap-3">
                  <span className="w-1.5 h-1.5 rounded-full bg-primary flex-shrink-0" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* RSVP */}
          <motion.div
            className="bg-card rounded-2xl p-8 space-y-5 border border-border text-center"
            variants={fadeUp}
            custom={3}
          >
            <h3 className="font-heading text-lg font-medium text-primary">Confirmación</h3>
            <p className="text-sm text-muted-foreground">
              Por favor confirma antes del 7 de junio de 2026
            </p>
            <a
              href="tel:209-663-3948"
              className="inline-block px-6 py-3 rounded-full bg-primary text-primary-foreground font-heading font-medium text-sm hover:opacity-90 transition-opacity"
            >
              📞 209-663-3948
            </a>
          </motion.div>

          {/* Footer note */}
          <motion.p
            className="text-center text-sm text-muted-foreground pb-10"
            variants={fadeUp}
            custom={4}
          >
            Si quieres, puedes venir con tu jersey favorito ⚽
          </motion.p>
        </motion.div>
      </section>
    </div>
  );
};

export default Index;
