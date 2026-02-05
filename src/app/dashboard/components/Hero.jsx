"use client";
import React from "react";
import { MdGroups, MdKeyboardArrowRight } from "react-icons/md";

const members = [
  "Varad",
  "Nainesh",
  "Shreyash",
  "Kunal",
  "Yogesh",
  "Pradip",
  "Tushar",
];

const Hero = () => {
  return (
    <div
      className="w-full bg-gradient-to-r from-green-500 to-emerald-600
      rounded-2xl shadow-lg px-4 sm:px-6 lg:px-10 py-5 sm:py-6 lg:py-8"
    >
      {/* Header */}
      <div className="flex items-center justify-between">
        <h1
          className="text-sm sm:text-lg lg:text-xl font-bold
          text-emerald-950 flex items-center gap-2"
        >
          <MdGroups className="text-lg sm:text-2xl" />
          Team Members
        </h1>

        <span
          className="text-[10px] sm:text-sm bg-emerald-100
          text-emerald-800 px-3 py-1 rounded-full font-medium"
        >
          {members.length} Active
        </span>
      </div>

      {/* Members */}
      <div
        className="
        mt-4
        flex gap-5
        overflow-x-auto
        sm:grid sm:grid-cols-4
        lg:grid-cols-7
        sm:overflow-visible
        pb-2
        scrollbar-hide
        "
      >
        {members.map((name, i) => (
          <div
            key={i}
            className="flex flex-col items-center shrink-0 group"
          >
            <img
              src={`/images/image${i + 1}.jfif`}
              alt={name}
              className="
              w-10 h-10
              sm:w-12 sm:h-12
              lg:w-14 lg:h-14
              rounded-full border-2 border-white shadow
              lg:group-hover:scale-110
              transition
              "
            />
            <span
              className="
              text-[10px]
              sm:text-xs
              lg:text-sm
              mt-1
              text-emerald-950 font-medium
              "
            >
              {name}
            </span>
          </div>
        ))}

        {/* More indicator (desktop only) */}
        <div
          className="
          hidden lg:flex items-center justify-center gap-1
          text-sm text-emerald-950 font-semibold
          "
        >
          +12
          <MdKeyboardArrowRight className="text-lg" />
        </div>
      </div>

      {/* Mobile hint */}
      <p className="mt-2 text-[10px] text-emerald-900 sm:hidden">
        👉 Swipe to view team members
      </p>
    </div>
  );
};

export default Hero;
