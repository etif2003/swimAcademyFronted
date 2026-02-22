import { useState } from "react";
import DashboardTabs from "../DashboardTabs";
import { DASHBOARD_TABS_BY_ROLE } from "../dashboardTabs.config";
import SchoolProfileCard from "./SchoolProfileCard";
import ChangePassword from "../ChangePassword";
import SchoolCoursesTab from "./SchoolCoursesTab";
import SchoolInstructorsTab from "./SchoolInstructorsTab";


export default function SchoolDashboard() {
  const [activeTab, setActiveTab] = useState("profile");


  const tabs = DASHBOARD_TABS_BY_ROLE.school;


  

  return (
    <>
      {/* TABS */}
      <DashboardTabs
        tabs={tabs}
        activeTab={activeTab}
        onChange={setActiveTab}
      />

      {/* CONTENT */}
      {activeTab === "profile" && <SchoolProfileCard />}

      {activeTab === "courses" && <SchoolCoursesTab />}

      {activeTab === "instructors" && (
        <SchoolInstructorsTab />
      )}

      {activeTab === "settings" && <ChangePassword />}
    </>
  );
}
