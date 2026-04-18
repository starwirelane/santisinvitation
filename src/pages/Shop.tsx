import { Link } from "react-router-dom";
import barcelonaImg from "@/assets/barcelona.webp";
import pumasImg from "@/assets/pumas.webp";
import argentinaImg from "@/assets/argentina.webp";
import espanaImg from "@/assets/espana.webp";
import mexicoImg from "@/assets/mexico.webp";
import brasilImg from "@/assets/brasil.webp";
import franciaImg from "@/assets/francia.webp";
import fishingRodImg from "@/assets/fishing-rod.webp";
import fishingTackleImg from "@/assets/fishing-tackle.jpg";
import fishingHooksImg from "@/assets/fishing-hooks.jpg";
import fishingVestImg from "@/assets/fishing-vest.webp";
import fishingBaitImg from "@/assets/fishing-bait.jpg";

const styles = `
  @import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&family=DM+Sans:wght@300;400;500&display=swap');
  .shop-root { min-height:100vh; background:linear-gradient(135deg, #0a0a1a 0%, #0d1b2a 50%, #0a0a1a 100%); font-family:'DM Sans',sans-serif; padding:2rem 1rem 4rem; }
  .shop-header { text-align:center; padding:2rem 0 3rem; }
  .shop-title { font-family:'Bebas Neue',sans-serif; font-size:clamp(2.5rem,8vw,4.5rem); color:#fff; letter-spacing:0.05em; line-height:1; }
  .shop-title span { color:#ffed02; text-shadow:0 0 28px rgba(255,237,2,0.45); }
  .shop-subtitle { color:rgba(255,255,255,0.4); font-size:14px; margin-top:0.5rem; }
  .shop-section { max-width:1200px; margin:0 auto 4rem; }
  .shop-section-title { font-family:'Bebas Neue',sans-serif; font-size:2rem; color:#fff; letter-spacing:0.08em; margin-bottom:1.5rem; padding-left:0.5rem; border-left:4px solid #ffed02; padding-left:1rem; }
  .shop-grid { display:grid; grid-template-columns:repeat(auto-fill, minmax(200px, 1fr)); gap:1.5rem; }
  .card-effect { perspective:1000px; }
  .card-inner {
    --card-accent: #ffed02;
    width:100%;
    height:300px;
    background:#111827;
    border-radius:20px;
    position:relative;
    overflow:hidden;
    transition:transform 0.6s cubic-bezier(0.23,1,0.32,1), box-shadow 0.6s cubic-bezier(0.23,1,0.32,1);
    box-shadow:0 12px 24px rgba(0,0,0,0.3);
    border:1px solid rgba(255,255,255,0.08);
    font-family:'DM Sans',sans-serif;
    transform-style:preserve-3d;
    cursor:pointer;
  }
  .card-inner:hover { transform:rotateY(8deg) rotateX(8deg) translateZ(10px); box-shadow:0 30px 60px rgba(0,0,0,0.5); }
  .card__liquid { position:absolute; top:-80px; left:0; width:300px; height:200px; background:#ffed02; border-radius:50%; transform:translateZ(-80px); filter:blur(80px); transition:transform 0.7s cubic-bezier(0.36,0,0.66,-0.56), opacity 0.3s ease-in-out; opacity:0; }
  .card-inner:hover .card__liquid { transform:translateZ(-50px) translateY(30px) translateX(-20px) rotate(-20deg) scale(1.2); opacity:0.4; }
  .card__shine { position:absolute; inset:0; background:linear-gradient(135deg, rgba(255,255,255,0.05) 30%, rgba(255,255,255,0.3) 50%, rgba(255,255,255,0.05) 70%); opacity:0; transition:opacity 0.4s ease-in-out; }
  .card-inner:hover .card__shine { opacity:1; animation:shine-effect 2s infinite linear; }
  .card__glow { position:absolute; inset:-15px; background:radial-gradient(circle at 50% 0%, rgba(255,237,2,0.2) 0%, rgba(255,237,2,0) 60%); opacity:0; transition:opacity 0.6s ease-in-out; }
  .card-inner:hover .card__glow { opacity:1; }
  .card__content { padding:1.2em; height:100%; display:flex; flex-direction:column; gap:0.8em; position:relative; z-index:2; }
  .card__badge { position:absolute; top:12px; right:12px; background:#ffed02; color:#0a0a1a; padding:0.25em 0.6em; border-radius:999px; font-size:0.7em; font-weight:700; transform:scale(0.7); opacity:0; transition:all 0.5s ease 0.2s; }
  .card-inner:hover .card__badge { transform:scale(1); opacity:1; }
  .card__image { width:100%; height:150px; border-radius:12px; overflow:hidden; box-shadow:0 8px 12px rgba(0,0,0,0.3); transition:transform 0.6s cubic-bezier(0.23,1,0.32,1); position:relative; }
  .card__image img { width:100%; height:100%; object-fit:cover; }
  .card-inner:hover .card__image { transform:translateY(-6px) scale(1.03); }
  .card__text { display:flex; flex-direction:column; gap:0.3em; }
  .card__title { color:#fff; font-size:1em; margin:0; font-weight:700; transition:color 0.4s ease-in-out, transform 0.4s ease-in-out; }
  .card-inner:hover .card__title { color:#ffed02; transform:translateX(3px); }
  .card__description { color:rgba(255,255,255,0.5); font-size:0.78em; margin:0; transition:opacity 0.4s ease-in-out, transform 0.4s ease-in-out; }
  .card-inner:hover .card__description { opacity:1; transform:translateX(3px); }
  .card__footer { display:flex; justify-content:space-between; align-items:center; margin-top:auto; }
  .card__button { width:100%; padding:8px 12px; background:linear-gradient(135deg,#a50044,#004d98); border:none; border-radius:10px; color:#fff; font-family:'DM Sans',sans-serif; font-size:0.8em; font-weight:600; cursor:pointer; transition:transform 0.3s, box-shadow 0.3s; text-align:center; text-decoration:none; display:block; }
  .card__button:hover { transform:translateY(-2px); box-shadow:0 8px 20px rgba(165,0,68,0.4); }
  .back-btn { display:block; text-align:center; margin:2rem auto 0; padding:12px 32px; border-radius:999px; border:1px solid rgba(255,255,255,0.2); color:rgba(255,255,255,0.6); font-family:'DM Sans',sans-serif; font-size:14px; text-decoration:none; transition:all 0.3s; max-width:200px; }
  .back-btn:hover { background:rgba(255,255,255,0.1); }
  .orb { position:fixed; border-radius:50%; filter:blur(90px); pointer-events:none; z-index:0; }
  .orb1 { width:400px; height:400px; background:#a50044; top:-100px; left:-100px; opacity:0.08; }
  .orb2 { width:350px; height:350px; background:#004d98; bottom:-100px; right:-100px; opacity:0.08; }
  .orb3 { width:250px; height:250px; background:#ffed02; top:40%; right:5%; opacity:0.05; }
  @keyframes shine-effect { 0%{transform:translateX(-100%);} 100%{transform:translateX(200%);} }
`;

const jerseys = [
  {
    img: barcelonaImg,
    title: "FC Barcelona",
    desc: "Todas las camisetas del Barca",
    badge: "POPULAR",
    link: "https://store.fcbarcelona.com/en/football/shirts",
  },
  {
    img: pumasImg,
    title: "Pumas UNAM",
    desc: "Cualquier kit y jugador",
    badge: "CLASICO",
    link: "https://www.pumasfutbol.com.mx/collections/jerseys",
  },
  {
    img: argentinaImg,
    title: "Argentina",
    desc: "Kit con Messi en la espalda",
    badge: "MESSI",
    link: "https://www.adidas.com/us/argentina-messi-jersey",
  },
  {
    img: espanaImg,
    title: "Espana",
    desc: "Away 2026 blanca — Yamal, Pedri, Dani Olmo",
    badge: "2026",
    link: "https://www.adidas.com/us/spain-away-jersey",
  },
  {
    img: mexicoImg,
    title: "Mexico",
    desc: "Cualquier kit y jugador",
    badge: "EL TRI",
    link: "https://www.adidas.com/us/mexico-jerseys",
  },
  {
    img: brasilImg,
    title: "Brasil",
    desc: "Todas las camisetas de Brasil",
    badge: "SAMBA",
    link: "https://www.nike.com/w/brazil-national-team-jerseys",
  },
  {
    img: franciaImg,
    title: "Francia",
    desc: "Todas las camisetas de Francia",
    badge: "LES BLEUS",
    link: "https://www.nike.com/w/france-national-team-jerseys",
  },
];

const fishing = [
  {
    img: fishingRodImg,
    title: "Canas de Pescar",
    desc: "Todo tipo de canas para pescar",
    badge: "TOP",
    link: "https://www.basspro.com/shop/en/fishing-rods",
  },
  {
    img: fishingTackleImg,
    title: "Caja de Pesca",
    desc: "Cajas y bolsas de tackle",
    badge: "ESENCIAL",
    link: "https://www.basspro.com/shop/en/tackle-bags-boxes",
  },
  {
    img: fishingHooksImg,
    title: "Anzuelos",
    desc: "Todo tipo de anzuelos",
    badge: "NUEVO",
    link: "https://www.basspro.com/shop/en/hooks",
  },
  {
    img: fishingVestImg,
    title: "Chaleco de Pesca",
    desc: "Chalecos y accesorios",
    badge: "COMODO",
    link: "https://www.basspro.com/shop/en/fishing-vests",
  },
  {
    img: fishingBaitImg,
    title: "Carnadas",
    desc: "Carnadas y sensuelos",
    badge: "EFECTIVO",
    link: "https://www.basspro.com/shop/en/live-bait",
  },
];

const Card = ({ img, title, desc, badge, link }: { img: string; title: string; desc: string; badge: string; link: string }) => (
  <div className="card-effect">
    <div className="card-inner">
      <div className="card__liquid" />
      <div className="card__shine" />
      <div className="card__glow" />
      <div className="card__content">
        <div className="card__badge">{badge}</div>
        <div className="card__image">
          <img src={img} alt={title} />
        </div>
        <div className="card__text">
          <p className="card__title">{title}</p>
          <p className="card__description">{desc}</p>
        </div>
        <div className="card__footer">
          <a href={link} target="_blank" rel="noopener noreferrer" className="card__button">
            Ver en tienda →
          </a>
        </div>
      </div>
    </div>
  </div>
);

const Shop = ({ section }: { section: "jerseys" | "fishing" }) => {
  return (
    <div className="shop-root">
      <style>{styles}</style>
      <div className="orb orb1" />
      <div className="orb orb2" />
      <div className="orb orb3" />
      <div style={{ position: "relative", zIndex: 1 }}>
        <div className="shop-header">
          <h1 className="shop-title">
            {section === "jerseys" ? <><span>Camisetas</span> de Futbol</> : <>Equipo de <span>Pesca</span></>}
          </h1>
          <p className="shop-subtitle">Haz clic en cualquier tarjeta para ver opciones en la tienda oficial</p>
        </div>
        <div className="shop-section">
          <div className="shop-grid">
            {(section === "jerseys" ? jerseys : fishing).map((item) => (
              <Card key={item.title} {...item} />
            ))}
          </div>
        </div>
        <Link to="/gifts" className="back-btn">
          Volver a regalos
        </Link>
      </div>
    </div>
  );
};

export default Shop;
