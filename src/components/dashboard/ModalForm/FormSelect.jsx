import { useState, useRef, useEffect } from "react";
import { ChevronDown, Check } from "lucide-react";

export default function FormSelect({ label, options, value, onChange }) {
  const [open, setOpen] = useState(false);
  const ref = useRef(null);

  const selected = options.find((o) => o.value === value);

  // סגירה בלחיצה מחוץ לרכיב
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (ref.current && !ref.current.contains(e.target)) {
        setOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="field form-select" ref={ref}>
      {label && <label>{label}</label>}

      <button
        type="button"
        className="form-select-button"
        onClick={() => setOpen(!open)}
      >
        {selected?.label || "בחר"}
        <ChevronDown size={16} />
      </button>

      {open && (
        <div className="form-select-menu">
          {options.map((option) => (
            <div
              key={option.value}
              className={`form-select-item ${
                value === option.value ? "active" : ""
              }`}
              onClick={() => {
                onChange(option.value);
                setOpen(false);
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
