import ActionCardLayout from "../SinglePage/ActionCardLayout";
import "../../styles/SinglePage/ContactCard.css";
import { Phone, Mail, MessageCircle } from "lucide-react";


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
        <Phone size={20} />
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
        <MessageCircle size={20} />
        שלחו הודעה בוואטסאפ
      </button>

      {/* אימייל */}
      {hasEmail ? (
        <a
          className="contactCard__email"
          href={`mailto:${email}`}
        >
          <Mail size={20} />
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
