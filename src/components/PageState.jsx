import React from "react";
import "../styles/PageState.css";

const LABELS = {
  courses: { name: "קורסים" },
  instructors: { name: "מדריכים" },
  schools: { name: "בתי ספר" },
  course: { name: "קורס" },
  instructor: { name: "מדריך/ה" },
  school: { name: "בית ספר" },
  profile: { name: "פרופיל" },
};

export default function PageState({
  kind, // "courses" | "instructors" | "schools"
  state, // "loading" | "error" | "empty" | "notFound"
  title,
  description,
  onRetry,
  compact = false,
}) {
  const { name } = (kind && LABELS[kind]) || { name: "פריטים" };

  const text = (() => {
    if (state === "loading") {
      return {
        title: title || `טוען ${name}…`,
        description: description || "עוד רגע וזה כאן.",
      };
    }
    if (state === "error") {
      return {
        title: title || `שגיאה בטעינת ${name}`,
        description:
          description || "נראה שיש בעיה זמנית. נסו שוב בעוד כמה רגעים.",
      };
    }
    if (state === "notFound") {
      return {
        title: title || `${name} לא נמצא`,
        description: description || "ייתכן שהקישור אינו תקין או שהפריט הוסר.",
      };
    }
    return {
      title: title || `אין ${name} להצגה`,
      description: description || `ברגע שיהיו ${name} — הם יופיעו כאן.`,
    };
  })();

  return (
    <section
      dir="rtl"
      className={`page-state ${compact ? "page-state--compact" : ""}`}
      aria-busy={state === "loading" ? true : undefined}
      aria-live="polite"
    >
      <div className="page-state__card">
        <div className="page-state__icon">
          {state === "loading" ? (
            <Spinner />
          ) : state === "error" ? (
            <ErrorIcon />
          ) : state === "notFound" ? (
            <NotFoundIcon />
          ) : (
            <EmptyIcon />
          )}
        </div>

        <div className="page-state__content">
          <h3 className="page-state__title">{text.title}</h3>
          <p className="page-state__desc">{text.description}</p>

          {state === "loading" ? (
            <div className="page-state__skeleton">
              {kind === "profile" && <div className="sk-circle" />}
              <div className="sk-line w-80" />
              <div className="sk-line w-60" />
              <div className="sk-line w-70" />
            </div>
          ) : null}

          {state === "error" && onRetry ? (
            <div className="page-state__actions">
              <button
                className="btn btn-primary"
                type="button"
                onClick={onRetry}
              >
                נסה שוב
              </button>
              <button
                className="btn btn-ghost"
                type="button"
                onClick={() => window.location.reload()}
              >
                רענן עמוד
              </button>
            </div>
          ) : null}
        </div>
      </div>
    </section>
  );
}

function Spinner() {
  return <div className="spinner" aria-hidden="true" />;
}

function ErrorIcon() {
  return (
    <div className="state-icon state-icon--error" aria-hidden="true">
      !
    </div>
  );
}

function NotFoundIcon() {
  return <div className="state-icon state-icon--empty">?</div>;
}

function EmptyIcon() {
  return (
    <div className="state-icon state-icon--empty" aria-hidden="true">
      ∅
    </div>
  );
}
