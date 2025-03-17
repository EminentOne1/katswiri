import React from "react";
import { Helmet } from "react-helmet-async";
import SEO from "../utils/seo";
import Carousel from "../components/carousel";
import ScrollableCards from "../components/scrollablecards";
import MusicList from "../components/latestreleases";
const Home = () => {
  return (
    <div className="main-style">
      <SEO
        title="Home | katswiri"
        description="Learn more about My Awesome App!"
        image="images/logo.png"
      />
      <div className="home">
        <div className="home-holder">
          <p>Events</p>
          <Carousel title={""} seeMoreText={""} />
        </div>
        <div className="home-holder">
          <div className="line-content">
            <p style={{ marginLeft: "10px" }}>Trending songs</p>{" "}
            <span className="line"></span>
            <p style={{ fontSize: "11px" }}>see more</p>
          </div>
          <ScrollableCards
            cards={[
              {
                id: 1,
                image: "https://picsum.photos/400/300",
                title: "Card 1",
                description: "This is the description for Card 1.",
              },
              {
                id: 2,
                image: "https://picsum.photos/400/300",
                title: "Card 2",
                description: "This is the description for Card 2.",
              },
              {
                id: 3,
                image: "https://picsum.photos/400/300",
                title: "Card 3",
                description: "This is the description for Card 3.",
              },
            ]}
          />
        </div>
      </div>
      <div className="home">
        <div className="home-holder">
          <div className="line-content">
            <p style={{ marginLeft: "10px" }}>Latest releases</p>{" "}
            <span style={{width:"380px"}} className="line"></span>
            <p style={{ fontSize: "11px" }}>see all</p>
          </div>
          <MusicList />
        </div>
      </div>
    </div>
  );
};

export default Home;
