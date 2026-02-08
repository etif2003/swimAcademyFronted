import "../../styles/DashboardTabs.css";

export default function DashboardTabs({ tabs, activeTab, onChange }) {
  return (
    <div className="tabs-wrapper">
      {tabs.map((tab) => (
        <button
          key={tab.key}
          type="button"
          className={`tab-btn ${
            activeTab === tab.key ? "active" : ""
          }`}
          onClick={() => onChange(tab.key)}
        >
            <span>{tab.label}</span>
          <span className="tab-icon">{tab.icon}</span>
          
        </button>
      ))}
    </div>
  );
}
