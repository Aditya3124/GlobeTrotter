import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import authRoutes from './routes/auth.routes';
import userRoutes from './routes/user.routes';
import tripRoutes from './routes/trip.routes';
import stopRoutes from './routes/stop.routes';
import activityRoutes from './routes/activity.routes';
import cityRoutes from './routes/city.routes';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ limit: '50mb', extended: true }));

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/trips', tripRoutes);
app.use('/api/stops', stopRoutes);
app.use('/api/activities', activityRoutes);
app.use('/api/cities', cityRoutes);

app.get('/api/health', (req, res) => {
  res.status(200).json({ status: 'ok', message: 'GlobeTrotter API is running' });
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
