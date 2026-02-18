import { Clock } from "lucide-react";

export default function ContactHoursCard() {
    return (
        <div className="contact-card contact-card--soft">

            <h3 className="contact-card__title">שעות פעילות</h3>

            <div className="hours">
                <div className="hours__row">
                    <span>ימים א׳–ה׳:</span>
                    <span dir="ltr">08:00–18:00</span>
                </div>
                <div className="hours__row">
                    <span>יום ו':</span>
                    <span dir="ltr">08:00–13:00</span>
                </div>
                <div className="hours__row">
                    <span>שבת:</span>
                    <span>סגור</span>
                </div>
            </div>
        </div>
    );
}
