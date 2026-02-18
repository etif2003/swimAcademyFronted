import CourseListCard from "./CourseListCard";

export default function CoursesList({
  courses,
  onEdit,
  onViewStudents,
  showActions = false
}) {
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
          onViewStudents={onViewStudents}
          showActions={showActions}
        />
      ))}
    </>
  );
}
