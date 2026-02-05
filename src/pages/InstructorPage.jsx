import { useState } from "react";
import InstructorCard from "../components/Instructors/InstructorCard";
import "../styles/ListingPage.css";
import FilterDropdown from "../components/FilterDropdown.jsx";
import CardsGrid from "../components/CardsGrid";

const mockInstructors = [
    {
        _id: "i1",
        fullName: "יוסי אברהם",
        workArea: "פתח תקוה",
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
        workArea: "תל אביב",
        experienceYears: 15,
        hourlyRate: 180,
        image: "https://randomuser.me/api/portraits/men/32.jpg",
        rating: 4.9,
        available: true,
        status: "Active",
    },
    {
        _id: "i3",
        fullName: "מיכל לוי",
        workArea: "רמת גן",
        experienceYears: 10,
        hourlyRate: 200,
        image: "https://randomuser.me/api/portraits/women/44.jpg",
        rating: 4.8,
        available: true,
        status: "Active",
    },
    {
        _id: "i4",
        fullName: "שרון אמיר",
        workArea: "חיפה",
        experienceYears: 8,
        hourlyRate: 170,
        image: "https://randomuser.me/api/portraits/women/65.jpg",
        rating: 4.5,
        available: true,
        status: "Active",
    },
    {
        _id: "i5",
        fullName: "אלון פרץ",
        workArea: "פתח תקוה",
        experienceYears: 18,
        hourlyRate: 280,
        image: "https://randomuser.me/api/portraits/men/76.jpg",
        rating: 4.9,
        available: false,
        status: "Inactive",
    },
    {
        _id: "i6",
        fullName: "נועה בן דוד",
        workArea: "ירושלים",
        experienceYears: 6,
        hourlyRate: 160,
        image: "https://randomuser.me/api/portraits/women/21.jpg",
        rating: 4.4,
        available: true,
        status: "Active",
    },
    {
        _id: "i7",
        fullName: "איתי רוזן",
        workArea: "כפר סבא",
        experienceYears: 9,
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
