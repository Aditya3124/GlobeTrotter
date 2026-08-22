import Link from "next/link";
import { User, Search, ChevronDown, Bell } from "lucide-react";
import AdminNav from "./AdminNav";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 flex flex-col font-sans selection:bg-blue-500/30">
      
      {/* Top Header */}
      <header className="flex justify-between items-center px-8 py-5 bg-white border-b border-slate-200 sticky top-0 z-50">
        <div className="flex items-center gap-12">
          <Link href="/admin" className="text-2xl font-bold tracking-tight text-slate-800">
            Global<span className="text-blue-500">Trotter</span>
          </Link>

          {/* Search Bar integrated into header */}
          <div className="hidden md:flex relative group w-[300px]">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 group-focus-within:text-blue-500 transition-colors" />
            <input 
              type="text" 
              placeholder="Search users, trips, or activity..." 
              className="w-full bg-slate-100/50 border border-transparent rounded-full py-2.5 pl-12 pr-4 text-sm text-slate-800 placeholder:text-slate-500 focus:outline-none focus:bg-white focus:border-blue-500/30 focus:ring-4 focus:ring-blue-500/10 transition-all"
            />
          </div>
        </div>
        
        {/* Actions & Profile */}
        <div className="flex items-center gap-6">
          <button className="text-slate-400 hover:text-slate-600 transition-colors relative">
            <Bell className="w-5 h-5" />
            <span className="absolute -top-1 -right-1 w-2 h-2 bg-red-500 rounded-full border-2 border-white"></span>
          </button>
          
          <div className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center overflow-hidden cursor-pointer hover:ring-4 hover:ring-slate-100 transition-all border border-slate-200">
            <User className="w-5 h-5 text-slate-400" />
          </div>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-6 md:px-8 py-8 flex flex-col">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-8">
          <div>
            <h1 className="text-3xl font-extrabold text-slate-800 tracking-tight">Overview</h1>
            <p className="text-slate-500 mt-1">Monitor your platform's activity and performance.</p>
          </div>

          {/* Secondary Actions (Group By / Filter / Sort) moved to a cleaner row */}
          <div className="flex flex-wrap items-center gap-3">
            <button className="flex items-center gap-2 px-4 py-2 bg-white border border-slate-200 rounded-full text-sm font-semibold text-slate-600 hover:bg-slate-50 hover:border-slate-300 transition-colors shadow-sm">
              Group by
            </button>
            <button className="flex items-center gap-2 px-4 py-2 bg-white border border-slate-200 rounded-full text-sm font-semibold text-slate-600 hover:bg-slate-50 hover:border-slate-300 transition-colors shadow-sm">
              Filter
            </button>
            <button className="flex items-center gap-2 px-4 py-2 bg-white border border-slate-200 rounded-full text-sm font-semibold text-slate-600 hover:bg-slate-50 hover:border-slate-300 transition-colors shadow-sm">
              Sort by <ChevronDown className="w-4 h-4 text-slate-400" />
            </button>
          </div>
        </div>

        {/* Navigation Tabs */}
        <AdminNav />

        {/* Dynamic Content */}
        <div className="flex-1 mt-8">
          {children}
        </div>
      </main>
    </div>
  );
}
