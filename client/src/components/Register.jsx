// Register.jsx
import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import "../index.css";

function Register() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
    image: null, // optional image
  });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleChange = (e) => {
    if (e.target.name === "image") {
      setForm((prev) => ({ ...prev, image: e.target.files[0] }));
    } else {
      setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    }
    setError("");
    setSuccess("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { name, email, phone, password, confirmPassword, image } = form;
    if (!name || !email || !phone || !password || !confirmPassword) {
      setError("Sab fields bhar do.");
      return;
    }
    if (password !== confirmPassword) {
      setError("Password aur Confirm Password match nahi kar rahe.");
      return;
    }

    try {
      const fd = new FormData();
      fd.append("name", name);
      fd.append("email", email);
      fd.append("phone", phone);
      fd.append("password", password);
      fd.append("confirmPassword", confirmPassword);
      if (image) fd.append("image", image);

      const res = await axios.post(
        `${import.meta.env.VITE_API_URL}/api/signup`,
        fd,
        {
          withCredentials: true,
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      if (res.data.status === "success") {
        setSuccess(res.data.message);
        setTimeout(() => navigate("/login"), 2000);
      }
    } catch (err) {
      setError(err.response?.data?.message || "Server error");
    }
  };

  return (
    <div className="auth-wrap d-flex align-items-center justify-content-center">
      <div className="auth-card shadow-sm">
        <div className="auth-brand text-center mb-3">
          <h3>AI Study Buddy</h3>
          <p className="text-muted small">Create your account</p>
        </div>

        {error && <div className="alert alert-danger">{error}</div>}
        {success && <div className="alert alert-success">{success}</div>}

        <form onSubmit={handleSubmit} className="mb-3">
          <div className="mb-2">
            <label className="form-label">Name</label>
            <input
              name="name"
              value={form.name}
              onChange={handleChange}
              className="form-control"
              placeholder="Your name"
            />
          </div>

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
            <label className="form-label">Phone</label>
            <input
              name="phone"
              value={form.phone}
              onChange={handleChange}
              className="form-control"
              placeholder="10 digit phone"
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
              placeholder="Password (min 6 chars)"
            />
          </div>

          <div className="mb-2">
            <label className="form-label">Confirm Password</label>
            <input
              name="confirmPassword"
              value={form.confirmPassword}
              onChange={handleChange}
              type="password"
              className="form-control"
              placeholder="Confirm Password"
            />
          </div>

          <div className="d-grid mb-2">
            <button type="submit" className="btn btn-primary btn-block btn-lg">
              Register
            </button>
          </div>

          <div className="text-center">
            <small className="text-muted">
              Already have an account? <Link to="/login">Login</Link>
            </small>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Register;
