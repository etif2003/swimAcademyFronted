import { motion } from "framer-motion";
import { Waves } from "lucide-react";
import "../../styles/AboutPage.css";

export default function AboutCTASection() {
  return (
    <section className="about-cta" dir="rtl">
      <div className="about-container">
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="about-cta__box"
        >
          <Waves size={40} className="about-cta__icon" />
          <h2 className="about-cta__title">רוצים להצטרף למשפחת שחייה פלוס?</h2>
          <p className="about-cta__desc">
            הצטרפו לאלפי תלמידים, מדריכים ובתי ספר שכבר חלק מהקהילה שלנו.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
