import RegistrationCard from "./RegistrationCard";
import "../../../styles/PageState.css";


export default function RegistrationsList({
  registrations,
  loading,
  onClose,
}) {
  if (loading) {
    return <div className="registrations-empty"><div className="spinner" aria-hidden="true" /></div>;
  }

  if (!registrations.length) {
    return (
      <div className="registrations-empty">
        אין נרשמים לקורס זה
      </div>
    );
  }

  return (
    <>
      <div className="registrations-wrapper">
        {registrations.map((reg) => (
          <RegistrationCard
            key={reg._id}
            registration={reg}
          />
        ))}
      </div>

      <div className="registrations-footer">
        <span>סה״כ נרשמים: {registrations.length}</span>

        <button
          type="button"
          className="btn-secondary"
          onClick={onClose}
        >
          סגירה
        </button>
      </div>
    </>
  );
}
