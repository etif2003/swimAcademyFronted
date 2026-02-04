import { CTASection } from "../components/HOME/CTASection";
import { FeaturedCoursesSection } from "../components/HOME/FeaturedCoursesSection";
import { FeaturedInstructorsSection } from "../components/HOME/FeaturedInstructorsSection";
import { FeaturesSection } from "../components/HOME/FeaturesSection";
import { HeroSection } from "../components/home/HeroSection";

const Home = () => {
  return (
    <>
      <HeroSection />
      <FeaturesSection/>
      <FeaturedCoursesSection/>
      <FeaturedInstructorsSection/>
      <CTASection/>
    </>
  );
};


export default Home;