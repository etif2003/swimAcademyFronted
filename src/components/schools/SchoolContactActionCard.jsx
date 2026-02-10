import ActionCardLayout from "../SinglePage/ActionCardLayout";
import "../../styles/SinglePage/ContactCard.css";


const SchoolContactActionCard = ({
  contactName,
  phone,
  email,
}) => {
  const hasPhone = Boolean(phone);
  const hasEmail = Boolean(email);

  const cleanPhone = phone
    ? String(phone).replace(/[^\d+]/g, "")
    : "";

  return (
    <ActionCardLayout>
      <h3 className="contactCard__title">יצירת קשר</h3>

      <div className="contactCard__meta">
        איש קשר:{" "}
        <span className="contactCard__strong">
          {contactName || "לא צוין"}
        </span>
      </div>

      {/* טלפון */}
      <button
        className="contactCard__primary"
        type="button"
        disabled={!hasPhone}
        onClick={() => {
          if (!hasPhone) return;
          window.location.href = `tel:${phone}`;
        }}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="lucide lucide-phone w-5 h-5"
        >
          <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
        </svg>
        התקשרו עכשיו
      </button>

      {/* וואטסאפ */}
      <button
        className="contactCard__outline"
        type="button"
        disabled={!hasPhone}
        onClick={() => {
          if (!hasPhone) return;
          window.open(`https://wa.me/${cleanPhone}`, "_blank");
        }}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="lucide lucide-message-circle w-5 h-5"
        >
          <path d="M7.9 20A9 9 0 1 0 4 16.1L2 22Z" />
        </svg>
        שלחו הודעה בוואטסאפ
      </button>

      {/* אימייל */}
      {hasEmail ? (
        <a
          className="contactCard__email"
          href={`mailto:${email}`}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="lucide lucide-mail w-5 h-5"
          >
            <rect width="20" height="16" x="2" y="4" rx="2" />
            <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
          </svg>
          שלחו אימייל
        </a>
      ) : (
        <div className="contactCard__emailDisabled">
          אין אימייל זמין
        </div>
      )}
    </ActionCardLayout>
  );
};

export default SchoolContactActionCard;
