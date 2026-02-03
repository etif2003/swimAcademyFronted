import { Layout } from "../layout/Layout";
import "./App.css";
import CourseCard from "./components/courses/CourseCard";

function App() {
  // const mockCourses = [
  //   {
  //     _id: "1",
  //     title: "שחייה למתחילים – ילדים",
  //     price: 150,
  //     level: "Beginner",
  //     targetAudience: "Children",
  //     image: "https://images.unsplash.com/photo-1518611012118-f0c5bde76d15",
  //     maxParticipants: 6,
  //     sessionsCount: 8,
  //     location: {
  //       city: "תל אביב",
  //     },
  //   },
  //   {
  //     _id: "2",
  //     title: "שחייה טיפולית למבוגרים",
  //     price: 180,
  //     level: "Advanced",
  //     targetAudience: "Adults",
  //     image: "https://images.unsplash.com/photo-1502904550040-7534597429ae",
  //     maxParticipants: 4,
  //     sessionsCount: 10,
  //     location: {
  //       city: "רמת גן",
  //     },
  //   },
  // ];

  return (
    <>
      <Layout>
        <div>hello world!</div>

        {/* <div className="grid">
          {mockCourses.map((course) => (
            <CourseCard key={course._id} course={course} />
          ))}
        </div> */}
      </Layout>
    </>
  );
}

export default App;
