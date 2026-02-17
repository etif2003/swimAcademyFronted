import { useState } from "react";
import "../styles/ListingPage.css";
import FilterDropdown from "../components/FilterDropdown.jsx";
import CardsGrid from "../components/CardsGrid.jsx";
import SchoolCard from "../components/schools/SchoolCard.jsx";
import { useSchools } from "../hooks/School/useSchools.js";
import PageState from "../components/PageState.jsx";

const getAreaOptionsFromSchools = (schools) => {
  const areas = schools.map((school) => school.location?.city).filter(Boolean); // מסיר undefined / null

  const uniqueAreas = Array.from(new Set(areas));

  return [
    { value: "", label: "כל האזורים" },
    ...uniqueAreas.map((city) => ({
      value: city,
      label: city,
    })),
  ];
};

export default function SchoolPage() {
  const [area, setArea] = useState("");
  const [search, setSearch] = useState("");
  const [openFilter, setOpenFilter] = useState(null);

  const { data: schools = [], isLoading, isError } = useSchools();

  if (isLoading) return <PageState kind="schools" state="loading" />;
  if (isError) return <PageState kind="schools" state="error" onRetry={() => window.location.reload()} />;

  const AREA_OPTIONS = getAreaOptionsFromSchools(schools);

  const filteredSchools = schools.filter((school) => {
    const matchArea = !area || school.location?.city === area;

    const matchSearch = school.name
      .toLowerCase()
      .includes(search.toLowerCase());

    return matchArea && matchSearch;
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
        <h1>בתי ספר לשחייה</h1>
        <p>בתי ספר ומרכזי שחייה מובילים בכל הארץ</p>
      </section>

      {/* FILTERS */}
      <section className="listing-filters">
        <FilterDropdown
          label="כל האזורים"
          options={AREA_OPTIONS}
          value={area}
          isOpen={openFilter === "area"}
          onToggle={() => setOpenFilter(openFilter === "area" ? null : "area")}
          onChange={setArea}
        />

        <input
          type="text"
          placeholder="חיפוש בתי ספר..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          onFocus={() => setOpenFilter(null)}
        />
      </section>

      {/* GRID */}
      {filteredSchools.length === 0 ? (
        <PageState
          kind="schools"
          state="empty"
          compact
          title="לא נמצאו בתי ספר"
          description="נסו לשנות פילטרים או חיפוש."
        />
      ) : (
        <section className="listing-grid">
          <CardsGrid
            items={filteredSchools}
            renderItem={(school) => (
              <SchoolCard key={school._id} school={school} />
            )}
          />
        </section>)}
    </div>
  );
}
