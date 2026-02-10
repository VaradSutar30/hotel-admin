"use client";

import { useEffect, useState } from "react";
import { auth } from "@/lib/firebase";
import { signOut, onAuthStateChanged } from "firebase/auth";
import { useRouter } from "next/navigation";

import {
  MdMenu,
  MdLogout,
  MdSearch,
  MdHotel,
  MdAdd,
  MdClose,
} from "react-icons/md";
import { FaUserCircle } from "react-icons/fa";

export default function Navbar({ onMenuClick, onSearch }) {
  const [user, setUser] = useState(null);
  const [query, setQuery] = useState("");
  const [drawer, setDrawer] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (u) => setUser(u));
    return () => unsub();
  }, []);

  const logout = async () => {
    await signOut(auth);
    router.push("/");
  };

  return (
    <>
      {/* NAVBAR */}
      <header className="h-16 sticky top-0 z-50 
        bg-white/70 backdrop-blur-xl border-b 
        flex items-center justify-between px-4 sm:px-6">

        {/* LEFT */}
        <div className="flex items-center gap-3">
          <button
            onClick={onMenuClick}
            className="lg:hidden p-2 rounded-lg hover:bg-gray-100"
          >
            <MdMenu size={24} />
          </button>

          <div className="flex items-center gap-2 font-bold text-lg">
            <MdHotel className="text-blue-600" />
            Mybooking
          </div>
        </div>

        {/* SEARCH */}
        <div className="hidden md:flex items-center 
          bg-gray-100 rounded-full px-4 py-2 w-[360px]">
          <MdSearch className="text-gray-500" />
          <input
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              onSearch?.(e.target.value);
            }}
            type="text"
            placeholder="Search hotels by name or location..."
            className="bg-transparent outline-none ml-2 w-full text-sm"
          />
        </div>

        {/* RIGHT */}
        {user && (
          <button
            onClick={() => setDrawer(true)}
            className="flex items-center gap-2 
              px-3 py-1.5 rounded-full hover:bg-gray-100"
          >
            <img
              src={user.photoURL || "/images/profile.jpg"}
              className="w-9 h-9 rounded-full object-cover"
            />
            <span className="hidden sm:block text-sm font-semibold">
              {user.displayName || "User"}
            </span>
          </button>
        )}
      </header>

      {/* PROFILE DRAWER */}
      {drawer && (
        <div className="fixed inset-0 z-50 flex">
          {/* Overlay */}
          <div
            onClick={() => setDrawer(false)}
            className="flex-1 bg-black/40"
          />

          {/* Drawer */}
          <div className="w-80 bg-white p-5 space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="font-bold text-lg">Profile</h2>
              <MdClose
                size={22}
                className="cursor-pointer"
                onClick={() => setDrawer(false)}
              />
            </div>

            {/* User Info */}
            <div className="flex items-center gap-3">
              <FaUserCircle size={48} className="text-gray-400" />
              <div>
                <p className="font-semibold">
                  {user?.displayName || "User"}
                </p>
                <p className="text-sm text-gray-500">
                  {user?.email}
                </p>
              </div>
            </div>

            {/* Hotel Filters */}
            <div>
              <p className="font-semibold mb-2">Hotel Type</p>
              <div className="flex gap-2 flex-wrap">
                {["All", "Budget", "Premium", "Luxury"].map((type) => (
                  <button
                    key={type}
                    className="px-3 py-1.5 border rounded-full text-sm hover:bg-gray-100"
                  >
                    {type}
                  </button>
                ))}
              </div>
            </div>

            {/* Add Hotel */}
            <button
              onClick={() => alert("Open Add Hotel Form")}
              className="w-full flex items-center gap-2 
                justify-center bg-blue-600 
                text-white py-2 rounded-xl"
            >
              <MdAdd size={20} />
              Add New Hotel
            </button>

            {/* Logout */}
            <button
              onClick={logout}
              className="w-full flex items-center gap-2 
                justify-center border py-2 
                rounded-xl text-red-600"
            >
              <MdLogout size={20} />
              Logout
            </button>
          </div>
        </div>
      )}
    </>
  );
}
