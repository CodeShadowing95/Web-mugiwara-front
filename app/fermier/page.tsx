"use client"

import { useEffect, useState } from "react"
import { FarmerHomepage } from "@/app-components/Farmer"
import EmptyFarm from "@/app-components/Farmer/Home/EmptyFarm"

export default function FermierDashboard() {

  const [hasFarms, setHasFarms] = useState(false)

  useEffect(() => {
    const farms = typeof window !== "undefined" && JSON.parse(localStorage.getItem("newFarmData") || "{}")
    if (Object.keys(farms).length > 0) {
      setHasFarms(true)
    }
  }, [])

  return (
    <div className="w-full relative">
      {hasFarms ? (
        <FarmerHomepage />
      ) : (
        <EmptyFarm />
      )}
    </div>
  )
}
