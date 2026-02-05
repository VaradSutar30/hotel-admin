"use client";
import React, { useState } from "react";
import { db } from "@/lib/firebase";
import { collection, addDoc, Timestamp } from "firebase/firestore";

const RoomBooking = () => {
  const [form, setForm] = useState({
    name: "",
    room: "",
    date: "",
    time: "",
  });

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await addDoc(collection(db, "bookings"), {
        ...form,
        status: "pending",
        createdAt: Timestamp.now(),
      });

      alert("Room booked successfully!");
      setForm({ name: "", room: "", date: "", time: "" });
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="max-w-xl bg-white p-6 rounded-xl shadow">
      <h2 className="text-xl font-bold mb-4">Book a Room</h2>

      <form onSubmit={handleSubmit} className="space-y-3">
        <input
          name="name"
          placeholder="Your Name"
          className="w-full border p-2 rounded"
          value={form.name}
          onChange={handleChange}
        />

        <select
          name="room"
          className="w-full border p-2 rounded"
          value={form.room}
          onChange={handleChange}
        >
          <option value="">Select Room</option>
          <option>Conference Room</option>
          <option>Meeting Room</option>
          <option>Training Room</option>
        </select>

        <input
          type="date"
          name="date"
          className="w-full border p-2 rounded"
          value={form.date}
          onChange={handleChange}
        />

        <input
          type="time"
          name="time"
          className="w-full border p-2 rounded"
          value={form.time}
          onChange={handleChange}
        />

        <button className="w-full bg-green-600 text-white py-2 rounded">
          Submit Booking
        </button>
      </form>
    </div>
  );
};

export default RoomBooking;
