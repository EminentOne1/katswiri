import React, { useState, useEffect } from "react";

const MusicPlayer: React.FC = (track: any) => {
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [progress, setProgress] = useState<number>(0);
  const [isMaximized, setIsMaximized] = useState<boolean>(false);

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isPlaying) {
      interval = setInterval(() => {
        setProgress((prev) => (prev >= 100 ? 0 : prev + 1));
      }, 100);
    } else {
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [isPlaying]);

  const togglePlay = () => {
    setIsPlaying((prev) => !prev);
  };

  const toggleMaximize = () => {
    setIsMaximized((prev) => !prev);
  };

  const radius = 20;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (progress / 100) * circumference;

  return (
    <>
      <div className="music-player">
        {}
        <div className="section song-info">
          <div className="song-cover">
            <img
              src="https://scontent.fllw1-1.fna.fbcdn.net/v/t39.30808-6/480383234_1167836138033091_2006026388316223725_n.jpg?_nc_cat=111&ccb=1-7&_nc_sid=833d8c&_nc_eui2=AeGTnT4g0sBcowAJKOOGUq5OkEa6yOQ6nb2QRrrI5DqdvWOjFRbw8l4Q1W4RbnsWaG36YgXdSEGp7nHaS65PR63B&_nc_ohc=gOggyBeiVqMQ7kNvgEsF8iC&_nc_oc=AdhhZGzKYb2IwnxauHUPCOvG0gHycnqH2ohlyQxk5ChspPY9myMeI-v1YBMJx63FHN8&_nc_zt=23&_nc_ht=scontent.fllw1-1.fna&_nc_gid=SDwoGzVAh3PgUPy8JjPbgA&oh=00_AYHfg2oWuP2WQtSB6ZBlvR9Bsrc7BWjnXadkArpKBiOnVw&oe=67DEFD7A"
              alt="Song Cover"
            />
          </div>
          <div className="song-details">
            <span className="song-title">Song Title</span>
            <span className="artist-name">Artist Name</span>
          </div>
        </div>

        {}
        <div className="section play-control">
          <div className="play-button-wrapper" onClick={togglePlay}>
            <svg className="progress-circle" width="50" height="50">
              <circle
                cx="25"
                cy="25"
                r={radius}
                stroke="#D9D9D9"
                fill="transparent"
                strokeWidth="2"
              />
              <circle
                cx="25"
                cy="25"
                r={radius}
                stroke="#3ED876"
                fill="transparent"
                strokeWidth="3"
                strokeDasharray={circumference}
                strokeDashoffset={offset}
                strokeLinecap="round"
              />
            </svg>
            <button className="play-button">
              <img src="/images/play.svg" width="30px" />
            </button>
          </div>
        </div>

        <div className="section volume-control">
          <span className="volume-icon">
            <img src="images/audio.svg" />
          </span>
          <input
            type="range"
            min="0"
            max="100"
            defaultValue="5"
            className="volume-slider"
          />
          <button className="maximize-button" onClick={toggleMaximize}>
            {isMaximized ? "Minimize" : "Maximize"}
          </button>
        </div>
      </div>

      {isMaximized && (
        <div className="maximized-overlay" onClick={toggleMaximize}>
          <div
            className="maximized-content"
            onClick={(e: React.MouseEvent<HTMLDivElement>) =>
              e.stopPropagation()
            }
          >
            <img
              src="song-cover.jpg"
              alt="Song Art"
              className="maximized-art"
            />
            <button className="close-maximize" onClick={toggleMaximize}>
              &times;
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default MusicPlayer;
