"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function AdminNav() {
  const pathname = usePathname();

  const navItems = [
    { label: "Overview", href: "/admin" },
    { label: "Manage Users", href: "/admin/users" },
    { label: "Popular Cities", href: "/admin/cities" },
    { label: "Popular Activities", href: "/admin/activities" },
  ];

  return (
    <div className="flex items-center gap-8 border-b border-slate-200 overflow-x-auto hide-scrollbar">
      {navItems.map((item) => {
        const isActive = item.href === "/admin" 
          ? pathname === "/admin"
          : pathname.startsWith(item.href);

        return (
          <Link
            key={item.href}
            href={item.href}
            className={`whitespace-nowrap py-4 text-sm font-bold border-b-2 transition-colors ${
              isActive
                ? "border-slate-800 text-slate-800" 
                : "border-transparent text-slate-500 hover:text-slate-800 hover:border-slate-300"
            }`}
          >
            {item.label}
          </Link>
        );
      })}
    </div>
  );
}
