import { useState } from "react";
import InstructorCard from "../components/Instructors/InstructorCard";
import "../styles/ListingPage.css";
import FilterDropdown from "../components/FilterDropdown.jsx";
import CardsGrid from "../components/CardsGrid";

// const mockCourses = [
//     {
//         _id: "1",
//         title: "שחייה למתחילים – ילדים",
//         description: "קורס חווייתי ללימוד יסודות השחייה לילדים בגילאי 5–8.",
//         price: 150,
//         category: "Learning",
//         targetAudience: "Children",
//         level: "Beginner",
//         image:
//             "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=800&q=80",

//         maxParticipants: 6,
//         currentParticipants: 4,

//         status: "Active",

//         durationWeeks: 8,
//         sessionsCount: 8,

//         location: {
//             poolName: "בריכת גורדון",
//             city: "תל אביב",
//         },

//         createdBy: "64f000000000000000000001",
//         createdByModel: "School",
//     },

//     {
//         _id: "2",
//         title: "שחייה טיפולית למבוגרים",
//         description:
//             "שחייה טיפולית מותאמת לשיקום, חיזוק שרירים ושיפור תנועתיות.",
//         price: 180,
//         category: "Therapy",
//         targetAudience: "Adults",
//         level: "Advanced",
//         image:
//             "https://images.unsplash.com/photo-1502904550040-7534597429ae?auto=format&fit=crop&w=800&q=80",

//         maxParticipants: 4,
//         currentParticipants: 3,

//         status: "Active",

//         durationWeeks: 10,
//         sessionsCount: 10,

//         location: {
//             poolName: "מרכז הספורט רמת גן",
//             city: "רמת גן",
//         },

//         createdBy: "64f000000000000000000002",
//         createdByModel: "Instructor",
//     },

//     {
//         _id: "3",
//         title: "אימון שחייה תחרותית לנוער",
//         description:
//             "אימונים מתקדמים לשיפור טכניקה, מהירות וסיבולת לקראת תחרויות.",
//         price: 220,
//         category: "Training",
//         targetAudience: "Teens",
//         level: "Professional",
//         image:
//             "https://images.unsplash.com/photo-1517649763962-0c623066013b?auto=format&fit=crop&w=800&q=80",

//         maxParticipants: 8,
//         currentParticipants: 6,

//         status: "Active",

//         durationWeeks: 12,
//         sessionsCount: 24,

//         location: {
//             poolName: "בריכת וינגייט",
//             city: "נתניה",
//         },

//         createdBy: "64f000000000000000000003",
//         createdByModel: "School",
//     },

//     {
//         _id: "4",
//         title: "שחייה לגיל הזהב",
//         description:
//             "קורס מותאם לגיל השלישי לשיפור סיבולת לב-ריאה ותנועתיות.",
//         price: 130,
//         category: "Therapy",
//         targetAudience: "Seniors",
//         level: "Beginner",
//         image:
//             "https://images.unsplash.com/photo-1506126613408-eca07ce68773?auto=format&fit=crop&w=800&q=80",

//         maxParticipants: 10,
//         currentParticipants: 7,

//         status: "Active",

//         durationWeeks: 6,
//         sessionsCount: 6,

//         location: {
//             poolName: "בריכת העיר",
//             city: "חיפה",
//         },

//         createdBy: "64f000000000000000000004",
//         createdByModel: "Instructor",
//     },

//     {
//         _id: "5",
//         title: "קורס מאמנים לשחייה",
//         description:
//             "הכשרה מקצועית למאמני שחייה – תיאוריה, טכניקה וניהול קבוצות.",
//         price: 350,
//         category: "Training",
//         targetAudience: "Adults",
//         level: "Professional",
//         image:
//             "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?auto=format&fit=crop&w=800&q=80",

//         maxParticipants: 12,
//         currentParticipants: 5,

//         status: "Draft",

//         durationWeeks: 16,
//         sessionsCount: 32,

//         location: {
//             poolName: "מכון וינגייט",
//             city: "נתניה",
//         },

//         createdBy: "64f000000000000000000005",
//         createdByModel: "School",
//     },
// ];
const mockInstructors = [
    {
        _id: "i1",
        fullName: "יוסי אברהם",
        workArea: "PT",
        experienceYears: 12,
        hourlyRate: 250,
        image: "https://randomuser.me/api/portraits/men/54.jpg",
        rating: 4.6,
        available: true,
        status: "Active",
    },
    {
        _id: "i2",
        fullName: "דני כהן",
        workArea: "TLV",
        experienceYears: 15,
        hourlyRate: 180,
        image: "https://randomuser.me/api/portraits/men/32.jpg",
        rating: 4.9,
        available: true,
        status: "Active",
    },
];

const WORKAREA_OPTIONS = [
    { value: "", label: "כל האזורים" },
    { value: "TLV", label: "תל אביב" },
    { value: "PT", label: "פתח תקוה" },
    { value: "BB", label: "בני ברק" },
    { value: "RG", label: "רמת גן" },

];


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
