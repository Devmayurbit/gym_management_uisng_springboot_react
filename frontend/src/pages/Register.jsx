import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { registerUser, sendOtp, verifyOtp } from "../api/api";

export default function Register() {
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [otp, setOtp] = useState("");
  const [otpSent, setOtpSent] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSendOtp = async () => {
    if (!form.email) return alert("Please enter email first.");
    await sendOtp(form.email);
    setOtpSent(true);
    alert("OTP sent. Check backend logs or configured email inbox.");
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      if (otpSent && otp) {
        await verifyOtp({ email: form.email, otp });
      }
      await registerUser(form);
      navigate("/login");
    } catch (err) {
      alert(err?.response?.data?.message || "Registration failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="page-shell container">
      <div className="auth-wrap glass-card" style={{ padding: "22px" }}>
        <h1 className="section-title" style={{ fontSize: "34px" }}>Register</h1>
        <p className="section-lead">Begin your Maruti Nandan journey.</p>

        <form onSubmit={onSubmit}>
          <input className="field" type="text" placeholder="Full name" value={form.name} onChange={(e) => setForm((p) => ({ ...p, name: e.target.value }))} required />
          <div style={{ height: "10px" }} />
          <input className="field" type="email" placeholder="Email" value={form.email} onChange={(e) => setForm((p) => ({ ...p, email: e.target.value }))} required />
          <div style={{ height: "10px" }} />
          <input className="field" type="password" placeholder="Password" value={form.password} onChange={(e) => setForm((p) => ({ ...p, password: e.target.value }))} required />
          <div style={{ display: "flex", gap: "8px", marginTop: "10px" }}>
            <input className="field" type="text" placeholder="OTP" value={otp} onChange={(e) => setOtp(e.target.value)} />
            <button className="btn btn-outline" type="button" onClick={handleSendOtp}>Send OTP</button>
          </div>
          <div style={{ height: "14px" }} />
          <button className="btn btn-primary" type="submit" disabled={loading}>{loading ? "Please wait..." : "Create Account"}</button>
        </form>

        <p style={{ marginTop: "12px", color: "#d5c8b5" }}>
          Already registered? <Link to="/login" style={{ color: "#ffd700" }}>Login</Link>
        </p>
      </div>
    </section>
  );
}
