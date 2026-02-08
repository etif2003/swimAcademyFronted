import { User } from "lucide-react";
import DashboardLayout from "../components/dashboard/DashboardLayout";
import ProfileRouter from "../components/dashboard/ProfileRouter";
import { useAuth } from "../context/AuthContext";

export default function ProfilePage() {
  const { user, loading } = useAuth();

  if (loading) {
    return <div>טוען משתמש...</div>;
  }

  if (!user) {
    return <div>לא מחובר</div>;
  }
  console.log(user)

  console.log(user.role)
  return (
    <DashboardLayout>
      <ProfileRouter role={user.role} />
    </DashboardLayout>
  );
}
