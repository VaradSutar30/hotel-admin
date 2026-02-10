"use client";

import {
  MdBusiness,
  MdAdminPanelSettings,
  MdSecurity,
  MdPublic,
  MdHotel,
  MdPayments,
  MdNotificationsActive,
  MdCloudSync,
  MdSave,
} from "react-icons/md";

export default function Settings() {
  return (
    <div className="space-y-10">

      {/* PAGE HEADER */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900">
          Enterprise Control Panel
        </h1>
        <p className="text-gray-500">
          Global hotel operations, security & compliance management
        </p>
      </div>

      {/* ORGANIZATION SETTINGS */}
      <section className="bg-white p-6 rounded-2xl shadow">
        <h2 className="flex items-center gap-2 text-xl font-semibold mb-4">
          <MdBusiness className="text-indigo-600 text-2xl" />
          Organization Profile
        </h2>

        <div className="grid md:grid-cols-3 gap-4">
          <input className="border rounded-xl p-3" placeholder="Company Name" />
          <input className="border rounded-xl p-3" placeholder="Headquarters Location" />
          <input className="border rounded-xl p-3" placeholder="GST / Tax ID" />
          <input className="border rounded-xl p-3" placeholder="Support Email" />
          <input className="border rounded-xl p-3" placeholder="Support Phone" />
          <select className="border rounded-xl p-3">
            <option>Company Size</option>
            <option>Startup</option>
            <option>Mid-size</option>
            <option>Enterprise</option>
          </select>
        </div>
      </section>

      {/* ADMIN & ROLE MANAGEMENT */}
      <section className="bg-white p-6 rounded-2xl shadow">
        <h2 className="flex items-center gap-2 text-xl font-semibold mb-4">
          <MdAdminPanelSettings className="text-blue-600 text-2xl" />
          Admin & Role Management
        </h2>

        <div className="grid md:grid-cols-2 gap-4">
          <select className="border rounded-xl p-3">
            <option>Default User Role</option>
            <option>Super Admin</option>
            <option>Hotel Manager</option>
            <option>Front Desk Staff</option>
          </select>

          <select className="border rounded-xl p-3">
            <option>Access Level</option>
            <option>Full Access</option>
            <option>Limited Access</option>
            <option>Read Only</option>
          </select>
        </div>

        <p className="text-sm text-gray-500 mt-3">
          Role-based access control (RBAC) enabled for enterprise security
        </p>
      </section>

      {/* SECURITY & COMPLIANCE */}
      <section className="bg-white p-6 rounded-2xl shadow">
        <h2 className="flex items-center gap-2 text-xl font-semibold mb-4">
          <MdSecurity className="text-red-600 text-2xl" />
          Security & Compliance
        </h2>

        <div className="grid md:grid-cols-2 gap-4 text-sm text-gray-700">
          <p>🔐 Mandatory Two-Factor Authentication (2FA)</p>
          <p>🛡️ GDPR / ISO 27001 Compliance</p>
          <p>📍 IP-based Login Restriction</p>
          <p>🧾 Audit Logs & Login History</p>
          <p>🚫 Fraud & Suspicious Activity Detection</p>
          <p>🔄 Automatic Session Expiry</p>
        </div>
      </section>

      {/* GLOBAL HOTEL OPERATIONS */}
      <section className="bg-white p-6 rounded-2xl shadow">
        <h2 className="flex items-center gap-2 text-xl font-semibold mb-4">
          <MdHotel className="text-green-600 text-2xl" />
          Global Hotel Operations
        </h2>

        <div className="grid md:grid-cols-3 gap-4">
          <select className="border rounded-xl p-3">
            <option>Hotel Category</option>
            <option>Budget</option>
            <option>Premium</option>
            <option>Luxury</option>
          </select>

          <select className="border rounded-xl p-3">
            <option>Booking Workflow</option>
            <option>Auto Confirm</option>
            <option>Manager Approval</option>
          </select>

          <select className="border rounded-xl p-3">
            <option>Pricing Strategy</option>
            <option>Dynamic Pricing</option>
            <option>Fixed Pricing</option>
          </select>
        </div>
      </section>

      {/* PAYMENTS & FINANCE */}
      <section className="bg-white p-6 rounded-2xl shadow">
        <h2 className="flex items-center gap-2 text-xl font-semibold mb-4">
          <MdPayments className="text-emerald-600 text-2xl" />
          Payments & Finance
        </h2>

        <div className="grid md:grid-cols-2 gap-4">
          <select className="border rounded-xl p-3">
            <option>Primary Currency</option>
            <option>INR (₹)</option>
            <option>USD ($)</option>
            <option>EUR (€)</option>
          </select>

          <select className="border rounded-xl p-3">
            <option>Payment Gateway</option>
            <option>Razorpay</option>
            <option>Stripe</option>
            <option>PayPal</option>
          </select>
        </div>
      </section>

      {/* NOTIFICATIONS & INTEGRATIONS */}
      <section className="bg-white p-6 rounded-2xl shadow">
        <h2 className="flex items-center gap-2 text-xl font-semibold mb-4">
          <MdNotificationsActive className="text-purple-600 text-2xl" />
          Notifications & Integrations
        </h2>

        <div className="space-y-2 text-sm text-gray-700">
          <p>📧 Email Alerts for Bookings & Payments</p>
          <p>📲 SMS & WhatsApp Guest Notifications</p>
          <p>🔔 Real-time Admin Alerts</p>
          <p>☁️ Cloud Backup & Sync</p>
        </div>
      </section>

      {/* SAVE BUTTON */}
      <div className="flex justify-end">
        <button
          className="flex items-center gap-2 bg-indigo-600 text-white
          px-8 py-3 rounded-2xl font-semibold hover:bg-indigo-700 transition"
        >
          <MdSave size={20} />
          Apply Enterprise Settings
        </button>
      </div>

    </div>
  );
}
