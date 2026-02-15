import { useState } from "react";
import CourseCard from "../components/courses/CourseCard";
// import "../styles/CoursesPage.css";
import "../styles/ListingPage.css";
import FilterDropdown from "../components/FilterDropdown.jsx";
import CardsGrid from "../components/CardsGrid";
import { useCourses } from "../hooks/useCourses.js";

const LEVEL_OPTIONS = [
  { value: "", label: "כל הרמות" },
  { value: "Beginner", label: "מתחילים" },
  { value: "Advanced", label: "מתקדמים" },
  { value: "Professional", label: "מקצועי" },
];

const AUDIENCE_OPTIONS = [
  { value: "", label: "כל הקהלים" },
  { value: "Children", label: "ילדים" },
  { value: "Teens", label: "נוער" },
  { value: "Adults", label: "מבוגרים" },
  { value: "Seniors", label: "גיל הזהב" },
];

const CATEGORY_OPTIONS = [
  { value: "", label: "כל הקטגוריות" },
  { value: "Learning", label: "למידה" },
  { value: "Training", label: "הכשרה" },
  { value: "Therapy", label: "טיפולי" },
];

export default function CoursesPage() {
  const [level, setLevel] = useState("");
  const [audience, setAudience] = useState("");
  const [category, setCategory] = useState("");
  const [search, setSearch] = useState("");
  const [openFilter, setOpenFilter] = useState(null);

  const { data: courses = [], isLoading, isError } = useCourses();

  if (isLoading) return <div>...טוען קורסים</div>;
  if (isError) return <div>שגיאה בטעינת קורסים</div>;

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
          options={AUDIENCE_OPTIONS}
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
      <section className="listing-grid">
        <CardsGrid
          items={filteredCourses}
          renderItem={(course) => (
            <CourseCard key={course._id} course={course} />
          )}
        />
      </section>
    </div>
  );
}
