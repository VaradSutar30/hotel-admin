"use client";

import { useEffect, useState } from "react";
import { jsPDF } from "jspdf";
import {
  MdReceiptLong,
  MdHotel,
  MdLocationOn,
  MdAccessTime,
  MdPayment,
  MdPeople,
  MdStar,
} from "react-icons/md";

export default function InvoicesPage() {
  const [booking, setBooking] = useState(null);

  // Load booking data from localStorage (or API)
  useEffect(() => {
    const data = localStorage.getItem("bookingData") || localStorage.getItem("selectedHotel");
    if (data) setBooking(JSON.parse(data));
  }, []);

  if (!booking) {
    return (
      <div className="p-6 text-gray-500 text-center">
        No booking information found
      </div>
    );
  }

  // -------- Calculations ----------
  const basePrice = booking.price || 0;
  const gst = basePrice * 0.12;
  const serviceFee = basePrice * 0.05;
  const total = basePrice + gst + serviceFee;

  const bookingId = "BK" + Date.now();
  const date = new Date().toLocaleDateString();
  const time = new Date().toLocaleTimeString();

  // -------- PDF Download Function ----------
  const downloadReceipt = () => {
    const pdf = new jsPDF();

    pdf.setFontSize(20);
    pdf.text("🏨 Hotel Booking Receipt", 20, 20);

    pdf.setFontSize(12);
    pdf.text("Premium Hotel Booking System", 20, 30);
    pdf.line(20, 34, 190, 34);

    pdf.text(`Booking ID: ${bookingId}`, 20, 44);
    pdf.text(`Hotel: ${booking.hotelName || booking.name}`, 20, 52);
    pdf.text(`Location: ${booking.hotelLocation || booking.location}`, 20, 60);
    pdf.text(`Guests: ${booking.guests || 1}`, 20, 68);
    pdf.text(`Payment Method: ${booking.payment || "Online"}`, 20, 76);
    pdf.text(`Date & Time: ${date} • ${time}`, 20, 84);

    pdf.line(20, 92, 190, 92);

    pdf.text(`Base Price: ₹${basePrice}`, 20, 102);
    pdf.text(`GST (12%): ₹${gst.toFixed(2)}`, 20, 110);
    pdf.text(`Service Fee (5%): ₹${serviceFee.toFixed(2)}`, 20, 118);

    pdf.setFontSize(14);
    pdf.text(`Total Amount: ₹${total.toFixed(2)}`, 20, 130);

    pdf.line(20, 136, 190, 136);

    pdf.setFontSize(12);
    pdf.text("Thank you for booking with us!", 20, 150);
    pdf.text("We wish you a pleasant stay 🏖️", 20, 158);

    // Open PDF in new tab
    const pdfUrl = pdf.output("bloburl");
    window.open(pdfUrl, "_blank");
  };

  return (
    <div className="p-6 space-y-6 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold flex items-center gap-2 text-indigo-600">
        <MdReceiptLong /> Booking Invoice
      </h1>

      <div className="bg-white rounded-2xl shadow-lg p-6 space-y-4 border border-gray-200">
        {/* Booking Info */}
        <Info label="Booking ID" value={bookingId} />
        <Info label="Hotel Name" value={booking.hotelName || booking.name} icon={<MdHotel />} />
        <Info label="Location" value={booking.hotelLocation || booking.location} icon={<MdLocationOn />} />
        <Info label="Guests" value={booking.guests || 1} icon={<MdPeople />} />
        <Info label="Room Type" value={booking.roomType || "Standard"} icon={<MdStar />} />
        <Info label="Payment Method" value={booking.payment || "Online"} icon={<MdPayment />} />
        <Info label="Date & Time" value={`${date} • ${time}`} icon={<MdAccessTime />} />

        {/* Pricing */}
        <div className="border-t pt-4 space-y-2">
          <Price label="Base Price" value={basePrice} />
          <Price label="GST (12%)" value={gst} />
          <Price label="Service Fee (5%)" value={serviceFee} />
          <Price label="Total Amount" value={total} bold />
        </div>

        {/* Download Button */}
        <button
          onClick={downloadReceipt}
          className="w-full mt-4 bg-indigo-600 text-white py-3 rounded-xl
          flex items-center justify-center gap-2 hover:bg-indigo-700 transition"
        >
          <MdReceiptLong /> Download Receipt (PDF)
        </button>

        <p className="text-center text-sm text-gray-500 pt-2">
          Thank you for booking with us 🌟
        </p>
      </div>
    </div>
  );
}

/* --------- SMALL COMPONENTS --------- */
const Info = ({ label, value, icon }) => (
  <div className="flex justify-between text-sm">
    <span className="text-gray-500 flex items-center gap-1">
      {icon} {label}
    </span>
    <span className="font-medium">{value}</span>
  </div>
);

const Price = ({ label, value, bold }) => (
  <div
    className={`flex justify-between ${bold ? "font-bold text-lg" : "text-sm"}`}
  >
    <span>{label}</span>
    <span>₹{value.toFixed(2)}</span>
  </div>
);
