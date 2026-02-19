import { useEffect, useState } from "react";
import { getRegistrationsByCourse } from "../../../api/registrations-functions";
import "./registrations.css";

import BaseModal from "../ModalForm/BaseModal";
import RegistrationsList from "./RegistrationsList";

export default function RegistrationsModal({
  isOpen,
  onClose,
  courseId,
  courseTitle,
}) {
  const [registrations, setRegistrations] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!isOpen || !courseId) return;

    const fetchData = async () => {
      try {
        setLoading(true);
        const data = await getRegistrationsByCourse(courseId);
        console.log("REGISTRATIONS:", data);

        setRegistrations(data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [isOpen, courseId]);

  return (
    <BaseModal
      isOpen={isOpen}
      onClose={onClose}
      title={`רישומים לקורס: ${courseTitle}`}
    >
      <RegistrationsList
        registrations={registrations}
        loading={loading}
        onClose={onClose}
      />
    </BaseModal>
  );
}
