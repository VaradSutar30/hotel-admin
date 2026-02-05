"use client";

import React, { useState } from "react";
import { auth } from "@/lib/firebase";
import {
  GoogleAuthProvider,
  GithubAuthProvider,
  signInWithPopup,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { useRouter } from "next/navigation";
import { FcGoogle } from "react-icons/fc";
import {
  FaGithub,
  FaLock,
  FaEnvelope,
  FaEye,
  FaEyeSlash,
} from "react-icons/fa";

const Login = () => {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isSignup, setIsSignup] = useState(false);
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleEmailAuth = async () => {
    try {
      if (isSignup) {
        await createUserWithEmailAndPassword(auth, email, password);
      } else {
        await signInWithEmailAndPassword(auth, email, password);
      }
      router.push("/dashboard");
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

  const handleGithubLogin = async () => {
    try {
      await signInWithPopup(auth, new GithubAuthProvider());
      router.push("/dashboard");
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-100 to-slate-200 px-4">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-xl p-6 sm:p-8 space-y-6">

        {/* Header */}
        <div className="text-center">
          <h1 className="text-2xl sm:text-3xl font-bold text-slate-800">
            {isSignup ? "Create Account" : "Welcome Back"}
          </h1>
          <p className="text-sm text-slate-500 mt-1">
            {isSignup
              ? "Create your account to continue"
              : "Login to your dashboard"}
          </p>
        </div>

        {/* Error */}
        {error && (
          <p className="text-red-500 text-sm text-center bg-red-50 p-2 rounded">
            {error}
          </p>
        )}

        {/* Email */}
        <div className="relative">
          <FaEnvelope className="absolute left-3 top-3 text-slate-400" />
          <input
            type="email"
            placeholder="Email address"
            className="w-full pl-10 pr-3 py-2 border rounded-lg
            focus:outline-none focus:ring-2 focus:ring-sky-500"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        {/* Password with Eye */}
        <div className="relative">
          <FaLock className="absolute left-3 top-3 text-slate-400" />

          <input
            type={showPassword ? "text" : "password"}
            placeholder="Password"
            className="w-full pl-10 pr-10 py-2 border rounded-lg
            focus:outline-none focus:ring-2 focus:ring-sky-500"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3 top-2.5 text-slate-500 hover:text-slate-700"
          >
            {showPassword ? <FaEyeSlash /> : <FaEye />}
          </button>
        </div>

        {/* Email Button */}
        <button
          onClick={handleEmailAuth}
          className="w-full bg-slate-900 hover:bg-slate-800
          text-white py-2.5 rounded-lg font-medium transition"
        >
          {isSignup ? "Create Account" : "Login"}
        </button>

        {/* Divider */}
        <div className="flex items-center gap-2">
          <div className="flex-1 h-px bg-gray-300"></div>
          <span className="text-xs text-gray-500">OR CONTINUE WITH</span>
          <div className="flex-1 h-px bg-gray-300"></div>
        </div>

        {/* Google */}
        <button
          onClick={handleGoogleLogin}
          className="w-full flex items-center justify-center gap-3
          border py-2.5 rounded-lg hover:bg-gray-50 transition"
        >
          <FcGoogle size={22} />
          <span className="font-medium">Google</span>
        </button>

        {/* GitHub */}
        <button
          onClick={handleGithubLogin}
          className="w-full flex items-center justify-center gap-3
          border py-2.5 rounded-lg hover:bg-gray-50 transition"
        >
          <FaGithub size={20} />
          <span className="font-medium">GitHub</span>
        </button>

        {/* Toggle */}
        <p
          className="text-center text-sm text-sky-600 cursor-pointer hover:underline"
          onClick={() => setIsSignup(!isSignup)}
        >
          {isSignup
            ? "Already have an account? Login"
            : "New user? Create account"}
        </p>

      </div>
    </div>
  );
};

export default Login;
