import React from "react";
import "../../styles/LegalPage.css";

export default function LegalPage({ title, sections }) {
  return (
    <div className="legal-page" dir="rtl">
      <div className="legal-container">
        <h1 className="legal-title">{title}</h1>

        <div className="legal-sections">
          {sections.map((s, idx) => (
            <section className="legal-section" key={s.id || idx}>
              <h2 className="legal-section-title">
                <span className="legal-section-number">{idx + 1}.</span>
                {s.heading}
              </h2>

              {Array.isArray(s.body)
                ? s.body.map((p, i) => (
                    <p className="legal-paragraph" key={i}>
                      {p}
                    </p>
                  ))
                : (
                  <p className="legal-paragraph">{s.body}</p>
                )}
            </section>
          ))}
        </div>
      </div>
    </div>
  );
}
