import { useState } from "react";
import "./../styles/login.css";

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const togglePassword = () => setShowPassword((prev) => !prev);

  return (
    <div className="login-box">
      <h2>Welcome back</h2>
      <p>Let’s log you in to your account</p>
      <p className="auth-switch">
        Not a member yet? <a href="#">Create account</a>
      </p>
      <div className="divider">
        <hr />
        <span className="divider-icon">~ ~ ~</span>
        <hr />
      </div>
      <form className="login-form">
        <input type="email" placeholder="Email" required />
        <div className="password-wrapper">
          <input
            type={showPassword ? "text" : "password"}
            placeholder="Password"
            required
          />
          <span onClick={togglePassword} className="toggle-password">
            {showPassword ? "🙈" : "👁️"}
          </span>
        </div>
        <div className="form-links">
          <span>Forgot your password?</span>
          <a href="#">Reset password</a>
        </div>
        <button className="login-button">
          <span>Log In</span>
        </button>
      </form>
    </div>
  );
};

export default Login;
