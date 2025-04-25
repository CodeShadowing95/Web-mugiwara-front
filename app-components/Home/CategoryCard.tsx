"use client";

import React from 'react'
import Link from 'next/link'
import { Categorie } from '@/types';
import { genRandKey } from '@/utils/utilities';

const CategoryCard = ({ index, categorie }: { index: number, categorie: Categorie }) => {
    return (
        <div className="bg-white rounded-xl p-6 shadow-sm border border-[#e8e1d4]">
            <h2 className="text-xl font-bold text-[#3c5a3e] mb-4">{categorie.categorie}</h2>
            <div className="grid grid-cols-2 gap-4">
                {categorie.produits.map((item: any) => {
                    const key = genRandKey();
                    const normalizedItem = item.toLowerCase()
                        .normalize('NFD')
                        .replace(/[\u0300-\u036f]/g, '') // Remove accents
                        .replace(/\s+/g, '-'); // Replace spaces with hyphens

                    return (
                        <Link key={key} href={`/category?item=${index}&q=${normalizedItem}`} className="group">
                            {/* <div className="aspect-square rounded-lg bg-[#f7f4eb] mb-2 overflow-hidden"> */}
                            <div className="aspect-square rounded-lg mb-2 overflow-hidden">
                                <img
                                    src="vegetable2.png"
                                    alt="Fruits rouges"
                                    className="h-full w-full object-contain transition-transform group-hover:scale-105"
                                />
                            </div>
                            <span className="text-sm text-[#5a7052]">{item}</span>
                        </Link>
                    )
                })}
            </div>
            <Link
                href="#"
                className="inline-block mt-4 text-sm font-medium text-[#8fb573] hover:text-[#7a9c62] hover:underline"
            >
                Voir plus
            </Link>
        </div>
    )
}

export default CategoryCard