import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Link from "next/link";
import { Plane, Compass, MapPin, Users, User } from "lucide-react";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "GlobeTrotter",
  description: "AI-powered travel planning app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.className} bg-slate-50 text-slate-800 font-medium`}>
        <div className="flex h-screen overflow-hidden">
          {/* Main Content */}
          <main className="flex-1 flex flex-col h-screen overflow-hidden relative">
            {/* Top Header */}
            <header className="h-24 flex items-center justify-between px-6 md:px-10 shrink-0 z-40 relative bg-white border-b border-slate-100 shadow-sm">
              <div className="flex items-center gap-2">
                <Link href="/" className="flex items-center gap-2 text-2xl font-bold text-slate-800 tracking-tight">
                  <span className="text-blue-500">Globe</span>Trotter.
                </Link>
              </div>
              
              {/* Center Links */}
              <nav className="hidden lg:flex items-center gap-10">
                <Link href="/" className="text-sm font-semibold text-slate-500 hover:text-slate-800 transition-colors">Dashboard</Link>
                <Link href="/explore" className="text-sm font-semibold text-slate-500 hover:text-slate-800 transition-colors">Explore</Link>
                <Link href="/trips" className="text-sm font-semibold text-slate-500 hover:text-slate-800 transition-colors">My Trips</Link>
                <Link href="/community" className="text-sm font-semibold text-slate-500 hover:text-slate-800 transition-colors">Community</Link>
                <Link href="/profile" className="text-sm font-semibold text-slate-500 hover:text-slate-800 transition-colors">Profile</Link>
                <Link href="/admin" className="text-sm font-semibold text-blue-500 hover:text-blue-600 transition-colors">Admin</Link>
              </nav>
              
              <Link href="/login" className="flex items-center justify-center px-10 py-3 bg-slate-900 text-white rounded-full font-bold text-sm hover:bg-slate-800 transition-colors shadow-lg">
                Login
              </Link>
            </header>
            
            <div className="flex-1 overflow-y-auto p-4 md:p-8 relative">
              {children}
            </div>
          </main>
        </div>
      </body>
    </html>
  );
}
