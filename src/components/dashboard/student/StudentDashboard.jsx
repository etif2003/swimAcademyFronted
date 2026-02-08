import { useState } from "react";
import DashboardTabs from "../DashboardTabs";
import { DASHBOARD_TABS_BY_ROLE } from "../dashboardTabs.config";
import StudentProfileCard from "./StudentProfileCard";

export default function StudentDashboard() {
  const [activeTab, setActiveTab] = useState("profile");

  const tabs = DASHBOARD_TABS_BY_ROLE.student;

  // mock data – יוחלף ב־API
  const student = {
    fullName: "נועה כהן",
    email: "noa@email.com",
    phone: "052-9876543",
    image:
      "https://ui-avatars.com/api/?name=Student&background=6366F1&color=fff&size=200",
  };

  return (
    <>
      <DashboardTabs
        tabs={tabs}
        activeTab={activeTab}
        onChange={setActiveTab}
      />

      {activeTab === "profile" && (
        <StudentProfileCard student={student} />
      )}

      {activeTab === "courses" && (
        <div className="profile-card">
          הקורסים שלי
        </div>
      )}

      {activeTab === "settings" && (
        <div className="profile-card">
          הגדרות חשבון
        </div>
      )}
    </>
  );
}
