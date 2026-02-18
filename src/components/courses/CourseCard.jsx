import { Link } from "react-router-dom";
import { MapPin, Clock, Users, ArrowLeft } from "lucide-react";
import "../../styles/CourseCard.css";
import { LEVEL_MAP } from "../../constants/levels";
import { TARGET_AUDIENCE_OPTIONS } from "../../constants/target_audience";


const CourseCard = ({ course }) => {
  const levelMeta = course?.level ? LEVEL_MAP[course.level] : null;

  const audienceLabel = TARGET_AUDIENCE_OPTIONS.find(
    (o) => o.value === course?.targetAudience
  )?.label;

  return (
    <Link to={`/course/${course._id}`} className="course-card">
      <div className="course-card-image">
        <img
          src={course.image || "/placeholder-course.jpg"}
          alt={course.title || "קורס שחייה"}
        />

        {levelMeta && (
          <div className={`course-level ${levelMeta.className}`}>
            {levelMeta.label}
          </div>
        )}
      </div>

      <div className="course-card-content">
        <h3 className="course-title">{course.title}</h3>

        {audienceLabel && course.targetAudience !== "All" && (
          <p className="course-target-audience">מיועד ל{audienceLabel}</p>
        )}

        <div className="course-meta">
          {course.location?.city && (
            <div className="course-meta-item">
              <MapPin size={14} />
              {course.location.city}
            </div>
          )}

          {course.sessionsCount ? (
            <div className="course-meta-item">
              <Clock size={14} />
              {course.sessionsCount} מפגשים
            </div>
          ) : null}

          {course.maxParticipants ? (
            <div className="course-meta-item">
              <Users size={14} />
              עד {course.maxParticipants} משתתפים
            </div>
          ) : null}
        </div>

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
