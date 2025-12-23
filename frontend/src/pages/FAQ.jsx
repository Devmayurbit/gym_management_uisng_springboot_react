import { useState } from "react";

const faqs = [
  { q: "Do I need a trainer?", a: "Beginners benefit a lot, but plans also work self-guided." },
  { q: "Is there a free trial?", a: "Yes, try our services free for 7 days." },
  { q: "Can I cancel anytime?", a: "Absolutely. No lock-in." },
];

export default function FAQ() {
  const [open, setOpen] = useState(0);

  return (
    <section className="mx-auto max-w-3xl px-4 md:px-6 py-16">
      <h2 className="text-3xl md:text-4xl font-extrabold">Frequently Asked <span className="text-yellow-400">Questions</span></h2>
      <div className="mt-8 space-y-3">
        {faqs.map((f,i)=>(
          <div key={f.q} className="border border-white/10 rounded-xl bg-white/5">
            <button className="w-full text-left px-4 py-3 font-semibold flex items-center justify-between"
              onClick={()=> setOpen(open===i? -1 : i)}>
              {f.q}
              <span>{open===i? "–" : "+"}</span>
            </button>
            {open===i && <p className="px-4 pb-4 text-gray-300">{f.a}</p>}
          </div>
        ))}
      </div>
    </section>
  );
}
