import { useState } from "react";
import RegistrationsModal from "../registrations/RegistrationsModal";
import CourseListCard from "./CourseListCard";

export default function CoursesList({
  courses,
  onEdit,
  showActions = false,
}) {
  const [selectedCourse, setSelectedCourse] = useState(null);

  const handleViewStudents = (course) => {
    setSelectedCourse(course);
  };

  const closeModal = () => {
    setSelectedCourse(null);
  };

  if (!courses || courses.length === 0) {
    return <p>אין קורסים להצגה</p>;
  }

  return (
    <>
      {courses.map((course) => (
        <CourseListCard
          key={course._id}
          course={course}
          onEdit={onEdit}
          onViewStudents={handleViewStudents}
          showActions={showActions}
        />
      ))}

      <RegistrationsModal
        isOpen={!!selectedCourse}
        onClose={closeModal}
        courseId={selectedCourse?._id}
        courseTitle={selectedCourse?.title}
      />
    </>
  );
}
