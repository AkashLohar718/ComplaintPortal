import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Navbar from "../../components/Navbar/Navbar";
import Footer from "../../components/Footer/Footer";
import API from "../../services/api";
import "./Login.css";

function Login() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
    role: "user",
  });

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setError("");
    setLoading(true);

    try {
      const response = await API.post("/auth/login", {
        email: formData.email,
        password: formData.password,
      });

      console.log("Login response:", response.data);

      const { user, token } = response.data;
    

// Check selected role
if (user.role !== formData.role) {
  setError(`You are not registered as ${formData.role}.`);
  setLoading(false);
  return;
}

// Save JWT token
localStorage.setItem("token", token);

// Save user information
localStorage.setItem("user", JSON.stringify(user));

// Redirect according to role
if (user.role === "admin") {
  navigate("/admin-dashboard");
} else {
  navigate("/dashboard");
}

    } catch (error) {
      setError(
        error.response?.data?.message ||
          "Login failed. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <Navbar />

      <main className="login-page">
        <div className="login-container">

          <div className="login-header">
            <h1>Welcome Back</h1>
            <p>Login to manage and track your complaints.</p>
          </div>

          <form className="login-form" onSubmit={handleSubmit}>

            <div className="form-group">
              <label htmlFor="email">Email Address</label>
              <input
                type="email"
                id="email"
                name="email"
                placeholder="Enter your email"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="password">Password</label>
              <input
                type="password"
                id="password"
                name="password"
                placeholder="Enter your password"
                value={formData.password}
                onChange={handleChange}
                required
              />
            </div>

            <div className="role-section">
              <p>Login as</p>

              <div className="role-options">

                <label>
                  <input
                    type="radio"
                    name="role"
                    value="user"
                    checked={formData.role === "user"}
                    onChange={handleChange}
                  />
                  User
                </label>

                <label>
                  <input
                    type="radio"
                    name="role"
                    value="admin"
                    checked={formData.role === "admin"}
                    onChange={handleChange}
                  />
                  Admin
                </label>

              </div>
            </div>

            {error && (
              <p className="form-error">{error}</p>
            )}

            <button
              type="submit"
              className="login-btn"
              disabled={loading}
            >
              {loading ? "Logging in..." : "Login"}
            </button>

          </form>

          <div className="login-footer">
            <p>
              Don't have an account?{" "}
              <Link to="/register">Create an account</Link>
            </p>
          </div>

        </div>
      </main>

      <Footer />
    </div>
  );
}

export default Login;