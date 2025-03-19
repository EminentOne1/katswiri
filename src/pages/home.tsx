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
          <p style={{ marginLeft: "10px", fontSize: "14px" }}></p>
          <Carousel title={""} seeMoreText={""} />
        </div>
        <div className="home-holder">
          <div className="line-content">
            <p style={{ marginLeft: "10px", fontSize: "14px" }}>
              Trending songs
            </p>{" "}
            <span style={{ width: "70%" }} className="line"></span>
            <p style={{ fontSize: "11px" }}>see more</p>
          </div>
          <ScrollableCards
            cards={[
              {
                id: 1,
                image:
                  "https://www.malawi-music.com/images/albums/PHOTO-2018-07-24-10-52-31.jpg",
                title: "No campaign",
                description: "Dali mw.",
              },
              {
                id: 2,
                image:
                  "https://scontent.fllw1-1.fna.fbcdn.net/v/t39.30808-6/481075228_122126900150607351_5385006977319173999_n.jpg?_nc_cat=108&ccb=1-7&_nc_sid=833d8c&_nc_eui2=AeGKRNnm8PR2CECkNA0ZQbBvIDczJKfplU8gNzMkp-mVT9JucWfubDoKYw3BY9wCJM0oRPoOs9_H36JTqXPZ-Ptm&_nc_ohc=WaW01oH5_JcQ7kNvgE_UAGn&_nc_oc=Adgy3K590DhIgOeCgoBF-SykZciFY4qVQahl9JY34mWl7iFMzJva4ylz0xghKjsMGzo&_nc_zt=23&_nc_ht=scontent.fllw1-1.fna&_nc_gid=nkeGwnQ4xvxRGbrAgY7Agg&oh=00_AYGim-kA6MeXRbMfVUUsMkpdIOabb1_hKu_sZQjkus56lA&oe=67DF1DC1",
                title: "Sexy",
                description: "Morale the rapper ",
              },
              {
                id: 3,
                image: "https://picsum.photos/400/300",
                title: "Card 3",
                description: "This is the description for Card 3.",
              },
              {
                id: 1,
                image:
                  "https://www.malawi-music.com/images/albums/PHOTO-2018-07-24-10-52-31.jpg",
                title: "No campaign",
                description: "Dali mw.",
              },
              {
                id: 2,
                image:
                  "https://scontent.fllw1-1.fna.fbcdn.net/v/t39.30808-6/481075228_122126900150607351_5385006977319173999_n.jpg?_nc_cat=108&ccb=1-7&_nc_sid=833d8c&_nc_eui2=AeGKRNnm8PR2CECkNA0ZQbBvIDczJKfplU8gNzMkp-mVT9JucWfubDoKYw3BY9wCJM0oRPoOs9_H36JTqXPZ-Ptm&_nc_ohc=WaW01oH5_JcQ7kNvgE_UAGn&_nc_oc=Adgy3K590DhIgOeCgoBF-SykZciFY4qVQahl9JY34mWl7iFMzJva4ylz0xghKjsMGzo&_nc_zt=23&_nc_ht=scontent.fllw1-1.fna&_nc_gid=nkeGwnQ4xvxRGbrAgY7Agg&oh=00_AYGim-kA6MeXRbMfVUUsMkpdIOabb1_hKu_sZQjkus56lA&oe=67DF1DC1",
                title: "Sexy",
                description: "Morale the rapper ",
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
            <p style={{ marginLeft: "10px", fontSize: "12px" }}>
              Latest releases
            </p>{" "}
            <span style={{ width: "380px" }} className="line"></span>
            <p style={{ fontSize: "11px" }}>see all</p>
          </div>
          <MusicList />
        </div>
      </div>
    </div>
  );
};

export default Home;
