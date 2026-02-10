import "../../styles/SinglePage/SinglePageSummary.css";

export default function SinglePageSummary({ type, name, logo, address, city, description, poolName, categoriesList }) {
    const fullAddress = [poolName, address, city].filter(Boolean).join(", ");

    return (
        <div className="singlePageSummary">
            <div className="singlePageSummary__row">
                {logo ? (
                    <img className="singlePageSummary__logo" src={logo} alt={`${name} לוגו`} />
                ) : null}
                <h1 className="singlePageSummary__title">{name}</h1>
            </div>

            <div className="singlePageSummary__addressRow">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-map-pin w-5 h-5 text-water-600"><path d="M20 10c0 4.993-5.539 10.193-7.399 11.799a1 1 0 0 1-1.202 0C9.539 20.193 4 14.993 4 10a8 8 0 0 1 16 0"></path><circle cx="12" cy="10" r="3"></circle></svg>
                <span className="singlePageSummary__address">
                    {fullAddress || "מיקום לא צוין"}
                </span>
            </div>

            {type === "Course" && categoriesList && categoriesList.length > 0 && (
                <div className="categories">
                    {categoriesList.map((item, idx) => (
                        <span key={idx} className="category-chip">
                            {item}
                        </span>
                    ))}
                </div>
            )}

            <p className="singlePageSummary__desc">
                {description || ""}
            </p>
        </div>
    );
}
