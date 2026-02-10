"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image"; // ✅ FIX
import {
  MdHotel,
  MdStar,
  MdAttachMoney,
  MdPerson,
  MdLanguage,
  MdLocationOn,
} from "react-icons/md";

/* ---------------- DATA ---------------- */

const affordableHotels = [
  {
    id: 1,
    name: "Comfort Stay Srinagar",
    location: "Srinagar, J&K",
    price: 1500,
    rating: 4.2,
    image: "/images/affordable/srinagar1.jfif",
  },
  {
    id: 2,
    name: "Hill View Budget Inn",
    location: "Manali, HP",
    price: 1400,
    rating: 4.0,
    image: "/images/affordable/manali1.avif",
  },
  {
    id: 3,
    name: "City Budget Stay",
    location: "Pune, Maharashtra",
    price: 1300,
    rating: 3.9,
    image: "/images/affordable/pune1.jfif",
  },
];

const premiumHotels = [
  {
    id: 4,
    name: "Ocean View Resort",
    location: "Goa",
    price: 5000,
    rating: 4.8,
    image: "/images/goa.jfif",
  },
  {
    id: 5,
    name: "Mountain Retreat",
    location: "Manali",
    price: 4500,
    rating: 4.6,
    image: "/images/manali.jpg",
  },
  {
    id: 6,
    name: "Lakeside Villa",
    location: "Udaipur",
    price: 4800,
    rating: 4.7,
    image: "/images/udaipur.jfif",
  },
];

/* ---------------- COMPONENT ---------------- */

export default function Dashboard() {
  const router = useRouter();
  const [tab, setTab] = useState("affordable");
  const [language, setLanguage] = useState("English");

  const hotels = tab === "affordable" ? affordableHotels : premiumHotels;

  const bookHotel = (hotel) => {
    if (typeof window !== "undefined") { // ✅ SAFE
      localStorage.setItem("selectedHotel", JSON.stringify(hotel));
      router.push("/payment");
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">

      {/* HEADER */}
      <header className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white p-6 rounded-b-3xl shadow">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <h1 className="text-3xl font-bold">🏨 Hotel Booking Dashboard</h1>

          <div className="flex items-center gap-2 bg-white/20 px-4 py-2 rounded-xl">
            <MdLanguage />
            <select
              className="bg-transparent outline-none"
              value={language}
              onChange={(e) => setLanguage(e.target.value)}
            >
              <option>English</option>
              <option>Hindi</option>
              <option>Marathi</option>
            </select>
          </div>
        </div>
      </header>

      {/* STATS */}
      <section className="grid grid-cols-2 md:grid-cols-4 gap-4 p-6">
        <Stat icon={MdHotel} title="Hotels" value={hotels.length} />
        <Stat icon={MdPerson} title="Guests Today" value="320+" />
        <Stat icon={MdStar} title="Avg Rating" value="4.4" />
        <Stat icon={MdAttachMoney} title="Revenue" value="₹42K" />
      </section>

      {/* TABS */}
      <div className="flex justify-center gap-4 mt-2">
        <TabButton active={tab === "affordable"} onClick={() => setTab("affordable")}>
          Affordable Hotels
        </TabButton>
        <TabButton active={tab === "premium"} onClick={() => setTab("premium")}>
          Premium Hotels
        </TabButton>
      </div>

      {/* HOTEL CARDS */}
      <main className="p-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {hotels.map((hotel) => (
          <div
            key={hotel.id}
            className="bg-white rounded-2xl shadow hover:shadow-xl transition overflow-hidden"
          >
            <Image
              src={hotel.image}
              alt={hotel.name}
              width={400}
              height={200}
              className="h-48 w-full object-cover"
            />

            <div className="p-4 space-y-2">
              <h3 className="text-lg font-bold">{hotel.name}</h3>

              <p className="text-gray-600 flex items-center gap-1">
                <MdLocationOn /> {hotel.location}
              </p>

              <div className="flex items-center gap-1 text-yellow-500">
                <MdStar /> {hotel.rating}
              </div>

              <p className="font-semibold text-blue-600">
                ₹{hotel.price} / night
              </p>

              <button
                onClick={() => bookHotel(hotel)}
                className="w-full bg-blue-600 text-white py-2 rounded-xl hover:bg-blue-700 transition"
              >
                Book Now
              </button>
            </div>
          </div>
        ))}
      </main>

      {/* MAP */}
      <section className="p-6">
        <h2 className="text-xl font-bold mb-3">📍 Hotel Locations</h2>
        <iframe
          title="Hotel Locations"
          className="w-full h-64 rounded-2xl shadow"
          src="https://www.google.com/maps?q=India&output=embed"
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade" // ✅ FIX
        />
      </section>

      {/* FOOTER */}
      <footer className="bg-gray-900 text-white text-center py-4">
        © 2026 Hotel Booking System • Secure • Responsive • Professional
      </footer>
    </div>
  );
}

/* ---------------- SMALL COMPONENTS ---------------- */

const Stat = ({ icon: Icon, title, value }) => (
  <div className="bg-white p-4 rounded-2xl shadow flex items-center gap-3">
    <Icon className="text-3xl text-blue-600" />
    <div>
      <p className="font-bold text-lg">{value}</p>
      <p className="text-gray-500 text-sm">{title}</p>
    </div>
  </div>
);

const TabButton = ({ children, active, onClick }) => (
  <button
    onClick={onClick}
    className={`px-6 py-2 rounded-xl font-semibold transition ${
      active ? "bg-blue-600 text-white" : "bg-white text-gray-700 shadow"
    }`}
  >
    {children}
  </button>
);
