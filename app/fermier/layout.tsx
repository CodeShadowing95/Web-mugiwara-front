"use client";

import React from 'react'
import { Navbar, Sidebar } from '@/app-components/Farmer'
import { usePathname } from "next/navigation";

const FermierLayout = ({ children }: { children: React.ReactNode }) => {
  const pathname = usePathname();
  const isAuthPage = pathname?.startsWith("/fermier/login") || pathname?.startsWith("/fermier/register");

  return (
    <div className="container mx-auto min-h-screen bg-farm-beige-light flex">
      {!isAuthPage && <Sidebar />}
      <div className="flex-1 flex flex-col ml-64 w-full lg:w-[calc(100%-16rem)]">
        {!isAuthPage && <Navbar />}
        {children}
      </div>
    </div>
  )
}

export default FermierLayout