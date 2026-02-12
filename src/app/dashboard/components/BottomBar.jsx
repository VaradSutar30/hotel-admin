"use client";

import { usePathname } from "next/navigation";
import {
  MdDashboard,
  MdHotel,
  MdBarChart,
  MdPerson,
  MdSettings,
} from "react-icons/md";
import Link from "next/link";

export default function BottomBar() {
  const pathname = usePathname();

  const navItems = [
    { name: "Dashboard", icon: MdDashboard, path: "/dashboard" },
    { name: "Rooms", icon: MdHotel, path: "/rooms" },
    { name: "Analytics", icon: MdBarChart, path: "/analytics" },
    { name: "Profile", icon: MdPerson, path: "/profile" },
    { name: "Settings", icon: MdSettings, path: "/settings" },
  ];

  return (
    <div className="fixed bottom-0 left-0 w-full bg-white/90 backdrop-blur-md border-t shadow-lg md:hidden z-50">
      <div className="flex justify-around items-center h-16">
        {navItems.map((item, index) => {
          const Icon = item.icon;
          const isActive = pathname === item.path;

          return (
            <Link
              key={index}
              href={item.path}
              className={`flex flex-col items-center text-xs transition-all duration-300 ${
                isActive
                  ? "text-yellow-600 scale-110"
                  : "text-gray-500 hover:text-yellow-500"
              }`}
            >
              <Icon size={24} />
              <span className="mt-1 font-medium">{item.name}</span>

              {isActive && (
                <div className="w-6 h-1 bg-yellow-600 rounded-full mt-1"></div>
              )}
            </Link>
          );
        })}
      </div>
    </div>
  );
}