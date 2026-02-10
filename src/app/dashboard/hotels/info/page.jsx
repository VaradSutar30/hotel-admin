"use client";

import {
  MdHotel,
  MdStar,
  MdLocationCity,
  MdKingBed,
  MdTrendingUp,
} from "react-icons/md";

export default function HotelInfo() {
  return (
    <div className="space-y-8">

      {/* Page Title */}
      <div>
        <h1 className="text-2xl font-bold text-slate-800">
          Hotel Overview
        </h1>
        <p className="text-sm text-slate-500">
          Complete hotel portfolio performance & statistics
        </p>
      </div>

      {/* Top Stats */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          icon={<MdHotel />}
          label="Total Hotels"
          value="24"
          color="from-indigo-500 to-blue-500"
        />
        <StatCard
          icon={<MdStar />}
          label="Average Rating"
          value="4.3 ★"
          color="from-yellow-400 to-orange-500"
        />
        <StatCard
          icon={<MdLocationCity />}
          label="Cities Covered"
          value="12"
          color="from-emerald-500 to-green-600"
        />
        <StatCard
          icon={<MdKingBed />}
          label="Total Rooms"
          value="860"
          color="from-purple-500 to-pink-500"
        />
      </div>

      {/* Hotel Category Breakdown */}
      <div className="grid lg:grid-cols-2 gap-6">
        {/* Category */}
        <div className="bg-white rounded-2xl shadow p-6 space-y-4">
          <h2 className="font-bold text-lg text-slate-800">
            Hotel Categories
          </h2>

          <Progress label="Premium Hotels" value={65} />
          <Progress label="Affordable Hotels" value={35} />
        </div>

        {/* Performance */}
        <div className="bg-white rounded-2xl shadow p-6 space-y-4">
          <h2 className="font-bold text-lg text-slate-800">
            Performance Summary
          </h2>

          <div className="flex items-center gap-3 text-sm">
            <MdTrendingUp className="text-green-600 text-xl" />
            <span>
              Occupancy Rate:
              <b className="ml-1 text-slate-800">78%</b>
            </span>
          </div>

          <div className="flex items-center gap-3 text-sm">
            <MdTrendingUp className="text-green-600 text-xl" />
            <span>
              Monthly Growth:
              <b className="ml-1 text-slate-800">+12%</b>
            </span>
          </div>

          <div className="flex items-center gap-3 text-sm">
            <MdTrendingUp className="text-green-600 text-xl" />
            <span>
              Customer Satisfaction:
              <b className="ml-1 text-slate-800">92%</b>
            </span>
          </div>
        </div>
      </div>

      {/* Footer Note */}
      <div className="bg-gradient-to-r from-indigo-600 to-blue-600 
        text-white rounded-xl p-5 text-sm shadow">
        🏨 This dashboard reflects real-time hotel data.  
        Connect Firebase or API to make it fully dynamic.
      </div>

    </div>
  );
}

/* ---------------- COMPONENTS ---------------- */

function StatCard({ icon, label, value, color }) {
  return (
    <div
      className={`rounded-2xl p-5 text-white shadow
      bg-gradient-to-r ${color}`}
    >
      <div className="flex items-center gap-3">
        <div className="text-3xl opacity-90">{icon}</div>
        <div>
          <p className="text-sm opacity-90">{label}</p>
          <p className="text-xl font-bold">{value}</p>
        </div>
      </div>
    </div>
  );
}

function Progress({ label, value }) {
  return (
    <div>
      <div className="flex justify-between text-sm mb-1">
        <span className="font-medium text-slate-700">{label}</span>
        <span className="text-slate-500">{value}%</span>
      </div>
      <div className="w-full h-2 bg-slate-200 rounded-full">
        <div
          className="h-2 bg-indigo-600 rounded-full"
          style={{ width: `${value}%` }}
        />
      </div>
    </div>
  );
}
