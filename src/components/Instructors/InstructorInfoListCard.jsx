import "../../styles/InfoListCard.css";

export default function InstructorInfoListCard({
    items = [],
    emptyText = "אין נתונים להצגה",
}) {
    return (
        <div className="infoListCard">
            <div className="infoListCard__header">
                {
                    <span className="infoListCard__icon">
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="lucide lucide-award w-5 h-5 text-water-600"><path d="m15.477 12.89 1.515 8.526a.5.5 0 0 1-.81.47l-3.58-2.687a1 1 0 0 0-1.197 0l-3.586 2.686a.5.5 0 0 1-.81-.469l1.514-8.526"></path><circle cx="12" cy="8" r="6"></circle></svg>          </span>
                }
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
