import { motion } from "framer-motion";
import { Target } from "lucide-react";
import { stats } from "./aboutData";
import "../../styles/AboutPage.css";

export default function AboutMissionSection() {
  return (
    <section className="about-mission" dir="rtl">
      <div className="about-container about-mission__grid">
        <motion.div
          initial={{ opacity: 0, x: 24 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
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
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: -24 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="about-stats"
        >
          {stats.map((s, i) => (
            <div key={s.label} className="about-stats__row">
              <div className="about-stats__value">{s.value}</div>
              <div className="about-stats__label">{s.label}</div>
              {i < stats.length - 1 ? <div className="about-stats__divider" /> : null}
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
