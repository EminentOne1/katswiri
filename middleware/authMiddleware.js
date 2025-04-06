import jwt from "jsonwebtoken";

const SECRET_KEY = "katswirim";
import { supabase } from "../supabase.js";

const loginMiddleware = async (req, res) => {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method Not Allowed" });
  }

  const { email, password } = req.body;

  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) {
    return res
      .status(401)
      .json({ message: "Invalid credentials", error: error.message });
  }

  const token = jwt.sign(
    { userId: data.user.id, role: data.user.role || "user" },
    SECRET_KEY,
    { expiresIn: "1h" }
  );

  return res.status(200).json({
    message: "Login successful",
    token,
  });
};

export default loginMiddleware;
