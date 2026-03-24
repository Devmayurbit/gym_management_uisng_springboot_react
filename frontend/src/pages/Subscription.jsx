import { useEffect, useState } from "react";
import { createOrder, getSubscriptionPlans, verifyPayment } from "../api/api";

const fallbackPlans = [
  { code: "BASIC", title: "Basic Sadhak", amount: 999, features: ["Akhada workouts", "Mantra section", "Weekly tracker"] },
  { code: "PREMIUM", title: "Premium Veer", amount: 2499, features: ["Everything in Basic", "Diet coaching", "Priority mentor support"] },
];

function loadRazorpayScript() {
  return new Promise((resolve) => {
    if (window.Razorpay) return resolve(true);
    const script = document.createElement("script");
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    script.onload = () => resolve(true);
    script.onerror = () => resolve(false);
    document.body.appendChild(script);
  });
}

export default function Subscription() {
  const [plans, setPlans] = useState(fallbackPlans);
  const [busyCode, setBusyCode] = useState("");

  useEffect(() => {
    getSubscriptionPlans().then((res) => setPlans(res.data)).catch(() => {});
  }, []);

  const payNow = async (plan) => {
    setBusyCode(plan.code);
    const ok = await loadRazorpayScript();
    if (!ok) {
      alert("Unable to load Razorpay checkout script.");
      setBusyCode("");
      return;
    }

    try {
      const orderRes = await createOrder({ amount: plan.amount, planCode: plan.code, currency: "INR" });
      const { orderId, keyId, amount, currency } = orderRes.data;

      const options = {
        key: keyId,
        amount,
        currency,
        name: "Maruti Nandan",
        description: `${plan.title} Subscription`,
        order_id: orderId,
        handler: async function (response) {
          await verifyPayment({
            razorpayOrderId: response.razorpay_order_id,
            razorpayPaymentId: response.razorpay_payment_id,
            razorpaySignature: response.razorpay_signature,
            planCode: plan.code,
          });
          alert("Payment successful! Subscription activated.");
        },
        theme: { color: "#FF6B00" },
      };

      const rzp = new window.Razorpay(options);
      rzp.open();
    } catch (e) {
      alert(e?.response?.data?.message || "Payment initialization failed.");
    } finally {
      setBusyCode("");
    }
  };

  return (
    <section className="page-shell container">
      <h1 className="section-title">Choose Your Path</h1>
      <p className="section-lead">Unlock disciplined training and premium spiritual fitness features.</p>

      <div className="grid-two" style={{ marginTop: "18px" }}>
        {plans.map((plan) => (
          <article key={plan.code} className="glass-card" style={{ padding: "18px" }}>
            <h2 style={{ marginTop: 0 }}>{plan.title}</h2>
            <h3 className="metric-value" style={{ fontSize: "32px", marginTop: "8px" }}>₹{plan.amount}</h3>
            <ul>
              {(plan.features || []).map((feature) => (
                <li key={feature} style={{ marginBottom: "8px", color: "#d8ccb9" }}>{feature}</li>
              ))}
            </ul>
            <button className="btn btn-primary" onClick={() => payNow(plan)} disabled={busyCode === plan.code}>
              {busyCode === plan.code ? "Opening Checkout..." : "Pay with Razorpay"}
            </button>
          </article>
        ))}
      </div>
    </section>
  );
}
