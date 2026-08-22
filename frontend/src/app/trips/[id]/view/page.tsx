"use client";
import { use } from "react";
import { useTripStore } from "@/store/useTripStore";
import Link from "next/link";
import { Calendar, List, ArrowLeft, Clock, DollarSign, MapPin } from "lucide-react";

export default function ItineraryViewPage({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = use(params);
  const tripId = resolvedParams.id;
  const trip = useTripStore((state) => state.trips.find(t => t.id === tripId));

  if (!trip) return <div className="p-10 text-center font-bold text-2xl uppercase tracking-widest text-slate-500">Trip not found.</div>;

  return (
    <div className="max-w-4xl mx-auto space-y-12 pb-24 relative">
      <header className="flex flex-col sm:flex-row sm:items-center justify-between gap-6 pb-6">
        <div className="space-y-4">
          <Link href="/trips" className="inline-flex items-center gap-2 text-sm font-bold text-slate-500 hover:text-slate-800 transition-colors">
            <ArrowLeft className="w-4 h-4" /> Back to Trips
          </Link>
          <h1 className="text-4xl md:text-5xl font-extrabold text-slate-800 pt-2">{trip.name}</h1>
          <p className="text-slate-600 font-medium flex items-center gap-2 bg-white px-4 py-2 rounded-lg border border-slate-200 w-fit shadow-sm">
            <Calendar className="w-4 h-4 text-slate-400" /> {trip.startDate} to {trip.endDate}
          </p>
        </div>
        <div className="flex gap-2 bg-white rounded-xl p-1.5 shadow-sm border border-slate-100">
          <button className="flex items-center gap-2 px-6 py-2.5 bg-slate-50 text-blue-600 rounded-lg font-bold text-sm transition-colors border border-slate-200">
            <List className="w-4 h-4" /> List
          </button>
          <button className="flex items-center gap-2 px-6 py-2.5 text-slate-500 font-bold rounded-lg text-sm hover:text-slate-800 hover:bg-slate-50 transition-colors">
            <Calendar className="w-4 h-4" /> Calendar
          </button>
        </div>
      </header>

      <div className="space-y-12 pt-8">
        {trip.stops.length === 0 ? (
           <div className="text-center py-20 bg-white rounded-[2rem] shadow-sm border border-slate-100">
             <p className="text-slate-500 font-medium text-lg mb-8">No stops in this itinerary yet.</p>
             <Link href={`/trips/${tripId}/builder`} className="bg-slate-900 text-white px-8 py-3 rounded-full font-bold hover:bg-slate-800 transition-colors inline-block shadow-lg">
               Go to Builder
             </Link>
           </div>
        ) : (
          trip.stops.map((stop, index) => (
            <div key={stop.id} className="relative">
              {/* Timeline Line */}
              {index !== trip.stops.length - 1 && (
                <div className="absolute left-[3.25rem] top-24 bottom-[-4rem] w-[2px] bg-slate-300/50 z-0 hidden sm:block"></div>
              )}
              
              <div className="flex gap-8 relative z-10">
                {/* Day Badge */}
                <div className="hidden sm:flex flex-col items-center">
                  <div className="w-24 h-24 rounded-2xl bg-white border border-slate-100 shadow-sm text-blue-500 flex flex-col items-center justify-center">
                    <span className="text-xs font-bold text-slate-400 mb-1">DAY</span>
                    <span className="text-3xl font-extrabold">{index + 1}</span>
                  </div>
                </div>

                <div className="flex-1 space-y-6">
                  <div className="bg-white rounded-[2rem] p-8 shadow-[0_12px_30px_rgba(0,0,0,0.03)] border border-slate-100">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-8 gap-4 pb-6 border-b border-slate-50">
                      <div>
                        <h2 className="text-2xl md:text-3xl font-bold text-slate-800 flex items-center gap-3">
                          <MapPin className="w-6 h-6 text-rose-500" />
                          {stop.city}
                        </h2>
                        <p className="text-slate-500 font-medium mt-3 inline-block bg-slate-50 border border-slate-100 px-3 py-1.5 rounded-lg text-sm">{stop.startDate}</p>
                      </div>
                      <span className="px-5 py-2.5 bg-teal-50 text-teal-700 font-bold rounded-xl flex items-center gap-1">
                        <DollarSign className="w-4 h-4" /> 150 Est.
                      </span>
                    </div>

                    <div className="space-y-4 sm:pl-4">
                      {/* Mock Activities */}
                      <div className="p-5 rounded-2xl bg-slate-50 border border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-4 hover:shadow-md transition-shadow">
                        <div className="space-y-2">
                          <h4 className="font-bold text-slate-800 text-lg">City Tour & Sightseeing</h4>
                          <div className="flex items-center gap-2 font-medium text-slate-500 text-sm">
                            <Clock className="w-4 h-4" /> 10:00 AM (3h)
                          </div>
                        </div>
                        <span className="font-bold text-slate-700 text-lg flex items-center"><DollarSign className="w-4 h-4 text-teal-500" />45</span>
                      </div>
                      
                      <div className="p-5 rounded-2xl bg-slate-50 border border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-4 hover:shadow-md transition-shadow">
                        <div className="space-y-2">
                          <h4 className="font-bold text-slate-800 text-lg">Lunch at Local Cafe</h4>
                          <div className="flex items-center gap-2 font-medium text-slate-500 text-sm">
                            <Clock className="w-4 h-4" /> 1:30 PM (1.5h)
                          </div>
                        </div>
                        <span className="font-bold text-slate-700 text-lg flex items-center"><DollarSign className="w-4 h-4 text-teal-500" />25</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
