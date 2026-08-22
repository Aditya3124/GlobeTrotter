import Link from "next/link";
import { Search, ChevronDown, Filter, Plus, Image as ImageIcon, Star, Plane } from "lucide-react";

export default function Dashboard() {
  return (
    <div className="max-w-6xl mx-auto space-y-12 pb-24 relative min-h-full">
      
      {/* Hero Section */}
      <div className="flex flex-col lg:flex-row items-center justify-between py-12 md:py-20 relative">
        {/* Left: Text Content */}
        <div className="w-full lg:w-1/2 space-y-6 z-10 text-center lg:text-left">
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-extrabold text-slate-800 leading-tight">
            Lets Plan Your <br className="hidden md:block" /> Perfect <span className="text-blue-500">Journey</span>
          </h1>
          <p className="text-slate-500 text-lg md:text-xl max-w-lg mx-auto lg:mx-0 leading-relaxed font-medium">
            Plan and book your perfect trip with expert advice, travel tips, destination information and inspiration from us.
          </p>
          <div className="pt-4">
            <button className="bg-slate-900 text-white px-8 py-4 rounded-full font-bold text-lg hover:bg-slate-800 transition-colors shadow-[0_10px_30px_rgba(0,0,0,0.2)]">
              Discover Now
            </button>
          </div>
        </div>

        {/* Right: 3D Globe Illustration */}
        <div className="w-full lg:w-1/2 relative min-h-[400px] lg:min-h-[600px] flex items-center justify-center mt-12 lg:mt-0">
          <img 
            src="/hero-globe-white.jpg" 
            alt="3D Globe Illustration" 
            className="w-[120%] max-w-[600px] lg:max-w-[700px] h-auto object-contain hover:scale-105 transition-transform duration-700 ease-in-out mix-blend-multiply"
          />
        </div>
      </div>

      {/* Floating Search Bar */}
      <div className="bg-white rounded-[2rem] shadow-[0_20px_50px_rgba(163,177,198,0.4)] p-6 md:p-8 flex flex-col md:flex-row items-center justify-between gap-6 relative z-20 -mt-16 mx-auto max-w-5xl border border-slate-100">
        <div className="flex-1 border-b md:border-b-0 md:border-r border-slate-200 pb-4 md:pb-0 px-6 w-full cursor-pointer hover:bg-slate-50 transition-colors rounded-xl">
          <p className="font-bold text-slate-800 text-lg">Location</p>
          <p className="text-slate-400 text-sm mt-1">Where are you going? <ChevronDown className="w-4 h-4 inline" /></p>
        </div>
        <div className="flex-1 border-b md:border-b-0 md:border-r border-slate-200 pb-4 md:pb-0 px-6 w-full cursor-pointer hover:bg-slate-50 transition-colors rounded-xl">
          <p className="font-bold text-slate-800 text-lg">Date</p>
          <p className="text-slate-400 text-sm mt-1">When will you travel? <ChevronDown className="w-4 h-4 inline" /></p>
        </div>
        <div className="flex-1 px-6 w-full cursor-pointer hover:bg-slate-50 transition-colors rounded-xl pb-4 md:pb-0">
          <p className="font-bold text-slate-800 text-lg">People</p>
          <p className="text-slate-400 text-sm mt-1">How many people? <ChevronDown className="w-4 h-4 inline" /></p>
        </div>
        <button className="w-16 h-16 bg-slate-900 rounded-2xl flex items-center justify-center hover:bg-slate-800 transition-colors shrink-0 shadow-lg mt-4 md:mt-0">
          <Search className="w-6 h-6 text-white" />
        </button>
      </div>

      {/* Top Regional Selections */}
      <div className="space-y-6 pt-12">
        <div className="flex justify-between items-end px-2">
          <h2 className="text-3xl font-bold text-slate-800">Top Regional Selections</h2>
          <button className="text-blue-500 font-bold hover:text-blue-600 transition-colors">See all →</button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {[1, 2, 3].map((i) => (
            <div key={i} className="bg-white rounded-[2rem] p-4 flex flex-col gap-4 group cursor-pointer shadow-[0_12px_30px_rgba(0,0,0,0.05)] border border-slate-100 hover:shadow-[0_20px_40px_rgba(0,0,0,0.08)] transition-all duration-300">
              <div className="w-full h-48 bg-slate-100 rounded-3xl overflow-hidden relative">
                <div className="absolute inset-0 flex items-center justify-center text-slate-400 group-hover:scale-110 transition-transform duration-500">
                  <ImageIcon className="w-10 h-10 opacity-50" />
                </div>
              </div>
              <div className="px-2 pb-2">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="text-xl font-bold text-slate-800 group-hover:text-blue-500 transition-colors">Kyoto, Japan</h3>
                  <div className="flex items-center gap-1 bg-amber-50 px-3 py-1 rounded-full">
                    <Star className="w-4 h-4 text-amber-500 fill-amber-500" />
                    <span className="text-sm font-bold text-amber-700">4.9</span>
                  </div>
                </div>
                <p className="text-slate-500 text-sm font-medium">Historical temples, beautiful gardens, and traditional tea houses.</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Previous Trips Section */}
      <div className="space-y-6 pt-16">
        <div className="flex justify-between items-end px-2">
          <h2 className="text-3xl font-bold text-slate-800">Your Previous Trips</h2>
          <button className="text-blue-500 font-bold hover:text-blue-600 transition-colors">View history →</button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {[1, 2].map((i) => (
            <div key={i} className="bg-white rounded-[2rem] p-5 flex gap-5 group cursor-pointer shadow-[0_10px_30px_rgba(0,0,0,0.03)] border border-slate-100 hover:shadow-[0_20px_40px_rgba(0,0,0,0.06)] transition-all duration-300">
              <div className="w-24 h-24 shrink-0 bg-slate-100 rounded-2xl overflow-hidden relative">
                <div className="absolute inset-0 flex items-center justify-center text-slate-400 group-hover:scale-110 transition-transform duration-500">
                  <ImageIcon className="w-6 h-6 opacity-50" />
                </div>
              </div>
              <div className="flex flex-col justify-center">
                <h3 className="text-lg font-bold text-slate-800 group-hover:text-blue-500 transition-colors">Paris, France</h3>
                <p className="text-slate-400 text-sm font-medium mt-1">Oct 12 - Oct 18, 2025</p>
                <div className="mt-2 flex gap-2">
                  <span className="text-xs font-bold bg-slate-100 text-slate-500 px-2 py-1 rounded-md">Family</span>
                  <span className="text-xs font-bold bg-slate-100 text-slate-500 px-2 py-1 rounded-md">7 Days</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Floating Plan Button */}
      <Link href="/trips/create" className="fixed bottom-8 right-8 z-50">
        <button className="flex items-center gap-3 bg-blue-500 text-white px-8 py-5 rounded-full font-bold text-lg hover:bg-blue-600 transition-all shadow-[0_10px_30px_rgba(59,130,246,0.4)] hover:shadow-[0_15px_40px_rgba(59,130,246,0.6)] hover:-translate-y-1">
          <Plane className="w-6 h-6" />
          Plan a trip
        </button>
      </Link>
    </div>
  );
}
