import {
  Waves,
  Mail,
  Phone,
  MapPin,
  Facebook,
  Instagram,
  Youtube,
} from "lucide-react";

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-grid">
          {/* Brand */}
          <div className="footer-brand">
            <div className="footer-logo">
              <div className="logo-icon">
                <Waves size={24} />
              </div>
              <span className="logo-text">שחייה פלוס</span>
            </div>

            <p className="footer-description">
              הפלטפורמה המובילה בישראל לחיבור בין תלמידים, מדריכי שחייה ובתי ספר
              לשחייה. הצטרפו לקהילה שלנו והתחילו לשחות!
            </p>

            <div className="social-icons">
              <a href="#"><Facebook size={20} /></a>
              <a href="#"><Instagram size={20} /></a>
              <a href="#"><Youtube size={20} /></a>
            </div>
          </div>

          {/* Platform */}
          <div>
            <h3 className="footer-title">הפלטפורמה</h3>
            <ul className="footer-links">
              <li><a href="/courses">קורסים</a></li>
              <li><a href="/instructors">מדריכים</a></li>
              <li><a href="/schools">בתי ספר</a></li>
            </ul>
          </div>

          {/* Company */}
          <div>
            <h3 className="footer-title">החברה</h3>
            <ul className="footer-links">
              <li><a href="/about">אודות</a></li>
              <li><a href="/contact">צור קשר</a></li>
              <li><a href="/terms">תנאי שימוש</a></li>
              <li><a href="/privacy">מדיניות פרטיות</a></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="footer-title">צור קשר</h3>
            <ul className="footer-contact">
              <li><Mail size={16} /> info@swimming-plus.co.il</li>
              <li><Phone size={16} /> 03-1234567</li>
              <li><MapPin size={16} /> תל אביב, ישראל</li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="footer-bottom">
          <span>© 2024 שחייה פלוס. כל הזכויות שמורות.</span>
          <span>נבנה באהבה לקהילת השחייה בישראל 💙</span>
        </div>
      </div>
    </footer>
  );
}
