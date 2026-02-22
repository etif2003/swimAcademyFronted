import { useNavigate } from "react-router-dom";
import "../../../styles/Dashboard/InstructorListCard.css";

export default function InstructorListCard({
  instructor,
  buttonLabel,
  onButtonClick,
  loading = false,
  buttonVariant = "primary",
}) {
  const navigate = useNavigate();

  const handleCardClick = () => {
    navigate(`/instructor/${instructor._id}`);
  };

  const handleButtonClick = (e) => {
    e.stopPropagation();
    if (onButtonClick) {
      onButtonClick(instructor);
    }
  };

  return (
    <div
      className="instructor-list-card"
      onClick={handleCardClick}
      dir="rtl"
    >
      {/* תמונה */}
      <div className="instructor-list-card-image-wrapper">
        <img
          src={
            instructor.image ||
            "/images/instructor-placeholder.png"
          }
          alt={instructor.fullName}
          className="instructor-list-card-image"
        />
      </div>

      {/* תוכן */}
      <div className="instructor-list-card-content">
        <div className="instructor-list-card-info">
          <h3>{instructor.fullName}</h3>
          <p>{instructor.phone}</p>
        </div>

        {buttonLabel && (
          <button
            className={`instructor-list-card-button ${buttonVariant}`}
            onClick={handleButtonClick}
            disabled={loading}
          >
            {loading ? "טוען..." : buttonLabel}
          </button>
        )}
      </div>
    </div>
  );
}
