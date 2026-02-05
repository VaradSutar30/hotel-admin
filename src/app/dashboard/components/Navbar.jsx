"use client";

import { useEffect, useState, useRef } from "react";
import { auth } from "@/lib/firebase";
import { signOut, onAuthStateChanged } from "firebase/auth";
import { useRouter } from "next/navigation";

import {
  MdMenu,
  MdLogout,
  MdNotificationsNone,
  MdSearch,
} from "react-icons/md";
import { FaBookOpen } from "react-icons/fa";

export default function Navbar({ onMenuClick }) {
  const [user, setUser] = useState(null);
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef(null);
  const router = useRouter();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
    return () => unsubscribe();
  }, []);

  // Close dropdown when clicked outside
  useEffect(() => {
    const handler = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const logout = async () => {
    await signOut(auth);
    router.push("/");
  };

  return (
    <header className="h-16 bg-gradient-to-r from-indigo-600 to-blue-600 
      text-white flex items-center justify-between px-4 sm:px-6 
      shadow-md sticky top-0 z-40">

      {/* LEFT */}
      <div className="flex items-center gap-3">
        {/* Mobile Menu */}
        <button
          onClick={onMenuClick}
          className="lg:hidden p-2 rounded-md hover:bg-white/20"
        >
          <MdMenu size={24} />
        </button>

        {/* Logo */}
        <div className="flex items-center gap-2 cursor-pointer">
          <FaBookOpen size={24} />
          <h1 className="font-bold text-lg tracking-wide">
            MyBook
          </h1>
        </div>
      </div>

      {/* CENTER - Search */}
      <div className="hidden md:flex items-center bg-white/20 
        rounded-full px-4 py-2 w-[320px]">
        <MdSearch size={20} className="text-white/80" />
        <input
          type="text"
          placeholder="Search notes, books, topics..."
          className="bg-transparent outline-none text-sm 
          placeholder-white/70 ml-2 w-full"
        />
      </div>

      {/* RIGHT */}
      {user && (
        <div className="flex items-center gap-4 relative" ref={dropdownRef}>

          {/* Notification */}
          <button className="p-2 rounded-full hover:bg-white/20">
            <MdNotificationsNone size={24} />
          </button>

          {/* Profile */}
          <div
            onClick={() => setOpen(!open)}
            className="flex items-center gap-2 cursor-pointer"
          >
            <img
              src={user.photoURL || "/images/profile.jpg"}
              alt="profile"
              className="w-9 h-9 rounded-full border-2 border-white object-cover"
            />

            <div className="hidden sm:block text-sm leading-tight">
              <p className="font-semibold">
                {user.displayName || "User"}
              </p>
              <p className="text-xs text-white/80 truncate max-w-[140px]">
                {user.email}
              </p>
            </div>
          </div>

          {/* Dropdown */}
          {open && (
            <div className="absolute right-0 top-14 w-60 bg-white 
              text-gray-800 rounded-xl shadow-xl overflow-hidden">

              <div className="px-4 py-3 border-b">
                <p className="font-semibold text-sm">
                  {user.displayName || "User"}
                </p>
                <p className="text-xs text-gray-500">
                  {user.email}
                </p>
              </div>

              <button
                onClick={logout}
                className="w-full flex items-center gap-2 
                px-4 py-3 text-sm text-red-600 hover:bg-gray-50"
              >
                <MdLogout size={18} />
                Logout
              </button>
            </div>
          )}
        </div>
      )}
    </header>
  );
}
