import { Mail, Phone } from "lucide-react";

export default function RegistrationCard({ registration }) {
  const { student, status, createdAt } = registration;

  return (
    <div className="registration-item">

      <div className="registration-left">
        <span className={`registration-status ${status.toLowerCase()}`}>
          {translateStatus(status)}
        </span>

        <div className="registration-date">
          {new Date(createdAt).toLocaleDateString("he-IL")}
        </div>
      </div>

      <div className="registration-right">
        <div className="registration-name">{student.fullName}</div>

        <div className="registration-contact">

          <a
            href={`mailto:${student.email}`}
            className="registration-link"
          >
            <Mail size={16} />
            <span>{student.email}</span>
          </a>

          <a
            href={`tel:${student.phone}`}
            className="registration-link"
          >
            <Phone size={16} />
            <span>{student.phone}</span>
          </a>

        </div>
      </div>

    </div>
  );
}

function translateStatus(status) {
  switch (status) {
    case "Pending":
      return "ממתין";
    case "Paid":
      return "מאושר";
    case "Cancelled":
      return "בוטל";
    default:
      return status;
  }
}
