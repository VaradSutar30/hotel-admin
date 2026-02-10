"use client";

import { useState } from "react";

const hotels = [
  { id: 1, name: "Ocean View Resort", location: "Goa", price: 5000, image: "/images/goa.jfif" },
  { id: 2, name: "Mountain Retreat", location: "Manali", price: 4500, image: "/images/manali.jpg" },
  { id: 3, name: "City Central Hotel", location: "Mumbai", price: 3500, image: "/images/mumbai.jpg" },
];

export default function Dashboard() {
  const [activeTab, setActiveTab] = useState("dashboard");

  return (
    <div className="min-h-screen p-6 bg-gray-100">
      <div className="flex gap-4 mb-6">
        <button
          onClick={() => setActiveTab("dashboard")}
          className={`px-4 py-2 rounded ${
            activeTab === "dashboard"
              ? "bg-blue-600 text-white"
              : "bg-white border"
          }`}
        >
          Dashboard
        </button>

        <button
          onClick={() => setActiveTab("hotels")}
          className={`px-4 py-2 rounded ${
            activeTab === "hotels"
              ? "bg-blue-600 text-white"
              : "bg-white border"
          }`}
        >
          Premium Hotels
        </button>
      </div>

      {activeTab === "dashboard" && (
        <h1 className="text-2xl font-bold">Dashboard Overview</h1>
      )}

      {activeTab === "hotels" && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {hotels.map((hotel) => (
            <div key={hotel.id} className="bg-white p-4 rounded shadow">
              <img
                src={hotel.image}
                alt={hotel.name}
                className="h-40 w-full object-cover rounded"
              />
              <h2 className="font-bold mt-2">{hotel.name}</h2>
              <p>{hotel.location}</p>
              <p className="font-semibold">₹{hotel.price}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
