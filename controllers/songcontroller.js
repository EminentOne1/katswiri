import { fileURLToPath } from "url";
import { dirname } from "path";
import axios from "axios";
import { supabase } from "../supabase.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const logSupabaseError = (error, context) => {
  if (error) {
    console.error(`Supabase Error in ${context}:`, error);
  }
};

export const SongController = {
  getAllSongs: async (req, res) => {
    try {
      const songs = await Song.findAll();
      res.json(songs);
      res.end("no song found");
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch songs", error });
    }
  },

  getSongById: async (req, res) => {
    const { id } = req.params;
    try {
      const song = await Song.findByPk(id);
      if (!song) {
        return res.status(404).json({ message: "Song not found" });
      }
      res.json(song);
    } catch (error) {
      res.status(500).json({ message: "Error fetching song by ID", error });
    }
  },

  createSong: async (req, res) => {
    const { title, artist, genre, releaseDate, type } = req.body;
    const file = req.files?.file?.[0];
    const artCover = req.files?.artCover?.[0];

    if (!file || !artCover) {
      return res
        .status(400)
        .json({ message: "Song file or art cover is missing" });
    }

    console.log(req.body.filePath);
    try {
      const { data: newSong, error: songError } = await supabase
        .from("songs")
        .insert([
          {
            title,
            artist,
            releaseDate,
            type,
            filePath: file?.path || null,
            artCoverPath: artCover?.path || null,
            likes: 0,
          },
        ])
        .select();

      if (songError) {
        throw songError;
      }

      const { error: notificationError } = await supabase
        .from("notifications")
        .insert([
          {
            message: `A new song titled '${title}' by ${artist} has been added.`,
            type: "song_creation",
            created_at: new Date().toISOString(),
          },
        ]);

      if (notificationError) {
        console.error("Notification Error:", notificationError);
        throw notificationError;
      }

      res.status(201).json(newSong);
    } catch (error) {
      console.error("Error:", error);
      res
        .status(500)
        .json({ message: "Failed to create song", error: error.message });
    }
  },

  updateSongStatus: async (req, res) => {
    const { id } = req.params;
    const { status } = req.body;

    if (!["pending", "approved", "rejected"].includes(status)) {
      return res.status(400).json({ message: "Invalid status value" });
    }

    try {
      const song = await Song.findByPk(id);
      if (!song) {
        return res.status(404).json({ message: "Song not found" });
      }

      song.status = status;
      await song.save();

      res
        .status(200)
        .json({ message: "Song status updated successfully", song });
    } catch (error) {
      res.status(500).json({ message: "Failed to update song status", error });
    }
  },

  incrementLikes: async (req, res) => {
    const { id } = req.params;

    try {
      const song = await Song.findByPk(id);
      if (!song) {
        return res.status(404).json({ message: "Song not found" });
      }

      song.likes += 1;
      await song.save();

      res
        .status(200)
        .json({ message: "Song liked successfully", likes: song.likes });
    } catch (error) {
      res.status(500).json({ message: "Failed to like song", error });
    }
  },

  createAlbum: async (req, res) => {
    const { albumTitle, artist, genre, releaseDate, songs } = req.body;
    const artCover = req.files?.artCover?.[0];

    if (
      !albumTitle ||
      !artist ||
      !genre ||
      !releaseDate ||
      !songs ||
      !artCover
    ) {
      const missingFields = [];
      if (!albumTitle) missingFields.push("albumTitle");
      if (!artist) missingFields.push("artist");
      if (!genre) missingFields.push("genre");
      if (!releaseDate) missingFields.push("releaseDate");
      if (!songs) missingFields.push("songs");
      if (!artCover) missingFields.push("artCover");

      return res.status(400).json({
        message: `Missing required fields: ${missingFields.join(", ")}`,
      });
    }

    let parsedSongs;
    try {
      parsedSongs = JSON.parse(songs);
      if (!Array.isArray(parsedSongs)) {
        throw new Error("Songs should be an array");
      }
    } catch (err) {
      return res.status(400).json({ message: "Invalid songs data format" });
    }

    try {
      const { data: newAlbum, error: albumError } = await supabase
        .from("albums")
        .insert([
          {
            title: albumTitle,
            artist,
            genreid: 1,
            releaseDate,
            artCoverPath: artCover?.path || null,
          },
        ])
        .select();

      if (albumError) {
        throw albumError;
      }

      const songErrors = [];
      const songPromises = parsedSongs.map(async (song, index) => {
        const songFile = req.files?.songFiles?.[index];

        if (!songFile) {
          songErrors.push({ song: song.title, error: "Missing song file" });
          return;
        }

        try {
          const { error: songError } = await supabase.from("songs").insert([
            {
              title: song.title,
              artist,
              albumid: newAlbum[0].id,
              genre,
              filePath: songFile?.path || null,
              type: "album",
            },
          ]);

          if (songError) {
            throw songError;
          }
        } catch (error) {
          console.error(`Error creating song '${song.title}':`, error);
          songErrors.push({ song: song.title, error: error.message });
        }
      });

      await Promise.all(songPromises);

      if (songErrors.length > 0) {
        console.error("Some songs failed to create:", songErrors);
        return res.status(500).json({
          message: "Failed to create some songs",
          errors: songErrors,
        });
      }

      const { error: notificationError } = await supabase
        .from("notifications")
        .insert([
          {
            message: `A new album titled '${albumTitle}' by ${artist} has been added.`,
            type: "album_creation",
            created_at: new Date().toISOString(),
          },
        ]);

      if (notificationError) {
        console.error("Notification Error:", notificationError);
        throw notificationError;
      }

      res.status(200).json({
        message: "Album and songs created successfully",
        album: newAlbum,
      });
    } catch (error) {
      console.error("Error creating album and songs:", error);
      res.status(500).json({
        message: "Failed to create album and songs",
        error: error.message,
      });
    }
  },

  addGenre: async (req, res) => {
    const { name, description } = req.body;

    if (!name) {
      return res.status(400).json({ message: "Genre name is required" });
    }

    try {
      const { data, error } = await supabase
        .from("genres")
        .insert([{ name, description }]);

      if (error) {
        throw error;
      }

      res
        .status(201)
        .json({ message: "Genre added successfully", genre: data });
    } catch (error) {
      res.status(500).json({ message: "Failed to add genre", error });
    }
  },
};
