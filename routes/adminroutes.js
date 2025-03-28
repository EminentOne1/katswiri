import { Router } from 'express';
import AdminRoutesController  from '../controllers/adminRoutescontroller.js';
import loginMiddleware from '../middleware/authMiddleware.js';

const router = Router();

router.post('/', AdminRoutesController.createSong);
router.put('/:id', AdminRoutesController.updateSong);
router.delete('/:id', AdminRoutesController.deleteSong);


export default router;
