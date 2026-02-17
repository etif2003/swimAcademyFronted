import "../../styles/FeaturedSectionLoader.css";

export default function FeaturedSectionLoader({ count = 4 }) {
  return (
    <div className="featured-loader" dir="rtl" aria-busy="true" aria-live="polite">
      <div className="featured-loader__top">
        <div className="featured-loader__spinner" />
        <span className="featured-loader__text">טוען…</span>
      </div>

      <div className="featured-loader__grid">
        {Array.from({ length: count }).map((_, i) => (
          <div className="featured-loader__card" key={i} />
        ))}
      </div>
    </div>
  );
}
