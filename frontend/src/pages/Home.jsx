import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import HeroSection from "../components/HeroSection";
import MainSection from "../components/MainSection";
import Ratings from "../components/Ratings";

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