import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./login.css";

const Login = ({ onSwitch, onLoginSuccess }) => {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const togglePassword = () => setShowPassword((prev) => !prev);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const response = await axios.post(
        "http://localhost:5000/api/auth/login",
        formData
      );
      const { token, user } = response.data;

      localStorage.setItem("token", token);
      localStorage.setItem("user", JSON.stringify(user));

      onLoginSuccess();
    } catch (err) {
      const msg = err.response?.data?.message || "❌ Login failed. Try again.";
      setError(msg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className="login-box">
        <h2>Welcome back</h2>
        <p>Let’s log you in to your account</p>
        <p className="login-auth-switch">
          Not a member yet? <a onClick={onSwitch}>Create account</a>
        </p>
        <div className="login-divider">
          <hr />
          <span className="login-divider-icon">~ ~ ~</span>
          <hr />
        </div>

        {error && <p id="login-error-message">{error}</p>}

        <form className="login-form" onSubmit={handleSubmit}>
          <input
            type="email"
            name="email"
            placeholder="Email"
            required
            value={formData.email}
            onChange={handleChange}
          />
          <div className="login-password-wrapper">
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              placeholder="Password"
              required
              value={formData.password}
              onChange={handleChange}
            />
            <span onClick={togglePassword} className="login-toggle-password">
              {showPassword ? "🙈" : "👁️"}
            </span>
          </div>
          <div className="login-form-links">
            <span>Forgot your password?</span>
            <a href="#">Reset password</a>
          </div>
          <button className="login-button" type="submit" disabled={loading}>
            <span>{loading ? "Logging in..." : "Log In"}</span>
          </button>
        </form>
      </div>
    </>
  );
};

export default Login;
