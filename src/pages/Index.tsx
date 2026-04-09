import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import santiagoImg from "@/assets/santiago-soccer.png";
import heroBg from "@/assets/soccer-hero-bg.jpg";
import fieldTexture from "@/assets/field-texture.jpg";

const fade = {
  initial: { opacity: 0 },
  animate: { opacity: 1, transition: { duration: 0.7 } },
  exit: { opacity: 0, transition: { duration: 0.5 } },
};

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.12, duration: 0.6, ease: "easeOut" as const },
  }),
};

const RSVP_DEADLINE = new Date("2026-06-07T23:59:59");

const useCountdown = () => {
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });
  const [expired, setExpired] = useState(false);
  useEffect(() => {
    const update = () => {
      const diff = RSVP_DEADLINE.getTime() - new Date().getTime();
      if (diff <= 0) { setExpired(true); return; }
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
  return { timeLeft, expired };
};

const HeroCountdown = () => {
  const { timeLeft } = useCountdown();
  return (
    <motion.div
      className="absolute top-5 right-5 z-20 flex gap-6"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 1, duration: 0.8 }}
    >
      <div className="text-center">
        <p className="font-heading text-3xl font-bold text-primary-foreground">{timeLeft.days}</p>
        <div className="border-t border-primary-foreground/30 mt-1 pt-1">
          <p className="text-primary-foreground/50 text-[10px] uppercase tracking-widest">Days left</p>
        </div>
      </div>
      <div className="text-center">
        <p className="font-heading text-3xl font-bold text-primary-foreground">{timeLeft.hours}</p>
        <div className="border-t border-primary-foreground/30 mt-1 pt-1">
          <p className="text-primary-foreground/50 text-[10px] uppercase tracking-widest">Hours left</p>
        </div>
      </div>
    </motion.div>
  );
};

const RsvpCountdown = ({ onNext }: { onNext: () => void }) => {
  const { timeLeft, expired } = useCountdown();
  return (
    <motion.div
      className="w-full text-center space-y-8"
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.3, duration: 0.6 }}
    >
      <div>
        <h3 className="font-heading text-2xl font-bold text-white">⏳ Confirma tu asistencia</h3>
        <p className="text-white/60 text-sm mt-1">Tiempo restante para confirmar</p>
      </div>
      {!expired ? (
        <div className="flex justify-center gap-2">
          {[
            [timeLeft.days, "Días"],
            [timeLeft.hours, "Horas"],
            [timeLeft.minutes, "Min"],
            [timeLeft.seconds, "Seg"],
          ].map(([val, label], i) => (
            <div key={String(label)} className="flex items-center gap-2">
              <div className="bg-white/10 backdrop-blur-sm border border-white/20 text-white rounded-2xl px-4 py-4 min-w-[72px] text-center shadow-lg">
                <p className="font-heading text-3xl font-bold">{String(val).padStart(2, "0")}</p>
                <p className="text-xs uppercase tracking-wider opacity-50 mt-1">{label}</p>
              </div>
              {i < 3 && <span className="font-heading text-2xl font-bold text-white/30 mb-4">:</span>}
            </div>
          ))}
        </div>
      ) : (
        <p className="text-white/70 text-sm">La fecha límite para confirmar ha pasado</p>
      )}
      <p className="text-xs text-white/50">Confirma antes del 7 de junio de 2026</p>
      <a href={"sms:209-663-3948"} className="inline-flex items-center justify-center gap-2 w-full px-8 py-4 rounded-full bg-white text-black font-heading font-bold text-sm shadow-lg hover:scale-105 transition-transform duration-300">
        💬 Enviar texto al 209-663-3948
      </a>
      <button onClick={onNext} className="w-full px-8 py-4 rounded-full border border-white/30 text-white font-heading font-semibold text-sm hover:bg-white/10 transition-all duration-300">
        🎁 Ver ideas de regalo
      </button>
    </motion.div>
  );
};

const Index = () => {
  const [step, setStep] = useState(0);
  return (
    <div className="min-h-screen bg-background text-foreground">
      <AnimatePresence mode="wait">

        {step === 0 && (
          <motion.section key="hero" {...fade} className="min-h-screen relative flex flex-col items-center justify-center px-6 text-center overflow-hidden">
            <div className="absolute inset-0">
              <img src={heroBg} alt="" className="w-full h-full object-cover" width={1280} height={1920} />
              <div className="absolute inset-0 bg-gradient-to-b from-foreground/70 via-foreground/50 to-foreground/80" />
            </div>
            <HeroCountdown />
            <div className="relative z-10 flex flex-col items-center">
              <motion.p className="text-primary-foreground/50 text-xs font-heading tracking-[0.3em] uppercase mb-8" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2, duration: 0.8 }}>
                Invitación especial
              </motion.p>
              <motion.h1 className="font-heading text-5xl sm:text-6xl md:text-7xl font-extrabold leading-none text-primary-foreground" initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.3, duration: 0.8 }}>
                ¡HAS SIDO
              </motion.h1>
              <motion.h1 className="font-heading text-6xl sm:text-7xl md:text-8xl font-extrabold leading-none text-primary mt-1" initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.5, duration: 0.8 }}>
                INVITADO!
              </motion.h1>
              <motion.p className="mt-6 text-primary-foreground/70 text-lg sm:text-xl font-heading font-light max-w-xs text-center" initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.8, duration: 0.6 }}>
                A la Graduación de Santiago 🎓⚽
              </motion.p>
              <motion.p className="mt-2 text-primary-foreground/40 text-base" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1, duration: 0.6 }}>
                Sábado, 13 de Junio · 3:30 PM
              </motion.p>
              <motion.button onClick={() => setStep(1)} className="mt-10 px-12 py-4 rounded-full bg-primary text-primary-foreground font-heading font-bold text-base shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1.4, duration: 0.6 }} whileTap={{ scale: 0.97 }}>
                Abrir invitación
              </motion.button>
            </div>
          </motion.section>
        )}

        {step === 1 && (
          <motion.section key="details" {...fade} className="min-h-screen px-6 py-20 flex items-center justify-center">
            <motion.div className="max-w-md w-full mx-auto space-y-8" initial="hidden" animate="visible">
              <motion.div className="flex flex-col sm:flex-row items-center gap-8 w-full" variants={fadeUp} custom={0}>
                <div className="flex-shrink-0">
                  <img src={santiagoImg} alt="Santiago" className="w-44 h-44 object-cover rounded-full shadow-xl border-4 border-primary" />
                </div>
                <div className="text-center sm:text-left space-y-3">
                  <p className="text-muted-foreground text-xs uppercase tracking-widest">Están invitados a la</p>
                  <h2 className="font-heading text-3xl font-extrabold leading-tight">Graduación de<br />Santiago Luvianos</h2>
                  <div className="space-y-1 pt-2">
                    <p className="font-heading text-lg font-semibold">Sábado, 13 de Junio</p>
                    <p className="font-heading text-lg font-semibold">3:30 PM</p>
                    <p className="font-heading text-lg font-semibold">10069 Liberty Road</p>
                    <p className="font-heading text-lg font-semibold">Galt, CA</p>
                  </div>
                </div>
              </motion.div>
              <motion.div className="text-center px-6 py-5 rounded-2xl bg-muted w-full" variants={fadeUp} custom={1}>
                <p className="text-base leading-relaxed text-muted-foreground">
                  Póngase su camiseta de fútbol favorita y acompáñanos a celebrar un nuevo capítulo en la vida de Santiago ⚽
                </p>
              </motion.div>
              <motion.button onClick={() => setStep(2)} className="w-full px-12 py-4 rounded-full bg-primary text-primary-foreground font-heading font-bold text-base shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300" variants={fadeUp} custom={2} whileTap={{ scale: 0.97 }}>
                ✅ Confirmar RSVP
              </motion.button>
            </motion.div>
          </motion.section>
        )}

        {step === 2 && (
          <motion.section key="rsvp" {...fade} className="min-h-screen relative px-6 py-20 flex items-center justify-center">
            <div className="absolute inset-0">
              <img src={fieldTexture} alt="" className="w-full h-full object-cover" />
              <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" />
            </div>
            <div className="relative z-10 max-w-md w-full mx-auto space-y-8">
              <RsvpCountdown onNext={() => setStep(3)} />
            </div>
          </motion.section>
        )}

        {step === 3 && (
          <motion.section key="gifts-redirect" {...fade} className="min-h-screen px-6 py-20 flex items-center justify-center">
            <div className="max-w-md w-full mx-auto text-center space-y-6">
              <h2 className="font-heading text-2xl font-bold">🎁 Ideas de regalo</h2>
              <p className="text-muted-foreground text-sm">Mira algunas ideas para el regalo de Santiago</p>
              <Link to="/gifts" className="inline-block w-full px-8 py-4 rounded-2xl bg-card border border-border text-foreground font-heading font-semibold text-sm shadow-sm hover:shadow-md hover:scale-[1.02] transition-all duration-300">
                Ver ideas de regalo →
              </Link>
              <button onClick={() => setStep(0)} className="text-xs text-muted-foreground underline">
                Volver al inicio
              </button>
            </div>
          </motion.section>
        )}

      </AnimatePresence>
    </div>
  );
};

export default Index;
