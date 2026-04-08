import { motion } from "framer-motion";
import santiagoImg from "@/assets/santiago-soccer.png";

const SoccerBallIcon = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 64 64" fill="currentColor">
    <circle cx="32" cy="32" r="30" fill="none" stroke="currentColor" strokeWidth="2.5" />
    <path d="M32 2C32 2 38 14 38 32C38 50 32 62 32 62" fill="none" stroke="currentColor" strokeWidth="1.5" opacity="0.4" />
    <path d="M32 2C32 2 26 14 26 32C26 50 32 62 32 62" fill="none" stroke="currentColor" strokeWidth="1.5" opacity="0.4" />
    <path d="M2 32H62" stroke="currentColor" strokeWidth="1.5" opacity="0.4" />
    <path d="M5 16H59" stroke="currentColor" strokeWidth="1" opacity="0.2" />
    <path d="M5 48H59" stroke="currentColor" strokeWidth="1" opacity="0.2" />
    <polygon points="32,12 37,20 43,20 39,26 41,33 32,28 23,33 25,26 21,20 27,20" fill="currentColor" opacity="0.15" />
  </svg>
);

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.15, duration: 0.7, ease: "easeOut" as const },
  }),
};

const Index = () => {
  const scrollToContent = () => {
    document.getElementById("main")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="min-h-screen bg-background text-foreground overflow-x-hidden">

      {/* ===== HERO SECTION ===== */}
      <section className="min-h-screen flex flex-col items-center justify-center px-6 text-center relative overflow-hidden">
        {/* Soccer field background pattern */}
        <div className="absolute inset-0 pointer-events-none">
          {/* Field stripes */}
          <div className="absolute inset-0 opacity-[0.06]">
            {[...Array(8)].map((_, i) => (
              <div
                key={i}
                className="absolute w-full h-[12.5%] border-b border-foreground/20"
                style={{ top: `${i * 12.5}%`, backgroundColor: i % 2 === 0 ? 'transparent' : 'hsl(120, 50%, 30%)' }}
              />
            ))}
          </div>
          {/* Center circle */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[350px] h-[350px] rounded-full border-2 border-primary/10" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-3 h-3 rounded-full bg-primary/10" />
          {/* Center line */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-px h-full bg-primary/10" />
        </div>

        {/* Floating soccer balls */}
        <motion.div
          className="absolute top-[10%] left-[8%] text-primary/20"
          animate={{ y: [-10, 10, -10], rotate: [0, 360] }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
        >
          <SoccerBallIcon className="w-12 h-12" />
        </motion.div>
        <motion.div
          className="absolute bottom-[15%] right-[10%] text-secondary/20"
          animate={{ y: [10, -10, 10], rotate: [360, 0] }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        >
          <SoccerBallIcon className="w-16 h-16" />
        </motion.div>
        <motion.div
          className="absolute top-[60%] left-[5%] text-primary/10"
          animate={{ y: [5, -15, 5] }}
          transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
        >
          <SoccerBallIcon className="w-8 h-8" />
        </motion.div>

        {/* Content */}
        <motion.div
          initial={{ opacity: 0, scale: 0.5, rotate: -180 }}
          animate={{ opacity: 1, scale: 1, rotate: 0 }}
          transition={{ duration: 1, ease: "easeOut" }}
        >
          <SoccerBallIcon className="w-16 h-16 text-secondary mx-auto mb-6" />
        </motion.div>

        <motion.div
          className="inline-block px-4 py-1.5 rounded-full bg-primary/20 border border-primary/30 mb-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.6 }}
        >
          <span className="text-primary text-xs font-heading font-semibold tracking-widest uppercase">Invitación especial</span>
        </motion.div>

        <motion.h1
          className="font-heading text-3xl sm:text-4xl md:text-5xl font-bold leading-tight max-w-md"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.7 }}
        >
          Hey, has sido invitado a la graduación de{" "}
          <span className="text-primary">Santiago</span> 🎓⚽
        </motion.h1>

        <motion.p
          className="mt-4 text-muted-foreground text-sm max-w-xs"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8, duration: 0.6 }}
        >
          Sábado, 13 de junio · 3:30 PM
        </motion.p>

        <motion.button
          onClick={scrollToContent}
          className="mt-8 px-10 py-4 rounded-full bg-gradient-to-r from-primary to-field-light text-primary-foreground font-heading font-bold text-sm tracking-wide shadow-lg shadow-primary/30 hover:shadow-primary/50 hover:scale-105 transition-all duration-300"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1, duration: 0.6 }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.97 }}
        >
          ⚽ Abrir invitación
        </motion.button>

        {/* Scroll indicator */}
        <motion.div
          className="absolute bottom-8 left-1/2 -translate-x-1/2"
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.5, repeat: Infinity }}
        >
          <div className="w-5 h-8 rounded-full border-2 border-muted-foreground/30 flex items-start justify-center p-1">
            <div className="w-1 h-2 rounded-full bg-muted-foreground/50" />
          </div>
        </motion.div>
      </section>

      {/* ===== MAIN CONTENT ===== */}
      <section id="main" className="relative px-6 py-20">
        {/* Gradient divider */}
        <div className="absolute top-0 left-0 right-0 h-32 bg-gradient-to-b from-background to-transparent" />

        <motion.div
          className="max-w-md w-full mx-auto space-y-10"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
        >
          {/* Photo + Name */}
          <motion.div className="text-center space-y-4" variants={fadeUp} custom={0}>
            <div className="relative inline-block">
              <div className="w-44 h-44 mx-auto rounded-full overflow-hidden border-4 border-primary/40 shadow-xl shadow-primary/20">
                <img src={santiagoImg} alt="Santiago jugando fútbol" className="w-full h-full object-cover object-top" />
              </div>
              {/* Soccer ball badge */}
              <div className="absolute -bottom-2 -right-2 w-10 h-10 bg-secondary rounded-full flex items-center justify-center shadow-lg text-secondary-foreground animate-bounce-soft">
                <span className="text-lg">⚽</span>
              </div>
            </div>
            <div>
              <h2 className="font-heading text-3xl font-bold">Santiago Luvianos</h2>
              <div className="flex items-center justify-center gap-2 mt-1">
                <div className="h-px w-8 bg-primary/40" />
                <p className="text-secondary font-heading font-semibold text-sm">14 años</p>
                <div className="h-px w-8 bg-primary/40" />
              </div>
            </div>
          </motion.div>

          {/* Event Details Card */}
          <motion.div
            className="relative rounded-2xl overflow-hidden"
            variants={fadeUp}
            custom={1}
          >
            {/* Card gradient border effect */}
            <div className="absolute inset-0 bg-gradient-to-br from-primary/30 via-transparent to-secondary/30 rounded-2xl" />
            <div className="relative bg-card m-[1px] rounded-2xl p-7 space-y-5">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-primary/20 flex items-center justify-center">
                  <span className="text-base">🎓</span>
                </div>
                <h3 className="font-heading text-lg font-bold text-primary">Detalles del evento</h3>
              </div>
              <div className="space-y-4 text-sm">
                {[
                  ["📅", "Evento", "Graduación"],
                  ["🗓️", "Fecha", "Sábado, 13 de junio"],
                  ["🕒", "Hora", "3:30 PM"],
                  ["📍", "Ubicación", "Galt, Liberty Road"],
                ].map(([icon, label, value]) => (
                  <div key={label} className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-muted flex items-center justify-center flex-shrink-0">
                      <span className="text-sm">{icon}</span>
                    </div>
                    <div className="flex-1">
                      <span className="text-muted-foreground text-xs block">{label}</span>
                      <span className="font-semibold">{value}</span>
                    </div>
                  </div>
                ))}
              </div>
              <div className="flex items-center gap-2 pt-3 border-t border-border">
                <span>☀️</span>
                <p className="text-xs text-secondary font-medium">Evento al aire libre</p>
              </div>
            </div>
          </motion.div>

          {/* Wishlist Card */}
          <motion.div
            className="relative rounded-2xl overflow-hidden"
            variants={fadeUp}
            custom={2}
          >
            <div className="absolute inset-0 bg-gradient-to-br from-secondary/30 via-transparent to-primary/30 rounded-2xl" />
            <div className="relative bg-card m-[1px] rounded-2xl p-7 space-y-5">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-secondary/20 flex items-center justify-center">
                  <span className="text-base">🎁</span>
                </div>
                <h3 className="font-heading text-lg font-bold text-secondary">Lista de regalos</h3>
              </div>
              <ul className="space-y-3 text-sm">
                {[
                  ["👕", "Jerseys de fútbol"],
                  ["💵", "Dinero"],
                  ["🎫", "Tarjetas de regalo"],
                ].map(([icon, item]) => (
                  <li key={item} className="flex items-center gap-3 bg-muted/50 rounded-xl px-4 py-3">
                    <span className="text-lg">{icon}</span>
                    <span className="font-medium">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </motion.div>

          {/* RSVP Card */}
          <motion.div
            className="relative rounded-2xl overflow-hidden"
            variants={fadeUp}
            custom={3}
          >
            <div className="absolute inset-0 bg-gradient-to-br from-primary/40 via-primary/20 to-secondary/30 rounded-2xl" />
            <div className="relative bg-card m-[1px] rounded-2xl p-7 space-y-5 text-center">
              <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center mx-auto">
                <span className="text-xl">📋</span>
              </div>
              <h3 className="font-heading text-lg font-bold text-primary">Confirmación</h3>
              <p className="text-sm text-muted-foreground">
                Por favor confirma antes del <span className="text-secondary font-semibold">7 de junio de 2026</span>
              </p>
              <a
                href="tel:209-663-3948"
                className="inline-flex items-center gap-2 px-8 py-4 rounded-full bg-gradient-to-r from-primary to-field-light text-primary-foreground font-heading font-bold text-sm shadow-lg shadow-primary/30 hover:shadow-primary/50 hover:scale-105 transition-all duration-300"
              >
                📞 209-663-3948
              </a>
            </div>
          </motion.div>

          {/* Footer note */}
          <motion.div
            className="text-center pb-10 space-y-3"
            variants={fadeUp}
            custom={4}
          >
            <div className="inline-block px-5 py-3 rounded-2xl bg-muted/50 border border-border">
              <p className="text-sm text-foreground">
                Si quieres, puedes venir con tu <span className="text-primary font-semibold">jersey favorito</span> ⚽
              </p>
            </div>
            <div className="flex items-center justify-center gap-1 pt-4 text-muted-foreground/40">
              <SoccerBallIcon className="w-4 h-4" />
              <span className="text-xs">Santiago 2026</span>
              <SoccerBallIcon className="w-4 h-4" />
            </div>
          </motion.div>
        </motion.div>
      </section>
    </div>
  );
};

export default Index;
