"use client";
import { useState, use } from "react";
import { useTripStore, Stop } from "@/store/useTripStore";
import { Search, Plus, GripVertical, Calendar as CalendarIcon, ArrowRight, MapPin } from "lucide-react";
import Link from "next/link";
import dynamic from "next/dynamic";

import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  DragEndEvent
} from '@dnd-kit/core';
import {
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
  useSortable
} from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { Activity } from "@/store/useTripStore";

const Map = dynamic(() => import("@/components/Map"), { ssr: false });

function SortableStopItem({ stop, index, activities, onAddActivity }: { stop: Stop, index: number, activities: Activity[], onAddActivity: (cityId: string) => void }) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: stop.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    zIndex: isDragging ? 999 : 1,
    opacity: isDragging ? 0.8 : 1,
    position: 'relative' as const,
  };

  return (
    <div ref={setNodeRef} style={style} className="bg-white border border-slate-100 shadow-[0_4px_20px_rgba(0,0,0,0.02)] rounded-[1.5rem] p-5 flex items-start gap-4 group cursor-default hover:shadow-md hover:border-blue-100 transition-all">
      <div 
        className="mt-1 text-slate-300 cursor-grab active:cursor-grabbing hover:text-blue-500 transition-colors p-1 -ml-2 rounded-md hover:bg-slate-50"
        {...attributes} 
        {...listeners}
      >
        <GripVertical className="w-5 h-5" />
      </div>
      <div className="flex-1">
        <div className="flex justify-between items-start mb-3">
          <h3 className="font-bold text-slate-800 text-lg leading-tight flex items-center gap-2">
            <MapPin className="w-4 h-4 text-rose-500" />
            {stop.city}
          </h3>
          <span className="text-xs font-bold text-blue-600 bg-blue-50 px-2.5 py-1 rounded-md shrink-0">Day {index + 1}</span>
        </div>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 text-sm font-medium text-slate-500">
            <CalendarIcon className="w-4 h-4" />
            {stop.startDate}
          </div>
          <button onClick={() => onAddActivity(stop.id)} className="text-xs font-bold text-slate-400 hover:text-blue-600 transition-colors px-3 py-1.5 rounded-lg bg-slate-50 hover:bg-blue-50">
            + Activity
          </button>
        </div>
        
        {activities.length > 0 && (
          <div className="mt-4 space-y-2">
            {activities.map(activity => (
              <div key={activity.id} className="bg-slate-50 rounded-lg p-2.5 flex justify-between items-center text-sm border border-slate-100 shadow-sm group-hover:border-blue-50 transition-colors">
                <span className="font-semibold text-slate-700 truncate pr-2">{activity.name}</span>
                <span className="text-slate-400 font-bold shrink-0">${activity.cost}</span>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default function ItineraryBuilderPage({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = use(params);
  const tripId = resolvedParams.id;
  const trip = useTripStore((state) => state.trips.find(t => t.id === tripId));
  const addStop = useTripStore((state) => state.addStop);
  const reorderStops = useTripStore((state) => state.reorderStops);
  const addActivity = useTripStore((state) => state.addActivity);

  const [searchQuery, setSearchQuery] = useState("");
  const [isAddingStop, setIsAddingStop] = useState(false);
  const [newStopCity, setNewStopCity] = useState("");

  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 5 } }),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  if (!trip) {
    return <div className="p-10 text-center font-black text-2xl uppercase tracking-widest text-slate-500">Trip not found.</div>;
  }

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    if (over && active.id !== over.id) {
      const oldIndex = trip.stops.findIndex(s => s.id === active.id);
      const newIndex = trip.stops.findIndex(s => s.id === over.id);
      reorderStops(tripId, oldIndex, newIndex);
    }
  };

  const handleAddStopSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newStopCity.trim()) return;
    addStop(tripId, {
      id: crypto.randomUUID(),
      city: newStopCity.trim(),
      country: "",
      startDate: trip.startDate,
      endDate: trip.endDate,
      order: trip.stops.length,
    });
    setNewStopCity("");
    setIsAddingStop(false);
  };

  const handleAddActivity = (cityId: string) => {
    addActivity(tripId, {
      id: crypto.randomUUID(),
      name: "New Excursion",
      type: "sightseeing",
      cost: Math.floor(Math.random() * 100),
      duration: "2 hours",
      date: null,
      cityId: cityId,
      order: 0,
    });
  };

  return (
    <div className="h-full flex flex-col -m-4 md:-m-8">
      {/* Header */}
      <header className="h-24 bg-white flex items-center justify-between px-8 shrink-0 z-[50] shadow-sm border-b border-slate-100 relative">
        <div>
          <h1 className="text-2xl font-bold text-slate-800">{trip.name}</h1>
          <p className="text-sm font-medium text-slate-500 mt-1">{trip.startDate} to {trip.endDate}</p>
        </div>
        <div className="flex items-center gap-4">
          <Link href={`/trips/${tripId}/view`} className="px-6 py-2.5 text-sm font-bold text-white bg-slate-900 hover:bg-slate-800 rounded-full transition-colors flex items-center gap-2 shadow-lg">
            View Itinerary <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </header>

      {/* Main Builder Area */}
      <div className="flex-1 flex overflow-hidden">
        {/* Left Sidebar: Timeline & Draggable Stops */}
        <div className="w-[28rem] bg-slate-50/50 flex flex-col z-[40] border-r border-slate-200 relative">
          <div className="p-6 bg-white border-b border-slate-100 shadow-sm z-10">
            <h2 className="font-bold text-slate-800 mb-4 px-2 text-xl">Itinerary Timeline</h2>
            {!isAddingStop ? (
              <button onClick={() => setIsAddingStop(true)} className="w-full flex items-center justify-center gap-2 py-3.5 bg-blue-600 text-white hover:bg-blue-700 rounded-2xl font-bold transition-colors shadow-md hover:shadow-lg">
                <Plus className="w-5 h-5" />
                Add Stop
              </button>
            ) : (
              <form onSubmit={handleAddStopSubmit} className="bg-slate-50 p-4 rounded-2xl border border-slate-200">
                <input
                  type="text"
                  placeholder="Enter city name..."
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200 mb-3"
                  value={newStopCity}
                  onChange={(e) => setNewStopCity(e.target.value)}
                  autoFocus
                />
                <div className="flex gap-2">
                  <button type="button" onClick={() => setIsAddingStop(false)} className="flex-1 py-2 font-bold text-slate-500 hover:text-slate-700 hover:bg-slate-200 rounded-xl transition-colors">
                    Cancel
                  </button>
                  <button type="submit" className="flex-1 py-2 font-bold text-white bg-blue-600 hover:bg-blue-700 rounded-xl transition-colors">
                    Add
                  </button>
                </div>
              </form>
            )}
          </div>
          
          <div className="flex-1 overflow-y-auto px-6 pb-24 pt-6">
            {trip.stops.length === 0 ? (
              <div className="text-center py-16 text-slate-500 font-medium bg-white rounded-3xl border border-slate-100 shadow-sm">
                No stops added yet.<br/>Click "Add Stop" to begin.
              </div>
            ) : (
              <DndContext 
                sensors={sensors}
                collisionDetection={closestCenter}
                onDragEnd={handleDragEnd}
              >
                <SortableContext 
                  items={trip.stops.map(s => s.id)}
                  strategy={verticalListSortingStrategy}
                >
                  <div className="space-y-4">
                    {trip.stops.map((stop, index) => (
                      <SortableStopItem 
                        key={stop.id} 
                        stop={stop} 
                        index={index} 
                        activities={trip.activities.filter(a => a.cityId === stop.id)}
                        onAddActivity={handleAddActivity}
                      />
                    ))}
                  </div>
                </SortableContext>
              </DndContext>
            )}
          </div>
        </div>

        {/* Center/Right: Map & Search */}
        <div className="flex-1 flex flex-col relative z-0">
          <div className="absolute top-6 left-1/2 -translate-x-1/2 z-[1000] w-full max-w-md bg-white rounded-2xl shadow-xl border border-slate-100 flex items-center px-4 py-1">
            <Search className="w-5 h-5 text-slate-400 mr-3 shrink-0" />
            <input 
              type="text" 
              placeholder="Search cities to add..."
              className="flex-1 outline-none bg-transparent font-medium py-3 text-slate-800 placeholder-slate-400"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <div className="flex-1 relative z-0">
            {/* The markers coordinates are slightly altered to prevent them from stacking entirely if we keep adding "New City" */}
            <Map markers={trip.stops.map((s, i) => ({ id: s.id, lat: 48.8566 + (i * 2), lng: 2.3522 + (i * 2), label: s.city }))} />
          </div>
        </div>
      </div>
    </div>
  );
}
