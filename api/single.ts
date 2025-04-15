import { VercelRequest, VercelResponse } from "@vercel/node";
import { IncomingForm } from "formidable";
import fs from "fs";
import { createClient } from "@supabase/supabase-js";
import admin from "firebase-admin";
import { initializeApp, cert, getApps } from "firebase-admin/app";
import { getFirestore } from "firebase-admin/firestore";

export const config = {
  api: {
    bodyParser: false,
  },
};


if (!getApps().length) {
  initializeApp({
    credential: cert({
      projectId: process.env.FIREBASE_PROJECT_ID,
      clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
      privateKey: process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, "\n"),
    }),
  });
}
const db = getFirestore();


const supabase = createClient(
  process.env.SUPABASE_URL!,
  process.env.SUPABASE_ANON_KEY!
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
      return res.status(500).json({ message: "Form parsing failed" });
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
      return res
        .status(400)
        .json({ message: "Missing song or art cover file" });
    }

    try {
      // Upload song
      const songPath = `songs/${Date.now()}-${file.originalFilename}`;
      const songBuffer = fs.readFileSync(file.filepath);

      const { error: songUploadError } = await supabase.storage
        .from("katswiri")
        .upload(songPath, songBuffer, {
          contentType: file.mimetype || "audio/mpeg",
        });

      if (songUploadError) throw songUploadError;

      const songURL = supabase.storage
        .from("katswiri")
        .getPublicUrl(songPath).data.publicUrl;

      // Upload art cover
      const coverPath = `covers/${Date.now()}-${artCover.originalFilename}`;
      const coverBuffer = fs.readFileSync(artCover.filepath);

      const { error: coverUploadError } = await supabase.storage
        .from("katswiri")
        .upload(coverPath, coverBuffer, {
          contentType: artCover.mimetype || "image/jpeg",
        });

      if (coverUploadError) throw coverUploadError;

      const coverURL = supabase.storage
        .from("katswiri")
        .getPublicUrl(coverPath).data.publicUrl;

      // Save metadata to Firestore
      const songRef = await db.collection("songs").add({
        title,
        artist,
        genre,
        releaseDate,
        type,
        filePath: songPath,
        artCoverPath: coverPath,
        fileURL: songURL,
        artCoverURL: coverURL,
        createdAt: admin.firestore.FieldValue.serverTimestamp(),
        likes: 0,
      });

      // Create notification
      await db.collection("notifications").add({
        message: `New song uploaded: ${title}`,
        status: "unread",
        date: admin.firestore.FieldValue.serverTimestamp(),
        songId: songRef.id,
      });

      return res.status(201).json({
        message: "Song uploaded successfully",
        songId: songRef.id,
        fileURL: songURL,
        artCoverURL: coverURL,
      });
    } catch (uploadErr: any) {
      console.error("🔥 Upload process failed:", uploadErr);
      return res.status(500).json({
        message: "Upload failed",
        error: uploadErr?.message || "Unexpected error",
      });
    }
  });
}
