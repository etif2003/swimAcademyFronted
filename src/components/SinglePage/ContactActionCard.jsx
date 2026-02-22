// import ActionCardLayout from "./ActionCardLayout";
// import "../../styles/SinglePage/ContacActionCard.css";
// import { Phone, Mail, MessageCircle } from "lucide-react";

// const ContactActionCard = ({
//     type,          // "course" | "instructor"
//     price,
//     phone,
// }) => {
//     const hasPhone = Boolean(phone);
//     const cleanPhone = phone
//         ? String(phone).replace(/[^\d+]/g, "")
//         : "";

//     return (
//         <ActionCardLayout>
//             {/*מחיר*/}
//             <div className="price">
//                 <strong>{price} ₪</strong>
//                 <span>
//                     {type === "course" ? " / שיעור" : " / שעה"}
//                 </span>
//             </div>

//             <hr />

//             {/*קורס*/}
//             {type === "course" && (
//                 <>
//                     <button className="actionCard__primary">
//                         הרשמה לקורס
//                     </button>
//                     <small className="actionCard__note">
//                         ניתן לבטל בכל עת
//                     </small>
//                 </>
//             )}

//             {/*מדריך*/}
//             {type === "instructor" && (
//                 <>
//                     <button
//                         className="actionCard__primary"
//                         disabled={!hasPhone}
//                         onClick={() => {
//                             if (!hasPhone) return;
//                             window.location.href = `tel:${phone}`;
//                         }}
//                     >
//                         <Phone size={20} />
//                         התקשר עכשיו
//                     </button>

//                     <button
//                         className="actionCard__outline"
//                         disabled={!hasPhone}
//                         onClick={() => {
//                             if (!hasPhone) return;
//                             window.open(`https://wa.me/${cleanPhone}`, "_blank");
//                         }}
//                     >
//                         <MessageCircle size={20} />
//                         שלחו הודעה בוואטסאפ
//                     </button>
//                 </>
//             )}
//         </ActionCardLayout>
//     );
// };

// export default ContactActionCard;


import { useState } from "react";
import ActionCardLayout from "./ActionCardLayout";
import "../../styles/SinglePage/ContacActionCard.css";
import { Phone, Mail, MessageCircle } from "lucide-react";
import ConfirmRegistrationModal from "../ConfirmRegistrationModal";
import { createRegistration } from "../../api/registrations-functions";

const ContactActionCard = ({
    type,
    price,
    phone,
    courseId, // 🔥 חשוב בשביל ההרשמה
}) => {

    const [isModalOpen, setIsModalOpen] = useState(false);

    const token = localStorage.getItem("token");
    const isLoggedIn = !!token;

    const hasPhone = Boolean(phone);
    const cleanPhone = phone
        ? String(phone).replace(/[^\d+]/g, "")
        : "";

const handleConfirmRegistration = async () => {
  return await createRegistration({ courseId });
};

    return (
        <>
            <ActionCardLayout>

                {/* מחיר */}
                <div className="price">
                    <strong>{price} ₪</strong>
                    <span>
                        {type === "course" ? " / שיעור" : " / שעה"}
                    </span>
                </div>

                <hr />

                {/* קורס */}
                {type === "course" && (
                    <>
                        <button
                            className="actionCard__primary"
                            onClick={() => setIsModalOpen(true)}
                        >
                            הרשמה לקורס
                        </button>
                        <small className="actionCard__note">
                            ניתן לבטל בכל עת
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
