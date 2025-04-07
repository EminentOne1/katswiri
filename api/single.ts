import { VercelRequest, VercelResponse } from "@vercel/node";
import { IncomingForm } from "formidable";
import fs from "fs";
import { createClient } from "@supabase/supabase-js";

export const config = {
  api: {
    bodyParser: false,
  },
};

const supabase = createClient(
  process.env.SUPABASE_URL || "https://yrxeldgvagliebeoksiu.supabase.co",
  process.env.SUPABASE_ANON_KEY ||
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InlyeGVsZGd2YWdsaWViZW9rc2l1Iiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc0MzczODAyNSwiZXhwIjoyMDU5MzE0MDI1fQ.9qa_zEHRjUZN5YVocxPdV6nNp-7bIaPaMAEE5-PNCTs"
);

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
      console.error("❌ Form parsing error:", err);
      return res
        .status(500)
        .json({ message: "Form parsing failed", error: err });
    }

    const getFieldValue = (field?: string | string[]) =>
      Array.isArray(field) ? field[0] : field || "";

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
      console.warn("⚠️ Missing file(s)", { file, artCover });
      return res
        .status(400)
        .json({ message: "Missing song or art cover file" });
    }

    try {
      const songPath = `songs/${Date.now()}-${
        file.originalFilename ?? "song.mp3"
      }`;
      const songBuffer = fs.existsSync(file.filepath)
        ? fs.readFileSync(file.filepath)
        : null;

      if (!songBuffer) throw new Error("Failed to read song file");

      const { error: songUploadError } = await supabase.storage
        .from("music")
        .upload(songPath, songBuffer, {
          contentType: file.mimetype || "audio/mpeg",
        });

      if (songUploadError) {
        console.error("❌ Song upload error:", songUploadError);
        throw songUploadError;
      }

      const coverPath = `covers/${Date.now()}-${
        artCover.originalFilename ?? "cover.jpg"
      }`;
      const coverBuffer = fs.existsSync(artCover.filepath)
        ? fs.readFileSync(artCover.filepath)
        : null;

      if (!coverBuffer) throw new Error("Failed to read cover file");

      const { error: coverUploadError } = await supabase.storage
        .from("music")
        .upload(coverPath, coverBuffer, {
          contentType: artCover.mimetype || "image/jpeg",
        });

      if (coverUploadError) {
        console.error("❌ Cover upload error:", coverUploadError);
        throw coverUploadError;
      }

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

      if (insertError) {
        console.error("❌ DB insert error:", insertError);
        throw insertError;
      }

      console.log("✅ Upload + insert success", newSong);
      res
        .status(201)
        .json({ message: "Song uploaded successfully", song: newSong });
    } catch (uploadErr: any) {
      console.error("🔥 Upload process failed:", uploadErr);
      res.status(500).json({
        message: "Upload failed",
        error: uploadErr?.message || "Unexpected error",
      });
    }
  });
}
