import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const SUPABASE_URL = "https://yhvxzbrmzjervjhokcao.supabase.co";
const SUPABASE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inlodnh6YnJtemplcnZqaG9rY2FvIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzYwMTY0NDcsImV4cCI6MjA5MTU5MjQ0N30.wSbgfeDgexQEiSVZE2Xc2iQfvxf3emEY37VzQYzO3-o";

const styles = `
  @import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&family=DM+Sans:wght@300;400;500&display=swap');
  .welcome-root { min-height:100vh; font-family:'DM Sans',sans-serif; display:flex; align-items:center; justify-content:center; overflow:hidden; position:relative; }
  .video-bg { position:fixed; inset:0; width:100%; height:100%; object-fit:cover; z-index:0; }
  .video-overlay { position:fixed; inset:0; background:linear-gradient(to bottom, rgba(0,0,0,0.55) 0%, rgba(0,0,0,0.4) 50%, rgba(0,0,0,0.7) 100%); z-index:1; pointer-events:none; }
  .video-vignette { position:fixed; inset:0; background:radial-gradient(ellipse at center, transparent 40%, rgba(0,0,0,0.7) 100%); z-index:1; pointer-events:none; }
  .orb { position:fixed; border-radius:50%; filter:blur(90px); opacity:0.15; animation:drift 10s ease-in-out infinite alternate; pointer-events:none; z-index:2; }
  .orb1 { width:380px; height:380px; background:#ffffff; top:-80px; left:-80px; animation-delay:0s; opacity:0.06; }
  .orb2 { width:300px; height:300px; background:#ffffff; bottom:-60px; right:-60px; animation-delay:-5s; opacity:0.06; }
  .orb3 { width:200px; height:200px; background:#ffffff; bottom:25%; right:10%; animation-delay:-3s; opacity:0.04; }
  @keyframes drift { 0%{transform:translate(0,0) scale(1);} 100%{transform:translate(25px,20px) scale(1.1);} }
  .confetti-piece { display:none; }
  .ball-float { position:fixed; pointer-events:none; animation:floatBall linear infinite; z-index:2; opacity:0; }
  @keyframes floatBall { 0%{transform:translateY(110vh) rotate(0deg);opacity:0;} 8%{opacity:0.25;} 92%{opacity:0.1;} 100%{transform:translateY(-10vh) rotate(360deg);opacity:0;} }
  .w-container { position:relative; z-index:3; width:100%; max-width:500px; padding:2rem; }
  .scorebar { display:flex; align-items:stretch; justify-content:center; margin-bottom:1.6rem; border-radius:14px; overflow:hidden; border:1px solid rgba(255,255,255,0.08); background:rgba(0,0,0,0.25); backdrop-filter:blur(20px); animation:fadeDown 0.6s cubic-bezier(0.22,1,0.36,1) 0.1s both; }
  .score-team { flex:1; display:flex; flex-direction:column; align-items:center; justify-content:center; padding:10px 12px; gap:2px; }
  .score-team.barca { background:linear-gradient(135deg,rgba(165,0,68,0.22),rgba(0,77,152,0.22)); }
  .score-team.opp { background:rgba(255,255,255,0.03); }
  .team-name { font-size:10px; text-transform:uppercase; letter-spacing:0.12em; color:rgba(255,255,255,0.45); font-weight:500; }
  .team-score { font-family:'Bebas Neue',sans-serif; font-size:2.2rem; line-height:1; color:#fff; letter-spacing:0.05em; }
  .score-team.barca .team-score { color:#edbb00; text-shadow:0 0 18px rgba(237,187,0,0.4); }
  .score-mid { display:flex; flex-direction:column; align-items:center; justify-content:center; padding:8px 14px; gap:3px; border-left:1px solid rgba(255,255,255,0.07); border-right:1px solid rgba(255,255,255,0.07); }
  .score-status { font-size:9px; text-transform:uppercase; letter-spacing:0.14em; font-weight:600; padding:2px 8px; border-radius:99px; background:rgba(255,255,255,0.08); color:rgba(255,255,255,0.4); }
  .score-vs { font-size:10px; color:rgba(255,255,255,0.25); letter-spacing:0.1em; margin-top:2px; }
  .score-date { font-size:9px; color:rgba(255,255,255,0.25); letter-spacing:0.06em; }
  .w-h1 { font-family:'Bebas Neue',sans-serif; font-size:clamp(3rem,12vw,5rem); line-height:0.92; color:#f8f0ff; text-align:center; margin-bottom:0.3rem; letter-spacing:0.03em; animation:fadeUp 0.7s cubic-bezier(0.22,1,0.36,1) 0.24s both; }
  .w-h1 span { color:#ffed02; text-shadow:0 0 28px rgba(255,237,2,0.45); }
  .w-sub { text-align:center; font-size:13px; color:rgba(255,255,255,0.5); margin-bottom:2rem; letter-spacing:0.04em; animation:fadeUp 0.6s cubic-bezier(0.22,1,0.36,1) 0.36s both; }
  .w-card { background:rgba(0,0,0,0.5); border:1px solid rgba(255,255,255,0.08); border-radius:20px; padding:2rem 1.75rem; backdrop-filter:blur(24px); position:relative; overflow:hidden; animation:cardIn 0.8s cubic-bezier(0.22,1,0.36,1) 0.46s both; }
  .w-card::before { content:''; position:absolute; top:0; left:0; right:0; height:2px; background:linear-gradient(90deg,transparent,#a30042 30%,#004fa8 70%,transparent); }
  .jersey-deco { display:none; }
  @keyframes cardIn { from{opacity:0;transform:translateY(28px) scale(0.97);} to{opacity:1;transform:translateY(0) scale(1);} }
  @keyframes fadeUp { from{opacity:0;transform:translateY(20px);} to{opacity:1;transform:translateY(0);} }
  @keyframes fadeDown { from{opacity:0;transform:translateY(-16px);} to{opacity:1;transform:translateY(0);} }
  .name-row { display:grid; grid-template-columns:1fr 1fr; gap:14px; margin-bottom:1.5rem; }
  .w-field { display:flex; flex-direction:column; gap:7px; position:relative; }
  .w-field label { font-size:10px; text-transform:uppercase; letter-spacing:0.16em; color:rgba(255,255,255,0.35); font-weight:500; }
  .w-field input { background:rgba(255,255,255,0.05); border:1px solid rgba(255,255,255,0.1); border-radius:10px; padding:13px 16px; font-size:16px; font-weight:500; color:#fff; font-family:'DM Sans',sans-serif; outline:none; width:100%; transition:border-color 0.25s,background 0.25s,box-shadow 0.25s; }
  .w-field input::placeholder { color:rgba(255,255,255,0.2); font-weight:400; }
  .w-field input:focus { border-color:rgba(163,0,66,0.7); background:rgba(163,0,66,0.07); box-shadow:0 0 0 4px rgba(163,0,66,0.12); }
  .w-btn { width:100%; padding:16px; border-radius:12px; border:none; background:linear-gradient(135deg,#a50044 0%,#004d98 100%); color:#fff; font-family:'Bebas Neue',sans-serif; font-size:22px; letter-spacing:0.12em; cursor:pointer; position:relative; overflow:hidden; transition:transform 0.15s,box-shadow 0.2s; box-shadow:0 4px 28px rgba(165,0,68,0.4); }
  .w-btn:hover { transform:translateY(-3px); box-shadow:0 10px 36px rgba(163,0,66,0.55); }
  .w-btn:active { transform:scale(0.97); }
  .btn-inner { display:flex; align-items:center; justify-content:center; gap:10px; }
  .error-input { border-color:rgba(255,215,0,0.8) !important; box-shadow:0 0 0 4px rgba(255,215,0,0.12) !important; }
  .success-msg { display:flex; flex-direction:column; align-items:center; gap:12px; padding:1.5rem 0 0.5rem; animation:fadeUp 0.5s ease forwards; text-align:center; }
  .success-icon { font-size:52px; animation:popIn 0.6s cubic-bezier(0.34,1.56,0.64,1) forwards; }
  @keyframes popIn { 0%{transform:scale(0) rotate(-20deg);opacity:0;} 100%{transform:scale(1) rotate(0deg);opacity:1;} }
  .success-name { font-family:'Bebas Neue',sans-serif; font-size:2.6rem; color:#ffd700; letter-spacing:0.05em; line-height:1; text-shadow:0 0 20px rgba(255,215,0,0.4); }
  .success-sub { font-size:13px; color:rgba(255,255,255,0.4); letter-spacing:0.04em; }
`;

const Particles = () => {
  const colors = ["#a30042","#004fa8","#ffd700","#ffffff","#c8a0e0"];
  const confetti = Array.from({ length: 18 }, (_, i) => ({
    id: i,
    left: `${(i * 5.8 + 3) % 100}vw`,
    width: `${6 + (i % 5)}px`,
    height: `${6 + (i % 4)}px`,
    background: colors[i % colors.length],
    duration: `${7 + (i % 6)}s`,
    delay: `${(i * 0.8) % 12}s`,
    borderRadius: i % 2 === 0 ? "50%" : "2px",
  }));
  const balls = Array.from({ length: 5 }, (_, i) => ({
    id: i,
    left: `${10 + i * 18}vw`,
    duration: `${12 + i * 2}s`,
    delay: `${i * 3}s`,
    fontSize: `${16 + i * 4}px`,
  }));
  return (
    <>
      {confetti.map((c) => (
        <div key={c.id} className="confetti-piece" style={{ left: c.left, width: c.width, height: c.height, background: c.background, animationDuration: c.duration, animationDelay: c.delay, borderRadius: c.borderRadius }} />
      ))}
      {balls.map((b) => (
        <div key={b.id} className="ball-float" style={{ left: b.left, animationDuration: b.duration, animationDelay: b.delay, fontSize: b.fontSize }}>
          ⚽
        </div>
      ))}
    </>
  );
};

const Welcome = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [errors, setErrors] = useState({ first: false, last: false });
  const navigate = useNavigate();

  useEffect(() => {
    if (success) {
      const timer = setTimeout(() => navigate("/invite"), 2000);
      return () => clearTimeout(timer);
    }
  }, [success, navigate]);

  const handleSubmit = async () => {
    const hasFirst = firstName.trim().length > 0;
    const hasLast = lastName.trim().length > 0;
    if (!hasFirst || !hasLast) {
      setErrors({ first: !hasFirst, last: !hasLast });
      setTimeout(() => setErrors({ first: false, last: false }), 1800);
      return;
    }
    setLoading(true);
    try {
      const fullName = firstName.trim() + " " + lastName.trim();
      const device = navigator.userAgent.includes("Mobile") ? "Mobile" : "Desktop";
      await fetch(SUPABASE_URL + "/rest/v1/visitors", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "apikey": SUPABASE_KEY,
          "Authorization": "Bearer " + SUPABASE_KEY,
        },
        body: JSON.stringify({ name: fullName, device }),
      });
      localStorage.setItem("visitorName", fullName);
      setSuccess(true);
    } catch {
      setLoading(false);
    }
  };

  return (
    <div className="welcome-root">
      <style>{styles}</style>
      <video className="video-bg" src="./hero.mp4" autoPlay muted loop playsInline />
      <div className="video-overlay" />
      <div className="video-vignette" />
      <div className="orb orb1" />
      <div className="orb orb2" />
      <div className="orb orb3" />
      <Particles />
      <div className="w-container">
        <div className="scorebar">
          <div className="score-team barca">
            <span className="team-name">FC Barcelona</span>
            <span className="team-score">4</span>
          </div>
          <div className="score-mid">
            <span className="score-status">Final</span>
            <span className="score-vs">vs</span>
            <span className="score-date">11 Abr · La Liga</span>
          </div>
          <div className="score-team opp">
            <span className="team-name">Espanyol</span>
            <span className="team-score">1</span>
          </div>
        </div>
        <h1 className="w-h1">UNETE AL<br /><span>EQUIPO</span></h1>
        <p className="w-sub">Dinos quien eres, culer</p>
        <div className="w-card">
          <div className="jersey-deco">10</div>
          {!success ? (
            <>
              <div className="name-row">
                <div className="w-field">
                  <label>Nombre</label>
                  <input
                    type="text"
                    placeholder="Lionel"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    className={errors.first ? "error-input" : ""}
                    onKeyDown={(e) => e.key === "Enter" && handleSubmit()}
                  />
                </div>
                <div className="w-field">
                  <label>Apellido</label>
                  <input
                    type="text"
                    placeholder="Messi"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                    className={errors.last ? "error-input" : ""}
                    onKeyDown={(e) => e.key === "Enter" && handleSubmit()}
                  />
                </div>
              </div>
              <button className="w-btn" onClick={handleSubmit} disabled={loading}>
                <div className="btn-inner">
                  <span>{loading ? "Cargando..." : "Entrar al Campo"}</span>
                  <span>⚽</span>
                </div>
              </button>
            </>
          ) : (
            <div className="success-msg">
              <div className="success-icon">🎉</div>
              <div className="success-name">{firstName} {lastName}</div>
              <div className="success-sub">Estas en el equipo — nos vemos en el campo!</div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Welcome;
