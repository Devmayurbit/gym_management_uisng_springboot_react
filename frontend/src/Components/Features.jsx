import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
gsap.registerPlugin(ScrollTrigger);

const data = [
  { title: "Track Your Achievement", icon: "⏱️", text: "Measure progress with clean analytics." },
  { title: "Adaptive Workouts", icon: "🏋️", text: "Programs that adjust to your level." },
  { title: "Data-driven Insights", icon: "📊", text: "Smart tips based on your routine." },
];

export default function Features() {
  const ref = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".feat", {
        scrollTrigger: { trigger: ref.current, start: "top 80%" },
        y: 30, opacity: 0, duration: 0.6, stagger: 0.15, ease: "power3.out"
      });
    }, ref);
    return () => ctx.revert();
  }, []);

  return (
    <section id="features" ref={ref} className="mx-auto max-w-7xl px-4 md:px-6 py-14 md:py-20">
      <div className="grid md:grid-cols-3 gap-6">
        {data.map((c,i)=>(
          <div key={i} className="feat rounded-2xl bg-white/5 border border-white/10 p-6">
            <div className="text-3xl">{c.icon}</div>
            <h3 className="mt-3 font-bold text-lg">{c.title}</h3>
            <p className="mt-2 text-gray-300 text-sm">{c.text}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
