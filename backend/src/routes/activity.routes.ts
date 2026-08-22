import { Router } from 'express';
import { authenticate } from '../middleware/auth.middleware';
import { updateActivity, deleteActivity } from '../controllers/activity.controller';

const router = Router();
router.use(authenticate);

router.put('/:id', updateActivity);
router.delete('/:id', deleteActivity);

export default router;
