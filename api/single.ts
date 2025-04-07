import { VercelRequest, VercelResponse } from "@vercel/node";
import { IncomingForm } from "formidable";
import fs from "fs";
import { createClient } from "@supabase/supabase-js";

// Prevent Next.js from parsing the body automatically
export const config = {
  api: {
    bodyParser: false,
  },
};

const supabase = createClient(
  process.env.REACT_APP_SUPABASE_URL ||
    "https://yrxeldgvagliebeoksiu.supabase.co",
  process.env.REACT_APP_SUPABASE_ANON_KEY ||
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InlyeGVsZGd2YWdsaWViZW9rc2l1Iiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc0MzczODAyNSwiZXhwIjoyMDU5MzE0MDI1fQ.9qa_zEHRjUZN5YVocxPdV6nNp-7bIaPaMAEE5-PNCTs"
);

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== "POST") {
    console.warn(`Method not allowed: ${req.method}`);
    return res.status(405).json({ message: "Only POST allowed" });
  }

  try {
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
        console.warn("⚠️ Missing song or art cover file", { file, artCover });
        return res.status(400).json({ message: "Missing song or art cover" });
      }

      try {
        const songPath = `songs/${Date.now()}-${
          file.originalFilename ?? "song.mp3"
        }`;
        const songBuffer = fs.readFileSync(file.filepath ?? "");

        const { error: songUploadError } = await supabase.storage
          .from("music")
          .upload(songPath, songBuffer, {
            contentType: file.mimetype ?? undefined,
          });

        if (songUploadError) {
          console.error("❌ Song upload error:", songUploadError);
          throw songUploadError;
        }

        const coverPath = `covers/${Date.now()}-${
          artCover.originalFilename ?? "cover.jpg"
        }`;
        const coverBuffer = fs.readFileSync(artCover.filepath ?? "");

        const { error: coverUploadError } = await supabase.storage
          .from("music")
          .upload(coverPath, coverBuffer, {
            contentType: artCover.mimetype ?? undefined,
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
          console.error("❌ Database insert error:", insertError);
          throw insertError;
        }

        console.log("✅ Upload and insert successful:", newSong);
        res.status(201).json({ message: "Song uploaded", song: newSong });
      } catch (uploadErr: any) {
        console.error("🔥 Upload process failed:", uploadErr.message);
        res.status(500).json({
          message: "Upload failed",
          error: uploadErr.message || uploadErr,
        });
      }
    });
  } catch (outerErr: any) {
    console.error("💥 Outer handler error:", outerErr);
    res.status(500).json({
      message: "Unhandled error",
      error: outerErr.message || outerErr,
    });
  }
}
