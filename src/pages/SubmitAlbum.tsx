import '@ant-design/v5-patch-for-react-19';
import React, { useState } from "react";
import { Upload, Button, Spin } from "antd";
import { CloseCircleFilled, UploadOutlined } from "@ant-design/icons";
import NotificationWrapper from "../components/NotificationWrapper";
import axios from "axios";

const SubmitAlbum: React.FC = () => {
  const [albumTitle, setAlbumTitle] = useState("");
  const [artist, setArtist] = useState("");
  const [genre, setGenre] = useState("");
  const [releaseDate, setReleaseDate] = useState("");
  const [artCover, setArtCover] = useState<File | null>(null);
  const [songs, setSongs] = useState<{ title: string; file: File | null }[]>(
    []
  );
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const handleAddSong = () => {
    setSongs([...songs, { title: "", file: null }]);
  };

  const handleSongChange = (
    index: number,
    field: "title" | "file",
    value: string | File | null
  ) => {
    const updatedSongs = [...songs];
    if (field === "title") {
      updatedSongs[index].title = value as string;
    } else {
      updatedSongs[index].file = value as File | null;
    }
    setSongs(updatedSongs);
  };

  const handleRemoveSong = (index: number) => {
    setSongs((prevSongs) => prevSongs.filter((_, i) => i !== index));
  };
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
  
    if (!albumTitle || !artist || !genre || !releaseDate || !artCover) {
      setErrorMessage("Please fill all required fields, including album art cover.");
      return;
    }

    if (songs.length === 0) {
      setErrorMessage("Please add at least one song.");
      return;
    }
  
    const formData = new FormData();
    formData.append("albumTitle", albumTitle);
    formData.append("artist", artist);
    formData.append("genre", genre);
    formData.append("releaseDate", releaseDate);
  
    if (artCover) {
      formData.append("artCover", artCover);
    }
  
   
    formData.append("songs", JSON.stringify(songs.map(song => ({
      title: song.title,
      file: song.file 
    }))));
  
    songs.forEach((song) => {
      if (song.file) {
        formData.append("songFiles", song.file);
      }
    });
  
    try {
      setIsLoading(true);
      setErrorMessage("");
  
      const response = await axios.post("/api/v1/songs/album", formData);
  
      if (response.status === 200) {
        NotificationWrapper.success("Album submitted successfully");
        console.log("Album submitted successfully");
      } else {
        throw new Error("Failed to submit album.");
      }
    } catch (error) {
      setErrorMessage("Failed to submit the album. Please try again.");
      NotificationWrapper.error("Failed to submit the album. Please try again.");
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };
  
  
  return (
    <div className="submit-album-page">
      <h1>Submit Album</h1>
      {errorMessage && <p className="error-message">{errorMessage}</p>}

      <div className="submit-album-container">
        <div className="form-group">
          <label htmlFor="artCover">Upload Art Cover</label>
          <Upload
            accept="image/*"
            listType="picture-circle"
            beforeUpload={(file) => {
              setArtCover(file);
              return false; // Prevent automatic upload
            }}
            showUploadList={true}
            defaultFileList={
              artCover
                ? [
                    {
                      uid: "-1",
                      name: artCover.name,
                      status: "done",
                      url: URL.createObjectURL(artCover),
                    },
                  ]
                : []
            }
            onRemove={() => {
              setArtCover(null);
            }}
          >
            <div className="upload-icon">
              <UploadOutlined style={{ fontSize: "24px", cursor: "pointer" }} />
            </div>
          </Upload>

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
            <label htmlFor="releaseDate">Release Date ( 3 days before release )</label>
            <input
              type="date"
              id="releaseDate"
              value={releaseDate}
              onChange={(e) => setReleaseDate(e.target.value)}
              required
            />
          </div>

          <button
            type="button"
            className="add-song-button"
            onClick={handleAddSong}
          >
            + Add a song
          </button>

          {isLoading ? (
            <div className="spinner-container">
              <Spin size="large" />
            </div>
          ) : (
            <button type="submit" className="submit-button">
              Submit Album
            </button>
          )}
        </form>
        <div className="songs-section">
          <h3>Songs</h3>
          {songs.map((song, index) => (
            <div key={index} className="song-item">
              

              <div className="form-group" style={{padding:"10px",border:"1px solid black",borderRadius:"10px"}}>
              <div className="form-group-fields">
              
              <input
                type="text"
                id={`songTitle${index}`}
                placeholder="Song Title"
                value={song.title}
                onChange={(e) =>
                  handleSongChange(index, "title", e.target.value)
                }
                required
              />
              <button
                type="button"
                className="remove-song-button"
                onClick={() => handleRemoveSong(index)}
              >
                <CloseCircleFilled />
              </button>
            </div>
                <label htmlFor={`songFile${index}`}></label>
                <Upload
                  accept="audio/*"
                  beforeUpload={(file) => {
                    handleSongChange(index, "file", file);
                    return false;
                  }}
                  showUploadList={true}
                  defaultFileList={
                    song.file
                      ? [{ uid: "-1", name: song.file.name, status: "done" }]
                      : []
                  }
                  onRemove={() => handleSongChange(index, "file", null)}
                >
                  <div className="upload-icon">
                    <UploadOutlined
                      style={{ fontSize: "24px", cursor: "pointer" }}
                    />
                  </div>
                </Upload>
                {song.file && (
                  <audio controls>
                    <source
                      src={URL.createObjectURL(song.file)}
                      type="audio/mpeg"
                    />
                    Your browser does not support the audio element.
                  </audio>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SubmitAlbum;
