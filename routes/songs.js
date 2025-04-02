import { Router } from 'express';
import { SongController } from '../controllers/songcontroller.js';
import multer from 'multer';
import fs from 'fs';
import path from 'path';

const router = Router();

// Configure multer for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    // Use albumTitle from the request body to create a unique folder
    const albumTitle = req.body.albumTitle || 'default_album';
    const albumFolder = path.join('uploads', albumTitle);

    // Ensure the folder exists
    fs.mkdir(albumFolder, { recursive: true }, (err) => {
      if (err) {
        return cb(err, null); // Pass the error to multer
      }
      cb(null, albumFolder); // Set the upload directory
    });
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
    cb(null, `${uniqueSuffix}-${file.originalname}`); // Generate a unique filename
  },
});

// File filter to validate MIME types
const fileFilter = (req, file, cb) => {
  if (
    file.mimetype.startsWith('audio/') || // Allow audio files
    file.mimetype.startsWith('image/')    // Allow image files
  ) {
    cb(null, true); // Accept the file
  } else {
    cb(new Error('Invalid file type. Only audio and image files are allowed.'), false); // Reject the file
  }
};

const upload = multer({
  storage,
  fileFilter, // Add the file filter
  limits: {
    fileSize: 10 * 1024 * 1024, // Limit file size to 10MB
  },
});

router.get('/', SongController.getAllSongs);
router.get('/:id', SongController.getSongById);
router.post(
  '/single',
  upload.fields([{ name: 'file' }, { name: 'artCover' }]), // Handle multiple fields
  SongController.createSong
);
router.patch('/:id/status', SongController.updateSongStatus); // New route to update song status
router.patch('/:id/like', SongController.incrementLikes); // New route to like a song
router.post('/album', upload.fields([
  { name: 'artCover', maxCount: 1 },
  { name: 'songFiles', maxCount: 50 },
]), SongController.createAlbum); // New route to create an album


export default router;

