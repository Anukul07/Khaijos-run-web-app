import { useState } from "react";
import axios from "axios";
import "./registration.css";

const Registration = ({ onSwitch, onRegistrationSuccess }) => {
  const [formData, setFormData] = useState({
    email: "",
    name: "",
    password: "",
    contact: "",
  });

  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const [message, setMessage] = useState(""); // ✅ success or error message
  const [loading, setLoading] = useState(false);

  const togglePassword = () => setShowPassword((prev) => !prev);

  const validate = (field, value) => {
    let message = "";
    if (field === "email" && value) {
      const emailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
      if (!emailValid) message = "Invalid email format.";
    }
    if (field === "contact" && value) {
      const contactValid = /^[0-9]{10,}$/.test(value);
      if (!contactValid) message = "Enter at least 10 digits.";
    }
    if (field === "password" && value.length < 6) {
      message = "Password must be at least 6 characters.";
    }
    if (!value) {
      message = "This field is required.";
    }
    return message;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });

    if (touched[name]) {
      const error = validate(name, value);
      setErrors({ ...errors, [name]: error });
    }
  };

  const handleBlur = (e) => {
    const { name, value } = e.target;
    setTouched({ ...touched, [name]: true });
    const error = validate(name, value);
    setErrors({ ...errors, [name]: error });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newErrors = {};
    Object.entries(formData).forEach(([field, value]) => {
      const err = validate(field, value);
      if (err) newErrors[field] = err;
    });

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      setTouched({
        email: true,
        name: true,
        password: true,
        contact: true,
      });
      return;
    }

    try {
      setLoading(true);
      setMessage("");

      const response = await axios.post(
        "http://localhost:5000/api/auth/register",
        {
          name: formData.name,
          email: formData.email,
          password: formData.password,
          phone: formData.contact,
          role: "user",
        }
      );

      onRegistrationSuccess();
      setFormData({ email: "", name: "", password: "", contact: "" });

      setTimeout(() => {
        onSwitch();
      }, 2000);
    } catch (err) {
      const errorMsg =
        err.response?.data?.message || "❌ Something went wrong. Try again.";
      setMessage(errorMsg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="registration-box">
      <h2>Become a member today</h2>
      <p className="auth-switch">
        Already a member? <a onClick={onSwitch}>Log in</a>
      </p>
      <div className="divider">
        <hr />
        <span className="divider-icon">~ ~ ~</span>
        <hr />
      </div>
      {message && <p className="feedback-message">{message}</p>}{" "}
      {/* ✅ Feedback */}
      <form className="registration-form" onSubmit={handleSubmit}>
        {["email", "name", "contact"].map((field) => (
          <div key={field} className="input-group">
            <input
              type={field === "contact" ? "tel" : "text"}
              name={field}
              placeholder={field === "name" ? "Full Name" : capitalize(field)}
              value={formData[field]}
              onChange={handleChange}
              onBlur={handleBlur}
              className={errors[field] && touched[field] ? "error" : ""}
            />
            {errors[field] && touched[field] && (
              <p className="error-text">{errors[field]}</p>
            )}
          </div>
        ))}

        <div className="input-group password-wrapper">
          <input
            type={showPassword ? "text" : "password"}
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            onBlur={handleBlur}
            className={errors.password && touched.password ? "error" : ""}
          />
          <span onClick={togglePassword} className="toggle-password">
            {showPassword ? "🙈" : "👁️"}
          </span>
          {errors.password && touched.password && (
            <p className="error-text">{errors.password}</p>
          )}
        </div>

        <button
          type="submit"
          className="registration-button"
          disabled={loading}
        >
          <span>{loading ? "Registering..." : "Register"}</span>
        </button>
      </form>
    </div>
  );
};

const capitalize = (s) => s.charAt(0).toUpperCase() + s.slice(1);

export default Registration;
