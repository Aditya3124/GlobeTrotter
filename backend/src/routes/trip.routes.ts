import { Router } from 'express';
import { authenticate } from '../middleware/auth.middleware';
import { createTrip, getTrips, getTripById, updateTrip, deleteTrip, getTripBudget, toggleTripPrivacy } from '../controllers/trip.controller';
import { createStop } from '../controllers/stop.controller';
import { createActivity } from '../controllers/activity.controller';

const router = Router();

// All trip routes require the user to be logged in
router.use(authenticate);

router.post('/', createTrip);
router.get('/', getTrips);
router.get('/:id', getTripById);
router.put('/:id', updateTrip);
router.delete('/:id', deleteTrip);

// Phase 5: Budget & Sharing
router.get('/:id/budget', getTripBudget);
router.post('/:id/share', toggleTripPrivacy);

// Nested stops
router.post('/:tripId/stops', createStop);
router.post('/:tripId/activities', createActivity);

export default router;
