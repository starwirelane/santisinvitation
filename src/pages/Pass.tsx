import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const PASS2U_LINK = "https://www.pass2u.net/p/FPkLMTlCfhc2?openExternalBrowser=1";

const styles = `
  @import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&family=DM+Sans:wght@300;400;500&display=swap');

  .pass-root {
    min-height: 100vh;
    background: linear-gradient(135deg, #0a0a1a 0%, #0d1b2a 50%, #0a0a1a 100%);
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: 2rem 1rem;
    font-family: 'DM Sans', sans-serif;
    overflow: hidden;
    position: relative;
  }

  .pass-orb { position:fixed; border-radius:50%; filter:blur(90px); pointer-events:none; }
  .pass-orb1 { width:400px; height:400px; background:#a50044; top:-100px; left:-100px; opacity:0.08; }
  .pass-orb2 { width:350px; height:350px; background:#004d98; bottom:-100px; right:-100px; opacity:0.08; }
  .pass-orb3 { width:250px; height:250px; background:#ffed02; top:40%; right:5%; opacity:0.05; }

  .pass-title {
    font-family: 'Bebas Neue', sans-serif;
    font-size: clamp(2rem, 8vw, 3.5rem);
    color: #fff;
    text-align: center;
    letter-spacing: 0.05em;
    margin-bottom: 0.5rem;
    position: relative;
    z-index: 1;
  }
  .pass-title span { color: #ffed02; text-shadow: 0 0 28px rgba(255,237,2,0.45); }
  .pass-subtitle {
    color: rgba(255,255,255,0.4);
    font-size: 13px;
    text-align: center;
    margin-bottom: 1rem;
    max-width: 300px;
    position: relative;
    z-index: 1;
  }

  .area {
    --ease-elastic: cubic-bezier(0.5, 2, 0.3, 0.8);
    display: flex;
    align-items: center;
    justify-content: center;
    position: relative;
    width: 100%;
    height: 420px;
    z-index: 1;
  }

  .area::after {
    pointer-events: none;
    content: "";
    position: absolute;
    top: 66%;
    left: 0;
    right: 0;
    height: 100px;
    width: 30%;
    margin: auto;
    background-color: #648cc630;
    filter: blur(2em);
    opacity: 0.7;
    transform: perspective(10px) rotateX(5deg) scale(1, 0.5);
    z-index: 0;
  }

  .ticket-mask {
    position: absolute;
    overflow: hidden;
    display: flex;
    justify-content: center;
    mask-image: linear-gradient(rgba(0,0,0,0.1) 0%, white 20px);
    perspective: 1000px;
    top: 0;
    left: 0;
    right: 0;
    height: 100%;
  }

  .ticket {
    float: left;
    animation: ticket-move 11s ease-in-out forwards;
    transform: translateY(50px);
    perspective: 3000px;
  }

  @keyframes ticket-move {
    0% { transform: translateY(-300px); }
    7% { transform: translateY(-250px); }
    12% { transform: translateY(-200px); }
    16% { transform: translateY(-170px); }
    22% { transform: translateY(-100px); }
    27% { transform: translateY(-40px); }
    34%, 100% { transform: translateY(45px); }
  }

  .ticket-flip-container {
    transition: 0.6s;
    transform-style: preserve-3d;
    position: relative;
  }

  .float {
    transform-style: preserve-3d;
    pointer-events: none;
    animation: float 3s ease-in-out infinite;
  }

  @keyframes float {
    0% { transform: translateY(0); }
    50% { transform: translateY(-15px); }
    100% { transform: translateY(0); }
  }

  .front, .back {
    display: inline-block;
    backface-visibility: hidden;
    transform-style: preserve-3d;
  }
  .front { z-index: 1; }
  .back {
    position: absolute;
    top: 0;
    left: 0;
    transform: rotateY(-180deg);
  }

  .ticket-body {
    display: block;
    position: relative;
    width: 300px;
    border-radius: 7px 7px 0px 0px;
    background: linear-gradient(to bottom, white, #dcfffd);
    color: black;
    text-align: center;
    box-shadow: 0 20px 60px rgba(0,0,0,0.5);
  }

  .ticket-body::before {
    content: "";
    position: absolute;
    inset: 0;
    mask-image: linear-gradient(white 50%, transparent 100%);
    border-radius: 7px 7px 0px 0px;
    background:
      radial-gradient(at 30% -5%, #90f1f1, #d3ccf0, rgba(255,255,255,0) 25%),
      radial-gradient(at 30% 40%, #aad1f0, rgba(255,255,255,0) 20%),
      radial-gradient(at 50% 70%, #c4f2e5, rgba(255,255,255,0) 30%),
      radial-gradient(at 70% 0%, #d3ccf0, rgba(255,255,255,0) 20%),
      linear-gradient(75deg, #90f1f1 5%, rgba(255,255,255,0), #aad1f0, rgba(255,255,255,0), #e9d0ed, rgba(255,255,255,0), #d3ccf0, rgba(255,255,255,0), #c4f2e5 90%);
  }

  .ticket-body:after {
    content: "";
    display: block;
    position: absolute;
    bottom: -16px;
    left: 0;
    background:
      -webkit-linear-gradient(-135deg, #dcfffd 50%, transparent 50%) 0 50%,
      -webkit-linear-gradient(-45deg, #dcfffd 50%, transparent 50%) 0 50%,
      transparent;
    background-repeat: repeat-x;
    background-size: 16px 16px, 16px 16px, cover, cover;
    height: 16px;
    width: 100%;
    pointer-events: none;
  }

  .ticket-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    position: relative;
    padding: 15px;
    border-bottom: 1px dashed rgba(0,0,0,0.4);
    text-align: left;
    height: 54px;
  }

  .ticket-header::before, .ticket-header::after {
    content: "";
    display: block;
    width: 13px;
    height: 13px;
    background-color: #0f1114;
    position: absolute;
    border-radius: 50%;
    z-index: 11;
    bottom: -7px;
  }
  .ticket-header::before { right: -7px; }
  .ticket-header::after { left: -7px; }

  .ticket-name {
    font-weight: 700;
    font-size: 0.95em;
    letter-spacing: -1px;
    color: #0a0a1a;
  }

  .ticket-date-top {
    font-size: 0.75rem;
    color: rgba(0,0,0,0.5);
    text-align: right;
    font-weight: 600;
  }

  .ticket-contents {
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 20px;
    min-height: 160px;
    position: relative;
  }

  .ticket-event {
    display: flex;
    flex-direction: column;
    position: relative;
    z-index: 1;
    text-align: center;
    gap: 8px;
  }

  .ticket-event-emoji {
    font-size: 2.5rem;
    line-height: 1;
  }

  .ticket-event-name {
    font-size: 1.1rem;
    font-weight: 800;
    color: #0a0a1a;
    letter-spacing: -0.5px;
  }

  .ticket-fields {
    display: flex;
    justify-content: space-between;
    padding: 0 15px 15px;
    gap: 10px;
  }

  .ticket-field {
    display: flex;
    flex-direction: column;
    text-align: left;
  }

  .ticket-field-label {
    font-size: 7px;
    text-transform: uppercase;
    letter-spacing: 0.15em;
    color: rgba(0,0,0,0.35);
    font-weight: 700;
  }

  .ticket-field-value {
    font-size: 11px;
    font-weight: 700;
    color: #0a0a1a;
  }

  .ticket-bottom {
    background: #0a0a1a;
    border-radius: 0 0 7px 7px;
    padding: 16px;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 6px;
    margin-top: 16px;
  }

  .ticket-barcode {
    width: 180px;
    height: 45px;
    background: repeating-linear-gradient(
      90deg,
      #fff 0px, #fff 2px,
      transparent 2px, transparent 5px,
      #fff 5px, #fff 6px,
      transparent 6px, transparent 9px,
      #fff 9px, #fff 12px,
      transparent 12px, transparent 14px,
      #fff 14px, #fff 15px,
      transparent 15px, transparent 18px
    );
    border-radius: 3px;
  }

  .ticket-barcode-text {
    color: rgba(255,255,255,0.3);
    font-size: 9px;
    letter-spacing: 0.2em;
    font-family: monospace;
  }

  .reflex {
    pointer-events: none;
    position: absolute;
    inset: 0;
    bottom: -5px;
    z-index: 10;
    overflow: hidden;
    border-radius: 7px 7px 0 0;
  }

  .reflex::before {
    content: "";
    position: absolute;
    width: 300px;
    background: linear-gradient(
      to right,
      rgba(221,249,255,0.4) 10%,
      rgba(221,245,255,0.7) 60%,
      rgba(221,246,255,0.6) 60%,
      rgba(221,255,254,0.4) 90%
    );
    top: -10%;
    bottom: -10%;
    left: -132%;
    transform: translateX(0) skew(-30deg);
    transition: all 0.7s ease;
    animation: reflex-move 4s ease-in-out infinite;
  }

  @keyframes reflex-move {
    0% { left: -132%; }
    50% { left: 150%; }
    100% { left: 150%; }
  }

  .output {
    align-self: center;
    background: inherit;
    border-radius: 100px;
    padding: 0 12px 0 10px;
    height: 36px;
    min-width: 280px;
    position: relative;
    margin-top: 1rem;
    z-index: 1;
  }

  .output::before {
    content: "";
    top: 0; right: 0; bottom: 0; left: 0;
    border-radius: inherit;
    position: absolute;
    border: 1px solid rgba(255,255,255,0.2);
    background: #ffffff14;
    opacity: 0.4;
  }

  .bg-colors {
    background: conic-gradient(
      transparent 0deg,
      #8400ff 65deg,
      #00ccff 144deg,
      #1356b4 180deg,
      transparent 324deg,
      transparent 360deg
    );
    position: absolute;
    width: 400px;
    height: 400px;
    margin: auto;
    inset: 0;
    left: 50%;
    transform: translateX(-50%) rotate(220deg);
    border-radius: 50%;
    animation: cycle-rotate 3s ease-in-out infinite;
  }

  @keyframes cycle-rotate {
    from { transform: translateX(-50%) rotate(0deg); }
    to { transform: translateX(-50%) rotate(360deg); }
  }

  .wallet-section {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 12px;
    width: 100%;
    max-width: 320px;
    animation: fadeUp 0.8s ease forwards;
    position: relative;
    z-index: 1;
    margin-top: 1rem;
  }

  @keyframes fadeUp {
    from { opacity: 0; transform: translateY(20px); }
    to { opacity: 1; transform: translateY(0); }
  }

  .wallet-btn {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 10px;
    padding: 14px 24px;
    border-radius: 14px;
    font-weight: 700;
    font-size: 15px;
    text-decoration: none;
    transition: transform 0.2s, box-shadow 0.2s;
    border: none;
    cursor: pointer;
    width: 100%;
  }

  .wallet-btn-apple {
    background: #000;
    color: #fff;
  }
  .wallet-btn-apple:hover {
    transform: translateY(-2px);
    box-shadow: 0 10px 30px rgba(0,0,0,0.5);
  }

  .wallet-btn-google {
    background: #fff;
    color: #0a0a1a;
  }
  .wallet-btn-google:hover {
    transform: translateY(-2px);
    box-shadow: 0 10px 30px rgba(255,255,255,0.2);
  }

  .pass-note {
    color: rgba(255,255,255,0.3);
    font-size: 11px;
    text-align: center;
    max-width: 280px;
    font-style: italic;
  }

  .back-link {
    color: rgba(255,255,255,0.3);
    font-size: 12px;
    text-decoration: none;
    display: block;
    text-align: center;
    margin-top: 0.5rem;
  }
  .back-link:hover { color: rgba(255,255,255,0.6); }
`;

const Pass = () => {
  const [showButtons, setShowButtons] = useState(false);

  useEffect(() => {
    // Show buttons after animation completes (11 seconds)
    const timer = setTimeout(() => setShowButtons(true), 11000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="pass-root">
      <style>{styles}</style>
      <div className="pass-orb pass-orb1" />
      <div className="pass-orb pass-orb2" />
      <div className="pass-orb pass-orb3" />

      <h1 className="pass-title">TU <span>PASE</span> DIGITAL</h1>
      <p className="pass-subtitle">Agrega este pase a tu cartera digital como recordatorio</p>

      <div className="area">
        <div className="ticket-mask">
          <div className="ticket">
            <div className="ticket-flip-container">
              <div className="front">
                <div className="float">
                  <div className="ticket-body">
                    <div className="reflex" />
                    <div className="ticket-header">
                      <div className="ticket-name">Graduacion de<br />Santiago Luvianos</div>
                      <div className="ticket-date-top">
                        <div>13 JUN</div>
                        <div>2026</div>
                      </div>
                    </div>
                    <div className="ticket-contents">
                      <div className="ticket-event">
                        <div className="ticket-event-emoji">🎓⚽</div>
                        <div className="ticket-event-name">Graduacion de Santiago</div>
                      </div>
                    </div>
                    <div className="ticket-fields">
                      <div className="ticket-field">
                        <span className="ticket-field-label">Fecha</span>
                        <span className="ticket-field-value">Sab, 13 Junio</span>
                      </div>
                      <div className="ticket-field">
                        <span className="ticket-field-label">Hora</span>
                        <span className="ticket-field-value">3:30 PM</span>
                      </div>
                      <div className="ticket-field">
                        <span className="ticket-field-label">Lugar</span>
                        <span className="ticket-field-value">Galt, CA</span>
                      </div>
                    </div>
                    <div className="ticket-bottom">
                      <div className="ticket-barcode" />
                      <div className="ticket-barcode-text">GRAD · SANTIAGO · 2026</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {showButtons && (
        <div className="wallet-section">
          <a href={PASS2U_LINK} target="_blank" rel="noopener noreferrer" className="wallet-btn wallet-btn-apple">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="white">
              <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.8-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z" />
            </svg>
            Agregar a Apple Wallet
          </a>
          <a href={PASS2U_LINK} target="_blank" rel="noopener noreferrer" className="wallet-btn wallet-btn-google">
            <svg width="20" height="20" viewBox="0 0 24 24">
              <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
              <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
              <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
              <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
            </svg>
            Agregar a Google Wallet
          </a>
          <p className="pass-note">No necesitas este pase — es solo un recordatorio del evento en tu cartera digital</p>
          <Link to="/gifts" className="back-link">Volver a regalos</Link>
        </div>
      )}
    </div>
  );
};

export default Pass;
