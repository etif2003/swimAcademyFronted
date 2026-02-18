import "../../../styles/Dashboard/CourseListCard.css";
import { Users } from "lucide-react";

export default function CourseListCard({
  course,
  onEdit,
  onViewStudents,
  showActions,
}) {
  return (
    <div className="course-card">
      {showActions && (
        <div className="course-actions">
          {onEdit && (
            <button className="edit-btn" onClick={() => onEdit(course)}>
              עריכה
            </button>
          )}

          {onViewStudents && (
            <button
              className="show-students-btn"
              onClick={() => onViewStudents(course)}
            >
              <Users size={16} />
              <span>צפייה בנרשמים</span>{" "}
            </button>
          )}
        </div>
      )}

      <div className="course-info">
        <h3>{course.title}</h3>

        <div>
          {course.targetAudience} • {course.category} • ₪{course.price}
        </div>

        <div>{course.currentParticipants || 0} נרשמים</div>
      </div>

      <img
        src={course.image || "https://via.placeholder.com/100x100?text=Course"}
        alt={course.title}
      />
    </div>
  );
}
