import "../../styles/SinglePage/SinglePageSummary.css";
import { ArrowRight, MapPin, User } from "lucide-react";

export default function SinglePageSummary({
  type,
  name,
  logo,
  address,
  city,
  description,
  poolName,
  categoriesList,
}) {
  const fullAddress = [poolName, address, city].filter(Boolean).join(", ");

  return (
    <div className="singlePageSummary">
      <div className="singlePageSummary__row">
        {logo ? (
          <img
            className="singlePageSummary__logo"
            src={logo}
            alt={`${name} לוגו`}
          />
        ) : null}
        <h1 className="singlePageSummary__title">{name}</h1>
      </div>

      <div className="singlePageSummary__addressRow">
        <MapPin size={20} color={"#14b8cc"} />
        {fullAddress || "מיקום לא צוין"}
      </div>

      {type === "Course" && categoriesList && categoriesList.length > 0 && (
        <div className="categories">
          {categoriesList.map((item, idx) => (
            <span key={idx} className="category-chip">
              <span className="chip-icon">{item.icon}</span>
              {item.label}
            </span>
          ))}
        </div>
      )}

      <p className="singlePageSummary__desc">{description || ""}</p>
    </div>
  );
}
