"use client";

import {
  PieChart,
  Pie,
  Cell,
  LineChart,
  Line,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
} from "recharts";

// Sophisticated Airbnb-style Chart Colors (Soft teals, blues, corals)
const pieColors = ["#0ea5e9", "#14b8a6", "#f43f5e", "#f59e0b"]; 

const pieData = [
  { name: "Active Users", value: 400 },
  { name: "New Signups", value: 150 }, 
  { name: "Returning", value: 100 }, 
  { name: "Inactive", value: 50 }, 
];

const lineData = [
  { name: "Jan", value: 20 },
  { name: "Feb", value: 35 },
  { name: "Mar", value: 25 },
  { name: "Apr", value: 50 },
  { name: "May", value: 45 },
];

const barData = [
  { name: "Mon", value: 60 },
  { name: "Tue", value: 80 },
  { name: "Wed", value: 100 },
  { name: "Thu", value: 40 },
  { name: "Fri", value: 90 },
];

export default function AdminAnalyticsPage() {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 animate-in fade-in slide-in-from-bottom-8 duration-700 ease-out">
      
      {/* Overview Stats Bento Box */}
      <div className="lg:col-span-3 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
        {[
          { label: "Total Users", val: "12,450", trend: "+12%" },
          { label: "Active Trips", val: "842", trend: "+5%" },
          { label: "New Signups", val: "145", trend: "+2%" },
          { label: "Revenue", val: "$4,520", trend: "+18%" }
        ].map((stat, i) => (
          <div key={i} className="bg-white rounded-3xl p-6 border border-slate-100 shadow-sm flex flex-col justify-between h-32 hover:shadow-md transition-shadow">
            <span className="text-sm font-semibold text-slate-500">{stat.label}</span>
            <div className="flex items-end justify-between">
              <span className="text-3xl font-extrabold text-slate-800 tracking-tight">{stat.val}</span>
              <span className="text-sm font-bold text-emerald-500 bg-emerald-50 px-2 py-1 rounded-full">{stat.trend}</span>
            </div>
          </div>
        ))}
      </div>

      {/* Main Line Chart (Spans 2 columns) */}
      <div className="lg:col-span-2 bg-white rounded-3xl p-8 border border-slate-100 shadow-sm flex flex-col h-[400px]">
        <h3 className="text-lg font-bold text-slate-800 mb-6">User Growth & Engagement</h3>
        <div className="flex-1 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={lineData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
              <Tooltip 
                contentStyle={{ borderRadius: '1rem', border: 'none', boxShadow: '0 10px 25px -5px rgba(0,0,0,0.1)' }}
                itemStyle={{ color: '#0ea5e9', fontWeight: 'bold' }}
              />
              <Line 
                type="monotone" 
                dataKey="value" 
                stroke="#0ea5e9" // Light Blue
                strokeWidth={4} 
                dot={{ r: 4, fill: "#0ea5e9", stroke: "#0ea5e9", strokeWidth: 2 }} 
                activeDot={{ r: 8, fill: "#fff", stroke: "#0ea5e9", strokeWidth: 3 }} 
                animationDuration={1500}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* User Demographics Pie Chart */}
      <div className="bg-white rounded-3xl p-8 border border-slate-100 shadow-sm flex flex-col h-[400px]">
        <h3 className="text-lg font-bold text-slate-800 mb-6">Demographics</h3>
        <div className="flex-1 w-full relative flex items-center justify-center">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={pieData}
                cx="50%"
                cy="50%"
                innerRadius={60} // Donut style looks cleaner
                outerRadius={90}
                paddingAngle={5}
                dataKey="value"
                stroke="none"
              >
                {pieData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={pieColors[index % pieColors.length]} />
                ))}
              </Pie>
              <Tooltip 
                contentStyle={{ borderRadius: '1rem', border: 'none', boxShadow: '0 10px 25px -5px rgba(0,0,0,0.1)' }}
                itemStyle={{ fontWeight: 'bold' }}
              />
            </PieChart>
          </ResponsiveContainer>
        </div>
        
        {/* Custom Legend */}
        <div className="grid grid-cols-2 gap-4 mt-4">
          {pieData.map((entry, i) => (
             <div key={i} className="flex items-center gap-2">
               <div className="w-3 h-3 rounded-full" style={{ backgroundColor: pieColors[i] }}></div>
               <span className="text-xs font-semibold text-slate-600">{entry.name}</span>
             </div>
          ))}
        </div>
      </div>

      {/* Activity Bar Chart (Spans 2 columns) */}
      <div className="lg:col-span-2 bg-white rounded-3xl p-8 border border-slate-100 shadow-sm flex flex-col h-[350px]">
        <h3 className="text-lg font-bold text-slate-800 mb-6">Weekly Activity</h3>
        <div className="flex-1 w-full">
           <ResponsiveContainer width="100%" height="100%">
            <BarChart data={barData} margin={{ top: 10, right: 0, left: -20, bottom: 0 }}>
              <Tooltip 
                cursor={{ fill: 'rgba(0,0,0,0.02)' }}
                contentStyle={{ borderRadius: '1rem', border: 'none', boxShadow: '0 10px 25px -5px rgba(0,0,0,0.1)' }}
                itemStyle={{ color: '#14b8a6', fontWeight: 'bold' }}
              />
              <Bar dataKey="value" fill="#14b8a6" radius={[6, 6, 6, 6]} barSize={32} animationDuration={1500} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Activity Feed Placeholder */}
      <div className="bg-white rounded-3xl p-8 border border-slate-100 shadow-sm h-[350px] overflow-hidden flex flex-col">
        <h3 className="text-lg font-bold text-slate-800 mb-6">Recent Activity</h3>
        <div className="flex-1 space-y-6 overflow-y-auto pr-2">
          {[1, 2, 3, 4].map(i => (
            <div key={i} className="flex gap-4">
              <div className="w-10 h-10 rounded-full bg-slate-50 flex items-center justify-center shrink-0 border border-slate-100">
                <div className="w-2 h-2 rounded-full bg-blue-500"></div>
              </div>
              <div>
                <p className="text-sm text-slate-800"><span className="font-bold">Alice Johnson</span> created a new trip to Paris.</p>
                <p className="text-xs text-slate-400 mt-1">{i * 12} mins ago</p>
              </div>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
}
