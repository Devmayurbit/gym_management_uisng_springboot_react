export default function Services() {
  const plans = [
    { name:"Monthly",  price:1200, perks:["Gym Access","Trainer Tips"] },
    { name:"Quarterly",price:3200, perks:["Everything in Monthly","Diet Plan"] },
    { name:"Yearly",   price:11000, perks:["Everything in Quarterly","Priority Support"] },
  ];
  return (
    <section id="services" className="mx-auto max-w-7xl px-4 md:px-6 py-16">
      <h2 className="text-3xl md:text-4xl font-extrabold">Membership <span className="text-yellow-400">Plans</span></h2>
      <div className="mt-8 grid md:grid-cols-3 gap-6">
        {plans.map(p=>(
          <div key={p.name} className="rounded-2xl border border-white/10 p-6 bg-white/5 flex flex-col">
            <h3 className="font-bold text-xl">{p.name}</h3>
            <div className="text-3xl font-extrabold mt-2 mb-4">₹{p.price}</div>
            <ul className="text-sm text-gray-300 space-y-2 mb-6">
              {p.perks.map(x=> <li key={x}>• {x}</li>)}
            </ul>
            <button className="mt-auto rounded-full bg-yellow-400 text-black font-semibold px-4 py-2">Choose</button>
          </div>
        ))}
      </div>
    </section>
  );
}
