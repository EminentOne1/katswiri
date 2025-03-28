import React, { useRef, useState } from 'react';
import { useParams } from 'react-router-dom';

interface Song {
  id: number;
  title: string;
  image?: string;
  plays: string;
  genre: string;
}

const SongPreview: React.FC = () => {
  const { id } = useParams<{ id: string }>();

  // Mock data for demonstration (replace with API call or state management)
  const songs: Song[] = [
    { id: 1, title: 'Lost in the Stars', image: 'https://placehold.co/600x400', plays: '1.2M', genre: 'Pop' },
    { id: 2, title: 'Midnight Groove', image: 'https://placehold.co/600x400', plays: '980K', genre: 'Jazz' },
    { id: 3, title: 'Neon Lights', image: 'https://placehold.co/600x400', plays: '750K', genre: 'Electronic' },
  ];

  const song = songs.find((song) => song.id === parseInt(id || '', 10));

  if (!song) {
    return <div>Song not found</div>;
  }

  // Custom player state and refs
  const audioRef = useRef<HTMLAudioElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);

  const togglePlay = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const handleTimeUpdate = () => {
    if (audioRef.current) {
      setCurrentTime(audioRef.current.currentTime);
    }
  };

  const handleLoadedMetadata = () => {
    if (audioRef.current) {
      setDuration(audioRef.current.duration);
    }
  };

  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (audioRef.current) {
      audioRef.current.currentTime = parseFloat(e.target.value);
      setCurrentTime(audioRef.current.currentTime);
    }
  };

  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
  };

  return (
    <div className="song-preview">
        
      <h1>{song.title}</h1>
      {song.image && <img src={song.image} alt={song.title} />}
      <p>Plays: {song.plays}</p>
      <p>Genre: {song.genre}</p>

   
      <div className="audio-player">
        <audio
          ref={audioRef}
          src={`/songs/${song.id}.mp3`}
          onTimeUpdate={handleTimeUpdate}
          onLoadedMetadata={handleLoadedMetadata}
        ></audio>
        <button onClick={togglePlay} className="play-button">
          {isPlaying ? 'Pause' : 'Play'}
        </button>
        <input
          type="range"
          min="0"
          max={duration.toString()}
          value={currentTime.toString()}
          onChange={handleSeek}
          className="seek-bar"
        />
        <div className="time-info">
          <span>{formatTime(currentTime)}</span> / <span>{formatTime(duration)}</span>
        </div>
      </div>
    </div>
  );
};

export default SongPreview;