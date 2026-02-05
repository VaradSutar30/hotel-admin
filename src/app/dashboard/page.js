"use client";

import React from "react";
import { auth } from "@/lib/firebase";
import { signOut } from "firebase/auth";
import { useRouter } from "next/navigation";

const hotels = [
  {
    id: 1,
    name: "Ocean View Resort",
    location: "Goa",
    price: 5000,
    image: "https://source.unsplash.com/400x200/?resort",
  },
  {
    id: 2,
    name: "Mountain Retreat",
    location: "Manali",
    price: 4500,
    image: "https://source.unsplash.com/400x200/?mountain,resort",
  },
  {
    id: 3,
    name: "City Central Hotel",
    location: "Mumbai",
    price: 3500,
    image: "https://source.unsplash.com/400x200/?hotel,city",
  },
  {
    id: 4,
    name: "Lakeside Villa",
    location: "Udaipur",
    price: 4800,
    image: "https://source.unsplash.com/400x200/?lake,resort",
  },
];

const Dashboard = () => {
  const router = useRouter();

  const logout = async () => {
    await signOut(auth);
    router.push("/");
  };

  const handleBooking = (hotel) => {
    alert(`You have booked ${hotel.name} in ${hotel.location} for ₹${hotel.price}`);
    // TODO: Save booking to Firebase
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">
     
       
 {/* Hotels List */}
      <section className="p-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {hotels.map((hotel) => (
          <div
            key={hotel.id}
            className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition flex flex-col"
          >
            <img
              src={hotel.image}
              alt={hotel.name}
              className="w-full h-48 object-cover"
            />
            <div className="p-4 flex flex-col flex-grow">
              <h3 className="text-lg md:text-xl font-bold">{hotel.name}</h3>
              <p className="text-gray-600">{hotel.location}</p>
              <p className="text-gray-800 font-semibold mt-2">₹{hotel.price} / night</p>
              <button
                onClick={() => handleBooking(hotel)}
                className="mt-auto w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
              >
                Book Now
              </button>
            </div>
          </div>
        ))}
      </section>

      {/* Footer / Features */}
      <footer className="bg-gray-200 p-6 text-center mt-auto">
        <h4 className="font-bold mb-2">Why Choose Us?</h4>
        <p className="text-sm md:text-base">
          ✅ Easy Booking & Payment | ✅ 24/7 Support | ✅ Best Hotels & Deals
        </p>
      </footer>
    </div>
  );
};

export default Dashboard;
