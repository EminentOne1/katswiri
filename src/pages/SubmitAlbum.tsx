import React, { useState } from 'react';

const SubmitAlbum: React.FC = () => {
  const [albumTitle, setAlbumTitle] = useState('');
  const [artist, setArtist] = useState('');
  const [genre, setGenre] = useState('');
  const [releaseDate, setReleaseDate] = useState('');
  const [artCover, setArtCover] = useState<File | null>(null);
  const [songs, setSongs] = useState<{ title: string; file: File | null }[]>([]);

  const handleAddSong = () => {
    setSongs([...songs, { title: '', file: null }]);
  };

  const handleSongChange = (index: number, field: 'title' | 'file', value: string | File | null) => {
    const updatedSongs = [...songs];
    if (field === 'title') {
      updatedSongs[index].title = value as string;
    } else {
      updatedSongs[index].file = value as File | null;
    }
    setSongs(updatedSongs);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission logic here
    console.log({ albumTitle, artist, genre, releaseDate, artCover, songs });
  };

  return (
    <div className="submit-album-page">
      <h1>Submit Album</h1>
      <div className="submit-album-container">
      <div className="form-group">
            <label htmlFor="artCover">Upload Art Cover</label>
            <input
              type="file"
              id="artCover"
              placeholder='.'
              onChange={(e) => setArtCover(e.target.files ? e.target.files[0] : null)}
              required
            />
            {artCover && (
              <div className="art-cover-preview">
                <img
                  src={URL.createObjectURL(artCover)}
                  alt="Art Cover Preview"
                  className="art-cover-image"
                />
              </div>
            )}
          </div>
        <div className="album-details-section">
         
          <form onSubmit={handleSubmit} className="submit-album-form">
            <div className="form-group">
              <label htmlFor="albumTitle">Album Title</label>
              <input
                type="text"
                id="albumTitle"
                placeholder="Enter album title"
                value={albumTitle}
                onChange={(e) => setAlbumTitle(e.target.value)}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="artist">Artist</label>
              <input
                type="text"
                id="artist"
                placeholder="Enter artist name"
                value={artist}
                onChange={(e) => setArtist(e.target.value)}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="genre">Genre</label>
              <input
                type="text"
                id="genre"
                placeholder="Enter genre"
                value={genre}
                onChange={(e) => setGenre(e.target.value)}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="releaseDate">Release Date</label>
              <input
                type="date"
                id="releaseDate"
                placeholder="dd/mm/yyyy"
                value={releaseDate}
                onChange={(e) => setReleaseDate(e.target.value)}
                required
              />
            </div>
            <button type="submit" className="submit-button">Submit Album</button>
          </form>
        </div>
        <div className="songs-section">
          <h2>Songs</h2>
          <div className="songs-list">
            {songs.map((song, index) => (
              <div key={index} className="song-item">
                <input
                  type="text"
                  placeholder="Song Title"
                  value={song.title}
                  onChange={(e) => handleSongChange(index, 'title', e.target.value)}
                  required
                />
                <input
                  type="file"
                  onChange={(e) => handleSongChange(index, 'file', e.target.files ? e.target.files[0] : null)}
                  required
                />
              </div>
            ))}
          </div>
         
        </div>
        <button type="button" className="add-song-button" onClick={handleAddSong}>
            + Add Song
          </button>
      </div>
      
    </div>
  );
};

export default SubmitAlbum;
