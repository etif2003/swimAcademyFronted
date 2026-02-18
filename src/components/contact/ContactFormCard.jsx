import { useState } from "react";
import { Send } from "lucide-react";

export default function ContactFormCard() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });

  const onChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const onSubmit = (e) => {
    e.preventDefault();
    // כאן תחברי לשרת/אימייל/פיירבייס וכו'
    console.log(form);
  };

  return (
    <form className="contact-form" onSubmit={onSubmit}>
      <h3 className="contact-form__title">שלחו לנו הודעה</h3>

      <label className="field">
        <span className="field__label">שם מלא</span>
        <input
          className="field__input"
          name="name"
          placeholder="הכניסו את שמכם"
          value={form.name}
          onChange={onChange}
          required
        />
      </label>

      <label className="field">
        <span className="field__label">כתובת דוא״ל</span>
        <input
          className="field__input"
          type="email"
          name="email"
          placeholder="example@email.com"
          value={form.email}
          onChange={onChange}
          required
        />
      </label>

      <label className="field">
        <span className="field__label">הודעה</span>
        <textarea
          className="field__textarea"
          name="message"
          placeholder="כתבו את הודעתכם כאן..."
          value={form.message}
          onChange={onChange}
          rows={6}
          required
        />
      </label>

      <button className="contact-form__btn" type="submit">
        <span className="contact-form__btnIcon" aria-hidden="true">
          <Send size={18} />
        </span>
        שליחת הודעה
      </button>
    </form>
  );
}
