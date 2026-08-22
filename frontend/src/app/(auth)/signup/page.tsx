"use client";

import Link from "next/link";
import { Camera } from "lucide-react";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function SignupPage() {
  const router = useRouter();
  
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    phone: "",
    city: "",
    country: "",
  });
  
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    try {
      const response = await fetch("http://localhost:5000/api/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Failed to register");
      }

      // Registration successful! You could save the token here, or just redirect to login.
      // For now, let's redirect to the login page.
      router.push("/login");
    } catch (err: any) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex min-h-[calc(100vh-80px)] items-center justify-center py-10 relative">
      <div className="w-full max-w-2xl bg-white p-8 md:p-12 rounded-[2.5rem] shadow-[0_20px_50px_rgba(0,0,0,0.05)] border border-slate-100 space-y-8 relative">
        
        {/* Decorative elements */}
        <div className="absolute -top-10 -left-10 w-32 h-32 bg-blue-500/10 rounded-full blur-2xl"></div>
        <div className="absolute -bottom-10 -right-10 w-32 h-32 bg-teal-500/10 rounded-full blur-2xl"></div>

        {/* Header */}
        <div className="text-center space-y-2 relative z-10">
          <h1 className="text-3xl font-extrabold text-slate-800">Create Account</h1>
          <p className="text-slate-500 font-medium">Join us to plan your next adventure.</p>
        </div>

        {/* Photo Upload / Profile Circle */}
        <div className="flex justify-center relative z-10">
          <div className="relative w-28 h-28 rounded-full bg-slate-50 flex flex-col items-center justify-center text-slate-400 hover:bg-slate-100 transition-all cursor-pointer group border-2 border-dashed border-slate-200 hover:border-blue-400">
            <Camera className="w-8 h-8 mb-1 group-hover:text-blue-500 transition-colors" />
            <span className="text-xs font-bold tracking-wider group-hover:text-blue-500 transition-colors">UPLOAD</span>
          </div>
        </div>
        
        <form onSubmit={handleSubmit} className="space-y-6 relative z-10">
          {error && (
            <div className="bg-red-50 text-red-500 p-4 rounded-xl text-sm font-semibold text-center border border-red-100">
              {error}
            </div>
          )}
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div className="space-y-2">
              <label className="text-sm font-bold text-slate-700 pl-1">First Name</label>
              <input required name="firstName" value={formData.firstName} onChange={handleChange} type="text" className="w-full px-6 py-4 bg-slate-50 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:bg-white transition-all font-medium text-slate-800 text-base border border-slate-100" placeholder="First Name" />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-bold text-slate-700 pl-1">Last Name</label>
              <input required name="lastName" value={formData.lastName} onChange={handleChange} type="text" className="w-full px-6 py-4 bg-slate-50 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:bg-white transition-all font-medium text-slate-800 text-base border border-slate-100" placeholder="Last Name" />
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div className="space-y-2">
              <label className="text-sm font-bold text-slate-700 pl-1">Email Address</label>
              <input required name="email" value={formData.email} onChange={handleChange} type="email" className="w-full px-6 py-4 bg-slate-50 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:bg-white transition-all font-medium text-slate-800 text-base border border-slate-100" placeholder="Email Address" />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-bold text-slate-700 pl-1">Password</label>
              <input required name="password" value={formData.password} onChange={handleChange} type="password" className="w-full px-6 py-4 bg-slate-50 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:bg-white transition-all font-medium text-slate-800 text-base border border-slate-100" placeholder="Password" />
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div className="space-y-2">
              <label className="text-sm font-bold text-slate-700 pl-1">City</label>
              <input name="city" value={formData.city} onChange={handleChange} type="text" className="w-full px-6 py-4 bg-slate-50 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:bg-white transition-all font-medium text-slate-800 text-base border border-slate-100" placeholder="City" />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-bold text-slate-700 pl-1">Country</label>
              <input name="country" value={formData.country} onChange={handleChange} type="text" className="w-full px-6 py-4 bg-slate-50 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:bg-white transition-all font-medium text-slate-800 text-base border border-slate-100" placeholder="Country" />
            </div>
          </div>
          
          <div className="space-y-2">
            <label className="text-sm font-bold text-slate-700 pl-1">Phone Number (Optional)</label>
            <input name="phone" value={formData.phone} onChange={handleChange} type="tel" className="w-full px-6 py-4 bg-slate-50 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:bg-white transition-all font-medium text-slate-800 text-base border border-slate-100" placeholder="Phone Number" />
          </div>
          
          <div className="pt-6 flex justify-center">
            <button 
              type="submit" 
              disabled={isLoading}
              className="px-12 py-4 bg-slate-900 text-white rounded-2xl font-bold text-lg hover:bg-slate-800 transition-colors shadow-lg hover:shadow-xl hover:-translate-y-0.5 disabled:opacity-50 disabled:hover:translate-y-0"
            >
              {isLoading ? "Creating account..." : "Register"}
            </button>
          </div>
        </form>
        
        <p className="text-center text-slate-500 font-medium relative z-10">
          Already have an account? <Link href="/login" className="text-slate-900 font-bold ml-2 hover:underline">Log in</Link>
        </p>
      </div>
    </div>
  );
}
