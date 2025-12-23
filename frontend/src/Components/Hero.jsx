import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
gsap.registerPlugin(ScrollTrigger);

export default function Hero() {
  const root = useRef(null);
  const words = useRef([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.set(root.current, { opacity: 1 });

      gsap.from(".hero-word", {
        y: 40, opacity: 0, duration: 0.7, stagger: 0.06, ease: "power3.out"
      });

      gsap.from(".hero-card", {
        scrollTrigger: { trigger: ".hero-card", start: "top 80%" },
        y: 40, opacity: 0, duration: 0.8, ease: "power3.out"
      });
    }, root);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={root} className="opacity-0 relative">
      <div className="mx-auto max-w-7xl px-4 md:px-6 py-14 md:py-20 grid md:grid-cols-2 gap-10 items-center">
        {/* Left */}
        <div>
          <p className="text-yellow-400 font-semibold tracking-widest mb-4">TRANSFORMING</p>

          <h1 className="text-5xl md:text-6xl font-extrabold leading-tight">
            <span className="hero-word inline-block text-yellow-400">START</span>{" "}
            <span className="hero-word inline-block">YOUR</span>{" "}
            <span className="hero-word inline-block">FITNESS</span>{" "}
            <span className="hero-word inline-block">JOURNEY</span>{" "}
            <span className="hero-word inline-block">TODAY</span>
          </h1>

          <p className="mt-6 text-gray-300 max-w-xl">
            Access top trainers, track progress, and transform your body with personalized training.
          </p>

          <div className="mt-8 flex gap-4">
            <a href="#features" className="rounded-full bg-yellow-400 text-black px-5 py-3 font-semibold">Track Progress</a>
            <a href="#services" className="rounded-full border border-white/20 px-5 py-3 font-semibold">See Services</a>
          </div>
        </div>

        {/* Right mockup */}
        <div className="hero-card rounded-3xl border border-yellow-400/40 p-3">
          <div className=" w-full rounded-2xl from-white/10 to-transparent border border-white/10 flex items-center justify-center">
            <span className="text-sm text-white/60">Gym Model</span>
          </div>
        </div>
      </div>
    </section>
  );
}
