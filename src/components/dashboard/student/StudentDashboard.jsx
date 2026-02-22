import { useState } from "react";
import DashboardTabs from "../DashboardTabs";
import { DASHBOARD_TABS_BY_ROLE } from "../dashboardTabs.config";
import StudentProfileCard from "./StudentProfileCard";
import ChangePassword from "../ChangePassword";
import StudentCoursesTab from "./StudentCoursesTab";

export default function StudentDashboard() {
  const [activeTab, setActiveTab] = useState("profile");

  const tabs = DASHBOARD_TABS_BY_ROLE.student;

  return (
    <>
      <DashboardTabs
        tabs={tabs}
        activeTab={activeTab}
        onChange={setActiveTab}
      />

      {activeTab === "profile" && <StudentProfileCard />}
      {activeTab === "courses" && <StudentCoursesTab />}
      {activeTab === "settings" && <ChangePassword />}
    </>
  );
}
