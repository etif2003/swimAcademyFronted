import { useState } from "react";
import InstructorCard from "../components/Instructors/InstructorCard";
import "../styles/ListingPage.css";
import FilterDropdown from "../components/FilterDropdown.jsx";
import CardsGrid from "../components/CardsGrid";
import { useInstructors } from "../hooks/Instructor/useInstructors.js";
import PageState from "../components/PageState.jsx";
import { useParams } from "react-router";
import { useInstructorSchool } from "../hooks/Instructor/useInstructorSchool.js";
import { AREAS,AREA_LABELS } from "../constants/areas.js";

// const getAreaOptionsFromInstructors = (instructors) => {
//   const workAreas = instructors
//     .map((instructors) => instructors.workArea)
//     .filter(Boolean); // מסיר undefined / null

//   const uniqueWorkAreas = Array.from(new Set(workAreas));

//   return [
//     { value: "", label: "כל האזורים" },
//     ...uniqueWorkAreas.map((workArea) => ({
//       value: workArea,
//       label: workArea,
//     })),
//   ];
// };
const areaOptions = [
  { value: "כל האזורים", label: "כל האזורים" },
  ...AREAS.map(area => ({
    value: area.label,
    label: area.label
  }))
];
// const areaOptions = [{ value: "All", label: "כל האזורים" }, ...AREAS];

export default function InstructorPage() {
  const [workArea, setWorkArea] = useState("");
  const [search, setSearch] = useState("");
  const [openFilter, setOpenFilter] = useState(null);

  const { schoolId } = useParams();

  const instructorSchool = useInstructorSchool(schoolId, {
    enabled: !!schoolId,
  });
  const allInstructors = useInstructors({ enabled: !schoolId });

  // בוחרים את הנתונים לפי מה שזמין
  const instructors =
    (schoolId ? instructorSchool.data : allInstructors.data) || [];
  const isLoading = schoolId
    ? instructorSchool.isLoading
    : allInstructors.isLoading;
  const isError = schoolId ? instructorSchool.isError : allInstructors.isError;

  // const {
  //   data: instructors = [],
  //   isLoading,
  //   isError,
  // } = schoolId ? useInstructorSchool(schoolId) : useInstructors(schoolId);

  if (isLoading) return <PageState kind="instructors" state="loading" />;
  if (isError)
    return (
      <PageState
        kind="instructors"
        state="error"
        onRetry={() => window.location.reload()}
      />
    );

  // const WORKAREA_OPTIONS = getAreaOptionsFromInstructors(instructors);

  const filteredInstructors = instructors.filter((instructor) => {
    const name = instructor.fullName || "";
    const matchSearch = name.toLowerCase().includes(search.toLowerCase());

    const matchWorkArea =
      !workArea || workArea ===  "כל האזורים" || instructor.workArea === workArea;

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
          options={areaOptions /*WORKAREA_OPTIONS*/}
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
      {filteredInstructors.length === 0 ? (
        <PageState
          kind="instructors"
          state="empty"
          compact
          title="לא נמצאו מדריכים"
          description="נסו לשנות פילטרים או חיפוש."
        />
      ) : (
        <section className="listing-grid">
          <CardsGrid
            items={filteredInstructors}
            renderItem={(instructor) => (
              <InstructorCard key={instructor._id} instructor={instructor} />
            )}
          />
        </section>
      )}
    </div>
  );
}
