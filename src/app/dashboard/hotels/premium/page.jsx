"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";

const hotels = [
  { id: 1, name: "Ocean View Resort", location: "Goa", price: 5000, image: "/images/goa.jfif" },
  { id: 2, name: "Mountain Retreat", location: "Manali", price: 4500, image: "/images/manali.jpg" },
  { id: 3, name: "City Central Hotel", location: "Mumbai", price: 3500, image: "/images/mumbai.jpg" },
  { id: 4, name: "Hotel Sangam", location: "Kanyakumari", price: 4800, image: "/images/kanyakumari.jfif" },
  { id: 5, name: "Lakeside Villa", location: "Udaipur", price: 4800, image: "/images/udaipur.jfif" },
  { id: 6, name: "Lalit Grand Palace", location: "Srinagar", price: 4800, image: "/images/srinagar.jfif" },
];

const Dashboard = () => {
  const router = useRouter();

  const [showForm, setShowForm] = useState(false);
  const [selectedHotel, setSelectedHotel] = useState(null);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    checkIn: "",
    checkOut: "",
  });

  const handleBooking = (hotel) => {
    setSelectedHotel(hotel);
    setShowForm(true);
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handlePayNow = (e) => {
    e.preventDefault();

    const bookingData = {
      hotelId: selectedHotel.id,
      hotelName: selectedHotel.name,
      hotelLocation: selectedHotel.location,
      price: selectedHotel.price,
      ...formData,
    };

    localStorage.setItem("bookingData", JSON.stringify(bookingData));
    router.push("/payment");
  };

  

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">
      
      
      <h1 className="text-3xl font-bold text-center mt-6 mb-2">
  🌟 Premium Hotels
</h1>
<p className="text-center text-gray-600 mb-6">
  Luxury stays with verified premium services
</p>


      {/* Hotels */}
      <main className="p-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {hotels.map((hotel) => (
          <div key={hotel.id} className="bg-white rounded-lg shadow">
            <img src={hotel.image} className="w-full h-48 object-cover" />
            <div className="p-4">
              <h3 className="font-bold text-lg">{hotel.name}</h3>
              <p className="text-gray-600">{hotel.location}</p>
              <p className="font-semibold mt-1">₹{hotel.price} / night</p>
              <button
                onClick={() => handleBooking(hotel)}
                className="mt-3 w-full bg-blue-600 text-white py-2 rounded"
              >
                Book Now
              </button>
            </div>
          </div>
        ))}
      </main>

      {/* Booking Modal */}
      {showForm && selectedHotel && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded w-11/12 md:w-1/3 relative">

            <button
              onClick={() => setShowForm(false)}
              className="absolute top-2 right-3 font-bold"
            >
              ✕
            </button>

            <h2 className="text-xl font-bold mb-4">
              Book {selectedHotel.name}
            </h2>

            <form onSubmit={handlePayNow} className="flex flex-col gap-3">
              <input name="name" required placeholder="Name"
                className="border p-2" value={formData.name} onChange={handleChange} />

              <input name="email" type="email" required placeholder="Email"
                className="border p-2" value={formData.email} onChange={handleChange} />

              <input name="phone" required placeholder="Phone"
                className="border p-2" value={formData.phone} onChange={handleChange} />

              <div className="flex gap-2">
                <input name="checkIn" type="date" required
                  className="border p-2 w-1/2" value={formData.checkIn} onChange={handleChange} />
                <input name="checkOut" type="date" required
                  className="border p-2 w-1/2" value={formData.checkOut} onChange={handleChange} />
              </div>

              <button
                type="submit"
                className="bg-green-600 text-white py-2 rounded hover:bg-green-700"
              >
                Pay Now
              </button>
            </form>

          </div>
        </div>
      )}

      <footer className="bg-gray-200 p-4 text-center">
        ✅ Easy Booking | ✅ Secure Payment | ✅ 24/7 Support
      </footer>
    </div>
  );
};

export default Dashboard;
