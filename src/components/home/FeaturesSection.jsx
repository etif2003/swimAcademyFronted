import { motion } from "framer-motion";
import { Award, Users, School, HeartHandshake } from "lucide-react";
import "../../styles/FeaturesSection.css";

const features = [
  {
    icon: Award,
    title: "קורסים מותאמים אישית",
    description:
      "מגוון רחב של קורסים לכל הגילאים והרמות, מהבסיס ועד אימון מקצועי",
  },
  {
    icon: Users,
    title: "מדריכים מוסמכים",
    description:
      "כל המדריכים שלנו עברו הכשרה מקצועית ובעלי ניסיון מוכח",
  },
  {
    icon: School,
    title: "בתי ספר מובילים",
    description:
      "שיתוף פעולה עם בתי ספר לשחייה מהמובילים בארץ",
  },
  {
    icon: HeartHandshake,
    title: "קהילה תומכת",
    description:
      "קהילת שחייה פעילה עם ליווי ותמיכה לאורך כל הדרך",
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.15 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: "easeOut" },
  },
};

export function FeaturesSection() {
  return (
    <section className="features">
      <div className="features-container">

        {/* Header */}
        <motion.div
          className="features-header"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <span className="features-badge">למה לבחור בנו?</span>
          <h2 className="features-title">
            הפלטפורמה השלמה לעולם השחייה
          </h2>
          <p className="features-subtitle">
            כל הכלים, האנשים והקורסים במקום אחד – כדי שתוכלו להתמקד בלשחות
          </p>
        </motion.div>

        {/* Cards */}
        <motion.div
          className="features-grid"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {features.map((feature, index) => {
            const Icon = feature.icon;

            return (
              <motion.div
                key={index}
                className="feature-card"
                variants={itemVariants}
              >
                {/* 🔹 icon wrapper */}
                <div className="feature-icon-wrapper">
                  <Icon className="feature-icon" />
                </div>

                <h3 className="feature-title">{feature.title}</h3>
                <p className="feature-text">{feature.description}</p>
              </motion.div>
            );
          })}
        </motion.div>

      </div>
    </section>
  );
}
