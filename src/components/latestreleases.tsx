import React from "react";
import Divider from "./divider";

const songs = [
  { id: 1, listens: "10k", liked: true },
  { id: 2, listens: "10k", liked: false },
  { id: 3, listens: "10k", liked: false },
  { id: 4, listens: "10k", liked: true },
  { id: 5, listens: "10k", liked: false },
  { id: 6, listens: "10k", liked: true },
];

const MusicCard = ({ song }) => {
  return (
    <div className="music-card">
      <img
        src="https://austinfranklinmusic.com/wp-content/uploads/2020/01/mountaindawn.jpg"
        alt="Music"
        className="music-image"
      />
      <Divider/>
      <div className="music-info">
        <div style={{ display: "flex", flexDirection :"column" }}>
            <span>dave ft burna boy</span>
          <div style={{ display: "flex", flexDirection : "row" }}>
            <img src="/images/headphones.svg" className="icon" />
            <span>{song.listens}</span>
          </div>
        </div>
      </div>
      <img
        src="/images/play.svg"
        className={`heart-icon ${song.liked ? "liked" : ""}`}
      />
      <img
        src="/images/likes.svg"
        className={`heart-icon ${song.liked ? "liked" : ""}`}
      />
    </div>
  );
};

const MusicList = () => {
  return (
    <div className="music-list">
      <div className="list-container">
        {songs.map((song) => (
          <MusicCard key={song.id} song={song} />
        ))}
      </div>
    </div>
  );
};

export default MusicList;
