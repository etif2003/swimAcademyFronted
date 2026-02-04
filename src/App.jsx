import { Layout } from "../layout/Layout";
import "./App.css";
import CardsGrid from "./components/CardsGrid";
import CourseCard from "./components/courses/CourseCard";
import InstructorCard from "./components/Instructors/InstructorCard";
import Home from "./pages/Home";

function App() {
  // const mockCourses = [
  //   {
  //     _id: "1",
  //     title: "שחייה למתחילים – ילדים",
  //     price: 150,
  //     level: "Beginner",
  //     targetAudience: "Children",
  //     image: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=800&q=80",
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

  const mockInstructors = [
    {
      _id: "i1",
      fullName: "יוסי אברהם",
      workArea: "חיפה",
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
  ];



  return (
    <>
      <Layout>
        <div>hello world!</div>
        <Home/>
       
        {/* <CardsGrid
          items={mockInstructors}
          emptyText="לא נמצאו מדריכים"
          renderItem={(instructor) => (
            <InstructorCard
              key={instructor._id}
              instructor={instructor}
            />
          )}
        /> */}
      </Layout>
    </>
  );
}

export default App;
