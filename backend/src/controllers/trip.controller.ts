import { Response } from 'express';
import { AuthRequest } from '../middleware/auth.middleware';
import { prisma } from '../utils/prisma';

export const createTrip = async (req: AuthRequest, res: Response): Promise<any> => {
  try {
    const { name, description, startDate, endDate, budget, isPublic, coverPhoto } = req.body;

    const trip = await prisma.trip.create({
      data: {
        name,
        description,
        startDate: new Date(startDate),
        endDate: new Date(endDate),
        budget,
        coverPhoto,
        isPublic: isPublic || false,
        userId: req.userId as string,
      }
    });

    return res.status(201).json(trip);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Failed to create trip' });
  }
};

export const getTrips = async (req: AuthRequest, res: Response): Promise<any> => {
  try {
    const trips = await prisma.trip.findMany({
      where: { userId: req.userId },
      include: {
        stops: true
      },
      orderBy: { startDate: 'asc' }
    });
    return res.status(200).json(trips);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Failed to fetch trips' });
  }
};

export const getTripById = async (req: AuthRequest, res: Response): Promise<any> => {
  try {
    const id = req.params.id as string;

    const trip = await prisma.trip.findUnique({
      where: { id },
      include: {
        stops: {
          orderBy: { order: 'asc' }
        },
        activities: {
          orderBy: { order: 'asc' }
        }
      }
    });

    if (!trip) {
      return res.status(404).json({ error: 'Trip not found' });
    }

    if (trip.userId !== req.userId && !trip.isPublic) {
      return res.status(403).json({ error: 'Unauthorized access to this trip' });
    }

    return res.status(200).json(trip);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Failed to fetch trip' });
  }
};

export const updateTrip = async (req: AuthRequest, res: Response): Promise<any> => {
  try {
    const id = req.params.id as string;
    const { name, description, startDate, endDate, budget, isPublic, coverPhoto } = req.body;

    // Check ownership
    const existingTrip = await prisma.trip.findUnique({ where: { id } });
    if (!existingTrip) return res.status(404).json({ error: 'Trip not found' });
    if (existingTrip.userId !== req.userId) return res.status(403).json({ error: 'Unauthorized' });

    const trip = await prisma.trip.update({
      where: { id },
      data: {
        name,
        description,
        startDate: startDate ? new Date(startDate) : undefined,
        endDate: endDate ? new Date(endDate) : undefined,
        budget,
        coverPhoto,
        isPublic
      }
    });

    return res.status(200).json(trip);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Failed to update trip' });
  }
};

export const deleteTrip = async (req: AuthRequest, res: Response): Promise<any> => {
  try {
    const id = req.params.id as string;

    // Check ownership
    const existingTrip = await prisma.trip.findUnique({ where: { id } });
    if (!existingTrip) return res.status(404).json({ error: 'Trip not found' });
    if (existingTrip.userId !== req.userId) return res.status(403).json({ error: 'Unauthorized' });

    await prisma.trip.delete({ where: { id } });

    return res.status(200).json({ message: 'Trip deleted successfully' });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Failed to delete trip' });
  }
};

export const getTripBudget = async (req: AuthRequest, res: Response): Promise<any> => {
  try {
    const id = req.params.id as string;

    const trip = await prisma.trip.findUnique({
      where: { id },
      include: {
        activities: true
      }
    }) as any;

    if (!trip) return res.status(404).json({ error: 'Trip not found' });
    if (trip.userId !== req.userId && !trip.isPublic) return res.status(403).json({ error: 'Unauthorized' });

    let totalSpent = 0;
    trip.activities.forEach((activity: any) => {
      totalSpent += activity.cost;
    });

    const budgetStats = {
      tripBudget: trip.budget || {},
      totalSpent,
      // If budget is an object, calculating remaining requires parsing the object. For simplicity, just return it.
    };

    return res.status(200).json(budgetStats);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Failed to calculate budget' });
  }
};

export const toggleTripPrivacy = async (req: AuthRequest, res: Response): Promise<any> => {
  try {
    const id = req.params.id as string;

    const trip = await prisma.trip.findUnique({ where: { id } });
    if (!trip) return res.status(404).json({ error: 'Trip not found' });
    if (trip.userId !== req.userId) return res.status(403).json({ error: 'Unauthorized' });

    const updatedTrip = await prisma.trip.update({
      where: { id },
      data: { isPublic: !trip.isPublic }
    });

    // In a real app, this might be a full domain like https://yourapp.com/trip/...
    const shareUrl = updatedTrip.isPublic ? `/shared-trip/${updatedTrip.id}` : null;

    return res.status(200).json({ 
      isPublic: updatedTrip.isPublic, 
      shareUrl,
      message: updatedTrip.isPublic ? 'Trip is now public' : 'Trip is now private'
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Failed to toggle privacy' });
  }
};
