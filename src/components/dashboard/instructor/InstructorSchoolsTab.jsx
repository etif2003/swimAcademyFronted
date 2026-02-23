import { useEffect, useState } from "react";
import SchoolsList from "./SchoolsList";
import {
  approveSchoolInstructor,
  fetchPendingInstructorRequests,
  fetchSchoolsByInstructor,
  unlinkInstructorFromSchool,
} from "../../../api/schoolInstructor-functions";
import "../../../styles/Dashboard/InstructorSchoolsTab.css";


export default function InstructorSchoolsTab() {
  const [activeSchools, setActiveSchools] = useState([]);
  const [pendingSchools, setPendingSchools] = useState([]);
  const [loading, setLoading] = useState(true);
  const [approvingId, setApprovingId] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      const active = await fetchSchoolsByInstructor();
      const pending = await fetchPendingInstructorRequests();
      setActiveSchools(active);
      setPendingSchools(pending);
    } catch {
      setError("שגיאה בטעינת בתי הספר");
    } finally {
      setLoading(false);
    }
  };

  const handleApprove = async (id) => {
    try {
      setApprovingId(id);
      await approveSchoolInstructor(id);

      const approvedItem = pendingSchools.find((i) => i._id === id);

      setPendingSchools((prev) => prev.filter((i) => i._id !== id));

      if (approvedItem) {
        setActiveSchools((prev) => [
          ...prev,
          { ...approvedItem, status: "Active" },
        ]);
      }
    } finally {
      setApprovingId(null);
    }
  };

  const handleUnlink = async (id) => {
    await unlinkInstructorFromSchool(id);
    setActiveSchools((prev) => prev.filter((i) => i._id !== id));
  };

  if (loading) return <p>טוען...</p>;

  return (
    <div className="instructor-schools-container" dir="rtl">

      {error && <p>{error}</p>}

      <SchoolsList
        title="שיוכים פעילים"
        schools={activeSchools}
        onUnlink={handleUnlink}
      />

      <SchoolsList
        title="בקשות ממתינות"
        schools={pendingSchools}
        onApprove={handleApprove}
        approvingId={approvingId}
      />
    </div>
  );
}