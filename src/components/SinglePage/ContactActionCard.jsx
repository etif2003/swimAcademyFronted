import { useState } from "react";
import ActionCardLayout from "./ActionCardLayout";
import "../../styles/SinglePage/ContacActionCard.css";
import { Phone, Mail, MessageCircle } from "lucide-react";
import ConfirmRegistrationModal from "../ConfirmRegistrationModal";
import { createRegistration } from "../../api/registrations-functions";
import { useAuth } from "../../context/AuthContext";

const ContactActionCard = ({
  type,
  price,
  phone,
  courseId, // 🔥 חשוב בשביל ההרשמה
}) => {
  const { user } = useAuth();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const token = localStorage.getItem("token");
  const isLoggedIn = !!token;

  const hasPhone = Boolean(phone);
  const cleanPhone = phone ? String(phone).replace(/[^\d+]/g, "") : "";

  const handleConfirmRegistration = async () => {
    return await createRegistration({ courseId });
  };

  return (
    <>
      <ActionCardLayout>
        {/* מחיר */}
        {price ? (
          <div className="price">
            <strong>{price} ₪</strong>
            <span>{type === "course" ? " / שיעור" : " / שעה"}</span>
          </div>
        ) : (
          "לא צוין מחיר"
        )}

        <hr />

        {/* קורס */}
        {type === "course" && (
          <>
            <button
              className="actionCard__primary"
              onClick={() => setIsModalOpen(true)}
              // חסימת הכפתור אם המשתמש הוא בית ספר
              disabled={user?.role === "School"}
              // אופציונלי: הוספת טקסט עזר כשהכפתור חסום
              title={
                user?.role === "School" ? "בית ספר לא יכול להירשם לקורסים" : ""
              }
            >
              {user?.role === "School" ? "הרשמה חסומה" : "הרשמה לקורס"}
            </button>
            <small className="actionCard__note">
              {user?.role === "School"
                ? "חשבון בית ספר אינו מורשה להירשם"
                : "ניתן לבטל בכל עת"}
            </small>
          </>
        )}

        {/* מדריך */}
        {type === "instructor" && (
          <>
            <button
              className="actionCard__primary"
              disabled={!hasPhone}
              onClick={() => {
                if (!hasPhone) return;
                window.location.href = `tel:${phone}`;
              }}
            >
              <Phone size={20} />
              התקשר עכשיו
            </button>

            <button
              className="actionCard__outline"
              disabled={!hasPhone}
              onClick={() => {
                if (!hasPhone) return;
                window.open(`https://wa.me/${cleanPhone}`, "_blank");
              }}
            >
              <MessageCircle size={20} />
              שלחו הודעה בוואטסאפ
            </button>
          </>
        )}
      </ActionCardLayout>

      {/* 🔥 המודל */}
      <ConfirmRegistrationModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onConfirm={handleConfirmRegistration}
        isLoggedIn={isLoggedIn}
      />
    </>
  );
};

export default ContactActionCard;
