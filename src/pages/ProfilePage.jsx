import DashboardLayout from "../components/dashboard/DashboardLayout";
import ProfileRouter from "../components/dashboard/ProfileRouter";

export default function ProfilePage() {
  // זמני – עד חיבור API
  const mockUser = {
    role: "Student", // שנה ל-School / Student כדי לבדוק
  };

  return (
    <DashboardLayout>
      <ProfileRouter role={mockUser.role} />
    </DashboardLayout>
  );
}
