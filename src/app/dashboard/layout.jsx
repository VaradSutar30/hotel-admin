"use client";

import Navbar from "@/app/dashboard/components/Navbar";
import Sidebar from "@/app/dashboard/components/Sidebar";
import BottomBar from "@/app/dashboard/components/BottomBar";


export default function DashboardLayout({ children }) {
  return (
    <div className="min-h-screen flex flex-col">

      {/* Top Navbar */}
      <Navbar />

      <div className="flex flex-1">

        {/* Sidebar */}
        <Sidebar />

        {/* Main Content */}
        <main className="flex-1 p-6 bg-gray-100 space-y-6">
        
        {/* Page Content */}
          {children}

        </main>

      </div>

      {/* Bottom Bar */}
      <BottomBar />
    </div>
  );
}
