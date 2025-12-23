import { useEffect, useRef } from "react";
import gsap from "gsap";

export default function Goals() {
  const ref = useRef(null);
  useEffect(()=>{
    const ctx = gsap.context(()=> gsap.from(".g-item",{ y:24, opacity:0, stagger:.1, duration:.6 }), ref);
    return () => ctx.revert();
  },[]);
  return (
    <section ref={ref} className="mx-auto max-w-7xl px-4 md:px-6 py-16">
      <h2 className="text-3xl md:text-4xl font-extrabold">Set Your <span className="text-yellow-400">Goals</span></h2>
      <p className="text-gray-300 mt-2 max-w-2xl">Pick fat-loss, muscle-gain or conditioning goals and we’ll compute the plan.</p>
      <div className="mt-8 grid md:grid-cols-3 gap-6">
        {["Fat Loss","Muscle Gain","Conditioning"].map((t)=>(
          <div key={t} className="g-item rounded-2xl border border-white/10 p-6 bg-white/5">
            <h3 className="font-semibold">{t}</h3>
            <p className="text-gray-300 text-sm mt-2">Personalized weekly targets & progress charts.</p>
          </div>
        ))}
      </div>
    </section>
  );
}
