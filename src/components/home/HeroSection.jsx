import { Link } from "react-router-dom";
import { GraduationCap, Users, School } from "lucide-react";
import "../../styles/HeroSection.css";
import heroImage from "../../assets/heroImage.jpg";
import { motion } from "framer-motion";

const heroContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
    },
  },
};

const heroItem = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: "easeOut" },
  },
};

export function HeroSection() {
  return (
    <section className="hero" style={{ backgroundImage: `url(${heroImage})` }}>
      <div className="hero-overlay" />

      {/* 🔥 content with animation */}
      <motion.div
        className="hero-content"
        variants={heroContainer}
        initial="hidden"
        animate="visible"
      >
        <motion.span className="hero-badge" variants={heroItem}>
          פלטפורמת השחייה המובילה בישראל
        </motion.span>

        <motion.h1 className="hero-title" variants={heroItem}>
          עולם השחייה
          <br />
          <span>במקום אחד</span>
        </motion.h1>

        <motion.p className="hero-description" variants={heroItem}>
          מחברים בין תלמידים, מדריכי שחייה מקצועיים ובתי ספר לשחייה. מצאו את
          הקורס המושלם עבורכם והתחילו לשחות כבר היום
        </motion.p>

        <motion.div className="hero-actions" variants={heroItem}>
          <Link to="/courses" className="hero-btn primary">
            <GraduationCap />
            אני רוצה ללמוד שחייה
          </Link>

          <Link
            to="/auth?mode=signup&role=instructor"
            className="hero-btn outline"
          >
            <Users />
            אני מדריך שחייה
          </Link>

          <Link to="/auth?mode=signup&role=school" className="hero-btn outline">
            <School />
            אני בית ספר לשחייה
          </Link>
        </motion.div>

        <motion.div className="hero-stats" variants={heroItem}>
          <div>
            <strong>+10K</strong>
            <span>תלמידים מרוצים</span>
          </div>
          <div>
            <strong>+50</strong>
            <span>בתי ספר</span>
          </div>
          <div>
            <strong>+200</strong>
            <span>מדריכים מוסמכים</span>
          </div>
          <div>
            <strong>+500</strong>
            <span>קורסים פעילים</span>
          </div>
        </motion.div>
      </motion.div>

      {/* 🌊 wave with soft animation */}
      <motion.div
        className="hero-wave"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.6 }}
      >
        <svg viewBox="0 0 1440 120" preserveAspectRatio="none">
          <path
            d="M0,32 C240,96 480,96 720,64 960,32 1200,0 1440,16 L1440,120 L0,120 Z"
            fill="white"
          />
        </svg>
      </motion.div>
    </section>
  );
}
