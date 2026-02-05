"use client"

import Navbar from "./components/Navbar"
import Sidebar from "./components/Sidebar"
import BottomBar from "./components/BottomBar"
import Live from "./components/Live"
import Hero from "./components/Hero"   // ✅ Hero import

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
          
          {/* 🟦 Hero Section */}
          <Hero />

          {/* 🔴 Live Component */}
          <Live />

          {/* बाकी pages/content */}
          {children}

        </main>

      </div>

      {/* Bottom Bar */}
      <BottomBar />
    </div>
  )
}
