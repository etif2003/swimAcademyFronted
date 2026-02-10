import { useParams, Link } from "react-router-dom";
import SinglePageSummary from "../components/SinglePage/SinglePageSummary";
import SchoolContactActionCard from "../components/schools/SchoolContactActionCard";

import SinglePageHero from "../components/SinglePage/SinglePageHero";
import "../styles/SingleSchoolPage.css";
import { SchoolNavSection } from "../components/schools/SchoolNavSection";

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

export default function SingleSchoolPage() {
    const { id } = useParams();

    const school = mockSchools.find((s) => s._id === id);

    if (!school) {
        return (
            <div className="singleSchoolPage" dir="rtl">
                <div className="singleSchoolContainer" >
                    בית הספר לא נמצא (id: {id})
                </div>
            </div>
        );
    }

    return (
        <div className="singleSchoolPage" dir="rtl">
            <SinglePageHero image={school.image} backText="חזרה לבתי ספר" backTo="/schools" />

            <main className="singleSchoolMain">
                <div className="singleSchoolContainer">
                    <div className="singleSchoolGrid">

                        {/* RIGHT */}
                        <section className="singleSchoolBody">
                            <SinglePageSummary
                                type={"School"}
                                name={school.name}
                                logo={school.logo}
                                description={school.description}
                                address={school.location?.address}
                                city={school.location?.city}
                            />

                            {/* ✅ שני הכרטיסים כמו בתמונה השנייה */}
                            <div className="singleSchoolNavRow">
                                <SchoolNavSection
                                    to={`/school/${school._id}/instructors`}
                                    title="מדריכי בית הספר"
                                    subtitle="הכירו את הצוות שלנו"
                                    icon={<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-book-open w-6 h-6 text-water-600"><path d="M12 7v14"></path><path d="M3 18a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1h5a4 4 0 0 1 4 4 4 4 0 0 1 4-4h5a1 1 0 0 1 1 1v13a1 1 0 0 1-1 1h-6a3 3 0 0 0-3 3 3 3 0 0 0-3-3z"></path></svg>}
                                />

                                <SchoolNavSection
                                    to={`/school/${school._id}/courses`}
                                    title="קורסים של בית הספר"
                                    subtitle="צפו בכל הקורסים שלנו"
                                    icon={<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-users w-6 h-6 text-water-600"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"></path><circle cx="9" cy="7" r="4"></circle><path d="M22 21v-2a4 4 0 0 0-3-3.87"></path><path d="M16 3.13a4 4 0 0 1 0 7.75"></path></svg>}
                                />

                            </div>
                        </section>

                        {/* LEFT */}
                        <div className="singleSchoolSide">
                            <SchoolContactActionCard
                                contactName={school.contactName}
                                phone={school.contactPhone}
                                email={school.contactEmail}
                            />
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
}
