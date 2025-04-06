import { VercelRequest, VercelResponse } from "@vercel/node";
import { IncomingForm, File } from "formidable";
import fs from "fs";
import { supabase } from "../supabase";

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Only POST allowed" });
  }

  const form = new IncomingForm({
    multiples: true,
    keepExtensions: true,
    uploadDir: "/tmp",
  });

  form.parse(req, async (err, fields, files) => {
    if (err) {
      console.error("Form parsing error:", err);
      return res
        .status(500)
        .json({ message: "Error parsing form", error: err });
    }

    const getFieldValue = (field?: string | string[]) => {
      if (!field) return "";
      return Array.isArray(field) ? field[0] : field;
    };

    const title = getFieldValue(fields.title);
    const artist = getFieldValue(fields.artist);
    const genre = getFieldValue(fields.genre);
    const releaseDate = getFieldValue(fields.releaseDate);
    const type = getFieldValue(fields.type);

    const file = Array.isArray(files.file) ? files.file[0] : files.file;
    const artCover = Array.isArray(files.artCover)
      ? files.artCover[0]
      : files.artCover;

    if (!file || !artCover) {
      return res.status(400).json({ message: "Missing song or art cover" });
    }

    try {
      // Ensure all possibly null values are cast properly
      const songPath = `songs/${Date.now()}-${
        file.originalFilename ?? "song.mp3"
      }`;
      const { error: songUploadError } = await supabase.storage
        .from("music")
        .upload(songPath, fs.createReadStream(file.filepath ?? ""), {
          contentType: file.mimetype ?? undefined,
        });
      if (songUploadError) throw songUploadError;

      const coverPath = `covers/${Date.now()}-${
        artCover.originalFilename ?? "cover.jpg"
      }`;
      const { error: coverUploadError } = await supabase.storage
        .from("music")
        .upload(coverPath, fs.createReadStream(artCover.filepath ?? ""), {
          contentType: artCover.mimetype ?? undefined,
        });
      if (coverUploadError) throw coverUploadError;

      const { data: newSong, error: insertError } = await supabase
        .from("songs")
        .insert([
          {
            title,
            artist,
            genre,
            releaseDate,
            type,
            filePath: songPath,
            artCoverPath: coverPath,
            likes: 0,
          },
        ])
        .select();

      if (insertError) throw insertError;

      res.status(201).json({ message: "Song uploaded", song: newSong });
    } catch (error: any) {
      console.error("Upload failed:", error);
      res.status(500).json({ message: "Upload failed", error: error.message });
    }
  });
}
