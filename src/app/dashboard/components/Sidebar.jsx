"use client";

import { useState } from "react";
import { usePathname } from "next/navigation";
import {
  MdDashboard,
  MdBookOnline,
  MdBarChart,
  MdSettings,
  MdMenu,
  MdClose,
  MdPeople,
  MdOutlineStar,
  MdOutlineAttachMoney,
  MdInfoOutline,
  MdListAlt,
  MdReceiptLong,
} from "react-icons/md";

import SidebarButton from "./SidebarButton";

const Sidebar = () => {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  /* MAIN MENU */
  const mainMenu = [
    { label: "Dashboard", href: "/dashboard", icon: MdDashboard },
    { label: "Bookings", href: "/dashboard/bookings", icon: MdBookOnline },
    { label: "Guests", href: "/dashboard/guests", icon: MdPeople },
    { label: "Analytics", href: "/dashboard/analytics", icon: MdBarChart },
  ];

  /* BOOKING INFO */
  const bookingMenu = [
    {
      label: "Invoices",
      href: "/dashboard/bookings/invoices",
      icon: MdReceiptLong,
    },
  ];

  /* HOTEL MANAGEMENT */
  const hotelMenu = [
    { label: "All Hotels", href: "/dashboard/hotels", icon: MdListAlt },
    {
      label: "Affordable Hotels",
      href: "/dashboard/hotels/affordable",
      icon: MdOutlineAttachMoney,
    },
    {
      label: "Premium Hotels",
      href: "/dashboard/hotels/premium",
      icon: MdOutlineStar,
    },
    {
      label: "Hotel Information",
      href: "/dashboard/hotels/info",
      icon: MdInfoOutline,
    },
  ];

  /* SETTINGS */
  const settingsMenu = [
    { label: "Settings", href: "/dashboard/settings", icon: MdSettings },
  ];

  return (
    <>
      {/* Mobile Toggle */}
      <button
        onClick={() => setOpen(true)}
        className="lg:hidden fixed top-4 left-4 z-50 
        bg-gradient-to-r from-indigo-600 to-blue-600 text-white p-2 rounded-md shadow-lg"
      >
        <MdMenu size={22} />
      </button>

      {/* Overlay */}
      {open && (
        <div
          onClick={() => setOpen(false)}
          className="fixed inset-0 bg-black/40 z-40 lg:hidden"
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed lg:static top-0 left-0 z-50 h-screen w-64
        bg-slate-900 text-white flex flex-col
        transform transition-transform duration-300
        ${open ? "translate-x-0" : "-translate-x-full"} lg:translate-x-0`}
      >
        {/* Header */}
        <div className="px-6 py-5 text-xl font-bold border-b border-slate-700 flex justify-between items-center">
          🏨 Hotel Admin
          <button onClick={() => setOpen(false)} className="lg:hidden">
            <MdClose size={22} />
          </button>
        </div>

        {/* MENU */}
        <nav className="px-3 py-4 space-y-6 overflow-y-auto">
          {/* MAIN */}
          <div>
            <p className="px-3 text-xs text-slate-400 uppercase mb-2">Main</p>
            {mainMenu.map((item) => (
              <SidebarButton
                key={item.href}
                {...item}
                active={pathname === item.href}
                onClick={() => setOpen(false)}
              />
            ))}
          </div>

          {/* BOOKING INFO */}
          <div>
            <p className="px-3 text-xs text-slate-400 uppercase mb-2">
              Booking Info
            </p>
            {bookingMenu.map((item) => (
              <SidebarButton
                key={item.href}
                {...item}
                active={pathname === item.href}
                onClick={() => setOpen(false)}
              />
            ))}
          </div>

          {/* HOTEL MANAGEMENT */}
          <div>
            <p className="px-3 text-xs text-slate-400 uppercase mb-2">
              Hotel Management
            </p>
            {hotelMenu.map((item) => (
              <SidebarButton
                key={item.href}
                {...item}
                active={pathname === item.href}
                onClick={() => setOpen(false)}
              />
            ))}
          </div>

          {/* SETTINGS */}
          <div>
            <p className="px-3 text-xs text-slate-400 uppercase mb-2">System</p>
            {settingsMenu.map((item) => (
              <SidebarButton
                key={item.href}
                {...item}
                active={pathname === item.href}
                onClick={() => setOpen(false)}
              />
            ))}
          </div>
        </nav>

        {/* Footer */}
        <div className="px-6 py-4 text-xs text-slate-400 border-t border-slate-700 mt-auto">
          © 2026 Hotel Management System
        </div>
      </aside>
    </>
  );
};

export default Sidebar;
