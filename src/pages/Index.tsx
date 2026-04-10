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

const FloatingParticles = () => {
  const items = ["⚽", "🌟", "✨", "🎓", "⭐", "💫", "⚽", "🌟", "✨", "🎓"];
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {items.map((item, i) => (
        <motion.div
          key={i}
          className="absolute text-2xl opacity-20"
          style={{ left: `${10 + (i * 9)}%`, top: `${20 + (i * 7)}%` }}
          animate={{ y: [-20, -120, -20], opacity: [0.1, 0.3, 0.1], rotate: [0, 360] }}
          transition={{ duration: 4 + i * 0.7, repeat: Infinity, delay: i * 0.5, ease: "easeInOut" }}
        >
          {item}
        </motion.div>
      ))}
    </div>
  );
};

const DeclineScreen = ({ onBack }: { onBack: () => void }) => {
  const emojis = ["⚽", "🎓", "🌟", "✨", "🎉", "💫", "🏆", "❤️"];
  return (
    <motion.div
      className="min-h-screen relative flex flex-col items-center justify-center px-6 text-center overflow-hidden"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
      style={{ background: "linear-gradient(135deg, #0f0f0f 0%, #1a1a2e 50%, #0f0f0f 100%)" }}
    >
      {emojis.map((emoji, i) => (
        <motion.div
          key={i}
          className="absolute text-4xl pointer-events-none"
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: [0, 1, 0], scale: [0, 1.5, 0], x: Math.cos((i / emojis.length) * Math.PI * 2) * 180, y: Math.sin((i / emojis.length) * Math.PI * 2) * 180 }}
          transition={{ delay: i * 0.1, duration: 2, repeat: Infinity, repeatDelay: 1 }}
          style={{ left: "50%", top: "50%" }}
        >
          {emoji}
        </motion.div>
      ))}
      <motion.div className="relative z-10 space-y-6" initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ delay: 0.3, duration: 0.6 }}>
        <motion.p className="text-7xl" animate={{ rotate: [0, -10, 10, -10, 10, 0] }} transition={{ delay: 0.5, duration: 0.8 }}>😢</motion.p>
        <h2 className="font-heading text-3xl font-extrabold text-white">¡Qué lástima!</h2>
        <p className="text-white/60 text-lg max-w-xs">Te vamos a extrañar, pero esperamos que tengas un día increíble 🌟</p>
        <motion.p className="text-white/40 text-sm" animate={{ opacity: [0.4, 1, 0.4] }} transition={{ duration: 2, repeat: Infinity }}>¡Que te vaya súper bien! ⚽</motion.p>
        <button onClick={onBack} className="inline-block mt-4 px-8 py-3 rounded-full border border-white/20 text-white/60 font-heading text-sm hover:bg-white/10 transition-all duration-300">
          ← Volver al inicio
        </button>
      </motion.div>
    </motion.div>
  );
};

const RunAwayButton = ({ onDecline }: { onDecline: () => void }) => {
  const [pos, setPos] = useState({ x: 0, y: 0 });
  const [clicks, setClicks] = useState(0);

  const runAway = () => {
    const x = (Math.random() - 0.5) * 300;
    const y = (Math.random() - 0.5) * 200;
    setPos({ x, y });
    setClicks(c => c + 1);
  };

  return (
    <motion.button
      onClick={clicks > 4 ? onDecline : runAway}
      onHoverStart={runAway}
      animate={{ x: pos.x, y: pos.y }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
      className="px-8 py-4 rounded-2xl border border-white/20 text-white/60 font-heading font-semibold text-sm"
    >
      {clicks > 4 ? "😢 Está bien..." : "❌ No puedo ir"}
    </motion.button>
  );
};

const RsvpChoice = ({ onAccept, onDecline }: { onAccept: () => void; onDecline: () => void }) => {
  const { timeLeft, expired } = useCountdown();
  return (
    <motion.div
      className="w-full text-center space-y-8"
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.3, duration: 0.6 }}
    >
      <div className="space-y-2">
        <h3 className="font-heading text-3xl font-extrabold text-white">¿Vas a venir? 🎓</h3>
        <p className="text-white/50 text-sm">Confirma tu asistencia antes del 7 de junio</p>
      </div>
      {!expired && (
        <div className="flex justify-center gap-2">
          {[
            [timeLeft.days, "Días"],
            [timeLeft.hours, "Horas"],
            [timeLeft.minutes, "Min"],
            [timeLeft.seconds, "Seg"],
          ].map(([val, label], i) => (
            <div key={String(label)} className="flex items-center gap-2">
              <div className="bg-white/10 backdrop-blur-sm border border-white/20 text-white rounded-2xl px-3 py-3 min-w-[60px] text-center">
                <p className="font-heading text-2xl font-bold">{String(val).padStart(2, "0")}</p>
                <p className="text-xs uppercase tracking-wider opacity-50 mt-1">{label}</p>
              </div>
              {i < 3 && <span className="font-heading text-xl font-bold text-white/30 mb-3">:</span>}
            </div>
          ))}
        </div>
      )}
      <div className="flex flex-col items-center gap-6 pt-2">
        <motion.button
          onClick={onAccept}
          className="w-full px-8 py-5 rounded-2xl font-heading font-extrabold text-lg shadow-lg text-white"
          style={{ background: "linear-gradient(135deg, #22c55e, #16a34a)" }}
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.97 }}
        >
          ✅ ¡Sí voy! 🎉
        </motion.button>
        <RunAwayButton onDecline={onDecline} />
      </div>
    </motion.div>
  );
};

const Index = () => {
  const [step, setStep] = useState(0);
  const [declined, setDeclined] = useState(false);

  if (declined) return <DeclineScreen onBack={() => { setDeclined(false); setStep(0); }} />;

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
          <motion.section key="details" {...fade} className="min-h-screen relative px-6 py-20 flex items-center justify-center overflow-hidden">
            <div className="absolute inset-0" style={{ background: "linear-gradient(135deg, #0a0a1a 0%, #0d1b2a 50%, #0a0a1a 100%)" }} />
            <FloatingParticles />
            <div className="absolute inset-0" style={{ background: "radial-gradient(ellipse at center, rgba(59,130,246,0.08) 0%, transparent 70%)" }} />
            <motion.div className="relative z-10 max-w-md w-full mx-auto space-y-8" initial="hidden" animate="visible">
              <motion.div className="flex flex-col sm:flex-row items-center gap-8 w-full" variants={fadeUp} custom={0}>
                <div className="flex-shrink-0">
                  <div className="relative">
                    <div className="absolute inset-0 rounded-full" style={{ background: "rgba(59,130,246,0.3)", filter: "blur(12px)" }} />
                    <img src={santiagoImg} alt="Santiago" className="relative w-44 h-44 object-cover rounded-full shadow-xl border-4 border-blue-500/50" />
                  </div>
                </div>
                <div className="text-center sm:text-left space-y-3">
                  <p className="text-white/40 text-xs uppercase tracking-widest">Están invitados a la</p>
                  <h2 className="font-heading text-3xl font-extrabold leading-tight text-white">Graduación de<br />Santiago Luvianos</h2>
                  <div className="space-y-1 pt-2">
                    <p className="font-heading text-lg font-semibold text-white/80">Sábado, 13 de Junio</p>
                    <p className="font-heading text-lg font-semibold text-white/80">3:30 PM</p>
                    <p className="font-heading text-lg font-semibold text-white/80">10069 Liberty Road</p>
                    <p className="font-heading text-lg font-semibold text-white/80">Galt, CA</p>
                  </div>
                </div>
              </motion.div>
              <motion.div className="text-center px-6 py-5 rounded-2xl w-full" style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)" }} variants={fadeUp} custom={1}>
                <p className="text-base leading-relaxed text-white/60">
                  Póngase su camiseta de fútbol favorita y acompáñanos a celebrar un nuevo capítulo en la vida de Santiago ⚽
                </p>
              </motion.div>
              <motion.button onClick={() => setStep(2)} className="w-full px-12 py-4 rounded-full font-heading font-bold text-base shadow-lg hover:scale-105 transition-all duration-300 text-white" style={{ background: "linear-gradient(135deg, #3b82f6, #1d4ed8)" }} variants={fadeUp} custom={2} whileTap={{ scale: 0.97 }}>
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
              <RsvpChoice onAccept={() => setStep(3)} onDecline={() => setDeclined(true)} />
            </div>
          </motion.section>
        )}

        {step === 3 && (
          <motion.section key="confirmed" {...fade} className="min-h-screen relative px-6 py-20 flex items-center justify-center overflow-hidden">
            <div className="absolute inset-0" style={{ background: "linear-gradient(135deg, #0a0a1a 0%, #0d1b2a 50%, #0a0a1a 100%)" }} />
            <FloatingParticles />
            <motion.div className="relative z-10 max-w-md w-full mx-auto text-center space-y-8" initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
              <motion.p className="text-6xl" animate={{ rotate: [0, -10, 10, -10, 0], scale: [1, 1.3, 1] }} transition={{ duration: 0.8 }}>🎉</motion.p>
              <div>
                <h2 className="font-heading text-3xl font-extrabold text-white">¡Nos vemos ahí!</h2>
                <p className="text-white/50 text-sm mt-2">Santiago está emocionado de verte 🎓⚽</p>
              </div>
              <div className="rounded-2xl p-6 space-y-3 text-left" style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)" }}>
                <p className="text-white/80 text-sm font-semibold font-heading">📱 Confirma por mensaje de texto:</p>
                <a href={"sms:209-663-3948"} className="inline-flex items-center justify-center gap-2 w-full px-6 py-3 rounded-full font-heading font-bold text-sm text-white" style={{ background: "linear-gradient(135deg, #22c55e, #16a34a)" }}>
                  💬 Enviar texto al 209-663-3948
                </a>
                <p className="text-white/40 text-xs text-center">Confirma con Esmeralda Luvianos antes del 7 de junio</p>
              </div>
              <Link to="/gifts" className="inline-block w-full px-8 py-4 rounded-2xl font-heading font-semibold text-base text-white transition-all duration-300 hover:scale-105" style={{ background: "linear-gradient(135deg, #f5c518, #d4a017)" }}>
                🎁 Ver ideas de regalo →
              </Link>
              <button onClick={() => setStep(0)} className="text-xs text-white/30 underline">
                Volver al inicio
              </button>
            </motion.div>
          </motion.section>
        )}

      </AnimatePresence>
    </div>
  );
};

export default Index;
