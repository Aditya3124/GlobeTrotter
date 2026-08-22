import { Response } from 'express';
import { AuthRequest } from '../middleware/auth.middleware';
import { prisma } from '../utils/prisma';

export const createActivity = async (req: AuthRequest, res: Response): Promise<any> => {
  try {
    const { stopId } = req.params;
    const { name, description, date, cost, type } = req.body;

    const stop = await prisma.stop.findUnique({ where: { id: stopId }, include: { trip: true } });
    if (!stop) return res.status(404).json({ error: 'Stop not found' });
    if (stop.trip.userId !== req.userId) return res.status(403).json({ error: 'Unauthorized' });

    const activity = await prisma.activity.create({
      data: {
        name,
        description,
        date: new Date(date),
        cost: cost || 0,
        type,
        stopId
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
    const { id } = req.params;
    const { name, description, date, cost, type } = req.body;

    const activity = await prisma.activity.findUnique({ where: { id }, include: { stop: { include: { trip: true } } } });
    if (!activity) return res.status(404).json({ error: 'Activity not found' });
    if (activity.stop.trip.userId !== req.userId) return res.status(403).json({ error: 'Unauthorized' });

    const updatedActivity = await prisma.activity.update({
      where: { id },
      data: {
        name,
        description,
        date: date ? new Date(date) : undefined,
        cost,
        type
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
    const { id } = req.params;

    const activity = await prisma.activity.findUnique({ where: { id }, include: { stop: { include: { trip: true } } } });
    if (!activity) return res.status(404).json({ error: 'Activity not found' });
    if (activity.stop.trip.userId !== req.userId) return res.status(403).json({ error: 'Unauthorized' });

    await prisma.activity.delete({ where: { id } });

    return res.status(200).json({ message: 'Activity deleted successfully' });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Failed to delete activity' });
  }
};
