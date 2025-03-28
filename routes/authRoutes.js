import express from 'express';
import loginMiddleware from '../middleware/authMiddleware.js';

const router = express.Router();

router.post('/login', loginMiddleware);

export default router;
