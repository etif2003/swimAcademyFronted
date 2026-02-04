// import { Layout } from "./layout/Layout";
import "./App.css";
import CardsGrid from "./components/CardsGrid";
import CourseCard from "./components/courses/CourseCard";
import InstructorCard from "./components/Instructors/InstructorCard";
import Home from "./pages/Home";

function App() {

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
    // <>
    //   <Layout>
    //     <div>hello world!</div>
    //     <Home/>
       
    //     {/* <CardsGrid
    //       items={mockInstructors}
    //       emptyText="לא נמצאו מדריכים"
    //       renderItem={(instructor) => (
    //         <InstructorCard
    //           key={instructor._id}
    //           instructor={instructor}
    //         />
    //       )}
    //     /> */}
    //   </Layout>
    // </>
    <Home/>
  );
}

export default App;
