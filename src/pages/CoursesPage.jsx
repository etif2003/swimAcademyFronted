import { useState } from "react";
import CourseCard from "../components/courses/CourseCard";
// import "../styles/CoursesPage.css";
import "../styles/ListingPage.css";
import FilterDropdown from "../components/FilterDropdown.jsx";
import CardsGrid from "../components/CardsGrid";

const mockCourses = [
    {
        _id: "1",
        title: "שחייה למתחילים – ילדים",
        description: "קורס חווייתי ללימוד יסודות השחייה לילדים בגילאי 5–8.",
        price: 150,
        category: "Learning",
        targetAudience: "Children",
        level: "Beginner",
        image:
            "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=800&q=80",

        maxParticipants: 6,
        currentParticipants: 4,

        status: "Active",

        durationWeeks: 8,
        sessionsCount: 8,

        location: {
            poolName: "בריכת גורדון",
            city: "תל אביב",
        },

        createdBy: "64f000000000000000000001",
        createdByModel: "School",
    },

    {
        _id: "2",
        title: "שחייה טיפולית למבוגרים",
        description:
            "שחייה טיפולית מותאמת לשיקום, חיזוק שרירים ושיפור תנועתיות.",
        price: 180,
        category: "Therapy",
        targetAudience: "Adults",
        level: "Advanced",
        image:
            "https://images.unsplash.com/photo-1502904550040-7534597429ae?auto=format&fit=crop&w=800&q=80",

        maxParticipants: 4,
        currentParticipants: 3,

        status: "Active",

        durationWeeks: 10,
        sessionsCount: 10,

        location: {
            poolName: "מרכז הספורט רמת גן",
            city: "רמת גן",
        },

        createdBy: "64f000000000000000000002",
        createdByModel: "Instructor",
    },

    {
        _id: "3",
        title: "אימון שחייה תחרותית לנוער",
        description:
            "אימונים מתקדמים לשיפור טכניקה, מהירות וסיבולת לקראת תחרויות.",
        price: 220,
        category: "Training",
        targetAudience: "Teens",
        level: "Professional",
        image:
            "https://images.unsplash.com/photo-1517649763962-0c623066013b?auto=format&fit=crop&w=800&q=80",

        maxParticipants: 8,
        currentParticipants: 6,

        status: "Active",

        durationWeeks: 12,
        sessionsCount: 24,

        location: {
            poolName: "בריכת וינגייט",
            city: "נתניה",
        },

        createdBy: "64f000000000000000000003",
        createdByModel: "School",
    },

    {
        _id: "4",
        title: "שחייה לגיל הזהב",
        description:
            "קורס מותאם לגיל השלישי לשיפור סיבולת לב-ריאה ותנועתיות.",
        price: 130,
        category: "Therapy",
        targetAudience: "Seniors",
        level: "Beginner",
        image:
            "https://images.unsplash.com/photo-1506126613408-eca07ce68773?auto=format&fit=crop&w=800&q=80",

        maxParticipants: 10,
        currentParticipants: 7,

        status: "Active",

        durationWeeks: 6,
        sessionsCount: 6,

        location: {
            poolName: "בריכת העיר",
            city: "חיפה",
        },

        createdBy: "64f000000000000000000004",
        createdByModel: "Instructor",
    },

    {
        _id: "5",
        title: "קורס מאמנים לשחייה",
        description:
            "הכשרה מקצועית למאמני שחייה – תיאוריה, טכניקה וניהול קבוצות.",
        price: 350,
        category: "Training",
        targetAudience: "Adults",
        level: "Professional",
        image:
            "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?auto=format&fit=crop&w=800&q=80",

        maxParticipants: 12,
        currentParticipants: 5,

        status: "Draft",

        durationWeeks: 16,
        sessionsCount: 32,

        location: {
            poolName: "מכון וינגייט",
            city: "נתניה",
        },

        createdBy: "64f000000000000000000005",
        createdByModel: "School",
    },
];

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

    const filteredCourses = mockCourses.filter(course => {
        const matchLevel =
            !level || course.level === level;

        const matchAudience =
            !audience || course.targetAudience === audience;

        const matchCategory =
            !category || course.category === category;

        const matchSearch =
            course.title.toLowerCase().includes(search.toLowerCase());


        return matchLevel && matchAudience && matchCategory && matchSearch;
    });

    // return (
    //     <div className="courses-page">

    //         {/* HERO */}
    //         <section className="courses-hero">
    //             <h1>גלו את הקורסים שלנו</h1>
    //             <p>מגוון רחב של קורסי שחייה לכל הגילאים והרמות</p>
    //         </section>

    //         {/* FILTERS */}
    //         <section className="courses-filters">

    //             <FilterDropdown
    //                 label="כל הרמות"
    //                 options={LEVEL_OPTIONS}
    //                 value={level}
    //                 isOpen={openFilter === "level"}
    //                 onToggle={() =>
    //                     setOpenFilter(openFilter === "level" ? null : "level")
    //                 }
    //                 onChange={setLevel}
    //             />

    //             <FilterDropdown
    //                 label="כל הקהלים"
    //                 options={AUDIENCE_OPTIONS}
    //                 value={audience}
    //                 isOpen={openFilter === "audience"}
    //                 onToggle={() =>
    //                     setOpenFilter(openFilter === "audience" ? null : "audience")
    //                 }
    //                 onChange={setAudience}
    //             />

    //             <FilterDropdown
    //                 label="כל הקטגוריות"
    //                 options={CATEGORY_OPTIONS}
    //                 value={category}
    //                 isOpen={openFilter === "category"}
    //                 onToggle={() =>
    //                     setOpenFilter(openFilter === "category" ? null : "category")
    //                 }
    //                 onChange={setCategory}
    //             />

    //             <input
    //                 type="text"
    //                 placeholder="חיפוש קורסים..."
    //                 value={search}
    //                 onChange={(e) => setSearch(e.target.value)}
    //                 onFocus={() => setOpenFilter(null)} // סוגר פילטרים
    //             />

    //         </section>


    //         {/* COURSES GRID */}
    //         <section className="courses-grid-wrapper">
    //             <div className="container">
    //                 <CardsGrid
    //                     items={filteredCourses}
    //                     renderItem={(course) => (
    //                         <CourseCard key={course._id} course={course} />
    //                     )}
    //                 />
    //             </div>
    //         </section>

    //     </div>
    // );
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
