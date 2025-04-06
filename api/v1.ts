import { VercelRequest, VercelResponse } from "@vercel/node";

export default function handler(req: VercelRequest, res: VercelResponse) {
  // Check if the request method is GET
  if (req.method !== "GET") {
    return res.status(405).json({ message: "Only POST allowed" });
  }
  res.status(405).json({ message: "this is a current test api" });
}
