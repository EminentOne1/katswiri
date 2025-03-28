import jwt from "jsonwebtoken"; // Import jsonwebtoken

const SECRET_KEY = "your-secret-key"; // Replace with a secure secret key

const loginMiddleware = async (req, res) => {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method Not Allowed" });
  }

  const { email, password } = req.body;

  if (email === "admin@katswiri.com" && password === "password") {
    const token = jwt.sign({ userId: "adminUserId", role: "admin" }, SECRET_KEY, { expiresIn: "1h" }); // Ensure role is at the top level
    return res.status(200).json({ token });
  }

  return res.status(401).json({ message: "Invalid credentials" });
};

export default loginMiddleware;
