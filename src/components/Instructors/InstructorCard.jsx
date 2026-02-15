import { Link } from "react-router-dom";
import { MapPin, Star } from "lucide-react";
import "../../styles/InstructorCard.css";

const InstructorCard = ({ instructor }) => {
  return (
    <Link
      to={`/instructor/${instructor._id}`}
      className="instructor-card"
    >
      {/* TOP */}
      <div className="instructor-top">
        <div className="instructor-header">
          <img
            className="instructor-avatar"
            src={instructor.image || "/placeholder-avatar.jpg"}
            alt={instructor.fullName}
          />

          <div className="instructor-info">
            <h3 className="instructor-name">{instructor.fullName}</h3>

            <div className="instructor-location">
              <MapPin size={14} />
              {instructor.workArea}
            </div>

            <div className="instructor-experience">
              {instructor.experienceYears} שנות ניסיון
            </div>
          </div>
        </div>

        {instructor.rating > 0 && (
          <div className="instructor-rating">
            <Star size={14} />
            {instructor.rating.toFixed(1)}
          </div>
        )}
      </div>

      <div className="instructor-footer">
        <div className="instructor-cta">
          צפייה בפרופיל
        </div>

        <div className="instructor-price">
          <span> / שיעור </span>₪{instructor.hourlyRate}
        </div>
      </div>
    </Link>
  );
};

export default InstructorCard;
