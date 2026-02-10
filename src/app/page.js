"use client";

import React, { useState } from "react";
import { auth } from "@/lib/firebase";
import { createUserWithEmailAndPassword, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { useRouter } from "next/navigation";
import { FcGoogle } from "react-icons/fc";
import { FaEnvelope, FaLock, FaEye, FaEyeSlash } from "react-icons/fa";

const Signup = () => {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");


  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleSignup = async () => {
    try {


      await createUserWithEmailAndPassword(auth, email, password);
      router.push("/dashboard"); // Redirect after successful signup
    } catch (err) {
      setError(err.message);
    }
  };

  const handleGoogleLogin = async () => {
    try {
      await signInWithPopup(auth, new GoogleAuthProvider());
      router.push("/dashboard");
    } catch (err) {
      setError(err.message);
    }
  };



  return (

    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-blue-50 to-sky-100 px-4">
      <div className="w-full max-w-md bg-white rounded-3xl shadow-xl p-8 sm:p-10 space-y-6">

        {/* Header */}
        <div className="text-center">
          <h1 className="text-3xl font-bold text-slate-900">Create Your Account</h1>
          <p className="text-sm text-slate-500 mt-2">
            Sign up to start booking your favorite hotels
          </p>
        </div>

        {/* Error */}
        {error && (
          <p className="text-red-600 text-sm text-center bg-red-50 p-2 rounded">
            {error}
          </p>
        )}

        {/* Email */}
        <div className="relative">
          <FaEnvelope className="absolute left-3 top-3 text-slate-400" />
          <input
            type="email"
            placeholder="Email address"
            className="w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-500 transition"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        {/* Password */}
        <div className="relative">
          <FaLock className="absolute left-3 top-3 text-slate-400" />

          <input
            type={showPassword ? "text" : "password"}
            placeholder="Password"
            className="w-full pl-10 pr-10 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-500 transition"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />


          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3 top-3 text-slate-500 hover:text-slate-700"
          >
            {showPassword ? <FaEyeSlash /> : <FaEye />}
          </button>
        </div>

        {/* Signup Button */}
        <button
          onClick={handleSignup}
          className="w-full bg-sky-600 hover:bg-sky-700 text-white py-3 rounded-lg font-semibold transition"
        >
          Sign Up
        </button>

        {/* OR Divider */}
        <div className="flex items-center gap-2 mt-2">
          <div className="flex-1 h-px bg-gray-300"></div>
          <span className="text-xs text-gray-500">OR SIGN UP WITH</span>
          <div className="flex-1 h-px bg-gray-300"></div>
        </div>

        {/* Google Login */}
        <button
          onClick={handleGoogleLogin}
          className="w-full flex items-center justify-center gap-3 border py-3 rounded-lg hover:bg-gray-50 transition mt-2"
        >
          <FcGoogle size={22} />
          <span className="font-medium">Continue with Google</span>
        </button>

        {/* Footer */}
        <p className="text-center text-sm text-slate-600 mt-4">
          Already have an account?{" "}
          <span
            onClick={() => router.push("/login")}
            className="text-sky-600 font-medium cursor-pointer hover:underline"
          >
            Login
          </span>
        </p>

        
      </div>
    </div>
  );
};

export default Signup;
