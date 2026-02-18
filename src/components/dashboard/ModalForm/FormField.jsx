import "../../../styles/Errors.css";

export default function FormField({
  label,
  type = "text",
  value,
  onChange,
  placeholder,
  error,
}) {
  return (
    <div className="field">
      {label && <label>{label}</label>}

      <input
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className={error ? "input-error" : ""}
      />

      {error && <span className="field-error">{error}</span>}
    </div>
  );
}
