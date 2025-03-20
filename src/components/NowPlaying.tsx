import React from 'react';

const NowPlaying: React.FC = () => {
  return (
    <div className="now-playing">
      <img src="https://cdn.builder.io/api/v1/image/assets/TEMP/c9f3cfebff71feba5ea1b407f2a363e0ed80f8dd" alt="Song" className="song-image" />
      <div className="song-details">
        <h3 className="song-title">Song Title</h3>
        <p className="artist-name">Artist Name</p>
      </div>
      <button className="play-button" aria-label="Play or pause song">
        <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path fillRule="evenodd" clipRule="evenodd" d="M18.75 10C18.751 10.4316 18.5257 10.8322 18.1562 11.0555L6.9 17.9414C6.51356 18.178 6.02931 18.187 5.63438 17.9648C5.24323 17.7461 5.00065 17.3333 5 16.8852V3.11484C5.00065 2.66671 5.24323 2.25385 5.63438 2.03516C6.02931 1.81299 6.51356 1.82196 6.9 2.05859L18.1562 8.94453C18.5257 9.16776 18.751 9.56835 18.75 10V10Z" fill="black"/>
        </svg>
      </button>
    </div>
  );
};

export default NowPlaying;