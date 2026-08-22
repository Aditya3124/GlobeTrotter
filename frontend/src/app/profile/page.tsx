import { User, Settings, Shield, Bell, Map, Image as ImageIcon } from "lucide-react";

export default function ProfilePage() {
  return (
    <div className="max-w-4xl mx-auto space-y-12 pb-24 relative">
      
      {/* Profile Header */}
      <div className="bg-white rounded-3xl p-8 md:p-12 flex flex-col md:flex-row items-center gap-10 shadow-sm border border-slate-100">
        <div className="relative">
          <div className="w-40 h-40 rounded-full bg-slate-50 border border-slate-100 flex items-center justify-center p-2">
            <div className="w-full h-full rounded-full bg-slate-100 flex items-center justify-center text-slate-400 overflow-hidden">
               <ImageIcon className="w-12 h-12 opacity-50" />
            </div>
          </div>
          <button className="absolute bottom-2 right-2 w-12 h-12 bg-white rounded-full flex items-center justify-center text-slate-500 hover:text-blue-600 shadow-md border border-slate-100 transition-colors z-10">
            <Settings className="w-5 h-5" />
          </button>
        </div>
        <div className="text-center md:text-left space-y-3 flex-1">
          <h1 className="text-3xl md:text-4xl font-extrabold text-slate-800">Jane Traveler</h1>
          <p className="text-slate-500 font-medium">Explorer, Photographer, Foodie.</p>
          <div className="flex gap-8 justify-center md:justify-start pt-4">
            <div className="text-center">
              <span className="block text-2xl font-black text-slate-800">12</span>
              <span className="text-sm font-bold text-slate-400 uppercase tracking-wide">Trips</span>
            </div>
            <div className="text-center">
              <span className="block text-2xl font-black text-slate-800">8</span>
              <span className="text-sm font-bold text-slate-400 uppercase tracking-wide">Countries</span>
            </div>
          </div>
        </div>
      </div>

      <div className="grid md:grid-cols-3 gap-8">
        <div className="md:col-span-1 space-y-6">
          <h2 className="text-xl font-bold text-slate-800 px-2">Settings</h2>
          <div className="bg-white rounded-3xl p-4 flex flex-col gap-2 shadow-sm border border-slate-100">
            <button className="flex items-center gap-4 w-full p-4 rounded-2xl hover:bg-slate-50 text-left font-bold text-slate-600 hover:text-blue-600 transition-colors">
              <User className="w-5 h-5" /> Personal Info
            </button>
            <button className="flex items-center gap-4 w-full p-4 rounded-2xl hover:bg-slate-50 text-left font-bold text-slate-600 hover:text-blue-600 transition-colors">
              <Shield className="w-5 h-5" /> Security
            </button>
            <button className="flex items-center gap-4 w-full p-4 rounded-2xl hover:bg-slate-50 text-left font-bold text-slate-600 hover:text-blue-600 transition-colors">
              <Bell className="w-5 h-5" /> Notifications
            </button>
          </div>
        </div>

        <div className="md:col-span-2 space-y-6">
           <h2 className="text-xl font-bold text-slate-800 px-2">Recent Activity</h2>
           <div className="bg-white rounded-3xl p-8 space-y-8 shadow-sm border border-slate-100">
              
              <div className="flex items-start gap-6 border-b border-slate-100 pb-8">
                <div className="w-12 h-12 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center shrink-0">
                  <Map className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-bold text-slate-800 text-lg">Created a new itinerary</h3>
                  <p className="text-slate-600 font-medium mt-1">You started planning "Summer in Europe".</p>
                  <p className="text-sm font-bold text-slate-400 mt-2">2 days ago</p>
                </div>
              </div>

              <div className="flex items-start gap-6">
                <div className="w-12 h-12 rounded-2xl bg-teal-50 text-teal-600 flex items-center justify-center shrink-0">
                  <User className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-bold text-slate-800 text-lg">Updated profile picture</h3>
                  <p className="text-sm font-bold text-slate-400 mt-2">1 week ago</p>
                </div>
              </div>

           </div>
        </div>
      </div>
    </div>
  );
}
