import { Link } from "react-router-dom";
import { GraduationCap, Users, School } from "lucide-react";
import "../../styles/HeroSection.css";

export function HeroSection() {
  return (
    <section className="hero">
      <div className="hero-overlay" />

      <div className="hero-content">
        <span className="hero-badge">
          🏊 פלטפורמת השחייה המובילה בישראל
        </span>

        <h1 className="hero-title">
          עולם השחייה
          <br />
          <span>במקום אחד</span>
        </h1>

        <p className="hero-description">
          חיבור חכם בין תלמידים, מדריכי שחייה ובתי ספר.
          מוצאים קורס, נרשמים – ומתחילים לשחות.
        </p>

        <div className="hero-actions">
          <Link to="/courses" className="hero-btn primary">
            <GraduationCap />
            אני רוצה ללמוד
          </Link>

          <Link
            to="/auth?mode=signup&role=instructor"
            className="hero-btn outline"
          >
            <Users />
            אני מדריך
          </Link>

          <Link
            to="/auth?mode=signup&role=school"
            className="hero-btn outline"
          >
            <School />
            אני בית ספר
          </Link>
        </div>
      </div>
    </section>
  );
}
