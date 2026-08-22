import { Response } from 'express';
import { AuthRequest } from '../middleware/auth.middleware';
import { prisma } from '../utils/prisma';

export const createActivity = async (req: AuthRequest, res: Response): Promise<any> => {
  try {
    const tripId = req.params.tripId as string;
    const { name, description, date, cost, type, cityId, duration, order } = req.body;

    const trip = await prisma.trip.findUnique({ where: { id: tripId } }) as any;
    if (!trip) return res.status(404).json({ error: 'Trip not found' });
    if (trip.userId !== req.userId) return res.status(403).json({ error: 'Unauthorized' });

    const activity = await prisma.activity.create({
      data: {
        name,
        description,
        date: date ? new Date(date) : null,
        cost: cost || 0,
        type,
        cityId,
        tripId,
        duration,
        order: order || 0
      }
    });

    return res.status(201).json(activity);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Failed to create activity' });
  }
};

export const updateActivity = async (req: AuthRequest, res: Response): Promise<any> => {
  try {
    const id = req.params.id as string;
    const { name, description, date, cost, type, cityId, duration, order } = req.body;

    const activity = await prisma.activity.findUnique({ where: { id }, include: { trip: true } }) as any;
    if (!activity) return res.status(404).json({ error: 'Activity not found' });
    if (activity.trip.userId !== req.userId) return res.status(403).json({ error: 'Unauthorized' });

    const updatedActivity = await prisma.activity.update({
      where: { id },
      data: {
        name,
        description,
        date: date ? new Date(date) : undefined,
        cost,
        type,
        cityId,
        duration,
        order
      }
    });

    return res.status(200).json(updatedActivity);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Failed to update activity' });
  }
};

export const deleteActivity = async (req: AuthRequest, res: Response): Promise<any> => {
  try {
    const id = req.params.id as string;

    const activity = await prisma.activity.findUnique({ where: { id }, include: { trip: true } }) as any;
    if (!activity) return res.status(404).json({ error: 'Activity not found' });
    if (activity.trip.userId !== req.userId) return res.status(403).json({ error: 'Unauthorized' });

    await prisma.activity.delete({ where: { id } });

    return res.status(200).json({ message: 'Activity deleted successfully' });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Failed to delete activity' });
  }
};
