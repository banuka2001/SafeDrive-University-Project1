import React from "react";
import HeroSection from "./heroSection";
import MainSection from "./MainSection";
import Ratings from "../../components/Ratings";

const Home = (props) => {
  const { ratings } = props;
  return (
    <div>
      <HeroSection />
      <MainSection />
      <Ratings ratings={ratings} />
    </div>
  );
};

export default Home; 