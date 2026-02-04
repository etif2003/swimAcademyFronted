import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import InstructorCard from "../Instructors/InstructorCard";
import "../../styles/FeaturedSection.css"; // 👈 אותו CSS!
import { ArrowLeft } from "lucide-react";

const mockInstructors = [
  {
    _id: "i1",
    fullName: "יוסי אברהם",
    location: "חיפה",
    experienceYears: 12,
    hourlyRate: 250,
    image: "https://randomuser.me/api/portraits/men/54.jpg",
    rating: 4.9,
    studentsCount: 180,
  },
  {
    _id: "i2",
    fullName: "דני כהן",
    location: "תל אביב",
    experienceYears: 15,
    hourlyRate: 200,
    image: "https://randomuser.me/api/portraits/men/32.jpg",
    rating: 4.8,
    studentsCount: 240,
  },
  {
    _id: "i3",
    fullName: "רותי שמש",
    location: "רמת גן",
    experienceYears: 18,
    hourlyRate: 260,
    image: "https://randomuser.me/api/portraits/women/68.jpg",
    rating: 5.0,
    studentsCount: 310,
  },
  {
    _id: "i4",
    fullName: "מיכל לוי",
    location: "הרצליה",
    experienceYears: 9,
    hourlyRate: 220,
    image: "https://randomuser.me/api/portraits/women/45.jpg",
    rating: 4.7,
    studentsCount: 130,
  },
  {
    _id: "i5",
    fullName: "אורי לוי",
    location: "נתניה",
    experienceYears: 7,
    hourlyRate: 180,
    image: "https://randomuser.me/api/portraits/men/71.jpg",
    rating: 4.6,
    studentsCount: 95,
  },
];

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
  const popularInstructors = [...mockInstructors]
    .sort((a, b) => b.studentsCount - a.studentsCount)
    .slice(0, 5);

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
