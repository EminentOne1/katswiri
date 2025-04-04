import { Router } from 'express';
import AdminRoutesController from '../controllers/adminRoutescontroller.js';

const router = Router();

router.post('/', AdminRoutesController.createSong);
router.put('/:id', AdminRoutesController.updateSong);
router.delete('/:id', AdminRoutesController.deleteSong);
router.get('/all-users', AdminRoutesController.getUsers);

export default router;
