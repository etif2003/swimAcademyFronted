import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import CourseCard from "../courses/CourseCard";
import "../../styles/FeaturedSection.css";
import { ArrowLeft } from "lucide-react";
import { useCourses } from "../../hooks/useCourses";

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

export function FeaturedCoursesSection() {
  const { data: courses = [], isLoading, isError } = useCourses();

  if (isLoading) return <div>...טוען קורסים</div>;
  if (isError) return <div>שגיאה בטעינת קורסים</div>;

  const popularCourses = [...courses]
    .sort((a, b) => b.currentParticipants - a.currentParticipants)
    .slice(0, 4);

  return (
    <section className="featured">
      <div className="featured-container">
        {/* Header */}
        <motion.div
          className="featured-header"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <div className="featured-badge-title">
            <span className="featured-badge">קורסים מומלצים</span>
            <h2 className="featured-title">הקורסים הפופולריים ביותר</h2>
          </div>

          <Link to="/courses" className="view-all-btn">
            צפייה בכל הקורסים
            <span className="view-all-arrow">
              <ArrowLeft size={20} />
            </span>
          </Link>
        </motion.div>

        {/* Grid */}
        <motion.div
          className="featured-grid"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {popularCourses.map((course) => (
            <motion.div key={course._id} variants={itemVariants}>
              <CourseCard course={course} />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
