import { useState } from "react";
import CourseCard from "../components/courses/CourseCard";
// import "../styles/CoursesPage.css";
import "../styles/ListingPage.css";
import FilterDropdown from "../components/FilterDropdown.jsx";
import CardsGrid from "../components/CardsGrid";
import { useCourses } from "../hooks/useCourses.js";
import PageState from "../components/PageState.jsx";
import { LEVEL_OPTIONS } from "../constants/levels.js";
import { TARGET_AUDIENCE_OPTIONS } from "../constants/target_audience.js";
import { CATEGORY_OPTIONS } from "../constants/categories.js";

export default function CoursesPage() {
  const [level, setLevel] = useState("");
  const [audience, setAudience] = useState("");
  const [category, setCategory] = useState("");
  const [search, setSearch] = useState("");
  const [openFilter, setOpenFilter] = useState(null);

  const { data: courses = [], isLoading, isError } = useCourses();

  if (isLoading) return <PageState kind="courses" state="loading" />;
  if (isError) return <PageState kind="courses" state="error" onRetry={() => window.location.reload()} />;

  const filteredCourses = courses.filter((course) => {
    const matchLevel = !level || course.level === level;
    const matchAudience = !audience || course.targetAudience === audience;
    const matchCategory = !category || course.category === category;
    const matchSearch = course.title
      .toLowerCase()
      .includes(search.toLowerCase());

    return matchLevel && matchAudience && matchCategory && matchSearch;
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
        <h1>גלו את הקורסים שלנו</h1>
        <p>מגוון רחב של קורסי שחייה לכל הגילאים והרמות</p>
      </section>

      {/* FILTERS */}
      <section className="listing-filters">
        <FilterDropdown
          label="כל הרמות"
          options={LEVEL_OPTIONS}
          value={level}
          isOpen={openFilter === "level"}
          onToggle={() =>
            setOpenFilter(openFilter === "level" ? null : "level")
          }
          onChange={setLevel}
        />

        <FilterDropdown
          label="כל הקהלים"
          options={TARGET_AUDIENCE_OPTIONS}
          value={audience}
          isOpen={openFilter === "audience"}
          onToggle={() =>
            setOpenFilter(openFilter === "audience" ? null : "audience")
          }
          onChange={setAudience}
        />

        <FilterDropdown
          label="כל הקטגוריות"
          options={CATEGORY_OPTIONS}
          value={category}
          isOpen={openFilter === "category"}
          onToggle={() =>
            setOpenFilter(openFilter === "category" ? null : "category")
          }
          onChange={setCategory}
        />

        <input
          type="text"
          placeholder="חיפוש קורסים..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          onFocus={() => setOpenFilter(null)}
        />
      </section>

      {/* GRID */}
      {filteredCourses.length === 0 ? (
        <PageState
          kind="courses"
          state="empty"
          compact
          title="לא נמצאו קורסים"
          description="נסו לשנות פילטרים או חיפוש."
        />
      ) : (
        <section className="listing-grid">
          <CardsGrid
            items={filteredCourses}
            renderItem={(course) => (
              <CourseCard key={course._id} course={course} />
            )}
          />
        </section>)}
    </div>
  );
}
