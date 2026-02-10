import React from "react";
import { Link } from "react-router-dom";
import "../../styles/SinglePage/SinglePageHero.css";

export default function SinglePageHero({ image, backTo, backText }) {
  const fallback =
    "https://images.unsplash.com/photo-1500375592092-40eb2168fd21?auto=format&fit=crop&w=2400&q=80";

  return (
    <section
      className="singleHero"
      style={{ backgroundImage: `url(${image || fallback})` }}
      aria-label="Singel page hero"
    >
      <div className="singleHero__overlay" />
      <div className="singleHero__inner">
        <Link className="singleHero__back" to={backTo}>
          <span aria-hidden="true">→</span>
          {backText}
        </Link>
      </div>
    </section>
  );
}
