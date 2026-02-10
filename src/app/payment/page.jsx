"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import jsPDF from "jspdf";

export default function PaymentPage() {
  const router = useRouter();

  useEffect(() => {
    const data = localStorage.getItem("bookingData");
    if (!data) router.push("/dashboard");
  }, []);

  const booking = JSON.parse(
    typeof window !== "undefined"
      ? localStorage.getItem("bookingData")
      : null
  );

  const downloadPDF = () => {
    const pdf = new jsPDF();

    pdf.setFontSize(18);
    pdf.text("Premium Hotel Booking Receipt", 20, 20);

    pdf.setFontSize(12);
    pdf.text(`Hotel Name: ${booking.hotelName}`, 20, 40);
    pdf.text(`Location: ${booking.hotelLocation}`, 20, 50);
    pdf.text(`Guest Name: ${booking.name}`, 20, 60);
    pdf.text(`Email: ${booking.email}`, 20, 70);
    pdf.text(`Phone: ${booking.phone}`, 20, 80);
    pdf.text(`Check-In: ${booking.checkIn}`, 20, 90);
    pdf.text(`Check-Out: ${booking.checkOut}`, 20, 100);
    pdf.text(`Amount Paid: ₹${booking.price}`, 20, 120);

    pdf.setFontSize(10);
    pdf.text(
      "Thank you for choosing our Premium Hotel Services.",
      20,
      140
    );

    pdf.save("Premium-Hotel-Receipt.pdf");
  };

  if (!booking) return null;

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-xl shadow-lg w-full max-w-md text-center space-y-4">

        <h2 className="text-2xl font-bold text-green-600">
          Payment Successful ✅
        </h2>

        <p className="text-gray-600">
          Your premium booking is confirmed.
        </p>

        <div className="text-left text-sm bg-gray-50 p-4 rounded">
          <p><b>Hotel:</b> {booking.hotelName}</p>
          <p><b>Location:</b> {booking.hotelLocation}</p>
          <p><b>Amount:</b> ₹{booking.price}</p>
        </div>

        <button
          onClick={downloadPDF}
          className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
        >
          📄 Download Premium Receipt (PDF)
        </button>

        <button
          onClick={() => router.push("/dashboard")}
          className="w-full border py-2 rounded"
        >
          Back to Dashboard
        </button>

      </div>
    </div>
  );
}
