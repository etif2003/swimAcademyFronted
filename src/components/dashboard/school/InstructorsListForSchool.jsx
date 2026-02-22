import { useEffect, useState, useRef } from "react";
import { handleInstructors } from "../../../api/instructors-functions";
import { addInstructorToSchool } from "../../../api/schoolInstructor-functions";
import "../../../styles/Dashboard/InstructorsListForSchool.css";
import InstructorListCard from "./InstructorListCard";

const InstructorsListForSchool = ({ schoolId }) => {
  const [instructors, setInstructors] = useState([]);
  const [loading, setLoading] = useState(false);
  const [linkingId, setLinkingId] = useState(null);
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);

  const timerRef = useRef(null);

  useEffect(() => {
    loadInstructors();
  }, []);

  const loadInstructors = async () => {
    try {
      setLoading(true);
      const data = await handleInstructors();
      setInstructors(data);
    } catch (err) {
      setError("שגיאה בטעינת מדריכים");
    } finally {
      setLoading(false);
    }
  };

  const handleLinkInstructor = async (instructor) => {
    try {
      setLinkingId(instructor._id);

      await addInstructorToSchool({
        instructorId: instructor._id,
        schoolId,
      });

      setSuccessMessage("המדריך נוסף בהצלחה וממתין לאישור");

      setInstructors((prev) =>
        prev.filter((inst) => inst._id !== instructor._id)
      );
    } catch (err) {
      setErrorMessage(err.message || "שגיאה בהוספת מדריך");
    } finally {
      setLinkingId(null);
    }
  };

  useEffect(() => {
    if (successMessage || errorMessage) {
      timerRef.current = setTimeout(() => {
        setSuccessMessage(null);
        setErrorMessage(null);
      }, 2500);
    }

    return () => {
      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }
    };
  }, [successMessage, errorMessage]);

  if (loading) return <p>טוען מדריכים...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="instructors-to-school-container" dir="rtl">

      {successMessage && (
        <div className="success-toast">{successMessage}</div>
      )}

      {errorMessage && (
        <div className="error-toast">{errorMessage}</div>
      )}

      {instructors.length === 0 && (
        <p>אין מדריכים להצגה</p>
      )}

      <div className="instructors-to-school-grid">
        {instructors.map((inst) => (
          <InstructorListCard
            key={inst._id}
            instructor={inst}
            buttonLabel="שייך לבית ספר"
            onButtonClick={handleLinkInstructor}
            loading={linkingId === inst._id}
            buttonVariant="primary"
          />
        ))}
      </div>
    </div>
  );
};

export default InstructorsListForSchool;
