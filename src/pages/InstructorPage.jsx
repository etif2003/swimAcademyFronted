import { useState } from "react";
import InstructorCard from "../components/Instructors/InstructorCard";
import "../styles/ListingPage.css";
import FilterDropdown from "../components/FilterDropdown.jsx";
import CardsGrid from "../components/CardsGrid";

export const mockInstructors = [
    {
        _id: "i1",
        user: "u1",
        fullName: "יוסי אברהם",
        phone: "0501234567",
        experienceYears: 12,
        certificates: [
            "מדריך שחייה מוסמך",
            "הצלה ראשונה בבריכה",
        ],
        workArea: "פתח תקוה",
        hourlyRate: 250,
        image: "https://randomuser.me/api/portraits/men/54.jpg",
        rating: 4.6,
        available: true,
        status: "Active",
    },
    {
        _id: "i2",
        user: "u2",
        fullName: "דני כהן",
        phone: "0529876543",
        experienceYears: 15,
        certificates: [
            "מדריך שחייה מוסמך",
            "מדריך ילדים",
        ],
        workArea: "תל אביב",
        hourlyRate: 180,
        image: "https://randomuser.me/api/portraits/men/32.jpg",
        rating: 4.9,
        available: true,
        status: "Active",
    },
    {
        _id: "i3",
        user: "u3",
        fullName: "מיכל לוי",
        phone: "0542223344",
        experienceYears: 10,
        certificates: [
            "מדריכת שחייה מוסמכת",
            "שחייה טיפולית",
        ],
        workArea: "רמת גן",
        hourlyRate: 200,
        image: "https://randomuser.me/api/portraits/women/44.jpg",
        rating: 4.8,
        available: true,
        status: "Active",
    },
    {
        _id: "i4",
        user: "u4",
        fullName: "שרון אמיר",
        phone: "0537654321",
        experienceYears: 8,
        certificates: [
            "מדריכת ילדים",
        ],
        workArea: "חיפה",
        hourlyRate: 170,
        image: "https://randomuser.me/api/portraits/women/65.jpg",
        rating: 4.5,
        available: true,
        status: "Active",
    },
    {
        _id: "i5",
        user: "u5",
        fullName: "אלון פרץ",
        phone: "0509988776",
        experienceYears: 18,
        certificates: [
            "מדריך בכיר",
            "מדריך תחרותי",
        ],
        workArea: "פתח תקוה",
        hourlyRate: 280,
        image: "https://randomuser.me/api/portraits/men/76.jpg",
        rating: 4.9,
        available: false,
        status: "Inactive",
    },
    {
        _id: "i6",
        user: "u6",
        fullName: "נועה בן דוד",
        phone: "0551239876",
        experienceYears: 6,
        certificates: [
            "מדריכת מתחילים",
        ],
        workArea: "ירושלים",
        hourlyRate: 160,
        image: "https://randomuser.me/api/portraits/women/21.jpg",
        rating: 4.4,
        available: true,
        status: "Active",
    },
    {
        _id: "i7",
        user: "u7",
        fullName: "איתי רוזן",
        phone: "0523332211",
        experienceYears: 9,
        certificates: [
            "מדריך שחייה",
        ],
        workArea: "כפר סבא",
        hourlyRate: 190,
        image: "https://randomuser.me/api/portraits/men/18.jpg",
        rating: 4.7,
        available: true,
        status: "Active",
    },
];


const getAreaOptionsFromInstructors = (instructors) => {
  const workAreas = instructors
    .map((instructors) => instructors.workArea)
    .filter(Boolean); // מסיר undefined / null

  const uniqueWorkAreas = Array.from(new Set(workAreas));

  return [
    { value: "", label: "כל האזורים" },
    ...uniqueWorkAreas.map((workArea) => ({
      value: workArea,
      label: workArea,
    })),
  ];
};

const WORKAREA_OPTIONS = getAreaOptionsFromInstructors(mockInstructors);

export default function InstructorPage() {
  const [workArea, setWorkArea] = useState("");
  const [search, setSearch] = useState("");
  const [openFilter, setOpenFilter] = useState(null);

  const filteredInstructors = mockInstructors.filter(instructor => {
    const matchWorkArea =
      !workArea || instructor.workArea === workArea;

    const matchSearch =
      instructor.fullName.toLowerCase().includes(search.toLowerCase());

    return matchWorkArea && matchSearch;
  });


  return (
    <div className="listing-page">
      {/* HERO */}
      <section
        className="listing-hero"
        style={{
          backgroundImage:
            "url(https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1600&q=80)",
          color: "white",
        }}
      >
        <h1>המדריכים שלנו</h1>
        <p>מדריכי שחייה מוסמכים ומנוסים שילוו אתכם בדרך להצלחה</p>
      </section>

      {/* FILTERS */}
      <section className="listing-filters">
        <FilterDropdown
          label="כל האזורים"
          options={WORKAREA_OPTIONS}
          value={workArea}
          isOpen={openFilter === "workArea"}
          onToggle={() =>
            setOpenFilter(openFilter === "workArea" ? null : "workArea")
          }
          onChange={setWorkArea}
        />

        <input
          type="text"
          placeholder="חיפוש מדריכים..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          onFocus={() => setOpenFilter(null)}
        />
      </section>

      {/* GRID */}
      <section className="listing-grid">
        <CardsGrid
          items={filteredInstructors}
          renderItem={(instructor) => (
            <InstructorCard key={instructor._id} instructor={instructor} />
          )}
        />
      </section>
    </div>
  );

}
