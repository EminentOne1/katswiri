import { createToken } from "../src/utils/session.js";

const loginMiddleware = async (req, res) => {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method Not Allowed" });
  }

  const { email, password } = req.body;

  if (email === "admin@katswiri.com" && password === "password") {
    const token = await createToken({ userId: "adminUserId", role: "admin" }); 
    return res.status(200).json({ token });
  }

  return res.status(401).json({ message: "Invalid credentials" });
};

export default loginMiddleware;
