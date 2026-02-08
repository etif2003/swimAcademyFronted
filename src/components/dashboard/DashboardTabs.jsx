import "../../styles/DashboardTabs.css";
import {
  User,
  BookOpen,
  Settings,
  Users,
  Building,
} from "lucide-react";

const ICON_MAP = {
  User,
  BookOpen,
  Settings,
  Users,
  Building,
};

export default function DashboardTabs({ tabs, activeTab, onChange }) {
  return (
    <div className="tabs-wrapper">
      {tabs.map((tab) => {
        const IconComponent = ICON_MAP[tab.icon];

        return (
          <button
            key={tab.key}
            type="button"
            className={`tab-btn ${
              activeTab === tab.key ? "active" : ""
            }`}
            onClick={() => onChange(tab.key)}
          >
            <span className="tab-label">
              {tab.label}
            </span>

            {IconComponent && (
              <span className="tab-icon">
                <IconComponent size={16} />
              </span>
            )}
          </button>
        );
      })}
    </div>
  );
}
