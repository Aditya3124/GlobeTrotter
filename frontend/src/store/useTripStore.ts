import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export type Activity = {
  id: string;
  name: string;
  type: string; // e.g., sightseeing, food, adventure
  cost: number;
  duration: string;
  date: string | null;
  cityId: string;
  order: number;
};

export type Stop = {
  id: string;
  city: string;
  country: string;
  startDate: string;
  endDate: string;
  order: number;
};

export type Trip = {
  id: string;
  name: string;
  description: string;
  startDate: string;
  endDate: string;
  coverPhoto?: string;
  stops: Stop[];
  activities: Activity[];
  budget: {
    transport: number;
    stay: number;
    meals: number;
    activities: number; // usually calculated from activities array, but can be overridden
  };
};

type TripStore = {
  trips: Trip[];
  addTrip: (trip: Trip) => void;
  updateTrip: (id: string, trip: Partial<Trip>) => void;
  deleteTrip: (id: string) => void;
  addStop: (tripId: string, stop: Stop) => void;
  updateStop: (tripId: string, stopId: string, stop: Partial<Stop>) => void;
  removeStop: (tripId: string, stopId: string) => void;
  addActivity: (tripId: string, activity: Activity) => void;
  updateActivity: (tripId: string, activityId: string, activity: Partial<Activity>) => void;
  removeActivity: (tripId: string, activityId: string) => void;
};

export const useTripStore = create<TripStore>()(
  persist(
    (set) => ({
      trips: [],
      addTrip: (trip) => set((state) => ({ trips: [...state.trips, trip] })),
      updateTrip: (id, updatedTrip) =>
        set((state) => ({
          trips: state.trips.map((trip) => (trip.id === id ? { ...trip, ...updatedTrip } : trip)),
        })),
      deleteTrip: (id) =>
        set((state) => ({
          trips: state.trips.filter((trip) => trip.id !== id),
        })),
      
      addStop: (tripId, stop) =>
        set((state) => ({
          trips: state.trips.map((trip) =>
            trip.id === tripId ? { ...trip, stops: [...trip.stops, stop] } : trip
          ),
        })),
      updateStop: (tripId, stopId, updatedStop) =>
        set((state) => ({
          trips: state.trips.map((trip) =>
            trip.id === tripId
              ? {
                  ...trip,
                  stops: trip.stops.map((stop) =>
                    stop.id === stopId ? { ...stop, ...updatedStop } : stop
                  ),
                }
              : trip
          ),
        })),
      removeStop: (tripId, stopId) =>
        set((state) => ({
          trips: state.trips.map((trip) =>
            trip.id === tripId
              ? { ...trip, stops: trip.stops.filter((stop) => stop.id !== stopId) }
              : trip
          ),
        })),

      addActivity: (tripId, activity) =>
        set((state) => ({
          trips: state.trips.map((trip) =>
            trip.id === tripId
              ? { ...trip, activities: [...trip.activities, activity] }
              : trip
          ),
        })),
      updateActivity: (tripId, activityId, updatedActivity) =>
        set((state) => ({
          trips: state.trips.map((trip) =>
            trip.id === tripId
              ? {
                  ...trip,
                  activities: trip.activities.map((activity) =>
                    activity.id === activityId ? { ...activity, ...updatedActivity } : activity
                  ),
                }
              : trip
          ),
        })),
      removeActivity: (tripId, activityId) =>
        set((state) => ({
          trips: state.trips.map((trip) =>
            trip.id === tripId
              ? {
                  ...trip,
                  activities: trip.activities.filter((activity) => activity.id !== activityId),
                }
              : trip
          ),
        })),
    }),
    {
      name: 'globe-trotter-storage',
    }
  )
);
