import Link from "next/link";
import { Camera } from "lucide-react";

export default function SignupPage() {
  return (
    <div className="flex min-h-[calc(100vh-80px)] items-center justify-center py-10 relative">
      <div className="w-full max-w-md bg-white p-8 md:p-12 rounded-[2.5rem] shadow-[0_20px_50px_rgba(0,0,0,0.05)] border border-slate-100 space-y-8 relative">
        
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
        
        <form className="space-y-5 relative z-10">
          <div className="space-y-2">
            <label className="text-sm font-bold text-slate-700 pl-1">Name</label>
            <input type="text" className="w-full px-6 py-4 bg-slate-50 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:bg-white transition-all font-medium text-slate-800 text-base border border-slate-100" placeholder="Enter your full name" />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-bold text-slate-700 pl-1">Email</label>
            <input type="email" className="w-full px-6 py-4 bg-slate-50 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:bg-white transition-all font-medium text-slate-800 text-base border border-slate-100" placeholder="Enter your email" />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-bold text-slate-700 pl-1">Password</label>
            <input type="password" className="w-full px-6 py-4 bg-slate-50 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:bg-white transition-all font-medium text-slate-800 text-base border border-slate-100" placeholder="Create a password" />
          </div>
          
          <div className="pt-4">
            <Link href="/" className="flex items-center justify-center w-full py-4 bg-blue-500 text-white rounded-2xl font-bold text-lg hover:bg-blue-600 transition-colors shadow-lg hover:shadow-xl hover:-translate-y-0.5">
              Sign Up
            </Link>
          </div>
        </form>
        
        <p className="text-center text-slate-500 font-medium relative z-10">
          Already have an account? <Link href="/login" className="text-slate-900 font-bold ml-2 hover:underline">Log in</Link>
        </p>
      </div>
    </div>
  );
}
