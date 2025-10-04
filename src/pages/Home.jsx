import { motion } from "framer-motion";
import HeroSection from "../components/home/HeroSection";
import FeaturesGrid from "../components/home/FeaturesGrid";
import ProjectShowcase from "../components/home/ProjectShowcase";
import RecentPosts from "../components/home/RecentPosts";

const Home = () => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      <HeroSection />
      {/* Swapped: ProjectShowcase now comes before FeaturesGrid */}
      <ProjectShowcase />
      {/* New: Recent Posts Section */}
      <RecentPosts />
      {/* Swapped: FeaturesGrid (NEED HELP? GET IN TOUCH!) now at the bottom */}
      <FeaturesGrid />
    </motion.div>
  );
};

export default Home;
