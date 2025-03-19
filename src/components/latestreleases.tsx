import React, { useEffect, useState } from "react";
import Divider from "./divider";
interface songinterface {
  id: number;
  listens: string;
  liked: boolean;
}
const initialSongs: songinterface[] = [
  { id: 1, listens: "10k", liked: true },
  { id: 2, listens: "10k", liked: false },
  { id: 3, listens: "10k", liked: false },
  { id: 4, listens: "10k", liked: true },
  { id: 5, listens: "10k", liked: false },
  { id: 6, listens: "10k", liked: true },
];

const MusicCard: React.FC<songinterface> = ({listens,liked,id}) => {

  return (
 
     
      <div className="music-card">
        <img
          src="https://austinfranklinmusic.com/wp-content/uploads/2020/01/mountaindawn.jpg"
          alt="Music"
          className="music-image"
        />
        <Divider />

        <div className="music-info">
          <div style={{ display: "flex", flexDirection: "column" }}>
            <span>dave ft burna boy</span>
            <div style={{ display: "flex", flexDirection: "row" }}>
              <img src="/images/headphones.svg" className="icon" />
              <span>{listens}</span>
            </div>
          </div>
        </div>
        <img
          src="/images/play.svg"
          className={`heart-icon ${liked ? "liked" : ""}`}
        />
        <img
          src="/images/likes.svg"
          className={`heart-icon ${liked ? "liked" : ""}`}
        />
      </div>

  );
};

const MusicList = () => {
  const [songs, setSongs] = useState<songinterface[]>();
  useEffect(() => {
    setSongs(initialSongs);
  }, []);
  return (
    <div className="music-list">
      <div className="list-container">
        {songs?.map((song : songinterface) => (
          <MusicCard key={song.id} id={song.id} listens={song.listens} liked={song.liked}  />
        ))}
      </div>
    </div>
  );
};

export default MusicList;
