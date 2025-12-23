import { useEffect, useState } from "react";
import { getMembers, addMember, getTrainers, getPlans } from "../api/api.js";

export default function MembersMini() {
  const [members, setMembers] = useState([]);
  const [trainers, setTrainers] = useState([]);
  const [plans, setPlans] = useState([]);
  const [form, setForm] = useState({
    name: "",
    age: "",
    phone: "",
    trainerId: "",
    planId: "",
  });
  

  const [loading, setLoading] = useState(false);

  const load = async () => {
    const [m, t, p] = await Promise.all([
      getMembers(),
      getTrainers(),
      getPlans(),
    ]);
    setMembers(m.data || []);
    setTrainers(t.data || []);
    setPlans(p.data || []);
  };

  useEffect(() => {
    load();
  }, []);

  const submit = async (e) => {
    e.preventDefault();
    if (!form.trainerId || !form.planId) {
      alert("Please select Trainer and Plan");
      return;
    }
    setLoading(true);
    try {
      const newMember = {
        name: form.name,
        age: Number(form.age),
        phone: form.phone,
        trainerId: Number(form.trainerId),
        planId: Number(form.planId),
      };
      await addMember(newMember);
      setForm({ name: "", age: "", phone: "", trainerId: "", planId: "" });
      load();
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="mx-auto max-w-6xl px-4 py-10">
      <h2 className="text-2xl font-bold text-white mb-4">
        Members (Connected to Backend)
      </h2>

      {/* Form to Add Member */}
      <form
        onSubmit={submit}
        className="grid md:grid-cols-6 gap-3 bg-white/10 p-4 rounded-xl"
      >
        <input
          required
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
          placeholder="Name"
          className="col-span-2 bg-black border border-gray-600 text-white p-2 rounded"
        />
        <input
          required
          type="number"
          value={form.age}
          onChange={(e) => setForm({ ...form, age: e.target.value })}
          placeholder="Age"
          className="bg-black border border-gray-600 text-white p-2 rounded"
        />
        <input
          required
          value={form.phone}
          onChange={(e) => setForm({ ...form, phone: e.target.value })}
          placeholder="Phone"
          className="bg-black border border-gray-600 text-white p-2 rounded"
        />
        <select
          required
          value={form.trainerId}
          onChange={(e) => setForm({ ...form, trainerId: e.target.value })}
          className="bg-black border border-gray-600 text-white p-2 rounded"
        >
          <option value="">Select Trainer</option>
          {trainers.map((t) => (
            <option key={t.id} value={t.id}>
              {t.name}
            </option>
          ))}
        </select>
        <select
          required
          value={form.planId}
          onChange={(e) => setForm({ ...form, planId: e.target.value })}
          className="bg-black border border-gray-600 text-white p-2 rounded"
        >
          <option value="">Select Plan</option>
          {plans.map((p) => (
            <option key={p.id} value={p.id}>
              {p.name}
            </option>
          ))}
        </select>
        <button className="bg-yellow-400 text-black rounded font-bold">
          {loading ? "Saving..." : "Add"}
        </button>
      </form>

      {/* Show members */}
      <div className="grid md:grid-cols-3 gap-4 mt-6">
        {members.map((m) => (
          <div
            key={m.id}
            className="bg-white/10 border border-gray-700 p-4 rounded"
          >
            <p className="font-bold text-white">
              {m.name} ({m.age})
            </p>
            <p className="text-gray-300">📞 {m.phone}</p>
            <p className="text-gray-300">
              🏋‍♂ Trainer: {m.trainer ? m.trainer.name : "None"}
            </p>
            <p className="text-gray-300">
              📅 Plan: {m.plan ? m.plan.name : "None"}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
