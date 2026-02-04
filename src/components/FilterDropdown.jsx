import { ChevronDown, Check } from "lucide-react";
import "../styles/FilterDropdown.css";

export default function FilterDropdown({
  label,
  options,
  value,
  onChange,
  isOpen,
  onToggle
}) {
  const selected = options.find(o => o.value === value);

  return (
    <div className="filter-dropdown">
      <button
        className="filter-button"
        onClick={onToggle}
      >
        {selected?.label || label}
        <ChevronDown size={16} />
      </button>

      {isOpen && (
        <div className="filter-menu">
          {options.map(option => (
            <div
              key={option.value}
              className={`filter-item ${
                value === option.value ? "active" : ""
              }`}
              onClick={() => {
                onChange(option.value);
                onToggle(); // סגירה אחרי בחירה
              }}
            >
              {option.label}
              {value === option.value && <Check size={16} />}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
