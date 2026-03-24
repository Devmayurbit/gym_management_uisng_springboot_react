import { useEffect, useState } from "react";
import { getDashboard } from "../api/api";
import ChakraLoader from "../Components/ChakraLoader";
import ScrollReveal from "../Components/ScrollReveal";

export default function Dashboard() {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState(null);

  useEffect(() => {
    getDashboard()
      .then((res) => setData(res.data))
      .catch(() => {
        setData({
          name: "Sadhak",
          xp: 780,
          level: 7,
          streakDays: 12,
          disciplineScore: 84,
          subscription: "BASIC",
          analytics: [42, 58, 65, 73, 78, 81, 84],
        });
      })
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <ChakraLoader />;

  const percentage = Math.min(100, Math.round(((data?.xp || 0) % 1000) / 10));

  return (
    <section className="page-shell container">
      <h1 className="section-title">Strength Dashboard</h1>
      <p className="section-lead">Track growth, discipline, and your Akhada momentum.</p>

      <ScrollReveal className="glass-card" direction="left" style={{ marginTop: "18px", padding: "22px" }}>
        <h3 style={{ marginTop: 0 }}>Level {data.level} Progress</h3>
        <div className="progress-shell">
          <div className="progress-bar" style={{ width: `${percentage}%` }} />
        </div>
        <p style={{ color: "#d3c8b7" }}>{data.xp} XP total | {percentage}% to next level</p>
      </ScrollReveal>

      <div className="stats-grid">
        <article className="glass-card" style={{ padding: "18px" }}>
          <p style={{ color: "#d3c8b7", margin: 0 }}>Discipline Streak</p>
          <h2 className="metric-value" style={{ marginBottom: 0 }}>{data.streakDays} Days</h2>
        </article>
        <article className="glass-card" style={{ padding: "18px" }}>
          <p style={{ color: "#d3c8b7", margin: 0 }}>Subscription</p>
          <h2 className="metric-value" style={{ marginBottom: 0 }}>{data.subscription}</h2>
        </article>
        <article className="glass-card" style={{ padding: "18px" }}>
          <p style={{ color: "#d3c8b7", margin: 0 }}>Discipline Score</p>
          <h2 className="metric-value" style={{ marginBottom: 0 }}>{data.disciplineScore}%</h2>
        </article>
      </div>

      <ScrollReveal className="glass-card" direction="right" style={{ marginTop: "18px", padding: "22px" }}>
        <h3 style={{ marginTop: 0 }}>Progress Analytics</h3>
        <div style={{ display: "flex", gap: "8px", alignItems: "flex-end", minHeight: "150px" }}>
          {(data.analytics || []).map((v, idx) => (
            <div
              key={idx}
              style={{
                flex: 1,
                height: `${Math.max(12, v)}%`,
                borderRadius: "8px 8px 0 0",
                background: "linear-gradient(180deg, #ffd700, #ff6b00)",
                boxShadow: "0 0 18px rgba(255,107,0,.3)",
              }}
            />
          ))}
        </div>
      </ScrollReveal>
    </section>
  );
}
