import { CATEGORY_OPTIONS } from "../../../constants/categories";
import { LEVEL_OPTIONS } from "../../../constants/levels";
import { TARGET_AUDIENCE_OPTIONS } from "../../../constants/target_audience";
import "../../../styles/Dashboard/CourseListCard.css";
import { Users } from "lucide-react";

export default function CourseListCard({
  course,
  onEdit,
  onViewStudents,
  onCardClick, // חדש
  showActions,
}) {
  const targetAudienceLabel = TARGET_AUDIENCE_OPTIONS.find(
    (a) => a.value === course.targetAudience,
  )?.label;

  const categoryLabel = CATEGORY_OPTIONS.find(
    (c) => c.value === course.category,
  )?.label;

  const levelLabel = LEVEL_OPTIONS.find((c) => c.value === course.level)?.label;

  return (
    <div
      className="course-list-card"
      onClick={!showActions ? () => onCardClick?.(course) : undefined}
      style={!showActions ? { cursor: "pointer" } : {}}
    >
      {showActions && (
        <div className="course-list-card-actions">
          {onEdit && (
            <button
              className="edit-course-list-card-btn"
              onClick={() => onEdit(course)}
            >
              עריכה
            </button>
          )}

          {onViewStudents && (
            <button
              className="show-students-btn"
              onClick={() => onViewStudents(course)}
            >
              <Users size={16} />
              <span>צפייה בנרשמים</span>
            </button>
          )}
        </div>
      )}

      <div className="course-list-card-info">
        <h3>{course.title}</h3>

        <div>
          {targetAudienceLabel} • {levelLabel} • {categoryLabel} • ₪
          {course.price}
        </div>

        {course.registrationStatus && (
          <div
            className={`registration-status ${course.registrationStatus.toLowerCase()}`}
          >
            {translateStatus(course.registrationStatus)}
          </div>
        )}

        {showActions && <div>{course.currentParticipants || 0} נרשמים</div>}
      </div>

      <img
        src={course.image || "https://via.placeholder.com/100x100?text=Course"}
        alt={course.title}
      />
    </div>
  );
}

function translateStatus(status) {
  switch (status) {
    case "Pending":
      return "ממתין";
    case "Paid":
      return "מאושר";
    case "Cancelled":
      return "בוטל";
    default:
      return status;
  }
}
