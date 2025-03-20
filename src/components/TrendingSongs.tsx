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

  useEffect(() => {
    setTimeout(() => {
      setSections(data.sections);
    }, 2000);
  }, []);

  return (
    <div className="custom-scrollbar">
      <section className="trending-songs">
        {sections ? (
          sections.map((section, index) => (
            <div key={index}>
              <h2 className="section-title">{section.title}</h2>
              {section.songs && section.songs.length > 0 && (
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
                          <span className="play-icon" aria-hidden="true"></span>
                        </button>
                        <button className="like-button" aria-label="Like song">
                          <span className="like-icon" aria-hidden="true"></span>
                        </button>
                      </div>
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