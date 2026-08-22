import Link from "next/link";
import { Camera } from "lucide-react";

export default function LoginPage() {
  return (
    <div className="flex min-h-[calc(100vh-80px)] items-center justify-center py-10 relative">
      <div className="w-full max-w-md bg-white p-8 md:p-12 rounded-[2.5rem] shadow-[0_20px_50px_rgba(0,0,0,0.05)] border border-slate-100 space-y-10 relative">
        
        {/* Decorative elements */}
        <div className="absolute -top-10 -right-10 w-32 h-32 bg-blue-500/10 rounded-full blur-2xl"></div>
        <div className="absolute -bottom-10 -left-10 w-32 h-32 bg-teal-500/10 rounded-full blur-2xl"></div>

        {/* Header */}
        <div className="text-center space-y-2 relative z-10">
          <h1 className="text-3xl font-extrabold text-slate-800">Welcome Back</h1>
          <p className="text-slate-500 font-medium">Please enter your details to sign in.</p>
        </div>
        
        <form className="space-y-5 relative z-10">
          <div className="space-y-2">
            <label className="text-sm font-bold text-slate-700 pl-1">Email</label>
            <input type="email" className="w-full px-6 py-4 bg-slate-50 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:bg-white transition-all font-medium text-slate-800 text-base border border-slate-100" placeholder="Enter your email" />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-bold text-slate-700 pl-1">Password</label>
            <input type="password" className="w-full px-6 py-4 bg-slate-50 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:bg-white transition-all font-medium text-slate-800 text-base border border-slate-100" placeholder="Enter your password" />
          </div>
          
          <div className="flex justify-end pt-1">
            <Link href="#" className="text-sm font-bold text-blue-500 hover:text-blue-600 transition-colors">Forgot Password?</Link>
          </div>
          
          <div className="pt-4">
            <Link href="/" className="flex items-center justify-center w-full py-4 bg-slate-900 text-white rounded-2xl font-bold text-lg hover:bg-slate-800 transition-colors shadow-lg hover:shadow-xl hover:-translate-y-0.5">
              Sign In
            </Link>
          </div>
        </form>
        
        <p className="text-center text-slate-500 font-medium">
          Don't have an account? <Link href="/signup" className="text-blue-500 font-bold ml-2 hover:underline">Sign up</Link>
        </p>
      </div>
    </div>
  );
}
