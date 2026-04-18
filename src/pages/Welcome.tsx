import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const SUPABASE_URL = "https://yhvxzbrmzjervjhokcao.supabase.co";
const SUPABASE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inlodnh6YnJtemplcnZqaG9rY2FvIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzYwMTY0NDcsImV4cCI6MjA5MTU5MjQ0N30.wSbgfeDgexQEiSVZE2Xc2iQfvxf3emEY37VzQYzO3-o";
const RAPID_KEY = "9403375f53msh3a2a2ae4b3a62c1p13d123jsnc85e7858fbae";

const styles = `
  @import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&family=DM+Sans:wght@300;400;500&display=swap');
  .welcome-root { min-height:100vh; font-family:'DM Sans',sans-serif; display:flex; align-items:center; justify-content:center; overflow:hidden; position:relative; }
  .video-bg { position:fixed; inset:0; width:100%; height:100%; object-fit:cover; z-index:0; }
  .video-overlay { position:fixed; inset:0; background:linear-gradient(to bottom, rgba(0,0,0,0.55) 0%, rgba(0,0,0,0.4) 50%, rgba(0,0,0,0.7) 100%); z-index:1; pointer-events:none; }
  .video-vignette { position:fixed; inset:0; background:radial-gradient(ellipse at center, transparent 40%, rgba(0,0,0,0.7) 100%); z-index:1; pointer-events:none; }
  .orb { position:fixed; border-radius:50%; filter:blur(90px); animation:drift 10s ease-in-out infinite alternate; pointer-events:none; z-index:2; }
  .orb1 { width:380px; height:380px; background:#a50044; top:-80px; left:-80px; opacity:0.15; }
  .orb2 { width:300px; height:300px; background:#004d98; bottom:-60px; right:-60px; opacity:0.15; animation-delay:-5s; }
  .orb3 { width:200px; height:200px; background:#edbb00; bottom:25%; right:10%; opacity:0.08; animation-delay:-3s; }
  @keyframes drift { 0%{transform:translate(0,0) scale(1);} 100%{transform:translate(25px,20px) scale(1.1);} }
  .ball-float { position:fixed; pointer-events:none; animation:floatBall linear infinite; z-index:2; opacity:0; }
  @keyframes floatBall { 0%{transform:translateY(110vh) rotate(0deg);opacity:0;} 8%{opacity:0.25;} 92%{opacity:0.1;} 100%{transform:translateY(-10vh) rotate(360deg);opacity:0;} }
  .w-container { position:relative; z-index:3; width:100%; max-width:500px; padding:2rem; }
  .scorebar { display:flex; align-items:stretch; justify-content:center; margin-bottom:1.6rem; border-radius:14px; overflow:hidden; border:1px solid rgba(255,255,255,0.08); background:rgba(0,0,0,0.25); backdrop-filter:blur(20px); animation:fadeDown 0.6s cubic-bezier(0.22,1,0.36,1) 0.1s both; }
  .score-team { flex:1; display:flex; flex-direction:column; align-items:center; justify-content:center; padding:10px 12px; gap:2px; }
  .score-team.barca { background:linear-gradient(135deg,rgba(165,0,68,0.22),rgba(0,77,152,0.22)); }
  .score-team.opp { background:rgba(255,255,255,0.03); }
  .team-name { font-size:10px; text-transform:uppercase; letter-spacing:0.12em; color:rgba(255,255,255,0.45); font-weight:500; text-align:center; }
  .team-score { font-family:'Bebas Neue',sans-serif; font-size:2.2rem; line-height:1; color:#fff; letter-spacing:0.05em; }
  .score-team.barca .team-score { color:#edbb00; text-shadow:0 0 18px rgba(237,187,0,0.4); }
  .score-mid { display:flex; flex-direction:column; align-items:center; justify-content:center; padding:8px 14px; gap:3px; border-left:1px solid rgba(255,255,255,0.07); border-right:1px solid rgba(255,255,255,0.07); }
  .score-status { font-size:9px; text-transform:uppercase; letter-spacing:0.14em; font-weight:600; padding:2px 8px; border-radius:99px; background:rgba(255,255,255,0.08); color:rgba(255,255,255,0.4); }
  .score-status.live { background:rgba(219,0,48,0.3); color:#ff6b6b; animation:pulsebg 1.5s infinite; }
  .score-status.upcoming { background:rgba(0,77,152,0.3); color:#60a5fa; }
  @keyframes pulsebg { 0%,100%{opacity:1;} 50%{opacity:0.5;} }
  .live-dot { display:inline-block; width:6px; height:6px; background:#ff6b6b; border-radius:50%; margin-right:4px; vertical-align:middle; animation:pulsebg 1s infinite; }
  .score-vs { font-size:10px; color:rgba(255,255,255,0.25); letter-spacing:0.1em; margin-top:2px; }
  .score-date { font-size:9px; color:rgba(255,255,255,0.25); letter-spacing:0.06em; }
  .w-h1 { font-family:'Bebas Neue',sans-serif; font-size:clamp(3rem,12vw,5rem); line-height:0.92; color:#f8f0ff; text-align:center; margin-bottom:0.3rem; letter-spacing:0.03em; animation:fadeUp 0.7s cubic-bezier(0.22,1,0.36,1) 0.24s both; }
  .w-h1 span { color:#ffed02; text-shadow:0 0 28px rgba(255,237,2,0.45); }
  .w-sub { text-align:center; font-size:13px; color:rgba(255,255,255,0.5); margin-bottom:2rem; letter-spacing:0.04em; animation:fadeUp 0.6s cubic-bezier(0.22,1,0.36,1) 0.36s both; }
  .w-card { background:rgba(0,0,0,0.5); border:1px solid rgba(255,255,255,0.08); border-radius:20px; padding:2rem 1.75rem; backdrop-filter:blur(24px); position:relative; overflow:hidden; animation:cardIn 0.8s cubic-bezier(0.22,1,0.36,1) 0.46s both; }
  .w-card::before { content:''; position:absolute; top:0; left:0; right:0; height:2px; background:linear-gradient(90deg,transparent,#a50044 30%,#004d98 70%,transparent); }
  @keyframes cardIn { from{opacity:0;transform:translateY(28px) scale(0.97);} to{opacity:1;transform:translateY(0) scale(1);} }
  @keyframes fadeUp { from{opacity:0;transform:translateY(20px);} to{opacity:1;transform:translateY(0);} }
  @keyframes fadeDown { from{opacity:0;transform:translateY(-16px);} to{opacity:1;transform:translateY(0);} }
  .name-row { display:grid; grid-template-columns:1fr 1fr; gap:14px; margin-bottom:1.5rem; }
  .w-field { display:flex; flex-direction:column; gap:7px; }
  .w-field label { font-size:10px; text-transform:uppercase; letter-spacing:0.16em; color:rgba(255,255,255,0.35); font-weight:500; }
  .w-field input { background:rgba(255,255,255,0.05); border:1px solid rgba(255,255,255,0.1); border-radius:10px; padding:13px 16px; font-size:16px; font-weight:500; color:#fff; font-family:'DM Sans',sans-serif; outline:none; width:100%; transition:border-color 0.25s,background 0.25s,box-shadow 0.25s; }
  .w-field input::placeholder { color:rgba(255,255,255,0.2); font-weight:400; }
  .w-field input:focus { border-color:rgba(165,0,68,0.7); background:rgba(165,0,68,0.07); box-shadow:0 0 0 4px rgba(165,0,68,0.12); }
  .w-btn { width:100%; padding:16px; border-radius:12px; border:none; background:linear-gradient(135deg,#a50044 0%,#004d98 100%); color:#fff; font-family:'Bebas Neue',sans-serif; font-size:22px; letter-spacing:0.12em; cursor:pointer; transition:transform 0.15s,box-shadow 0.2s; box-shadow:0 4px 28px rgba(165,0,68,0.4); }
  .w-btn:hover { transform:translateY(-3px); box-shadow:0 10px 36px rgba(165,0,68,0.55); }
  .w-btn:active { transform:scale(0.97); }
  .btn-inner { display:flex; align-items:center; justify-content:center; gap:10px; }
  .error-input { border-color:rgba(255,215,0,0.8) !important; box-shadow:0 0 0 4px rgba(255,215,0,0.12) !important; }
  .success-msg { display:flex; flex-direction:column; align-items:center; gap:12px; padding:1.5rem 0 0.5rem; text-align:center; }
  .success-icon { font-size:52px; animation:popIn 0.6s cubic-bezier(0.34,1.56,0.64,1) forwards; }
  @keyframes popIn { 0%{transform:scale(0) rotate(-20deg);opacity:0;} 100%{transform:scale(1) rotate(0deg);opacity:1;} }
  .success-name { font-family:'Bebas Neue',sans-serif; font-size:2.6rem; color:#edbb00; letter-spacing:0.05em; line-height:1; text-shadow:0 0 20px rgba(237,187,0,0.4); }
  .success-sub { font-size:13px; color:rgba(255,255,255,0.4); letter-spacing:0.04em; }
`;

type MatchData = {
  homeTeam: string;
  awayTeam: string;
  homeScore: number | null;
  awayScore: number | null;
  status: "live" | "finished" | "upcoming";
  date: string;
  minute?: string;
};

const ScoreBar = () => {
  const [match, setMatch] = useState<MatchData>({
    homeTeam: "FC Barcelona",
    awayTeam: "Opponent",
    homeScore: null,
    awayScore: null,
    status: "upcoming",
    date: "",
  });

  useEffect(() => {
    const fetchMatch = async () => {
      try {
        const liveRes = await fetch(
          "https://free-api-live-football-data.p.rapidapi.com/football-current-live",
          {
            headers: {
              "x-rapidapi-key": RAPID_KEY,
              "x-rapidapi-host": "free-api-live-football-data.p.rapidapi.com",
            },
          }
        );
        const liveData = await liveRes.json();
        const liveMatches = liveData?.response?.live || [];
        const barcaLive = liveMatches.find((m: any) =>
          m.teams?.home?.name?.toLowerCase().includes("barcelona") ||
          m.teams?.away?.name?.toLowerCase().includes("barcelona")
        );
        if (barcaLive) {
          setMatch({
            homeTeam: barcaLive.teams?.home?.name || "FC Barcelona",
            awayTeam: barcaLive.teams?.away?.name || "Opponent",
            homeScore: barcaLive.goals?.home,
            awayScore: barcaLive.goals?.away,
            status: "live",
            date: "",
            minute: barcaLive.fixture?.status?.elapsed + "'",
          });
          return;
        }

        const res = await fetch(
          "https://free-api-live-football-data.p.rapidapi.com/football-get-all-matches-by-league?leagueid=87",
          {
            headers: {
              "x-rapidapi-key": RAPID_KEY,
              "x-rapidapi-host": "free-api-live-football-data.p.rapidapi.com",
            },
          }
        );
        const data = await res.json();
        const fixtures = data?.response || [];

      const allMatches = data?.response?.matches || [];

        const barcaMatches = allMatches.filter((f: any) =>
          f.home?.name?.toLowerCase().includes("barcelona") ||
          f.away?.name?.toLowerCase().includes("barcelona")
        );

        const finished = barcaMatches
          .filter((f: any) => f.status?.finished === true)
          .sort((a: any, b: any) => new Date(b.status?.utcTime).getTime() - new Date(a.status?.utcTime).getTime())[0];

        if (finished) {
          const d = new Date(finished.status?.utcTime);
          const barcaIsHome = finished.home?.name?.toLowerCase().includes("barcelona");
          setMatch({
            homeTeam: finished.home?.name || "FC Barcelona",
            awayTeam: finished.away?.name || "Opponent",
            homeScore: barcaIsHome ? finished.home?.score : finished.away?.score,
            awayScore: barcaIsHome ? finished.away?.score : finished.home?.score,
            status: "finished",
            date: d.toLocaleDateString("es-ES", { day: "numeric", month: "short" }),
          });
        }
      } catch (e) {
        console.log("Match fetch error:", e);
      }
    };
    fetchMatch();
    const interval = setInterval(fetchMatch, 60000);
    return () => clearInterval(interval);
  }, []);

  const barcaIsHome = match.homeTeam.toLowerCase().includes("barcelona");
  const barcaScore = barcaIsHome ? match.homeScore : match.awayScore;
  const oppName = barcaIsHome ? match.awayTeam : match.homeTeam;
  const oppScore = barcaIsHome ? match.awayScore : match.homeScore;

  return (
    <div className="scorebar">
      <div className="score-team barca">
        <span className="team-name">FC Barcelona</span>
        <span className="team-score">{barcaScore !== null ? barcaScore : "-"}</span>
      </div>
      <div className="score-mid">
        {match.status === "live" && (
          <span className="score-status live">
            <span className="live-dot" />
            {match.minute || "LIVE"}
          </span>
        )}
        {match.status === "finished" && <span className="score-status">Final</span>}
        {match.status === "upcoming" && <span className="score-status upcoming">Proximo</span>}
        <span className="score-vs">vs</span>
        {match.date && <span className="score-date">{match.date}</span>}
      </div>
      <div className="score-team opp">
        <span className="team-name">{oppName.length > 12 ? oppName.substring(0, 12) + "..." : oppName}</span>
        <span className="team-score">{oppScore !== null ? oppScore : "-"}</span>
      </div>
    </div>
  );
};

const FloatingBalls = () => {
  const balls = Array.from({ length: 5 }, (_, i) => ({
    id: i,
    left: `${10 + i * 18}vw`,
    duration: `${12 + i * 2}s`,
    delay: `${i * 3}s`,
    fontSize: `${16 + i * 4}px`,
  }));
  return (
    <>
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
    const savedName = localStorage.getItem("visitorName");
    if (savedName) {
      navigate("/invite");
    }
  }, []);

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
      <video className="video-bg" src="/hero.mp4" autoPlay muted loop playsInline />
      <div className="video-overlay" />
      <div className="video-vignette" />
      <div className="orb orb1" />
      <div className="orb orb2" />
      <div className="orb orb3" />
      <FloatingBalls />
      <div className="w-container">
    <h1 className="w-h1" style={{ fontSize: "clamp(4rem,16vw,7rem)" }}>UNETE AL<br /><span>EQUIPO</span></h1>
        <p className="w-sub">Dinos quien eres, campeon ⚽</p>
        <div className="w-card">
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
