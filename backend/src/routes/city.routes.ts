import { Router } from 'express';
import { searchCities, getTopCities, getAllCities } from '../controllers/city.controller';
import { authenticate } from '../middleware/auth.middleware';

const router = Router();

// Make /popular unprotected or protected? Let's keep it protected for now to match search, or unprotected? 
// The dashboard page might be public. Let's place it before authenticate if we want it public, or after.
// In index.ts, app.use('/api/cities', cityRoutes). 
// The prompt doesn't specify. I'll make it unprotected so the dashboard can fetch it even when logged out (since Dashboard seems public).
router.get('/popular', getTopCities);
router.get('/all', getAllCities);

router.use(authenticate);
router.get('/search', searchCities);

export default router;
