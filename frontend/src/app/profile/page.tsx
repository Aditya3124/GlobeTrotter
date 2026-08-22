"use client";

import { Image as ImageIcon, Edit3, Map, Save, X, Camera } from "lucide-react";
import Link from "next/link";
import { useEffect, useState, useRef } from "react";
import { useRouter } from "next/navigation";

export default function ProfilePage() {
  const router = useRouter();
  
  const [user, setUser] = useState<any>(null);
  const [trips, setTrips] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  
  // Edit state
  const [isEditing, setIsEditing] = useState(false);
  const [editData, setEditData] = useState<any>({});
  const [isSaving, setIsSaving] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    fetchProfileData();
  }, [router]);

  const fetchProfileData = async () => {
    const token = localStorage.getItem("token");
    if (!token) {
      router.push("/login");
      return;
    }

    try {
      const userRes = await fetch("http://localhost:5000/api/users/profile", {
        headers: { Authorization: `Bearer ${token}` }
      });
      
      if (userRes.status === 401 || userRes.status === 403) {
        localStorage.removeItem("token");
        router.push("/login");
        return;
      }

      const userData = await userRes.json();
      setUser(userData);
      setEditData({
        firstName: userData.firstName || "",
        lastName: userData.lastName || "",
        phone: userData.phone || "",
        city: userData.city || "",
        country: userData.country || "",
        bio: userData.bio || "",
        profilePhoto: userData.profilePhoto || ""
      });

      const tripsRes = await fetch("http://localhost:5000/api/trips", {
        headers: { Authorization: `Bearer ${token}` }
      });
      
      if (tripsRes.ok) {
        const tripsData = await tripsRes.json();
        setTrips(tripsData);
      }
    } catch (error) {
      console.error("Failed to fetch profile data:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleEditChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setEditData({ ...editData, [e.target.name]: e.target.value });
  };

  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setEditData({ ...editData, profilePhoto: reader.result as string });
      };
      reader.readAsDataURL(file);
    }
  };

  const triggerPhotoUpload = () => {
    if (isEditing) {
      fileInputRef.current?.click();
    }
  };

  const handleSave = async () => {
    setIsSaving(true);
    const token = localStorage.getItem("token");
    try {
      const res = await fetch("http://localhost:5000/api/users/profile", {
        method: "PUT",
        headers: { 
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}` 
        },
        body: JSON.stringify(editData)
      });

      if (res.ok) {
        const updatedUser = await res.json();
        setUser(updatedUser);
        setIsEditing(false);
      }
    } catch (error) {
      console.error("Failed to save profile:", error);
    } finally {
      setIsSaving(false);
    }
  };

  if (isLoading) {
    return (
      <div className="flex min-h-[50vh] items-center justify-center">
        <p className="text-xl text-slate-400 font-medium">Loading profile...</p>
      </div>
    );
  }

  if (!user) return null;

  const now = new Date();
  const upcomingTrips = trips.filter(t => new Date(t.startDate) >= now);
  const pastTrips = trips.filter(t => new Date(t.startDate) < now);

  return (
    <div className="max-w-6xl mx-auto space-y-12 pb-24 relative">
      {/* Profile Header Block */}
      <div className="bg-white rounded-[2.5rem] p-8 md:p-12 flex flex-col md:flex-row gap-10 shadow-[0_10px_40px_rgba(0,0,0,0.03)] border border-slate-100">
        
        {/* User Image */}
        <div className="shrink-0 flex justify-center md:justify-start">
          <input 
            type="file" 
            ref={fileInputRef} 
            onChange={handlePhotoUpload} 
            accept="image/*" 
            className="hidden" 
          />
          <div 
            onClick={triggerPhotoUpload}
            className={`w-48 h-48 rounded-full border-4 border-slate-50 shadow-lg flex items-center justify-center bg-slate-100 relative overflow-hidden group ${isEditing ? 'cursor-pointer' : ''}`}
          >
            {isEditing && editData.profilePhoto ? (
              <img src={editData.profilePhoto} alt="Profile" className="w-full h-full object-cover" />
            ) : !isEditing && user.profilePhoto ? (
              <img src={user.profilePhoto} alt="Profile" className="w-full h-full object-cover" />
            ) : (
              <ImageIcon className="w-16 h-16 text-slate-400 opacity-50 group-hover:scale-110 transition-transform duration-500" />
            )}
            
            {isEditing && (
              <div className="absolute inset-0 bg-slate-900/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <span className="text-slate-800 font-bold text-sm tracking-widest uppercase bg-white/90 px-4 py-2 rounded-full backdrop-blur-sm flex items-center gap-2">
                  <Camera className="w-4 h-4" /> Upload
                </span>
              </div>
            )}
          </div>
        </div>

        {/* User Details & Edit Option */}
        <div className="flex-1 bg-slate-50 rounded-[2rem] p-8 relative group border border-slate-100">
           {!isEditing ? (
             <button 
               onClick={() => setIsEditing(true)}
               className="absolute top-6 right-6 p-3 bg-white text-slate-400 hover:text-blue-500 rounded-xl shadow-sm hover:shadow-md transition-all"
             >
               <Edit3 className="w-5 h-5" />
             </button>
           ) : (
             <div className="absolute top-6 right-6 flex gap-2">
               <button 
                 onClick={() => {
                   setIsEditing(false);
                   setEditData({
                     firstName: user.firstName || "",
                     lastName: user.lastName || "",
                     phone: user.phone || "",
                     city: user.city || "",
                     country: user.country || "",
                     bio: user.bio || "",
                     profilePhoto: user.profilePhoto || ""
                   });
                 }}
                 className="p-3 bg-white text-slate-400 hover:text-red-500 rounded-xl shadow-sm hover:shadow-md transition-all"
               >
                 <X className="w-5 h-5" />
               </button>
               <button 
                 onClick={handleSave}
                 disabled={isSaving}
                 className="p-3 bg-blue-500 text-white hover:bg-blue-600 rounded-xl shadow-sm hover:shadow-md transition-all disabled:opacity-50"
               >
                 <Save className="w-5 h-5" />
               </button>
             </div>
           )}

           <div className="space-y-5 pr-20">
             {isEditing ? (
               <div className="flex gap-4">
                 <input 
                   name="firstName" value={editData.firstName} onChange={handleEditChange} 
                   className="text-3xl font-black text-slate-800 bg-white border border-slate-200 rounded-xl px-4 py-2 w-full focus:ring-2 focus:ring-blue-500 focus:outline-none" 
                   placeholder="First Name" 
                 />
                 <input 
                   name="lastName" value={editData.lastName} onChange={handleEditChange} 
                   className="text-3xl font-black text-slate-800 bg-white border border-slate-200 rounded-xl px-4 py-2 w-full focus:ring-2 focus:ring-blue-500 focus:outline-none" 
                   placeholder="Last Name" 
                 />
               </div>
             ) : (
               <h2 className="text-3xl font-black text-slate-800">{user.firstName} {user.lastName}</h2>
             )}

             <div className="space-y-3">
               <p className="text-slate-600 font-medium flex items-center gap-3">
                 <span className="text-slate-400 font-bold w-20">Email:</span> 
                 {user.email} <span className="text-xs text-slate-400 italic">(Cannot be changed)</span>
               </p>
               
               <div className="flex items-center gap-3">
                 <span className="text-slate-400 font-bold w-20">Phone:</span>
                 {isEditing ? (
                   <input 
                     name="phone" value={editData.phone} onChange={handleEditChange} 
                     className="bg-white border border-slate-200 rounded-lg px-3 py-1.5 flex-1 focus:ring-2 focus:ring-blue-500 focus:outline-none" 
                     placeholder="+1 (555) 000-0000" 
                   />
                 ) : (
                   <p className="text-slate-600 font-medium">{user.phone || "Not provided"}</p>
                 )}
               </div>

               <div className="flex items-center gap-3">
                 <span className="text-slate-400 font-bold w-20">Location:</span>
                 {isEditing ? (
                   <div className="flex gap-2 flex-1">
                     <input 
                       name="city" value={editData.city} onChange={handleEditChange} 
                       className="bg-white border border-slate-200 rounded-lg px-3 py-1.5 w-full focus:ring-2 focus:ring-blue-500 focus:outline-none" 
                       placeholder="City" 
                     />
                     <input 
                       name="country" value={editData.country} onChange={handleEditChange} 
                       className="bg-white border border-slate-200 rounded-lg px-3 py-1.5 w-full focus:ring-2 focus:ring-blue-500 focus:outline-none" 
                       placeholder="Country" 
                     />
                   </div>
                 ) : (
                   <p className="text-slate-600 font-medium">
                     {user.city ? user.city + (user.country ? ", " : "") : ""}{user.country || "Not provided"}
                   </p>
                 )}
               </div>
             </div>

             <div className="pt-2">
               {isEditing ? (
                 <textarea
                   name="bio" value={editData.bio} onChange={handleEditChange} 
                   className="w-full text-slate-600 font-medium leading-relaxed bg-white p-4 rounded-2xl border border-slate-200 focus:ring-2 focus:ring-blue-500 focus:outline-none min-h-[100px] resize-none"
                   placeholder="Tell us about yourself..."
                 />
               ) : (
                 <p className="text-slate-500 font-medium leading-relaxed bg-white p-4 rounded-2xl border border-slate-100 min-h-[60px]">
                   {user.bio || "No bio added yet."}
                 </p>
               )}
             </div>
           </div>
        </div>
      </div>

      {/* Preplanned Trips Section */}
      <div className="space-y-6 pt-6">
        <h2 className="text-3xl font-bold text-slate-800 px-2">Upcoming Trips</h2>
        {upcomingTrips.length === 0 ? (
          <div className="bg-slate-50 rounded-[2rem] p-10 text-center border border-slate-100">
            <Map className="w-12 h-12 text-slate-300 mx-auto mb-4" />
            <p className="text-slate-500 font-medium mb-4">You have no upcoming trips.</p>
            <Link href="/trips/create" className="px-6 py-3 bg-blue-500 text-white rounded-xl font-bold hover:bg-blue-600 transition-colors inline-block">
              Plan a Trip
            </Link>
          </div>
        ) : (
          <div className="flex gap-6 overflow-x-auto pb-8 snap-x snap-mandatory" style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
            {upcomingTrips.map((trip) => (
              <div key={trip.id} className="w-64 shrink-0 snap-start bg-white rounded-[2rem] p-5 shadow-[0_10px_30px_rgba(0,0,0,0.03)] border border-slate-100 flex flex-col gap-5 hover:shadow-[0_20px_40px_rgba(0,0,0,0.06)] hover:-translate-y-1 transition-all duration-300 group">
                  <div className="w-full h-56 bg-slate-50 rounded-2xl flex flex-col items-center justify-center text-slate-300 relative overflow-hidden group-hover:bg-blue-50 transition-colors p-4 text-center">
                    {trip.coverPhoto ? (
                      <img src={trip.coverPhoto} alt={trip.name} className="absolute inset-0 w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity" />
                    ) : (
                      <>
                        <ImageIcon className="w-10 h-10 opacity-30 group-hover:text-blue-500 group-hover:opacity-50 transition-all mb-2" />
                        <h3 className="font-bold text-slate-700 text-lg relative z-10">{trip.name}</h3>
                      </>
                    )}
                  </div>
                  <div className="flex-1 flex flex-col justify-end">
                    <Link href={`/trips/${trip.id}/builder`} className="w-full py-4 border-2 border-slate-800 rounded-2xl font-bold text-slate-800 text-center hover:bg-slate-800 hover:text-white transition-colors relative z-10">
                      View
                    </Link>
                  </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Previous Trips Section */}
      <div className="space-y-6 pt-2">
        <h2 className="text-3xl font-bold text-slate-800 px-2">Previous Trips</h2>
        {pastTrips.length === 0 ? (
          <div className="bg-slate-50 rounded-[2rem] p-10 text-center border border-slate-100">
            <p className="text-slate-500 font-medium">You have no past trips yet.</p>
          </div>
        ) : (
          <div className="flex gap-6 overflow-x-auto pb-8 snap-x snap-mandatory" style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
            {pastTrips.map((trip) => (
              <div key={trip.id} className="w-64 shrink-0 snap-start bg-white rounded-[2rem] p-5 shadow-[0_10px_30px_rgba(0,0,0,0.03)] border border-slate-100 flex flex-col gap-5 hover:shadow-[0_20px_40px_rgba(0,0,0,0.06)] hover:-translate-y-1 transition-all duration-300 group">
                  <div className="w-full h-56 bg-slate-50 rounded-2xl flex flex-col items-center justify-center text-slate-300 relative overflow-hidden group-hover:bg-teal-50 transition-colors p-4 text-center">
                    {trip.coverPhoto ? (
                      <img src={trip.coverPhoto} alt={trip.name} className="absolute inset-0 w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity" />
                    ) : (
                      <>
                        <ImageIcon className="w-10 h-10 opacity-30 group-hover:text-teal-500 group-hover:opacity-50 transition-all mb-2" />
                        <h3 className="font-bold text-slate-700 text-lg relative z-10">{trip.name}</h3>
                      </>
                    )}
                  </div>
                  <div className="flex-1 flex flex-col justify-end">
                    <Link href={`/trips/${trip.id}/builder`} className="w-full py-4 border-2 border-slate-800 rounded-2xl font-bold text-slate-800 text-center hover:bg-slate-800 hover:text-white transition-colors relative z-10">
                      View
                    </Link>
                  </div>
              </div>
            ))}
          </div>
        )}
      </div>
      
    </div>
  );
}
