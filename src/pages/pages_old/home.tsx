import React from "react";
import { Helmet } from "react-helmet-async";
import SEO from "../utils/seo";
import Carousel from "../components/carousel";
import ScrollableCards from "../components/scrollablecards";
import MusicList from "../components/latestreleases";
import { useOutletContext } from "react-router-dom";

interface OutletContextType {
  setCurrentTrack: (track: {
    title: string;
    artist: string;
    url: string;
    art: string;
  }) => void;
}

const Home: React.FC = () => {
  const { setCurrentTrack } = useOutletContext<OutletContextType>(); // Correct type usage

  const playTrack = () => {
    setCurrentTrack({
      title: "Awesome Song",
      artist: "Cool Artist",
      url: "https://example.com/audio.mp3",
      art: "",
    });
  };

  return (
    <div className="main-style">
      <SEO
        title="Home | Katswiri"
        description="Learn more about My Awesome App!"
        image="images/logo.png"
      />

      <div className="home">
        <div className="home-holder">
          <p style={{ marginLeft: "10px", fontSize: "14px" }}></p>
          <Carousel title="" seeMoreText="" />
        </div>

        <div className="home-holder">
          <div className="line-content">
            <p style={{ marginLeft: "10px", fontSize: "14px" }}>
              Trending songs
            </p>
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
                  "https://scontent.fllw1-1.fna.fbcdn.net/v/t39.30808-6/481075228_122126900150607351_5385006977319173999_n.jpg",
                title: "Sexy",
                description: "Morale the rapper",
              },
              {
                id: 3,
                image: "https://picsum.photos/400/300",
                title: "Card 3",
                description: "This is the description for Card 3.",
              },
              {
                id: 4, // Unique ID
                image:
                  "https://www.malawi-music.com/images/albums/PHOTO-2018-07-24-10-52-31.jpg",
                title: "New Track",
                description: "Another Artist.",
              },
              {
                id: 5, // Unique ID
                image:
                  "https://scontent.fllw1-1.fna.fbcdn.net/v/t39.30808-6/481075228_122126900150607351_5385006977319173999_n.jpg",
                title: "New Song",
                description: "Morale the rapper",
              },
              {
                id: 6, // Unique ID
                image: "https://picsum.photos/400/300",
                title: "Card 6",
                description: "This is the description for Card 6.",
              },
            ]}
          />
        </div>
      </div>

      <div className="home">
        <div className="home-holder-bottom">
          <MusicList />
          <MusicList />
        </div>
      </div>
    </div>
  );
};

export default Home;
