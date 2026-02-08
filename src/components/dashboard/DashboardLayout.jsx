export default function DashboardLayout({ children }) {
  return (
    <div className="dashboard">
      <header className="dashboard-header">
        <h1>האזור האישי</h1>
      </header>

      <main className="dashboard-content">
        {children}
      </main>
    </div>
  );
}
