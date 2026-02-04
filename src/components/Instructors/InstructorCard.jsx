import { Link } from "react-router-dom";
import { MapPin, Star } from "lucide-react";
import "../../styles/InstructorCard.css";

const InstructorCard = ({ instructor }) => {
    return (
        <div className="instructor-card">
            {/* TOP */}
            <div className="instructor-top">

                {/* HEADER: image + info */}
                <div className="instructor-header">
                    {/* Image (right) */}
                    <img
                        className="instructor-avatar"
                        src={instructor.image || "/placeholder-avatar.jpg"}
                        alt={instructor.fullName}
                    />

                    {/* Info (stacked) */}
                    <div className="instructor-info">
                        <h3 className="instructor-name">
                            {instructor.fullName}
                        </h3>

                        <div className="instructor-location">
                            <MapPin size={14} />
                            {instructor.workArea}
                        </div>

                        <div className="instructor-experience">
                            {instructor.experienceYears} שנות ניסיון
                        </div>
                    </div>
                </div>

                {/* RATING */}
                {instructor.rating > 0 && (
                    <div className="instructor-rating">
                        {instructor.rating.toFixed(1)}
                        <Star size={14} />
                    </div>
                )}

            </div>

            {/* BOTTOM */}
            <div className="instructor-footer">
                <Link
                    to={`/instructor/${instructor._id}`}
                    className="instructor-cta"
                >
                    צפייה בפרופיל
                </Link>

                <div className="instructor-price">
                    ₪{instructor.hourlyRate}
                    <span>שיעור /</span>
                </div>
            </div>
        </div>
    );
};

export default InstructorCard;
