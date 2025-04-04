import '@ant-design/v5-patch-for-react-19';
import React, { useEffect, useState } from "react";
import axios from "axios";
import { Spin } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import { Upload ,notification} from "antd";
import NotificationWrapper from "../components/NotificationWrapper";

const SubmitSingle: React.FC = () => {
  const [title, setTitle] = useState("");
  const [artist, setArtist] = useState("");
  const [genre, setGenre] = useState("");
  const [releaseDate, setReleaseDate] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const [artCover, setArtCover] = useState<File | null>(null);
  const [errorMessage, setErrorMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
   
    if (errorMessage) {
      setIsLoading(false);
    }
  }, [errorMessage]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

   
    if (!file || !artCover) {
      setErrorMessage("Please upload both the music file and the art cover.");
      return;
    }

    setErrorMessage(""); 
    setIsLoading(true); 

    const formData = new FormData();
    formData.append("title", title);
    formData.append("artist", artist);
    formData.append("genre", genre);
    formData.append("releaseDate", releaseDate);
    formData.append("file", file);
    formData.append("artCover", artCover);
    formData.append("type", "single");

    try {
      const response = await axios.post("/api/v1/songs/single", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      setIsLoading(false);
    NotificationWrapper.success("Single submitted successfully");
      console.log(response.data);
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        setErrorMessage(
          `Failed to submit the single. Server responded with: ${
            error.response.data.message || "Internal Server Error"
          }`
        );
      } else {
        setErrorMessage("Failed to submit the single. Please try again.");
      }
      console.error(error);
    }
  };

  return (
    <div className="submit-single-page">
      <h1>Submit Single</h1>
      {errorMessage && <p className="error-message">{errorMessage}</p>}
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
              <label htmlFor="file">Upload Song</label>
              <Upload
                accept="audio/*"

                
                beforeUpload={(file) => {
                  setFile(file);
                  return false; // Prevent automatic upload
                }}
                showUploadList={true}
                defaultFileList={file ? [{ uid: '-1', name: file.name, status: 'done' }] : []}
                onRemove={() => {
                  setFile(null);
                }}
              >
                <div className="upload-icon">
                  <UploadOutlined style={{ fontSize: '24px', cursor: 'pointer' }} />
                </div>
              </Upload>
              {file && (
                <div className="song-preview">
                  <audio controls>
                    <source src={URL.createObjectURL(file)} type="audio/mpeg" />
                    Your browser does not support the audio element.
                  </audio>
                </div>
              )}
            </div>
          
          </form>
        </div>
        <div className="art-cover-section">
        <label htmlFor="artCover">Upload Art Cover</label>
          <Upload
            accept="image/*"
            listType="picture-circle"
            beforeUpload={(file) => {
              setArtCover(file);
              return false; // Prevent automatic upload
            }}
            showUploadList={true}
            defaultFileList={artCover ? [{ uid: '-1', name: artCover.name, status: 'done', url: URL.createObjectURL(artCover) }] : []}
            onRemove={() => {
              setArtCover(null);
            }}
          >
            {!artCover && (
              <div className="upload-icon">
                <UploadOutlined style={{ fontSize: '24px', cursor: 'pointer' }} />
              </div>
            )}
          </Upload>
          {isLoading ? (
              <div className="spinner-container">
                <Spin size="large" />
              </div>
            ) : (
              <button onClick={handleSubmit} className="submit-button">
                Submit
              </button>
            )}
        </div>
      </div>
    </div>
  );
};

export default SubmitSingle;
