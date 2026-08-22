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
          {/* Sidebar Navigation */}
          <aside className="w-64 bg-white hidden md:flex flex-col z-50 border-r border-slate-100 shadow-[4px_0_24px_rgba(0,0,0,0.02)]">
            <div className="h-24 flex items-center px-8 border-b border-slate-100 mb-6">
              <Link href="/" className="flex items-center gap-2 text-2xl font-bold text-slate-800 tracking-tight">
                <span className="text-blue-500">Globe</span>Trotter.
              </Link>
            </div>
            <nav className="flex-1 overflow-y-auto py-2 px-4 space-y-2">
              <NavItem href="/" icon={<Compass className="w-5 h-5 text-indigo-500" />} label="Dashboard" />
              <NavItem href="/trips" icon={<MapPin className="w-5 h-5 text-rose-500" />} label="My Trips" />
              <NavItem href="/community" icon={<Users className="w-5 h-5 text-amber-500" />} label="Community" />
              <NavItem href="/profile" icon={<User className="w-5 h-5 text-teal-500" />} label="Profile" />
            </nav>
          </aside>

          {/* Main Content */}
          <main className="flex-1 flex flex-col h-screen overflow-hidden relative">
            {/* Top Header */}
            <header className="h-24 flex items-center justify-between px-6 md:px-10 shrink-0 z-40 relative bg-slate-50 md:bg-transparent border-b border-slate-100 md:border-none">
              <div className="flex items-center gap-2">
                <Link href="/" className="flex md:hidden items-center gap-2 text-2xl font-bold text-slate-800 tracking-tight">
                  <span className="text-blue-500">Globe</span>Trotter.
                </Link>
              </div>
              
              {/* Center Links */}
              <nav className="hidden lg:flex items-center gap-10">
                <Link href="/" className="text-sm font-bold text-blue-500">Home</Link>
                <Link href="/about" className="text-sm font-semibold text-slate-500 hover:text-slate-800 transition-colors">About</Link>
                <Link href="/trips" className="text-sm font-semibold text-slate-500 hover:text-slate-800 transition-colors">Destination</Link>
                <Link href="/community" className="text-sm font-semibold text-slate-500 hover:text-slate-800 transition-colors">Tours</Link>
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

function NavItem({ href, icon, label }: { href: string; icon: React.ReactNode; label: string }) {
  return (
    <Link href={href} className="flex items-center gap-4 px-4 py-4 rounded-2xl hover:bg-slate-50 transition-all text-slate-600 font-semibold group">
      <div className="p-2 rounded-xl bg-slate-100 group-hover:bg-white group-hover:shadow-sm transition-all">
        {icon}
      </div>
      <span>{label}</span>
    </Link>
  );
}
