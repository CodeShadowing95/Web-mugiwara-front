"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Search, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export default function FarmNav() {
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 10);
        };
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    const navItems = [
        { name: "Carte des fermes", href: "#" },
        { name: "Nos producteurs", href: "#" },
        // { name: "Fruits & Légumes", href: "#" },
        // { name: "Produits laitiers", href: "#" },
        // { name: "Viandes", href: "#" },
        // { name: "Paniers", href: "#" },
        { name: "Dernières nouveautés", href: "#" },
        { name: "Meilleures ventes", href: "#" },
        { name: "Recettes", href: "#" },
        { name: "Livraison", href: "#" },
        { name: "Blog", href: "#" },
    ];

    return (
        <div className="text-white dark:text-zinc-200">
            {/* Navigation */}
            <nav className="border-b border-[#e8e1d4] dark:border-zinc-700 bg-white dark:bg-zinc-900 hidden md:block">
                <div className="max-w-7xl px-4">
                    <ul className="flex items-center space-x-1">
                        {navItems.map((item) => (
                            <li key={item.name}>
                                <Link
                                    href={item.href}
                                    className="inline-flex items-center px-3 py-3 text-sm font-medium text-[#5a7052] dark:text-emerald-300 hover:text-[#3c5a3e] dark:hover:text-emerald-200 hover:bg-[#f7f4eb] dark:hover:bg-zinc-800 transition-colors relative group"
                                >
                                    {item.name}
                                    <div className="absolute bottom-0 left-0 w-full h-0.5 bg-[#8fb573] dark:bg-emerald-500 scale-x-0 group-hover:scale-x-100 transition-transform origin-left" />
                                </Link>
                            </li>
                        ))}
                    </ul>
                </div>
            </nav>

            {/* Promo Banner */}
            <div className="bg-[#8fb573] dark:bg-emerald-600 text-white py-2 px-4 text-center font-medium">
                🌱 Offre spéciale : -15% sur votre premier panier avec le code
                MUGIWARA 🥦
            </div>
        </div>
    );
}
