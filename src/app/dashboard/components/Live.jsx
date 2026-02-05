"use client";
import React, { useRef, useEffect } from "react";
import { MdLiveTv, MdVideocam, MdLocationOn } from "react-icons/md";

const cameras = [
  { title: "Entrance Camera", location: "Main Gate", src: "/videos/video4.mp4" },
  { title: "Parking Area", location: "Basement", src: "/videos/video2.mp4" },
  { title: "Lobby Camera", location: "Reception", src: "/videos/video3.mp4" },
  { title: "Flat Camera", location: "Apartment 404", src: "/videos/flat.mp4" },
];

const Live = () => {
  const videoRefs = useRef([]);

  useEffect(() => {
    videoRefs.current.forEach((video) => {
      if (video) video.play().catch(() => {});
    });
  }, []);

  return (
    <section
      className="w-full bg-slate-50 rounded-2xl shadow-md
      p-4 sm:p-5 md:p-6 lg:p-8 space-y-4 sm:space-y-6"
    >
      {/* Header */}
      <div className="flex items-center justify-between flex-wrap gap-2">
        <h2
          className="text-base sm:text-lg md:text-xl font-bold
          text-slate-800 flex items-center gap-2"
        >
          <MdLiveTv className="text-red-600 text-xl sm:text-2xl" />
          Live Monitoring
        </h2>

        <span
          className="flex items-center gap-2 text-xs sm:text-sm
          font-semibold bg-red-100 text-red-600 px-3 py-1 rounded-full"
        >
          <span className="w-2 h-2 bg-red-500 rounded-full animate-pulse" />
          LIVE
        </span>
      </div>

      {/* Camera Grid */}
      <div
        className="grid grid-cols-1 sm:grid-cols-2
        xl:grid-cols-3 gap-4 sm:gap-5 md:gap-6"
      >
        {cameras.map((cam, index) => (
          <article
            key={index}
            className="bg-white rounded-xl border shadow-sm
            overflow-hidden hover:shadow-lg transition"
          >
            {/* Video */}
            <div className="relative aspect-video overflow-hidden group">
              <video
                ref={(el) => (videoRefs.current[index] = el)}
                src={cam.src}
                autoPlay
                muted
                loop
                playsInline
                className="w-full h-full object-cover
                group-hover:scale-105 transition duration-300"
              />

              {/* Live Badge */}
              <div
                className="absolute top-2 left-2 sm:top-3 sm:left-3
                flex items-center gap-1 bg-black/70
                text-white text-[10px] sm:text-xs px-2 py-1 rounded"
              >
                <span className="w-2 h-2 bg-red-500 rounded-full animate-pulse" />
                LIVE
              </div>
            </div>

            {/* Info */}
            <div className="p-3 sm:p-4 space-y-1">
              <h3
                className="text-sm sm:text-base font-semibold
                text-slate-800 flex items-center gap-2"
              >
                <MdVideocam className="text-sky-600" />
                {cam.title}
              </h3>

              <p
                className="text-xs sm:text-sm text-slate-500
                flex items-center gap-1"
              >
                <MdLocationOn className="text-slate-400" />
                {cam.location}
              </p>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
};

export default Live;
