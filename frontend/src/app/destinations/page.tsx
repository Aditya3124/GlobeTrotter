import Link from "next/link";
import { Search, ChevronDown, Filter, Plus, Image as ImageIcon, Star, MapPin, ArrowLeft } from "lucide-react";

async function getAllCities() {
  try {
    const res = await fetch('http://localhost:5000/api/cities/all', { cache: 'no-store' });
    if (!res.ok) return [];
    return res.json();
  } catch (error) {
    console.error(error);
    return [];
  }
}

export default async function DestinationsPage() {
  const cities = await getAllCities();

  return (
    <div className="max-w-6xl mx-auto space-y-12 pb-24 relative min-h-full">
      <header className="flex flex-col sm:flex-row sm:items-center justify-between gap-6 pt-8">
        <div>
          <Link href="/" className="inline-flex items-center gap-2 text-sm font-bold text-slate-500 hover:text-slate-800 transition-colors mb-4">
            <ArrowLeft className="w-4 h-4" /> Back to Dashboard
          </Link>
          <h1 className="text-4xl md:text-5xl font-extrabold text-slate-800">Global Destinations</h1>
          <p className="text-slate-500 font-medium mt-2">Explore the most popular cities around the world.</p>
        </div>
      </header>

      {/* Floating Search Bar */}
      <div className="bg-white rounded-[2rem] shadow-[0_20px_50px_rgba(163,177,198,0.4)] p-6 flex flex-col md:flex-row items-center justify-between gap-6 border border-slate-100">
        <div className="relative flex-1 w-full">
          <Search className="absolute left-5 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
          <input 
            type="text" 
            placeholder="Search for a city or country..." 
            className="w-full pl-14 pr-6 py-4 bg-slate-50 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500/20 text-slate-700 shadow-sm font-medium transition-colors" 
          />
        </div>
        <button className="px-8 py-4 bg-slate-900 rounded-xl text-white font-bold hover:bg-slate-800 transition-colors shrink-0 shadow-lg w-full md:w-auto">
          Search Cities
        </button>
      </div>

      {/* Destinations Grid */}
      <div className="space-y-6 pt-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {cities.length > 0 ? cities.map((city: any, i: number) => {
            const imagePool = ["/images/cityscape.jpg", "/images/nature.jpg", "/images/culture.jpg", "/images/paris.jpg"];
            const imgUrl = imagePool[i % imagePool.length];
            return (
            <div key={city.id} className="bg-white rounded-[2rem] p-4 flex flex-col gap-4 group cursor-pointer shadow-[0_12px_30px_rgba(0,0,0,0.05)] border border-slate-100 hover:shadow-[0_20px_40px_rgba(0,0,0,0.08)] transition-all duration-300 hover:-translate-y-1">
              <div className="w-full h-40 bg-slate-100 rounded-2xl overflow-hidden relative">
                <img src={imgUrl} alt={city.city} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
              </div>
              <div className="px-2 pb-2">
                <div className="flex justify-between items-start mb-2 gap-2">
                  <h3 className="text-xl font-bold text-slate-800 group-hover:text-blue-500 transition-colors line-clamp-1">{city.city}</h3>
                  <div className="flex items-center gap-1 bg-amber-50 px-2 py-1 rounded-lg shrink-0">
                    <Star className="w-3 h-3 text-amber-500 fill-amber-500" />
                    <span className="text-xs font-bold text-amber-700">4.9</span>
                  </div>
                </div>
                <div className="flex items-center gap-2 text-slate-500 text-sm font-bold">
                   <MapPin className="w-3.5 h-3.5 text-blue-500" /> {city.country}
                </div>
                <p className="text-slate-400 text-xs font-semibold mt-3 uppercase tracking-wider">Pop: {parseInt(city.population).toLocaleString()}</p>
              </div>
            </div>
            );
          }) : (
            <div className="col-span-full text-center py-20 text-slate-500 font-bold text-lg bg-white rounded-[3rem] border border-slate-100 shadow-sm">
              No destinations found in the catalog.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
