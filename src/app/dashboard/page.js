"use client"

import React from "react"
import { auth } from "@/lib/firebase"
import { signOut } from "firebase/auth"
import { useRouter } from "next/navigation"

const Dashboard = () => {
  const router = useRouter()

  const logout = async () => {
    await signOut(auth)
    router.push("/")
  }

  return (
    
    <h1></h1>
  );
};

export default Dashboard
