import React, { useState, useEffect } from 'react';
import data from '../utils/data.json'; // Assuming data is in src/data.json

interface Song {
  image?: string;
  title: string;
  plays: string;
  genre: string;
}

interface Socials {
  instagram: string;
  twitter: string;
}

interface Artist {
  name: string;
  image: string;
  bio: string;
  socials: Socials;
}

interface Section {
  title: string;
  type: string;
  songs?: Song[];
  artists?: Artist[];
  mixes?: string[];
}

const TrendingSongs: React.FC = () => {
  const [sections, setSections] = useState<Section[] | null>(null);
  const [width, setWidth] = useState(window.innerWidth || 0);

  useEffect(() => {
    window.addEventListener("resize", (e: any) => {

      setWidth(e.target.innerWidth);


    });
  }, []);
  useEffect(() => {
    window.removeEventListener("resize", (e: any) => { })
  }, [width])
  useEffect(() => {
    setTimeout(() => {
      setSections(data.sections); // Dynamically set sections data
    }, 2000);
  }, []);

  return (
    <div className="custom-scrollbar">
      <section className="trending-songs">
        {sections ? (
          sections.map((section, index) => (
            <div key={index} className="section">
              <h2 className="section-title">{section.title}</h2>

              {/* Dynamic rendering based on section type */}
              {section.type === 'songs' && section.songs && section.songs.length > 0 && (
                <div className="song-list">
                  {section.songs.map((song, idx) => (
                    <div key={idx} className="song-item">
                      {song.image && <img src={song.image} alt={song.title} className="song-image" />}
                      <div className="song-info">
                        <h3 className="song-title">{song.title}</h3>
                        <p className="song-plays">{song.plays}</p>
                      </div>
                      <div className="song-actions">
                        <button className="play-button" aria-label="Play song">
                          <img src={"images/play.svg"} alt="play icon" aria-hidden="true" width={15} />
                        </button>
                        <button className="like-button" aria-label="Like song">
                          <img src={"images/likes.svg"} alt="like icon" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {section.type === 'artists' && section.artists && section.artists.length > 0 && (
                <div className="artist-list" style={{ width: width - 100 }}>
                  {section.artists.map((artist, idx) => (
                    <div key={idx} className="artist-item">
                      <img src={artist.image} alt={artist.name} className="artist-image" />
                      <div className="artist-info">
                        <h3 className="artist-name">{artist.name}</h3>

                      </div>
                    </div>
                  ))}
                </div>
              )}

              {section.type === 'mixes' && section.mixes && section.mixes.length > 0 && (
                <div className="mix-list">
                  {section.mixes.map((mix, idx) => (
                    <div key={idx} className="mix-item">
                      <p>{mix}</p>
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))
        ) : (
          <ShimmerEffect />
        )}
      </section>
    </div>
  );
};

const ShimmerEffect = () => (
  <div className="shimmer-wrapper">
    {Array(3)
      .fill(0)
      .map((_, index) => (
        <div key={index} className="shimmer-section">
          <div className="shimmer-title"></div>
          <div className="shimmer-list">
            {Array(5)
              .fill(0)
              .map((_, idx) => (
                <div key={idx} className="shimmer-item">
                  <div className="shimmer-image"></div>
                  <div className="shimmer-text"></div>
                  <div className="shimmer-text small"></div>
                </div>
              ))}
          </div>
        </div>
      ))}
  </div>
);

export default TrendingSongs;
