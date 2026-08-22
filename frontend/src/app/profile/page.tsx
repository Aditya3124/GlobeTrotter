import { Image as ImageIcon, Edit3 } from "lucide-react";
import Link from "next/link";

export default function ProfilePage() {
  return (
    <div className="max-w-6xl mx-auto space-y-12 pb-24 relative">
      {/* Profile Header Block */}
      <div className="bg-white rounded-[2.5rem] p-8 md:p-12 flex flex-col md:flex-row gap-10 shadow-[0_10px_40px_rgba(0,0,0,0.03)] border border-slate-100">
        
        {/* User Image */}
        <div className="shrink-0 flex justify-center md:justify-start">
          <div className="w-48 h-48 rounded-full border-4 border-slate-50 shadow-lg flex items-center justify-center bg-slate-100 relative overflow-hidden group cursor-pointer">
            <ImageIcon className="w-16 h-16 text-slate-400 opacity-50 group-hover:scale-110 transition-transform duration-500" />
            <div className="absolute inset-0 bg-slate-900/10 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
               <span className="text-slate-800 font-bold text-sm tracking-widest uppercase bg-white/80 px-4 py-2 rounded-full backdrop-blur-sm">Change</span>
            </div>
          </div>
        </div>

        {/* User Details & Edit Option */}
        <div className="flex-1 bg-slate-50 rounded-[2rem] p-8 relative group border border-slate-100">
           <button className="absolute top-6 right-6 p-3 bg-white text-slate-400 hover:text-blue-500 rounded-xl shadow-sm hover:shadow-md transition-all">
             <Edit3 className="w-5 h-5" />
           </button>
           <div className="space-y-5 pr-12">
             <h2 className="text-3xl font-black text-slate-800">Jane Traveler</h2>
             <div className="space-y-3">
               <p className="text-slate-600 font-medium flex items-center gap-3"><span className="text-slate-400 font-bold w-20">Email:</span> jane.traveler@example.com</p>
               <p className="text-slate-600 font-medium flex items-center gap-3"><span className="text-slate-400 font-bold w-20">Phone:</span> +1 (555) 123-4567</p>
               <p className="text-slate-600 font-medium flex items-center gap-3"><span className="text-slate-400 font-bold w-20">Location:</span> New York, USA</p>
             </div>
             <div className="pt-2">
               <p className="text-slate-500 font-medium leading-relaxed bg-white p-4 rounded-2xl border border-slate-100">
                 Explorer, Photographer, Foodie. Always looking for the next big adventure. User Details with appropriate option to edit those information....
               </p>
             </div>
           </div>
        </div>
      </div>

      {/* Preplanned Trips Section */}
      <div className="space-y-6 pt-6">
        <h2 className="text-3xl font-bold text-slate-800 px-2">Preplanned Trips</h2>
        <div className="flex gap-6 overflow-x-auto pb-8 snap-x snap-mandatory" style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
          {[1, 2, 3, 4, 5].map((i) => (
             <div key={`pre-${i}`} className="w-64 shrink-0 snap-start bg-white rounded-[2rem] p-5 shadow-[0_10px_30px_rgba(0,0,0,0.03)] border border-slate-100 flex flex-col gap-5 hover:shadow-[0_20px_40px_rgba(0,0,0,0.06)] hover:-translate-y-1 transition-all duration-300 group">
                <div className="w-full h-56 bg-slate-50 rounded-2xl flex items-center justify-center text-slate-300 relative overflow-hidden group-hover:bg-blue-50 transition-colors">
                  <ImageIcon className="w-10 h-10 opacity-30 group-hover:text-blue-500 group-hover:opacity-50 transition-all" />
                </div>
                <div className="flex-1 flex flex-col justify-end">
                  <Link href="/trips" className="w-full py-4 border-2 border-slate-800 rounded-2xl font-bold text-slate-800 text-center hover:bg-slate-800 hover:text-white transition-colors">
                    View
                  </Link>
                </div>
             </div>
          ))}
        </div>
      </div>

      {/* Previous Trips Section */}
      <div className="space-y-6 pt-2">
        <h2 className="text-3xl font-bold text-slate-800 px-2">Previous Trips</h2>
        <div className="flex gap-6 overflow-x-auto pb-8 snap-x snap-mandatory" style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
          {[1, 2, 3, 4, 5].map((i) => (
             <div key={`past-${i}`} className="w-64 shrink-0 snap-start bg-white rounded-[2rem] p-5 shadow-[0_10px_30px_rgba(0,0,0,0.03)] border border-slate-100 flex flex-col gap-5 hover:shadow-[0_20px_40px_rgba(0,0,0,0.06)] hover:-translate-y-1 transition-all duration-300 group">
                <div className="w-full h-56 bg-slate-50 rounded-2xl flex items-center justify-center text-slate-300 relative overflow-hidden group-hover:bg-teal-50 transition-colors">
                  <ImageIcon className="w-10 h-10 opacity-30 group-hover:text-teal-500 group-hover:opacity-50 transition-all" />
                </div>
                <div className="flex-1 flex flex-col justify-end">
                  <Link href="/trips" className="w-full py-4 border-2 border-slate-800 rounded-2xl font-bold text-slate-800 text-center hover:bg-slate-800 hover:text-white transition-colors">
                    View
                  </Link>
                </div>
             </div>
          ))}
        </div>
      </div>
      
    </div>
  );
}
