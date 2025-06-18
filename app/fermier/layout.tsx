"use client";

import React, { useState } from 'react'
import { Navbar, Sidebar } from '@/app-components/Farmer'
import { usePathname } from "next/navigation";

const FermierLayout = ({ children }: { children: React.ReactNode }) => {
  const pathname = usePathname();
  const isAuthPage = pathname?.startsWith("/fermier/login") || pathname?.startsWith("/fermier/register");
  const [hasFarms, sethasFarms] = useState(false);

  return (
    <div className="container mx-auto min-h-screen bg-farm-beige-light flex">
      {!isAuthPage && <Sidebar hasFarms={hasFarms} />}
      <div className="flex-1 flex flex-col w-full lg:w-[calc(100%-16rem)]">
        <div className={`${!isAuthPage && 'ml-64'}`}>
          {!isAuthPage && hasFarms && <Navbar />}
          {children}
        </div>
      </div>
    </div>
  )
}

export default FermierLayout