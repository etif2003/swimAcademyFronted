import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import InstructorCard from "../Instructors/InstructorCard";
import "../../styles/FeaturedSection.css"; // 👈 אותו CSS!
import { ArrowLeft } from "lucide-react";

export const mockInstructors = [
  {
    _id: "i1",
    user: "u1",
    fullName: "יוסי אברהם",
    phone: "0501234567",
    experienceYears: 12,
    certificates: [
      "מדריך שחייה מוסמך",
      "הצלה ראשונה בבריכה",
    ],
    workArea: "פתח תקוה",
    hourlyRate: 250,
    image: "https://randomuser.me/api/portraits/men/54.jpg",
    rating: 4.6,
    available: true,
    status: "Active",
  },
  {
    _id: "i2",
    user: "u2",
    fullName: "דני כהן",
    phone: "0529876543",
    experienceYears: 15,
    certificates: [
      "מדריך שחייה מוסמך",
      "מדריך ילדים",
    ],
    workArea: "תל אביב",
    hourlyRate: 180,
    image: "https://randomuser.me/api/portraits/men/32.jpg",
    rating: 4.9,
    available: true,
    status: "Active",
  },
  {
    _id: "i3",
    user: "u3",
    fullName: "מיכל לוי",
    phone: "0542223344",
    experienceYears: 10,
    certificates: [
      "מדריכת שחייה מוסמכת",
      "שחייה טיפולית",
    ],
    workArea: "רמת גן",
    hourlyRate: 200,
    image: "https://randomuser.me/api/portraits/women/44.jpg",
    rating: 4.8,
    available: true,
    status: "Active",
  },
  {
    _id: "i4",
    user: "u4",
    fullName: "שרון אמיר",
    phone: "0537654321",
    experienceYears: 8,
    certificates: [
      "מדריכת ילדים",
    ],
    workArea: "חיפה",
    hourlyRate: 170,
    image: "https://randomuser.me/api/portraits/women/65.jpg",
    rating: 4.5,
    available: true,
    status: "Active",
  },
  {
    _id: "i5",
    user: "u5",
    fullName: "אלון פרץ",
    phone: "0509988776",
    experienceYears: 18,
    certificates: [
      "מדריך בכיר",
      "מדריך תחרותי",
    ],
    workArea: "פתח תקוה",
    hourlyRate: 280,
    image: "https://randomuser.me/api/portraits/men/76.jpg",
    rating: 4.9,
    available: false,
    status: "Inactive",
  },
  {
    _id: "i6",
    user: "u6",
    fullName: "נועה בן דוד",
    phone: "0551239876",
    experienceYears: 6,
    certificates: [
      "מדריכת מתחילים",
    ],
    workArea: "ירושלים",
    hourlyRate: 160,
    image: "https://randomuser.me/api/portraits/women/21.jpg",
    rating: 4.4,
    available: true,
    status: "Active",
  },
  {
    _id: "i7",
    user: "u7",
    fullName: "איתי רוזן",
    phone: "0523332211",
    experienceYears: 9,
    certificates: [
      "מדריך שחייה",
    ],
    workArea: "כפר סבא",
    hourlyRate: 190,
    image: "https://randomuser.me/api/portraits/men/18.jpg",
    rating: 4.7,
    available: true,
    status: "Active",
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
