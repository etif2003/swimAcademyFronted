import { Link } from "react-router-dom";

export function SchoolNavSection({
  to,
  title,
  subtitle,
  icon,
  titleClassName = "singleSchoolNavTitle",
}) {
  const Arrow = <div className="singleSchoolNavArrow">←</div>;
  const Icon = <div className="singleSchoolNavIcon">{icon}</div>;

  const Text = (
    <div className="singleSchoolNavText">
      <div className={titleClassName}>{title}</div>
      {subtitle ? <div className="singleSchoolNavSub">{subtitle}</div> : null}
    </div>
  );

  return (
    <Link className="singleSchoolNavCard" to={to}>
      <>
        {Icon}
        {Text}
        {Arrow}
      </>
    </Link>
  );
}
