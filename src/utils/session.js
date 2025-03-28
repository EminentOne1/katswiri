import jwt from 'jsonwebtoken';

const SECRET_KEY = 'your-secret-key'; // Replace with a secure key in production

export const createToken = (userId) => {
  return jwt.sign({ userId }, SECRET_KEY, { expiresIn: '1h' });
};

export const verifyToken = (token) => {
  try {
    return jwt.verify(token, SECRET_KEY);
  } catch {
    return null;
  }
};
