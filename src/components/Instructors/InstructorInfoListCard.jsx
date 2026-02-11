import "../../styles/InfoListCard.css";
import { ArrowRight, MapPin, Phone, Award, Clock, MessageCircle } from "lucide-react";


export default function InstructorInfoListCard({
    items = [],
    emptyText = "אין נתונים להצגה",
}) {
    return (
        <div className="infoListCard">
            <div className="infoListCard__header">
                <Award color={"#14b8cc"}/>
                <h3 className="infoListCard__title">
                    {"תעודות והסמכות"}
                </h3>
            </div>

            {items.length > 0 ? (
                <ul className="infoListCard__list">
                    {items.map((item, idx) => (
                        <li key={idx} className="infoListCard__item">
                            {item}
                        </li>
                    ))}
                </ul>
            ) : (
                <div className="infoListCard__empty">
                    {emptyText}
                </div>
            )}
        </div>
    );
}
