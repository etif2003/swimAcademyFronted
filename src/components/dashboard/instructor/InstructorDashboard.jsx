import { useState } from "react";
import DashboardTabs from "../DashboardTabs";
import { DASHBOARD_TABS_BY_ROLE } from "../dashboardTabs.config";
import InstructorProfileCard from "./InstructorProfileCard";
import ChangePassword from "../ChangePassword";
import InstructorCoursesTab from "./InstructorCoursesTab";

export default function InstructorDashboard() {
  const [activeTab, setActiveTab] = useState("profile");

  const tabs = DASHBOARD_TABS_BY_ROLE.instructor;



  return (
    <>
      <DashboardTabs
        tabs={tabs}
        activeTab={activeTab}
        onChange={setActiveTab}
      />

      {activeTab === "profile" && (
        <InstructorProfileCard/>
      )}

            {activeTab === "courses" && <InstructorCoursesTab />}


      {activeTab === "settings" && <ChangePassword />}


      
    </>
  );
}
