import { useState } from "react";
import DashboardTabs from "../DashboardTabs";
import { DASHBOARD_TABS_BY_ROLE } from "../dashboardTabs.config";
import InstructorProfileCard from "./InstructorProfileCard";
import ChangePassword from "../ChangePassword";
import InstructorCoursesTab from "./InstructorCoursesTab";

export default function InstructorDashboard() {
  const [activeTab, setActiveTab] = useState("profile");

  const tabs = DASHBOARD_TABS_BY_ROLE.instructor;

  const instructor = {
    fullName: "אורי לוי",
    phone: "050-1234567",
    workArea: "מרכז",
    experienceYears: 6,
    hourlyRate: 120,
    certificates: ["מאמן שחייה מוסמך", "עזרה ראשונה"],
    image:
      "https://ui-avatars.com/api/?name=Instructor&background=0BBBD6&color=fff&size=200",
    status: "Active",
  };

  return (
    <>
      <DashboardTabs
        tabs={tabs}
        activeTab={activeTab}
        onChange={setActiveTab}
      />

      {activeTab === "profile" && (
        <InstructorProfileCard instructor={instructor} />
      )}

            {activeTab === "courses" && <InstructorCoursesTab />}


      {activeTab === "settings" && <ChangePassword />}


      
    </>
  );
}
