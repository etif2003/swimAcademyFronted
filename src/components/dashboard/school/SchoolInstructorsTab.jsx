import { useEffect, useState } from "react";
import "../../../styles/Dashboard/SchoolInstructorsTab.css";

import BaseModal from "../ModalForm/BaseModal";
import { fetchSchoolByOwner } from "../../../api/schools-functions";
import InstructorsListForSchool from "./InstructorsListForSchool";
import LinkedInstructorsList from "./LinkedInstructorsList";

export default function SchoolInstructorsTab() {
  const [school, setSchool] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [isAddInstructorOpen, setIsAddInstructorOpen] =
    useState(false);

  useEffect(() => {
    loadSchool();
  }, []);

  const loadSchool = async () => {
    try {
      setLoading(true);

      const user = JSON.parse(localStorage.getItem("user"));

      if (!user?.id) {
        throw new Error("משתמש לא מחובר");
      }

      const data = await fetchSchoolByOwner(user.id);

      if (!data) {
        throw new Error("לא נמצא בית ספר למשתמש זה");
      }

      setSchool(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <p>טוען נתוני בית ספר...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="school-instructors-tab" dir="rtl">
      <div className="school-instructors-header">
        

        <button
          className="add-instructor-btn"
          onClick={() => setIsAddInstructorOpen(true)}
        >
         + שיוך מדריך לבית הספר 
        </button>
      </div>

<LinkedInstructorsList schoolId={school._id} />

      <BaseModal
        isOpen={isAddInstructorOpen}
        onClose={() => setIsAddInstructorOpen(false)}
        title="הוספת מדריך לבית הספר"
      >
        <InstructorsListForSchool schoolId={school._id} />
      </BaseModal>
    </div>
  );
}
