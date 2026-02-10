"use client";

import React, { useState, useEffect } from "react";
import {
  MdHotel,
  MdStar,
  MdAttachMoney,
  MdPerson,
  MdWifi,
  MdLocalParking,
  MdRestaurant,
  MdDownload,
} from "react-icons/md";

// Hotels Data
const hotels = [
  { name: "Comfort Stay Srinagar", location: "Srinagar, Jammu & Kashmir", rating: 4.2, price: 1500, totalRooms: 10, image: "/images/affordable/srinagar1.jfif", features: ["WiFi","Food","Parking"] },
  { name: "Hill View Budget Inn", location: "Manali, Himachal Pradesh", rating: 4.0, price: 1400, totalRooms: 9, image: "/images/affordable/manali1.Avif", features: ["WiFi","Food"] },
  { name: "Lake Side Comfort", location: "Udaipur, Rajasthan", rating: 4.1, price: 1600, totalRooms: 12, image: "/images/affordable/udaipur1.jfif", features: ["WiFi","Parking"] },
  { name: "Green Nest Residency", location: "Munnar, Kerala", rating: 4.3, price: 1700, totalRooms: 8, image: "/images/affordable/munnar1.jfif", features: ["WiFi","Food","Parking"] },
  { name: "City Budget Stay", location: "Pune, Maharashtra", rating: 3.9, price: 1300, totalRooms: 15, image: "/images/affordable/pune1.jfif", features: ["WiFi","Parking"] },
  { name: "Golden Temple View Inn", location: "Amritsar, Punjab", rating: 4.0, price: 1450, totalRooms: 11, image: "/images/affordable/amritsar1.jfif", features: ["WiFi","Food"] },
];

// Stats
const stats = [
  { icon: MdHotel, title: "Hotels", value: hotels.length },
  { icon: MdPerson, title: "Guests Today", value: 320 },
  { icon: MdStar, title: "Average Rating", value: 4.1 },
  { icon: MdAttachMoney, title: "Revenue Today", value: "₹42,000" },
];

export default function DashboardHero() {
  const [requestedRooms, setRequestedRooms] = useState({});
  const [selectedHotel, setSelectedHotel] = useState(null);
  const [step, setStep] = useState("form");
  const [bookingForm, setBookingForm] = useState({
    name: "",
    email: "",
    checkIn: "",
    checkOut: "",
    rooms: 1,
    payment: "UPI",
  });
  const [allBookings, setAllBookings] = useState([]);

  // Load bookings from localStorage
  useEffect(() => {
    const stored = localStorage.getItem("bookings");
    if (stored) setAllBookings(JSON.parse(stored));
  }, []);

  const handleChange = (e) => {
    setBookingForm({ ...bookingForm, [e.target.name]: e.target.value });
  };

  const handleRoomsChange = (hotelName, value, total) => {
    setRequestedRooms((prev) => ({
      ...prev,
      [hotelName]: Math.min(Math.max(value, 0), total),
    }));
  };

  const confirmBooking = () => {
    const bookingId = "BK" + Date.now();
    const date = new Date().toLocaleDateString();
    const time = new Date().toLocaleTimeString();

    const newBooking = {
      id: bookingId,
      hotel: selectedHotel,
      guest: bookingForm,
      date,
      time,
      roomsBooked: bookingForm.rooms,
      totalAmount: selectedHotel.price * bookingForm.rooms,
    };

    // Save to localStorage
    const updatedBookings = [...allBookings, newBooking];
    localStorage.setItem("bookings", JSON.stringify(updatedBookings));
    setAllBookings(updatedBookings);

    setStep("receipt");
  };

  const downloadReceipt = (booking) => {
    const receipt = `
Booking ID: ${booking.id}
Hotel: ${booking.hotel.name}
Location: ${booking.hotel.location}
Guest Name: ${booking.guest.name}
Email: ${booking.guest.email}
Rooms: ${booking.roomsBooked}
Check-in: ${booking.guest.checkIn}
Check-out: ${booking.guest.checkOut}
Payment: ${booking.guest.payment}
Amount: ₹${booking.totalAmount}
Date: ${booking.date}
Time: ${booking.time}
`;
    const blob = new Blob([receipt], { type: "text/plain" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = "hotel-receipt.txt";
    link.click();
  };

  return (
    <div className="w-full space-y-10">
      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, i) => (
          <div
            key={i}
            className="bg-gradient-to-r from-blue-500 to-cyan-500 p-6 rounded-2xl shadow-lg flex items-center gap-4"
          >
            <stat.icon className="text-3xl text-white" />
            <div>
              <p className="text-white font-bold text-xl">{stat.value}</p>
              <p className="text-white/80 text-sm">{stat.title}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Hotels */}
      <h2 className="text-2xl font-bold">Affordable Hotels</h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {hotels.map((hotel, i) => {
          const rooms = requestedRooms[hotel.name] || 0;
          const available = hotel.totalRooms - rooms;

          return (
            <div key={i} className="bg-white rounded-2xl shadow-md overflow-hidden">
              <img
                src={hotel.image}
                alt={hotel.name}
                className="h-44 w-full object-cover"
              />

              <div className="p-4 space-y-2">
                <h3 className="text-xl font-bold">{hotel.name}</h3>
                <p className="text-gray-600">{hotel.location}</p>
                <div className="flex items-center gap-1">
                  {[...Array(Math.floor(hotel.rating))].map((_, idx) => (
                    <MdStar key={idx} className="text-yellow-400" />
                  ))}
                  <span className="ml-1 text-sm">{hotel.rating}</span>
                </div>
                <p className="font-semibold">₹{hotel.price} / night</p>
                <p className="text-sm">
                  Available Rooms: <b>{available}</b>
                </p>
                <div className="flex gap-3">
                  {hotel.features.includes("WiFi") && <MdWifi />}
                  {hotel.features.includes("Food") && <MdRestaurant />}
                  {hotel.features.includes("Parking") && <MdLocalParking />}
                </div>

                <button
                  onClick={() => {
                    setSelectedHotel(hotel);
                    setStep("form");
                  }}
                  className="w-full mt-3 bg-blue-600 text-white py-2 rounded-xl"
                >
                  Book Now
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* Booking Modal */}
      {selectedHotel && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl p-6 w-[90%] max-w-md relative">
            <button
              onClick={() => setSelectedHotel(null)}
              className="absolute top-3 right-3 text-xl font-bold"
            >
              ✕
            </button>

            {step === "form" && (
              <>
                <h3 className="text-xl font-bold mb-4">
                  Book {selectedHotel.name}
                </h3>

                <input
                  name="name"
                  placeholder="Name"
                  value={bookingForm.name}
                  onChange={handleChange}
                  className="border p-2 w-full mb-2 rounded"
                />
                <input
                  name="email"
                  placeholder="Email"
                  value={bookingForm.email}
                  onChange={handleChange}
                  className="border p-2 w-full mb-2 rounded"
                />
                <input
                  type="date"
                  name="checkIn"
                  value={bookingForm.checkIn}
                  onChange={handleChange}
                  className="border p-2 w-full mb-2 rounded"
                />
                <input
                  type="date"
                  name="checkOut"
                  value={bookingForm.checkOut}
                  onChange={handleChange}
                  className="border p-2 w-full mb-2 rounded"
                />

                <button
                  onClick={() => setStep("payment")}
                  className="w-full bg-blue-600 text-white py-2 rounded-xl"
                >
                  Continue
                </button>
              </>
            )}

            {step === "payment" && (
              <>
                <h3 className="text-xl font-bold mb-3">Payment</h3>

                {["UPI", "Card", "Pay at Hotel"].map((p) => (
                  <label key={p} className="flex gap-2 mb-2">
                    <input
                      type="radio"
                      name="payment"
                      value={p}
                      onChange={handleChange}
                      checked={bookingForm.payment === p}
                    />
                    {p}
                  </label>
                ))}

                <button
                  onClick={confirmBooking}
                  className="w-full bg-green-600 text-white py-2 rounded-xl"
                >
                  Confirm Booking
                </button>
              </>
            )}

            {step === "receipt" && (
              <>
                <h3 className="text-xl font-bold text-green-600 mb-3">
                  Booking Confirmed 🎉
                </h3>

                <p><b>Hotel:</b> {selectedHotel.name}</p>
                <p><b>Name:</b> {bookingForm.name}</p>
                <p><b>Email:</b> {bookingForm.email}</p>
                <p><b>Check-in:</b> {bookingForm.checkIn}</p>
                <p><b>Check-out:</b> {bookingForm.checkOut}</p>
                <p><b>Payment:</b> {bookingForm.payment}</p>
                <p><b>Rooms:</b> {bookingForm.rooms}</p>
                <p><b>Price per Room:</b> ₹{selectedHotel.price}</p>
                <p><b>Total:</b> ₹{selectedHotel.price * bookingForm.rooms}</p>

                <button
                  onClick={() =>
                    downloadReceipt({
                      id: "BK" + Date.now(),
                      hotel: selectedHotel,
                      guest: bookingForm,
                      roomsBooked: bookingForm.rooms,
                      totalAmount: selectedHotel.price * bookingForm.rooms,
                      date: new Date().toLocaleDateString(),
                      time: new Date().toLocaleTimeString(),
                    })
                  }
                  className="w-full mt-4 flex gap-2 justify-center border py-2 rounded-xl"
                >
                  <MdDownload /> Download Receipt
                </button>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
