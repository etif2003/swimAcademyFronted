import { useParams, Link } from "react-router-dom";
import ContactActionCard from "../components/SinglePage/ContactActionCard";

import SinglePageHero from "../components/SinglePage/SinglePageHero";
import "../styles/singleInstructorPage.css";
import InstructorInfoListCard from "../components/Instructors/InstructorInfoListCard";

import { MapPin, Clock } from "lucide-react";
import { useInstructor } from "../hooks/Instructor/useInstructor";

export default function SingleInstructorPage() {
  const { id } = useParams();

  const { data: instructor, isLoading, isError } = useInstructor(id);

  if (isLoading) return <div>...טוען מדריך</div>;
  if (isError || !instructor) return <div>מדריך לא נמצא</div>;

  return (
    <div className="singleInstructorPage" dir="rtl">
      <SinglePageHero
        image={instructor.image}
        backText="חזרה למדריכים"
        backTo="/instructors"
        variant="brand"
      >
        <div className="heroProfile">
          <div className="heroProfile__imageWrapper">
            <img
              src={instructor.image}
              alt={instructor.fullName}
              className="heroProfile__image"
            />
            <div className="heroProfile__badge"></div>
          </div>
          <div className="heroProfile__text">
            <h1>{instructor.fullName}</h1>
            <div className="heroProfile__meta">
              <span>
                <MapPin size={20} />
                {instructor.workArea}
              </span>
              <span>
                <Clock size={20} />
                {instructor.experienceYears} שנות ניסיון
              </span>
            </div>
          </div>
        </div>
      </SinglePageHero>

      <main className="singleInstructorMain">
        <div className="singleInstructorContainer">
          <div className="singleInstructorGrid">
            {/* RIGHT */}
            <InstructorInfoListCard items={instructor.certificates} />

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
