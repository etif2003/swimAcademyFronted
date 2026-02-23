import "../../../styles/Dashboard/SchoolListCard.css";
import { useNavigate } from "react-router-dom";
import { MapPin } from "lucide-react";
export default function SchoolListCard({
  item,
  onApprove,
  onUnlink,
  approvingId,
}) {
  const navigate = useNavigate();
  const isPending = item.status !== "Active";

  const handleNavigate = () => {
    navigate(`/school/${item.school._id}`);
  };

  return (
    <div className="school-list-card" onClick={handleNavigate}>
      {/* תמונה / לוגו */}
      <div className="school-list-card-image-wrapper">
        <img
          src={
            item.school.logo ||
            "https://ui-avatars.com/api/?name=School&background=0BBBD6&color=fff&size=200"
          }
          alt={item.school.name}
          className="school-list-card-image"
        />
      </div>

      {/* תוכן */}
      <div className="school-list-card-content">
        <div className="school-list-card-info">
          <h3>{item.school.name}</h3>
          <p className="school-location">
            <MapPin size={14} className="location-icon" />
            {item.school.location?.city}
          </p>{" "}
        </div>

        {/* כפתור אשר */}
        {isPending && onApprove && (
          <button
            className="school-list-card-button primary"
            onClick={(e) => {
              e.stopPropagation();
              onApprove(item._id);
            }}
            disabled={approvingId === item._id}
          >
            {approvingId === item._id ? "מאשר..." : "אשר שיוך"}
          </button>
        )}

        {/* כפתור בטל */}
        {!isPending && onUnlink && (
          <button
            className="school-list-card-button danger"
            onClick={(e) => {
              e.stopPropagation();
              onUnlink(item._id);
            }}
          >
            בטל שיוך
          </button>
        )}
      </div>
    </div>
  );
}
