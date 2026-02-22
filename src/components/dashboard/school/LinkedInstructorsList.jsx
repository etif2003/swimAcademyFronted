import { useEffect, useState, useRef } from "react";
import {
  fetchSchoolInstructors,
  unlinkInstructorFromSchool,
} from "../../../api/schoolInstructor-functions";
import InstructorListCard from "./InstructorListCard";

export default function LinkedInstructorsList({ schoolId }) {
  const [linked, setLinked] = useState([]);
  const [loading, setLoading] = useState(true);
  const [removingId, setRemovingId] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);

  const timerRef = useRef(null);

  useEffect(() => {
    loadLinked();
  }, [schoolId]);

  const loadLinked = async () => {
    try {
      const data = await fetchSchoolInstructors(schoolId);
      setLinked(data);
    } catch (err) {
      setErrorMessage("שגיאה בטעינת מדריכי בית הספר");
    } finally {
      setLoading(false);
    }
  };

  const handleUnlink = async (instructor) => {
    try {
      setRemovingId(instructor._id);

      await unlinkInstructorFromSchool(instructor._id);

      setSuccessMessage("השיוך בוטל בהצלחה");

      setLinked((prev) =>
        prev.filter((item) => item._id !== instructor._id)
      );
    } catch (err) {
      setErrorMessage(err.message);
    } finally {
      setRemovingId(null);
    }
  };

  useEffect(() => {
    if (successMessage || errorMessage) {
      timerRef.current = setTimeout(() => {
        setSuccessMessage(null);
        setErrorMessage(null);
      }, 2500);
    }

    return () => clearTimeout(timerRef.current);
  }, [successMessage, errorMessage]);

  if (loading) return <p>טוען מדריכים...</p>;

  if (!linked.length) {
    return <p>אין מדריכים משויכים לבית הספר</p>;
  }

  return (
    <>
      {successMessage && (
        <div className="success-toast">{successMessage}</div>
      )}
      {errorMessage && (
        <div className="error-toast">{errorMessage}</div>
      )}

      {linked.map((link) => (
        <InstructorListCard
          key={link._id}
          instructor={link.instructor} // מגיע מה-populate
          buttonLabel="בטל שיוך"
          onButtonClick={() =>
            handleUnlink(link)
          }
          loading={removingId === link._id}
          buttonVariant="danger"
        />
      ))}
    </>
  );
}
