import { useRef } from "react";

export default function FormImageUpload({
  label,
  image,
  uploading,
  onUpload,
  onRemove,
}) {
  const fileRef = useRef(null);

  return (
    <div className="image-upload-wrapper">
      {label && <label className="image-label">{label}</label>}

      {image && (
        <div className="image-preview-box">
          <img src={image} alt="preview" />
        </div>
      )}

      <div className="image-buttons">
        {image && (
          <button
            type="button"
            className="btn-remove"
            onClick={onRemove}
          >
            הסר תמונה
          </button>
        )}

        <button
          type="button"
          className="btn-upload"
          onClick={() => fileRef.current.click()}
          disabled={uploading}
        >
          {uploading ? "מעלה..." : "העלאת תמונה"}
        </button>
      </div>

      <input
        ref={fileRef}
        type="file"
        accept="image/*"
        hidden
        onChange={onUpload}
      />
    </div>
  );
}
