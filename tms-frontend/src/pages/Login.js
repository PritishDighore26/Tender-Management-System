import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { loginUser, getCaptcha } from "../services/api";
import { useAuth } from "../context/AuthContext";
import './Login.css'
export default function Login() {
  const [form, setForm] = useState({ email: "", password: "", captcha: "" });
  const [captcha, setCaptcha] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const { signIn } = useAuth();
  const navigate = useNavigate();

  const fetchCaptcha = async () => {
    const c = await getCaptcha();
    setCaptcha(c);
  };

  useEffect(() => {
    fetchCaptcha();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (form.captcha !== captcha) {
      setError("Invalid captcha. Please try again.");
      fetchCaptcha();
      setForm((f) => ({ ...f, captcha: "" }));
      return;
    }

    setLoading(true);
    try {
      const userData = await loginUser(form.email, form.password);
      if (userData) {
        signIn(userData);   // userData contains email + photo
        navigate("/dashboard");
      } else {
        setError("Invalid email or password.");
        fetchCaptcha();
      }
    } catch {
      setError("Server error. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-card">
        <div className="auth-brand">
          <span className="brand-icon">⬡</span>
          <h1>TMS Portal</h1>
          <p>Tender Management System</p>
        </div>

        <form onSubmit={handleSubmit} className="auth-form">
          <h2>Sign In</h2>

          {error && <div className="alert alert-error">{error}</div>}

          <div className="form-group">
            <label>Email Address</label>
            <input
              type="email"
              placeholder="you@example.com"
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              required
            />
          </div>

          <div className="form-group">
            <label>Password</label>
            <input
              type="password"
              placeholder="••••••••"
              value={form.password}
              onChange={(e) => setForm({ ...form, password: e.target.value })}
              required
            />
          </div>

          <div className="form-group captcha-group">
            <label>Captcha Verification</label>
            <div className="captcha-row">
              <div className="captcha-display">{captcha}</div>
              <button type="button" className="btn-refresh" onClick={fetchCaptcha}>↺</button>
            </div>
            <input
              type="text"
              placeholder="Enter captcha above"
              value={form.captcha}
              onChange={(e) => setForm({ ...form, captcha: e.target.value })}
              required
            />
          </div>

          <button type="submit" className="btn-primary" disabled={loading}>
            {loading ? "Signing in..." : "Sign In"}
          </button>

          <p className="auth-link">
            No account? <Link to="/register">Register here</Link>
          </p>
        </form>
      </div>
    </div>
  );
}
