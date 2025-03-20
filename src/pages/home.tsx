import React from "react";
import FeaturedCards from "../components/FeaturedCards";
import TrendingSongs from "../components/TrendingSongs";
import NowPlaying from "../components/NowPlaying";

const HomePage: React.FC = () => {
  return (
    <div className="main-content">
      <NowPlaying />
      <FeaturedCards />
      <TrendingSongs />
    </div>
  );
};

export default HomePage;
