import { Link } from "react-router-dom";
import { MapPin } from "lucide-react";
import "../../styles/SchoolCard.css";

const SchoolCard = ({ school }) => {
  return (
    <Link to={`/school/${school._id}`} className="school-card">
      {/* Image */}
      <div className="school-card-image">
        <img
          src={school.image || "/placeholder-school.jpg"}
          alt={school.name}
        />
      </div>

      {/* Content */}
      <div className="school-card-content">
        {/* Title */}
        <h3 className="school-title">
          {school.name}
        </h3>

        {/* Location */}
        {school.location?.city && (
          <div className="school-location">
            <MapPin size={14} />
            {school.location.city}
          </div>
        )}

        {/* Description */}
        {school.description && (
          <p className="school-description">
            {school.description}
          </p>
        )}

        {/* CTA */}
        <div className="school-footer">
          <span className="school-cta">
            צפייה בבית הספר
          </span>
        </div>
      </div>
    </Link>
  );
};

export default SchoolCard;
