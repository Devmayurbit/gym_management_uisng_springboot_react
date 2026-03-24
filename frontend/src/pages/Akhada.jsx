import { useEffect, useState } from "react";
import { getAkhadaData } from "../api/api";
import ScrollReveal from "../Components/ScrollReveal";

const fallback = {
  mantra: "Shri Ram Jai Ram Jai Jai Ram",
  workouts: [
    { name: "Dand-Baithak Circuit", reps: "5 rounds" },
    { name: "Gada Swing", reps: "4 x 20" },
    { name: "Rope Climb", reps: "6 climbs" },
  ],
  dietPlans: [
    "Sattu + milk + dates",
    "Ghee roti + dal + paneer",
    "Banana + soaked almonds + coconut water",
  ],
  challenges: ["Brahma Muhurat wake-up streak", "108 Surya Namaskar monthly target"],
};

export default function Akhada() {
  const [data, setData] = useState(fallback);

  useEffect(() => {
    getAkhadaData().then((res) => setData(res.data)).catch(() => {});
  }, []);

  return (
    <section className="page-shell container">
      <h1 className="section-title">Akhada Sadhana</h1>
      <p className="section-lead">Traditional workouts, desi nutrition, and discipline rituals for complete transformation.</p>

      <div className="grid-two" style={{ marginTop: "16px" }}>
        <ScrollReveal direction="left" className="glass-card" style={{ padding: "18px" }}>
          <h2 style={{ marginTop: 0 }}>Traditional Workouts</h2>
          {data.workouts.map((w) => (
            <div key={w.name} className="glass-card" style={{ padding: "12px", marginBottom: "10px" }}>
              <strong>{w.name}</strong>
              <p style={{ color: "#d3c8b7", marginBottom: 0 }}>{w.reps}</p>
            </div>
          ))}
        </ScrollReveal>

        <ScrollReveal direction="right" className="glass-card" style={{ padding: "18px" }}>
          <h2 style={{ marginTop: 0 }}>Indian Diet Plans</h2>
          <ul>
            {data.dietPlans.map((item) => (
              <li key={item} style={{ marginBottom: "8px", color: "#e6d8c3" }}>{item}</li>
            ))}
          </ul>
          <h3>Daily Mantra</h3>
          <p style={{ color: "#ffd700" }}>{data.mantra}</p>
        </ScrollReveal>
      </div>

      <ScrollReveal className="glass-card" style={{ marginTop: "16px", padding: "18px" }}>
        <h2 style={{ marginTop: 0 }}>Akhada Challenges</h2>
        <div className="grid-two">
          {data.challenges.map((c) => (
            <article key={c} className="glass-card" style={{ padding: "14px" }}>{c}</article>
          ))}
        </div>
      </ScrollReveal>
    </section>
  );
}
