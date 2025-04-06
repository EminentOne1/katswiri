import { Router } from "express";
import { SongController } from "../controllers/songcontroller.js";
import multer from "multer";
import fs from "fs";
import path from "path";

const router = Router();

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const albumTitle =
      req.body.title || req.body.albumTitle || "katswiri_untracked"; // Fallback to 'default_album' if title is undefined
    const albumFolder = path.join("uploads", albumTitle);
    console.log("Album folder path:", albumFolder);
    fs.mkdir(albumFolder, { recursive: true }, (err) => {
      if (err) {
        return cb(err, null);
      }
      cb(null, albumFolder);
    });
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, `${uniqueSuffix}-${file.originalname}`);
  },
});

const fileFilter = (req, file, cb) => {
  if (
    file.mimetype.startsWith("audio/") ||
    file.mimetype.startsWith("image/")
  ) {
    cb(null, true);
  } else {
    cb(
      new Error("Invalid file type. Only audio and image files are allowed."),
      false
    );
  }
};

const upload = multer({
  storage,
  fileFilter,
  limits: {
    fileSize: 10 * 1024 * 1024,
  },
});

router.get("/", SongController.getAllSongs);
router.get("/:id", SongController.getSongById);
router.post(
  "/single",
  upload.fields([
    { name: "file", maxCount: 1 },
    { name: "artCover", maxCount: 1 },
  ]),
  SongController.createSong
);
router.patch("/:id/status", SongController.updateSongStatus);
router.patch("/:id/like", SongController.incrementLikes);
router.post(
  "/album",
  upload.fields([
    { name: "artCover", maxCount: 1 },
    { name: "songFiles", maxCount: 50 },
  ]),
  SongController.createAlbum
);
router.post("/genres", SongController.addGenre);

export default router;
