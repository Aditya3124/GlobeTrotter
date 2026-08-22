"use client";
import { useState, useEffect, use } from "react";
import { Search, Plus, GripVertical, Calendar as CalendarIcon, ArrowRight, MapPin, X, Trash2 } from "lucide-react";
import Link from "next/link";
import dynamic from "next/dynamic";
import { useRouter } from "next/navigation";

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

const Map = dynamic(() => import("@/components/Map"), { ssr: false });

function SortableStopItem({ stop, index, activities, onOpenActivityModal, onDeleteStop }: { stop: any, index: number, activities: any[], onOpenActivityModal: (cityId: string) => void, onDeleteStop: (stopId: string) => void }) {
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
            {stop.city}, {stop.country}
          </h3>
          <span className="text-xs font-bold text-blue-600 bg-blue-50 px-2.5 py-1 rounded-md shrink-0">Day {index + 1}</span>
        </div>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 text-sm font-medium text-slate-500">
            <CalendarIcon className="w-4 h-4" />
            {new Date(stop.startDate).toLocaleDateString()}
          </div>
          <div className="flex items-center gap-2">
            <button onClick={() => onDeleteStop(stop.id)} className="p-1.5 text-slate-300 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors" title="Delete Stop">
              <Trash2 className="w-4 h-4" />
            </button>
            <button onClick={() => onOpenActivityModal(stop.id)} className="text-xs font-bold text-slate-400 hover:text-blue-600 transition-colors px-3 py-1.5 rounded-lg bg-slate-50 hover:bg-blue-50">
              + Activity
            </button>
          </div>
        </div>
        
        {activities && activities.length > 0 && (
          <div className="mt-4 space-y-2">
            {activities.map(activity => (
              <div key={activity.id} className="bg-slate-50 rounded-lg p-2.5 flex justify-between items-center text-sm border border-slate-100 shadow-sm group-hover:border-blue-50 transition-colors">
                <span className="font-semibold text-slate-700 truncate pr-2 flex flex-col">
                  {activity.name}
                  <span className="text-[10px] text-slate-400 uppercase tracking-wide">{activity.type} • {activity.duration}</span>
                </span>
                <span className="text-blue-500 font-bold shrink-0">${activity.cost}</span>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default function ItineraryBuilderPage({ params }: { params: Promise<{ id: string }> }) {
  const router = useRouter();
  const resolvedParams = use(params);
  const tripId = resolvedParams.id;
  
  const [trip, setTrip] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  
  const [isAddingStop, setIsAddingStop] = useState(false);
  const [cityQuery, setCityQuery] = useState("");
  const [cityResults, setCityResults] = useState<any[]>([]);
  const [selectedCity, setSelectedCity] = useState<any>(null);
  const [isSearching, setIsSearching] = useState(false);

  // Activity Modal State
  const [isActivityModalOpen, setIsActivityModalOpen] = useState(false);
  const [selectedCityId, setSelectedCityId] = useState<string | null>(null);
  const [activityForm, setActivityForm] = useState({
    name: "",
    type: "Sightseeing",
    cost: "",
    duration: ""
  });
  const [isSubmittingActivity, setIsSubmittingActivity] = useState(false);

  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 5 } }),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  useEffect(() => {
    fetchTrip();
  }, [tripId]);

  // Debounced City Search
  useEffect(() => {
    if (cityQuery.trim().length < 2) {
      setCityResults([]);
      return;
    }
    
    setIsSearching(true);
    const timer = setTimeout(async () => {
      const token = localStorage.getItem("token");
      try {
        const res = await fetch(`http://localhost:5000/api/cities/search?q=${encodeURIComponent(cityQuery)}`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        if (res.ok) {
          const data = await res.json();
          setCityResults(data);
        }
      } catch (error) {
        console.error(error);
      } finally {
        setIsSearching(false);
      }
    }, 400);

    return () => clearTimeout(timer);
  }, [cityQuery]);

  const fetchTrip = async () => {
    const token = localStorage.getItem("token");
    if (!token) {
      router.push("/login");
      return;
    }

    try {
      const res = await fetch(`http://localhost:5000/api/trips/${tripId}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      if (res.ok) {
        const data = await res.json();
        setTrip(data);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return <div className="p-10 text-center font-bold text-slate-500">Loading trip...</div>;
  }

  if (!trip) {
    return <div className="p-10 text-center font-black text-2xl uppercase tracking-widest text-slate-500">Trip not found.</div>;
  }

  const handleDragEnd = async (event: DragEndEvent) => {
    const { active, over } = event;
    if (over && active.id !== over.id) {
      console.log("Reorder not synced to backend in this version.");
    }
  };

  const handleAddStopSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedCity) return;
    
    const token = localStorage.getItem("token");
    try {
      const res = await fetch(`http://localhost:5000/api/trips/${tripId}/stops`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({
          city: selectedCity.city,
          country: selectedCity.country,
          latitude: selectedCity.latitude,
          longitude: selectedCity.longitude,
          startDate: trip.startDate,
          endDate: trip.endDate,
          order: trip.stops.length,
        })
      });

      if (res.ok) {
        const newStop = await res.json();
        setTrip({ ...trip, stops: [...trip.stops, newStop] });
        setSelectedCity(null);
        setCityQuery("");
        setIsAddingStop(false);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleOpenActivityModal = (cityId: string) => {
    setSelectedCityId(cityId);
    setActivityForm({ name: "", type: "Sightseeing", cost: "", duration: "" });
    setIsActivityModalOpen(true);
  };

  const handleActivitySubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedCityId || !activityForm.name) return;

    setIsSubmittingActivity(true);
    const token = localStorage.getItem("token");
    
    try {
      const res = await fetch(`http://localhost:5000/api/trips/${tripId}/activities`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({
          name: activityForm.name,
          type: activityForm.type,
          cost: parseFloat(activityForm.cost) || 0,
          duration: activityForm.duration,
          date: trip.startDate,
          cityId: selectedCityId,
          order: trip.activities.filter((a:any) => a.cityId === selectedCityId).length,
        })
      });

      if (res.ok) {
        const newActivity = await res.json();
        setTrip({ ...trip, activities: [...trip.activities, newActivity] });
        setIsActivityModalOpen(false);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setIsSubmittingActivity(false);
    }
  };

  const handleDeleteStop = async (stopId: string) => {
    if (!window.confirm("Are you sure you want to delete this stop?")) return;
    
    const token = localStorage.getItem("token");
    try {
      const res = await fetch(`http://localhost:5000/api/stops/${stopId}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` }
      });

      if (res.ok) {
        setTrip({ ...trip, stops: trip.stops.filter((s: any) => s.id !== stopId) });
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="h-full flex flex-col -m-4 md:-m-8">
      {/* Header */}
      <header className="h-24 bg-white flex items-center justify-between px-8 shrink-0 z-[50] shadow-sm border-b border-slate-100 relative">
        <div>
          <h1 className="text-2xl font-bold text-slate-800">{trip.name}</h1>
          <p className="text-sm font-medium text-slate-500 mt-1">{new Date(trip.startDate).toLocaleDateString()} to {new Date(trip.endDate).toLocaleDateString()}</p>
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
              <form onSubmit={handleAddStopSubmit} className="bg-white p-5 rounded-2xl border border-slate-200 shadow-lg relative">
                {!selectedCity ? (
                  <div className="relative">
                    <input
                      type="text"
                      placeholder="Search for a city..."
                      className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200 font-medium text-slate-800"
                      value={cityQuery}
                      onChange={(e) => setCityQuery(e.target.value)}
                      autoFocus
                    />
                    {isSearching && (
                      <div className="absolute right-3 top-1/2 -translate-y-1/2 text-xs font-bold text-slate-400">Searching...</div>
                    )}
                    
                    {cityResults.length > 0 && (
                      <div className="absolute top-full left-0 right-0 mt-2 bg-white border border-slate-100 shadow-xl rounded-xl overflow-hidden z-50 max-h-60 overflow-y-auto">
                        {cityResults.map(city => (
                          <div 
                            key={city.id} 
                            className="px-4 py-3 hover:bg-slate-50 cursor-pointer border-b border-slate-50 last:border-0 transition-colors"
                            onClick={() => setSelectedCity(city)}
                          >
                            <div className="font-bold text-slate-800">{city.city}</div>
                            <div className="text-xs text-slate-500 font-medium">{city.country}</div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                ) : (
                  <div className="bg-blue-50 border border-blue-100 p-4 rounded-xl mb-4 flex items-center justify-between">
                    <div>
                      <div className="font-bold text-blue-900">{selectedCity.city}</div>
                      <div className="text-xs text-blue-600 font-medium">{selectedCity.country}</div>
                    </div>
                    <button type="button" onClick={() => setSelectedCity(null)} className="p-2 hover:bg-blue-100 rounded-full text-blue-500 transition-colors">
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                )}
                
                <div className="flex gap-3 mt-4">
                  <button type="button" onClick={() => { setIsAddingStop(false); setSelectedCity(null); setCityQuery(""); }} className="flex-1 py-2.5 font-bold text-slate-500 hover:text-slate-700 hover:bg-slate-100 rounded-xl transition-colors">
                    Cancel
                  </button>
                  <button type="submit" disabled={!selectedCity} className="flex-1 py-2.5 font-bold text-white bg-blue-600 hover:bg-blue-700 rounded-xl transition-colors disabled:opacity-50 disabled:hover:bg-blue-600 shadow-sm">
                    Add Stop
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
                  items={trip.stops.map((s: any) => s.id)}
                  strategy={verticalListSortingStrategy}
                >
                  <div className="space-y-4">
                    {trip.stops.map((stop: any, index: number) => (
                      <SortableStopItem 
                        key={stop.id} 
                        stop={stop} 
                        index={index} 
                        activities={trip.activities.filter((a: any) => a.cityId === stop.id)}
                        onOpenActivityModal={handleOpenActivityModal}
                        onDeleteStop={handleDeleteStop}
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
          <div className="flex-1 relative z-0">
            {/* Real Map Coordinates applied! */}
            <Map markers={trip.stops.map((s: any, i: number) => ({ 
              id: s.id, 
              lat: s.latitude || (48.8566 + (i * 2)), // Fallback for old stops
              lng: s.longitude || (2.3522 + (i * 2)), 
              label: s.city 
            }))} />
          </div>
        </div>
      </div>

      {/* Activity Modal */}
      {isActivityModalOpen && (
        <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4 sm:p-6 bg-slate-900/40 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-white rounded-3xl w-full max-w-md shadow-2xl overflow-hidden">
            <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between">
              <h2 className="text-xl font-bold text-slate-800">Add Activity</h2>
              <button onClick={() => setIsActivityModalOpen(false)} className="p-2 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-full transition-colors">
                <X className="w-5 h-5" />
              </button>
            </div>
            
            <form onSubmit={handleActivitySubmit} className="p-6 space-y-5">
              <div className="space-y-1.5">
                <label className="text-sm font-bold text-slate-700">Activity Name</label>
                <input 
                  type="text"
                  required
                  placeholder="e.g. Louvre Museum"
                  className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all font-medium text-slate-800"
                  value={activityForm.name}
                  onChange={e => setActivityForm({...activityForm, name: e.target.value})}
                  autoFocus
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-sm font-bold text-slate-700">Type</label>
                  <select 
                    className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all font-medium text-slate-800 appearance-none cursor-pointer"
                    value={activityForm.type}
                    onChange={e => setActivityForm({...activityForm, type: e.target.value})}
                  >
                    <option value="Sightseeing">Sightseeing</option>
                    <option value="Food & Dining">Food & Dining</option>
                    <option value="Transit">Transit</option>
                    <option value="Accommodation">Accommodation</option>
                    <option value="Other">Other</option>
                  </select>
                </div>

                <div className="space-y-1.5">
                  <label className="text-sm font-bold text-slate-700">Cost ($)</label>
                  <input 
                    type="number"
                    min="0"
                    step="0.01"
                    placeholder="0.00"
                    className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all font-medium text-slate-800"
                    value={activityForm.cost}
                    onChange={e => setActivityForm({...activityForm, cost: e.target.value})}
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-sm font-bold text-slate-700">Duration</label>
                <input 
                  type="text"
                  placeholder="e.g. 2 hours"
                  className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all font-medium text-slate-800"
                  value={activityForm.duration}
                  onChange={e => setActivityForm({...activityForm, duration: e.target.value})}
                />
              </div>

              <div className="pt-4 flex gap-3">
                <button 
                  type="button" 
                  onClick={() => setIsActivityModalOpen(false)}
                  className="flex-1 py-3 font-bold text-slate-500 hover:text-slate-700 hover:bg-slate-100 rounded-xl transition-colors"
                >
                  Cancel
                </button>
                <button 
                  type="submit" 
                  disabled={isSubmittingActivity}
                  className="flex-1 py-3 font-bold text-white bg-blue-600 hover:bg-blue-700 rounded-xl transition-colors disabled:opacity-50"
                >
                  {isSubmittingActivity ? "Saving..." : "Save Activity"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
