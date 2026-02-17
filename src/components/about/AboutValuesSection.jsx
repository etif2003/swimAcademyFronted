import { motion } from "framer-motion";
import { values } from "./aboutData";
import "../../styles/AboutPage.css";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.12 } },
};
const itemVariants = {
  hidden: { opacity: 0, y: 18 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.45, ease: "easeOut" } },
};

export default function AboutValuesSection() {
  return (
    <section className="about-values" dir="rtl">
      <div className="about-container">
        <div className="about-values__head">
          <div className="about-pill about-pill--light">הערכים שלנו</div>
          <h2 className="about-h2 about-h2--center">מה מנחה אותנו</h2>
          <p className="about-p about-p--center">הערכים שמנחים אותנו בכל מה שאנחנו עושים</p>
        </div>

        <motion.div
          className="about-values__grid"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {values.map((v) => {
            const Icon = v.icon;
            return (
              <motion.article key={v.title} variants={itemVariants} className="about-card">
                <div className="about-card__icon">
                  <Icon size={26} />
                </div>
                <h3 className="about-card__title">{v.title}</h3>
                <p className="about-card__desc">{v.description}</p>
              </motion.article>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
