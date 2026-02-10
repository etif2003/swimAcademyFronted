import { useParams, Link } from "react-router-dom";
import ContactActionCard from "../components/SinglePage/ContactActionCard";

import SinglePageHero from "../components/SinglePage/SinglePageHero";
import "../styles/singleInstructorPage.css";
import InstructorInfoListCard from "../components/Instructors/InstructorInfoListCard";

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

export default function SingleInstructorPage() {
    const { id } = useParams();

    const instructor = mockInstructors.find((s) => s._id === id);

    if (!instructor) {
        return (
            <div className="singleInstructorPage" dir="rtl">
                <div className="singleInstructorContainer" >
                    מדריך לא נמצא (id: {id})
                </div>
            </div>
        );
    }

    return (
        <div className="singleInstructorPage" dir="rtl">
            <SinglePageHero image={instructor.image} backText="חזרה למדריכים" backTo="/Instructors" />

            <main className="singleInstructorMain">
                <div className="singleInstructorContainer">
                    <div className="singleInstructorGrid">

                        {/* RIGHT */}
                        <InstructorInfoListCard
                            items={instructor.certificates}
                        />

                        {/* LEFT */}
                        <div className="singleInstructorSide">
                            <ContactActionCard
                                type={"instructor"}
                                price={instructor.hourlyRate}
                                phone={instructor.phone}
                            />
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
}
