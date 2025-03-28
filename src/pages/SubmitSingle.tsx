import React, { useState } from 'react';

const SubmitSingle: React.FC = () => {
  const [title, setTitle] = useState('');
  const [artist, setArtist] = useState('');
  const [genre, setGenre] = useState('');
  const [releaseDate, setReleaseDate] = useState('');
  const [file, setFile] = useState<File | null>(null);
  const [artCover, setArtCover] = useState<File | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission logic here
    console.log({ title, artist, genre, releaseDate, file, artCover });
  };

  return (
    <div className="submit-single-page">
      <h1>Submit Single</h1>
      <div className="submit-single-container">
        <div className="form-section">
          <form onSubmit={handleSubmit} className="submit-single-form">
            <div className="form-group">
              <label htmlFor="title">Title</label>
              <input
                type="text"
                id="title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="artist">Artist</label>
              <input
                type="text"
                id="artist"
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
                value={releaseDate}
                onChange={(e) => setReleaseDate(e.target.value)}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="file">Upload File</label>
              <input
                type="file"
                id="file"
                onChange={(e) => setFile(e.target.files ? e.target.files[0] : null)}
                required
              />
            </div>
            <button type="submit" className="submit-button">Submit</button>
          </form>
        </div>
        <div className="art-cover-section">
          <label htmlFor="artCover">Upload Art Cover</label>
          <input
            type="file"
            id="artCover"
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
      </div>
    </div>
  );
};

export default SubmitSingle;
