import { motion } from "framer-motion";
import ContactInfoCard from "./ContactInfoCard";
import ContactHoursCard from "./ContactHoursCard";
import ContactFormCard from "./ContactFormCard";
import "../../styles/ContactPage.css";

export default function ContactMainSection() {
  return (
    <section className="contact" dir="rtl">
      <div className="contact__container">
        <div className="contact__grid">
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.45 }}
            className="contact__side"
          >
            <ContactInfoCard email={"info@swimming-plus.co.il"} phone={"03-1234567"} address={"תל אביב, ישראל"} />
            <ContactHoursCard />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.45, delay: 0.06 }}
          >
            <ContactFormCard />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
