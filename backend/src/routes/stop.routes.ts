import { Router } from 'express';
import { authenticate } from '../middleware/auth.middleware';
import { updateStop, deleteStop } from '../controllers/stop.controller';


const router = Router();
router.use(authenticate);

// Stop CRUD
router.put('/:id', updateStop);
router.delete('/:id', deleteStop);



export default router;
