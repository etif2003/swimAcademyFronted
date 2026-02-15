import { Link } from "react-router-dom";
import { Building2, User, ArrowLeft } from "lucide-react";
import "../../styles/course/CourseCreatorCard.css";

export default function CourseCreatorCard({
  type,            // "School" | "Instructor"
  id,
  name,
  image,
  subtitle,        // למשל שנות ניסיון / עיר
}) {
  const isSchool = type === "School";

  const linkTo = isSchool
    ? `/school/${id}`
    : `/instructor/${id}`;

  const label = isSchool ? "בית הספר" : "מדריך הקורס";

  const Icon = isSchool ? Building2 : User;

  return (
    <Link to={linkTo} className="creator-card">
      
      {/* Right side */}
      <div className="creator-content">
        <div className="creator-header">
          <Icon size={18} />
          <span>{label}</span>
        </div>

        <div className="creator-meta">
          <img src={image} alt={name} />
          <div className="creator-text">
            <strong>{name}</strong>
            {subtitle && <span>{subtitle}</span>}
          </div>
        </div>
      </div>

      {/* Left arrow */}
      <div className="creator-arrow">
        <ArrowLeft size={20} />
      </div>
    </Link>
  );
}
