export default function FormTextarea({
  label,
  value,
  onChange,
  placeholder,
}) {
  return (
    <div className="field">
      {label && <label>{label}</label>}

      <textarea
        value={value}
        onChange={onChange}
        placeholder={placeholder}
      />
    </div>
  );
}
