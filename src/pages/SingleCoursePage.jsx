import { useParams, Link } from "react-router-dom";
import SinglePageHero from "../components/SinglePage/SinglePageHero";
import SinglePageSummary from "../components/SinglePage/SinglePageSummary";
import ContactActionCard from "../components/SinglePage/ContactActionCard";

import "../styles/course/SingleCoursePage.css";

import { Building2, User } from "lucide-react";
import { useCourse } from "../hooks/useCourse";

/* ===== PAGE ===== */

export default function SingleCoursePage() {
  const { id } = useParams();

  const { data: course, isLoading, isError } = useCourse(id);

  if (isLoading) return <div>טוען קורס...</div>;
  if (isError || !course) return <div>קורס לא נמצא</div>;

  const categoriesList = [
    course.category,
    course.targetAudience,
    course.level,
  ].filter(Boolean);

  return (
    <div dir="rtl" className="singleCoursePage">
      
      {/* HERO */}
      <SinglePageHero
        image={course.image}
        backText="חזרה לקורסים"
        backTo="/courses"
      />

      <main className="singleCourseMain">
        <div className="singleCourseContainer">
          <div className="singleCourseGrid">

            {/* RIGHT */}
            <section className="singleCourseBody">
              <SinglePageSummary
                type="Course"
                name={course.title}
                description={course.description}
                poolName={course.location?.poolName}
                city={course.location?.city}
                categoriesList={categoriesList}
              />

              {/* ===== יוצר הקורס ===== */}
              {course.createdBy && (
                <div className="courseSchoolCard">

                  {/* אם זה בית ספר */}
                  {course.createdByModel === "School" && (
                    <Link
                      to={`/school/${course.createdBy._id}`}
                      className="courseSchoolLink"
                    >
                      <div className="courseSchoolInfo">
                        <Building2 size={18} />
                        <span>בית הספר</span>
                      </div>

                      <div className="courseSchoolMeta">
                        <img
                          src={course.createdBy.logo}
                          alt={course.createdBy.name}
                        />
                        <div>
                          <strong>{course.createdBy.name}</strong>
                        </div>
                      </div>
                    </Link>
                  )}

                  {/* אם זה מדריך */}
                  {course.createdByModel === "Instructor" && (
                    <Link
                      to={`/instructor/${course.createdBy._id}`}
                      className="courseSchoolLink"
                    >
                      <div className="courseSchoolInfo">
                        <User size={18} />
                        <span>מדריך הקורס</span>
                      </div>

                      <div className="courseSchoolMeta">
                        <img
                          src={course.createdBy.image}
                          alt={course.createdBy.fullName}
                        />
                        <div>
                          <strong>{course.createdBy.fullName}</strong>
                        </div>
                      </div>
                    </Link>
                  )}

                </div>
              )}

            </section>

            {/* LEFT */}
            <div className="singleCourseSide">
              <ContactActionCard
                type="course"
                price={course.price}
              />
            </div>

          </div>
        </div>
      </main>
    </div>
  );
}
