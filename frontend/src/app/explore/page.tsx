import { Search, SlidersHorizontal, ListFilter, ArrowDownUp, MapPin } from "lucide-react";

export default function ExplorePage() {
  return (
    <div className="max-w-6xl mx-auto space-y-8 pb-24">
      {/* Search Bar & Filters */}
      <div className="flex flex-col md:flex-row gap-4 items-center bg-white p-4 rounded-3xl shadow-[0_10px_30px_rgba(0,0,0,0.02)] border border-slate-100">
        <div className="flex-1 w-full relative">
          <Search className="absolute left-6 top-1/2 -translate-y-1/2 w-6 h-6 text-slate-400" />
          <input 
            type="text" 
            placeholder="Paragliding, Paris, Museums..." 
            className="w-full bg-slate-50 border-none rounded-2xl py-5 pl-16 pr-6 text-lg font-semibold text-slate-800 placeholder-slate-400 focus:ring-4 focus:ring-blue-500/20 focus:bg-white outline-none transition-all"
          />
        </div>
        
        <div className="flex w-full md:w-auto gap-3">
          <button className="flex-1 md:flex-none flex items-center justify-center gap-2 px-6 py-5 bg-slate-50 hover:bg-slate-100 text-slate-600 rounded-2xl font-bold transition-colors">
            <ListFilter className="w-5 h-5" /> Group by
          </button>
          <button className="flex-1 md:flex-none flex items-center justify-center gap-2 px-6 py-5 bg-slate-50 hover:bg-slate-100 text-slate-600 rounded-2xl font-bold transition-colors">
            <SlidersHorizontal className="w-5 h-5" /> Filter
          </button>
          <button className="flex-1 md:flex-none flex items-center justify-center gap-2 px-6 py-5 bg-slate-50 hover:bg-slate-100 text-slate-600 rounded-2xl font-bold transition-colors">
            <ArrowDownUp className="w-5 h-5" /> Sort by...
          </button>
        </div>
      </div>

      {/* Results Header */}
      <div className="pt-4">
        <h2 className="text-3xl font-black text-slate-800 px-2">Results</h2>
      </div>

      {/* Results List */}
      <div className="space-y-4">
        {[1, 2, 3, 4, 5, 6, 7].map((i) => (
          <div key={i} className="bg-white p-5 rounded-[2rem] shadow-[0_10px_30px_rgba(0,0,0,0.02)] border border-slate-100 hover:shadow-[0_20px_40px_rgba(0,0,0,0.06)] hover:-translate-y-1 transition-all duration-300 cursor-pointer flex flex-col md:flex-row gap-8 items-center group">
            {/* Image Placeholder */}
            <div className="w-full md:w-64 h-40 bg-slate-50 rounded-2xl flex items-center justify-center text-slate-300 shrink-0 overflow-hidden relative group-hover:bg-blue-50 transition-colors">
               <span className="font-bold opacity-30 uppercase tracking-widest text-sm group-hover:text-blue-500 transition-colors">Image</span>
            </div>
            
            {/* Details */}
            <div className="flex-1 space-y-4 text-center md:text-left w-full pr-4">
              <div className="flex flex-col md:flex-row justify-between md:items-start gap-4">
                <div>
                   <h3 className="text-2xl font-bold text-slate-800 group-hover:text-blue-600 transition-colors">Paragliding in the Alps {i}</h3>
                   <div className="flex items-center justify-center md:justify-start gap-2 text-slate-500 font-medium mt-2">
                     <MapPin className="w-4 h-4" /> Swiss Alps, Switzerland
                   </div>
                </div>
                <div className="text-center md:text-right bg-slate-50 p-4 rounded-2xl shrink-0">
                  <span className="text-2xl font-black text-slate-800">$120</span>
                  <span className="block text-xs font-bold text-slate-400 uppercase tracking-wide mt-1">per person</span>
                </div>
              </div>
              <p className="text-slate-500 font-medium leading-relaxed max-w-3xl">
                Experience the thrill of soaring high above the majestic Swiss Alps. This guided paragliding tour offers breathtaking panoramic views and an unforgettable adventure. Option and its details...
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
