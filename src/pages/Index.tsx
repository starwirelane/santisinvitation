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
        <p className="font-heading text-3xl font-bold text-white">{timeLeft.days}</p>
        <div className="border-t border-white/30 mt-1 pt-1">
          <p className="text-white/50 text-[10px] uppercase tracking-widest">Days left</p>
        </div>
      </div>
      <div className="text-center">
        <p className="font-heading text-3xl font-bold text-white">{timeLeft.hours}</p>
        <div className="border-t border-white/30 mt-1 pt-1">
          <p className="text-white/50 text-[10px] uppercase tracking-widest">Hours left</p>
        </div>
      </div>
    </motion.div>
  );
};

const FloatingParticles = ({ emojis = ["⚽","✨","⭐","💫","🌟","🎓"], count = 10 }) => (
  <div className="absolute inset-0 overflow-hidden pointer-events-none">
    {Array.from({ length: count }).map((_, i) => (
      <motion.div
        key={i}
        className="absolute select-none text-lg"
        style={{ left: `${(i * 10 + 5) % 100}%`, top: `${(i * 13 + 5) % 100}%`, opacity: 0.08 }}
        animate={{ y: [-20, -140, -20], opacity: [0.05, 0.15, 0.05], rotate: [0, i % 2 === 0 ? 360 : -360, 0] }}
        transition={{ duration: 5 + i * 0.6, repeat: Infinity, delay: i * 0.5, ease: "easeInOut" }}
      >
        {emojis[i % emojis.length]}
      </motion.div>
    ))}
  </div>
);

const GlowOrbs = ({ colors = ["rgba(59,130,246,0.15)", "rgba(99,102,241,0.12)", "rgba(245,197,24,0.08)"] }) => (
  <div className="absolute inset-0 overflow-hidden pointer-events-none">
    {colors.map((color, i) => (
      <motion.div
        key={i}
        className="absolute w-96 h-96 rounded-full"
        style={{
          background: `radial-gradient(circle, ${color} 0%, transparent 70%)`,
          top: i === 0 ? "-10%" : i === 1 ? "60%" : "30%",
          left: i === 0 ? "-10%" : i === 1 ? "60%" : "40%",
        }}
        animate={{ scale: [1, 1.4, 1], opacity: [0.4, 1, 0.4] }}
        transition={{ duration: 4 + i * 1.5, repeat: Infinity, ease: "easeInOut", delay: i * 0.8 }}
      />
    ))}
  </div>
);

const Confetti = () => {
  const colors = ["#f5c518", "#22c55e", "#3b82f6", "#ec4899", "#ffffff", "#f97316", "#a855f7"];
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {Array.from({ length: 40 }).map((_, i) => (
        <motion.div
          key={i}
          className="absolute rounded-sm"
          style={{
            width: `${4 + (i % 4)}px`,
            height: `${4 + (i % 3)}px`,
            background: colors[i % colors.length],
            left: `${(i * 2.5) % 100}%`,
            top: "-5%",
          }}
          animate={{
            y: ["0vh", "105vh"],
            x: [0, (i % 2 === 0 ? 1 : -1) * (15 + (i % 5) * 10)],
            rotate: [0, (i % 2 === 0 ? 1 : -1) * 360],
            opacity: [1, 1, 0],
          }}
          transition={{
            duration: 2.5 + (i * 0.08),
            delay: i * 0.06,
            ease: "easeIn",
            repeat: Infinity,
            repeatDelay: 2,
          }}
        />
      ))}
    </div>
  );
};

const DeclineScreen = ({ onBack }: { onBack: () => void }) => {
  const emojis = ["⚽", "🎓", "🌟", "✨", "🎉", "💫", "🏆", "❤️"];
  return (
    <motion.div
      className="min-h-screen relative flex flex-col items-center justify-center px-6 text-center overflow-hidden"
      initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.6 }}
      style={{ background: "linear-gradient(135deg, #0a0a1a 0%, #0d1b2a 50%, #0a0a1a 100%)" }}
    >
      <GlowOrbs colors={["rgba(239,68,68,0.12)", "rgba(99,102,241,0.1)", "rgba(59,130,246,0.08)"]} />
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
        <h2 className="font-heading text-3xl font-extrabold text-white">¡Que lastima!</h2>
        <p className="text-white/60 text-lg max-w-xs">Te vamos a extranar, pero esperamos que tengas un dia increible 🌟</p>
        <motion.p className="text-white/40 text-sm" animate={{ opacity: [0.4, 1, 0.4] }} transition={{ duration: 2, repeat: Infinity }}>¡Que te vaya super bien! ⚽</motion.p>
        <button onClick={onBack} className="inline-block mt-4 px-8 py-3 rounded-full border border-white/20 text-white/60 font-heading text-sm hover:bg-white/10 transition-all duration-300">
          Volver al inicio
        </button>
      </motion.div>
    </motion.div>
  );
};

const RunAwayButton = ({ onDecline }: { onDecline: () => void }) => {
  const [pos, setPos] = useState({ x: 0, y: 0 });
  const [clicks, setClicks] = useState(0);
  const runAway = () => {
    setPos({ x: (Math.random() - 0.5) * 300, y: (Math.random() - 0.5) * 200 });
    setClicks(c => c + 1);
  };
  return (
    <motion.button
      onClick={clicks > 4 ? onDecline : runAway}
      onHoverStart={runAway}
      animate={{ x: pos.x, y: pos.y }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
      className="px-8 py-4 rounded-2xl border border-white/20 text-white/60 font-heading font-semibold text-sm hover:bg-white/10"
    >
      {clicks > 4 ? "😢 Esta bien..." : "❌ No puedo ir"}
    </motion.button>
  );
};

const RsvpChoice = ({ onAccept, onDecline }: { onAccept: () => void; onDecline: () => void }) => {
  const { timeLeft, expired } = useCountdown();
  return (
    <motion.div className="w-full text-center space-y-8" initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3, duration: 0.6 }}>
      <div className="space-y-2">
        <h3 className="font-heading text-3xl font-extrabold text-white">¿Vas a venir? 🎓</h3>
        <p className="text-white/50 text-sm">Confirma tu asistencia antes del 7 de junio</p>
      </div>
      {!expired && (
        <div className="relative">
          <motion.div
            className="absolute inset-0 rounded-3xl"
            style={{ background: "radial-gradient(ellipse, rgba(59,130,246,0.35) 0%, transparent 70%)", filter: "blur(24px)" }}
            animate={{ opacity: [0.4, 1, 0.4], scale: [0.9, 1.05, 0.9] }}
            transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
          />
          <div className="relative flex justify-center gap-2">
            {[
              [timeLeft.days, "Dias"],
              [timeLeft.hours, "Horas"],
              [timeLeft.minutes, "Min"],
              [timeLeft.seconds, "Seg"],
            ].map(([val, label], i) => (
              <div key={String(label)} className="flex items-center gap-2">
                <div className="text-white rounded-2xl px-3 py-3 min-w-[60px] text-center" style={{ background: "rgba(255,255,255,0.08)", border: "1px solid rgba(255,255,255,0.15)", backdropFilter: "blur(12px)" }}>
                  <p className="font-heading text-2xl font-bold">{String(val).padStart(2, "0")}</p>
                  <p className="text-xs uppercase tracking-wider opacity-50 mt-1">{label}</p>
                </div>
                {i < 3 && <span className="font-heading text-xl font-bold text-white/30 mb-3">:</span>}
              </div>
            ))}
          </div>
        </div>
      )}
      <div className="flex flex-col items-center gap-6 pt-2">
        <motion.button
          onClick={onAccept}
          className="w-full px-8 py-5 rounded-2xl font-heading font-extrabold text-lg text-white"
          style={{ background: "linear-gradient(135deg, #22c55e, #16a34a)", boxShadow: "0 0 25px rgba(34,197,94,0.35)" }}
          whileHover={{ scale: 1.03, boxShadow: "0 0 45px rgba(34,197,94,0.6)" }}
          whileTap={{ scale: 0.97 }}
        >
          ✅ ¡Si voy! 🎉
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
            <motion.div
              className="absolute inset-0"
              animate={{ scale: [1, 1.08, 1] }}
              transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
            >
              <img src={heroBg} alt="" className="w-full h-full object-cover" width={1280} height={1920} />
            </motion.div>
            <div className="absolute inset-0" style={{ background: "linear-gradient(to bottom, rgba(0,0,0,0.55) 0%, rgba(0,0,0,0.35) 50%, rgba(0,0,0,0.7) 100%)" }} />
            <FloatingParticles emojis={["⚽","✨","⭐","💫"]} count={8} />
            <HeroCountdown />
            <div className="relative z-10 flex flex-col items-center">
              <motion.p className="text-white/50 text-xs font-heading tracking-[0.3em] uppercase mb-8" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2, duration: 0.8 }}>
                Invitacion especial
              </motion.p>
              <motion.h1 className="font-heading text-5xl sm:text-6xl md:text-7xl font-extrabold leading-none text-white" initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.3, duration: 0.8 }}>
                ¡HAS SIDO
              </motion.h1>
              <motion.h1 className="font-heading text-6xl sm:text-7xl md:text-8xl font-extrabold leading-none text-primary mt-1" initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.5, duration: 0.8 }}>
                INVITADO!
              </motion.h1>
              <motion.p className="mt-6 text-white/70 text-lg sm:text-xl font-heading font-light max-w-xs text-center" initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.8, duration: 0.6 }}>
                A la Graduacion de Santiago 🎓⚽
              </motion.p>
              <motion.p className="mt-2 text-white/40 text-base" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1, duration: 0.6 }}>
                Sabado, 13 de Junio · 3:30 PM
              </motion.p>
              <motion.button
                onClick={() => setStep(1)}
                className="mt-10 px-12 py-4 rounded-full font-heading font-bold text-base bg-primary text-primary-foreground"
                initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1.4, duration: 0.6 }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.97 }}
              >
                Abrir invitacion
              </motion.button>
            </div>
          </motion.section>
        )}

        {step === 1 && (
          <motion.section key="details" {...fade} className="min-h-screen relative px-6 py-20 flex items-center justify-center overflow-hidden" style={{ background: "linear-gradient(135deg, #0a0a1a 0%, #0d1b2a 60%, #0a0a1a 100%)" }}>
            <GlowOrbs colors={["rgba(59,130,246,0.18)", "rgba(99,102,241,0.14)", "rgba(59,130,246,0.1)"]} />
            <FloatingParticles emojis={["⚽","🌟","✨","🎓","💫","⭐"]} count={12} />
            <motion.div className="relative z-10 max-w-md w-full mx-auto space-y-8" initial="hidden" animate="visible">
              <motion.div className="flex flex-col sm:flex-row items-center gap-8 w-full" variants={fadeUp} custom={0}>
                <div className="flex-shrink-0 relative">
                  <motion.div
                    className="absolute inset-0 rounded-full"
                    style={{ background: "rgba(59,130,246,0.4)", filter: "blur(16px)" }}
                    animate={{ opacity: [0.4, 0.9, 0.4], scale: [0.9, 1.15, 0.9] }}
                    transition={{ duration: 3, repeat: Infinity }}
                  />
                  <img src={santiagoImg} alt="Santiago" className="relative w-44 h-44 object-cover rounded-full shadow-xl" style={{ border: "3px solid rgba(99,102,241,0.5)" }} />
                </div>
                <div className="text-center sm:text-left space-y-3">
                  <p className="text-white/40 text-xs uppercase tracking-widest">Estan invitados a la</p>
                  <h2 className="font-heading text-3xl font-extrabold leading-tight text-white">Graduacion de<br />Santiago Luvianos</h2>
                  <div className="space-y-1 pt-2">
                    {["Sabado, 13 de Junio", "3:30 PM", "10069 Liberty Road", "Galt, CA"].map((line) => (
                      <p key={line} className="font-heading text-lg font-semibold text-white/80">{line}</p>
                    ))}
                  </div>
                </div>
              </motion.div>
              <motion.div
                className="text-center px-6 py-5 rounded-2xl w-full"
                style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)", backdropFilter: "blur(16px)" }}
                variants={fadeUp} custom={1}
              >
                <p className="text-base leading-relaxed text-white/60">
                  Pongase su camiseta de futbol favorita y acompananos a celebrar un nuevo capitulo en la vida de Santiago ⚽
                </p>
              </motion.div>
              <motion.button
                onClick={() => setStep(2)}
                className="w-full px-12 py-4 rounded-full font-heading font-bold text-base text-white transition-all duration-300"
                style={{ background: "linear-gradient(135deg, #3b82f6, #1d4ed8)", boxShadow: "0 0 25px rgba(59,130,246,0.4)" }}
                variants={fadeUp} custom={2}
                whileHover={{ scale: 1.03, boxShadow: "0 0 45px rgba(59,130,246,0.6)" }}
                whileTap={{ scale: 0.97 }}
              >
                ✅ Confirmar RSVP
              </motion.button>
            </motion.div>
          </motion.section>
        )}

        {step === 2 && (
          <motion.section key="rsvp" {...fade} className="min-h-screen relative px-6 py-20 flex items-center justify-center overflow-hidden">
            <div className="absolute inset-0">
              <img src={fieldTexture} alt="" className="w-full h-full object-cover" />
              <div className="absolute inset-0 bg-black/65 backdrop-blur-sm" />
            </div>
            <GlowOrbs colors={["rgba(34,197,94,0.15)", "rgba(59,130,246,0.12)", "rgba(34,197,94,0.08)"]} />
            <div className="relative z-10 max-w-md w-full mx-auto space-y-8">
              <RsvpChoice onAccept={() => setStep(3)} onDecline={() => setDeclined(true)} />
            </div>
          </motion.section>
        )}

        {step === 3 && (
          <motion.section key="confirmed" {...fade} className="min-h-screen relative px-6 py-20 flex items-center justify-center overflow-hidden" style={{ background: "linear-gradient(135deg, #0a0a1a 0%, #0d1b2a 50%, #0a0a1a 100%)" }}>
            <GlowOrbs colors={["rgba(245,197,24,0.15)", "rgba(34,197,94,0.12)", "rgba(245,197,24,0.08)"]} />
            <Confetti />
            <motion.div className="relative z-10 max-w-md w-full mx-auto text-center space-y-8" initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
              <motion.p className="text-6xl" animate={{ rotate: [0, -15, 15, -15, 0], scale: [1, 1.4, 1] }} transition={{ duration: 0.8, repeat: 2 }}>🎉</motion.p>
              <div>
                <h2 className="font-heading text-3xl font-extrabold text-white">¡Nos vemos ahi!</h2>
                <p className="text-white/50 text-sm mt-2">Santiago esta emocionado de verte 🎓⚽</p>
              </div>
              <div className="rounded-2xl p-6 space-y-3 text-left" style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.12)", backdropFilter: "blur(16px)" }}>
                <p className="text-white/80 text-sm font-semibold font-heading">📱 Confirma por mensaje de texto:</p>
                <a href={"sms:209-663-3948"} className="inline-flex items-center justify-center gap-2 w-full px-6 py-3 rounded-full font-heading font-bold text-sm text-white" style={{ background: "linear-gradient(135deg, #22c55e, #16a34a)", boxShadow: "0 0 20px rgba(34,197,94,0.4)" }}>
                  💬 Enviar texto al 209-663-3948
                </a>
                <p className="text-white/40 text-xs text-center">Confirma con Esmeralda Luvianos antes del 7 de junio</p>
              </div>
              <Link
                to="/gifts"
                className="inline-block w-full px-8 py-4 rounded-2xl font-heading font-semibold text-base transition-all duration-300"
                style={{ background: "linear-gradient(135deg, #f5c518, #d4a017)", color: "#0a0a0a", boxShadow: "0 0 25px rgba(245,197,24,0.35)" }}
              >
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
