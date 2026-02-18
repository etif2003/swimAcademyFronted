
import "../../../styles/Errors.css";

export default function FormTextarea({
  label,
  value,
  onChange,
  placeholder,
  error,
}) {
  return (
    <div className="field">
      {label && <label>{label}</label>}

      <textarea
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className={error ? "input-error" : ""}
      />

      {error && <span className="field-error">{error}</span>}
    </div>
  );
}
