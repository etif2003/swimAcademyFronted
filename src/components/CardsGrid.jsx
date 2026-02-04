import "../styles/CardsGrid.css";

export default function CardsGrid({
    items = [],
    renderItem,
    emptyText = "לא נמצאו תוצאות",
}) {
    if (!items.length) {
        return (
            <div className="cards-grid-empty">
                {emptyText}
            </div>
        );
    }

    return (
        <section className="cards-grid">
            {items.map((item, index) =>
                renderItem(item, index)
            )}
        </section>
    );
}
