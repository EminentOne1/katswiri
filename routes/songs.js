import { Router } from 'express';
import { SongController } from '../controllers/songcontroller.js';

const router = Router();

router.get('/', SongController.getAllSongs);
router.get('/:id', SongController.getSongById);

export default router;

