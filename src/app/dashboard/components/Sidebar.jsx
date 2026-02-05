"use client";

import { useState } from "react";
import { usePathname } from "next/navigation";
import SidebarButton from "./SidebarButton";
import {
  MdDashboard,
  MdSecurity,
  MdLiveTv,
  MdSettings,
  MdMenu,
  MdClose,
} from "react-icons/md";

const Sidebar = () => {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  const menu = [
    { label: "Dashboard", href: "/dashboard", icon: MdDashboard },
    { label: "Live Monitoring", href: "/dashboard/live", icon: MdLiveTv },
    { label: "Security", href: "/dashboard/security", icon: MdSecurity },
    { label: "Settings", href: "/dashboard/settings", icon: MdSettings },
  ];

  return (
    <>
      {/* 🔹 Mobile Toggle Button */}
      <button
        onClick={() => setOpen(true)}
        className="lg:hidden fixed top-4 left-4 z-50 
        bg-slate-900 text-white p-2 rounded-md shadow-md"
      >
        <MdMenu size={22} />
      </button>

      {/* 🔹 Overlay (Mobile) */}
      {open && (
        <div
          onClick={() => setOpen(false)}
          className="fixed inset-0 bg-black/40 z-40 lg:hidden"
        />
      )}

      {/* 🔹 Sidebar */}
      <aside
        className={`
          fixed lg:static top-0 left-0 z-50
          h-full w-64 bg-slate-900 text-white flex flex-col
          transform transition-transform duration-300
          ${open ? "translate-x-0" : "-translate-x-full"}
          lg:translate-x-0
        `}
      >
        {/* Header */}
        <div className="px-6 py-5 text-xl font-bold tracking-wide 
          border-b border-slate-700 flex items-center justify-between">
          ⚡ Admin Panel
          <button
            onClick={() => setOpen(false)}
            className="lg:hidden text-slate-300"
          >
            <MdClose size={22} />
          </button>
        </div>

        {/* Menu */}
        <nav className="flex-1 px-3 py-4 space-y-1">
          {menu.map((item) => (
            <SidebarButton
              key={item.href}
              icon={item.icon}
              label={item.label}
              href={item.href}
              active={pathname === item.href}
              onClick={() => setOpen(false)}
            />
          ))}
        </nav>

        {/* Footer */}
        <div className="px-6 py-4 text-xs text-slate-400 border-t border-slate-700">
          © 2026 Dashboard
        </div>
      </aside>
    </>
  );
};

export default Sidebar;
