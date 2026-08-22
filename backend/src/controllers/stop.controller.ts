import { Response } from 'express';
import { AuthRequest } from '../middleware/auth.middleware';
import { prisma } from '../utils/prisma';

export const createStop = async (req: AuthRequest, res: Response): Promise<any> => {
  try {
    const tripId = req.params.tripId as string;
    const { city, country, startDate, endDate, order } = req.body;

    const trip = await prisma.trip.findUnique({ where: { id: tripId } }) as any;
    if (!trip) return res.status(404).json({ error: 'Trip not found' });
    if (trip.userId !== req.userId) return res.status(403).json({ error: 'Unauthorized' });

    const stop = await prisma.stop.create({
      data: {
        city,
        country,
        startDate: new Date(startDate),
        endDate: new Date(endDate),
        order,
        tripId
      }
    });

    return res.status(201).json(stop);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Failed to create stop' });
  }
};

export const updateStop = async (req: AuthRequest, res: Response): Promise<any> => {
  try {
    const id = req.params.id as string;
    const { city, country, startDate, endDate, order } = req.body;

    const stop = await prisma.stop.findUnique({ where: { id }, include: { trip: true } }) as any;
    if (!stop) return res.status(404).json({ error: 'Stop not found' });
    if (stop.trip.userId !== req.userId) return res.status(403).json({ error: 'Unauthorized' });

    const updatedStop = await prisma.stop.update({
      where: { id },
      data: {
        city,
        country,
        startDate: startDate ? new Date(startDate) : undefined,
        endDate: endDate ? new Date(endDate) : undefined,
        order
      }
    });

    return res.status(200).json(updatedStop);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Failed to update stop' });
  }
};

export const deleteStop = async (req: AuthRequest, res: Response): Promise<any> => {
  try {
    const id = req.params.id as string;

    const stop = await prisma.stop.findUnique({ where: { id }, include: { trip: true } }) as any;
    if (!stop) return res.status(404).json({ error: 'Stop not found' });
    if (stop.trip.userId !== req.userId) return res.status(403).json({ error: 'Unauthorized' });

    await prisma.stop.delete({ where: { id } });

    return res.status(200).json({ message: 'Stop deleted successfully' });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Failed to delete stop' });
  }
};
