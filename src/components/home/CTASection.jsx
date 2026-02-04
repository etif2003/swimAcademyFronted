import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { motion } from "framer-motion";
import "../../styles/CTASection.css";

export function CTASection() {
  return (
    <section className="cta">
      <motion.div
        className="cta-card"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      >
        <h2 className="cta-title">
          מוכנים להתחיל את מסע השחייה שלכם?
        </h2>

        <p className="cta-subtitle">
          הצטרפו לאלפי תלמידים שכבר גילו את הקסם של השחייה עם המדריכים
          המובילים בישראל
        </p>

        <div className="cta-actions">
          <Link to="/auth?mode=signup" className="cta-btn outline">
            הירשמו בחינם
          </Link>

          <Link to="/courses" className="cta-btn solid">
            מצאו קורס עכשיו
            <ArrowLeft size={18} />
          </Link>
        </div>

        {/* wave */}
        <div className="cta-wave">
          <svg viewBox="0 0 1440 120" preserveAspectRatio="none">
            <path
              d="M0,64 C240,96 480,96 720,80 960,64 1200,32 1440,48 L1440,120 L0,120 Z"
              fill="rgba(255,255,255,0.15)"
            />
          </svg>
        </div>
      </motion.div>
    </section>
  );
}
