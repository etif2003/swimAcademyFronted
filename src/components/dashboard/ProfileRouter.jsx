// components/dashboard/ProfileRouter.jsx
import InstructorDashboard from "./instructor/InstructorDashboard";
import SchoolDashboard from "./school/SchoolDashboard";
import StudentDashboard from "./student/StudentDashboard";

export default function ProfileRouter({ role }) {

  switch (role) {
    case "Instructor":
      return <InstructorDashboard />;

    case "School":
      return <SchoolDashboard />;

    case "Student":
      return <StudentDashboard />;

    default:
      return <div>אין הרשאה</div>;
  }
}
