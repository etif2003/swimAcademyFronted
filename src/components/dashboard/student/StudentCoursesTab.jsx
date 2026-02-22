import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getMyRegistrations } from "../../../api/registrations-functions";
import CoursesList from "../course/CoursesList";

export default function StudentCoursesTab() {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        setError(null);

        if (!user?.id) {
          throw new Error("משתמש לא מחובר");
        }

        const registrations = await getMyRegistrations(user.id);

        // נוציא רק את הקורסים
        const coursesOnly = registrations.map(
          (reg) => reg.course
        );

        setCourses(coursesOnly);
      } catch (err) {
        console.error(err);
        setError("אין קורסים להצגה");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleOpenCourse = (course) => {
    navigate(`/course/${course._id}`);
  };

  if (loading) return <p>טוען קורסים...</p>;
  if (error) return <p className="error-text">{error}</p>;

  return (
    <div className="instructor-courses-container" dir="rtl">
      <CoursesList
        courses={courses}
        showActions={false}     // אין עריכה ואין נרשמים
        onCardClick={handleOpenCourse} // הכרטיס כולו לחיץ
      />
    </div>
  );
}
