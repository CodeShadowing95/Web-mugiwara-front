"use client";

import React, { useEffect, useState } from 'react'
import { MapPin, Search, X } from 'lucide-react'
import SearchbarNav from './SearchbarNav'
import LangSelector from './LangSelector'
import AccountDropdown from './AccountDropdown'
import CustomCart from './CustomCart'
import FarmNav from '../FarmNav'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { ThemeToggle } from '../ThemeToggle';

const Navbar = () => {
    const [isScrolled, setIsScrolled] = useState(false);
    const [isVisible, setIsVisible] = useState(true);
    const [lastScrollY, setLastScrollY] = useState(0);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [actualScrollValue, setActualScrollValue] = useState(0);

    useEffect(() => {
        const handleScroll = () => {
            const currentScrollY = window.scrollY;
            setActualScrollValue(currentScrollY);

            // Determine if we're scrolling up or down
            if (currentScrollY > lastScrollY) {
                // Scrolling down
                setIsVisible(false);
            } else {
                // Scrolling up
                setIsVisible(true);
            }

            // Update scroll position
            setLastScrollY(currentScrollY);
            setIsScrolled(currentScrollY > 12000);
        };

        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, [lastScrollY]);

    const navItems = [
        { name: "Tous les produits", href: "#" },
        { name: "Carte des fermes", href: "#" },
        // { name: "Fruits & Légumes", href: "#" },
        // { name: "Produits laitiers", href: "#" },
        // { name: "Viandes", href: "#" },
        // { name: "Paniers", href: "#" },
        { name: "Dernières nouveautés", href: "#" },
        { name: "Meilleures ventes", href: "#" },
        { name: "Producteurs", href: "#" },
        { name: "Recettes", href: "#" },
        { name: "Blog", href: "#" },
    ];

    return (
        <>
            <header
                className={cn(
                    "sticky top-0 z-40 w-full transition-all duration-200",
                    isScrolled ? "bg-white dark:bg-zinc-900 shadow-md" : "bg-[#f9f7f2] dark:bg-zinc-950",
                    isVisible ? "translate-y-0" : "-translate-y-full"
                )}>
                <div className="w-full flex justify-between items-center gap-8 bg-zinc-200 dark:bg-zinc-800 px-8 py-4">
                    {/* Logo */}
                    <a href="/" className="text-zinc-800 dark:text-zinc-100 font-bold text-xl">
                        <img src={"./logo/logo_transparent.svg"} alt="Marché Fermier Logo" width="258px" height="45px" />
                    </a>

                    {/* Barre de recherche */}
                    <SearchbarNav />

                    {/* Adresse de livraison */}
                    <div className="flex items-center gap-1 text-gray-800 dark:text-gray-200">
                        <MapPin className="w-5 h-5 flex shrink-0" />
                        <div className="flex flex-col text-gray-800 dark:text-gray-200">
                            <p className="text-xs text-gray-500 dark:text-gray-400 text-nowrap">Livraison à 69008 Lyon</p>
                            <p className="text-sm font-semibold">Modifier</p>
                        </div>
                    </div>

                    {/* Internationalisation */}
                    {/* <LangSelector /> */}

                    {/* Comptes & listes */}
                    <AccountDropdown />

                    {/* Theme toggle */}
                    <ThemeToggle />

                    {/* Custom Cart */}
                    <CustomCart isScrolled={actualScrollValue !== 0} />
                </div>

                <FarmNav />
            </header>

            {/* Mobile Menu */}
            <div
                className={cn(
                    "fixed inset-0 bg-black/50 dark:bg-black/70 z-50 transition-opacity duration-300",
                    isMobileMenuOpen ? "opacity-100" : "opacity-0 pointer-events-none"
                )}
                onClick={() => setIsMobileMenuOpen(false)}
            />

            <div
                className={cn(
                    "fixed top-0 left-0 h-full w-[280px] bg-white dark:bg-zinc-900 z-50 transition-transform duration-300 ease-in-out transform",
                    isMobileMenuOpen ? "translate-x-0" : "-translate-x-full"
                )}
            >
                <div className="flex justify-between items-center p-4 border-b border-[#e8e1d4] dark:border-zinc-700">
                    <div className="flex items-center gap-2">
                        <div className="h-8 w-8 rounded-full bg-[#8fb573] flex items-center justify-center text-white font-bold">
                            MF
                        </div>
                        <span className="font-semibold text-[#3c5a3e] dark:text-emerald-300">Marché Fermier</span>
                    </div>
                    <Button
                        variant="ghost"
                        size="icon"
                        className="text-[#5a7052] dark:text-emerald-300 hover:dark:bg-zinc-800"
                        onClick={() => setIsMobileMenuOpen(false)}
                    >
                        <X className="h-5 w-5" />
                    </Button>
                </div>

                <div className="p-4">
                    <div className="relative mb-4">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <Search className="h-4 w-4 text-[#8fb573] dark:text-emerald-300" />
                        </div>
                        <input
                            type="text"
                            placeholder="Rechercher..."
                            className="w-full pl-10 pr-4 py-2 rounded-lg border border-[#e8e1d4] dark:border-zinc-700 bg-[#f7f4eb] dark:bg-zinc-800 focus:outline-none focus:ring-2 focus:ring-[#8fb573] dark:focus:ring-emerald-500 text-[#5a7052] dark:text-gray-200 dark:placeholder-gray-400"
                        />
                    </div>

                    <ul className="space-y-1">
                        {navItems.map((item) => (
                            <li key={item.name}>
                                <Link
                                    href={item.href}
                                    className="block px-3 py-2 rounded-lg text-[#5a7052] dark:text-emerald-300 hover:bg-[#f7f4eb] dark:hover:bg-zinc-800 hover:text-[#3c5a3e] dark:hover:text-emerald-200"
                                    onClick={() => setIsMobileMenuOpen(false)}
                                >
                                    {item.name}
                                </Link>
                            </li>
                        ))}
                    </ul>

                    <div className="mt-6 pt-6 border-t border-[#e8e1d4] dark:border-zinc-700">
                        <Link
                            href="#"
                            className="flex items-center gap-2 px-3 py-2 rounded-lg text-[#5a7052] dark:text-emerald-300 hover:bg-[#f7f4eb] dark:hover:bg-zinc-800"
                        >
                            <div className="h-8 w-8 rounded-full bg-[#f7f4eb] dark:bg-zinc-800 flex items-center justify-center">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="16"
                                    height="16"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth="2"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    className="text-[#8fb573] dark:text-emerald-300"
                                >
                                    <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" />
                                    <circle cx="12" cy="7" r="4" />
                                </svg>
                            </div>
                            <span>Mon compte</span>
                        </Link>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Navbar