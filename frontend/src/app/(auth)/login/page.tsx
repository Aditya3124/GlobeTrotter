"use client";

import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
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
      const response = await fetch("http://localhost:5000/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Failed to login");
      }

      // Save JWT to localStorage
      localStorage.setItem("token", data.token);

      // Redirect to profile
      router.push("/profile");
    } catch (err: any) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

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
        
        <form onSubmit={handleSubmit} className="space-y-5 relative z-10">
          {error && (
            <div className="bg-red-50 text-red-500 p-4 rounded-xl text-sm font-semibold text-center border border-red-100">
              {error}
            </div>
          )}

          <div className="space-y-2">
            <label className="text-sm font-bold text-slate-700 pl-1">Email</label>
            <input required name="email" value={formData.email} onChange={handleChange} type="email" className="w-full px-6 py-4 bg-slate-50 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:bg-white transition-all font-medium text-slate-800 text-base border border-slate-100" placeholder="Enter your email" />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-bold text-slate-700 pl-1">Password</label>
            <input required name="password" value={formData.password} onChange={handleChange} type="password" className="w-full px-6 py-4 bg-slate-50 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:bg-white transition-all font-medium text-slate-800 text-base border border-slate-100" placeholder="Enter your password" />
          </div>
          
          <div className="flex justify-end pt-1">
            <Link href="#" className="text-sm font-bold text-blue-500 hover:text-blue-600 transition-colors">Forgot Password?</Link>
          </div>
          
          <div className="pt-4">
            <button 
              type="submit" 
              disabled={isLoading}
              className="flex items-center justify-center w-full py-4 bg-slate-900 text-white rounded-2xl font-bold text-lg hover:bg-slate-800 transition-colors shadow-lg hover:shadow-xl hover:-translate-y-0.5 disabled:opacity-50 disabled:hover:translate-y-0"
            >
              {isLoading ? "Signing In..." : "Sign In"}
            </button>
          </div>
        </form>
        
        <p className="text-center text-slate-500 font-medium">
          Don't have an account? <Link href="/signup" className="text-blue-500 font-bold ml-2 hover:underline">Sign up</Link>
        </p>
      </div>
    </div>
  );
}
