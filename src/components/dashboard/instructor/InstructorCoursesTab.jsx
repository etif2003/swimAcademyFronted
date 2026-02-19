// import { useEffect, useState } from "react";
// import "../../../styles/Dashboard/InstructorCoursesTab.css";
// import {fetchMyCourses } from "../../../api/courses-functions";
// import CourseModal from "../course/CourseForm/CourseModal";


// export default function InstructorCoursesTab() {
//   const [courses, setCourses] = useState([]);
//   const [isModalOpen, setIsModalOpen] = useState(false);
//   const [selectedCourse, setSelectedCourse] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   const user = JSON.parse(localStorage.getItem("user"));

//   const loadCourses = async () => {
//     try {
//       setLoading(true);
//       setError(null);

//       if (!user?.id || !user?.role) {
//         throw new Error("משתמש לא מחובר");
//       }

//       const data = await fetchMyCourses(
//         user.role,
//         user.id
//       );

//       setCourses(data);
//     } catch (err) {
//       console.error(err);
//       setError("שגיאה בטעינת הקורסים");
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     loadCourses();
//   }, []);

//   const openCreateModal = () => {
//     setSelectedCourse(null);
//     setIsModalOpen(true);
//   };

//   const openEditModal = (course) => {
//     setSelectedCourse(course);
//     setIsModalOpen(true);
//   };

//   return (
//     <div className="instructor-courses-container" dir="rtl">
//       {/* Header */}
//       <div className="instructor-courses-header">
//         <button className="create-btn" onClick={openCreateModal}>
//           + יצירת קורס חדש
//         </button>
//       </div>

//       {/* States */}
//       {loading && <p>טוען קורסים...</p>}
//       {error && <p className="error-text">{error}</p>}

//       {!loading && courses.length === 0 && (
//         <p>אין קורסים להצגה</p>
//       )}

//       {/* Courses List */}
//       {!loading &&
//         courses.map((course) => (
//           <div key={course._id} className="instructor-course-card">
            
//             {/* Actions (Left side) */}
//             <div className="instructor-course-actions">
//               <button
//                 className="edit-btn"
//                 onClick={() => openEditModal(course)}
//               >
//                 עריכה
//               </button>

//               <div className="students-link">
//                 👥 צפייה בנרשמים
//               </div>
//             </div>

//             {/* Info (Center) */}
//             <div className="instructor-course-info">
//               <h3>{course.title}</h3>

//               <div className="instructor-course-meta">
//                 {course.targetAudience} • {course.category}
//               </div>

//               <div className="instructor-course-price">
//                 ₪{course.price}
//               </div>

//               <div className="instructor-course-registrations">
//                 {course.currentParticipants || 0} נרשמים
//               </div>
//             </div>

//             {/* Image (Right side) */}
//             <img
//               src={
//                 course.image ||
//                 "https://via.placeholder.com/100x100?text=Course"
//               }
//               alt={course.title}
//               className="instructor-course-image"
//             />
//           </div>
//         ))}

//       {/* Modal */}
//       <CourseModal
//         isOpen={isModalOpen}
//         onClose={() => setIsModalOpen(false)}
//         course={selectedCourse}
//         onSuccess={loadCourses}
//       />
//     </div>
//   );
// }



import { useEffect, useState } from "react";
import "../../../styles/Dashboard/InstructorCoursesTab.css";
import { fetchMyCourses } from "../../../api/courses-functions";
import CourseModal from "../course/CourseForm/CourseModal";
import CoursesList from "../course/CoursesList";

export default function InstructorCoursesTab() {
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
    // כאן בעתיד תוכל לנווט לעמוד נרשמים
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
