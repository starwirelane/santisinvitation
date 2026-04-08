import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import santiagoImg from "@/assets/santiago-soccer.png";
import heroBg from "@/assets/soccer-hero-bg.jpg";
import fieldTexture from "@/assets/field-texture.jpg";

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.12, duration: 0.6, ease: "easeOut" as const },
  }),
};

const RSVP_DEADLINE = new Date("2026-06-07T23:59:59");

const RsvpCountdown = () => {
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });
  const [expired, setExpired] = useState(false);

  useEffect(() => {
    const update = () => {
      const now = new Date();
      const diff = RSVP_DEADLINE.getTime() - now.getTime();
      if (diff <= 0) {
        setExpired(true);
        return;
      }
      setTimeLeft({
        days: Math.floor(diff / (1000 * 60 * 60 * 24)),
        hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((diff / (1000 * 60)) % 60),
        seconds: Math.floor((diff / 1000) % 60),
      });
    };
    update();
    const id = setInterval(update, 1000);
    return () => clearInterval(id);
  }, []);

  return (
    <motion.div
      className="bg-primary rounded-2xl p-7 shadow-md text-center space-y-5"
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: 0.4, duration: 0.6 }}
    >
      <h3 className="font-heading text-base font-semibold text-primary-foreground flex items-center justify-center gap-2">
        <span className="text-lg">📋</span> Confirmación
      </h3>

      {!expired ? (
        <>
          <p className="text-primary-foreground/60 text-xs uppercase tracking-widest font-heading">Tiempo para confirmar</p>
          <div className="flex justify-center gap-3">
            {[
              [timeLeft.days, "Días"],
              [timeLeft.hours, "Hrs"],
              [timeLeft.minutes, "Min"],
              [timeLeft.seconds, "Seg"],
            ].map(([val, label]) => (
              <div key={String(label)} className="bg-primary-foreground/10 rounded-xl px-3 py-2 min-w-[56px]">
                <p className="font-heading text-2xl font-bold text-primary-foreground">{String(val).padStart(2, "0")}</p>
                <p className="text-primary-foreground/50 text-[10px] uppercase tracking-wider">{label}</p>
              </div>
            ))}
          </div>
          <p className="text-primary-foreground/50 text-xs">
            Confirma antes del 7 de junio de 2026
          </p>
        </>
      ) : (
        <p className="text-primary-foreground/70 text-sm">
          La fecha límite para confirmar ha pasado
        </p>
      )}

      <a
        href="tel:209-663-3948"
        className="inline-block px-8 py-3.5 rounded-full bg-secondary text-secondary-foreground font-heading font-semibold text-sm shadow-lg hover:scale-105 transition-transform duration-300"
      >
        📞 209-663-3948
      </a>
    </motion.div>
  );
};

const Index = () => {
  const scrollToContent = () => {
    document.getElementById("main")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="min-h-screen bg-background text-foreground">

      {/* ===== HERO ===== */}
      <section className="min-h-screen relative flex flex-col items-center justify-center px-6 text-center overflow-hidden">
        {/* Background image */}
        <div className="absolute inset-0">
          <img src={heroBg} alt="" className="w-full h-full object-cover" width={1280} height={1920} />
          <div className="absolute inset-0 bg-gradient-to-b from-foreground/70 via-foreground/50 to-foreground/80" />
        </div>

        {/* Content */}
        <div className="relative z-10 flex flex-col items-center">
          <motion.p
            className="text-primary-foreground/50 text-xs font-heading tracking-[0.3em] uppercase mb-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.8 }}
          >
            Invitación especial
          </motion.p>

          <motion.h1
            className="font-heading text-5xl sm:text-6xl md:text-7xl font-extrabold leading-none text-primary-foreground"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3, duration: 0.8 }}
          >
            ¡HAS SIDO
          </motion.h1>
          <motion.h1
            className="font-heading text-6xl sm:text-7xl md:text-8xl font-extrabold leading-none text-primary mt-1"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.5, duration: 0.8 }}
          >
            INVITADO!
          </motion.h1>

          <motion.p
            className="mt-6 text-primary-foreground/70 text-base sm:text-lg font-heading font-light max-w-xs text-center"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 0.6 }}
          >
            a la graduación de Santiago 🎓⚽
          </motion.p>

          <motion.p
            className="mt-2 text-primary-foreground/40 text-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1, duration: 0.6 }}
          >
            Sábado, 13 de junio · 3:30 PM
          </motion.p>

          <motion.button
            onClick={scrollToContent}
            className="mt-10 px-12 py-4 rounded-full bg-primary text-primary-foreground font-heading font-bold text-base shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.2, duration: 0.6 }}
            whileTap={{ scale: 0.97 }}
          >
            Abrir invitación
          </motion.button>
        </div>

        {/* Scroll indicator */}
        <motion.div
          className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10"
          animate={{ y: [0, 6, 0] }}
          transition={{ duration: 1.8, repeat: Infinity }}
        >
          <div className="w-5 h-8 rounded-full border-2 border-primary-foreground/25 flex items-start justify-center p-1">
            <div className="w-1 h-2 rounded-full bg-primary-foreground/40" />
          </div>
        </motion.div>
      </section>

      {/* ===== MAIN CONTENT ===== */}
      <section id="main" className="px-6 py-16">
        <motion.div
          className="max-w-md w-full mx-auto space-y-8"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
        >
          {/* Photo + Name */}
          <motion.div className="text-center space-y-4 pt-4" variants={fadeUp} custom={0}>
            <div className="w-36 h-36 mx-auto rounded-2xl overflow-hidden shadow-xl border-4 border-card rotate-3 hover:rotate-0 transition-transform duration-500">
              <img src={santiagoImg} alt="Santiago jugando fútbol" className="w-full h-full object-cover object-top" />
            </div>
            <div>
              <h2 className="font-heading text-2xl font-bold">Santiago Luvianos</h2>
              <p className="text-muted-foreground text-sm mt-1">14 años · Clase 2026</p>
            </div>
          </motion.div>

          {/* Field texture divider */}
          <motion.div className="rounded-2xl overflow-hidden h-24 shadow-inner" variants={fadeUp} custom={0.5}>
            <img src={fieldTexture} alt="" className="w-full h-full object-cover" loading="lazy" width={1280} height={512} />
          </motion.div>

          {/* Event Details */}
          <motion.div className="bg-card rounded-2xl p-7 shadow-sm border border-border space-y-5" variants={fadeUp} custom={1}>
            <h3 className="font-heading text-base font-semibold text-primary flex items-center gap-2">
              <span className="text-lg">🎓</span> Detalles del evento
            </h3>
            <div className="space-y-4 text-sm">
              {[
                ["📅", "Evento", "Graduación"],
                ["🗓️", "Fecha", "Sábado, 13 de junio"],
                ["🕒", "Hora", "3:30 PM"],
                ["📍", "Ubicación", "Galt, Liberty Road"],
              ].map(([icon, label, value]) => (
                <div key={label} className="flex items-center gap-3">
                  <span className="w-9 h-9 rounded-lg bg-muted flex items-center justify-center flex-shrink-0 text-sm">{icon}</span>
                  <div>
                    <p className="text-muted-foreground text-xs">{label}</p>
                    <p className="font-medium">{value}</p>
                  </div>
                </div>
              ))}
            </div>
            <div className="flex items-center gap-2 pt-3 border-t border-border text-xs text-secondary font-medium">
              <span>☀️</span> Evento al aire libre
            </div>
          </motion.div>

          {/* Wishlist */}
          <motion.div className="bg-card rounded-2xl p-7 shadow-sm border border-border space-y-4" variants={fadeUp} custom={2}>
            <h3 className="font-heading text-base font-semibold text-primary flex items-center gap-2">
              <span className="text-lg">🎁</span> Lista de regalos
            </h3>
            <ul className="space-y-2 text-sm">
              {[
                ["👕", "Jerseys de fútbol"],
                ["💵", "Dinero"],
                ["🎫", "Tarjetas de regalo"],
              ].map(([icon, item]) => (
                <li key={item} className="flex items-center gap-3 bg-warm rounded-xl px-4 py-3">
                  <span>{icon}</span>
                  <span className="font-medium text-warm-foreground">{item}</span>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* RSVP with Countdown */}
          <RsvpCountdown />

          {/* Footer note */}
          <motion.div className="text-center pb-8 space-y-2" variants={fadeUp} custom={4}>
            <div className="inline-block px-5 py-3 rounded-full bg-warm">
              <p className="text-sm text-warm-foreground">
                Ven con tu jersey favorito ⚽
              </p>
            </div>
            <p className="text-xs text-muted-foreground pt-2">Santiago · Graduación 2026</p>
          </motion.div>
        </motion.div>
      </section>
    </div>
  );
};

export default Index;
