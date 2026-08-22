"use client";
import { useTripStore } from "@/store/useTripStore";
import Link from "next/link";
import { Plus, Trash2, Calendar, MapPin, Eye } from "lucide-react";

export default function TripsPage() {
  const trips = useTripStore((state) => state.trips);
  const deleteTrip = useTripStore((state) => state.deleteTrip);

  return (
    <div className="max-w-6xl mx-auto space-y-12 pb-24 relative">
      <header className="flex flex-col sm:flex-row sm:items-center justify-between gap-6 pb-6">
        <div>
          <h1 className="text-3xl md:text-4xl font-extrabold text-slate-800">My Trips</h1>
          <p className="text-slate-500 font-medium mt-2">Manage your upcoming and past adventures.</p>
        </div>
        <Link href="/trips/create" className="inline-flex items-center justify-center gap-2 bg-blue-500 text-white px-8 py-3.5 rounded-full font-bold hover:bg-blue-600 transition-colors shadow-lg hover:shadow-xl hover:-translate-y-0.5">
          <Plus className="w-5 h-5" />
          New Trip
        </Link>
      </header>

      {trips.length === 0 ? (
        <div className="text-center py-32 bg-white rounded-[2.5rem] shadow-[0_20px_50px_rgba(0,0,0,0.05)] border border-slate-100">
          <div className="w-24 h-24 mx-auto rounded-full bg-slate-50 flex items-center justify-center mb-8 border-2 border-dashed border-slate-200">
            <Calendar className="w-10 h-10 text-slate-400" />
          </div>
          <h2 className="text-2xl font-bold text-slate-800 mb-4">No trips planned</h2>
          <p className="text-slate-500 font-medium mb-10">Time to start your next adventure!</p>
          <Link href="/trips/create" className="bg-slate-900 text-white px-10 py-4 rounded-full font-bold hover:bg-slate-800 transition-colors inline-block shadow-lg">
            Plan a Trip
          </Link>
        </div>
      ) : (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-10">
          {trips.map((trip) => (
            <div key={trip.id} className="group bg-white rounded-[2rem] p-8 flex flex-col shadow-[0_12px_30px_rgba(0,0,0,0.05)] border border-slate-100 hover:shadow-[0_20px_40px_rgba(0,0,0,0.08)] hover:-translate-y-1 transition-all duration-300">
              <div className="flex-1 space-y-6">
                <div className="flex justify-between items-start gap-4">
                  <h3 className="text-xl font-bold text-slate-800 group-hover:text-blue-500 transition-colors leading-tight">{trip.name}</h3>
                  <button 
                    onClick={(e) => { e.preventDefault(); deleteTrip(trip.id); }}
                    className="p-2 text-slate-400 hover:text-rose-500 hover:bg-rose-50 rounded-full transition-colors"
                    title="Delete Trip"
                  >
                    <Trash2 className="w-5 h-5" />
                  </button>
                </div>
                <div className="space-y-3 pt-2">
                  <p className="flex items-center gap-3 text-slate-600 font-medium text-sm">
                    <Calendar className="w-4 h-4 text-slate-400" />
                    {trip.startDate} - {trip.endDate}
                  </p>
                  <p className="flex items-center gap-3 text-slate-600 font-medium text-sm">
                    <MapPin className="w-4 h-4 text-slate-400" />
                    {trip.stops.length} Stops
                  </p>
                </div>
              </div>
              <div className="mt-8 pt-6 border-t border-slate-100 flex gap-4">
                <Link href={`/trips/${trip.id}/builder`} className="flex-1 text-slate-600 font-bold py-3 px-4 text-center rounded-xl bg-slate-50 hover:bg-slate-100 transition-colors flex items-center justify-center gap-2">
                  <MapPin className="w-4 h-4" /> Edit
                </Link>
                <Link href={`/trips/${trip.id}/view`} className="flex-1 text-blue-500 font-bold py-3 px-4 text-center rounded-xl bg-blue-50 hover:bg-blue-100 transition-colors flex items-center justify-center gap-2">
                  <Eye className="w-4 h-4" /> View
                </Link>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
