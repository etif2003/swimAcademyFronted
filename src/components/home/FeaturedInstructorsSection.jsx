import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import InstructorCard from "../Instructors/InstructorCard";
import "../../styles/FeaturedSection.css"; // 👈 אותו CSS!
import { ArrowLeft } from "lucide-react";
import { useInstructors } from "../../hooks/Instructor/useInstructors";


const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.12 },
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

export function FeaturedInstructorsSection() {
  const { data: instructors = [], isLoading, isError } = useInstructors();

  if (isLoading) return <div>...טוען מדריכים</div>;
  if (isError) return <div>שגיאה בטעינת מדריכים</div>;

  const popularInstructors = [...instructors]
    // .sort((a, b) => b.studentsCount - a.studentsCount)
    .slice(0, 4);

  return (
    <section className="featured featured-light-blue">
      <div className="featured-container">
        {/* 🔹 Header – זהה לקורסים */}
        <motion.div
          className="featured-header"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <div className="featured-badge-title">
            <span className="featured-badge">מדריכים מומלצים</span>
            <h2 className="featured-title">המדריכים הפופולריים ביותר</h2>
          </div>

          <Link to="/instructors" className="view-all-btn">
            צפייה בכל המדריכים
            <span className="view-all-arrow">
              <ArrowLeft size={20} />
            </span>
          </Link>
        </motion.div>

        {/* 🔹 Grid – זהה לקורסים */}
        <motion.div
          className="featured-grid"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {popularInstructors.map((instructor) => (
            <motion.div key={instructor._id} variants={itemVariants}>
              <InstructorCard instructor={instructor} />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
