import { VercelRequest, VercelResponse } from "@vercel/node";

export default function handler(req: VercelRequest, res: VercelResponse) {
  // Check if the request method is GET

  res.status(405).json({ message: "this is a current test api" });
}
