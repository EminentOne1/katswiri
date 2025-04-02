import { fileURLToPath } from 'url';
import { dirname } from 'path';
import Song from '../models/Song.js';
import Album from '../models/Album.js';
import  sequelize  from '../models/sequelize.js';

// Fix for ES module support in Node.js
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export const SongController = {
  getAllSongs: async (req, res) => {
    try {
      const songs = await Song.findAll();
      res.json(songs);
    } catch (error) {
      res.status(500).json({ message: 'Failed to fetch songs', error });
    }
  },

  getSongById: async (req, res) => {
    const { id } = req.params;
    try {
      const song = await Song.findByPk(id);
      if (!song) {
        return res.status(404).json({ message: 'Song not found' });
      }
      res.json(song);
    } catch (error) {
      res.status(500).json({ message: 'Error fetching song by ID', error });
    }
  },

  createSong: async (req, res) => {
    const { title, artist, genre, releaseDate, type } = req.body;
    const file = req.files?.songFile?.[0];  // ✅ Fix field name consistency
    const artCover = req.files?.artCover?.[0];

    try {
      const newSong = await Song.create({
        title,
        artist,
        genre,
        releaseDate,
        type,
        filePath: file?.path,
        artCoverPath: artCover?.path,
        likes: 0, // Initialize likes to 0
      });
      res.status(201).json(newSong);
    } catch (error) {
      res.status(500).json({ message: 'Failed to create song', error });
    }
  },

  updateSongStatus: async (req, res) => {
    const { id } = req.params;
    const { status } = req.body;

    if (!['pending', 'approved', 'rejected'].includes(status)) {
      return res.status(400).json({ message: 'Invalid status value' });
    }

    try {
      const song = await Song.findByPk(id);
      if (!song) {
        return res.status(404).json({ message: 'Song not found' });
      }

      song.status = status;
      await song.save();

      res.status(200).json({ message: 'Song status updated successfully', song });
    } catch (error) {
      res.status(500).json({ message: 'Failed to update song status', error });
    }
  },

  incrementLikes: async (req, res) => {
    const { id } = req.params;

    try {
      const song = await Song.findByPk(id);
      if (!song) {
        return res.status(404).json({ message: 'Song not found' });
      }

      song.likes += 1; // Increment likes
      await song.save();

      res.status(200).json({ message: 'Song liked successfully', likes: song.likes });
    } catch (error) {
      res.status(500).json({ message: 'Failed to like song', error });
    }
  },

  createAlbum: async (req, res) => {
    const { albumTitle, artist, genreId, releaseDate, songs } = req.body;
    const artCover = req.files?.artCover?.[0];

    const transaction = await sequelize.transaction(); // Start a transaction

    try {
      let parsedSongs;
      try {
        parsedSongs = JSON.parse(songs);
        if (!Array.isArray(parsedSongs)) throw new Error();
      } catch (err) {
        return res.status(400).json({ message: 'Invalid songs data format' });
      }

      const newAlbum = await Album.create(
        {
          title: albumTitle,
          artist,
          genreId,
          releaseDate,
          artCoverPath: artCover?.path || null,
        },
        { transaction } // Pass the transaction
      );
      console.log('Album created:', newAlbum);
      // Create songs and associate them with the album
      const songPromises = parsedSongs.map(async (song, index) => {
        const songFile = req.files?.songFiles?.[index];

       
        return await Song.create(
          {
            title: song.title,
            artist,
            albumId: newAlbum.id,
            genreId,
            filePath: songFile?.path || null, // Use the uploaded file path
          },
          { transaction } // Pass the transaction
        );
      });

      await Promise.all(songPromises); // Wait for all songs to be created

      await transaction.commit(); // Commit the transaction

      res.status(201).json({ message: 'Album and songs created successfully', album: newAlbum });
    } catch (error) {
      await transaction.rollback(); 
      console.error('Error creating album:', error);
      res.status(500).json({ message: 'Failed to create album', error });
    }
  },
};