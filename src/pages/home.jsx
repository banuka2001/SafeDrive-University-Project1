import React from "react";
import HeroSection from "../components/heroSection"; // Adjust path as needed
import MainSection from "../components/MainSection";
import Ratings from "../components/Ratings/Ratings"; // Import the Ratings component

const Home = () => {
  return (
    <div>
      <HeroSection />
      <MainSection />
      <Ratings />
    </div>
  );
};

export default Home;
