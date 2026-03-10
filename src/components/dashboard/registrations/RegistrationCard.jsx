import { Mail, Phone } from "lucide-react";
import { useState } from "react";
import { updateRegistrationStatus } from "../../../api/registrations-functions";

export default function RegistrationCard({ registration }) {
  const { student, createdAt, _id } = registration;


   const [status, setStatus] = useState(registration.status);

  const handleStatusChange = async (e) => {
    const newStatus = e.target.value;

    try {
      await updateRegistrationStatus(_id, newStatus);
      setStatus(newStatus);
    } catch (err) {
      console.error(err);
    }
  }

  return (
    <div className="registration-item">

      <div className="registration-left">
        
          <select
          className={`registration-status ${status.toLowerCase()}`}
          value={status}
          onChange={handleStatusChange}
        >
          <option value="Pending">ממתין</option>
          <option value="Paid">מאושר</option>
          <option value="Cancelled">בוטל</option>
        </select>

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
