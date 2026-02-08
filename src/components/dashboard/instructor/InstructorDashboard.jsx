import InstructorProfileCard from "./InstructorProfileCard";

export default function InstructorDashboard() {
  // mock data – יוחלף ב-API
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
    <section>
      <InstructorProfileCard instructor={instructor} />
    </section>
  );
}
