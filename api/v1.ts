import { VercelRequest, VercelResponse } from "@vercel/node";

export default function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method === "GET") {
    res.status(200).json({ message: "Hello from Vercel API (GET)!" });
  } else if (req.method === "POST") {
    res.status(200).json({ message: "Hello from Vercel API (POST)!" });
  } else {
    res.status(405).json({ message: "Method Not Allowed" });
  }
}
