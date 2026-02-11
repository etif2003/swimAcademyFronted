import { Link } from "react-router-dom";
import "../../styles/SinglePage/SinglePageHero.css";
import { ArrowRight} from "lucide-react";


export default function SinglePageHero({ image, backTo, backText, children, variant = "image" }) {
  const fallback =
    "https://images.unsplash.com/photo-1500375592092-40eb2168fd21?auto=format&fit=crop&w=2400&q=80";

  const heroStyle =
    variant === "image"
      ? { backgroundImage: `url(${image || fallback})` }
      : {};

  return (
    <section
      className={`singleHero singleHero--${variant}`}
      style={heroStyle}
      aria-label="Singel page hero"
    >
      {variant === "image" && (
        <div className="singleHero__overlay" />
      )}
      <div className="singleHero__inner">
        <Link className="singleHero__back" to={backTo}>
          <span aria-hidden="true"><ArrowRight size={20}/></span>
          {backText}
        </Link>
        {children}
      </div>
    </section>
  );
}
