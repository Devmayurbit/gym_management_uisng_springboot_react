import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { loginUser } from "../api/api";

export default function Login() {
  const [form, setForm] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const onSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await loginUser(form);
      localStorage.setItem("mn_token", res.data.token);
      localStorage.setItem("mn_user", JSON.stringify(res.data.user));
      navigate("/dashboard");
    } catch (err) {
      alert(err?.response?.data?.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="page-shell container">
      <div className="auth-wrap glass-card" style={{ padding: "22px" }}>
        <h1 className="section-title" style={{ fontSize: "34px" }}>Login</h1>
        <p className="section-lead">Return to your Akhada dashboard.</p>

        <form onSubmit={onSubmit}>
          <input className="field" type="email" placeholder="Email" value={form.email} onChange={(e) => setForm((p) => ({ ...p, email: e.target.value }))} required />
          <div style={{ height: "10px" }} />
          <input className="field" type="password" placeholder="Password" value={form.password} onChange={(e) => setForm((p) => ({ ...p, password: e.target.value }))} required />
          <div style={{ height: "14px" }} />
          <button className="btn btn-primary" type="submit" disabled={loading}>{loading ? "Please wait..." : "Enter"}</button>
        </form>

        <p style={{ marginTop: "12px", color: "#d5c8b5" }}>
          New here? <Link to="/register" style={{ color: "#ffd700" }}>Create account</Link>
        </p>
      </div>
    </section>
  );
}
