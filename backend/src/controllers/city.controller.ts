import { Request, Response } from 'express';
import { prisma } from '../utils/prisma';

export const searchCities = async (req: Request, res: Response): Promise<any> => {
  try {
    const query = req.query.q as string;
    
    if (!query || query.length < 2) {
      return res.status(200).json([]);
    }

    const cities = await prisma.city.findMany({
      where: {
        city: {
          contains: query,
          mode: 'insensitive'
        }
      },
      take: 10,
      orderBy: {
        population: 'desc'
      }
    });

    const serializedCities = cities.map(city => ({
      ...city,
      population: city.population ? city.population.toString() : null
    }));

    return res.status(200).json(serializedCities);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Failed to search cities' });
  }
};

export const getTopCities = async (req: Request, res: Response): Promise<any> => {
  try {
    const cities = await prisma.city.findMany({
      take: 3,
      orderBy: {
        population: 'desc'
      }
    });

    const serializedCities = cities.map(city => ({
      ...city,
      population: city.population ? city.population.toString() : null
    }));

    return res.status(200).json(serializedCities);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Failed to fetch top cities' });
  }
};

export const getAllCities = async (req: Request, res: Response): Promise<any> => {
  try {
    const cities = await prisma.city.findMany({
      orderBy: {
        population: 'desc'
      }
    });

    const serializedCities = cities.map(city => ({
      ...city,
      population: city.population ? city.population.toString() : null
    }));

    return res.status(200).json(serializedCities);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Failed to fetch all cities' });
  }
};
