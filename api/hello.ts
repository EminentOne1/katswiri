import { VercelRequest, VercelResponse } from "@vercel/node";

export default function handler(req: VercelRequest, res: VercelResponse) {
  // Check if the request method is GET
  if (req.method === "GET") {
    res.status(200).json({ message: "Hello from Vercel API (GET)!" });
  }
  // Check if the request method is POST
  else if (req.method === "POST") {
    res.status(200).json({ message: "Hello from Vercel API (POST)!" });
  }
  // Handle other HTTP methods if necessary
  else {
    res.status(405).json({ message: "Method Not Allowed" });
  }
}
