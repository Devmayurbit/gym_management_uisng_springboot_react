import { Link } from "react-router-dom";
import ScrollReveal from "../Components/ScrollReveal";

export default function Home() {
  return (
    <section className="page-shell container">
      <div className="hero">
        <div>
          <p style={{ color: "#ffd700", letterSpacing: "1.5px", fontWeight: 700 }}>DISCIPLINE. DEVOTION. STRENGTH.</p>
          <h1 className="hero-title">
            Unleash Your <span className="accent">Inner Strength</span>
          </h1>
          <p className="hero-copy">
            Maruti Nandan blends Akhada rigor with modern coaching. Track your progress, sharpen discipline,
            and grow with a spiritual fitness routine built for real consistency.
          </p>
          <div className="hero-cta">
            <Link className="btn btn-primary" to="/register">
              Start Sadhana
            </Link>
            <Link className="btn btn-outline" to="/akhada">
              Explore Akhada
            </Link>
          </div>
        </div>

        <div className="aura-wrap">
          <div className="glass-card aura-content">
            <h2 className="section-title" style={{ fontSize: "34px" }}>Daily Mantra</h2>
            <p style={{ color: "#e7dbc8", lineHeight: 1.7 }}>
              "Buddhir balam yasho dhairyam, nirbhayatvam arogata. Ajadyam vakpatutvam cha Hanumat smaranad bhavet."
            </p>
            <div className="stats-grid">
              <div className="glass-card" style={{ padding: "16px" }}>
                <p style={{ margin: 0, color: "#d3c8b7" }}>XP Goal</p>
                <h3 className="metric-value" style={{ margin: "10px 0 0" }}>12,000</h3>
              </div>
              <div className="glass-card" style={{ padding: "16px" }}>
                <p style={{ margin: 0, color: "#d3c8b7" }}>Streak</p>
                <h3 className="metric-value" style={{ margin: "10px 0 0" }}>27 Days</h3>
              </div>
              <div className="glass-card" style={{ padding: "16px" }}>
                <p style={{ margin: 0, color: "#d3c8b7" }}>Challenges</p>
                <h3 className="metric-value" style={{ margin: "10px 0 0" }}>4 Active</h3>
              </div>
            </div>
          </div>
        </div>
      </div>

      <ScrollReveal direction="left" className="glass-card" style={{ padding: "24px", marginTop: "22px" }}>
        <h2 className="section-title" style={{ fontSize: "34px" }}>Akhada Highlights</h2>
        <div className="grid-three" style={{ marginTop: "14px" }}>
          {["Macebell Flow", "Pehlwan Conditioning", "Hanuman Core Ritual"].map((title) => (
            <article key={title} className="glass-card" style={{ padding: "18px" }}>
              <h3>{title}</h3>
              <p style={{ color: "#d3c8b7" }}>Structured drills with progression tracking and recovery guidance.</p>
            </article>
          ))}
        </div>
      </ScrollReveal>
    </section>
  );
}
