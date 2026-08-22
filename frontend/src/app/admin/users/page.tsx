"use client";

import { MoreHorizontal } from "lucide-react";

// Mock user data
const users = [
  { id: 1, name: "Alice Johnson", email: "alice@example.com", trips: 4, status: "Active" },
  { id: 2, name: "Bob Smith", email: "bob@example.com", trips: 12, status: "Active" },
  { id: 3, name: "Charlie Davis", email: "charlie@example.com", trips: 2, status: "Inactive" },
  { id: 4, name: "Diana Prince", email: "diana@example.com", trips: 8, status: "Active" },
  { id: 5, name: "Evan Wright", email: "evan@example.com", trips: 0, status: "Banned" },
];

export default function AdminUsersPage() {
  return (
    <div className="bg-white rounded-3xl border border-slate-100 shadow-sm overflow-hidden animate-in fade-in slide-in-from-bottom-4">
      
      {/* Table Header */}
      <div className="px-8 py-6 border-b border-slate-100 flex justify-between items-center bg-slate-50/50">
        <h2 className="text-lg font-bold text-slate-800">All Users</h2>
        <span className="text-sm font-semibold text-slate-500">{users.length} total users</span>
      </div>

      {/* Users Table */}
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b border-slate-100">
              <th className="px-8 py-4 font-semibold text-slate-400 text-xs uppercase tracking-wider">User Name</th>
              <th className="px-8 py-4 font-semibold text-slate-400 text-xs uppercase tracking-wider">Email Address</th>
              <th className="px-8 py-4 font-semibold text-slate-400 text-xs uppercase tracking-wider">Trips</th>
              <th className="px-8 py-4 font-semibold text-slate-400 text-xs uppercase tracking-wider">Status</th>
              <th className="px-8 py-4 font-semibold text-slate-400 text-xs uppercase tracking-wider text-right">Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr 
                key={user.id} 
                className="border-b border-slate-50 hover:bg-slate-50 transition-colors group cursor-pointer"
              >
                <td className="px-8 py-5">
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center text-sm font-bold text-slate-600 border border-slate-200">
                      {user.name.charAt(0)}
                    </div>
                    <span className="font-bold text-slate-800">{user.name}</span>
                  </div>
                </td>
                <td className="px-8 py-5 text-slate-500 font-medium text-sm">{user.email}</td>
                <td className="px-8 py-5 text-slate-800 font-bold">{user.trips}</td>
                <td className="px-8 py-5">
                  <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                    user.status === "Active" ? "bg-emerald-50 text-emerald-600" : 
                    user.status === "Banned" ? "bg-red-50 text-red-600" : 
                    "bg-slate-100 text-slate-600"
                  }`}>
                    {user.status}
                  </span>
                </td>
                <td className="px-8 py-5 text-right">
                  <button className="p-2 hover:bg-white rounded-full border border-transparent hover:border-slate-200 transition-all text-slate-400 hover:text-slate-600 hover:shadow-sm">
                    <MoreHorizontal className="w-5 h-5" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

    </div>
  );
}
