"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useTripStore } from "@/store/useTripStore";
import { ArrowLeft, Search } from "lucide-react";
import Link from "next/link";

export default function CreateTripPage() {
  const router = useRouter();
  const addTrip = useTripStore((state) => state.addTrip);
  
  const [formData, setFormData] = useState({
    name: "",
    startDate: "",
    endDate: "",
    description: ""
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.startDate || !formData.endDate) return;

    try {
      const token = localStorage.getItem("token");
      const res = await fetch("http://localhost:5000/api/trips", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({
          name: formData.name,
          startDate: formData.startDate,
          endDate: formData.endDate,
          description: formData.description,
          budget: { transport: 0, stay: 0, meals: 0, activities: 0 }
        })
      });

      if (res.ok) {
        const newTrip = await res.json();
        addTrip(newTrip);
        router.push(`/trips/${newTrip.id}/builder`);
      } else {
        console.error("Failed to create trip");
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="max-w-2xl mx-auto py-8">
      <Link href="/trips" className="inline-flex items-center gap-2 text-slate-500 font-bold mb-8 hover:text-slate-800 transition-colors">
        <ArrowLeft className="w-4 h-4" /> Back to Trips
      </Link>

      <div className="bg-white rounded-[2rem] p-8 md:p-10 shadow-[0_20px_50px_rgba(0,0,0,0.08)] border border-slate-100">
        <div className="flex items-center gap-4 mb-8 pb-6 border-b border-slate-100">
          <h1 className="text-2xl font-bold text-slate-800">Plan a trip</h1>
          <span className="text-slate-300">|</span>
          <span className="text-blue-500 font-bold">New Adventure</span>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <label className="text-sm font-bold text-slate-700">Where are you going?</label>
            <div className="relative">
              <input 
                type="text" 
                required
                placeholder="e.g., Summer in Europe"
                className="w-full pl-4 pr-12 py-3 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all font-medium text-slate-800"
                value={formData.name}
                onChange={(e) => setFormData({...formData, name: e.target.value})}
              />
              <div className="absolute right-2 top-1/2 -translate-y-1/2 w-8 h-8 bg-slate-900 rounded-lg flex items-center justify-center">
                <Search className="w-4 h-4 text-white" />
              </div>
            </div>
          </div>

          <div className="grid sm:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-sm font-bold text-slate-700">Start Date</label>
              <input 
                type="date" 
                required
                className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all font-medium text-slate-800"
                value={formData.startDate}
                onChange={(e) => setFormData({...formData, startDate: e.target.value})}
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-bold text-slate-700">End Date</label>
              <input 
                type="date" 
                required
                className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all font-medium text-slate-800"
                value={formData.endDate}
                onChange={(e) => setFormData({...formData, endDate: e.target.value})}
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-bold text-slate-700">Description (Optional)</label>
            <textarea 
              rows={3}
              placeholder="What's the vibe of this trip?"
              className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all font-medium text-slate-800 resize-none"
              value={formData.description}
              onChange={(e) => setFormData({...formData, description: e.target.value})}
            />
          </div>

          <div className="pt-6 flex justify-end gap-4 border-t border-slate-100 mt-8">
            <Link href="/trips" className="px-8 py-3 rounded-xl font-bold text-slate-700 border border-slate-200 hover:bg-slate-50 transition-colors">
              Cancel
            </Link>
            <button 
              type="submit"
              className="px-8 py-3 bg-blue-500 text-white rounded-xl font-bold hover:bg-blue-600 transition-colors shadow-lg shadow-blue-500/30"
            >
              Select
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
