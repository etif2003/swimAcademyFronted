import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../styles/LoginForm.css";
import { login } from "../api/auth";
import { Mail, Lock, ArrowLeft } from "lucide-react";

const LoginForm = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: undefined,
      }));
    }
  };

  const validate = () => {
    const newErrors = {};

    if (!formData.email) {
      newErrors.email = "יש להזין אימייל";
    }

    if (!formData.password) {
      newErrors.password = "יש להזין סיסמה";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validate()) return;

    try {
      const data = await login(formData);

      // שמירת טוקן
      localStorage.setItem("token", data.token);

      // שמירת משתמש
      localStorage.setItem(
        "user",
        JSON.stringify({
          id: data._id,
          fullName: data.fullName,
          role: data.role,
        }),
      );

      // ניווט לדף הבית (בעתיד לפי role)
      navigate("/");
    } catch (error) {
      setErrors({ general: error.message });
    }
  };

  return (
    <div className="login-container">
      <h1 className="title">ברוכים השבים!</h1>
      <p className="subtitle">התחברו לחשבון שלכם</p>

      <form onSubmit={handleSubmit} className="form">
        {/* אימייל */}
        <div className={`field icon-field ${errors.email ? "error" : ""}`}>
          <label>אימייל</label>
          <div className="input-wrapper">
            <input
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="email@example.com"
            />
            <Mail className="input-icon" />
          </div>
          {errors.email && <span className="error-text">{errors.email}</span>}
        </div>

        {/* סיסמה */}
        <div className={`field icon-field ${errors.password ? "error" : ""}`}>
          <div className="password-header">
            <label>סיסמה</label>
            <Link to="/forgot-password" className="forgot-link">
              שכחתי סיסמה
            </Link>
          </div>

          <div className="input-wrapper">
            <input
              name="password"
              type="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="••••••••"
            />
            <Lock className="input-icon" />
          </div>

          {errors.password && (
            <span className="error-text">{errors.password}</span>
          )}
        </div>

        {/* שגיאה כללית */}
        {errors.general && (
          <div className="error-text center">{errors.general}</div>
        )}

        {/* כפתור */}
        <button type="submit" className="submit-button primary">
          התחברות
          <span className="login-arrow">
            <ArrowLeft size={20} />
          </span>
        </button>
      </form>
    </div>
  );
};

export default LoginForm;
