import { motion } from "framer-motion";
import { Target } from "lucide-react";
import { stats } from "./aboutData";
import "../../styles/AboutPage.css";

export default function AboutMissionSection() {
  return (
    <section className="about-mission" dir="rtl">
      <div className="about-container">
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="about-mission__content"
        >
          <div className="about-pill">
            <Target size={16} />
            <span>המשימה שלנו</span>
          </div>

          <h2 className="about-h2">להוביל את מהפכת השחייה בישראל</h2>

          <p className="about-p">
            שחייה פלוס נולדה מתוך אמונה פשוטה — שכל ישראלי צריך לדעת לשחות.
            אנחנו יוצרים פלטפורמה דיגיטלית שמחברת בין כל השחקנים בעולם השחייה תחת קורת גג אחת.
          </p>

          <p className="about-p">
            מתלמידים שמחפשים את הקורס המושלם, דרך מדריכים שרוצים להרחיב את פעילותם,
            ועד בתי ספר שמבקשים לנהל את הפעילות שלהם בצורה חכמה ויעילה.
          </p>

          {/* ✅ stats בשורה מתחת למשימה */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.45, delay: 0.05 }}
            className="about-stats-inline"
          >
            {stats.map((s) => (
              <div key={s.label} className="about-stats-inline__item">
                <strong className="about-stats-inline__value">{s.value}</strong>
                <span className="about-stats-inline__label">{s.label}</span>
              </div>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
