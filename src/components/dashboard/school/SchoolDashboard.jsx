import { useState } from "react";
import DashboardTabs from "../DashboardTabs";
import { DASHBOARD_TABS_BY_ROLE } from "../dashboardTabs.config";

import SchoolProfileCard from "./SchoolProfileCard";

export default function SchoolDashboard() {
  const [activeTab, setActiveTab] = useState("profile");

  const tabs = DASHBOARD_TABS_BY_ROLE.school;

  const school = {
    name: "בית ספר לשחייה גלים",
    description: "בית ספר מקצועי ללימוד שחייה לכל הגילאים",
    area: "מרכז",
    location: {
      city: "תל אביב",
      address: "רחוב הים 10",
    },
    contact: {
      name: "דנה כהן",
      phone: "03-1234567",
      email: "info@swimschool.co.il",
    },
  };

  return (
    <>
      {/* TABS */}
      <DashboardTabs
        tabs={tabs}
        activeTab={activeTab}
        onChange={setActiveTab}
      />

      {/* CONTENT */}
      {activeTab === "profile" && (
        <SchoolProfileCard school={school} />
      )}

      {activeTab === "courses" && (
        <div className="profile-card">
          קורסים של בית הספר
        </div>
      )}

      {activeTab === "instructors" && (
        <div className="profile-card">
          מדריכים של בית הספר
        </div>
      )}

      {activeTab === "settings" && (
        <div className="profile-card">
          הגדרות בית ספר
        </div>
      )}
    </>
  );
}
