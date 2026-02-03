import { useState } from "react";
import { Link } from "react-router-dom";
import "../styles/RegisterForm.css";
import { GraduationCap, Users, School } from "lucide-react";
import { register } from "../api/auth";

const RegisterForm = () => {
  const [role, setRole] = useState("student");

  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    password: "",
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    // ניקוי שגיאה בזמן הקלדה
    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: undefined,
      }));
    }
  };

  const validate = () => {
    const newErrors = {};

    if (!formData.fullName.trim()) {
      newErrors.fullName = "יש להזין שם מלא";
    }

    if (!formData.email) {
      newErrors.email = "יש להזין אימייל";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "אימייל לא תקין";
    }

    if (!formData.phone) {
      newErrors.phone = "יש להזין מספר טלפון";
    } else if (!/^05\d{8}$/.test(formData.phone)) {
      newErrors.phone = "מספר טלפון לא תקין";
    }

    if (!formData.password) {
      newErrors.password = "יש להזין סיסמה";
    } else if (formData.password.length < 6) {
      newErrors.password = "הסיסמה חייבת להכיל לפחות 6 תווים";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validate()) return;

    const payload = {
      ...formData,
      role:
        role === "student"
          ? "Student"
          : role === "instructor"
            ? "Instructor"
            : "School",
    };

    try {
      const data = await register(payload);
      console.log("SUCCESS:", data);

      // כאן בהמשך:
      // localStorage.setItem("token", data.token);
      // navigate("/");
    } catch (error) {
      console.error(error.message);

      // שגיאה כללית (לדוגמה: אימייל קיים)
      setErrors((prev) => ({
        ...prev,
        general: error.message,
      }));
    }
  };

  return (
    <div className="register-container">
      <h1 className="title">הצטרפו אלינו!</h1>
      <p className="subtitle">צרו חשבון והתחילו את מסע השחייה שלכם</p>

      {/* בחירת תפקיד */}
      <div className="role-section">
        <p className="label">אני...</p>

        <div className="role-cards">
          <button
            type="button"
            className={`role-card ${role === "school" ? "active" : ""}`}
            onClick={() => setRole("school")}
          >
            <School className="role-icon" />
            <span>בית ספר</span>
          </button>

          <button
            type="button"
            className={`role-card ${role === "instructor" ? "active" : ""}`}
            onClick={() => setRole("instructor")}
          >
            <Users className="role-icon" />
            <span>מדריך/ה</span>
          </button>

          <button
            type="button"
            className={`role-card ${role === "student" ? "active" : ""}`}
            onClick={() => setRole("student")}
          >
            <GraduationCap className="role-icon" />
            <span>תלמיד/ה</span>
          </button>
        </div>
      </div>

      {/* טופס */}
      <form onSubmit={handleSubmit} className="form">
        <div className={`field ${errors.fullName ? "error" : ""}`}>
          <label>שם מלא</label>
          <input
            name="fullName"
            value={formData.fullName}
            onChange={handleChange}
            placeholder="ישראל ישראלי"
          />
          {errors.fullName && (
            <span className="error-text">{errors.fullName}</span>
          )}
        </div>

        <div className={`field ${errors.email ? "error" : ""}`}>
          <label>אימייל</label>
          <input
            name="email"
            type="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="email@example.com"
          />
          {errors.email && <span className="error-text">{errors.email}</span>}
        </div>

        <div className={`field ${errors.phone ? "error" : ""}`}>
          <label>טלפון</label>
          <input
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            placeholder="0500000000"
          />
          {errors.phone && <span className="error-text">{errors.phone}</span>}
        </div>

        <div className={`field ${errors.password ? "error" : ""}`}>
          <label>סיסמה</label>
          <input
            name="password"
            type="password"
            value={formData.password}
            onChange={handleChange}
            placeholder="לפחות 6 תווים"
          />
          {errors.password && (
            <span className="error-text">{errors.password}</span>
          )}
        </div>
        {/* שגיאה כללית מהשרת */}
        {errors.general && (
          <div className="error-text" style={{ textAlign: "center" }}>
            {errors.general}
          </div>
        )}
        <button type="submit" className="submit-button">
          יצירת חשבון
        </button>

        <p className="terms">
          בהרשמה אתם מסכימים ל<Link to="/terms"> תנאי השימוש </Link>
          ול
          <Link to="/privacy"> מדיניות הפרטיות </Link>
        </p>
      </form>
    </div>
  );
};

export default RegisterForm;
