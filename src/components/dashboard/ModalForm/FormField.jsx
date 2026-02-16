export default function FormField({
  label,
  type = "text",
  value,
  onChange,
  placeholder,
}) {
  return (
    <div className="field">
      {label && <label>{label}</label>}

      <input
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
      />
    </div>
  );
}
