const mockCourses = [
  {
    _id: "1",
    title: "שחייה למתחילים – ילדים",
    price: 150,
    level: "Beginner",
    targetAudience: "Children",
    image:
      "https://images.unsplash.com/photo-1530549387789-4c1017266635?w=400&h=300&fit=crop",
    location: { city: "תל אביב" },
    sessionsCount: 12,
    maxParticipants: 6,
    registrationsCount: 87,
  },
  {
    _id: "2",
    title: "קורס שחייה למבוגרים",
    price: 200,
    level: "Advanced",
    targetAudience: "Adults",
    image:
      "https://images.unsplash.com/photo-1519315901367-f34ff9154487?w=400&h=300&fit=crop",
    location: { city: "הרצליה" },
    sessionsCount: 10,
    maxParticipants: 4,
    registrationsCount: 124,
  },
  {
    _id: "3",
    title: "אימון שחייה תחרותית",
    price: 250,
    level: "Professional",
    targetAudience: "Teens",
    image:
      "https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?w=400&h=300&fit=crop",
    location: { city: "נתניה" },
    sessionsCount: 16,
    maxParticipants: 4,
    registrationsCount: 62,
  },
  {
    _id: "4",
    title: "שחייה טיפולית",
    price: 180,
    level: "Beginner",
    targetAudience: "Seniors",
    image:
      "https://images.unsplash.com/photo-1600965962361-9035dbfd1c50?w=400&h=300&fit=crop",
    location: { city: "רמת גן" },
    sessionsCount: 8,
    maxParticipants: 1,
    registrationsCount: 98,
  },
  {
    _id: "5",
    title: "קבוצת אימון נוער",
    price: 170,
    level: "Advanced",
    targetAudience: "Teens",
    image:
      "https://images.unsplash.com/photo-1507034589631-9433cc6bc453?w=400&h=300&fit=crop",
    location: { city: "חיפה" },
    sessionsCount: 14,
    maxParticipants: 8,
    registrationsCount: 140,
  },
];

import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import CourseCard from "../courses/CourseCard";
import "../../styles/FeaturedSection.css";
import { ArrowLeft } from "lucide-react";

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
  const popularCourses = [...mockCourses]
    .sort((a, b) => b.registrationsCount - a.registrationsCount)
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
