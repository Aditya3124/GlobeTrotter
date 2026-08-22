"use client";
import { use } from "react";
import { useTripStore } from "@/store/useTripStore";
import Link from "next/link";
import { ArrowLeft, Wallet, TrendingUp, CreditCard, Coffee, Map } from "lucide-react";
import dynamic from "next/dynamic";

const BudgetPieChart = dynamic(() => import("@/components/BudgetCharts").then(mod => mod.BudgetPieChart), { ssr: false });
const BudgetBarChart = dynamic(() => import("@/components/BudgetCharts").then(mod => mod.BudgetBarChart), { ssr: false });

export default function BudgetPage({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = use(params);
  const tripId = resolvedParams.id;
  const trip = useTripStore((state) => state.trips.find(t => t.id === tripId));

  if (!trip) return <div className="p-10 text-center font-bold text-2xl uppercase tracking-widest text-slate-500">Trip not found.</div>;

  // Mock budget if not fully set
  const budget = {
    transport: trip.budget?.transport || 450,
    stay: trip.budget?.stay || 800,
    meals: trip.budget?.meals || 350,
    activities: trip.budget?.activities || 200,
  };
  
  const total = budget.transport + budget.stay + budget.meals + budget.activities;

  return (
    <div className="max-w-5xl mx-auto space-y-12 pb-24 relative">
      <header className="flex flex-col sm:flex-row sm:items-center justify-between gap-8 pb-8">
        <div className="space-y-6">
          <Link href={`/trips/${tripId}/builder`} className="inline-flex items-center gap-2 text-sm font-bold text-slate-500 hover:text-slate-800 transition-colors">
            <ArrowLeft className="w-4 h-4" /> Back to Builder
          </Link>
          <div>
            <h1 className="text-4xl md:text-5xl font-extrabold text-slate-800 mb-2">Budget</h1>
            <p className="text-slate-500 font-medium">Financial overview for {trip.name}</p>
          </div>
        </div>
        
        <div className="bg-white px-10 py-6 rounded-3xl flex items-center gap-6 shadow-[0_20px_50px_rgba(0,0,0,0.05)] border border-slate-100">
          <div className="p-4 bg-blue-50 text-blue-600 rounded-2xl">
            <Wallet className="w-8 h-8" />
          </div>
          <div>
            <p className="text-sm font-bold text-slate-400 mb-1">Estimated Total</p>
            <p className="text-4xl font-black text-slate-800">${total.toLocaleString()}</p>
          </div>
        </div>
      </header>

      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <BudgetCategoryCard title="Transport" amount={budget.transport} icon={<Map className="w-6 h-6 text-teal-600" />} color="bg-teal-50" />
        <BudgetCategoryCard title="Accommodation" amount={budget.stay} icon={<CreditCard className="w-6 h-6 text-indigo-600" />} color="bg-indigo-50" />
        <BudgetCategoryCard title="Meals" amount={budget.meals} icon={<Coffee className="w-6 h-6 text-rose-600" />} color="bg-rose-50" />
        <BudgetCategoryCard title="Activities" amount={budget.activities} icon={<TrendingUp className="w-6 h-6 text-amber-600" />} color="bg-amber-50" />
      </div>

      <div className="grid md:grid-cols-2 gap-8">
        <div className="bg-white p-8 rounded-3xl flex flex-col shadow-sm border border-slate-100">
          <h2 className="text-xl font-bold text-slate-800 mb-8 px-2">Cost Breakdown</h2>
          <div className="flex-1 min-h-[300px] bg-slate-50 rounded-2xl p-6 border border-slate-100">
            <BudgetPieChart budget={budget} />
          </div>
        </div>

        <div className="bg-white p-8 rounded-3xl flex flex-col shadow-sm border border-slate-100">
          <h2 className="text-xl font-bold text-slate-800 mb-8 px-2">Daily Averages</h2>
          <div className="flex-1 min-h-[300px] bg-slate-50 rounded-2xl p-6 border border-slate-100">
            <BudgetBarChart budget={budget} />
          </div>
        </div>
      </div>
    </div>
  );
}

function BudgetCategoryCard({ title, amount, icon, color }: { title: string, amount: number, icon: React.ReactNode, color: string }) {
  return (
    <div className="p-8 rounded-3xl bg-white shadow-sm border border-slate-100 flex flex-col justify-between hover:shadow-md hover:-translate-y-1 transition-all">
      <div className="flex justify-between items-start mb-6">
        <div className={`w-14 h-14 rounded-2xl flex items-center justify-center ${color}`}>
          {icon}
        </div>
      </div>
      <div className="space-y-1">
        <p className="text-sm font-bold text-slate-500">{title}</p>
        <p className="text-3xl font-extrabold text-slate-800">${amount}</p>
      </div>
    </div>
  );
}
