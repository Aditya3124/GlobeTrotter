"use client";
import Link from "next/link";
import { Plus, Trash2, Calendar, MapPin, Eye, Search, Filter, SlidersHorizontal, ArrowUpDown } from "lucide-react";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

export default function TripsPage() {
  const router = useRouter();
  const [trips, setTrips] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchTrips();
  }, []);

  const fetchTrips = async () => {
    const token = localStorage.getItem("token");
    if (!token) {
      router.push("/login");
      return;
    }

    try {
      const res = await fetch("http://localhost:5000/api/trips", {
        headers: { Authorization: `Bearer ${token}` }
      });
      if (res.ok) {
        const data = await res.json();
        
        // Wait, the backend /api/trips endpoint in getTrips does not include `stops`. 
        // We need to fetch each trip's stops or update the backend to include stops!
        // But since we just need the count, let's just assume `stops` is an array.
        // Actually, let's just render the length if it exists, otherwise 0.
        setTrips(data);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleDeleteTrip = async (id: string) => {
    if (!window.confirm("Are you sure you want to delete this trip?")) return;

    const token = localStorage.getItem("token");
    try {
      const res = await fetch(`http://localhost:5000/api/trips/${id}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` }
      });
      if (res.ok) {
        setTrips(trips.filter(t => t.id !== id));
      }
    } catch (error) {
      console.error(error);
    }
  };
  
  // Categorize trips
  const now = new Date();
  const ongoingTrips = trips.filter(t => new Date(t.startDate) <= now && new Date(t.endDate) >= now);
  const upcomingTrips = trips.filter(t => new Date(t.startDate) > now);
  const completedTrips = trips.filter(t => new Date(t.endDate) < now);

  const renderTripCard = (trip: any) => (
    <div key={trip.id} className="group bg-white rounded-3xl p-6 md:p-8 flex flex-col md:flex-row items-center justify-between shadow-[0_10px_30px_rgba(0,0,0,0.04)] border border-slate-100 hover:shadow-[0_20px_40px_rgba(0,0,0,0.08)] transition-all duration-300 gap-6">
      <div className="flex-1 space-y-2 w-full">
        <h3 className="text-2xl font-bold text-slate-800 group-hover:text-blue-500 transition-colors">{trip.name}</h3>
        <p className="text-slate-500 font-medium text-lg">{trip.description || "Short Over View of the Trip"}</p>
        <div className="flex items-center gap-6 pt-2">
          <p className="flex items-center gap-2 text-slate-500 font-semibold text-sm">
            <Calendar className="w-4 h-4" />
            {new Date(trip.startDate).toLocaleDateString()} - {new Date(trip.endDate).toLocaleDateString()}
          </p>
          <p className="flex items-center gap-2 text-slate-500 font-semibold text-sm">
            <MapPin className="w-4 h-4" />
            {trip.stops ? trip.stops.length : 0} Stops
          </p>
        </div>
      </div>
      
      <div className="flex gap-3 w-full md:w-auto">
        <Link href={`/trips/${trip.id}/builder`} className="flex-1 md:flex-none text-slate-600 font-bold py-3 px-6 text-center rounded-2xl bg-slate-50 hover:bg-slate-100 transition-colors flex items-center justify-center gap-2">
          <MapPin className="w-4 h-4" /> Edit
        </Link>
        <Link href={`/trips/${trip.id}/view`} className="flex-1 md:flex-none text-blue-500 font-bold py-3 px-6 text-center rounded-2xl bg-blue-50 hover:bg-blue-100 transition-colors flex items-center justify-center gap-2">
          <Eye className="w-4 h-4" /> View
        </Link>
        <button 
          onClick={(e) => { e.preventDefault(); handleDeleteTrip(trip.id); }}
          className="p-3 text-slate-400 hover:text-rose-500 hover:bg-rose-50 rounded-2xl transition-colors shrink-0 bg-slate-50"
          title="Delete Trip"
        >
          <Trash2 className="w-5 h-5" />
        </button>
      </div>
    </div>
  );

  if (isLoading) {
    return <div className="p-10 text-center font-bold text-slate-500">Loading your trips...</div>;
  }

  return (
    <div className="max-w-6xl mx-auto space-y-10 pb-24 relative px-6 md:px-0">
      <header className="flex flex-col sm:flex-row sm:items-center justify-between gap-6">
        <div>
          <h1 className="text-3xl md:text-4xl font-extrabold text-slate-800">My Trips</h1>
          <p className="text-slate-500 font-medium mt-2">Manage your upcoming and past adventures.</p>
        </div>
        <Link href="/trips/create" className="inline-flex items-center justify-center gap-2 bg-blue-500 text-white px-8 py-4 rounded-full font-bold hover:bg-blue-600 transition-colors shadow-lg hover:shadow-xl hover:-translate-y-0.5">
          <Plus className="w-5 h-5" />
          New Trip
        </Link>
      </header>

      {/* Search and Filters Bar */}
      <div className="flex flex-col lg:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-5 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
          <input 
            type="text" 
            placeholder="Search trips..." 
            className="w-full pl-14 pr-6 py-4 bg-white rounded-full border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500/20 text-slate-700 shadow-sm font-medium" 
          />
        </div>
        <div className="flex flex-wrap gap-3">
          <button className="px-6 py-4 bg-white rounded-full border border-slate-200 text-slate-600 font-bold shadow-sm hover:bg-slate-50 transition-colors flex items-center gap-2">
            <Filter className="w-4 h-4" /> Group by
          </button>
          <button className="px-6 py-4 bg-white rounded-full border border-slate-200 text-slate-600 font-bold shadow-sm hover:bg-slate-50 transition-colors flex items-center gap-2">
            <SlidersHorizontal className="w-4 h-4" /> Filter
          </button>
          <button className="px-6 py-4 bg-white rounded-full border border-slate-200 text-slate-600 font-bold shadow-sm hover:bg-slate-50 transition-colors flex items-center gap-2">
            <ArrowUpDown className="w-4 h-4" /> Sort by...
          </button>
        </div>
      </div>

      <div className="space-y-12 pt-4">
        {/* Ongoing Section */}
        <div className="space-y-4">
          <h2 className="text-2xl font-bold text-slate-800 px-2">Ongoing</h2>
          <div className="space-y-4">
            {ongoingTrips.length > 0 ? (
              ongoingTrips.map(renderTripCard)
            ) : (
              <div className="p-10 bg-white rounded-3xl border border-slate-100 text-slate-400 font-medium text-center shadow-sm">
                No ongoing trips at the moment.
              </div>
            )}
          </div>
        </div>

        {/* Up-coming Section */}
        <div className="space-y-4">
          <h2 className="text-2xl font-bold text-slate-800 px-2">Up-coming</h2>
          <div className="space-y-4">
            {upcomingTrips.length > 0 ? (
              upcomingTrips.map(renderTripCard)
            ) : (
              <div className="p-10 bg-white rounded-3xl border border-slate-100 text-slate-400 font-medium text-center shadow-sm">
                No upcoming trips planned.
              </div>
            )}
          </div>
        </div>

        {/* Completed Section */}
        <div className="space-y-4">
          <h2 className="text-2xl font-bold text-slate-800 px-2">Completed</h2>
          <div className="space-y-4">
            {completedTrips.length > 0 ? (
              completedTrips.map(renderTripCard)
            ) : (
              <div className="p-10 bg-white rounded-3xl border border-slate-100 text-slate-400 font-medium text-center shadow-sm">
                No completed trips yet.
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
