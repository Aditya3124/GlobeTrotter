"use client";
import { use, useState, useEffect } from "react";
import Link from "next/link";
import { Calendar, List, ArrowLeft, Clock, DollarSign, MapPin, X } from "lucide-react";
import { useRouter } from "next/navigation";

export default function ItineraryViewPage({ params }: { params: Promise<{ id: string }> }) {
  const router = useRouter();
  const resolvedParams = use(params);
  const tripId = resolvedParams.id;
  
  const [trip, setTrip] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [viewMode, setViewMode] = useState<"list" | "calendar">("list");
  
  // Calendar Modal State
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);

  useEffect(() => {
    fetchTrip();
  }, [tripId]);

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

  if (isLoading) return <div className="p-10 text-center font-bold text-slate-500">Loading trip...</div>;
  if (!trip) return <div className="p-10 text-center font-bold text-2xl uppercase tracking-widest text-slate-500">Trip not found.</div>;

  // Group activities by stop
  const getActivitiesForStop = (stopId: string) => {
    return trip.activities.filter((a: any) => a.cityId === stopId);
  };

  // Calculate total cost for a stop
  const getStopCost = (stopId: string) => {
    return getActivitiesForStop(stopId).reduce((total: number, activity: any) => total + (parseFloat(activity.cost) || 0), 0);
  };

  // --- Calendar Logic ---
  const generateCalendarGrid = () => {
    if (!trip.startDate || !trip.endDate) return [];
    
    const start = new Date(trip.startDate);
    const end = new Date(trip.endDate);
    
    // Adjust to previous Sunday
    const gridStart = new Date(start);
    gridStart.setDate(gridStart.getDate() - gridStart.getDay());
    
    // Adjust to next Saturday
    const gridEnd = new Date(end);
    if (gridEnd.getDay() !== 6) {
      gridEnd.setDate(gridEnd.getDate() + (6 - gridEnd.getDay()));
    }

    const dates = [];
    const current = new Date(gridStart);
    while (current <= gridEnd) {
      dates.push(new Date(current));
      current.setDate(current.getDate() + 1);
    }
    
    return dates;
  };

  const calendarDates = generateCalendarGrid();

  const getStopForDate = (date: Date) => {
    // Zero out time for comparison
    const d = new Date(date.getFullYear(), date.getMonth(), date.getDate()).getTime();
    
    return trip.stops.find((stop: any) => {
      const s = new Date(stop.startDate);
      const e = new Date(stop.endDate);
      const startDay = new Date(s.getFullYear(), s.getMonth(), s.getDate()).getTime();
      const endDay = new Date(e.getFullYear(), e.getMonth(), e.getDate()).getTime();
      return d >= startDay && d <= endDay;
    });
  };
  
  const getActivitiesForDate = (date: Date, stopId: string) => {
    const d = new Date(date.getFullYear(), date.getMonth(), date.getDate()).getTime();
    return trip.activities.filter((a: any) => {
      if (a.cityId !== stopId) return false;
      const actDate = new Date(a.date);
      const aDay = new Date(actDate.getFullYear(), actDate.getMonth(), actDate.getDate()).getTime();
      return d === aDay || d === new Date(trip.startDate).getTime(); // fallback for old seed data
    });
  };

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
        <div className="flex gap-2 bg-white rounded-xl p-1.5 shadow-sm border border-slate-100 shrink-0">
          <button 
            onClick={() => setViewMode("list")}
            className={`flex items-center gap-2 px-6 py-2.5 rounded-lg font-bold text-sm transition-colors ${viewMode === 'list' ? 'bg-slate-50 text-blue-600 border border-slate-200 shadow-sm' : 'text-slate-500 hover:text-slate-800 hover:bg-slate-50'}`}
          >
            <List className="w-4 h-4" /> List
          </button>
          <button 
            onClick={() => setViewMode("calendar")}
            className={`flex items-center gap-2 px-6 py-2.5 rounded-lg font-bold text-sm transition-colors ${viewMode === 'calendar' ? 'bg-slate-50 text-blue-600 border border-slate-200 shadow-sm' : 'text-slate-500 hover:text-slate-800 hover:bg-slate-50'}`}
          >
            <Calendar className="w-4 h-4" /> Calendar
          </button>
        </div>
      </header>

      {viewMode === "list" && (
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
                          <DollarSign className="w-4 h-4" /> {getStopCost(stop.id)} Est.
                        </span>
                      </div>

                      <div className="space-y-4 sm:pl-4">
                        {getActivitiesForStop(stop.id).length === 0 ? (
                          <div className="text-slate-400 text-sm font-medium italic p-2">No activities planned for this stop yet.</div>
                        ) : (
                          getActivitiesForStop(stop.id).map((activity: any) => (
                            <div key={activity.id} className="p-5 rounded-2xl bg-slate-50 border border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-4 hover:shadow-md transition-shadow">
                              <div className="space-y-2">
                                <h4 className="font-bold text-slate-800 text-lg">{activity.name}</h4>
                                <div className="flex items-center gap-2 font-medium text-slate-500 text-sm">
                                  <Clock className="w-4 h-4" /> {activity.duration} • <span className="uppercase text-xs tracking-wider">{activity.type}</span>
                                </div>
                              </div>
                              <span className="font-bold text-slate-700 text-lg flex items-center">
                                <DollarSign className="w-4 h-4 text-teal-500" />{activity.cost}
                              </span>
                            </div>
                          ))
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      )}

      {viewMode === "calendar" && (
        <div className="bg-white rounded-[2.5rem] p-8 shadow-[0_10px_30px_rgba(0,0,0,0.03)] border border-slate-100 mt-8 overflow-x-auto">
          <div className="min-w-[800px]">
            {/* Calendar Header */}
            <div className="grid grid-cols-7 gap-4 mb-4">
              {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map(d => (
                  <div key={d} className="text-center font-bold text-slate-400 text-sm uppercase tracking-wider">{d}</div>
              ))}
            </div>
            
            {/* Calendar Grid */}
            <div className="grid grid-cols-7 gap-4">
              {calendarDates.map((date, i) => {
                const isBeforeTrip = date < new Date(trip.startDate);
                const isAfterTrip = date > new Date(trip.endDate);
                const isPadding = isBeforeTrip || isAfterTrip;
                
                const activeStop = !isPadding ? getStopForDate(date) : null;
                const activities = activeStop ? getActivitiesForDate(date, activeStop.id) : [];

                if (isPadding) {
                  return (
                    <div key={i} className="h-32 rounded-2xl bg-slate-50/50 border border-slate-100/50 p-4 flex flex-col">
                      <span className="font-bold text-slate-300 text-xl">{date.getDate()}</span>
                    </div>
                  );
                }

                if (!activeStop) {
                   return (
                    <div key={i} className="h-32 rounded-2xl bg-white border border-slate-100 p-4 flex flex-col">
                      <span className="font-bold text-slate-700 text-xl">{date.getDate()}</span>
                      <div className="mt-auto text-xs text-slate-400 font-medium italic">Travel Day</div>
                    </div>
                  );
                }

                return (
                  <div 
                    key={i} 
                    onClick={() => setSelectedDate(date)}
                    className="h-32 rounded-2xl bg-blue-50 border-2 border-blue-200 p-4 hover:shadow-lg hover:-translate-y-1 transition-all cursor-pointer flex flex-col group relative overflow-hidden"
                  >
                      <div className="absolute top-0 right-0 w-16 h-16 bg-blue-500/5 rounded-bl-full -z-10 group-hover:scale-110 transition-transform"></div>
                      <span className="font-bold text-blue-800 text-xl">{date.getDate()}</span>
                      <div className="mt-auto">
                        <div className="text-sm font-bold text-blue-600 truncate">{activeStop.city}</div>
                        <div className="mt-1 text-[11px] font-bold text-white bg-blue-500 px-2 py-0.5 rounded-md inline-block">
                          {activities.length} activities
                        </div>
                      </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}

      {/* Date Detail Modal */}
      {selectedDate && (
        <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4 sm:p-6 bg-slate-900/40 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-white rounded-[2rem] w-full max-w-lg shadow-2xl overflow-hidden flex flex-col max-h-[85vh]">
            <div className="px-8 py-6 border-b border-slate-100 flex items-center justify-between sticky top-0 bg-white/95 backdrop-blur z-10">
              <div>
                <h2 className="text-2xl font-extrabold text-slate-800">
                  {selectedDate.toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' })}
                </h2>
                {getStopForDate(selectedDate) && (
                  <p className="text-blue-600 font-bold flex items-center gap-1.5 mt-1">
                    <MapPin className="w-4 h-4" /> {getStopForDate(selectedDate).city}
                  </p>
                )}
              </div>
              <button onClick={() => setSelectedDate(null)} className="p-2.5 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-full transition-colors">
                <X className="w-6 h-6" />
              </button>
            </div>
            
            <div className="p-8 overflow-y-auto">
              {(() => {
                const stop = getStopForDate(selectedDate);
                if (!stop) return <p className="text-slate-500 font-medium text-center">No activities planned for this day.</p>;
                
                const activities = getActivitiesForDate(selectedDate, stop.id);
                if (activities.length === 0) return <p className="text-slate-500 font-medium text-center italic">Free day! No activities planned yet.</p>;

                return (
                  <div className="space-y-4">
                    {activities.map((activity: any) => (
                      <div key={activity.id} className="p-5 rounded-2xl bg-slate-50 border border-slate-100 flex items-center justify-between gap-4">
                        <div className="space-y-1.5">
                          <h4 className="font-bold text-slate-800 text-lg">{activity.name}</h4>
                          <div className="flex items-center gap-2 font-medium text-slate-500 text-sm">
                            <Clock className="w-4 h-4" /> {activity.duration} • <span className="uppercase text-[10px] font-bold tracking-wider">{activity.type}</span>
                          </div>
                        </div>
                        <span className="font-extrabold text-slate-700 text-lg flex items-center">
                          <DollarSign className="w-4 h-4 text-teal-500" />{activity.cost}
                        </span>
                      </div>
                    ))}
                  </div>
                );
              })()}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
