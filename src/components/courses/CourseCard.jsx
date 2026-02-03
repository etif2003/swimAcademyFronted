import { Link } from "react-router-dom";
import {
  MapPin,
  Clock,
  Users,
  ArrowLeft,
} from "lucide-react";
import "../../styles/CourseCard.css";

const CourseCard = ({ course }) => {
  return (
    <Link
      to={`/course/${course._id}`}
      className="course-card"
    >
      {/* Image */}
      <div className="course-card-image">
        <img
          src={course.image || "/placeholder-course.jpg"}
          alt={course.title}
        />

        {/* Level */}
        {course.level && (
          <div className="course-level">
            {course.level}
          </div>
        )}
      </div>

      {/* Content */}
      <div className="course-card-content">
        {/* Title */}
        <h3 className="course-title">
          {course.title}
        </h3>

        {/* Target audience */}
        {course.targetAudience && (
          <p className="course-instructor">
            מיועד ל{course.targetAudience}
          </p>
        )}

        {/* Meta info */}
        <div className="course-meta">
          {course.location?.city && (
            <div className="course-meta-item">
              <MapPin size={14} />
              {course.location.city}
            </div>
          )}

          {course.sessionsCount && (
            <div className="course-meta-item">
              <Clock size={14} />
              {course.sessionsCount} מפגשים
            </div>
          )}

          {course.maxParticipants && (
            <div className="course-meta-item">
              <Users size={14} />
              עד {course.maxParticipants} משתתפים
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="course-footer">
          <div className="course-price">
            ₪{course.price}
            <span> / שיעור</span>
          </div>

          <div className="course-details">
            לפרטים
            <ArrowLeft size={16} />
          </div>
        </div>
      </div>
    </Link>
  );
};

export default CourseCard;
