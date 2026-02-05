import { useState } from "react";
import "../styles/ListingPage.css";
import FilterDropdown from "../components/FilterDropdown.jsx";
import CardsGrid from "../components/CardsGrid.jsx";
import SchoolCard from "../components/schools/SchoolCard.jsx";

const mockSchools = [
    {
        _id: "s1",
        owner: "64f000000000000000000101",

        name: "מרכז שחייה רמת גן",
        description:
            "מרכז שחייה מוביל עם תוכניות לימוד, אימון ושחייה טיפולית לכל הגילאים והרמות.",

        location: {
            city: "רמת גן",
            address: "רח׳ ביאליק 25",
        },

        logo: "https://cdn-icons-png.flaticon.com/512/3075/3075977.png",
        image:
            "https://images.unsplash.com/photo-1576013551627-0cc20b96c2a7?auto=format&fit=crop&w=800&q=80",

        contactName: "אורי לוי",
        contactPhone: "050-1234567",
        contactEmail: "info@rg-swim.co.il",

        status: "Active",
    },

    {
        _id: "s2",
        owner: "64f000000000000000000102",

        name: "בית ספר לשחייה תל אביב",
        description:
            "בית ספר מקצועי לשחייה עם מדריכים מוסמכים, קבוצות קטנות ודגש על יחס אישי.",

        location: {
            city: "תל אביב",
            address: "רח׳ דיזנגוף 120",
        },

        logo: "https://cdn-icons-png.flaticon.com/512/3075/3075968.png",
        image:
            "https://images.unsplash.com/photo-1600965962361-9035dbfd1c50?auto=format&fit=crop&w=800&q=80",

        contactName: "דנה כהן",
        contactPhone: "052-9876543",
        contactEmail: "contact@tlv-swim.co.il",

        status: "Active",
    },

    {
        _id: "s3",
        owner: "64f000000000000000000103",

        name: "אקדמיית וינגייט לשחייה",
        description:
            "אקדמיה לשחייה תחרותית והכשרת מאמנים, בשיתוף מכון וינגייט.",

        location: {
            city: "נתניה",
            address: "מכון וינגייט",
        },

        logo: "https://cdn-icons-png.flaticon.com/512/3075/3075974.png",
        image:
            "https://images.unsplash.com/photo-1600965962361-9035dbfd1c50?auto=format&fit=crop&w=800&q=80",

        contactName: "יובל פרידמן",
        contactPhone: "054-3332211",
        contactEmail: "academy@wingate.co.il",

        status: "Active",
    },

    {
        _id: "s4",
        owner: "64f000000000000000000104",

        name: "מים ושקט – שחייה טיפולית",
        description:
            "מרכז לשחייה טיפולית ושיקום במים, עם צוות מקצועי וסביבה רגועה.",

        location: {
            city: "חיפה",
            address: "רח׳ הנשיא 8",
        },

        logo: "https://cdn-icons-png.flaticon.com/512/3075/3075972.png",
        image:
            "https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&w=800&q=80",

        contactName: "מיכל רז",
        contactPhone: "050-7654321",
        contactEmail: "therapy@mayim.co.il",

        status: "Active",
    },

    {
        _id: "s5",
        owner: "64f000000000000000000105",

        name: "שחייה לילדים – המרכז הצפוני",
        description:
            "קורסי שחייה לילדים בגילאי 4–12, עם דגש על ביטחון במים ולמידה חווייתית.",

        location: {
            city: "קריית מוצקין",
            address: "רח׳ העצמאות 15",
        },

        logo: "https://cdn-icons-png.flaticon.com/512/3075/3075969.png",
        image:
            "https://images.unsplash.com/photo-1600965962361-9035dbfd1c50?auto=format&fit=crop&w=800&q=80",

        contactName: "שרון אמיר",
        contactPhone: "053-1122334",
        contactEmail: "kids@swimnorth.co.il",

        status: "Active",
    },
];


const getAreaOptionsFromSchools = (schools) => {
    const areas = schools
        .map((school) => school.location?.city)
        .filter(Boolean); // מסיר undefined / null

    const uniqueAreas = Array.from(new Set(areas));

    return [
        { value: "", label: "כל האזורים" },
        ...uniqueAreas.map((city) => ({
            value: city,
            label: city,
        })),
    ];
};

const AREA_OPTIONS = getAreaOptionsFromSchools(mockSchools);


export default function SchoolPage() {
    const [area, setArea] = useState("");
    const [search, setSearch] = useState("");
    const [openFilter, setOpenFilter] = useState(null);

    const filteredSchools = mockSchools.filter(school => {
        const matchArea =
            !area || school.location?.city === area;

        const matchSearch =
            school.name.toLowerCase().includes(search.toLowerCase());

        return matchArea && matchSearch;
    });

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
                    onToggle={() =>
                        setOpenFilter(openFilter === "area" ? null : "area")
                    }
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
            <section className="listing-grid">
                <CardsGrid
                    items={filteredSchools}
                    renderItem={(school) => (
                        <SchoolCard key={school._id} school={school} />
                    )}
                />
            </section>
        </div>
    );

}
