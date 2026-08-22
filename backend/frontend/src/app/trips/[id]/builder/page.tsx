"use client";
import { useState, use } from "react";
import { useTripStore } from "@/store/useTripStore";
import { Search, Plus, GripVertical, Calendar as CalendarIcon, ArrowRight } from "lucide-react";
import Link from "next/link";
import dynamic from "next/dynamic";

const Map = dynamic(() => import("@/components/Map"), { ssr: false });

export default function ItineraryBuilderPage({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = use(params);
  const tripId = resolvedParams.id;
  const trip = useTripStore((state) => state.trips.find(t => t.id === tripId));
  const addStop = useTripStore((state) => state.addStop);

  const [searchQuery, setSearchQuery] = useState("");

  if (!trip) {
    return <div className="p-10 text-center font-black text-2xl uppercase tracking-widest text-slate-500">Trip not found.</div>;
  }

  const handleAddStop = () => {
    addStop(tripId, {
      id: crypto.randomUUID(),
      city: "New City",
      country: "Country",
      startDate: trip.startDate,
      endDate: trip.endDate,
      order: trip.stops.length,
    });
  };

  return (
    <div className="h-full flex flex-col -m-4 md:-m-8">
      {/* Header */}
      <header className="h-24 bg-white flex items-center justify-between px-8 shrink-0 z-10 shadow-sm border-b border-slate-100 relative">
        <div>
          <h1 className="text-2xl font-bold text-slate-800">{trip.name}</h1>
          <p className="text-sm font-medium text-slate-500 mt-1">{trip.startDate} to {trip.endDate}</p>
        </div>
        <div className="flex items-center gap-4">
          <Link href={`/trips/${tripId}/budget`} className="px-6 py-2.5 text-sm font-bold text-slate-600 bg-slate-50 border border-slate-200 hover:bg-slate-100 rounded-full transition-colors">
            Budget
          </Link>
          <Link href={`/trips/${tripId}/view`} className="px-6 py-2.5 text-sm font-bold text-white bg-slate-900 hover:bg-slate-800 rounded-full transition-colors flex items-center gap-2 shadow-lg">
            View Itinerary <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </header>

      {/* Main Builder Area */}
      <div className="flex-1 flex overflow-hidden">
        {/* Left Sidebar: Timeline & Draggable Stops */}
        <div className="w-96 bg-white flex flex-col z-10 border-r border-slate-100 shadow-[4px_0_24px_rgba(0,0,0,0.02)] relative">
          <div className="p-6">
            <h2 className="font-bold text-slate-800 mb-6 px-2">Itinerary Timeline</h2>
            <button onClick={handleAddStop} className="w-full flex items-center justify-center gap-2 py-3 bg-blue-50 text-blue-600 border border-blue-100 hover:bg-blue-100 rounded-xl font-bold transition-colors">
              <Plus className="w-5 h-5" />
              Add Stop
            </button>
          </div>
          
          <div className="flex-1 overflow-y-auto px-6 pb-6 pt-2 space-y-6">
            {trip.stops.length === 0 ? (
              <div className="text-center py-12 text-slate-500 font-medium bg-slate-50 rounded-2xl border border-slate-100">
                No stops added yet.<br/>Click "Add Stop" to begin.
              </div>
            ) : (
              trip.stops.map((stop, index) => (
                <div key={stop.id} className="bg-white border border-slate-100 shadow-sm rounded-2xl p-5 flex items-start gap-4 group cursor-grab active:cursor-grabbing hover:shadow-md hover:border-blue-100 transition-all">
                  <div className="mt-1 text-slate-300 cursor-grab hover:text-blue-500 transition-colors">
                    <GripVertical className="w-5 h-5" />
                  </div>
                  <div className="flex-1">
                    <div className="flex justify-between items-start mb-2">
                      <h3 className="font-bold text-slate-800 text-lg leading-tight">{stop.city}</h3>
                      <span className="text-xs font-bold text-blue-600 bg-blue-50 px-2.5 py-1 rounded-md">Day {index + 1}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm font-medium text-slate-500">
                      <CalendarIcon className="w-4 h-4" />
                      {stop.startDate}
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Center/Right: Map & Search */}
        <div className="flex-1 flex flex-col relative z-0">
          <div className="absolute top-8 left-8 right-8 z-[1000] max-w-lg bg-white rounded-2xl shadow-lg border border-slate-100 flex items-center px-4 py-2">
            <Search className="w-5 h-5 text-slate-400 mr-3" />
            <input 
              type="text" 
              placeholder="Search cities or activities..."
              className="flex-1 outline-none bg-transparent font-medium py-2 text-slate-800 placeholder-slate-400"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <div className="flex-1 relative z-0">
            {/* Map styling adjusted via CSS typically, but we keep the component */}
            <Map markers={trip.stops.map((s, i) => ({ id: s.id, lat: 20 + i*5, lng: 0 + i*5, label: s.city }))} />
          </div>
        </div>
      </div>
    </div>
  );
}
