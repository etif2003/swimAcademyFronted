import { useParams, Link } from "react-router-dom";
import SinglePageHero from "../components/SinglePage/SinglePageHero";
import SinglePageSummary from "../components/SinglePage/SinglePageSummary";
import ContactActionCard from "../components/SinglePage/ContactActionCard";

import "../styles/course/SingleCoursePage.css";

import { Building2, User, Tag, Users, BarChart3 } from "lucide-react";

import { useCourse } from "../hooks/useCourse";
import CourseCreatorCard from "../components/courses/CourseCreatorCard";

/* ===== PAGE ===== */
const TARGET_AUDIENCE_MAP = {
  Children: "ילדים",
  Teens: "נוער",
  Adults: "מבוגרים",
  Seniors: "גיל הזהב",
};

const LEVEL_MAP = {
  Beginner: "מתחילים",
  Advanced: "מתקדמים",
  Professional: "מקצועי",
};

const CATEGORY_MAP = {
  Learning: "למידה",
  Training: "הכשרה",
  Therapy: "טיפולי",
};

export default function SingleCoursePage() {
  const { id } = useParams();

  const { data: course, isLoading, isError } = useCourse(id);

  if (isLoading) return <div>...טוען קורס</div>;
  if (isError || !course) return <div>קורס לא נמצא</div>;

  const categoriesList = [
    {
      label: CATEGORY_MAP[course.category],
      icon: <Tag size={14} />,
    },
    {
      label: TARGET_AUDIENCE_MAP[course.targetAudience],
      icon: <Users size={14} />,
    },
    {
      label: LEVEL_MAP[course.level],
      icon: <BarChart3 size={14} />,
    },
  ].filter((item) => item.label);

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
              {course.createdBy && (
                <CourseCreatorCard
                  type={course.createdByModel}
                  id={course.createdBy._id}
                  name={
                    course.createdByModel === "School"
                      ? course.createdBy.name
                      : course.createdBy.fullName
                  }
                  image={
                    course.createdByModel === "School"
                      ? course.createdBy.logo
                      : course.createdBy.image
                  }
                  subtitle={
                    course.createdByModel === "Instructor"
                      ? course.createdBy.experienceYears
                        ? `${course.createdBy.experienceYears} שנות ניסיון`
                        : undefined
                      : course.createdBy.location?.city
                  }
                />
              )}
            </section>

            {/* LEFT */}
            <div className="singleCourseSide">
              <ContactActionCard type="course" price={course.price} />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
