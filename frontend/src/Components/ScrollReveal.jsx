import { useEffect, useRef } from "react";

export default function ScrollReveal({ children, className = "", direction = "up", style }) {
  const ref = useRef(null);

  useEffect(() => {
    if (!ref.current) return;
    const el = ref.current;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.classList.add("show");
          observer.unobserve(el);
        }
      },
      { threshold: 0.2 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const directionClass = direction === "left" ? "scroll-left" : direction === "right" ? "scroll-right" : "";

  return (
    <div ref={ref} className={`scroll-reveal ${directionClass} ${className}`.trim()} style={style}>
      {children}
    </div>
  );
}
