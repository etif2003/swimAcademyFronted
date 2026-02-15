import { useParams, Link } from "react-router-dom";
import SinglePageSummary from "../components/SinglePage/SinglePageSummary";
import SchoolContactActionCard from "../components/schools/SchoolContactActionCard";

import SinglePageHero from "../components/SinglePage/SinglePageHero";
import "../styles/SingleSchoolPage.css";
import { SchoolNavSection } from "../components/schools/SchoolNavSection";
import {
  ArrowRight,
  MapPin,
  Phone,
  Mail,
  MessageCircle,
  Users,
  BookOpen,
} from "lucide-react";
import { useSchool } from "../hooks/School/useSchool";

export default function SingleSchoolPage() {
  const { id } = useParams();

  const { data: school, isLoading, isError } = useSchool(id);

  if (isLoading) return <div>...טוען בית ספר</div>;
  if (isError || !school) return <div>בית ספר לא נמצא</div>;

  if (!school) {
    return (
      <div className="singleSchoolPage" dir="rtl">
        <div className="singleSchoolContainer">בית הספר לא נמצא (id: {id})</div>
      </div>
    );
  }

  return (
    <div className="singleSchoolPage" dir="rtl">
      <SinglePageHero
        image={school.image}
        backText="חזרה לבתי ספר"
        backTo="/schools"
      />

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
                  icon={<Users />}
                />

                <SchoolNavSection
                  to={`/school/${school._id}/courses`}
                  title="קורסים של בית הספר"
                  subtitle="צפו בכל הקורסים שלנו"
                  icon={<BookOpen />}
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
