import { Mail, Phone, MapPin } from "lucide-react";

export default function ContactInfoCard({ email, phone, address }) {
    return (
        <div className="contact-card">
            <div className="contact-card__head">
                <h3 className="contact-card__title">פרטי התקשרות</h3>
            </div>

            <ul className="contact-list">
                <li className="contact-list__item">
                    <span className="contact-list__icon" aria-hidden="true"><Mail size={18} /></span>

                    <div className="contact-list__text">
                        <div className="contact-list__label">דוא״ל</div>
                        <div className="contact-list__value" dir="ltr">{email}</div>
                    </div>
                </li>

                <li className="contact-list__item">
                    <span className="contact-list__icon" aria-hidden="true"><Phone size={18} /></span>

                    <div className="contact-list__text">
                        <div className="contact-list__label">טלפון</div>
                        <div className="contact-list__value" dir="ltr">{phone}</div>
                    </div>
                </li>

                <li className="contact-list__item">
                    <span className="contact-list__icon" aria-hidden="true"><MapPin size={18} /></span>

                    <div className="contact-list__text">
                        <div className="contact-list__label">כתובת</div>
                        <div className="contact-list__value">{address}</div>
                    </div>
                </li>
            </ul>
        </div>
    );
}
