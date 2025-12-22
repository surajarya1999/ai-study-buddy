// Login.jsx
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

import "../index.css";

function Login({ onSuccess }) {
  const navigate = useNavigate();
  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    setError("");
    setSuccess("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { email, password } = form;

    if (!email || !password) {
      setError("Email aur password dal do.");
      return;
    }

    try {
      const res = await axios.post(
        `${import.meta.env.VITE_API_URL}/api/signin`,
        { email, password },
        { withCredentials: true }
      );

      if (res.data.status === "success") {
        setSuccess(res.data.message);

        // Save user info in localStorage
        localStorage.setItem(
          "currentUser",
          JSON.stringify({
            id: res.data.user._id,
            name: res.data.user.name,
            email: res.data.user.email,
          })
        );

        // Agar onSuccess prop hai, call it
        if (onSuccess) {
          onSuccess(); // redirect Flashcard generate page
        } else {
          // normal login page redirect
          setTimeout(() => navigate("/"), 1000);
        }
      }
    } catch (err) {
      console.error(err);
      setError(err.response?.data?.message || "Server error");
    }
  };

  return (
    <div
      className="auth-wrap d-flex align-items-center justify-content-center position-fixed top-0 start-0 w-100 h-100 bg-dark bg-opacity-50"
      style={{ zIndex: 10 }}
    >
      <div className="auth-card shadow-sm">
        <div className="auth-brand text-center mb-3">
          <h3>Welcome Back</h3>
          <p className="text-muted small">Login to your account</p>
        </div>

        {error && <div className="alert alert-danger">{error}</div>}
        {success && <div className="alert alert-success">{success}</div>}

        <form onSubmit={handleSubmit}>
          <div className="mb-2">
            <label className="form-label">Email</label>
            <input
              name="email"
              value={form.email}
              onChange={handleChange}
              className="form-control"
              placeholder="name@example.com"
            />
          </div>

          <div className="mb-2">
            <label className="form-label">Password</label>
            <input
              name="password"
              value={form.password}
              onChange={handleChange}
              type="password"
              className="form-control"
              placeholder="Password"
            />
          </div>

          <div className="d-grid mb-2">
            <button type="submit" className="btn btn-primary btn-lg">
              Login
            </button>
          </div>

          <div className="text-center">
            <small className="text-muted">
              New account? <Link to="/register">Register</Link>
            </small>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Login;
