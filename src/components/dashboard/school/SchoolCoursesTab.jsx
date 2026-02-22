import { useEffect, useState } from "react";
import "../../../styles/Dashboard/InstructorCoursesTab.css";

import { fetchMyCourses } from "../../../api/courses-functions";
import CourseModal from "../course/CourseForm/CourseModal";
import CoursesList from "../course/CoursesList";

export default function SchoolCoursesTab() {
  const [courses, setCourses] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const user = JSON.parse(localStorage.getItem("user"));

  const loadCourses = async () => {
    try {
      setLoading(true);
      setError(null);

      if (!user?.id || !user?.role) {
        throw new Error("משתמש לא מחובר");
      }

      const data = await fetchMyCourses(
        user.role,
        user._id
      );

      setCourses(data);
    } catch (err) {
      console.error(err);
      setError("אין קורסים להצגה");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadCourses();
  }, []);

  const openCreateModal = () => {
    setSelectedCourse(null);
    setIsModalOpen(true);
  };

  const openEditModal = (course) => {
    setSelectedCourse(course);
    setIsModalOpen(true);
  };

  const handleViewStudents = (course) => {
    console.log("צפייה בנרשמים עבור קורס:", course._id);
  };

  return (
    <div className="instructor-courses-container" dir="rtl">
      
      {/* Header */}
      <div className="instructor-courses-header">
        <button className="create-btn" onClick={openCreateModal}>
          + יצירת קורס חדש
        </button>
      </div>

      {/* States */}
      {loading && <p>טוען קורסים...</p>}
      {error && <p className="error-text">{error}</p>}

      {!loading && !error && (
        <CoursesList
          courses={courses}
          showActions={true}
          onEdit={openEditModal}
          onViewStudents={handleViewStudents}
        />
      )}

      {/* Modal */}
      <CourseModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        course={selectedCourse}
        onSuccess={loadCourses}
      />
    </div>
  );
}
